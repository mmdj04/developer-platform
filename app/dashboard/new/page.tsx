"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Github, CreditCard, ChevronDown } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  orgName: z.string().min(1, "O nome da organização é obrigatório").max(64, "Máximo de 64 caracteres"),
  plan: z.enum(["free", "pro", "team", "enterprise"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  cardName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.plan === "pro" || data.plan === "team") {
    if (!data.cardNumber) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Número do cartão é obrigatório", path: ["cardNumber"] });
    }
    if (!data.cardExpiry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Validade é obrigatória", path: ["cardExpiry"] });
    }
    if (!data.cardCvv) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV é obrigatório", path: ["cardCvv"] });
    }
    if (!data.cardName) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nome do titular é obrigatório", path: ["cardName"] });
    }
  }
});

type FormValues = z.infer<typeof formSchema>;

const plans = [
  {
    id: "free" as const,
    name: "Free",
    description: "Perfeito para projetos pessoais e sites simples.",
    price: "R$ 0",
    priceSub: "/mês",
    features: [
      "Requisições de API ilimitadas",
      "50.000 usuários ativos mensais",
      "500 MB de banco de dados",
      "CPU compartilhada - 500 MB de RAM",
      "5 GB de egress",
    ],
  },
  {
    id: "pro" as const,
    name: "Pro",
    description: "Para aplicações em produção com poder de escalar.",
    price: "A partir de R$ 175",
    priceSub: "/mês",
    popular: true,
    features: [
      "100.000 usuários ativos mensais",
      "8 GB de disco por projeto",
      "250 GB de egress",
      "100 GB de armazenamento",
      "Backups diários retidos por 7 dias",
    ],
  },
  {
    id: "team" as const,
    name: "Team",
    description: "Recursos avançados para equipes como SSO e auditoria.",
    price: "A partir de R$ 4.186",
    priceSub: "/mês",
    features: [
      "SOC2 e ISO 27001",
      "Acesso por escopo de projeto",
      "SSO para o Dashboard",
      "Suporte prioritário",
      "Backups diários retidos por 14 dias",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    description: "Para aplicações de grande escala com suporte dedicado.",
    price: "Sob Consulta",
    features: [
      "Gerente de Suporte dedicado",
      "SLAs de uptime",
      "Suporte a BYO Cloud",
      "Suporte premium 24x7x365",
      "Canal privado no Slack",
    ],
  },
];

export default function NewOrganizationPage() {
  const [showPayment, setShowPayment] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orgName: "",
      plan: "free",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
    },
  });

  const selectedPlan = form.watch("plan");

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className="flex min-h-svh flex-col">
      <div className="container mx-auto px-6 py-16 md:py-24 lg:px-16 xl:px-20 w-full max-w-4xl">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-scale-12">
            Criar nova organização
          </h1>
          <p className="text-scale-11 text-sm mt-1">
            Crie uma organização para gerenciar seus projetos e colaboradores.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-xl border border-scale-5 bg-scale-3 p-6">
              <FormField
                control={form.control}
                name="orgName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-scale-12">Nome da organização</FormLabel>
                    <FormDescription className="text-scale-11 text-sm">
                      Escolha um nome para sua organização.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Ex: Minha Empresa"
                        className="bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-xl border border-scale-5 bg-scale-3 p-6">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-scale-12">Selecione um plano</FormLabel>
                    <FormDescription className="text-scale-11 text-sm">
                      Escolha o plano ideal para sua organização.
                    </FormDescription>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {plans.map((plan) => (
                          <button
                            type="button"
                            key={plan.id}
                            onClick={() => {
                              field.onChange(plan.id);
                              setShowPayment(plan.id !== "free");
                            }}
                            className={`relative rounded-xl p-px cursor-pointer transition-all text-left ${
                              field.value === plan.id
                                ? "bg-linear-to-b from-brand/40 to-scale-6 ring-1 ring-brand/30"
                                : plan.popular
                                  ? "bg-linear-to-b from-brand/30 to-scale-6"
                                  : "bg-linear-to-b from-scale-6 to-scale-5 hover:from-scale-7 hover:to-scale-6"
                            }`}
                          >
                            <div className="relative z-10 w-full h-full rounded-[11px] bg-scale-3 p-5 flex flex-col">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-scale-12 text-base font-semibold">
                                  {plan.name}
                                </h3>
                                {plan.popular && (
                                  <span className="bg-brand text-scale-1 rounded-md py-0.5 px-2 text-[13px] font-medium">
                                    Mais Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-scale-11 text-sm mb-3">
                                {plan.description}
                              </p>
                              <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-semibold text-scale-12">
                                  {plan.price}
                                </span>
                                {plan.priceSub && (
                                  <span className="text-scale-10 text-sm">
                                    {plan.priceSub}
                                  </span>
                                )}
                              </div>
                              <ul className="space-y-2.5 mt-auto">
                                {plan.features.map((feature) => (
                                  <li key={feature} className="flex items-start gap-2">
                                    <Check className="size-4 mt-0.5 shrink-0 text-brand" />
                                    <span className="text-sm text-scale-11">
                                      {feature}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedPlan !== "free" && (
              <div className="rounded-xl border border-scale-5 bg-scale-3 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowPayment(!showPayment)}
                  className="w-full p-6 flex items-center justify-between hover:bg-scale-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-scale-4 shrink-0">
                      <CreditCard className="size-5 text-scale-11" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-sm font-medium text-scale-12">
                        Método de Pagamento
                      </h2>
                      <p className="text-sm text-scale-11">
                        {selectedPlan === "enterprise"
                          ? "Entre em contato para planos personalizados"
                          : "Adicione um cartão de crédito ou débito"}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`size-4 text-scale-11 transition-transform ${
                      showPayment ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showPayment && selectedPlan !== "enterprise" && (
                  <div className="px-6 pb-6 space-y-4 border-t border-scale-5 pt-6">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-scale-4 border border-scale-6">
                      <div className="size-8 rounded-md bg-scale-5 flex items-center justify-center text-xs font-bold text-scale-11 uppercase">
                        {selectedPlan}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-scale-12">
                          {plans.find((p) => p.id === selectedPlan)?.name}
                        </p>
                        <p className="text-xs text-scale-11">
                          {plans.find((p) => p.id === selectedPlan)?.price}
                          {plans.find((p) => p.id === selectedPlan)?.priceSub}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-scale-12 text-xs">Número do cartão</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="0000 0000 0000 0000"
                                className="bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-scale-12 text-xs">Validade</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="MM/AA"
                                  className="bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardCvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-scale-12 text-xs">CVV</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="123"
                                  className="bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-scale-12 text-xs">Nome do titular</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Como no cartão"
                                className="bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-start gap-2 text-xs text-scale-11">
                      <CreditCard className="size-3 mt-0.5 shrink-0" />
                      <p>
                        Seu cartão será cobrado mensalmente. Você pode cancelar a qualquer momento.
                        Nenhuma taxa será aplicada hoje.
                      </p>
                    </div>
                  </div>
                )}

                {showPayment && selectedPlan === "enterprise" && (
                  <div className="px-6 pb-6 space-y-4 border-t border-scale-5 pt-6">
                    <div className="flex flex-col items-center text-center py-4">
                      <p className="text-sm text-scale-11 mb-4">
                        Entre em contato com nosso time comercial para um orçamento personalizado.
                      </p>
                      <Button
                        type="button"
                        className="bg-brand text-scale-1 hover:bg-brand-hover border border-brand/30"
                      >
                        Falar com vendas
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-xl border border-scale-5 bg-scale-3 p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center size-10 rounded-lg bg-scale-4 shrink-0">
                  <Github className="size-5 text-scale-11" />
                </div>
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-scale-12 mb-1">
                    Conectar GitHub
                  </h2>
                  <p className="text-sm text-scale-11 mb-3">
                    Conecte sua conta GitHub para habilitar deploys automáticos e
                    integração com repositórios.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-scale-6 text-scale-12 hover:bg-scale-4"
                  >
                    <Github className="size-4" />
                    Conectar GitHub
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                className="text-scale-11 hover:text-scale-12 hover:bg-scale-4"
                asChild
              >
                <Link href="/dashboard">Cancelar</Link>
              </Button>
              <Button
                type="submit"
                className="bg-brand text-scale-1 hover:bg-brand-hover border border-brand/30 font-medium"
              >
                {selectedPlan === "free" ? "Criar Organização" : "Criar e Pagar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
