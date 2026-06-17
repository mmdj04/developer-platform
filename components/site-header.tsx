"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "./auth-button";

const authRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/error",
  "/auth/sign-up-success",
];

const mainLinks = [
  { href: "/pricing", label: "Preços" },
];

export function SiteHeader() {
  const pathname = usePathname();

  if (authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <header className="flex h-16 items-center justify-between gap-4 px-6 bg-scale-1">
      <Link
        href="/"
        className="font-bold text-base text-scale-12 tracking-tight hover:text-scale-11 transition-colors shrink-0 min-w-0 truncate"
      >
        <span className="hidden sm:inline">Kit de Desenvolvimento </span>
        @SDKdoMatheus
      </Link>

      {mainLinks.length > 0 && (
        <nav className="flex items-center gap-1 overflow-x-auto">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
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
      )}

      <div className="shrink-0">
        <AuthButton />
      </div>
    </header>
  );
}
