"use client";

import React from "react";
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

const noChildTags = new Set(["h1", "h2", "h3", "p", "span"]);

interface RenderNodeProps {
  node: ComponentNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  depth: number;
}

export function RenderNode({ node, isSelected, onSelect, depth }: RenderNodeProps) {
  const { state, addComponent } = useBuilder();

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

  const isNestable = htmlTags.has(node.type) && !noChildTags.has(node.type);
  const selectionBorder = isSelected ? "outline-2 outline-brand outline" : "outline-1 outline-dashed outline-scale-6";

  const className = `${node.props.className || ""} ${selectionBorder} relative group cursor-pointer transition-all hover:outline-brand/50`.trim();

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

  const commonProps: Record<string, any> = {
    className,
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

  if (htmlTags.has(node.type)) {
    return React.createElement(node.type, commonProps, ...children);
  }

  if (node.type === "Separator") {
    return React.createElement("div", commonProps,
      React.createElement(Separator, { key: "sep" })
    );
  }

  if (node.type === "Checkbox") {
    return React.createElement("div", { ...commonProps, className: `${className} flex items-center gap-2` },
      React.createElement(Checkbox, { key: "cb", id: node.id }),
      React.createElement(Label, { key: "lb", htmlFor: node.id }, node.props.text || "Checkbox")
    );
  }

  if (node.type === "Switch") {
    return React.createElement("div", { ...commonProps, className: `${className} flex items-center gap-2` },
      React.createElement(Switch, { key: "sw", id: node.id }),
      React.createElement(Label, { key: "lb", htmlFor: node.id }, node.props.text || "Toggle")
    );
  }

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
  const Comp = componentMap[node.type];

  if (Comp) {
    const extraProps: Record<string, any> = {};
    for (const [k, v] of Object.entries(node.props)) {
      if (k !== "text" && k !== "className" && k !== "placeholder") extraProps[k] = v;
    }
    return React.createElement("div", commonProps,
      React.createElement(Comp, { className: node.props.className, ...extraProps },
        node.props.text || node.props.placeholder || children.length > 0
          ? [node.props.text || node.props.placeholder, ...children].filter(Boolean)
          : null
      )
    );
  }

  return React.createElement("div", commonProps, ...children);
}
