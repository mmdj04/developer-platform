export interface ComponentNode {
  id: string;
  type: string;
  props: Record<string, string>;
  children: ComponentNode[];
}

export interface PaletteItem {
  type: string;
  label: string;
  category: "layout" | "typography" | "ui" | "form";
  defaultProps: Record<string, string>;
  defaultChildren?: Omit<ComponentNode, "id">[];
  nestable: boolean;
}

export interface BuilderState {
  root: ComponentNode | null;
  selectedId: string | null;
  history: string[];
  historyIndex: number;
}

export type BuilderAction =
  | { type: "ADD_COMPONENT"; parentId: string; item: PaletteItem }
  | { type: "UPDATE_PROPS"; id: string; props: Record<string, string> }
  | { type: "DELETE_COMPONENT"; id: string }
  | { type: "DUPLICATE_COMPONENT"; id: string }
  | { type: "SELECT"; id: string | null }
  | { type: "MOVE"; id: string; parentId: string }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "LOAD"; root: ComponentNode | null }
  | { type: "CLEAR" };

export const PALETTE: PaletteItem[] = [
  {
    type: "div",
    label: "Container",
    category: "layout",
    defaultProps: { className: "p-4" },
    nestable: true,
  },
  {
    type: "section",
    label: "Section",
    category: "layout",
    defaultProps: { className: "py-8" },
    nestable: true,
  },
  {
    type: "grid",
    label: "Grid",
    category: "layout",
    defaultProps: { className: "grid grid-cols-2 gap-4" },
    nestable: true,
  },
  {
    type: "flex",
    label: "Flex",
    category: "layout",
    defaultProps: { className: "flex gap-4 items-center" },
    nestable: true,
  },
  {
    type: "h1",
    label: "Heading 1",
    category: "typography",
    defaultProps: { className: "text-4xl font-bold tracking-tight", text: "Heading 1" },
    nestable: false,
  },
  {
    type: "h2",
    label: "Heading 2",
    category: "typography",
    defaultProps: { className: "text-3xl font-semibold tracking-tight", text: "Heading 2" },
    nestable: false,
  },
  {
    type: "h3",
    label: "Heading 3",
    category: "typography",
    defaultProps: { className: "text-2xl font-semibold", text: "Heading 3" },
    nestable: false,
  },
  {
    type: "p",
    label: "Paragraph",
    category: "typography",
    defaultProps: { className: "text-base text-scale-11", text: "Lorem ipsum dolor sit amet consectetur adipiscing elit." },
    nestable: false,
  },
  {
    type: "span",
    label: "Span",
    category: "typography",
    defaultProps: { className: "text-sm text-scale-11", text: "Text" },
    nestable: false,
  },
  {
    type: "Button",
    label: "Button",
    category: "ui",
    defaultProps: { className: "bg-brand text-black hover:bg-brand-hover", text: "Button" },
    nestable: false,
  },
  {
    type: "Card",
    label: "Card",
    category: "ui",
    defaultProps: { className: "p-6" },
    defaultChildren: [
      { type: "CardHeader", props: { className: "", text: "Card Title" }, children: [] },
      { type: "CardContent", props: { className: "", text: "Card content goes here." }, children: [] },
    ],
    nestable: false,
  },
  {
    type: "CardHeader",
    label: "Card Header",
    category: "ui",
    defaultProps: { className: "", text: "Card Title" },
    nestable: false,
  },
  {
    type: "CardContent",
    label: "Card Content",
    category: "ui",
    defaultProps: { className: "", text: "Card content" },
    nestable: false,
  },
  {
    type: "Badge",
    label: "Badge",
    category: "ui",
    defaultProps: { className: "bg-brand text-black", text: "Badge" },
    nestable: false,
  },
  {
    type: "Separator",
    label: "Separator",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "Alert",
    label: "Alert",
    category: "ui",
    defaultProps: { className: "", text: "This is an alert message." },
    nestable: false,
  },
  {
    type: "Input",
    label: "Input",
    category: "form",
    defaultProps: { className: "", placeholder: "Enter text..." },
    nestable: false,
  },
  {
    type: "Label",
    label: "Label",
    category: "form",
    defaultProps: { className: "", text: "Label" },
    nestable: false,
  },
  {
    type: "Textarea",
    label: "Textarea",
    category: "form",
    defaultProps: { className: "", placeholder: "Enter content..." },
    nestable: false,
  },
  {
    type: "Checkbox",
    label: "Checkbox",
    category: "form",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "Switch",
    label: "Switch",
    category: "form",
    defaultProps: { className: "" },
    nestable: false,
  },
];
