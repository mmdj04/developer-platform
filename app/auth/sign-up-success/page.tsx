import { SupabaseLogo } from "@/components/supabase-logo";

export default function Page() {
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
            Thank you for signing up!
          </h1>
          <p className="text-sm text-muted-foreground">
            Check your email to confirm
          </p>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          You&apos;ve successfully signed up. Please check your email to confirm
          your account before signing in.
        </p>
      </div>
    </div>
  );
}
