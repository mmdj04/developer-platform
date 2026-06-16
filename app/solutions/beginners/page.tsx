import Link from "next/link";

const frameworks = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "RedwoodJS", icon: "🌲" },
  { name: "Flutter", icon: "🦋" },
  { name: "Kotlin", icon: "🅺" },
  { name: "Svelte", icon: "🧡" },
  { name: "SolidJS", icon: "💠" },
  { name: "Vue", icon: "💚" },
  { name: "Nuxt", icon: "🍃" },
  { name: "Refine", icon: "⚡" },
];

const tools = [
  { name: "Cursor", icon: "◎" },
  { name: "Visual Studio Code (Copilot)", icon: "◇" },
  { name: "Claude", icon: "○" },
  { name: "TRAE", icon: "□" },
  { name: "Windsurf", icon: "△" },
  { name: "Clinen", icon: "☆" },
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

function FrameworkCard({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-xl border border-scale-6 bg-scale-2 px-5 py-4 transition-colors hover:border-scale-7 hover:bg-scale-3">
      <span className="flex size-10 items-center justify-center rounded-lg bg-scale-4 text-lg">
        {icon}
      </span>
      <span className="text-sm font-medium text-scale-12">{name}</span>
    </div>
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
                <FrameworkCard key={fw.name} name={fw.name} icon={fw.icon} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-scale-6 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-scale-12">
              Supabase MCP server works seamlessly with your favorite AI code editor
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-scale-11">
              Connect your AI tools
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 rounded-lg border border-scale-6 bg-scale-2 px-4 py-2.5 transition-colors hover:border-scale-7"
                >
                  <span className="text-lg">{tool.icon}</span>
                  <span className="text-sm text-scale-12">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-scale-6 px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-scale-12">Product</h4>
            <div className="flex flex-col gap-2 text-sm text-scale-11">
              <Link href="/" className="hover:text-scale-12 transition-colors">Database</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Auth</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Functions</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Realtime</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Storage</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-scale-12">Solutions</h4>
            <div className="flex flex-col gap-2 text-sm text-scale-11">
              <Link href="/solutions/beginners" className="hover:text-scale-12 transition-colors">Beginners</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Developers</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">AI Builders</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Startups</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Enterprise</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-scale-12">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-scale-11">
              <Link href="/" className="hover:text-scale-12 transition-colors">Documentation</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Blog</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Support</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Integrations</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Brand Assets</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-scale-12">Company</h4>
            <div className="flex flex-col gap-2 text-sm text-scale-11">
              <Link href="/" className="hover:text-scale-12 transition-colors">About</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Careers</Link>
              <Link href="/terms" className="hover:text-scale-12 transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-scale-12 transition-colors">Privacy Policy</Link>
              <Link href="/" className="hover:text-scale-12 transition-colors">Security</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-5xl items-center justify-between border-t border-scale-6 pt-8">
          <p className="text-xs text-scale-10">
            &copy; 2026 Supabase Inc
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-scale-10">Twitter</span>
            <span className="text-xs text-scale-10">GitHub</span>
            <span className="text-xs text-scale-10">Discord</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
