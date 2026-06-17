"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    const result = login(values.email, values.password);
    if (result.success) {
      router.push("/dashboard/new");
    } else {
      setError(result.error ?? "Ocorreu um erro");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-bold tracking-tight text-scale-12">
          @SDKdoMatheus
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-scale-11">
          Entre na sua conta
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-scale-12">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                    className="h-10 border-scale-6 bg-scale-2 text-scale-12 placeholder:text-scale-10 focus-visible:ring-brand"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-scale-12">Senha</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-scale-11 hover:text-scale-12 transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className="h-10 border-scale-6 bg-scale-2 text-scale-12 placeholder:text-scale-10 focus-visible:ring-brand"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-4 text-center text-sm text-scale-11">
        <p>
          Não tem uma conta?{" "}
          <Link
            href="/auth/sign-up"
            className="text-scale-12 hover:text-scale-12/80 underline underline-offset-4 transition-colors"
          >
            Cadastre-se
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
