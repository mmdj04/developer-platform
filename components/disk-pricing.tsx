export function DiskPricing() {
  return (
    <div className="border-t border-scale-5 mt-16 pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-scale-12">
            Configurações avançadas de disco
          </h2>
          <p className="text-scale-11 text-lg mt-4">
            Escalone o armazenamento do banco de dados até 60 TB e 80.000 IOPS.
          </p>
        </div>

        <div className="overflow-x-auto">
        <table className="text-scale-12 w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="p-3 text-left font-medium" />
              <th className="p-3 text-left font-medium text-scale-10">Tamanho Máx.</th>
              <th className="p-3 text-left font-medium text-scale-10">Tamanho</th>
              <th className="p-3 text-left font-medium text-scale-10">IOPS</th>
              <th className="p-3 text-left font-medium text-scale-10">Taxa de Transferência</th>
              <th className="p-3 text-left font-medium text-scale-10">Durabilidade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-scale-3 rounded-lg">
              <td className="p-3">
                <span className="text-base font-medium text-scale-12">General Purpose</span>
                <br />
                <span className="text-scale-10 text-sm">Equilíbrio entre preço e desempenho</span>
              </td>
              <td className="p-3 text-scale-11">16 TB</td>
              <td className="p-3 text-scale-11 whitespace-pre-line">
                {"8 GB incluídos\ndepois R$ 0,87 por GB"}
              </td>
              <td className="p-3 text-scale-11 whitespace-pre-line">
                {"3.000 IOPS incluídos\ndepois R$ 0,17 por IOPS"}
              </td>
              <td className="p-3 text-scale-11 whitespace-pre-line">
                {"125 MB/s incluídos\ndepois R$ 0,66 por MB/s"}
              </td>
              <td className="p-3 text-scale-11">99.9%</td>
            </tr>
            <tr className="bg-scale-3 rounded-lg mt-2">
              <td className="p-3">
                <span className="text-base font-medium text-scale-12">High Performance</span>
                <br />
                <span className="text-scale-10 text-sm">Para aplicações de missão crítica</span>
              </td>
              <td className="p-3 text-scale-11">60 TB</td>
              <td className="p-3 text-scale-11 whitespace-pre-line">R$ 1,36 por GB</td>
              <td className="p-3 text-scale-11 whitespace-pre-line">R$ 0,83 por IOPS</td>
              <td className="p-3 text-scale-11 whitespace-pre-line">
                Escala automaticamente com IOPS
              </td>
              <td className="p-3 text-scale-11">99.999%</td>
            </tr>
          </tbody>
        </table>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://supabase.com/docs/guides/platform/compute-and-disk#disk"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-brand hover:text-brand-hover text-sm font-medium transition-colors"
          >
            Saiba mais sobre configurações avançadas de disco
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
              className="w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
