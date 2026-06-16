export interface ComponentNode {
  id: string;
  type: string;
  props: Record<string, string>;
  children: ComponentNode[];
}

export interface DefaultChild {
  type: string;
  props: Record<string, string>;
  children: DefaultChild[];
}

export interface PaletteItem {
  type: string;
  label: string;
  category: "layout" | "typography" | "ui" | "form";
  defaultProps: Record<string, string>;
  defaultChildren?: DefaultChild[];
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
  // ── Layout ──
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

  // ── Typography ──
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

  // ── UI / Existing ──
  {
    type: "Button",
    label: "Button",
    category: "ui",
    defaultProps: { className: "bg-brand text-black hover:bg-brand-hover", text: "Button" },
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
    type: "Kbd",
    label: "Kbd",
    category: "ui",
    defaultProps: { className: "", text: "⌘K" },
    nestable: false,
  },
  {
    type: "Toggle",
    label: "Toggle",
    category: "ui",
    defaultProps: { className: "", text: "Toggle" },
    nestable: false,
  },
  {
    type: "Progress",
    label: "Progress",
    category: "ui",
    defaultProps: { className: "w-full", value: "50" },
    nestable: false,
  },
  {
    type: "Slider",
    label: "Slider",
    category: "ui",
    defaultProps: { className: "w-full", value: "50" },
    nestable: false,
  },
  {
    type: "Skeleton",
    label: "Skeleton",
    category: "ui",
    defaultProps: { className: "h-4 w-full" },
    nestable: false,
  },
  {
    type: "Spinner",
    label: "Spinner",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "AspectRatio",
    label: "Aspect Ratio",
    category: "ui",
    defaultProps: { className: "", ratio: "16/9" },
    nestable: true,
  },
  {
    type: "ScrollArea",
    label: "Scroll Area",
    category: "ui",
    defaultProps: { className: "h-32" },
    nestable: true,
  },
  {
    type: "NativeSelect",
    label: "Native Select",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / Card ──
  {
    type: "Card",
    label: "Card",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "CardHeader", props: { className: "", text: "Card Title" }, children: [] },
      { type: "CardContent", props: { className: "", text: "Card content goes here." }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "CardHeader",
    label: "Card Header",
    category: "ui",
    defaultProps: { className: "", text: "Card Title" },
    nestable: true,
  },
  {
    type: "CardContent",
    label: "Card Content",
    category: "ui",
    defaultProps: { className: "", text: "Card content" },
    nestable: true,
  },

  // ── UI / Accordion ──
  {
    type: "Accordion",
    label: "Accordion",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      {
        type: "AccordionItem", props: { className: "" }, children: [
          { type: "AccordionTrigger", props: { className: "", text: "Section 1" }, children: [] },
          { type: "AccordionContent", props: { className: "", text: "Content here." }, children: [] },
        ],
      },
    ],
    nestable: true,
  },
  {
    type: "AccordionItem",
    label: "Accordion Item",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "AccordionTrigger",
    label: "Accordion Trigger",
    category: "ui",
    defaultProps: { className: "", text: "Trigger" },
    nestable: false,
  },
  {
    type: "AccordionContent",
    label: "Accordion Content",
    category: "ui",
    defaultProps: { className: "", text: "Content" },
    nestable: true,
  },

  // ── UI / Tabs ──
  {
    type: "Tabs",
    label: "Tabs",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "TabsList", props: { className: "" }, children: [
        { type: "TabsTrigger", props: { className: "", text: "Tab 1" }, children: [] },
      ]},
      { type: "TabsContent", props: { className: "", text: "Tab content 1" }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "TabsList",
    label: "Tabs List",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "TabsTrigger",
    label: "Tabs Trigger",
    category: "ui",
    defaultProps: { className: "", text: "Tab" },
    nestable: false,
  },
  {
    type: "TabsContent",
    label: "Tabs Content",
    category: "ui",
    defaultProps: { className: "", text: "Tab content" },
    nestable: true,
  },

  // ── UI / Collapsible ──
  {
    type: "Collapsible",
    label: "Collapsible",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "CollapsibleTrigger", props: { className: "", text: "Toggle" }, children: [] },
      { type: "CollapsibleContent", props: { className: "", text: "Collapsed content." }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "CollapsibleTrigger",
    label: "Collapsible Trigger",
    category: "ui",
    defaultProps: { className: "", text: "Toggle" },
    nestable: false,
  },
  {
    type: "CollapsibleContent",
    label: "Collapsible Content",
    category: "ui",
    defaultProps: { className: "", text: "Content" },
    nestable: true,
  },

  // ── UI / Table ──
  {
    type: "Table",
    label: "Table",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      {
        type: "TableHeader", props: { className: "" }, children: [
          { type: "TableRow", props: { className: "" }, children: [
            { type: "TableHead", props: { className: "", text: "Header" }, children: [] },
          ]},
        ],
      },
      {
        type: "TableBody", props: { className: "" }, children: [
          { type: "TableRow", props: { className: "" }, children: [
            { type: "TableCell", props: { className: "", text: "Cell" }, children: [] },
          ]},
        ],
      },
    ],
    nestable: true,
  },
  {
    type: "TableHeader",
    label: "Table Header",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "TableBody",
    label: "Table Body",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "TableFooter",
    label: "Table Footer",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "TableRow",
    label: "Table Row",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "TableHead",
    label: "Table Head",
    category: "ui",
    defaultProps: { className: "", text: "Head" },
    nestable: false,
  },
  {
    type: "TableCell",
    label: "Table Cell",
    category: "ui",
    defaultProps: { className: "", text: "Cell" },
    nestable: false,
  },
  {
    type: "TableCaption",
    label: "Table Caption",
    category: "ui",
    defaultProps: { className: "", text: "Caption" },
    nestable: false,
  },

  // ── UI / RadioGroup ──
  {
    type: "RadioGroup",
    label: "Radio Group",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "RadioGroupItem", props: { className: "", text: "Option 1" }, children: [] },
      { type: "RadioGroupItem", props: { className: "", text: "Option 2" }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "RadioGroupItem",
    label: "Radio Item",
    category: "ui",
    defaultProps: { className: "", text: "Option" },
    nestable: false,
  },

  // ── UI / ToggleGroup ──
  {
    type: "ToggleGroup",
    label: "Toggle Group",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "ToggleGroupItem", props: { className: "", text: "A" }, children: [] },
      { type: "ToggleGroupItem", props: { className: "", text: "B" }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "ToggleGroupItem",
    label: "Toggle Group Item",
    category: "ui",
    defaultProps: { className: "", text: "Item" },
    nestable: false,
  },

  // ── UI / Breadcrumb ──
  {
    type: "Breadcrumb",
    label: "Breadcrumb",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      {
        type: "BreadcrumbList", props: { className: "" }, children: [
          { type: "BreadcrumbItem", props: { className: "" }, children: [
            { type: "BreadcrumbLink", props: { className: "", text: "Home" }, children: [] },
          ]},
          { type: "BreadcrumbSeparator", props: { className: "" }, children: [] },
          { type: "BreadcrumbItem", props: { className: "" }, children: [
            { type: "BreadcrumbPage", props: { className: "", text: "Current" }, children: [] },
          ]},
        ],
      },
    ],
    nestable: true,
  },
  {
    type: "BreadcrumbList",
    label: "Breadcrumb List",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "BreadcrumbItem",
    label: "Breadcrumb Item",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "BreadcrumbLink",
    label: "Breadcrumb Link",
    category: "ui",
    defaultProps: { className: "", text: "Link" },
    nestable: false,
  },
  {
    type: "BreadcrumbPage",
    label: "Breadcrumb Page",
    category: "ui",
    defaultProps: { className: "", text: "Page" },
    nestable: false,
  },
  {
    type: "BreadcrumbSeparator",
    label: "Breadcrumb Separator",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "BreadcrumbEllipsis",
    label: "Breadcrumb Ellipsis",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / Pagination ──
  {
    type: "Pagination",
    label: "Pagination",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      {
        type: "PaginationContent", props: { className: "" }, children: [
          { type: "PaginationItem", props: { className: "" }, children: [
            { type: "PaginationPrevious", props: { className: "" }, children: [] },
          ]},
          { type: "PaginationItem", props: { className: "" }, children: [
            { type: "PaginationLink", props: { className: "", text: "1" }, children: [] },
          ]},
          { type: "PaginationItem", props: { className: "" }, children: [
            { type: "PaginationLink", props: { className: "", text: "2" }, children: [] },
          ]},
          { type: "PaginationItem", props: { className: "" }, children: [
            { type: "PaginationNext", props: { className: "" }, children: [] },
          ]},
        ],
      },
    ],
    nestable: true,
  },
  {
    type: "PaginationContent",
    label: "Pagination Content",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "PaginationItem",
    label: "Pagination Item",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "PaginationLink",
    label: "Pagination Link",
    category: "ui",
    defaultProps: { className: "", text: "1" },
    nestable: false,
  },
  {
    type: "PaginationPrevious",
    label: "Pagination Previous",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "PaginationNext",
    label: "Pagination Next",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "PaginationEllipsis",
    label: "Pagination Ellipsis",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / Avatar ──
  {
    type: "Avatar",
    label: "Avatar",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "AvatarImage", props: { className: "", src: "https://github.com/shadcn.png", alt: "avatar" }, children: [] },
      { type: "AvatarFallback", props: { className: "", text: "CN" }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "AvatarImage",
    label: "Avatar Image",
    category: "ui",
    defaultProps: { className: "", src: "https://github.com/shadcn.png", alt: "avatar" },
    nestable: false,
  },
  {
    type: "AvatarFallback",
    label: "Avatar Fallback",
    category: "ui",
    defaultProps: { className: "", text: "CN" },
    nestable: false,
  },

  // ── UI / Empty ──
  {
    type: "Empty",
    label: "Empty",
    category: "ui",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "EmptyHeader", props: { className: "" }, children: [
        { type: "EmptyTitle", props: { className: "", text: "No results found" }, children: [] },
        { type: "EmptyDescription", props: { className: "", text: "Try adjusting your search." }, children: [] },
      ]},
    ],
    nestable: true,
  },
  {
    type: "EmptyHeader",
    label: "Empty Header",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "EmptyTitle",
    label: "Empty Title",
    category: "ui",
    defaultProps: { className: "", text: "Title" },
    nestable: false,
  },
  {
    type: "EmptyDescription",
    label: "Empty Description",
    category: "ui",
    defaultProps: { className: "", text: "Description" },
    nestable: false,
  },
  {
    type: "EmptyContent",
    label: "Empty Content",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "EmptyMedia",
    label: "Empty Media",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / Button Group ──
  {
    type: "ButtonGroup",
    label: "Button Group",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "ButtonGroupSeparator",
    label: "Button Group Sep",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "ButtonGroupText",
    label: "Button Group Text",
    category: "ui",
    defaultProps: { className: "", text: "Label" },
    nestable: false,
  },

  // ── UI / Input Group ──
  {
    type: "InputGroup",
    label: "Input Group",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "InputGroupAddon",
    label: "Input Group Addon",
    category: "ui",
    defaultProps: { className: "", text: "@" },
    nestable: false,
  },
  {
    type: "InputGroupButton",
    label: "Input Group Button",
    category: "ui",
    defaultProps: { className: "", text: "Submit" },
    nestable: false,
  },
  {
    type: "InputGroupText",
    label: "Input Group Text",
    category: "ui",
    defaultProps: { className: "", text: "Label" },
    nestable: false,
  },
  {
    type: "InputGroupInput",
    label: "Input Group Input",
    category: "ui",
    defaultProps: { className: "", placeholder: "Enter..." },
    nestable: false,
  },
  {
    type: "InputGroupTextarea",
    label: "Input Group Textarea",
    category: "ui",
    defaultProps: { className: "", placeholder: "Enter..." },
    nestable: false,
  },

  // ── UI / Input OTP ──
  {
    type: "InputOTP",
    label: "Input OTP",
    category: "ui",
    defaultProps: { className: "", maxLength: "6" },
    defaultChildren: [
      { type: "InputOTPGroup", props: { className: "" }, children: [
        { type: "InputOTPSlot", props: { className: "", index: "0" }, children: [] },
        { type: "InputOTPSlot", props: { className: "", index: "1" }, children: [] },
        { type: "InputOTPSlot", props: { className: "", index: "2" }, children: [] },
      ]},
      { type: "InputOTPSeparator", props: { className: "" }, children: [] },
      { type: "InputOTPGroup", props: { className: "" }, children: [
        { type: "InputOTPSlot", props: { className: "", index: "3" }, children: [] },
        { type: "InputOTPSlot", props: { className: "", index: "4" }, children: [] },
        { type: "InputOTPSlot", props: { className: "", index: "5" }, children: [] },
      ]},
    ],
    nestable: true,
  },
  {
    type: "InputOTPGroup",
    label: "OTP Group",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "InputOTPSlot",
    label: "OTP Slot",
    category: "ui",
    defaultProps: { className: "", index: "0" },
    nestable: false,
  },
  {
    type: "InputOTPSeparator",
    label: "OTP Separator",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / Resizable ──
  {
    type: "ResizablePanelGroup",
    label: "Panel Group",
    category: "ui",
    defaultProps: { className: "", direction: "horizontal" },
    defaultChildren: [
      { type: "ResizablePanel", props: { className: "", defaultSize: "50" }, children: [] },
      { type: "ResizableHandle", props: { className: "" }, children: [] },
      { type: "ResizablePanel", props: { className: "", defaultSize: "50" }, children: [] },
    ],
    nestable: true,
  },
  {
    type: "ResizablePanel",
    label: "Panel",
    category: "ui",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "ResizableHandle",
    label: "Resize Handle",
    category: "ui",
    defaultProps: { className: "" },
    nestable: false,
  },

  // ── UI / ScrollArea ──
  {
    type: "ScrollArea",
    label: "Scroll Area",
    category: "ui",
    defaultProps: { className: "h-32" },
    nestable: true,
  },

  // ── Form / Existing ──
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

  // ── Form / Field ──
  {
    type: "FieldSet",
    label: "Field Set",
    category: "form",
    defaultProps: { className: "" },
    defaultChildren: [
      { type: "FieldLegend", props: { className: "", text: "Details" }, children: [] },
      {
        type: "FieldGroup", props: { className: "" }, children: [
          { type: "Field", props: { className: "" }, children: [
            { type: "FieldLabel", props: { className: "", text: "Name" }, children: [] },
            { type: "FieldContent", props: { className: "" }, children: [] },
            { type: "FieldDescription", props: { className: "", text: "Enter your name" }, children: [] },
            { type: "FieldError", props: { className: "", text: "This field is required" }, children: [] },
          ]},
        ],
      },
    ],
    nestable: true,
  },
  {
    type: "Field",
    label: "Field",
    category: "form",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "FieldLabel",
    label: "Field Label",
    category: "form",
    defaultProps: { className: "", text: "Label" },
    nestable: false,
  },
  {
    type: "FieldDescription",
    label: "Field Description",
    category: "form",
    defaultProps: { className: "", text: "Description" },
    nestable: false,
  },
  {
    type: "FieldError",
    label: "Field Error",
    category: "form",
    defaultProps: { className: "", text: "Error message" },
    nestable: false,
  },
  {
    type: "FieldGroup",
    label: "Field Group",
    category: "form",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "FieldLegend",
    label: "Field Legend",
    category: "form",
    defaultProps: { className: "", text: "Legend" },
    nestable: false,
  },
  {
    type: "FieldSeparator",
    label: "Field Separator",
    category: "form",
    defaultProps: { className: "" },
    nestable: false,
  },
  {
    type: "FieldContent",
    label: "Field Content",
    category: "form",
    defaultProps: { className: "" },
    nestable: true,
  },
  {
    type: "FieldTitle",
    label: "Field Title",
    category: "form",
    defaultProps: { className: "", text: "Title" },
    nestable: false,
  },
];
