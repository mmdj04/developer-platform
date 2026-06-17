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

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const handleForgotPassword = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    router.push(`/auth/update-password?email=${encodeURIComponent(values.email)}`);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-bold tracking-tight text-scale-12">
          @SDKdoMatheus
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Esqueceu a Senha
        </h1>
        <p className="text-sm text-scale-11">
          Digite seu email para redefinir sua senha
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleForgotPassword)} className="flex flex-col gap-4">
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
            {isLoading ? "Redirecionando..." : "Redefinir senha"}
          </Button>
        </form>
      </Form>

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
