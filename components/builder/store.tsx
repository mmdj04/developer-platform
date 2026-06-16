"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { ComponentNode, BuilderState, BuilderAction, PaletteItem } from "./types";

let nextId = 1;
function genId() {
  return `c_${nextId++}`;
}

function createNode(item: PaletteItem, overrides?: Partial<ComponentNode>): ComponentNode {
  const node: ComponentNode = {
    id: overrides?.id ?? genId(),
    type: item.type,
    props: { ...item.defaultProps, ...overrides?.props },
    children: [],
  };
  if (item.defaultChildren) {
    node.children = item.defaultChildren.map((child) => ({
      id: genId(),
      type: child.type,
      props: { ...child.props },
      children: child.children.map((gchild) => ({ ...gchild, id: genId() })),
    }));
  }
  return node;
}

function findNode(root: ComponentNode | null, id: string): ComponentNode | null {
  if (!root) return null;
  if (root.id === id) return root;
  for (const child of root.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function removeNode(root: ComponentNode | null, id: string): ComponentNode | null {
  if (!root) return null;
  if (root.id === id) return null;
  return {
    ...root,
    children: root.children.filter((c) => c.id !== id).map((c) => removeNode(c, id)!),
  };
}

function replaceNode(root: ComponentNode | null, id: string, newNode: ComponentNode): ComponentNode | null {
  if (!root) return null;
  if (root.id === id) return newNode;
  return {
    ...root,
    children: root.children.map((c) => replaceNode(c, id, newNode)!),
  };
}

function addChild(root: ComponentNode | null, parentId: string, child: ComponentNode): ComponentNode | null {
  if (!root) return null;
  if (root.id === parentId) {
    return { ...root, children: [...root.children, child] };
  }
  return { ...root, children: root.children.map((c) => addChild(c, parentId, child)!) };
}

function deepClone(root: ComponentNode | null): ComponentNode | null {
  if (!root) return null;
  return { ...root, children: root.children.map(deepClone) as ComponentNode[] };
}

function serialize(root: ComponentNode | null): string {
  return JSON.stringify(root);
}

function reducer(state: BuilderState, action: BuilderAction): BuilderState {
  const pushHistory = (newRoot: ComponentNode | null) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(serialize(newRoot));
    if (newHistory.length > 50) newHistory.shift();
    return newHistory;
  };

  switch (action.type) {
    case "ADD_COMPONENT": {
      const parent = action.parentId === "root" ? null : findNode(state.root, action.parentId);
      if (!parent && action.parentId !== "root") return state;
      const node = createNode(action.item);
      const newRoot = parent
        ? addChild(state.root, action.parentId, node)
        : node;
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }
    case "UPDATE_PROPS": {
      const node = findNode(state.root, action.id);
      if (!node) return state;
      const newNode = { ...node, props: action.props };
      const newRoot = replaceNode(state.root, action.id, newNode);
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }
    case "DELETE_COMPONENT": {
      if (action.id === "root" || !state.root) return state;
      const newRoot = removeNode(state.root, action.id);
      return {
        ...state,
        root: newRoot,
        selectedId: state.selectedId === action.id ? null : state.selectedId,
        history: pushHistory(newRoot),
        historyIndex: state.history.length,
      };
    }
    case "DUPLICATE_COMPONENT": {
      const node = findNode(state.root, action.id);
      if (!node) return state;
      const clone = deepClone(node)!;
      clone.id = genId();
      // Find parent to attach
      const newRoot = addChild(state.root, "root", clone); // simplified
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }
    case "SELECT":
      return { ...state, selectedId: action.id };
    case "MOVE":
      return state;
    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const newIdx = state.historyIndex - 1;
      const entry = state.history[newIdx];
      if (!entry) return state;
      return { ...state, root: JSON.parse(entry), historyIndex: newIdx };
    }
    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIdx = state.historyIndex + 1;
      const entry = state.history[newIdx];
      if (!entry) return state;
      return { ...state, root: JSON.parse(entry), historyIndex: newIdx };
    }
    case "LOAD":
      return { ...state, root: action.root, history: [serialize(action.root)], historyIndex: 0 };
    case "CLEAR": {
      const empty = null;
      return { ...state, root: empty, selectedId: null, history: [serialize(empty)], historyIndex: 0 };
    }
    default:
      return state;
  }
}

const initialState: BuilderState = {
  root: null,
  selectedId: null,
  history: [serialize(null)],
  historyIndex: 0,
};

interface BuilderContextType {
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
  addComponent: (parentId: string, item: PaletteItem) => void;
  updateProps: (id: string, props: Record<string, string>) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  select: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  clear: () => void;
  load: (root: ComponentNode | null) => void;
  findNode: (id: string) => ComponentNode | null;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addComponent = useCallback((parentId: string, item: PaletteItem) => {
    dispatch({ type: "ADD_COMPONENT", parentId, item });
  }, []);

  const updateProps = useCallback((id: string, props: Record<string, string>) => {
    dispatch({ type: "UPDATE_PROPS", id, props });
  }, []);

  const deleteComponent = useCallback((id: string) => {
    dispatch({ type: "DELETE_COMPONENT", id });
  }, []);

  const duplicateComponent = useCallback((id: string) => {
    dispatch({ type: "DUPLICATE_COMPONENT", id });
  }, []);

  const select = useCallback((id: string | null) => {
    dispatch({ type: "SELECT", id });
  }, []);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const load = useCallback((root: ComponentNode | null) => dispatch({ type: "LOAD", root }), []);

  const findNodeById = useCallback(
    (id: string) => findNode(state.root, id),
    [state.root]
  );

  return (
    <BuilderContext.Provider
      value={{
        state,
        dispatch,
        addComponent,
        updateProps,
        deleteComponent,
        duplicateComponent,
        select,
        undo,
        redo,
        clear,
        load,
        findNode: findNodeById,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
}
