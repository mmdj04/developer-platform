"use client";

import { useBuilder } from "./store";

interface ToolbarProps {
  onExport: () => void;
  onTogglePreview: () => void;
  isPreview: boolean;
}

export function Toolbar({ onExport, onTogglePreview, isPreview }: ToolbarProps) {
  const { state, undo, redo, clear, load } = useBuilder();

  const handleExportJSON = () => {
    const json = JSON.stringify(state.root, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const root = JSON.parse(text);
        load(root);
      } catch {}
    };
    input.click();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-scale-5 bg-scale-1">
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={state.historyIndex <= 0}
          className="px-2 py-1 text-xs rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Undo"
        >
          ↩ Undo
        </button>
        <button
          onClick={redo}
          disabled={state.historyIndex >= state.history.length - 1}
          className="px-2 py-1 text-xs rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Redo"
        >
          ↪ Redo
        </button>
        <div className="w-px h-5 bg-scale-6 mx-2" />
        <button
          onClick={handleImportJSON}
          className="px-2 py-1 text-xs rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
        >
          Import
        </button>
        <button
          onClick={handleExportJSON}
          disabled={!state.root}
          className="px-2 py-1 text-xs rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Export JSON
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={clear}
          disabled={!state.root}
          className="px-2 py-1 text-xs rounded-md text-scale-11 hover:text-red-400 hover:bg-red-950/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
        <div className="w-px h-5 bg-scale-6 mx-1" />
        <button
          onClick={onTogglePreview}
          className={`px-3 py-1 text-xs rounded-md transition-colors ${
            isPreview
              ? "bg-brand text-black font-medium"
              : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
          }`}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
        <button
          onClick={onExport}
          disabled={!state.root}
          className="px-3 py-1 text-xs rounded-md bg-brand text-black font-medium hover:bg-brand-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Export TSX
        </button>
      </div>
    </div>
  );
}
