import { SupabaseLogo } from "@/components/supabase-logo";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="text-sm text-muted-foreground">
      {params?.error
        ? `Error: ${params.error}`
        : "An unspecified error occurred."}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex justify-center">
          <span className="text-foreground">
            <SupabaseLogo />
          </span>
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sorry, something went wrong.
          </h1>
        </div>
        <div className="text-center">
          <Suspense>
            <ErrorContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
