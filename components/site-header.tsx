"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const authRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/error",
  "/auth/sign-up-success",
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/database", label: "Database" },
  { href: "/auth", label: "Auth" },
  { href: "/edge-functions", label: "Edge Functions" },
  { href: "/storage", label: "Storage" },
  { href: "/realtime", label: "Realtime" },
  { href: "/modules/vector", label: "Vector" },
];

const footerLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact/sales", label: "Contact Sales" },
];

export function SiteHeader() {
  const pathname = usePathname();

  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-scale-6 px-6 bg-scale-1">
      <Link
        href="/"
        className="text-sm text-scale-11 hover:text-scale-12 transition-colors"
      >
        Developer Platform
      </Link>

      <Sheet>
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
        <SheetContent side="left" className="w-72 bg-scale-1 border-r border-scale-5">
          <SheetHeader className="pb-4 border-b border-scale-5">
            <SheetTitle className="text-scale-12 text-sm font-semibold">
              Navegação
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 mt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-scale-4 text-scale-12 font-medium"
                      : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-4 border-t border-scale-5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm px-3 py-2 rounded-md text-scale-10 hover:text-scale-12 hover:bg-scale-4 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
