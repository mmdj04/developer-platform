"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SupabaseLogo } from "@/components/supabase-logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function PasswordRequirement({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`flex size-4 shrink-0 items-center justify-center rounded-full transition-colors ${
          met ? "bg-brand text-black" : "bg-scale-5 text-scale-10"
        }`}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="size-3"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 8l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className={met ? "text-scale-12" : "text-scale-11"}>
        {label}
      </span>
    </div>
  );
}

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const router = useRouter();

  const requirements = useMemo(
    () => [
      { met: /[A-Z]/.test(password), label: "Letra maiúscula" },
      { met: /[a-z]/.test(password), label: "Letra minúscula" },
      { met: /[0-9]/.test(password), label: "Número" },
      {
        met: /[!?<>@#$%^&*()_+\-=[\]{};':"\\|,.<>\/~`]/.test(password),
        label: "Caractere especial (ex.: !?<>@#$%)",
      },
      { met: password.length >= 8, label: "8 caracteres ou mais" },
    ],
    [password],
  );

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    const supabase = createClient();
    setIsGithubLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex justify-center">
        <span className="text-scale-11">
          <SupabaseLogo />
        </span>
      </div>

      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Comece agora
        </h1>
        <p className="text-sm text-scale-11">
          Crie uma nova conta
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="relative flex w-full items-center justify-center gap-2 bg-scale-3 hover:bg-scale-5 border-scale-5 text-scale-12 hover:border-scale-8"
          disabled={isGithubLoading}
          onClick={handleGithubSignUp}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {isGithubLoading ? "Continuando..." : "Continuar com GitHub"}
        </Button>

        <div className="flex items-center gap-3 text-xs text-scale-10 uppercase">
          <div className="flex-1 border-t border-scale-6" />
          <span>or</span>
          <div className="flex-1 border-t border-scale-6" />
        </div>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-scale-12">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@exemplo.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 border-scale-6 bg-scale-2 text-scale-12 placeholder:text-scale-10 focus-visible:ring-brand"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-sm font-medium text-scale-12">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Digite uma senha forte"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 border-scale-6 bg-scale-2 text-scale-12 placeholder:text-scale-10 focus-visible:ring-brand"
          />
          {password.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              {requirements.map((req, index) => (
                <PasswordRequirement
                  key={index}
                  met={req.met}
                  label={req.label}
                />
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full bg-brand text-black hover:bg-brand-hover border border-brand/30 hover:border-brand"
        >
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </Button>
      </form>

      <div className="flex flex-col gap-4 text-center text-sm text-scale-11">
        <p>
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="text-scale-12 hover:text-scale-12/80 underline underline-offset-4 transition-colors"
          >
            Entrar
          </Link>
        </p>
        <p className="text-xs leading-relaxed text-scale-10">
          Ao continuar, você concorda com nossos{" "}
          <Link href="/terms" className="underline hover:text-scale-11 transition-colors">
            Terms of Service
          </Link>{" "}
          e{" "}
          <Link href="/privacy" className="underline hover:text-scale-11 transition-colors">
            Privacy Policy
          </Link>
          , e receber e-mails periódicos com atualizações.
        </p>
      </div>
    </div>
  );
}
