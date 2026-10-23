import Link from "next/link";
import { BeforeAfter, Cta, Faq, Features, HowItWorks, UseCases } from "@/components/HomeSections";
import { TASK_PAGES } from "@/lib/tasks";

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.30),transparent_65%)]" />

      <section className="w-full px-5 pb-12 pt-16 text-center sm:px-8 sm:pt-24 lg:px-12">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Reading, writing &amp; study assistant
        </span>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Read faster. Understand deeper. Write{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            better.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Nora AI summarizes dense material, explains difficult concepts in plain language, polishes your writing, and turns
          your notes into flashcards and quizzes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/summarize"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            Get started
          </Link>
          <a
            href="#tools"
            className="rounded-xl border border-black/10 px-6 py-3 text-sm font-semibold transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            See the tools
          </a>
        </div>
      </section>

      <section id="tools" className="w-full px-5 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {TASK_PAGES.map((t, idx) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className={`${idx < 3 ? "lg:col-span-2" : "lg:col-span-3"} group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-7 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]`}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-60 blur-3xl transition group-hover:opacity-100"
                style={{ background: t.glow }}
              />
              <span
                className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${t.gradient} text-xl font-bold text-white shadow`}
              >
                {t.icon}
              </span>
              <h2 className="text-2xl font-bold">{t.title}</h2>
              <p className="mt-2 flex-1 text-neutral-600 dark:text-neutral-400">{t.tagline}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                {t.steps.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${t.accentBg}`} /> {s}
                  </li>
                ))}
              </ul>
              <span className={`mt-6 text-sm font-semibold ${t.accentText}`}>
                Open {t.title.toLowerCase()} <span className="inline-block transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <HowItWorks />
      <Features />
      <BeforeAfter />
      <UseCases />
      <Faq />
      <Cta />
    </div>
  );
}
