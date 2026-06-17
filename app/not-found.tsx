import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada | SDKdoMatheus",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <span className="text-[8rem] font-bold leading-none text-scale-9 select-none">
          404
        </span>
        <h1 className="text-2xl font-semibold text-scale-12">
          Página não encontrada
        </h1>
        <p className="text-scale-11 leading-relaxed">
          A página que você está procurando não existe ou foi movida para outro
          endereço.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-scale-12 text-scale-1 px-6 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
