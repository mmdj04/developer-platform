"use client";

import React, { useRef } from "react";
import type { ComponentNode } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Kbd } from "@/components/ui/kbd";
import { Toggle } from "@/components/ui/toggle";
import { Slider } from "@/components/ui/slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  NativeSelect,
} from "@/components/ui/native-select";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field";
import { useBuilder } from "./store";

const htmlTags = new Set([
  "div", "section", "h1", "h2", "h3", "p", "span", "grid", "flex",
]);

const noChildTags = new Set(["h1", "h2", "h3", "p", "span", "img"]);

const useDefaultKey = "_useDefault";

const stylePropKeys = new Set([
  "backgroundColor", "color", "borderColor",
  "width", "height", "margin", "padding",
  "top", "left", "right", "bottom",
  "position", "gap", "opacity",
]);

const componentMap: Record<string, React.ComponentType<any>> = {
  Button, Badge,
  Alert, Input, Label, Textarea,
  Progress, Skeleton, Spinner, Kbd, Toggle, Slider, AspectRatio,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption,
  RadioGroup, RadioGroupItem,
  ToggleGroup, ToggleGroupItem,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
  Avatar, AvatarImage, AvatarFallback,
  Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia,
  ButtonGroup, ButtonGroupSeparator, ButtonGroupText,
  InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea,
  InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
  ScrollArea, NativeSelect,
  Card, CardHeader, CardContent,
  Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle,
};

function renderCoreNode(
  node: ComponentNode,
  inlineStyle: Record<string, string> | undefined,
  remainingProps: Record<string, string>,
  children: React.ReactNode[],
  useDefault: boolean = false
): React.ReactElement {
  if (htmlTags.has(node.type)) {
    return React.createElement(node.type, { className: remainingProps.className, style: inlineStyle }, ...children);
  }

  if (node.type === "img") {
    return React.createElement("div",
      node.props.src
        ? React.createElement("img", { src: node.props.src, alt: node.props.alt, className: "max-w-full h-auto", style: { maxWidth: "100%" } })
        : React.createElement("span", { className: "text-scale-9 text-xs" }, "No image selected")
    ) as React.ReactElement;
  }

  if (node.type === "Separator") {
    return React.createElement(Separator, { key: "sep" });
  }

  if (node.type === "Checkbox") {
    return React.createElement("div", { className: "flex items-center gap-2" },
      React.createElement(Checkbox, { key: "cb", id: node.id }),
      React.createElement(Label, { key: "lb", htmlFor: node.id }, node.props.text || "Checkbox")
    );
  }

  if (node.type === "Switch") {
    return React.createElement("div", { className: "flex items-center gap-2" },
      React.createElement(Switch, { key: "sw", id: node.id }),
      React.createElement(Label, { key: "lb", htmlFor: node.id }, node.props.text || "Toggle")
    );
  }

  const Comp = componentMap[node.type];
  if (Comp) {
    const extraProps: Record<string, any> = {};
    for (const [k, v] of Object.entries(remainingProps)) {
      if (k !== "text" && k !== "className" && k !== "placeholder") extraProps[k] = v;
    }
    if (inlineStyle && Object.keys(inlineStyle).length > 0) {
      extraProps.style = inlineStyle;
    }
    return React.createElement(Comp, { ...(useDefault ? {} : { className: remainingProps.className }), ...extraProps },
      children.length > 0 ? children : null
    );
  }

  return React.createElement("div", { style: inlineStyle }, ...children);
}

function extractStyleProps(props: Record<string, string>) {
  const styleProps: Record<string, string> = {};
  const remainingProps: Record<string, string> = {};
  let useDefault = false;
  for (const [k, v] of Object.entries(props)) {
    if (stylePropKeys.has(k)) {
      styleProps[k] = v;
    } else if (k === useDefaultKey) {
      useDefault = v === "true";
    } else {
      remainingProps[k] = v;
    }
  }
  const inlineStyle: Record<string, string> = {};
  for (const [k, v] of Object.entries(styleProps)) {
    if (v) inlineStyle[k] = v;
  }
  return { styleProps, remainingProps, inlineStyle, useDefault };
}

interface RenderNodeProps {
  node: ComponentNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  depth: number;
}

export function RenderNode({ node, isSelected, onSelect, depth }: RenderNodeProps) {
  const { state, addComponent, dispatch } = useBuilder();
  const nodeIdRef = useRef(node.id);
  nodeIdRef.current = node.id;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    try {
      const item = JSON.parse(data);
      if (!item.moveId) {
        addComponent(node.id, item);
      }
    } catch {}
  };

  const { inlineStyle, remainingProps, useDefault } = extractStyleProps(node.props);

  const isNestable = htmlTags.has(node.type) && !noChildTags.has(node.type);
  const selectionBorder = isSelected ? "outline-2 outline-brand outline" : "outline-1 outline-dashed outline-scale-6";

  const className = `${remainingProps.className || ""} ${selectionBorder} relative group cursor-pointer transition-all hover:outline-brand/50`.trim();

  const hasAbsolute = node.props.position === "absolute";

  const children: React.ReactNode[] = [];

  if ("text" in node.props) {
    children.push(
      React.createElement("span", { key: "text", className: "pointer-events-none" }, node.props.text)
    );
  } else if ("placeholder" in node.props) {
    children.push(
      React.createElement("span", { key: "text", className: "pointer-events-none text-scale-9" }, node.props.placeholder)
    );
  }

  node.children.forEach((child) => {
    children.push(
      React.createElement(RenderNode, {
        key: child.id,
        node: child,
        isSelected: state.selectedId === child.id,
        onSelect,
        depth: depth + 1,
      })
    );
  });

  const handleResizeStart = (e: React.MouseEvent, axis: "width" | "height" | "both") => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.querySelector(`[data-node-id="${node.id}"]`) as HTMLElement | null;
    const startW = el?.offsetWidth || 100;
    const startH = el?.offsetHeight || 40;

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - e.clientX;
      const dy = me.clientY - e.clientY;
      const props: Record<string, string> = {};
      if (axis === "width" || axis === "both") {
        props.width = `${Math.max(20, Math.round(startW + dx))}px`;
      }
      if (axis === "height" || axis === "both") {
        props.height = `${Math.max(20, Math.round(startH + dy))}px`;
      }
      if (Object.keys(props).length > 0) dispatch({ type: "UPDATE_PROPS", id: nodeIdRef.current, props });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMoveStart = (e: React.MouseEvent) => {
    if (!hasAbsolute) return;
    e.preventDefault();
    e.stopPropagation();
    const el = document.querySelector(`[data-node-id="${node.id}"]`) as HTMLElement | null;
    const rect = el?.getBoundingClientRect();
    const startT = rect?.top || 0;
    const startL = rect?.left || 0;

    const handleMouseMove = (me: MouseEvent) => {
      const dx = me.clientX - e.clientX;
      const dy = me.clientY - e.clientY;
      dispatch({
        type: "UPDATE_PROPS",
        id: nodeIdRef.current,
        props: {
          left: `${Math.round(startL + dx)}px`,
          top: `${Math.round(startT + dy)}px`,
        },
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const mergedStyle: Record<string, any> = {};
  if (Object.keys(inlineStyle).length > 0) Object.assign(mergedStyle, inlineStyle);
  if (hasAbsolute) mergedStyle.position = "absolute";

  const commonProps: Record<string, any> = {
    className,
    style: Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(node.id);
    },
    "data-node-id": node.id,
  };

  if (isNestable) {
    commonProps.onDragOver = handleDragOver;
    commonProps.onDragLeave = handleDragLeave;
    commonProps.onDrop = handleDrop;
  }

  if (isSelected && hasAbsolute) {
    commonProps.onMouseDown = handleMoveStart;
    commonProps.style = { ...commonProps.style, cursor: "grab" };
  }

  const core = renderCoreNode(node, Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined, remainingProps, children, useDefault);

  let element: React.ReactElement;
  if (htmlTags.has(node.type)) {
    element = React.cloneElement(core, commonProps);
  } else {
    element = React.createElement("div", commonProps, core);
  }

  if (isSelected) {
    const rh = [
      React.createElement("div", {
        key: "rh-r",
        onMouseDown: (e: React.MouseEvent) => handleResizeStart(e, "width"),
        style: { position: "absolute", right: -3, top: 0, bottom: 0, width: 6, cursor: "ew-resize", zIndex: 20 } as React.CSSProperties,
      }),
      React.createElement("div", {
        key: "rh-b",
        onMouseDown: (e: React.MouseEvent) => handleResizeStart(e, "height"),
        style: { position: "absolute", left: 0, right: 0, bottom: -3, height: 6, cursor: "ns-resize", zIndex: 20 } as React.CSSProperties,
      }),
      React.createElement("div", {
        key: "rh-c",
        onMouseDown: (e: React.MouseEvent) => handleResizeStart(e, "both"),
        style: { position: "absolute", right: -4, bottom: -4, width: 12, height: 12, cursor: "nwse-resize", zIndex: 20, backgroundColor: "rgb(var(--brand))", borderRadius: 2 } as React.CSSProperties,
      }),
    ];
    const tag = element.type;
    if (typeof tag === "string" && (tag === "div" || htmlTags.has(tag))) {
      return React.cloneElement(element, {}, ...(React.Children.toArray((element.props as any).children)), ...rh);
    }
    return React.createElement("div", { style: { position: "relative", display: "inline-block" } }, element, ...rh);
  }

  return element;
}

export function PreviewNode({ node }: { node: ComponentNode }) {
  const { inlineStyle, remainingProps, useDefault } = extractStyleProps(node.props);

  const children: React.ReactNode[] = [];

  if ("text" in node.props) {
    children.push(React.createElement(React.Fragment, { key: "text" }, node.props.text));
  } else if ("placeholder" in node.props) {
    children.push(
      React.createElement("span", { key: "text", className: "text-scale-9" }, node.props.placeholder)
    );
  }

  node.children.forEach((child) => {
    children.push(
      React.createElement(PreviewNode, { key: child.id, node: child })
    );
  });

  return renderCoreNode(
    node,
    Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined,
    remainingProps,
    children.filter(Boolean),
    useDefault
  );
}
