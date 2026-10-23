"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ResultBody from "./ResultBody";
import { countWords, resultToText } from "@/lib/format";
import { clearHistory, getHistory, removeHistory, type HistoryEntry } from "@/lib/history";
import { getTaskById, TASK_PAGES } from "@/lib/tasks";

export default function HistoryView() {
  const [entries, setEntries] = useState<HistoryEntry[] | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  // Read localStorage after mount (deferred so server and client markup match on first render).
  useEffect(() => {
    const id = setTimeout(() => setEntries(getHistory()), 0);
    return () => clearTimeout(id);
  }, []);

  if (entries === null) return <p className="text-sm text-neutral-500">Loading…</p>;

  const refresh = () => setEntries(getHistory());
  const shown = entries.filter((e) => filter === "all" || e.task === filter);
  const totalWords = entries.reduce((n, e) => n + countWords(e.input), 0);

  const stat = (label: string, value: string | number) => (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">{label}</p>
    </div>
  );

  if (!entries.length)
    return (
      <div className="rounded-2xl border border-dashed border-black/15 p-12 text-center dark:border-white/15">
        <p className="text-lg font-semibold">Nothing here yet</p>
        <p className="mt-1 text-sm text-neutral-500">Everything you generate is saved here, in this browser only.</p>
        <Link href="/summarize" className="mt-5 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white">
          Try a tool
        </Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stat("Total runs", entries.length)}
        {stat("Words processed", totalWords.toLocaleString())}
        {stat("Most used", getTaskById(Object.entries(entries.reduce<Record<string, number>>((m, e) => ((m[e.task] = (m[e.task] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1])[0][0])?.title ?? "-")}
        {stat("Saved on", "This device")}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", nav: "All" }, ...TASK_PAGES].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                filter === t.id ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10"
              }`}
            >
              {t.nav}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            if (confirm("Delete all saved history from this browser?")) {
              clearHistory();
              refresh();
            }
          }}
          className="rounded-lg px-3 py-1.5 text-sm text-red-500 hover:bg-red-500/10"
        >
          Clear all
        </button>
      </div>

      <ul className="space-y-3">
        {shown.map((e) => {
          const page = getTaskById(e.task);
          if (!page) return null;
          const isOpen = open === e.id;
          return (
            <li key={e.id} className="overflow-hidden rounded-2xl border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/[0.03]">
              <button onClick={() => setOpen(isOpen ? null : e.id)} className="flex w-full items-center gap-4 p-4 text-left">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${page.gradient} font-bold text-white`}>{page.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{e.input.slice(0, 120)}</span>
                  <span className="text-xs text-neutral-500">
                    {page.title} · {new Date(e.ts).toLocaleString()} · {countWords(e.input)} words
                  </span>
                </span>
                <span className="text-neutral-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t border-black/10 p-5 dark:border-white/10">
                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">Input</h3>
                    <p className="max-h-40 overflow-auto whitespace-pre-wrap text-sm leading-6 text-neutral-600 dark:text-neutral-400">{e.input}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neutral-500">Result</h3>
                    <ResultBody page={page} result={e.result} />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(resultToText(e.result)).catch(() => {})}
                      className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    >
                      Copy result
                    </button>
                    <button
                      onClick={() => {
                        removeHistory(e.id);
                        refresh();
                      }}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
