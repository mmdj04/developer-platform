"use client";

import { PALETTE, type PaletteItem } from "./types";
import { useBuilder } from "./store";
import { useState } from "react";

const categoryLabels: Record<string, string> = {
  layout: "Layout",
  typography: "Typography",
  ui: "UI Components",
  form: "Form Elements",
};

const categoryIcons: Record<string, string> = {
  layout: "⊞",
  typography: "Aa",
  ui: "◆",
  form: "□",
};

function PaletteItemCard({ item, onSelect }: { item: PaletteItem; onSelect?: (item: PaletteItem) => void }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect?.(item)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-scale-11 hover:text-scale-12 hover:bg-scale-4 cursor-grab active:cursor-grabbing transition-colors select-none"
    >
      <span className="text-xs w-5 h-5 flex items-center justify-center rounded bg-scale-5 font-mono">
        {categoryIcons[item.category]}
      </span>
      {item.label}
    </div>
  );
}

interface PaletteProps {
  onComponentAdd?: (item: PaletteItem) => void;
}

export function Palette({ onComponentAdd }: PaletteProps) {
  const { addComponent } = useBuilder();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const categories = [...new Set(PALETTE.map((i) => i.category))];

  const filtered = PALETTE.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: PaletteItem) => {
    addComponent("root", item);
    onComponentAdd?.(item);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-scale-5">
        <h3 className="text-sm font-semibold text-scale-12 mb-2">Components</h3>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm px-2 py-1.5 rounded-md bg-scale-3 border border-scale-5 text-scale-12 placeholder:text-scale-9 focus:outline-none focus:border-brand"
        />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {search ? (
          filtered.map((item) => (
            <PaletteItemCard key={item.type} item={item} onSelect={handleSelect} />
          ))
        ) : (
          categories.map((cat) => {
            const items = PALETTE.filter((i) => i.category === cat);
            return (
              <div key={cat}>
                <button
                  onClick={() => setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))}
                  className="flex items-center gap-1 w-full text-left px-2 py-1.5 text-[11px] font-mono uppercase tracking-widest text-scale-9 hover:text-scale-11 transition-colors"
                >
                  <span className="text-xs">{collapsed[cat] ? "▸" : "▾"}</span>
                  {categoryLabels[cat]}
                </button>
                {!collapsed[cat] && items.map((item) => (
                  <PaletteItemCard key={item.type} item={item} onSelect={handleSelect} />
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
