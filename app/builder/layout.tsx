import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Builder | SDKdoMatheus",
  description: "Visual page builder with drag-and-drop components. Crie e edite páginas visualmente com componentes shadcn/ui.",
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
