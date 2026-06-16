"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import type { ComponentNode, BuilderState, BuilderAction, PaletteItem, DefaultChild } from "./types";

let nextId = 1;
function genId() {
  return `c_${nextId++}`;
}

function toNode(child: DefaultChild): ComponentNode {
  return {
    id: genId(),
    type: child.type,
    props: { ...child.props },
    children: child.children.map(toNode),
  };
}

function createNode(item: PaletteItem, overrides?: Partial<ComponentNode>): ComponentNode {
  const node: ComponentNode = {
    id: overrides?.id ?? genId(),
    type: item.type,
    props: { ...item.defaultProps, ...overrides?.props },
    children: [],
  };
  if (item.defaultChildren) {
    node.children = item.defaultChildren.map(toNode);
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

function deepClone(root: ComponentNode): ComponentNode {
  return { ...root, children: root.children.map(deepClone) };
}

function serialize(root: ComponentNode | null): string {
  return JSON.stringify(root);
}

function mapTree(root: ComponentNode | null, fn: (node: ComponentNode) => ComponentNode | null): ComponentNode | null {
  if (!root) return null;
  const mapped = fn(root);
  if (!mapped) return null;
  if (mapped.children) {
    mapped.children = mapped.children
      .map((c) => mapTree(c, fn))
      .filter(Boolean) as ComponentNode[];
  }
  return mapped;
}

function findParent(root: ComponentNode | null, id: string): ComponentNode | null {
  if (!root) return null;
  for (const child of root.children) {
    if (child.id === id) return root;
    const found = findParent(child, id);
    if (found) return found;
  }
  return null;
}

function moveSibling(root: ComponentNode, id: string, direction: -1 | 1): ComponentNode {
  const parent = findParent(root, id);
  if (!parent) return root;
  const idx = parent.children.findIndex((c) => c.id === id);
  if (idx === -1) return root;
  const newIdx = idx + direction;
  if (newIdx < 0 || newIdx >= parent.children.length) return root;
  const siblings = [...parent.children];
  const a = siblings[newIdx];
  const b = siblings[idx];
  if (!a || !b) return root;
  siblings[idx] = a;
  siblings[newIdx] = b;
  return mapTree(root, (n) =>
    n.id === parent.id ? { ...n, children: siblings } : n
  )!;
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
      const node = createNode(action.item);
      if (!state.root) {
        return { ...state, root: node, history: pushHistory(node), historyIndex: state.history.length };
      }
      const parent = action.parentId === "root" ? state.root : findNode(state.root, action.parentId);
      if (!parent) return state;
      const newRoot = mapTree(state.root, (n) =>
        n.id === parent.id ? { ...n, children: [...n.children, node] } : n
      );
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "UPDATE_PROPS": {
      const node = findNode(state.root, action.id);
      if (!node) return state;
      const newRoot = mapTree(state.root, (n) =>
        n.id === action.id ? { ...n, props: action.props } : n
      );
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "DELETE_COMPONENT": {
      if (!state.root || action.id === state.root.id) {
        return { ...state, root: null, selectedId: null, history: pushHistory(null), historyIndex: state.history.length };
      }
      const newRoot = mapTree(state.root, (n) => ({
        ...n,
        children: n.children.filter((c) => c.id !== action.id),
      }));
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
      const clone = deepClone(node);
      clone.id = genId();
      const parent = findParent(state.root, action.id) || state.root;
      if (!parent) return state;
      const newRoot = mapTree(state.root, (n) =>
        n.id === parent.id
          ? {
              ...n,
              children: n.children.flatMap((c) =>
                c.id === action.id ? [c, clone] : [c]
              ),
            }
          : n
      );
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "SELECT":
      return { ...state, selectedId: action.id };

    case "MOVE": {
      if (!state.root || action.id === state.root.id) return state;
      const source = findNode(state.root, action.id);
      const target = action.parentId === "root" ? state.root : findNode(state.root, action.parentId);
      if (!source || !target || target.id === action.id) return state;
      const sourceParent = findParent(state.root, action.id);
      if (!sourceParent) return state;
      let newRoot = mapTree(state.root, (n) =>
        n.id === sourceParent.id
          ? { ...n, children: n.children.filter((c) => c.id !== action.id) }
          : n
      );
      newRoot = mapTree(newRoot!, (n) =>
        n.id === target.id
          ? { ...n, children: [...n.children, source] }
          : n
      );
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "MOVE_UP": {
      if (!state.root || action.id === state.root.id) return state;
      const newRoot = moveSibling(state.root, action.id, -1);
      if (newRoot === state.root) return state;
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "MOVE_DOWN": {
      if (!state.root || action.id === state.root.id) return state;
      const newRoot = moveSibling(state.root, action.id, 1);
      if (newRoot === state.root) return state;
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

    case "ADD_PROP": {
      const node = findNode(state.root, action.id);
      if (!node) return state;
      const newProps = { ...node.props, [action.key]: action.value };
      const newRoot = mapTree(state.root, (n) =>
        n.id === action.id ? { ...n, props: newProps } : n
      );
      return { ...state, root: newRoot, history: pushHistory(newRoot), historyIndex: state.history.length };
    }

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

    case "CLEAR":
      return { ...state, root: null, selectedId: null, history: [serialize(null)], historyIndex: 0 };

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
  moveComponent: (id: string, parentId: string) => void;
  moveUp: (id: string) => void;
  moveDown: (id: string) => void;
  addProp: (id: string, key: string, value: string) => void;
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

  const moveComponent = useCallback((id: string, parentId: string) => {
    dispatch({ type: "MOVE", id, parentId });
  }, []);

  const moveUp = useCallback((id: string) => {
    dispatch({ type: "MOVE_UP", id });
  }, []);

  const moveDown = useCallback((id: string) => {
    dispatch({ type: "MOVE_DOWN", id });
  }, []);

  const addProp = useCallback((id: string, key: string, value: string) => {
    dispatch({ type: "ADD_PROP", id, key, value });
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
        moveComponent,
        moveUp,
        moveDown,
        addProp,
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
