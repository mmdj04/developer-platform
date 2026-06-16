"use client";

import { useBuilder } from "./store";
import { useState } from "react";
import type { ComponentNode, PaletteItem } from "./types";

function TreeNode({ node, depth, siblings }: { node: ComponentNode; depth: number; siblings: ComponentNode[] }) {
  const { state, select, deleteComponent, duplicateComponent, addComponent, moveComponent, moveUp, moveDown } = useBuilder();
  const isSelected = state.selectedId === node.id;
  const hasChildren = node.children.length > 0;
  const [collapsed, setCollapsed] = useState(false);

  const idx = siblings.findIndex((s) => s.id === node.id);
  const isFirst = idx === 0;
  const isLast = idx === siblings.length - 1;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ moveId: node.id }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      if (parsed.moveId && parsed.moveId !== node.id) {
        moveComponent(parsed.moveId, node.id);
      } else if (parsed.type) {
        addComponent(node.id, parsed as PaletteItem);
      }
    } catch {}
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={(e) => {
          e.stopPropagation();
          select(node.id);
        }}
        className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs cursor-pointer transition-colors group ${
          isSelected
            ? "bg-brand/10 text-brand font-medium"
            : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
        }`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((c) => !c);
            }}
            className="w-3 text-scale-9 hover:text-scale-11"
          >
            {collapsed ? "▸" : "▾"}
          </button>
        ) : (
          <span className="w-3" />
        )}
        <span className="truncate flex-1">{node.type}</span>
        {isSelected && (
          <span className="opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity">
            {!isFirst && (
              <button
                onClick={(e) => { e.stopPropagation(); moveUp(node.id); }}
                className="px-0.5 hover:text-scale-12 text-[10px] leading-none"
                title="Move up"
              >
                ▲
              </button>
            )}
            {!isLast && (
              <button
                onClick={(e) => { e.stopPropagation(); moveDown(node.id); }}
                className="px-0.5 hover:text-scale-12 text-[10px] leading-none"
                title="Move down"
              >
                ▼
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateComponent(node.id);
              }}
              className="px-0.5 hover:text-scale-12"
              title="Duplicate"
            >
              ⎘
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteComponent(node.id);
                select(null);
              }}
              className="px-0.5 hover:text-red-400"
              title="Delete"
            >
              ✕
            </button>
          </span>
        )}
      </div>
      {hasChildren && !collapsed && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} siblings={node.children} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView() {
  const { state } = useBuilder();

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-scale-5">
        <h3 className="text-sm font-semibold text-scale-12">Layers</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {!state.root ? (
          <p className="text-xs text-scale-9 text-center pt-8">
            Canvas is empty
          </p>
        ) : (
          <TreeNode node={state.root} depth={0} siblings={[state.root]} />
        )}
      </div>
    </div>
  );
}
