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
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[!?<>@#$%^&*()_+\-=[\]{};':"\\|,.<>\/~`]/, "A senha deve conter um caractere especial"),
});

type FormValues = z.infer<typeof formSchema>;

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const password = form.watch("password");

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

  const handleSignUp = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);

    const result = signUp(values.email, values.password, values.name);
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
          Comece agora
        </h1>
        <p className="text-sm text-scale-11">
          Crie uma nova conta
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-scale-12">Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    autoComplete="name"
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
                <FormLabel className="text-scale-12">Senha</FormLabel>
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
            {isLoading ? "Criando conta..." : "Cadastrar"}
          </Button>
        </form>
      </Form>

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
