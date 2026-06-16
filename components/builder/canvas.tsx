"use client";

import { useBuilder } from "./store";
import type { PaletteItem } from "./types";
import { RenderNode } from "./renderer";

export function Canvas() {
  const { state, select, addComponent, moveComponent } = useBuilder();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    try {
      const parsed = JSON.parse(data);
      if (parsed.moveId) {
        moveComponent(parsed.moveId, "root");
      } else {
        addComponent("root", parsed as PaletteItem);
      }
    } catch {}
  };

  const handleCanvasClick = () => {
    select(null);
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-scale-2"
      onClick={handleCanvasClick}
    >
      {!state.root ? (
        <div
          className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed border-scale-6 m-6 rounded-xl text-scale-9 text-sm transition-colors hover:border-brand/30 hover:bg-scale-3/50"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center p-8">
            <p className="text-lg mb-1">Drop components here</p>
            <p className="text-xs">or select from the palette</p>
          </div>
        </div>
      ) : (
        <div className="p-6 min-h-full">
          <RenderNode
            node={state.root}
            isSelected={state.selectedId === state.root.id}
            onSelect={select}
            depth={0}
          />
        </div>
      )}
    </div>
  );
}
