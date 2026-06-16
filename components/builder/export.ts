import type { ComponentNode } from "./types";

const htmlTags = new Set([
  "div", "section", "h1", "h2", "h3", "p", "span",
]);

const selfClosing = new Set([
  "Separator", "Input", "Checkbox", "Switch",
]);

const shadcnImports: Record<string, string[]> = {
  Button: ["Button"],
  Badge: ["Badge"],
  Separator: ["Separator"],
  Alert: ["Alert"],
  Input: ["Input"],
  Label: ["Label"],
  Textarea: ["Textarea"],
  Checkbox: ["Checkbox"],
  Switch: ["Switch"],
  Card: ["Card", "CardHeader", "CardContent"],
  CardHeader: ["Card", "CardHeader", "CardContent"],
  CardContent: ["Card", "CardHeader", "CardContent"],
};

export function exportTSX(root: ComponentNode | null): string {
  if (!root) return "";

  const usedTypes = new Set<string>();
  collectTypes(root, usedTypes);

  const importLines: string[] = [];
  const grouped: Record<string, Set<string>> = {};

  for (const type of usedTypes) {
    if (htmlTags.has(type)) continue;
    const imports = shadcnImports[type];
    if (imports && imports.length) {
      const source = "@/components/ui/" + getSource(type);
      if (!grouped[source]) grouped[source] = new Set();
      const set = grouped[source]!;
      imports.forEach((i) => set.add(i));
    }
  }

  for (const [source, names] of Object.entries(grouped)) {
    importLines.push(`import { ${[...names].join(", ")} } from "${source}";`);
  }

  const imports = importLines.length > 0 ? importLines.join("\n") + "\n\n" : "";
  const code = renderNode(root, 0);

  return `"use client";\n\n${imports}export default function Page() {\n  return (\n${indent(code, 2)}\n  );\n}\n`;
}

function getSource(type: string): string {
  const map: Record<string, string> = {
    Card: "card",
    CardHeader: "card",
    CardContent: "card",
  };
  return map[type] || type.toLowerCase();
}

function collectTypes(node: ComponentNode, set: Set<string>) {
  set.add(node.type);
  for (const child of node.children) {
    collectTypes(child, set);
  }
}

interface ExportNode extends ComponentNode {
  props: Record<string, string>;
}

function renderNode(node: ExportNode, depth: number): string {
  const nl = "\n" + "  ".repeat(depth + 1);
  const props = { ...node.props };

  const propEntries = Object.entries(props).filter(
    ([k]) => k !== "text" && k !== "placeholder"
  );
  const textContent = props.text || props.placeholder || "";

  if (htmlTags.has(node.type)) {
    const children = renderChildren(node.children, depth + 1);
    if (children || textContent) {
      return `<${node.type}${renderAttrs(propEntries)}>${nl}${textContent}${children ? nl + children : ""}\n${"  ".repeat(depth)}</${node.type}>`;
    }
    return `<${node.type}${renderAttrs(propEntries)} />`;
  }

  if (selfClosing.has(node.type)) {
    const extra = propEntries.filter(([k]) => k !== "className");
    const cls = props.className ? ` className="${escapeAttr(props.className)}"` : "";
    const extras = extra.map(([k, v]) => ` ${k}={${JSON.stringify(v)}}`).join("");
    if (node.type === "Checkbox" || node.type === "Switch") {
      return `<div className="flex items-center gap-2">\n${"  ".repeat(depth + 1)}<${node.type}${cls}${extras} />\n${"  ".repeat(depth + 1)}<Label>${textContent}</Label>\n${"  ".repeat(depth)}</div>`;
    }
    return `<${node.type}${cls}${extras}${textContent ? " placeholder=" + JSON.stringify(textContent) : ""} />`;
  }

  const children = renderChildren(node.children, depth + 1);
  const cls = props.className ? ` className="${escapeAttr(props.className)}"` : "";
  const extra = propEntries.filter(([k]) => k !== "className");
  const extras = extra.map(([k, v]) => ` ${k}={${JSON.stringify(v)}}`).join("");

  if (children || textContent) {
    return `<${node.type}${cls}${extras}>${nl}${textContent}${children ? nl + children : ""}\n${"  ".repeat(depth)}</${node.type}>`;
  }
  return `<${node.type}${cls}${extras} />`;
}

function renderChildren(children: ComponentNode[], depth: number): string {
  return children
    .map((child) => "  ".repeat(depth) + renderNode(child as ExportNode, depth))
    .join("\n");
}

function renderAttrs(entries: [string, string][]): string {
  if (entries.length === 0) return "";
  return " " + entries
    .filter(([, v]) => v)
    .map(([k, v]) => {
      if (k === "className") return ` className="${escapeAttr(v)}"`;
      return ` ${k}={${JSON.stringify(v)}}`;
    })
    .join("");
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, "&quot;");
}

function indent(code: string, level: number): string {
  const pad = "  ".repeat(level);
  return code
    .split("\n")
    .map((line) => (line.trim() ? pad + line : ""))
    .join("\n");
}
