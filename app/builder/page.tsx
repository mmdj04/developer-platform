"use client";

import React, { useState, useCallback } from "react";
import { BuilderProvider } from "@/components/builder/store";
import { Palette } from "@/components/builder/palette";
import { Canvas } from "@/components/builder/canvas";
import { Inspector } from "@/components/builder/inspector";
import { TreeView } from "@/components/builder/tree-view";
import { Toolbar } from "@/components/builder/toolbar";
import { exportTSX } from "@/components/builder/export";
import { useBuilder } from "@/components/builder/store";

function useExport() {
  const { state } = useBuilder();
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");

  const handleExport = useCallback(() => {
    const tsx = exportTSX(state.root);
    setCode(tsx);
    setShowModal(true);
  }, [state.root]);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return { showModal, code, handleExport, closeModal };
}

function ExportModal({
  code,
  onClose,
}: {
  code: string;
  onClose: () => void;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page.tsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-scale-1 border border-scale-5 rounded-xl w-[800px] max-w-[95vw] max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-scale-5">
          <h3 className="text-sm font-semibold text-scale-12">Export TSX</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1.5 rounded-md bg-scale-3 hover:bg-scale-5 border border-scale-5 text-scale-11 hover:text-scale-12 transition-colors"
            >
              Copy
            </button>
            <button
              onClick={handleDownload}
              className="text-xs px-3 py-1.5 rounded-md bg-brand text-black font-medium hover:bg-brand-hover transition-colors"
            >
              Download
            </button>
            <button
              onClick={onClose}
              className="text-xs px-3 py-1.5 rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        <pre className="flex-1 overflow-y-auto p-5 text-xs font-mono text-scale-12 leading-relaxed whitespace-pre bg-scale-3 rounded-b-xl">
          {code || "(empty)"}
        </pre>
      </div>
    </div>
  );
}

function PreviewMode() {
  const { state } = useBuilder();

  if (!state.root) {
    return (
      <div className="flex-1 flex items-center justify-center text-scale-9 text-sm">
        Canvas is empty
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {state.root && <PreviewNode node={state.root} />}
      </div>
    </div>
  );
}

const htmlTags = new Set(["div", "section", "h1", "h2", "h3", "p", "span"]);

function PreviewNode({ node }: { node: any }) {
  const { text, className, ...rest } = node.props;
  const children = [
    text,
    ...node.children.map((c: any) =>
      React.createElement(PreviewNode, { key: c.id, node: c })
    ),
  ];

  if (htmlTags.has(node.type)) {
    return React.createElement(node.type, { className, ...rest }, ...children);
  }

  return React.createElement(node.type, { className, ...rest }, ...children);
}

function BuilderLayout() {
  const [preview, setPreview] = useState(false);
  const [showTree, setShowTree] = useState(true);
  const exportHook = useExport();

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Toolbar
        onExport={exportHook.handleExport}
        onTogglePreview={() => setPreview((p) => !p)}
        isPreview={preview}
      />

      {preview ? (
        <PreviewMode />
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <div className="w-56 border-r border-scale-5 bg-scale-1 flex-shrink-0 overflow-y-auto">
            <Palette />
          </div>

          <Canvas />

          <div className="w-60 border-l border-scale-5 bg-scale-1 flex-shrink-0 overflow-y-auto">
            {showTree ? <TreeView /> : <Inspector />}
          </div>

          <div className="absolute bottom-4 right-72 flex gap-1">
            <button
              onClick={() => setShowTree(true)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                showTree
                  ? "bg-scale-5 text-scale-12"
                  : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Layers
            </button>
            <button
              onClick={() => setShowTree(false)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                !showTree
                  ? "bg-scale-5 text-scale-12"
                  : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Props
            </button>
          </div>
        </div>
      )}

      {exportHook.showModal && (
        <ExportModal code={exportHook.code} onClose={exportHook.closeModal} />
      )}
    </div>
  );
}

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
}
