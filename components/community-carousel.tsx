interface Tweet {
  type: "p" | "m" | "g" | "exg";
  handle: string;
  text: string;
  href: string;
  meta?: string;
}

const tweets: Tweet[] = [
  { type: "p", handle: "@acdlite", text: "React 19 is shaping up to be an incredible release. The new compiler changes everything about how we think about re-rendering.", href: "https://x.com" },
  { type: "p", handle: "@t3dotgg", text: "Next.js server components + Suspense is the best DX I've had in years. Full-stack React that actually makes sense.", href: "https://x.com" },
  { type: "p", handle: "@astahmer_dev", text: "The Vue 3 composition API is so clean. Options API feels like ancient history now.", href: "https://x.com" },
  { type: "p", handle: "@rich_harris", text: "Svelte 5 runes are a game-changer. Reactive state without the boilerplate — just how it should be.", href: "https://x.com" },
  { type: "p", handle: "@NikolovLazar", text: "Nuxt 4 auto-imports and file-based routing make building full-stack Vue apps a breeze.", href: "https://x.com" },
  { type: "m", handle: "@mattpocockuk", text: "TypeScript + React is the ultimate combo. The type safety catches so many bugs before they ever reach production.", href: "https://x.com" },
  { type: "m", handle: "@dan_abramov", text: "The React ecosystem keeps getting better. Server Components, Suspense, and the new docs make it easier than ever to build great UIs.", href: "https://x.com", meta: "via Twitter" },
  { type: "m", handle: "@youyuxi", text: "Vapor mode in Vue is incredible. Even faster render performance without changing how you write components.", href: "https://x.com", meta: "via Twitter" },
  { type: "m", handle: "@sveltejs", text: "Svelte 5 is now stable! Runes, snippets, and event handlers — the best way to write reactive UI components.", href: "https://x.com", meta: "via Twitter" },
  { type: "m", handle: "@solid_js", text: "SolidJS signals give you fine-grained reactivity without a virtual DOM. The performance is unmatched.", href: "https://x.com", meta: "via Twitter" },
  { type: "g", handle: "@shadcn", text: "Building UI components with Radix and Tailwind has completely changed how I think about design systems.", href: "https://x.com", meta: "Developer" },
  { type: "g", handle: "@leeerob", text: "Next.js + Vercel is the fastest way to go from idea to production. The developer experience just keeps getting better.", href: "https://x.com", meta: "DevRel @vercel" },
  { type: "g", handle: "@trpc_io", text: "tRPC gives you end-to-end type safety without the hassle of GraphQL. Just write functions and call them from the client.", href: "https://x.com", meta: "Creator" },
  { type: "g", handle: "@tailwindcss", text: "Utility-first CSS was the right call. Tailwind v4 with the new CSS-first config is our best release yet.", href: "https://x.com", meta: "Creator" },
  { type: "exg", handle: "@rauchg", text: "The web platform is stronger than ever. Next.js, React Server Components, and edge computing are redefining what's possible in web development. We're just getting started.", href: "https://x.com", meta: "CEO @vercel" },
  { type: "exg", handle: "@acdlite", text: "The React compiler is one of the most impactful projects we've ever worked on. Automatic memoization means developers can focus on logic, not optimization.", href: "https://x.com", meta: "React Core" },
  { type: "exg", handle: "@youyuxi", text: "The JavaScript ecosystem is thriving. Vue, React, Svelte, Solid — we're all pushing each other forward, and developers win as a result.", href: "https://x.com", meta: "Creator @vuejs" },
  { type: "exg", handle: "@rich_harris", text: "Svelte proves that you don't need a virtual DOM for great performance. By doing the work at compile time, we give developers the best of both worlds.", href: "https://x.com", meta: "Creator @sveltejs" },
  { type: "m", handle: "@nextjs", text: "Next.js 16 brings Cache Components, improved MCP support, and the best developer experience for building production React applications.", href: "https://x.com", meta: "via Twitter" },
  { type: "p", handle: "@ryanflorence", text: "Remix and React Router are the same team now. The future of full-stack React is bright.", href: "https://x.com" },
  { type: "m", handle: "@brillout", text: "Vike brings the best of Vite to SSR. Flexible, fast, and framework-agnostic — exactly what we needed.", href: "https://x.com", meta: "via Twitter" },
  { type: "g", handle: "@nuxt_js", text: "Nuxt 4 with Nitro is a beast. Hybrid rendering, built-in server engine, and module ecosystem that's second to none.", href: "https://x.com", meta: "Framework" },
  { type: "exg", handle: "@htmx_org", text: "Sometimes the best JavaScript framework is less JavaScript. htmx proves that HTML hypermedia can be powerful and fun.", href: "https://x.com", meta: "Creator" },
  { type: "p", handle: "@astrodotbuild", text: "Astro's content collections and island architecture make it the perfect static site generator.", href: "https://x.com" },
];

const pattern: Tweet["type"][] = ["p", "g", "exg", "g", "exg", "g", "p", "m", "p", "g", "m", "g", "m", "exg", "g", "p", "m", "p", "g", "exg", "p", "m", "g", "m"];

function pick(pattern: Tweet["type"][], pool: Tweet[]): Tweet[] {
  const byType = new Map<Tweet["type"], Tweet[]>();
  for (const t of pool) {
    const arr = byType.get(t.type) ?? [];
    arr.push(t);
    byType.set(t.type, arr);
  }
  const usage: Record<string, number> = {};
  const result: Tweet[] = [];
  for (const type of pattern) {
    const candidates = byType.get(type) ?? [];
    if (candidates.length === 0) continue;
    usage[type] = (usage[type] ?? 0) % candidates.length;
    const c = candidates[usage[type]];
    if (c) result.push(c);
    usage[type]++;
  }
  return result;
}

const orderedTweets = pick(pattern, tweets);

const paddingMap = { p: "p-4", m: "p-5", g: "p-5", exg: "p-6" };
const textSizeMap = { p: "text-xs mt-2", m: "text-sm mt-3", g: "text-sm mt-3", exg: "text-sm mt-3" };
const avatarMap = { p: "h-7 w-7", m: "h-9 w-9", g: "h-9 w-9", exg: "h-10 w-10" };
const handleSizeMap = { p: "text-xs", m: "text-sm", g: "text-sm", exg: "text-sm" };
const badgeMap = { p: "h-4 w-4", m: "h-5 w-5", g: "h-5 w-5", exg: "h-5 w-5" };
const iconMap = { p: "h-2.5 w-2.5", m: "h-3 w-3", g: "h-3 w-3", exg: "h-3 w-3" };
const widthMobileMap = { p: "w-[160px]", m: "w-[250px]", g: "w-[280px]", exg: "w-[300px]" };

function TweetCard({ tweet }: { tweet: Tweet }) {
  const { handle, text, href, meta, type } = tweet;

  return (
    <a target="_blank" className="block group break-inside-avoid-column mb-4" href={href}>
      <div className={`bg-scale-3 border border-scale-5 group-hover:border-scale-8 transition-colors rounded-2xl drop-shadow-xs ${paddingMap[type]}`}>
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className={`${avatarMap[type]} overflow-hidden rounded-full border border-scale-6 bg-scale-5 flex items-center justify-center text-scale-11 text-sm font-semibold flex-shrink-0`}>
              {handle.charAt(1).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-scale-12 font-medium truncate ${handleSizeMap[type]}`}>{handle}</p>
              {meta && <p className="text-scale-10 text-xs truncate">{meta}</p>}
            </div>
            <div className={`${badgeMap[type]} flex items-center justify-center rounded-full bg-black flex-shrink-0`}>
              <svg className={iconMap[type]} fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
        </div>
        <p className={`text-scale-11 leading-relaxed ${textSizeMap[type]}`}>{text}</p>
      </div>
    </a>
  );
}

export function CommunityCarousel() {
  return (
    <div className="relative w-screen mt-8" style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
      <div className="hidden md:block relative overflow-hidden" style={{ maxHeight: "700px" }}>
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 px-6 lg:px-16 xl:px-20 pb-32">
          {orderedTweets.map((t, i) => (
            <TweetCard key={`${t.handle}-${i}`} tweet={t} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_var(--color-scale-1)_85%)]" />
      </div>

      <div className="md:hidden relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 px-6 lg:px-16 xl:px-20">
          {orderedTweets.map((t, i) => (
            <div key={`${t.handle}-${i}`} className={`flex-shrink-0 ${widthMobileMap[t.type]}`}>
              <TweetCard tweet={t} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-linear-to-r from-scale-1 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-linear-to-l from-scale-1 to-transparent" />
      </div>
    </div>
  );
}
