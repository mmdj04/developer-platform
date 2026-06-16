"use client";

import { useBuilder } from "./store";
import { useMemo, useRef } from "react";
import { PALETTE } from "./types";

export function Inspector() {
  const { state, updateProps, deleteComponent, duplicateComponent, findNode, select } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedNode = useMemo(
    () => (state.selectedId ? findNode(state.selectedId) : null),
    [state.selectedId, findNode]
  );

  if (!selectedNode) {
    return (
      <div className="flex items-center justify-center h-full text-scale-9 text-sm p-4 text-center">
        Select a component to edit its properties
      </div>
    );
  }

  const paletteItem = PALETTE.find((p) => p.type === selectedNode.type);
  const props = { ...selectedNode.props };

  const handleChange = (key: string, value: string) => {
    updateProps(selectedNode.id, { ...props, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProps(selectedNode.id, { ...props, src: reader.result as string, alt: file.name });
    };
    reader.readAsDataURL(file);
  };

  const isImageType = selectedNode.type === "img" || selectedNode.type === "AvatarImage";

  const propConfig: Record<string, { label: string; type: "text" | "textarea" | "class" }> = {
    text: { label: "Content", type: "textarea" },
    placeholder: { label: "Placeholder", type: "text" },
    className: { label: "Class Name", type: "class" },
    href: { label: "Link URL", type: "text" },
    src: { label: "Image URL", type: "text" },
    alt: { label: "Alt Text", type: "text" },
  };

  const editableKeys = Object.keys(props).filter((k) => propConfig[k]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-scale-5">
        <h3 className="text-sm font-semibold text-scale-12">Inspector</h3>
        <p className="text-xs text-scale-10 mt-0.5">
          {paletteItem?.label || selectedNode.type}
          <span className="text-scale-9 ml-1">#{selectedNode.id.slice(0, 6)}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isImageType && (
          <div>
            <label className="block text-xs font-medium text-scale-11 mb-1">Upload Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs px-2 py-1.5 rounded-md bg-scale-3 border border-scale-5 text-scale-12 file:mr-2 file:px-2 file:py-0.5 file:rounded file:border-0 file:text-xs file:bg-brand file:text-black file:font-medium hover:file:bg-brand-hover"
            />
          </div>
        )}

        {editableKeys.map((key) => {
          const config = propConfig[key];
          return (
            <div key={key}>
              <label className="block text-xs font-medium text-scale-11 mb-1">
                {config?.label || key}
              </label>
              {config?.type === "textarea" ? (
                <textarea
                  value={props[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  rows={3}
                  className="w-full text-sm px-2 py-1.5 rounded-md bg-scale-3 border border-scale-5 text-scale-12 placeholder:text-scale-9 focus:outline-none focus:border-brand resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={props[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full text-sm px-2 py-1.5 rounded-md bg-scale-3 border border-scale-5 text-scale-12 placeholder:text-scale-9 focus:outline-none focus:border-brand font-mono text-xs"
                />
              )}
            </div>
          );
        })}

        {editableKeys.length === 0 && !isImageType && (
          <p className="text-xs text-scale-10">No editable properties</p>
        )}
      </div>

      <div className="border-t border-scale-5 p-3 flex gap-2">
        <button
          onClick={() => duplicateComponent(selectedNode.id)}
          className="flex-1 text-xs px-2 py-1.5 rounded-md bg-scale-3 hover:bg-scale-5 border border-scale-5 text-scale-11 hover:text-scale-12 transition-colors"
        >
          Duplicate
        </button>
        <button
          onClick={() => {
            deleteComponent(selectedNode.id);
            select(null);
          }}
          className="flex-1 text-xs px-2 py-1.5 rounded-md bg-red-950/30 hover:bg-red-950/50 border border-red-900/30 text-red-400 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
