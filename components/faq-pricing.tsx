const faqs = [
  {
    q: "Posso limitar meu uso para não estourar a fatura?",
    a: "Sim. Os limites de gastos estão ativados por padrão no Plano Pro. Você pode desativá-los para uso além dos limites do Plano e pagar conforme crescer.",
  },
  {
    q: "Estou preocupado em receber uma conta enorme no fim do mês.",
    a: "Os limites de gastos estão ativados por padrão e você precisa desativá-los no seu dashboard para habilitar o modelo de pagamento conforme o uso.",
  },
  {
    q: "Quando serei cobrado?",
    a: "Nosso Plano Pro é cobrado adiantado, mensalmente. Custos de uso adicional também são cobrados ao final do mês.",
  },
  {
    q: "A Supabase cobra imposto sobre vendas, IVA ou GST?",
    a: "A Supabase aplica imposto sobre vendas, IVA, GST e outros impostos indiretos onde exigido por lei, com base no seu endereço de cobrança. Para mais detalhes, consulte nosso FAQ de faturamento.",
    href: "https://supabase.com/docs/guides/platform/billing-faq#taxes",
  },
  {
    q: "Vocês vão mudar os preços no futuro?",
    a: "Nossos preços estão em Beta. Você pode ler mais sobre nossas decisões em nosso post sobre preços. Os preços podem mudar no futuro, mas como uma equipe de desenvolvedores, estamos comprometidos em manter os preços o mais amigáveis possível para desenvolvedores.",
    href: "https://supabase.com/blog/2021/03/29/pricing",
  },
  {
    q: "O que acontece se eu cancelar minha assinatura?",
    a: "A organização recebe créditos pelo tempo não utilizado durante o mês de faturamento. Esses créditos podem ser usados para outros projetos.",
  },
  {
    q: "Recebo uma notificação quando estou próximo dos meus limites de uso?",
    a: "Sim, enviaremos um e-mail quando você estiver dentro de 20% dos limites do seu Plano.",
  },
  {
    q: "E se eu precisar de um projeto para desenvolvimento e outro para produção?",
    a: "Estamos trabalhando em projetos multi-ambiente. Por enquanto, você pode criar um projeto para seu backend de desenvolvimento e outro para produção. Oferecemos 2 projetos gratuitos como parte do nosso Plano Free. Isso significa que você pode ter um servidor de desenvolvimento e um de produção no Plano Free.",
  },
  {
    q: "Posso auto-hospedar o Supabase gratuitamente?",
    a: "Sim, você pode usar o Docker setup ou o Supabase CLI. O Supabase Studio também está disponível no Docker setup.",
    href: "https://supabase.com/docs/guides/hosting/docker",
  },
  {
    q: "Posso pausar um projeto gratuito?",
    a: "Sim, você pode pausar um projeto a qualquer momento. Nosso Plano Free oferece 2 projetos gratuitos, mas você pode ter quantos projetos pausados quiser. Basta pausar e despausar conforme necessário.",
  },
];

export function FaqPricing() {
  return (
    <div className="border-t border-scale-5 mt-16 pt-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-scale-12 text-center mb-12">
          Perguntas frequentes
        </h2>

        <div className="divide-y divide-scale-5">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex items-center justify-between cursor-pointer text-scale-12 font-medium text-sm list-none">
                {faq.q}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-scale-10 shrink-0 group-open:rotate-180 transition-transform"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="text-scale-11 text-sm mt-3 leading-relaxed">
                {faq.a}
                {faq.href && (
                  <>
                    {" "}
                    <a
                      href={faq.href}
                      target="_blank"
                      className="text-brand hover:text-brand-hover underline"
                    >
                      Saiba mais
                    </a>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
