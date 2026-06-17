"use client";

import { createClient } from "@/lib/supabase/client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  const handleUpdatePassword = async (values: FormValues) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: values.password });
      if (error) throw error;
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col gap-1 text-center">
        <span className="text-sm font-bold tracking-tight text-scale-12">
          Developer Platform
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
          Redefinir sua Senha
        </h1>
        <p className="text-sm text-scale-11">
          Insira sua nova senha abaixo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-scale-12">Nova senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite uma senha forte"
                    autoComplete="new-password"
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
            {isLoading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
