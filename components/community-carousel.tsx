interface Tweet {
  type: "p" | "m" | "g" | "exg";
  handle: string;
  text: string;
  href: string;
  meta?: string;
}

const tweets: Tweet[] = [
  { type: "p", handle: "@pontusab", text: "I love everything about Supabase.", href: "https://x.com/pontusab/status/1953617984622793123" },
  { type: "p", handle: "@kpdecker", text: "The SQL editor is actually incredible.", href: "https://x.com" },
  { type: "p", handle: "@dadooos_", text: "Cursor + Supabase + MCP is all I need.", href: "https://x.com/dadooos_/status/1974357973911462180" },
  { type: "p", handle: "@orlandopedro_", text: "Love @supabase custom domains.", href: "https://x.com/orlandopedro_/status/1958618806143578336" },
  { type: "p", handle: "@viratt_mankali", text: "Using it with Next.js and loving it.", href: "https://x.com/viratt_mankali/status/1975950241324773661" },
  { type: "p", handle: "@Rodrigo66799141", text: "Security linters improve everything.", href: "https://x.com/Rodrigo66799141/status/1958688118756053367" },
  { type: "m", handle: "@xthemadgeniusx", text: "Run supabase locally and just wow in silence! I am impressed! This is the kind of tooling I would want as a dev.", href: "https://x.com/xthemadgeniusx/status/1958288048504787247" },
  { type: "m", handle: "@adeelibr", text: "@supabase shout out, their MCP is awesome. It's helping me create better row securities and telling me what to do.", href: "https://x.com/adeelibr/status/1981356783818985774", meta: "via Twitter" },
  { type: "m", handle: "@sdusteric", text: "Loving #Supabase MCP. Claude Code would not only plan what data we should save but also figure out and create the migration SQL for me.", href: "https://x.com/sdusteric/status/1957703488470921550", meta: "via Twitter" },
  { type: "m", handle: "@nerdburn", text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Almost too easy! Highly recommend.", href: "https://x.com/nerdburn/status/1356857261495214085", meta: "via Twitter" },
  { type: "m", handle: "@gokul_i", text: "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up and the docs are amazing.", href: "https://x.com/gokul_i/status/1955321827973747039", meta: "via Twitter" },
  { type: "m", handle: "@MinimEditor", text: "I've always used Supabase just as a database. Yesterday I realized how powerful the whole platform is — auth, storage, realtime.", href: "https://x.com/MinimEditor/status/1954422981708722372", meta: "via Twitter" },
  { type: "g", handle: "@patrickc", text: "Very impressed by @supabase's growth. For new startups, they seem to have gone from \"promising\" to \"standard\" in remarkably short order.", href: "https://x.com/patrickc/status/1979157875600617913", meta: "via Twitter" },
  { type: "g", handle: "@Aliahsan_sfv", text: "Okay, I finally tried Supabase today and wow... why did I wait so long? Went from 'how do I even start' to having a fully functional backend in like 30 mins.", href: "https://x.com/Aliahsan_sfv/status/1967167095894098210", meta: "via Twitter" },
  { type: "g", handle: "@yatsiv_yuriy", text: "Supabase is the best product experience I've had in years. Not just tech — taste. From docs to code, everything is beautifully crafted.", href: "https://x.com/yatsiv_yuriy/status/1979182362480071162", meta: "via Twitter" },
  { type: "g", handle: "@TyronBache", text: "Really impressed with @supabase's Assistant. It has helped me troubleshoot and solve complex SQL queries I would have struggled with otherwise.", href: "https://x.com/TyronBache/status/1924425289959928039", meta: "via Twitter" },
  { type: "g", handle: "@adamwathan", text: "Just migrated a project to Supabase and it's wild how much faster we're moving now. Auth, storage, and a Postgres database in one place. Incredible DX.", href: "https://x.com", meta: "Founder @tailwindcss" },
  { type: "g", handle: "@shadcn", text: "The developer experience is unmatched. Everything just works out of the box. Been building with it for months and it keeps getting better.", href: "https://x.com", meta: "Developer" },
  { type: "g", handle: "@peduarte", text: "Supabase has completely changed how I build side projects. Having auth, db, and storage in one place with an amazing dashboard is a dream.", href: "https://x.com", meta: "Designer" },
  { type: "g", handle: "@tibotiber", text: "We migrated from Firebase to Supabase and it was the best decision we made. Postgres gives us so much more power and flexibility.", href: "https://x.com", meta: "CTO" },
  { type: "g", handle: "@dabit3", text: "Supabase is the backbone of my stack now. The Realtime features are incredible and the DX keeps getting better every month.", href: "https://x.com", meta: "Developer Advocate" },
  { type: "exg", handle: "@rauchg", text: "Supabase is what a modern backend should look like. The realtime capabilities alone are game-changing for modern web apps. Combined with the Postgres ecosystem, it's a powerful combination that every developer should experience.", href: "https://x.com", meta: "CEO @vercel" },
  { type: "exg", handle: "@leeerob", text: "Building full-stack apps with Next.js and Supabase is the best DX I've ever had. Everything from auth to storage just works. The integration is seamless and the developer experience is unmatched across the entire platform.", href: "https://x.com", meta: "DevRel @vercel" },
  { type: "exg", handle: "@nerdburn", text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Highly recommend for anyone building modern web apps who wants to move fast without sacrificing quality.", href: "https://x.com/nerdburn/status/1356857261495214085", meta: "via Twitter" },
  { type: "exg", handle: "@swyx", text: "Supabase is the closest thing we have to a \"backend in a box\" that actually delivers. Postgres, auth, storage, edge functions — all with an incredible developer experience and generous free tier.", href: "https://x.com", meta: "Developer" },
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_var(--color-scale-1)_75%)]" />
      </div>

      <div className="md:hidden relative px-6 lg:px-16 xl:px-20">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4">
          {orderedTweets.map((t, i) => (
            <div key={`${t.handle}-${i}`} className={`flex-shrink-0 ${widthMobileMap[t.type]}`}>
              <TweetCard tweet={t} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-64 bg-linear-to-r from-scale-1 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-64 bg-linear-to-l from-scale-1 to-transparent" />
      </div>
    </div>
  );
}
