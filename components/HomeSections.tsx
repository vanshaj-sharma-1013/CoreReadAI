import Link from "next/link";

const card =
  "rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03]";

function Heading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-300">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-neutral-600 dark:text-neutral-400">{sub}</p>}
    </div>
  );
}

const section = "w-full px-5 py-16 sm:px-8 lg:px-12";

export function HowItWorks() {
  const steps = [
    { n: "1", t: "Paste or upload", d: "Drop in text, or upload a .txt or .md file. Up to 20,000 characters at a time." },
    { n: "2", t: "Choose a tool and options", d: "Pick what you need and tune it: summary length, explanation level, tone, card count or difficulty." },
    { n: "3", t: "Get structured results", d: "Read clean bullets, flip flashcards or take a scored quiz. Copy, download or listen to the result." },
  ];
  return (
    <section className={section}>
      <Heading eyebrow="How it works" title="From raw text to understanding in three steps" />
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <li key={s.n} className={card}>
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-bold text-white">{s.n}</span>
            <h3 className="text-lg font-bold">{s.t}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Features() {
  const items = [
    { i: "🎚️", t: "Tunable output", d: "Brief to detailed summaries, beginner to expert explanations, academic to friendly tone." },
    { i: "🧠", t: "Study mode", d: "Generate flashcards you can flip, shuffle and track, plus multiple-choice quizzes with scoring and explanations." },
    { i: "🔊", t: "Listen back", d: "Have any summary or explanation read aloud with one click, handy for revision on the move." },
    { i: "📁", t: "Upload files", d: "Load .txt and .md notes straight into any tool instead of copy-pasting." },
    { i: "⬇️", t: "Copy and download", d: "Take your results anywhere as plain text, ready for notes, essays or flashcard apps." },
    { i: "🕘", t: "Private history", d: "Your past runs are saved in your own browser, searchable by tool, and never uploaded anywhere." },
    { i: "🛡️", t: "Safe by design", d: "Your text is treated strictly as material to process, so instructions hidden inside it are ignored." },
    { i: "⚡", t: "Always available", d: "Requests are retried automatically behind the scenes if something fails, so you rarely see an error." },
  ];
  return (
    <section className={`${section} bg-black/[0.02] dark:bg-white/[0.02]`}>
      <Heading eyebrow="Features" title="Everything you need to read, write and study" sub="Small touches that make the tools genuinely useful day to day." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f) => (
          <div key={f.t} className={card}>
            <span className="text-2xl" aria-hidden>{f.i}</span>
            <h3 className="mt-3 font-bold">{f.t}</h3>
            <p className="mt-1.5 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BeforeAfter() {
  return (
    <section className={section}>
      <Heading eyebrow="See it in action" title="Messy draft in, polished prose out" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className={card}>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-500">Before</p>
          <p className="leading-7 text-neutral-600 dark:text-neutral-400">
            me and my teammates was working on the project since last week, but the results isnt matching what we expected and we dont know why its happening.
          </p>
        </div>
        <div className="rounded-2xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-300">After · Polish</p>
          <p className="leading-7">
            My teammates and I have been working on the project since last week, but the results are not matching our expectations, and we do not know why this is happening.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>• “was working” → “have been working” (tense and agreement)</li>
            <li>• “isnt”, “dont” → “are not”, “do not” (formal register)</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function UseCases() {
  const items = [
    { t: "Students", d: "Condense chapters, decode tough concepts and quiz yourself before exams." },
    { t: "Researchers", d: "Skim papers quickly and tidy up abstracts, emails and drafts." },
    { t: "Writers and professionals", d: "Clean up reports and messages in the right tone, in seconds." },
  ];
  return (
    <section className={`${section} bg-black/[0.02] dark:bg-white/[0.02]`}>
      <Heading eyebrow="Who it's for" title="Built for anyone who works with text" />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((u) => (
          <div key={u.t} className={card}>
            <h3 className="text-lg font-bold">{u.t}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">{u.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  const qs = [
    ["Is my text stored?", "Nothing is stored on a server. Your text is sent only to generate the result. History is saved in your own browser and you can clear it any time from the History page."],
    ["How long can my text be?", "Up to 20,000 characters per request, roughly 3,000 words. For longer documents, run it in sections."],
    ["Can I trust the results?", "Nora is built to stick to your text and avoid inventing facts, but AI can still make mistakes. Check important details, especially for quizzes and explanations."],
    ["What file types can I upload?", "Plain text (.txt) and Markdown (.md) files. For PDFs or Word documents, copy the text and paste it in."],
    ["Why did I get an error?", "If the service is busy you may see a temporary error or a short rate limit. Wait a moment and try again."],
  ];
  return (
    <section className={section}>
      <Heading eyebrow="FAQ" title="Questions, answered" />
      <div className="mx-auto max-w-3xl space-y-3">
        {qs.map(([q, a]) => (
          <details key={q} className={`${card} group`}>
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
              {q}
              <span className="text-neutral-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="w-full px-5 pb-20 sm:px-8 lg:px-12">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-14 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to work smarter with text?</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">No sign-up. Paste something and see the difference in seconds.</p>
        <Link href="/summarize" className="mt-7 inline-block rounded-xl bg-white px-7 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition hover:opacity-90">
          Start with a summary
        </Link>
      </div>
    </section>
  );
}
