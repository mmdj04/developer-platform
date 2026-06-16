"use client";

import { useBuilder } from "./store";
import { useMemo, useRef, useState } from "react";
import { PALETTE } from "./types";

const ADDABLE_PROPS = [
  { key: "text", label: "Content", type: "textarea" as const },
  { key: "className", label: "Class Name", type: "text" as const },
  { key: "backgroundColor", label: "Background Color", type: "color" as const },
  { key: "color", label: "Text Color", type: "color" as const },
  { key: "borderColor", label: "Border Color", type: "color" as const },
  { key: "placeholder", label: "Placeholder", type: "text" as const },
  { key: "href", label: "Link URL", type: "text" as const },
  { key: "src", label: "Image URL", type: "text" as const },
  { key: "alt", label: "Alt Text", type: "text" as const },
];

export function Inspector() {
  const { state, updateProps, deleteComponent, duplicateComponent, findNode, select, addProp } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAddProp, setShowAddProp] = useState(false);

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

  const handleDeleteProp = (key: string) => {
    const { [key]: _, ...rest } = props;
    updateProps(selectedNode.id, rest);
  };

  const handleAddProp = (key: string) => {
    addProp(selectedNode.id, key, "");
    setShowAddProp(false);
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
  const isDefaultVisual = props._useDefault === "true";

  const propConfig: Record<string, { label: string; type: "text" | "textarea" | "color" }> = {
    text: { label: "Content", type: "textarea" },
    placeholder: { label: "Placeholder", type: "text" },
    className: { label: "Class Name", type: "text" },
    href: { label: "Link URL", type: "text" },
    src: { label: "Image URL", type: "text" },
    alt: { label: "Alt Text", type: "text" },
    backgroundColor: { label: "Background", type: "color" },
    color: { label: "Text Color", type: "color" },
    borderColor: { label: "Border Color", type: "color" },
  };

  const existingKeys = new Set(Object.keys(props));
  const availableProps = ADDABLE_PROPS.filter((p) => !existingKeys.has(p.key));

  const editableKeys = Object.keys(props).filter(
    (k) => propConfig[k] && !(isDefaultVisual && k === "className")
  );

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
        {/* Default Styling toggle */}
        <div className="flex items-center justify-between px-1">
          <label className="text-xs font-medium text-scale-11">Default Styling</label>
          <button
            onClick={() => {
              if (isDefaultVisual) {
                const { _useDefault: _, ...rest } = props;
                updateProps(selectedNode.id, rest);
              } else {
                updateProps(selectedNode.id, { ...props, _useDefault: "true" });
              }
            }}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              isDefaultVisual ? "bg-brand" : "bg-scale-6"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                isDefaultVisual ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>

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
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-scale-11">
                  {config?.label || key}
                </label>
                <button
                  onClick={() => handleDeleteProp(key)}
                  className="text-[10px] text-scale-9 hover:text-red-400 transition-colors"
                  title="Remove property"
                >
                  ✕
                </button>
              </div>
              {config?.type === "color" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={props[key] || "#000000"}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-10 h-8 rounded cursor-pointer border border-scale-5 bg-scale-3"
                  />
                  <input
                    type="text"
                    value={props[key] || ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="#000000"
                    className="flex-1 text-xs px-2 py-1.5 rounded-md bg-scale-3 border border-scale-5 text-scale-12 placeholder:text-scale-9 focus:outline-none focus:border-brand font-mono"
                  />
                </div>
              ) : config?.type === "textarea" ? (
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
          <p className="text-xs text-scale-10">No properties yet</p>
        )}

        {/* Add Property */}
        <div className="relative">
          <button
            onClick={() => setShowAddProp(!showAddProp)}
            className="w-full text-xs px-3 py-1.5 rounded-md border border-dashed border-scale-6 text-scale-10 hover:text-scale-12 hover:border-scale-8 transition-colors"
          >
            + Add Property
          </button>
          {showAddProp && availableProps.length > 0 && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-scale-1 border border-scale-5 rounded-md shadow-xl max-h-48 overflow-y-auto">
              {availableProps.map((p) => (
                <button
                  key={p.key}
                  onClick={() => handleAddProp(p.key)}
                  className="w-full text-left px-3 py-2 text-xs text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
                >
                  <span className="font-medium text-scale-12">{p.label}</span>
                  <span className="ml-2 text-scale-9">({p.key})</span>
                </button>
              ))}
            </div>
          )}
          {showAddProp && availableProps.length === 0 && (
            <div className="absolute left-0 right-0 z-10 mt-1 bg-scale-1 border border-scale-5 rounded-md shadow-xl p-3 text-xs text-scale-9 text-center">
              All common properties already added
            </div>
          )}
        </div>
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
