import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ComputePricing } from "@/components/compute-pricing";
import { DiskPricing } from "@/components/disk-pricing";
import { AddonPricing } from "@/components/addon-pricing";
import { FaqPricing } from "@/components/faq-pricing";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Preços | SDKdoMatheus",
  description: "Planos e preços do SDKdoMatheus. Escolha o plano ideal para seu projeto, desde o plano gratuito até planos empresariais com suporte dedicado.",
};

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  name: string;
  badge?: string;
  description: string;
  price: string;
  priceSub?: string;
  cta: string;
  href: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    description: "Perfeito para projetos pessoais e sites simples.",
    price: "R$ 0",
    priceSub: "/mês",
    cta: "Começar Grátis",
    href: "/auth/sign-up",
    features: [
      { text: "Requisições de API ilimitadas" },
      { text: "50.000 usuários ativos mensais" },
      { text: "500 MB de banco de dados" },
      { text: "CPU compartilhada - 500 MB de RAM" },
      { text: "5 GB de egress" },
      { text: "5 GB de egress em cache" },
      { text: "1 GB de armazenamento" },
      { text: "Suporte da comunidade" },
    ],
  },
  {
    name: "Pro",
    badge: "Mais Popular",
    description: "Para aplicações em produção com poder de escalar.",
    price: "A partir de R$ 175",
    priceSub: "/mês",
    cta: "Começar Agora",
    href: "/auth/sign-up",
    popular: true,
    features: [
      { text: "100.000 usuários ativos mensais" },
      { text: "8 GB de disco por projeto" },
      { text: "250 GB de egress", highlight: true },
      { text: "250 GB de egress em cache", highlight: true },
      { text: "100 GB de armazenamento" },
      { text: "Suporte por e-mail" },
      { text: "Backups diários retidos por 7 dias" },
      { text: "Retenção de logs por 7 dias" },
    ],
  },
  {
    name: "Team",
    description: "Adicione recursos como SSO, controle sobre backups e certificações do setor.",
    price: "A partir de R$ 4.186",
    priceSub: "/mês",
    cta: "Começar Agora",
    href: "/auth/sign-up",
    features: [
      { text: "SOC2 e ISO 27001" },
      { text: "Acesso por escopo de projeto e somente leitura" },
      { text: "HIPAA disponível como add-on pago" },
      { text: "SSO para o Dashboard do Supabase" },
      { text: "Suporte prioritário por e-mail e SLAs" },
      { text: "Backups diários retidos por 14 dias" },
      { text: "Retenção de logs por 28 dias" },
    ],
  },
  {
    name: "Enterprise",
    description: "Para aplicações de grande escala rodando cargas de trabalho de internet.",
    price: "Sob Consulta",
    cta: "Fale Conosco",
    href: "/auth/sign-up",
    features: [
      { text: "Gerente de Suporte dedicado" },
      { text: "SLAs de uptime" },
      { text: "Suporte a BYO Cloud" },
      { text: "Suporte empresarial premium 24x7x365" },
      { text: "Canal privado no Slack" },
      { text: "Questionários de segurança personalizados" },
    ],
  },
];

export default function Pricing() {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 w-full">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-scale-12">
            Preços previsíveis,<br className="block lg:hidden" />{" "}
            <span className="text-scale-11">projetados para escalar.</span>
          </h1>
          <p className="text-scale-11 text-lg mt-4 max-w-2xl">
            Comece a construir de graça, colabore com sua equipe e escale para
            milhões de usuários.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-px ${plan.popular ? "bg-linear-to-b from-brand/40 to-scale-6" : "bg-linear-to-b from-scale-6 to-scale-5 dark:to-scale-4"}`}
            >
              <div className="relative z-10 w-full h-full rounded-[11px] bg-scale-3 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-scale-12 text-lg font-semibold">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="bg-scale-12 text-scale-1 rounded-md py-0.5 px-2 text-[13px] font-medium">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-scale-11 text-sm mb-4">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-semibold text-scale-12">
                    {plan.price}
                  </span>
                  {plan.priceSub && (
                    <span className="text-scale-10 text-sm">{plan.priceSub}</span>
                  )}
                </div>

                <Button
                  asChild
                  className={`mb-6 w-full ${plan.popular ? "bg-brand text-black hover:bg-brand-hover border border-brand/30 hover:border-brand" : "bg-scale-3 hover:bg-scale-5 border border-scale-5 text-scale-12 hover:border-scale-8"}`}
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>

                <div className="border-t border-scale-5 pt-4 mt-auto">
                  <p className="text-scale-12 text-sm font-medium mb-3">
                    {plan.name === "Free"
                      ? "Comece com:"
                      : plan.name === "Enterprise"
                        ? ""
                        : "Tudo do plano Free, mais:"}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2">
                        <Check
                          className={`size-4 mt-0.5 shrink-0 ${feature.highlight ? "text-brand" : "text-brand/70"}`}
                        />
                        <span
                          className={`text-sm ${feature.highlight ? "text-scale-12" : "text-scale-12"}`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-scale-5 mt-16 pt-8 text-center">
          <p className="text-scale-11 text-sm">
            Projetos gratuitos são pausados após 1 semana de inatividade. Limite
            de 2 projetos ativos.
          </p>
        </div>

        <ComputePricing />
        <DiskPricing />
        <AddonPricing />
        <FaqPricing />
      </div>
    </div>
  );
}
