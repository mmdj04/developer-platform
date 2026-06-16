"use client";

import { useState } from "react";

const tabs = ["Table Editor", "SQL Editor", "Políticas RLS"];

const features: Record<string, { item: string; href: string }[]> = {
  "Table Editor": [
    { item: "CRUD completo", href: "/docs/guides/database/tables" },
    { item: "Materialized Views", href: "/docs/guides/database/tables#materialized-views" },
    { item: "Foreign Tables", href: "/docs/guides/database/tables#joining-tables-with-foreign-keys" },
    { item: "Tabelas particionadas", href: "/docs/guides/database/partitions" },
    { item: "Fácil como uma planilha", href: "/docs/guides/database/overview#table-view" },
  ],
  "SQL Editor": [
    { item: "Consultas com IA", href: "/docs/guides/database/overview#sql-editor" },
    { item: "Modelos de consulta", href: "/docs/guides/database/overview#sql-editor" },
    { item: "Histórico de consultas", href: "/docs/guides/database/overview#sql-editor" },
    { item: "Exportar para CSV/JSON", href: "/docs/guides/database/overview#sql-editor" },
    { item: "Atalhos do teclado", href: "/docs/guides/database/overview#sql-editor" },
  ],
  "Políticas RLS": [
    { item: "Segurança nível linha", href: "/docs/guides/auth/row-level-security" },
    { item: "Modelos de política", href: "/docs/guides/auth/row-level-security" },
    { item: "Segurança nível coluna", href: "/docs/guides/auth/row-level-security" },
    { item: "Testador de políticas", href: "/docs/guides/auth/row-level-security" },
    { item: "Auditoria de acesso", href: "/docs/guides/auth/row-level-security" },
  ],
};

const previews: Record<string, string> = {
  "Table Editor": "Interface do Table Editor — visualize, edite e gerencie suas tabelas como uma planilha.",
  "SQL Editor": "Editor SQL com autocomplete, realce de sintaxe e sugestões com IA.",
  "Políticas RLS": "Configure políticas de segurança por linha com templates prontos e um testador visual.",
};

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("Table Editor");

  return (
    <div className="relative flex flex-col gap-8 lg:gap-12 items-center">
      <div className="relative w-full col-span-full flex justify-center gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1.5 px-3 lg:py-2 lg:px-8 border rounded-full bg-scale-3 text-sm transition-all hover:border-scale-8 hover:text-scale-12 ${
              activeTab === tab
                ? "opacity-100 border-scale-10 text-scale-12"
                : "opacity-80 border-scale-5 text-scale-11"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:gap-8 justify-center text-center mx-auto">
        {(features[activeTab] ?? []).map((feat) => (
          <li key={feat.item}>
            <a
              className="group cursor-pointer flex items-center gap-2 text-sm whitespace-nowrap text-scale-11 hover:text-scale-12 transition-colors hover:underline"
              href={feat.href}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-2 w-4">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{feat.item}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="relative rounded-2xl shadow-lg p-2 h-full border border-scale-5 flex flex-col overflow-hidden bg-scale-3 w-full max-w-6xl mx-auto">
        <div className="w-full px-2 pt-1 pb-3 relative flex items-center gap-1.5 lg:gap-2">
          <div className="w-2 h-2 bg-scale-6 rounded-full" />
          <div className="w-2 h-2 bg-scale-6 rounded-full" />
          <div className="w-2 h-2 bg-scale-6 rounded-full" />
        </div>
        <div className="h-full w-full aspect-video border border-scale-5 overflow-hidden rounded-lg bg-scale-2 flex items-center justify-center p-8 text-center">
          <p className="text-scale-11 text-sm max-w-lg">
            {previews[activeTab]}
          </p>
        </div>
      </div>
    </div>
  );
}
