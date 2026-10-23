import Workspace from "./Workspace";
import { getTaskPage } from "@/lib/tasks";

// Shared layout for the three dedicated tool pages (server component).
export default function TaskPageView({ slug }: { slug: string }) {
  const page = getTaskPage(slug);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px]"
        style={{ background: `radial-gradient(ellipse at top, ${page.glow}, transparent 70%)` }}
      />

      <div className="w-full px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12">
        <header className="mb-10 max-w-3xl">
          <span className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${page.accentBorder} ${page.accentSoft} ${page.accentText}`}>
            <span className="text-sm leading-none">{page.icon}</span> {page.title}
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className={`bg-gradient-to-r ${page.gradient} bg-clip-text text-transparent`}>{page.headline.accent}</span> {page.headline.rest}
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{page.tagline}</p>

          <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {page.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-white ${page.accentBg}`}>
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </header>

        <Workspace page={page} />
      </div>
    </div>
  );
}
