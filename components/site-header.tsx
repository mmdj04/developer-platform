"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";


const authRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/error",
  "/auth/sign-up-success",
];

const mainLinks = [
  { href: "/", label: "Início" },
  { href: "/pricing", label: "Preços" },
  { href: "/builder", label: "Construtor" },
];

const resourceLinks = [
  { href: "/terms", label: "Termos de Serviço" },
  { href: "/privacy", label: "Política de Privacidade" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="flex h-16 items-center justify-between px-6 bg-scale-1">
      <Link
        href="/"
        className="font-bold text-base text-scale-12 tracking-tight hover:text-scale-11 transition-colors"
      >
        Kit de Desenvolvimento<br className="hidden sm:inline md:hidden" />{" "}
        <span className="hidden md:inline">@</span>SDKdoMatheus
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Open menu"
            className="size-8 flex items-center justify-center rounded-md text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-scale-1 border-r border-scale-5 p-0">
          <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
            <div className="px-5 py-4 border-b border-scale-5">
              <span className="text-sm font-bold text-scale-12 tracking-tight">Kit de Desenvolvimento @SDKdoMatheus</span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {mainLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-scale-4 text-scale-12 font-medium"
                          : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}

              <div className="pt-4 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-scale-9 px-3">
                  Dashboard
                </span>
              </div>
              <SheetClose asChild>
                <Link
                  href="/dashboard/new"
                  className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-lg text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
                >
                  <Plus className="size-4" />
                  Nova Organização
                </Link>
              </SheetClose>


              <div className="pt-4 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-scale-9 px-3">
                  Recursos
                </span>
              </div>
              {resourceLinks.map((link) => (
                <SheetClose key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                      pathname === link.href
                        ? "bg-scale-4 text-scale-12 font-medium"
                        : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                    }`}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
