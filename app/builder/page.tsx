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

const htmlTags = new Set(["div", "section", "h1", "h2", "h3", "p", "span", "grid", "flex"]);

const noChildTags = new Set(["h1", "h2", "h3", "p", "span"]);

const previewComponentMap: Record<string, React.ComponentType<any>> = {
  Button, Badge, Separator, Alert, Input, Label, Textarea,
  Checkbox, Switch, Card, CardHeader, CardContent,
  Progress, Skeleton, Spinner, Kbd, Toggle, Slider, AspectRatio, ScrollArea, NativeSelect,
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
  Field, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle,
};

function PreviewNode({ node }: { node: any }) {
  const { text, className, ...rest } = node.props;
  const children = [
    text,
    ...node.children.map((c: any) =>
      React.createElement(PreviewNode, { key: c.id, node: c })
    ),
  ].filter(Boolean);

  if (htmlTags.has(node.type)) {
    if (noChildTags.has(node.type) && node.children.length === 0) {
      return React.createElement(node.type, { className, ...rest }, text);
    }
    return React.createElement(node.type, { className, ...rest }, ...children);
  }

  const Comp = previewComponentMap[node.type];
  if (Comp) {
    return React.createElement(Comp, { className, ...rest }, text || children.length > 0 ? children : null);
  }

  return React.createElement("div", { className, ...rest }, ...children);
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
