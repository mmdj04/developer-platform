import { SupabaseLogo } from "@/components/supabase-logo";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center">
          <span className="text-scale-11">
            <SupabaseLogo />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
            Obrigado por se cadastrar!
          </h1>
          <p className="text-sm text-scale-11">Verifique seu email para confirmar</p>
        </div>
        <p className="text-center text-sm text-scale-11">
          Cadastro realizado com sucesso. Verifique seu email para confirmar
          sua conta antes de entrar.
        </p>
      </div>
    </div>
  );
}
