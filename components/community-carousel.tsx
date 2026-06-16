const tweets = [
  {
    handle: "@nerdburn",
    text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Almost too easy! Highly recommend.",
    href: "https://x.com/nerdburn/status/1356857261495214085",
  },
  {
    handle: "@patrickc",
    text: "Very impressed by @supabase's growth. For new startups, they seem to have gone from \"promising\" to \"standard\" in remarkably short order.",
    href: "https://x.com/patrickc/status/1979157875600617913",
  },
  {
    handle: "@Aliahsan_sfv",
    text: "Okay, I finally tried Supabase today and wow... why did I wait so long? Went from 'how do I even start' to having a fully functional backend in like 30 mins.",
    href: "https://x.com/Aliahsan_sfv/status/1967167095894098210",
  },
  {
    handle: "@yatsiv_yuriy",
    text: "Supabase is the best product experience I've had in years. Not just tech — taste. From docs to code, everything is beautifully crafted.",
    href: "https://x.com/yatsiv_yuriy/status/1979182362480071162",
  },
  {
    handle: "@adeelibr",
    text: "@supabase shout out, their MCP is awesome. It's helping me create better row securities and telling me what to do. Great DX on supabase.",
    href: "https://x.com/adeelibr/status/1981356783818985774",
  },
  {
    handle: "@TyronBache",
    text: "Really impressed with @supabase's Assistant. It has helped me troubleshoot and solve complex SQL queries I would have struggled with otherwise.",
    href: "https://x.com/TyronBache/status/1924425289959928039",
  },
  {
    handle: "@MinimEditor",
    text: "I've always used Supabase just as a database. Yesterday, I helped debug a founder's vibe-coding project and realized how powerful the whole platform is.",
    href: "https://x.com/MinimEditor/status/1954422981708722372",
  },
  {
    handle: "@orlandopedro_",
    text: "Love @supabase custom domains — makes the auth so much better.",
    href: "https://x.com/orlandopedro_/status/1958618806143578336",
  },
  {
    handle: "@sdusteric",
    text: "Loving #Supabase MCP. Claude Code would not only plan what data we should save but also figure out and create the migration SQL for me.",
    href: "https://x.com/sdusteric/status/1957703488470921550",
  },
  {
    handle: "@gokul_i",
    text: "Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up and the docs are amazing.",
    href: "https://x.com/gokul_i/status/1955321827973747039",
  },
  {
    handle: "@dadooos_",
    text: "Love supabase edge functions. Cursor + Supabase + MCP + Docker desktop is all I need.",
    href: "https://x.com/dadooos_/status/1974357973911462180",
  },
  {
    handle: "@xthemadgeniusx",
    text: "Run supabase locally and just wow in silence! I am impressed! This is the kind of tooling I would want as a dev.",
    href: "https://x.com/xthemadgeniusx/status/1958288048504787247",
  },
  {
    handle: "@viratt_mankali",
    text: "Love how Supabase makes full stack features this easy. Using it with Next.js and loving the experience.",
    href: "https://x.com/viratt_mankali/status/1975950241324773661",
  },
  {
    handle: "@Rodrigo66799141",
    text: "I love @supabase's built-in Advisors. The security and performance linters improve everything automatically.",
    href: "https://x.com/Rodrigo66799141/status/1958688118756053367",
  },
  {
    handle: "@pontusab",
    text: "I love everything about Supabase.",
    href: "https://x.com/pontusab/status/1953617984622793123",
  },
];

function TweetCard({ handle, text, href }: { handle: string; text: string; href: string }) {
  return (
    <a
      target="_blank"
      className="block group break-inside-avoid-column"
      href={href}
    >
      <div className="bg-scale-3 border border-scale-5 group-hover:border-scale-8 transition-colors rounded-2xl p-5 drop-shadow-xs h-full">
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-scale-6 bg-scale-5 flex items-center justify-center text-scale-11 text-sm font-semibold">
              {handle.charAt(1).toUpperCase()}
            </div>
            <p className="text-scale-12 text-sm font-medium">{handle}</p>
            <div className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black">
              <svg className="h-3 w-3" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-scale-11 mt-3 text-sm leading-relaxed">{text}</p>
      </div>
    </a>
  );
}

export function CommunityCarousel() {
  return (
    <div className="relative w-full mt-8 max-w-7xl mx-auto">
      <div className="hidden md:block relative overflow-hidden max-h-[500px]">
        <div className="columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 px-4">
          {[...tweets, ...tweets, ...tweets].map((t, i) => (
            <TweetCard key={`${t.handle}-${i}`} {...t} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-scale-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-scale-2 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-scale-2 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-scale-2 to-transparent" />
      </div>

      <div className="md:hidden relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4">
          {[...tweets, ...tweets].map((t, i) => (
            <div key={`${t.handle}-${i}`} className="w-[300px] flex-shrink-0">
              <TweetCard {...t} />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-scale-2 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-scale-2 to-transparent" />
      </div>
    </div>
  );
}
