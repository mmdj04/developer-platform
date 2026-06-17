"use client";

import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    background: "transparent",
    primaryColor: "#2E2E2E",
    primaryTextColor: "#EDEDED",
    primaryBorderColor: "#505050",
    secondaryColor: "#1C1C1C",
    secondaryTextColor: "#A1A1A1",
    secondaryBorderColor: "#343434",
    tertiaryColor: "#232323",
    lineColor: "#505050",
    fontSize: "14px",
  },
  sequence: {
    showSequenceNumbers: false,
    actorFontSize: 14,
    noteFontSize: 12,
    messageFontSize: 12,
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
    padding: 8,
  },
});

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!ref.current) return;
    mermaid
      .render(id, chart)
      .then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      })
      .catch(() => {
        if (ref.current) {
          ref.current.innerHTML = `<div class="text-scale-11 text-xs p-2 border border-destructive/30 rounded">Erro ao renderizar diagrama</div>`;
        }
      });
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center [&_svg]:max-w-full [&_svg]:max-h-full [&_.label]:text-scale-11"
    />
  );
}
