import type { ComponentNode } from "./types";

const htmlTags = new Set([
  "div", "section", "h1", "h2", "h3", "p", "span", "grid", "flex", "img",
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
  Progress: ["Progress"],
  Skeleton: ["Skeleton"],
  Spinner: ["Spinner"],
  Kbd: ["Kbd"],
  Toggle: ["Toggle"],
  Slider: ["Slider"],
  AspectRatio: ["AspectRatio"],
  ScrollArea: ["ScrollArea"],
  NativeSelect: ["NativeSelect"],
  Accordion: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
  AccordionItem: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
  AccordionTrigger: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
  AccordionContent: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
  Tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  TabsList: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  TabsTrigger: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  TabsContent: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  Collapsible: ["Collapsible", "CollapsibleTrigger", "CollapsibleContent"],
  CollapsibleTrigger: ["Collapsible", "CollapsibleTrigger", "CollapsibleContent"],
  CollapsibleContent: ["Collapsible", "CollapsibleTrigger", "CollapsibleContent"],
  Table: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableHeader: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableBody: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableFooter: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableHead: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableRow: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableCell: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  TableCaption: ["Table", "TableHeader", "TableBody", "TableFooter", "TableHead", "TableRow", "TableCell", "TableCaption"],
  RadioGroup: ["RadioGroup", "RadioGroupItem"],
  RadioGroupItem: ["RadioGroup", "RadioGroupItem"],
  ToggleGroup: ["ToggleGroup", "ToggleGroupItem"],
  ToggleGroupItem: ["ToggleGroup", "ToggleGroupItem"],
  Breadcrumb: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbList: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbItem: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbLink: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbPage: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbSeparator: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  BreadcrumbEllipsis: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
  Pagination: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationContent: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationItem: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationLink: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationPrevious: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationNext: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  PaginationEllipsis: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationPrevious", "PaginationNext", "PaginationEllipsis"],
  Avatar: ["Avatar", "AvatarImage", "AvatarFallback"],
  AvatarImage: ["Avatar", "AvatarImage", "AvatarFallback"],
  AvatarFallback: ["Avatar", "AvatarImage", "AvatarFallback"],
  Empty: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  EmptyHeader: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  EmptyTitle: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  EmptyDescription: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  EmptyContent: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  EmptyMedia: ["Empty", "EmptyHeader", "EmptyTitle", "EmptyDescription", "EmptyContent", "EmptyMedia"],
  ButtonGroup: ["ButtonGroup", "ButtonGroupSeparator", "ButtonGroupText"],
  ButtonGroupSeparator: ["ButtonGroup", "ButtonGroupSeparator", "ButtonGroupText"],
  ButtonGroupText: ["ButtonGroup", "ButtonGroupSeparator", "ButtonGroupText"],
  InputGroup: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputGroupAddon: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputGroupButton: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputGroupText: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputGroupInput: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputGroupTextarea: ["InputGroup", "InputGroupAddon", "InputGroupButton", "InputGroupText", "InputGroupInput", "InputGroupTextarea"],
  InputOTP: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
  InputOTPGroup: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
  InputOTPSlot: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
  InputOTPSeparator: ["InputOTP", "InputOTPGroup", "InputOTPSlot", "InputOTPSeparator"],
  ResizablePanelGroup: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
  ResizablePanel: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
  ResizableHandle: ["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"],
  Field: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldLabel: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldDescription: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldError: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldGroup: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldLegend: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldSeparator: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldSet: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldContent: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
  FieldTitle: ["Field", "FieldLabel", "FieldDescription", "FieldError", "FieldGroup", "FieldLegend", "FieldSeparator", "FieldSet", "FieldContent", "FieldTitle"],
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
    Accordion: "accordion",
    AccordionItem: "accordion",
    AccordionTrigger: "accordion",
    AccordionContent: "accordion",
    Tabs: "tabs",
    TabsList: "tabs",
    TabsTrigger: "tabs",
    TabsContent: "tabs",
    Collapsible: "collapsible",
    CollapsibleTrigger: "collapsible",
    CollapsibleContent: "collapsible",
    Table: "table",
    TableHeader: "table",
    TableBody: "table",
    TableFooter: "table",
    TableHead: "table",
    TableRow: "table",
    TableCell: "table",
    TableCaption: "table",
    RadioGroup: "radio-group",
    RadioGroupItem: "radio-group",
    ToggleGroup: "toggle-group",
    ToggleGroupItem: "toggle-group",
    Breadcrumb: "breadcrumb",
    BreadcrumbList: "breadcrumb",
    BreadcrumbItem: "breadcrumb",
    BreadcrumbLink: "breadcrumb",
    BreadcrumbPage: "breadcrumb",
    BreadcrumbSeparator: "breadcrumb",
    BreadcrumbEllipsis: "breadcrumb",
    Pagination: "pagination",
    PaginationContent: "pagination",
    PaginationItem: "pagination",
    PaginationLink: "pagination",
    PaginationPrevious: "pagination",
    PaginationNext: "pagination",
    PaginationEllipsis: "pagination",
    Avatar: "avatar",
    AvatarImage: "avatar",
    AvatarFallback: "avatar",
    Empty: "empty",
    EmptyHeader: "empty",
    EmptyTitle: "empty",
    EmptyDescription: "empty",
    EmptyContent: "empty",
    EmptyMedia: "empty",
    ButtonGroup: "button-group",
    ButtonGroupSeparator: "button-group",
    ButtonGroupText: "button-group",
    InputGroup: "input-group",
    InputGroupAddon: "input-group",
    InputGroupButton: "input-group",
    InputGroupText: "input-group",
    InputGroupInput: "input-group",
    InputGroupTextarea: "input-group",
    InputOTP: "input-otp",
    InputOTPGroup: "input-otp",
    InputOTPSlot: "input-otp",
    InputOTPSeparator: "input-otp",
    ResizablePanelGroup: "resizable",
    ResizablePanel: "resizable",
    ResizableHandle: "resizable",
    NativeSelect: "native-select",
    Field: "field",
    FieldLabel: "field",
    FieldDescription: "field",
    FieldError: "field",
    FieldGroup: "field",
    FieldLegend: "field",
    FieldSeparator: "field",
    FieldSet: "field",
    FieldContent: "field",
    FieldTitle: "field",
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

const styleColorKeys = new Set(["backgroundColor", "color", "borderColor"]);

function extractStyle(props: Record<string, string>): string {
  const parts: string[] = [];
  if (props.backgroundColor) parts.push(`backgroundColor: "${props.backgroundColor}"`);
  if (props.color) parts.push(`color: "${props.color}"`);
  if (props.borderColor) parts.push(`borderColor: "${props.borderColor}"`);
  return parts.length > 0 ? `{{${parts.join(", ")}}}` : "";
}

function renderNode(node: ExportNode, depth: number): string {
  const nl = "\n" + "  ".repeat(depth + 1);
  const props = { ...node.props };

  const useDefault = props._useDefault === "true";
  delete props._useDefault;

  const styleAttr = extractStyle(props);
  const propEntries = Object.entries(props).filter(
    ([k]) => k !== "text" && k !== "placeholder" && !styleColorKeys.has(k)
  );
  const textContent = props.text || props.placeholder || "";

  // When useDefault is true, skip className so the shadcn default applies
  const useDefaultFilter = ([k]: [string, string]) => !(useDefault && k === "className");
  const filteredEntries = propEntries.filter(useDefaultFilter);

  if (htmlTags.has(node.type)) {
    const children = renderChildren(node.children, depth + 1);
    const attrs = renderAttrs(filteredEntries) + (styleAttr ? ` style=${styleAttr}` : "");
    if (children || textContent) {
      return `<${node.type}${attrs}>${nl}${textContent}${children ? nl + children : ""}\n${"  ".repeat(depth)}</${node.type}>`;
    }
    return `<${node.type}${attrs} />`;
  }

  if (selfClosing.has(node.type)) {
    const extra = filteredEntries.filter(([k]) => k !== "className");
    const showCls = !useDefault && props.className;
    const cls = showCls ? ` className="${escapeAttr(props.className || "")}"` : "";
    const extras = extra.map(([k, v]) => ` ${k}={${JSON.stringify(v)}}`).join("");
    const stl = styleAttr ? ` style=${styleAttr}` : "";
    if (node.type === "Checkbox" || node.type === "Switch") {
      return `<div className="flex items-center gap-2">\n${"  ".repeat(depth + 1)}<${node.type}${cls}${extras}${stl} />\n${"  ".repeat(depth + 1)}<Label>${textContent}</Label>\n${"  ".repeat(depth)}</div>`;
    }
    return `<${node.type}${cls}${extras}${stl}${textContent ? " placeholder=" + JSON.stringify(textContent) : ""} />`;
  }

  const children = renderChildren(node.children, depth + 1);
  const showCls = !useDefault && props.className;
  const cls = showCls ? ` className="${escapeAttr(props.className || "")}"` : "";
  const extra = filteredEntries.filter(([k]) => k !== "className");
  const extras = extra.map(([k, v]) => ` ${k}={${JSON.stringify(v)}}`).join("");
  const stl = styleAttr ? ` style=${styleAttr}` : "";

  if (children || textContent) {
    return `<${node.type}${cls}${extras}${stl}>${nl}${textContent}${children ? nl + children : ""}\n${"  ".repeat(depth)}</${node.type}>`;
  }
  return `<${node.type}${cls}${extras}${stl} />`;
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
