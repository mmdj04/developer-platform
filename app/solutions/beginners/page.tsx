import Link from "next/link";

const frameworks = [
  { name: "React", icon: "⚛️", href: "https://supabase.com/docs/guides/getting-started/quickstarts/reactjs" },
  { name: "Next.js", icon: "▲", href: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" },
  { name: "RedwoodJS", icon: "🌲", href: "https://supabase.com/docs/guides/getting-started/quickstarts/redwoodjs" },
  { name: "Flutter", icon: "🦋", href: "https://supabase.com/docs/guides/getting-started/quickstarts/flutter" },
  { name: "Kotlin", icon: "🅺", href: "https://supabase.com/docs/guides/getting-started/quickstarts/kotlin" },
  { name: "Svelte", icon: "🧡", href: "https://supabase.com/docs/guides/getting-started/quickstarts/svelte" },
  { name: "SolidJS", icon: "💠", href: "https://supabase.com/docs/guides/getting-started/quickstarts/solidjs" },
  { name: "Vue", icon: "💚", href: "https://supabase.com/docs/guides/getting-started/quickstarts/vue" },
  { name: "Nuxt", icon: "🍃", href: "https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs" },
  { name: "Refine", icon: "⚡", href: "https://supabase.com/docs/guides/getting-started/quickstarts/refine" },
];

const aiPrompts = [
  {
    title: "Bootstrap Next.js app with Supabase Auth",
    href: "https://supabase.com/docs/guides/getting-started/ai-prompts/nextjs",
    code: `1. Install @supabase/supabase-js and @supabase/ssr packages.
2. Set up environment variables.
3. Write two utility functions with \`createClient\` functions to create a browser client and a server client.
4. Hook up middleware to refresh auth tokens`,
  },
  {
    title: "Writing Supabase Edge Functions",
    href: "https://supabase.com/docs/guides/getting-started/ai-prompts/edge-functions",
    code: `1. Try to use Web APIs and Deno's core APIs instead of external dependencies (eg: use fetch instead of Axios, use WebSockets API instead of node-ws)
2. If you are reusing utility methods between Edge Functions, add them to 'supabase/functions/_shared' and import using a relative path. Do NOT have cross dependencies between Edge Functions.
3. Do NOT use bare specifiers when importing dependecnies. If you need to use an external dependency, make sure it's prefixed with either 'npm:' or 'jsr:'. For example, '@supabase/supabase-js' should be written as 'npm:@supabase/supabase-js'.
4. For external imports, always define a version. For example, 'npm:@express' should be written as 'npm:express@4.18.2'.
5. For external dependencies, importing via 'npm:' and 'jsr:' is preferred. Minimize the use of imports from @'deno.land/x', 'esm.sh' and @'unpkg.com'. If you have a package from one of those CDNs, you can replace the CDN hostname with 'npm:' specifier.`,
  },
  {
    title: "Declarative Database Schema",
    href: "https://supabase.com/docs/guides/getting-started/ai-prompts/declarative-database-schema",
    code: `Mandatory Instructions for Supabase Declarative Schema Management
## 1. **Exclusive Use of Declarative Schema**
-**All database schema modifications must be defined within '.sql' files located in the 'supabase/schemas/' directory.`,
  },
  {
    title: "Create RLS policies",
    href: "https://supabase.com/docs/guides/getting-started/ai-prompts/database-rls-policies",
    code: `You're a Supabase Postgres expert in writing row level security policies. Your purpose is to generate a policy with the constraints given by the user. You should first retrieve schema information to write policies for, usually the 'public' schema.
The output should use the following instructions:
- The generated SQL must be valid SQL.`,
  },
];

const tools = [
  { name: "Cursor", icon: "◎" },
  { name: "Visual Studio Code (Copilot)", icon: "◇" },
  { name: "Claude", icon: "○" },
  { name: "TRAE", icon: "□" },
  { name: "Windsurf", icon: "△" },
  { name: "Cline", icon: "☆" },
];

const platforms = [
  "macOS", "Windows", "Windows (WSL)", "Linux",
];

const testimonials = [
  {
    handle: "@nerdburn",
    text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Almost too easy! Highly recommend.",
  },
  {
    handle: "@patrickc",
    text: "Very impressed by @supabase's growth. For new startups, they seem to have gone from 'promising' to 'standard' in remarkably short order.",
  },
  {
    handle: "@Aliahsan_sfv",
    text: "Okay, I finally tried Supabase today and wow... why did I wait so long? 😅 Went from 'how do I even start' to having auth + database + real-time updates working in like 20 minutes. Sometimes the hype is actually justified! #Supabase",
  },
  {
    handle: "@yatsiv_yuriy",
    text: "Supabase is the best product experience I've had in years. Not just tech - taste. From docs to latency to the URL structure that makes you think 'oh, that's obvious' Feels like every other platform should study how they built it @supabase I love you",
  },
  {
    handle: "@adeelibr",
    text: "@supabase shout out, their MCP is awesome. It's helping me create better row securities and telling me best practises for setting up a supabase app",
  },
  {
    handle: "@TyronBache",
    text: "Really impressed with @supabase's Assistant. It has helped me troubleshoot and solve complex CORS Configuration issues on Pinger.",
  },
  {
    handle: "@MinimEditor",
    text: "I've always used Supabase just as a database. Yesterday, I helped debug a founder's vibe-coding project built with React + React Router — no backend server. The 'backend' was entirely Supabase Edge Functions as the API. First time using Supabase this way. Impressive.",
  },
  {
    handle: "@SteinlageScott",
    text: "I love @supabase's built-in Advisors. The security and performance linters improve everything and boost my confidence in what I'm building!",
  },
  {
    handle: "@BowTiedQilin",
    text: "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.",
  },
  {
    handle: "@gokul_i",
    text: "First time running @supabase in local. It just works. Very good DX imo.",
  },
  {
    handle: "@viratt_mankali",
    text: "Love how Supabase makes full stack features this easy. Using it with Next.js and loving the experience!",
  },
  {
    handle: "@pontusab",
    text: "I love everything about Supabase.",
  },
];

const features = [
  {
    title: "Database",
    description:
      "A fully managed database that's simple for creators and trusted by enterprises. 100% portable Built-in Auth with RLS Easy to extend",
    icon: "🗄️",
  },
  {
    title: "Auto-generated APIs",
    description:
      "Learn SQL when you're ready. In the meantime, Supabase generates automatic APIs to make coding a lot easier.",
    icon: "🔌",
  },
  {
    title: "Role-Based Access Control",
    description: "Secure your data properly.",
    icon: "🛡️",
  },
  {
    title: "Authentication",
    description:
      "Let your users login with email, Google, Apple, GitHub, and more. Secure and trusted.",
    icon: "🔐",
  },
  {
    title: "Storage",
    description:
      "Affordable and fast, for all the videos and images you need in your app.",
    icon: "📦",
  },
  {
    title: "Realtime",
    description: "Build immersive multi-player, collaborative experiences.",
    icon: "⚡",
  },
  {
    title: "AI Ready",
    description:
      "When you're ready to explore vectors and the power of AI, Supabase is there with industry-standard tools to guide you.",
    icon: "🤖",
  },
  {
    title: "Edge Functions",
    description:
      "Custom backend logic when you want to dive into code.",
    icon: "🌐",
  },
  {
    title: "Foreign Data Wrappers",
    description:
      "Pull data from Stripe, Google Sheets, Airtable, HubSpot, and more, as if they were part of Supabase natively.",
    icon: "🔗",
  },
];

const whyCards = [
  {
    title: "Instant backend",
    description:
      "Deploy a database in seconds. Choose your front-end framework and platform. Start coding and learning. With Supabase, batteries are always included.",
  },
  {
    title: "Everything you need to learn and build",
    description:
      "Supabase offers a fully integrated suite of tools including authentication, storage, edge functions, real-time subscriptions, and vector search. Use one or all.",
  },
  {
    title: "Scalable and dependable",
    description:
      "Supabase is just Postgres, the world's most popular and dependable database. When you're ready to grow, Supabase will be there for you.",
  },
];

function TestimonialCard({
  handle,
  text,
}: {
  handle: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-scale-6 bg-scale-2 p-5">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-scale-5 text-sm font-medium text-scale-11">
          {(handle[1] ?? "?").toUpperCase()}
        </div>
        <span className="text-sm font-medium text-scale-11">{handle}</span>
      </div>
      <p className="text-sm leading-relaxed text-scale-11">{text}</p>
    </div>
  );
}

function FrameworkCard({ name, icon, href }: { name: string; icon: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex cursor-pointer items-center gap-3 rounded-xl border border-scale-6 bg-scale-2 px-5 py-4 transition-colors hover:border-scale-7 hover:bg-scale-3">
      <span className="flex size-10 items-center justify-center rounded-lg bg-scale-4 text-lg">
        {icon}
      </span>
      <span className="text-sm font-medium text-scale-12">{name}</span>
    </a>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-scale-6 bg-scale-2 p-6">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-base font-semibold text-scale-12">{title}</h3>
      <p className="text-sm leading-relaxed text-scale-11">{description}</p>
    </div>
  );
}

export default function BeginnersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-scale-1">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-scale-6 bg-scale-1/80 px-6 backdrop-blur-md">
        <Link href="/" className="text-sm text-scale-11 hover:text-scale-12 transition-colors">
          Developer Platform
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-scale-11 hover:text-scale-12 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-black hover:bg-brand-hover transition-colors"
          >
            Start your project
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-scale-6 px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-scale-6 bg-scale-2 px-3 py-1 text-xs text-scale-11">
              Supabase for Beginner Developers
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-scale-12 sm:text-6xl">
              Build in a weekend.
              <br />
              Scale to millions.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-scale-11">
              Learning to build a full-stack application is exciting. Supabase gives you the
              tools, documentation, and community that makes managing databases, authentication,
              and backend infrastructure a lot less overwhelming. Ship faster and learn by doing
              with Supabase.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/auth/sign-up"
                className="rounded-md bg-brand px-6 py-3 text-sm font-medium text-black hover:bg-brand-hover transition-colors"
              >
                Start your project
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Why developers of all skill levels choose Supabase
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-scale-11">
              Supabase is the Postgres development platform that powers a new generation of
              developer tools. Give your users an integrated, scalable backend that lets them focus
              on building without worrying about infrastructure.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col gap-3 rounded-xl border border-scale-6 bg-scale-2 p-8"
                >
                  <h3 className="text-lg font-semibold text-scale-12">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-scale-11">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Supabase helps you build
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-scale-11">
              Supabase includes everything you need to create the perfect app for your brand,
              business, or just for fun.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-3 rounded-xl border border-scale-6 bg-scale-2 p-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-scale-12">
                Instant and secure deployment
              </h2>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-scale-11">
                No need to set up servers, manage DevOps, or tweak security settings.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Pricing for builders
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-scale-11">
              A generous free tier, plus fair, flexible pricing when you&apos;re ready to scale.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-xl border border-scale-6 bg-scale-2 p-8">
                <h3 className="text-xl font-semibold text-scale-12">Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-scale-12">$25</span>
                  <span className="text-scale-11">/month</span>
                </div>
                <ul className="space-y-2 text-sm text-scale-11">
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> Plan subscription
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> Total Compute
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> Compute Credits
                  </li>
                </ul>
                <Link
                  href="/auth/sign-up"
                  className="mt-2 rounded-md bg-brand px-4 py-2.5 text-center text-sm font-medium text-black hover:bg-brand-hover transition-colors"
                >
                  Get started
                </Link>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-scale-6 bg-scale-2 p-8">
                <h3 className="text-xl font-semibold text-scale-12">Team</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-scale-12">$25</span>
                  <span className="text-scale-11">/month</span>
                </div>
                <p className="text-sm text-scale-11">Everything in Pro, plus:</p>
                <ul className="space-y-2 text-sm text-scale-11">
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> Micro Project 1
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> 1 GB RAM / 2-core ARM CPU
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand">✓</span> Connections: Direct 60, Pooler 200
                  </li>
                </ul>
                <Link
                  href="/auth/sign-up"
                  className="mt-2 rounded-md bg-brand px-4 py-2.5 text-center text-sm font-medium text-black hover:bg-brand-hover transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Fun projects built with Supabase
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-scale-11">
              Discover what our community has to say about their Supabase experience.
            </p>
            <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {testimonials.map((t) => (
                <div key={t.handle} className="mb-4 break-inside-avoid">
                  <TestimonialCard handle={t.handle} text={t.text} />
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="https://discord.gg/supabase"
                className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-hover transition-colors"
              >
                Join us on Discord
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Choose your platform to start building in seconds
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {frameworks.map((fw) => (
                <FrameworkCard key={fw.name} name={fw.name} icon={fw.icon} href={fw.href} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Or, start with Supabase AI Prompts
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {aiPrompts.map((prompt) => (
                <div key={prompt.title} className="group flex flex-col rounded-xl border border-scale-6 bg-scale-2">
                  <div className="flex items-center justify-between border-b border-scale-6 px-5 py-3.5">
                    <h3 className="truncate text-sm font-medium text-scale-12">
                      {prompt.title}
                    </h3>
                    <a
                      href={prompt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative shrink-0 ml-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-scale-10 opacity-80 transition-opacity group-hover:opacity-100">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  </div>
                  <div className="p-5">
                    <pre className="line-clamp-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-scale-11">{prompt.code}</pre>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://supabase.com/docs/guides/getting-started/ai-prompts"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-scale-11 hover:text-scale-12 transition-colors"
              >
                <span>View all prompts</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all group-hover:ml-0.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section id="mcp" className="container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20">
          <div className="grid grid-cols-12 lg:gap-16">
            <div className="col-span-12 pb-8 lg:col-span-5 xl:col-span-5">
              <h2 className="text-2xl font-semibold tracking-tight">
                <span className="text-scale-11">Supabase MCP server works seamlessly with </span>
                <span className="text-scale-12">your favorite AI code editor</span>
              </h2>
              <div className="mt-4">
                <Link
                  href="https://supabase.com/docs/guides/getting-started/mcp"
                  className="inline-flex items-center gap-2 rounded-md border border-scale-6 bg-scale-2 px-4 py-2 text-sm text-scale-12 hover:bg-scale-3 transition-colors"
                >
                  Connect your AI tools
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 xl:col-span-7">
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 rounded-lg border border-scale-6 bg-scale-2 px-4 py-2.5 transition-colors hover:border-scale-7"
                  >
                    <span className="text-lg shrink-0">{tool.icon}</span>
                    <span className="text-sm text-scale-12 whitespace-nowrap">{tool.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-scale-11">
                <span>Available on:</span>
                {platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-scale-6 bg-scale-2 px-3 py-1 text-xs text-scale-11"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
