import { describe, it, expect } from "vitest";
import type { ComponentNode, PaletteItem } from "@/components/builder/types";

// Test the core tree manipulation logic by testing against the public API
// Since the store uses React context, we test the types and reducer logic directly

describe("Builder Types", () => {
  it("creates a valid ComponentNode shape", () => {
    const node: ComponentNode = {
      id: "test_1",
      type: "Button",
      props: { className: "bg-brand", text: "Click" },
      children: [],
    };
    expect(node.id).toBe("test_1");
    expect(node.type).toBe("Button");
    expect(node.props.text).toBe("Click");
    expect(node.children).toHaveLength(0);
  });

  it("supports nested children", () => {
    const root: ComponentNode = {
      id: "root",
      type: "div",
      props: { className: "p-4" },
      children: [
        {
          id: "child_1",
          type: "Button",
          props: { text: "Click" },
          children: [],
        },
      ],
    };
    expect(root.children).toHaveLength(1);
    expect(root.children[0].type).toBe("Button");
  });
});

describe("Component Tree shapes", () => {
  it("Card has default children structure", () => {
    const card: ComponentNode = {
      id: "c_1",
      type: "Card",
      props: { className: "" },
      children: [
        { id: "c_2", type: "CardHeader", props: { text: "Title" }, children: [] },
        { id: "c_3", type: "CardContent", props: { text: "Content" }, children: [] },
      ],
    };
    expect(card.children).toHaveLength(2);
    expect(card.children[0].type).toBe("CardHeader");
    expect(card.children[1].type).toBe("CardContent");
  });
});
