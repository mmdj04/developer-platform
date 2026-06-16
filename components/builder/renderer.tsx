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
import { useBuilder } from "./store";

const htmlTags = new Set([
  "div", "section", "h1", "h2", "h3", "p", "span",
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
      addComponent(node.id, item);
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
    Button, Badge: Badge as React.ComponentType<any>,
    Separator: Separator as React.ComponentType<any>,
    Alert: Alert as React.ComponentType<any>,
    Input: Input as React.ComponentType<any>,
    Label: Label as React.ComponentType<any>,
    Textarea: Textarea as React.ComponentType<any>,
    Checkbox: Checkbox as React.ComponentType<any>,
    Switch: Switch as React.ComponentType<any>,
    Card: Card as React.ComponentType<any>,
    CardHeader: CardHeader as React.ComponentType<any>,
    CardContent: CardContent as React.ComponentType<any>,
  };
  const Comp = componentMap[node.type];

  if (Comp) {
    const extraProps: Record<string, any> = {};
    for (const [k, v] of Object.entries(node.props)) {
      if (k !== "text" && k !== "className") extraProps[k] = v;
    }
    return React.createElement("div", commonProps,
      React.createElement(Comp, { className: node.props.className, ...extraProps },
        node.props.text || children.length > 0
          ? [node.props.text, ...children].filter(Boolean)
          : null
      )
    );
  }

  return React.createElement("div", commonProps, ...children);
}
