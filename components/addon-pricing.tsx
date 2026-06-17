const addons = [
  {
    label: "Disponível no Plano Pro",
    title: "Cost Control",
    description:
      "O Plano Pro tem um limite de gastos ativado por padrão para manter os custos sob controle. Se você quiser escalar além da cota incluída no plano, basta desativar o limite de gastos para pagar por recursos adicionais.",
    href: "https://supabase.com/docs/guides/platform/cost-control#spend-cap",
    cta: "Saiba mais sobre Cost Control",
    featured: true,
  },
  {
    label: "Taxa fixa de R$ 81/mês",
    title: "Custom Domain",
    description:
      "Use seu próprio domínio para seu projeto Supabase e ofereça uma experiência personalizada aos seus usuários.",
    href: "https://supabase.com/docs/guides/platform/custom-domains",
    cta: null,
  },
  {
    label: "A partir de R$ 813/mês",
    title: "Point in Time Recovery",
    description:
      "Volte para qualquer ponto específico no tempo, com precisão de segundos.",
    href: "https://supabase.com/docs/guides/platform/backups",
    cta: null,
  },
];

export function AddonPricing() {
  return (
    <div className="border-t border-scale-5 mt-16 pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-scale-12">
            Personalize seu projeto
          </h2>
          <p className="text-scale-11 text-lg mt-4">
            Vá além dos limites do seu plano e evolua sua experiência com Supabase.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mx-auto">
          {addons.map((addon) => (
            <a
              key={addon.title}
              href={addon.href}
              target="_blank"
              className={`group relative bg-scale-3 border border-scale-5 rounded-xl gap-4 transition-colors flex flex-col ${
                addon.featured
                  ? "lg:col-span-2 lg:flex-row p-5 lg:p-6"
                  : "lg:col-span-1 p-5 hover:border-scale-7 hover:bg-scale-4"
              }`}
            >
              <div className="flex flex-col gap-2 w-full">
                {addon.label && (
                  <p className="text-[13px] text-scale-10 font-mono" translate="no">
                    {addon.label}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-scale-12 ${
                      addon.featured ? "text-2xl" : "text-sm"
                    }`}
                  >
                    {addon.title}
                  </h3>
                </div>
                <p className="text-scale-11 text-[13px] leading-relaxed">
                  {addon.description}
                </p>
                {addon.cta && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-scale-11 border border-scale-6 bg-scale-4 hover:bg-scale-5 rounded-md px-2.5 py-1 transition-colors">
                      {addon.cta}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute right-0 top-0 flex justify-end p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-scale-9 group-hover:text-scale-11 transition-colors"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
