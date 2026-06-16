"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const authRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/update-password",
  "/auth/error",
  "/auth/sign-up-success",
];

const mainLinks = [
  { href: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/pricing", label: "Pricing", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const resourceLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socialLinks = [
  { href: "https://discord.supabase.com", label: "Discord", icon: "M7.5 5.75c0-.41.34-.75.75-.75h7.5c.41 0 .75.34.75.75v2.5c0 .41-.34.75-.75.75h-7.5a.75.75 0 01-.75-.75v-2.5zM4.75 9.5c-.41 0-.75.34-.75.75v3.5c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75v-3.5c0-.41-.34-.75-.75-.75H4.75z" },
  { href: "https://github.com/supabase/supabase", label: "GitHub", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { href: "https://x.com/supabase", label: "X (Twitter)", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
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
        className="font-bold text-base text-scale-12 tracking-tight hover:text-brand transition-colors"
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
        <SheetContent side="left" className="w-80 bg-scale-1 border-r border-scale-5 p-0 [&>button]:hidden">
          <div className="flex flex-col h-dvh max-h-dvh overflow-hidden">
            <div className="px-5 py-4 border-b border-scale-5">
              <span className="text-sm font-bold text-scale-12 tracking-tight">Developer Platform</span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {mainLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 text-sm px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-scale-4 text-scale-12 font-medium"
                        : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d={link.icon} />
                    </svg>
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-scale-9 px-3">
                  Recursos
                </span>
              </div>
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm px-3 py-2.5 rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-scale-4 text-scale-12 font-medium"
                      : "text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-scale-5 px-3 py-4 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-scale-9 px-3">
                Social
              </span>
              <div className="flex flex-wrap gap-1 pt-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg text-scale-11 hover:text-scale-12 hover:bg-scale-4 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d={link.icon} />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
