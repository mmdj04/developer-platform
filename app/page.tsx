import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SupabaseLogo } from "@/components/supabase-logo";

const productCards = [
  {
    title: "Postgres Database",
    href: "/database",
    description:
      "Every project is <strong>a full Postgres database</strong>, the world's most trusted relational database.",
    cols: "col-span-6 md:col-span-12 xl:col-span-6",
    checks: ["100% portable", "Built-in Auth with RLS", "Easy to extend"],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.18625 8.66531H19.5035V15.331H5.18625V8.66531Z M4 17.0007C4 16.0804 4.7461 15.3343 5.66645 15.3343H18.9984C19.9187 15.3343 20.6648 16.0804 20.6648 17.0007V20.3335C20.6648 21.2539 19.9187 22 18.9984 22H5.66646C4.7461 22 4 21.2539 4 20.3335V17.0007Z M4 3.66646C4 2.7461 4.7461 2 5.66645 2H18.9984C19.9187 2 20.6648 2.7461 20.6648 3.66645V6.99926C20.6648 7.91962 19.9187 8.66572 18.9984 8.66572H5.66646C4.7461 8.66572 4 7.91962 4 6.99926V3.66646Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Authentication",
    href: "/auth",
    description:
      "<strong>Add user sign ups and logins</strong>,<br class=\"hidden lg:inline-block\"> securing your data with Row Level Security.",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.03305 15.8071H12.7252M5.03305 15.8071V18.884H12.7252V15.8071M5.03305 15.8071V12.7302H12.7252V15.8071M15.0419 8.15385V5.07692C15.0419 3.37759 13.6643 2 11.965 2C10.2657 2 8.88814 3.37759 8.88814 5.07692V8.15385M5 11.2307L5 18.9231C5 20.6224 6.37757 22 8.07689 22H15.769C17.4683 22 18.8459 20.6224 18.8459 18.9231V11.2307C18.8459 9.53142 17.4683 8.15385 15.769 8.15385L8.07689 8.15385C6.37757 8.15385 5 9.53142 5 11.2307Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Edge Functions",
    href: "/edge-functions",
    description:
      "Easily write custom code<br class=\"hidden sm:inline-block\"> <strong>without deploying or scaling servers.</strong>",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.6594 21.8201C8.10788 22.5739 9.75418 23 11.5 23C17.299 23 22 18.299 22 12.5C22 10.7494 21.5716 9.09889 20.8139 7.64754M16.4016 3.21191C14.9384 2.43814 13.2704 2 11.5 2C5.70101 2 1 6.70101 1 12.5C1 14.287 1.44643 15.9698 2.23384 17.4428M2.23384 17.4428C1.81058 17.96 1.55664 18.6211 1.55664 19.3416C1.55664 20.9984 2.89979 22.3416 4.55664 22.3416C6.21349 22.3416 7.55664 20.9984 7.55664 19.3416C7.55664 17.6847 6.21349 16.3416 4.55664 16.3416C3.62021 16.3416 2.78399 16.7706 2.23384 17.4428ZM21.5 5.64783C21.5 7.30468 20.1569 8.64783 18.5 8.64783C16.8432 8.64783 15.5 7.30468 15.5 5.64783C15.5 3.99097 16.8432 2.64783 18.5 2.64783C20.1569 2.64783 21.5 3.99097 21.5 5.64783ZM18.25 12.5C18.25 16.2279 15.2279 19.25 11.5 19.25C7.77208 19.25 4.75 16.2279 4.75 12.5C4.75 8.77208 7.77208 5.75 11.5 5.75C15.2279 5.75 18.25 8.77208 18.25 12.5Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Storage",
    href: "/storage",
    description:
      "<strong>Store, organize, and serve</strong><br class=\"hidden sm:inline-block xl:hidden 2xl:inline-block\"> large files, from videos to images.",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.4997 12.1386V9.15811L14.8463 3.53163H6.43717C5.57423 3.53163 4.87467 4.23119 4.87467 5.09413V9.78087M20.4447 9.13199L14.844 3.53125L14.844 7.56949C14.844 8.43243 15.5436 9.13199 16.4065 9.13199L20.4447 9.13199ZM7.12729 9.78087H4.83398C3.97104 9.78087 3.27148 10.4804 3.27148 11.3434V19.1559C3.27148 20.8818 4.67059 22.2809 6.39648 22.2809H18.8965C20.6224 22.2809 22.0215 20.8818 22.0215 19.1559V13.7011C22.0215 12.8381 21.3219 12.1386 20.459 12.1386H10.8032C10.3933 12.1386 9.99969 11.9774 9.70743 11.6899L8.22312 10.2296C7.93086 9.94202 7.53729 9.78087 7.12729 9.78087Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Realtime",
    href: "/realtime",
    description:
      "<strong>Build multiplayer experiences</strong><br class=\"hidden sm:inline-block\"> with real-time data synchronization.",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.15928 1.94531V5.84117M6.24345 5.84117L2.91385 2.40977M6.24345 8.53673H2.4248M16.7998 16.496L21.9988 15.2019C22.7217 15.022 22.8065 14.0285 22.1246 13.7286L9.73411 8.28034C9.08269 7.99391 8.41873 8.65652 8.70383 9.30851L14.0544 21.5445C14.3518 22.2247 15.341 22.1456 15.5266 21.4269L16.7998 16.496Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Vector",
    href: "/modules/vector",
    description:
      "Integrate your favorite ML-models to <br class=\"hidden sm:inline-block md:hidden\"><strong>store, index and search vector embeddings</strong>.",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9983 11.4482V21.7337M11.9983 11.4482L21.0732 6.17699M11.9983 11.4482L2.92383 6.17723M2.92383 6.17723V12.4849M2.92383 6.17723V6.1232L8.35978 2.9657M21.0736 12.54V6.1232L15.6376 2.9657M17.7247 18.6107L11.9987 21.9367L6.27265 18.6107" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Data APIs",
    href: "https://supabase.com/docs/guides/api",
    description: "Instant ready-to-use <strong>Restful APIs</strong>.",
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    svg: (
      <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.13477 12.8129C4.13477 14.1481 4.43245 15.4138 4.96506 16.5471M12.925 4.02271C11.5644 4.02271 10.276 4.33184 9.12614 4.88371M21.7152 12.8129C21.7152 11.4644 21.4115 10.1867 20.8688 9.0447M12.925 21.6032C14.2829 21.6032 15.5689 21.2952 16.717 20.7454M16.717 20.7454C17.2587 21.5257 18.1612 22.0366 19.1831 22.0366C20.84 22.0366 22.1831 20.6935 22.1831 19.0366C22.1831 17.3798 20.84 16.0366 19.1831 16.0366C17.5263 16.0366 16.1831 17.3798 16.1831 19.0366C16.1831 19.6716 16.3804 20.2605 16.717 20.7454ZM4.96506 16.5471C4.16552 17.086 3.63965 17.9999 3.63965 19.0366C3.63965 20.6935 4.98279 22.0366 6.63965 22.0366C8.2965 22.0366 9.63965 20.6935 9.63965 19.0366C9.63965 17.3798 8.2965 16.0366 6.63965 16.0366C6.01951 16.0366 5.44333 16.2248 4.96506 16.5471ZM9.12614 4.88371C8.58687 4.08666 7.67444 3.56274 6.63965 3.56274C4.98279 3.56274 3.63965 4.90589 3.63965 6.56274C3.63965 8.2196 4.98279 9.56274 6.63965 9.56274C8.2965 9.56274 9.63965 8.2196 9.63965 6.56274C9.63965 5.94069 9.45032 5.36285 9.12614 4.88371ZM20.8688 9.0447C21.6621 8.50486 22.1831 7.59464 22.1831 6.56274C22.1831 4.90589 20.84 3.56274 19.1831 3.56274C17.5263 3.56274 16.1831 4.90589 16.1831 6.56274C16.1831 8.2196 17.5263 9.56274 19.1831 9.56274C19.8081 9.56274 20.3884 9.37165 20.8688 9.0447Z" stroke="currentColor" stroke-miterlimit="10" strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function ProductCard({
  title,
  href,
  description,
  checks,
  svg,
  cols,
}: {
  title: string;
  href: string;
  svg: React.ReactNode;
  description: string;
  checks: string[];
  cols: string;
}) {
  return (
    <a
      href={href}
      className={`group relative w-full sm:h-[400px] flex flex-col gap-5 lg:flex-row focus:outline-hidden focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl ${cols}`}
    >
      <div className="group/panel rounded-lg md:rounded-xl p-px bg-scale-3 bg-linear-to-b from-scale-6 to-scale-5 dark:to-scale-4 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:bg-scale-7! relative w-full h-full">
        <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-row sm:flex-col gap-4 items-start sm:items-center lg:items-start justify-between bg-scale-3 w-full h-full text-scale-11 [&_strong]:font-normal! [&_strong]:text-scale-12! p-4 sm:py-6">
          <div className="relative z-10 h-full w-full mx-auto gap-2 sm:gap-4 flex flex-col items-start sm:items-center text-left sm:text-center lg:mx-0 lg:pl-2 lg:items-start lg:text-left">
            <div className="flex items-center gap-2 text-scale-12">
              {svg}
              <h2>{title}</h2>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-2">
              <p className="text-sm [&_strong]:text-scale-12!" dangerouslySetInnerHTML={{ __html: description }} />
              {checks.length > 0 && (
                <span className="hidden lg:block text-scale-12">
                  <ul className="flex flex-col gap-1 text-sm">
                    {checks.map((check) => (
                      <li key={check} className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline h-4 w-4">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {check}
                      </li>
                    ))}
                  </ul>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4 pt-24">
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

      <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 xl:gap-3 2xl:gap-6 md:grid-cols-12">
        {productCards.map((card) => (
          <ProductCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
