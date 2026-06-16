"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-bold tracking-tight text-scale-12">
          Developer Platform
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Verifique seu Email
        </h1>
          <p className="text-sm text-scale-11">
            Instruções de redefinição enviadas
          </p>
        </div>
        <p className="text-center text-sm text-scale-11">
          Se você se cadastrou usando email e senha, receberá um
          email para redefinir sua senha.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-bold tracking-tight text-scale-12">
          Developer Platform
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Esqueceu a Senha
        </h1>
        <p className="text-sm text-scale-11">
          Digite seu email e enviaremos um link para redefinir
          sua senha
        </p>
      </div>

      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
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
          {isLoading ? "Enviando..." : "Enviar email de redefinição"}
        </Button>
      </form>

      <p className="text-center text-sm text-scale-11">
        Já tem uma conta?{" "}
        <Link
          href="/auth/login"
          className="text-scale-12 hover:text-scale-12/80 underline underline-offset-4 transition-colors"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
