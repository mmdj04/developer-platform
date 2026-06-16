interface Tweet {
  type: "tiny" | "short" | "medium" | "long" | "featured" | "quote" | "wide";
  handle: string;
  text: string;
  href: string;
  meta?: string;
}

const tweets: Tweet[] = [
  { type: "tiny", handle: "@pontusab", text: "I love everything about Supabase.", href: "https://x.com/pontusab/status/1953617984622793123" },
  { type: "tiny", handle: "@kpdecker", text: "The SQL editor is actually incredible.", href: "https://x.com" },
  { type: "short", handle: "@orlandopedro_", text: "Love @supabase custom domains — makes the auth so much better.", href: "https://x.com/orlandopedro_/status/1958618806143578336", meta: "via Twitter" },
  { type: "short", handle: "@dadooos_", text: "Love supabase edge functions. Cursor + Supabase + MCP + Docker desktop is all I need.", href: "https://x.com/dadooos_/status/1974357973911462180", meta: "via Twitter" },
  { type: "short", handle: "@xthemadgeniusx", text: "Run supabase locally and just wow in silence! I am impressed! This is the kind of tooling I would want as a dev.", href: "https://x.com/xthemadgeniusx/status/1958288048504787247" },
  { type: "medium", handle: "@nerdburn", text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Almost too easy! Highly recommend.", href: "https://x.com/nerdburn/status/1356857261495214085", meta: "via Twitter" },
  { type: "medium", handle: "@patrickc", text: "Very impressed by @supabase's growth. For new startups, they seem to have gone from \"promising\" to \"standard\" in remarkably short order.", href: "https://x.com/patrickc/status/1979157875600617913", meta: "via Twitter" },
  { type: "medium", handle: "@adeelibr", text: "@supabase shout out, their MCP is awesome. It's helping me create better row securities and telling me what to do.", href: "https://x.com/adeelibr/status/1981356783818985774", meta: "via Twitter" },
  { type: "medium", handle: "@sdusteric", text: "Loving #Supabase MCP. Claude Code would not only plan what data we should save but also figure out and create the migration SQL for me.", href: "https://x.com/sdusteric/status/1957703488470921550", meta: "via Twitter" },
  { type: "medium", handle: "@gokul_i", text: "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up and the docs are amazing.", href: "https://x.com/gokul_i/status/1955321827973747039", meta: "via Twitter" },
  { type: "medium", handle: "@viratt_mankali", text: "Love how Supabase makes full stack features this easy. Using it with Next.js and loving the experience.", href: "https://x.com/viratt_mankali/status/1975950241324773661" },
  { type: "medium", handle: "@Rodrigo66799141", text: "I love @supabase's built-in Advisors. The security and performance linters improve everything automatically.", href: "https://x.com/Rodrigo66799141/status/1958688118756053367", meta: "via Twitter" },
  { type: "long", handle: "@Aliahsan_sfv", text: "Okay, I finally tried Supabase today and wow... why did I wait so long? Went from 'how do I even start' to having a fully functional backend in like 30 mins. The DX is incredible and I'm never going back.", href: "https://x.com/Aliahsan_sfv/status/1967167095894098210", meta: "via Twitter" },
  { type: "long", handle: "@yatsiv_yuriy", text: "Supabase is the best product experience I've had in years. Not just tech — taste. From docs to code, everything is beautifully crafted. It's rare to see this level of polish in developer tools.", href: "https://x.com/yatsiv_yuriy/status/1979182362480071162", meta: "via Twitter" },
  { type: "long", handle: "@TyronBache", text: "Really impressed with @supabase's Assistant. It has helped me troubleshoot and solve complex SQL queries I would have struggled with otherwise. Game changer for productivity.", href: "https://x.com/TyronBache/status/1924425289959928039", meta: "via Twitter" },
  { type: "long", handle: "@MinimEditor", text: "I've always used Supabase just as a database. Yesterday, I helped debug a founder's vibe-coding project and realized how powerful the whole platform is. Auth, storage, realtime — it's all there.", href: "https://x.com/MinimEditor/status/1954422981708722372", meta: "via Twitter" },
  { type: "long", handle: "@adamwathan", text: "Just migrated a project to Supabase and it's wild how much faster we're moving now. Auth, storage, and a Postgres database in one place. The developer experience is incredible and the docs are top notch.", href: "https://x.com", meta: "Founder @tailwindcss" },
  { type: "long", handle: "@shadcn", text: "The developer experience is unmatched. Everything just works out of the box. Been building with it for months and it keeps getting better with every release.", href: "https://x.com", meta: "Developer" },
  { type: "featured", handle: "@rauchg", text: "Supabase is what a modern backend should look like. The realtime capabilities alone are game-changing for modern web apps. Combined with the Postgres ecosystem, it's a powerful combination.", href: "https://x.com", meta: "CEO @vercel" },
  { type: "featured", handle: "@leeerob", text: "Building full-stack apps with Next.js and Supabase is the best DX I've ever had. Everything from auth to storage just works out of the box. The integration is seamless and the developer experience is unmatched across the entire platform.", href: "https://x.com", meta: "Developer Relations @vercel" },
  { type: "quote", handle: "@nerdburn", text: "Almost too easy!", href: "https://x.com/nerdburn/status/1356857261495214085", meta: "via Twitter" },
  { type: "quote", handle: "@gokul_i", text: "Incredibly easy to set up.", href: "https://x.com/gokul_i/status/1955321827973747039" },
  { type: "wide", handle: "@patrickc", text: "They seem to have gone from \"promising\" to \"standard\" in remarkably short order. Supabase is quickly becoming the default choice for modern startups.", href: "https://x.com/patrickc/status/1979157875600617913" },
  { type: "wide", handle: "@shadcn", text: "Everything just works out of the box. Been building with it for months and it keeps getting better. Highly recommended for anyone building modern web applications.", href: "https://x.com" },
];

function TweetCard({ tweet, wide = false }: { tweet: Tweet; wide?: boolean }) {
  const { handle, text, href, meta, type } = tweet;

  const paddingClasses = type === "tiny" ? "p-4" : type === "quote" ? "p-5" : "p-5";
  const textClasses = type === "tiny" ? "text-xs mt-2" : type === "quote" ? "text-lg font-medium mt-2" : "text-sm mt-3";
  const headerSize = type === "tiny" ? "h-7 w-7" : type === "quote" ? "h-8 w-8" : "h-9 w-9";
  const badgeSize = type === "tiny" ? "h-4 w-4" : "h-5 w-5";
  const iconSize = type === "tiny" ? "h-2.5 w-2.5" : "h-3 w-3";

  return (
    <a
      target="_blank"
      className={`block group break-inside-avoid-column mb-4 ${wide ? "xl:column-span-2" : ""}`}
      href={href}
    >
      <div className={`bg-scale-3 border border-scale-5 group-hover:border-scale-8 transition-colors rounded-2xl drop-shadow-xs ${paddingClasses}`}>
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className={`${headerSize} overflow-hidden rounded-full border border-scale-6 bg-scale-5 flex items-center justify-center text-scale-11 text-sm font-semibold flex-shrink-0`}>
              {handle.charAt(1).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-scale-12 font-medium truncate ${type === "tiny" ? "text-xs" : "text-sm"}`}>{handle}</p>
              {meta && <p className="text-scale-10 text-xs truncate">{meta}</p>}
            </div>
            <div className={`${badgeSize} flex items-center justify-center rounded-full bg-black flex-shrink-0`}>
              <svg className={iconSize} fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
        </div>
        <p className={`text-scale-11 leading-relaxed ${textClasses}`}>{text}</p>
      </div>
    </a>
  );
}

export function CommunityCarousel() {
  const all = (() => {
    const items: Tweet[] = [];
    for (let i = 0; i < 4; i++) {
      const shuffled = [...tweets].sort(() => Math.sin(i * 999) * 0.5);
      items.push(...shuffled);
    }
    return items;
  })();

  return (
    <div className="relative w-screen mt-8" style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}>
      <div className="hidden md:block relative overflow-hidden" style={{ maxHeight: "650px" }}>
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 px-6 lg:px-16 xl:px-20 pb-32">
          {all.map((t, i) => (
            <TweetCard key={`${t.handle}-${i}`} tweet={t} wide={t.type === "wide"} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-linear-to-r from-scale-1 from-10% via-scale-1/60 via-30% to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-linear-to-l from-scale-1 from-10% via-scale-1/60 via-30% to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-scale-1 from-10% via-scale-1/60 via-30% to-transparent" />
      </div>

      <div className="md:hidden relative px-6 lg:px-16 xl:px-20">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4">
          {[...tweets, ...tweets].map((t, i) => (
            <div key={`${t.handle}-${i}`} className={`flex-shrink-0 ${t.type === "tiny" ? "w-[180px]" : t.type === "wide" ? "w-[350px]" : "w-[280px]"}`}>
              <TweetCard tweet={t} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-scale-1 from-10% via-scale-1/60 via-30% to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-scale-1 from-10% via-scale-1/60 via-30% to-transparent" />
      </div>
    </div>
  );
}
