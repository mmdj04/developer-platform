"use client";

import React, { useState, useCallback } from "react";
import { BuilderProvider, useBuilder } from "@/components/builder/store";
import { Palette } from "@/components/builder/palette";
import { Canvas } from "@/components/builder/canvas";
import { Inspector } from "@/components/builder/inspector";
import { TreeView } from "@/components/builder/tree-view";
import { Toolbar } from "@/components/builder/toolbar";
import { PreviewNode } from "@/components/builder/renderer";
import { exportTSX } from "@/components/builder/export";

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
          <h3 className="text-sm font-semibold text-scale-12">Exportar TSX</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1.5 rounded-md bg-scale-3 hover:bg-scale-5 border border-scale-5 text-scale-11 hover:text-scale-12 transition-colors"
            >
              Copiar
            </button>
            <button
              onClick={handleDownload}
              className="text-xs px-3 py-1.5 rounded-md bg-brand text-black font-medium hover:bg-brand-hover transition-colors"
            >
              Baixar
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
          {code || "(vazio)"}
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
        Canvas vazio
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <PreviewNode node={state.root} />
      </div>
    </div>
  );
}

function MobilePanel({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex lg:hidden">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-72 max-w-[80vw] bg-scale-1 border-r border-scale-5 shadow-2xl flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-4 py-3 border-b border-scale-5">
          <h3 className="text-sm font-semibold text-scale-12">{title}</h3>
          <button onClick={onClose} className="text-scale-11 hover:text-scale-12 text-lg leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

function BuilderLayout() {
  const [preview, setPreview] = useState(false);
  const [showTree, setShowTree] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<"none" | "palette" | "right">("none");
  const [canvasBg, setCanvasBg] = useState("");
  const exportHook = useExport();

  const handleComponentAdded = () => {
    setMobilePanel("none");
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      <Toolbar
        onExport={exportHook.handleExport}
        onTogglePreview={() => setPreview((p) => !p)}
        isPreview={preview}
      />

      {preview ? (
        <PreviewMode />
      ) : (
        <div className="flex flex-1 overflow-hidden relative">
          {/* Desktop palette sidebar */}
          <div className="hidden lg:block w-56 border-r border-scale-5 bg-scale-1 flex-shrink-0 overflow-y-auto">
            <Palette />
          </div>

          <Canvas bgColor={canvasBg} />

          {/* Desktop inspector/tree sidebar */}
          <div className="hidden md:block w-60 border-l border-scale-5 bg-scale-1 flex-shrink-0 overflow-y-auto">
            {showTree ? <TreeView /> : <Inspector />}
          </div>

          {/* Desktop Layers/Props toggle + canvas bg color */}
          <div className="hidden md:flex absolute bottom-4 right-4 items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-scale-3 border border-scale-5">
              <label className="text-[10px] text-scale-9 uppercase tracking-wider">Canvas</label>
              <input
                type="color"
                value={canvasBg || "#0a0a0a"}
                onChange={(e) => setCanvasBg(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0"
                title="Cor de fundo do canvas"
              />
              {canvasBg && (
                <button
                  onClick={() => setCanvasBg("")}
                  className="text-scale-9 hover:text-scale-11 text-xs leading-none"
                  title="Resetar"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => setShowTree(true)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                showTree
                  ? "bg-scale-5 text-scale-12"
                  : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Camadas
            </button>
            <button
              onClick={() => setShowTree(false)}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                !showTree
                  ? "bg-scale-5 text-scale-12"
                  : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Propriedades
            </button>
          </div>

          {/* Mobile overlays */}
          <MobilePanel
            open={mobilePanel === "palette"}
            onClose={() => setMobilePanel("none")}
            title="Componentes"
          >
            <Palette onComponentAdd={handleComponentAdded} />
          </MobilePanel>

          <MobilePanel
            open={mobilePanel === "right"}
            onClose={() => setMobilePanel("none")}
            title={showTree ? "Camadas" : "Propriedades"}
          >
            {showTree ? <TreeView /> : <Inspector />}
          </MobilePanel>

          {/* Mobile bottom bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 flex border-t border-scale-5 bg-scale-1 z-30">
            <button
              onClick={() => setMobilePanel(mobilePanel === "palette" ? "none" : "palette")}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                mobilePanel === "palette" ? "bg-brand/10 text-brand" : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Componentes
            </button>
            <button
              onClick={() => {
                setShowTree(true);
                setMobilePanel(mobilePanel === "right" && showTree ? "none" : "right");
              }}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                mobilePanel === "right" && showTree ? "bg-brand/10 text-brand" : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Camadas
            </button>
            <button
              onClick={() => {
                setShowTree(false);
                setMobilePanel(mobilePanel === "right" && !showTree ? "none" : "right");
              }}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                mobilePanel === "right" && !showTree ? "bg-brand/10 text-brand" : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
              }`}
            >
              Propriedades
            </button>
          </div>
          {/* Mobile canvas bg color */}
          <div className="lg:hidden fixed bottom-14 left-0 right-0 flex justify-end px-3 pb-2 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-scale-3 border border-scale-5 pointer-events-auto">
              <label className="text-[10px] text-scale-9 uppercase tracking-wider">Canvas</label>
              <input
                type="color"
                value={canvasBg || "#0a0a0a"}
                onChange={(e) => setCanvasBg(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0"
                title="Cor de fundo do canvas"
              />
              {canvasBg && (
                <button
                  onClick={() => setCanvasBg("")}
                  className="text-scale-9 hover:text-scale-11 text-xs leading-none"
                  title="Resetar"
                >
                  ✕
                </button>
              )}
            </div>
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
