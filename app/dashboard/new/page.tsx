import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, Check, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Nova Organização | Developer Platform",
  description: "Crie uma nova organização na Developer Platform.",
};

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfeito para projetos pessoais e sites simples.",
    price: "$0",
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
    id: "pro",
    name: "Pro",
    description: "Para aplicações em produção com poder de escalar.",
    price: "A partir de $25",
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
    id: "team",
    name: "Team",
    description: "Recursos avançados para equipes como SSO e auditoria.",
    price: "A partir de $599",
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
    id: "enterprise",
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
  return (
    <div className="flex min-h-svh flex-col">
      <div className="container mx-auto px-6 py-16 md:py-24 lg:px-16 xl:px-20 w-full max-w-4xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center size-10 rounded-lg bg-scale-3 border border-scale-5">
              <Building2 className="size-5 text-scale-11" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-scale-12">
                Criar nova organização
              </h1>
              <p className="text-scale-11 text-sm mt-1">
                Crie uma organização para gerenciar seus projetos e colaboradores.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
          <div className="rounded-xl border border-scale-5 bg-scale-3 p-6">
            <h2 className="text-base font-medium text-scale-12 mb-1">
              Nome da organização
            </h2>
            <p className="text-sm text-scale-11 mb-4">
              Escolha um nome para sua organização.
            </p>
            <div className="relative">
              <Input
                id="org-name"
                placeholder="Ex: Minha Empresa"
                className="pl-9 bg-scale-2 border-scale-6 text-scale-12 placeholder:text-scale-9"
              />
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-scale-9" />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h2 className="text-base font-medium text-scale-12">
                Selecione um plano
              </h2>
              <p className="text-sm text-scale-11 mt-1">
                Escolha o plano ideal para sua organização.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className={`relative rounded-xl p-px cursor-pointer transition-all ${
                    plan.popular
                      ? "bg-linear-to-b from-brand/40 to-scale-6 ring-1 ring-brand/30"
                      : "bg-linear-to-b from-scale-6 to-scale-5 hover:from-scale-7 hover:to-scale-6"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    defaultChecked={plan.popular}
                    className="sr-only peer"
                  />
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
                  <div className="absolute inset-0 rounded-xl ring-2 ring-transparent peer-checked:ring-brand transition-all" />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-scale-5 bg-scale-3 p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center size-10 rounded-lg bg-scale-4 shrink-0">
                <Github className="size-5 text-scale-11" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-medium text-scale-12 mb-1">
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
              Criar Organização
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
