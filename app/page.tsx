import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SupabaseLogo } from "@/components/supabase-logo";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 p-4">
      <span className="text-scale-11">
        <SupabaseLogo />
      </span>
      <h1 className="text-2xl font-semibold tracking-tight text-scale-12">
        Developer Platform
      </h1>
      <div className="flex gap-3">
        <Button asChild size="lg" variant="outline" className="border-scale-6 bg-scale-2 text-scale-12 hover:bg-scale-3">
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="lg" className="bg-brand text-black hover:bg-brand-hover font-medium">
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
