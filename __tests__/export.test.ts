import { describe, it, expect } from "vitest";
import { exportTSX } from "@/components/builder/export";
import type { ComponentNode } from "@/components/builder/types";

describe("exportTSX", () => {
  it("returns empty string for null root", () => {
    expect(exportTSX(null)).toBe("");
  });

  it("generates imports for shadcn components", () => {
    const root: ComponentNode = {
      id: "r",
      type: "div",
      props: { className: "p-4" },
      children: [
        { id: "c1", type: "Button", props: { text: "Click", className: "bg-brand" }, children: [] },
        { id: "c2", type: "Badge", props: { text: "New", className: "" }, children: [] },
      ],
    };
    const result = exportTSX(root);
    expect(result).toContain('import { Button } from "@/components/ui/button"');
    expect(result).toContain('import { Badge } from "@/components/ui/badge"');
    expect(result).toContain("export default function Page()");
  });

  it("wraps in use client directive", () => {
    const root: ComponentNode = {
      id: "r",
      type: "p",
      props: { text: "Hello", className: "" },
      children: [],
    };
    const result = exportTSX(root);
    expect(result).toMatch(/^"use client";/);
  });

  it("handles img type", () => {
    const root: ComponentNode = {
      id: "r",
      type: "div",
      props: { className: "" },
      children: [
        { id: "img1", type: "img", props: { src: "https://example.com/pic.jpg", alt: "Photo", className: "w-full" }, children: [] },
      ],
    };
    const result = exportTSX(root);
    expect(result).toContain("img");
    expect(result).toContain("https://example.com/pic.jpg");
    expect(result).not.toContain("from next/image");
  });

  it("exports Card with children", () => {
    const root: ComponentNode = {
      id: "r",
      type: "Card",
      props: { className: "" },
      children: [
        { id: "h", type: "CardHeader", props: { text: "Title", className: "" }, children: [] },
        { id: "c", type: "CardContent", props: { text: "Body", className: "" }, children: [] },
      ],
    };
    const result = exportTSX(root);
    expect(result).toContain("CardHeader");
    expect(result).toContain("CardContent");
    expect(result).toContain('from "@/components/ui/card"');
  });
});
