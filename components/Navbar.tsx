"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TASK_PAGES } from "@/lib/tasks";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/70">
      <nav className="flex w-full items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-black text-white">
            N
          </span>
          Nora <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">AI</span>
        </Link>

        <ul className="flex items-center gap-1 overflow-x-auto text-sm font-medium [scrollbar-width:none]">
          {TASK_PAGES.map((t) => {
            const active = pathname === `/${t.slug}`;
            return (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 transition ${
                    active
                      ? `${t.accentSoft} ${t.accentText}`
                      : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
                  }`}
                >
                  {t.nav}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/history"
              aria-current={pathname === "/history" ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-2 transition ${
                pathname === "/history"
                  ? "bg-black/10 dark:bg-white/15"
                  : "text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
              }`}
            >
              History
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
