"use client";

import { useState, useRef, useEffect } from "react";
import { Info, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const computeSizes = [
  { label: "Micro", price: 10, cpu: "2-core ARM", ram: "1 GB RAM", dedicated: false, direct: 60, pooler: 200 },
  { label: "Small", price: 15, cpu: "2-core ARM", ram: "2 GB RAM", dedicated: false, direct: 90, pooler: 400 },
  { label: "Medium", price: 60, cpu: "2-core ARM", ram: "4 GB RAM", dedicated: false, direct: 120, pooler: 600 },
  { label: "Large", price: 110, cpu: "2-core ARM", ram: "8 GB RAM", dedicated: true, direct: 160, pooler: 800 },
  { label: "XL", price: 210, cpu: "4-core ARM", ram: "16 GB RAM", dedicated: true, direct: 240, pooler: 1000 },
  { label: "2XL", price: 410, cpu: "8-core ARM", ram: "32 GB RAM", dedicated: true, direct: 380, pooler: 1500 },
  { label: "4XL", price: 960, cpu: "16-core ARM", ram: "64 GB RAM", dedicated: true, direct: 480, pooler: 3000 },
  { label: "8XL", price: 1870, cpu: "32-core ARM", ram: "128 GB RAM", dedicated: true, direct: 490, pooler: 6000 },
  { label: "12XL", price: 2800, cpu: "48-core ARM", ram: "192 GB RAM", dedicated: true, direct: 500, pooler: 9000 },
  { label: "16XL", price: 3730, cpu: "64-core ARM", ram: "256 GB RAM", dedicated: true, direct: 500, pooler: 12000 },
];

const planPricing = { Pro: 25, Team: 599 } as const;

export function ComputePricing() {
  const [plan, setPlan] = useState<"Pro" | "Team">("Pro");
  const [computeIndex, setComputeIndex] = useState(0);
  const [spendCapOn, setSpendCapOn] = useState(true);
  const [showComputeInfo, setShowComputeInfo] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowComputeInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const planCost = planPricing[plan]!;
  const activeCompute = computeSizes[computeIndex]!;
  const computeCost = activeCompute.price;
  const credits = 10;
  const total = planCost + Math.max(0, computeCost - credits);

  return (
    <div className="border-t border-scale-5 mt-16 pt-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-scale-12">
            Como funciona o preço do compute
          </h2>
          <p className="text-scale-11 text-lg mt-3">
            Escolha um plano, adicione projetos e veja seu custo total.
          </p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-scale-10 text-xs font-mono uppercase tracking-widest">
            Passo 1
          </span>
          <div ref={infoRef} className="relative">
            <button
              onClick={() => setShowComputeInfo(!showComputeInfo)}
              className="inline-flex items-center gap-1.5 rounded-full bg-scale-5 hover:bg-scale-6 text-scale-11 text-xs px-3 py-1 transition-colors cursor-pointer"
            >
              <Info className="size-3" />
              O que é &ldquo;compute&rdquo;?
            </button>
            {showComputeInfo && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-scale-2 border border-scale-6 rounded-xl shadow-2xl p-4 z-50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-scale-12 text-sm font-semibold">
                    O que é compute?
                  </h4>
                  <button
                    onClick={() => setShowComputeInfo(false)}
                    aria-label="Fechar"
                    className="text-scale-10 hover:text-scale-12 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <p className="text-scale-11 text-xs leading-relaxed">
                  Compute se refere aos recursos de CPU e memória alocados para
                  a instância do banco de dados do seu projeto. Tamanhos maiores
                  de compute oferecem mais poder de processamento, memória e
                  limites de conexão mais altos — resultando em consultas mais
                  rápidas e capacidade de atender mais usuários simultâneos.
                </p>
              </div>
            )}
          </div>
        </div>
        <h3 className="text-scale-12 text-lg font-semibold mb-4">
          Escolha seu plano
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {(["Pro", "Team"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`rounded-xl border p-4 text-left transition-all ${
                plan === p
                  ? "border-brand bg-brand/5"
                  : "border-scale-6 bg-scale-3 hover:border-scale-8"
              }`}
            >
              <span className="text-scale-12 text-sm font-semibold">{p}</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-scale-12 text-2xl font-semibold">
                  ${planPricing[p]}
                </span>
                <span className="text-scale-10 text-sm">/mês</span>
              </div>
              <p className="text-scale-11 text-xs mt-2">
                {p === "Pro"
                  ? "Primeiro projeto incluído. Projetos adicionais a partir de $10/mês."
                  : "Primeiro projeto incluído. Projetos adicionais a partir de $10/mês."}
              </p>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-2 mt-10">
          <span className="inline-flex items-center gap-1 text-scale-10 text-xs font-mono uppercase tracking-widest">
            Passo 2
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-scale-12 text-lg font-semibold">
            Configure o compute
          </h3>
          <span className="text-scale-10 text-sm">
            <SlidersHorizontal className="size-3 inline mr-1" />
            Arraste para ajustar
          </span>
        </div>

        <div className="bg-scale-3 border border-scale-6 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-scale-12 text-sm font-medium">
              {activeCompute.label}
            </span>
            <span className="text-scale-12 text-lg font-semibold">
              ${activeCompute.price}
              <span className="text-scale-10 text-sm font-normal">/mês</span>
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={computeSizes.length - 1}
            value={computeIndex}
            onChange={(e) => setComputeIndex(Number(e.target.value))}
            className="w-full accent-brand h-2 rounded-full appearance-none cursor-pointer bg-scale-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-scale-1 [&::-webkit-slider-thumb]:shadow-md"
          />

          <div className="flex justify-between text-xs text-scale-10 mt-1.5">
            <span>Micro ($10)</span>
            <span>16XL ($3,730)</span>
          </div>

          <div className="border-t border-scale-5 mt-6 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-scale-11 text-sm">{plan} - Assinatura do plano</span>
              <span className="text-scale-12 text-sm font-medium">${planCost}.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-scale-11 text-sm">Total do Compute</span>
              <span className="text-scale-12 text-sm font-medium">${computeCost}.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-scale-11 text-sm">Créditos de Compute</span>
              <span className="text-scale-12 text-sm font-medium text-brand">
                -${credits}.00
              </span>
            </div>
            {plan === "Team" && (
              <div className="flex justify-between items-center">
                <span className="text-scale-11 text-sm">Membro do Team (x2)</span>
                <span className="text-scale-12 text-sm font-medium">$0.00</span>
              </div>
            )}
            <div className="border-t border-scale-5 pt-2 flex justify-between items-center">
              <span className="text-scale-12 text-sm font-semibold">
                Estimativa mensal
              </span>
              <span className="text-scale-12 text-lg font-semibold">
                ${total}.00
              </span>
            </div>
          </div>

          <p className="text-scale-10 text-xs mt-3">
            Planos pagos incluem <strong className="text-scale-12">$10/mês em créditos de compute</strong>,
            suficientes para cobrir uma instância Micro.
          </p>
        </div>

        <div className="flex items-center justify-between bg-scale-3 border border-scale-6 rounded-xl p-4 mb-8">
          <div>
            <span className="text-scale-12 text-sm font-medium">Limite de Gastos</span>
            <p className="text-scale-10 text-xs mt-0.5">
              {spendCapOn
                ? "Você não será cobrado além do seu plano"
                : "Você pode usar recursos além do seu plano"}
            </p>
          </div>
          <button
            role="switch"
            aria-checked={spendCapOn}
            onClick={() => setSpendCapOn(!spendCapOn)}
            className={`relative inline-flex h-5 w-[34px] shrink-0 cursor-pointer items-center rounded-full transition-colors ${
              spendCapOn ? "bg-brand" : "bg-scale-6"
            }`}
          >
            <span
              className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform ${
                spendCapOn ? "translate-x-[18px]" : "translate-x-[2px]"
              }`}
            />
          </button>
        </div>

        <div className="border border-scale-6 rounded-xl overflow-hidden mb-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between p-4 bg-scale-3 hover:bg-scale-4 transition-colors text-left"
          >
            <div>
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-brand bg-brand/10 rounded-md px-2 py-0.5 mb-1.5">
                A partir de $10/mês
              </span>
              <div className="text-scale-12 text-base font-semibold">
                Escalone o compute até 64 cores e 256 GB de RAM
              </div>
            </div>
            <ChevronDown
              className={`size-5 text-scale-10 shrink-0 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded && (
            <div className="border-t border-scale-6 p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-scale-5">
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">Tamanho</th>
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">Preço (USD)</th>
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">CPU</th>
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">Dedicado</th>
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">Memória</th>
                      <th className="text-left text-scale-10 font-medium py-2 pr-3">Conexões: Direct</th>
                      <th className="text-left text-scale-10 font-medium py-2">Conexões: Pooler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {computeSizes.map((size) => (
                      <tr
                        key={size.label}
                        className={`border-b border-scale-5 ${
                          activeCompute.label === size.label ? "bg-brand/5" : ""
                        }`}
                      >
                        <td className="py-2.5 pr-3">
                          <span
                            className={`font-medium ${
                              activeCompute.label === size.label
                                ? "text-brand"
                                : "text-scale-12"
                            }`}
                          >
                            {size.label}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-scale-11">${size.price}/mês</td>
                        <td className="py-2.5 pr-3 text-scale-11">{size.cpu}</td>
                        <td className="py-2.5 pr-3">
                          {size.dedicated ? (
                            <span className="text-brand">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </span>
                          ) : (
                            <span className="text-scale-8">&mdash;</span>
                          )}
                        </td>
                        <td className="py-2.5 pr-3 text-scale-11">{size.ram}</td>
                        <td className="py-2.5 pr-3 text-scale-11">{size.direct.toLocaleString()}</td>
                        <td className="py-2.5 text-scale-11">{size.pooler.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2.5 pr-3">
                        <span className="font-medium text-scale-12">&gt;16XL</span>
                      </td>
                      <td className="py-2.5 pr-3">
                          <a
                            href="https://supabase.com/contact/enterprise"
                            target="_blank"
                            className="text-brand hover:text-brand-hover text-sm font-medium"
                          >
                            Fale Conosco
                          </a>
                      </td>
                      <td className="py-2.5 pr-3 text-scale-11">Custom</td>
                      <td className="py-2.5 pr-3">
                        <span className="text-brand">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                      </td>
                        <td className="py-2.5 pr-3 text-scale-11">Personalizado</td>
                        <td className="py-2.5 pr-3 text-scale-11">Personalizado</td>
                        <td className="py-2.5 text-scale-11">Personalizado</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-scale-10 text-xs mt-3">
                Primeira instância é gratuita nos planos pagos
              </p>

              <div className="text-center mt-4">
                <a
                  href="https://supabase.com/docs/guides/platform/compute-add-ons"
                  target="_blank"
                  className="text-brand hover:text-brand-hover text-sm font-medium transition-colors"
                >
                  Saiba mais sobre Compute add-ons &rarr;
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          <div>
            <h4 className="text-scale-12 text-lg font-semibold mb-3">
              Escolha o melhor tamanho de compute para você
            </h4>
            <p className="text-scale-11 text-sm leading-relaxed mb-3">
              Todo projeto na Plataforma Supabase vem com sua própria instância
              Postgres dedicada. Selecione o tamanho de compute que atende
              às suas necessidades.
            </p>
            <p className="text-scale-11 text-sm leading-relaxed mb-4">
              Instâncias de compute são cobradas por hora e você pode escalar
              para cima ou para baixo a qualquer momento. Planos pagos vêm com
              $10/mês em créditos de compute para cobrir uma instância Micro ou
              abater o custo de qualquer outra instância.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a
                href="https://supabase.com/docs/guides/platform/manage-your-usage/compute"
                target="_blank"
                className="text-brand hover:text-brand-hover transition-colors"
              >
                Leia mais sobre faturamento baseado em uso para compute &rarr;
              </a>
              <a
                href="https://supabase.com/docs/guides/platform/compute-add-ons"
                target="_blank"
                className="text-brand hover:text-brand-hover transition-colors"
              >
                Compute Add-ons &rarr;
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-scale-6)_0%,_transparent_70%)]" />
              <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-brand/20 via-scale-4 to-scale-4 border border-scale-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-brand text-3xl font-semibold">DB</div>
                  <div className="text-scale-10 text-xs mt-1">Compute</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
