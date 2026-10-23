"use client";

import { useRef, useState } from "react";
import ResultBody from "./ResultBody";
import { countWords, resultToText } from "@/lib/format";
import { addHistory } from "@/lib/history";
import type { Result, TaskPage } from "@/lib/tasks";

const MAX_CHARS = 20000;

export default function Workspace({ page }: { page: TaskPage }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [loadingExample, setLoadingExample] = useState(false);
  const [opts, setOpts] = useState<Record<string, string>>(() =>
    Object.fromEntries(page.options.map((o) => [o.key, o.default])),
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const words = countWords(text);
  const canRun = text.trim().length > 0 && !loading;
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    stopSpeaking();
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, task: page.id, options: opts }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else {
        setResult(data);
        addHistory(page.id, text, data);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(resultToText(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  function download() {
    if (!result) return;
    const url = URL.createObjectURL(new Blob([resultToText(result)], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `nora-${page.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function speak() {
    if (!result?.text || !canSpeak) return;
    if (speaking) return stopSpeaking();
    const u = new SpeechSynthesisUtterance(result.text.replace(/^[-*•]\s*/gm, ""));
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  // Each click asks the server for a brand-new sample; falls back to the built-in one if that fails.
  async function tryExample() {
    setLoadingExample(true);
    setError(null);
    try {
      const res = await fetch("/api/example", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: page.id }),
      });
      const data = await res.json();
      setText(res.ok && data.text ? String(data.text).slice(0, MAX_CHARS) : page.sample);
    } catch {
      setText(page.sample);
    } finally {
      setResult(null);
      setLoadingExample(false);
    }
  }

  async function onFile(file?: File) {
    if (!file) return;
    if (file.size > 500_000) return setError("That file is too large (max ~500 KB of plain text).");
    setError(null);
    setText((await file.text()).slice(0, MAX_CHARS));
    if (fileRef.current) fileRef.current.value = "";
  }

  const panel =
    "flex min-h-[520px] flex-col rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03] sm:p-6";
  const ghost =
    "rounded-lg border border-black/10 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10";

  return (
    <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-6">
      {/* Input */}
      <section className={panel}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Your text</h2>
          <div className="flex gap-2">
            <input ref={fileRef} type="file" accept=".txt,.md,text/plain" hidden onChange={(e) => onFile(e.target.files?.[0])} />
            <button onClick={() => fileRef.current?.click()} className={ghost}>
              Upload .txt
            </button>
            <button
              onClick={tryExample}
              disabled={loadingExample}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition hover:opacity-80 disabled:opacity-60 ${page.accentSoft} ${page.accentText}`}
            >
              {loadingExample ? "Writing…" : "↻ Try an example"}
            </button>
          </div>
        </div>

        {page.options.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-x-6 gap-y-2">
            {page.options.map((o) => (
              <div key={o.key} className="flex items-center gap-2 text-xs text-neutral-500">
                <span className="font-medium">{o.label}</span>
                <div role="radiogroup" aria-label={o.label} className="flex rounded-lg bg-black/5 p-0.5 dark:bg-white/10">
                  {o.choices.map((c) => {
                    const on = opts[o.key] === c.value;
                    return (
                      <button
                        key={c.value}
                        role="radio"
                        aria-checked={on}
                        onClick={() => setOpts((p) => ({ ...p, [o.key]: c.value }))}
                        className={`rounded-md px-2.5 py-1 font-medium transition ${
                          on ? `bg-gradient-to-r ${page.gradient} text-white shadow` : "hover:text-current"
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && canRun) run();
          }}
          placeholder={page.placeholder}
          aria-label="Input text"
          className="min-h-[300px] w-full flex-1 resize-y rounded-xl border border-black/10 bg-transparent p-4 text-[15px] leading-7 outline-none transition placeholder:text-neutral-400 focus:border-current focus:ring-2 focus:ring-current/20 dark:border-white/10"
          style={{ color: "inherit" }}
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-neutral-500">
            {words.toLocaleString()} words · ~{Math.max(words ? 1 : 0, Math.round(words / 230))} min read ·{" "}
            {text.length.toLocaleString()}/{MAX_CHARS.toLocaleString()} chars
          </span>
          <div className="flex gap-2">
            {text && (
              <button
                onClick={() => {
                  setText("");
                  setResult(null);
                  setError(null);
                  stopSpeaking();
                }}
                className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10"
              >
                Clear
              </button>
            )}
            <button
              onClick={run}
              disabled={!canRun}
              title="Ctrl+Enter"
              className={`rounded-lg bg-gradient-to-r ${page.gradient} px-6 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {loading ? "Working…" : page.button}
            </button>
          </div>
        </div>
      </section>

      {/* Output */}
      <section className={panel} aria-live="polite">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Result</h2>
          {result && (
            <div className="flex gap-2">
              {result.text && canSpeak && (
                <button onClick={speak} className={ghost}>
                  {speaking ? "■ Stop" : "▶ Listen"}
                </button>
              )}
              <button onClick={download} className={ghost}>
                Download
              </button>
              <button onClick={copy} className={ghost}>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
        </div>

        <div className="flex-1">
          {loading && (
            <div className="space-y-3 py-2" role="status" aria-label="Processing">
              {[92, 100, 78, 96, 60].map((w, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-black/10 dark:bg-white/10"
                  style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                />
              ))}
              <p className="pt-3 text-sm text-neutral-500">Nora is working on it…</p>
            </div>
          )}

          {!loading && !result && !error && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center text-sm text-neutral-400">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-bold ${page.accentSoft} ${page.accentText}`}>
                {page.icon}
              </span>
              Your result will appear here.
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          {result && <ResultBody page={page} result={result} />}
        </div>
      </section>
    </div>
  );
}
