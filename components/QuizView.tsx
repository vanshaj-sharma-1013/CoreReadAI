"use client";

import { useState } from "react";
import type { Question } from "@/lib/tasks";

type Props = { questions: Question[]; accentText: string; accentSoft: string; accentBg: string; gradient: string };

export default function QuizView({ questions, accentText, accentSoft, accentBg, gradient }: Props) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  const score = picked.reduce<number>((n, p, k) => n + (p === questions[k].answer ? 1 : 0), 0);

  function restart() {
    setPicked(questions.map(() => null));
    setI(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-5">
        <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-6 text-center text-white`}>
          <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Your score</p>
          <p className="mt-1 text-5xl font-bold">
            {score}/{questions.length}
          </p>
          <p className="mt-1 opacity-90">
            {pct}% · {pct >= 80 ? "Excellent work!" : pct >= 50 ? "Good effort, review the misses." : "Keep studying, you'll get there."}
          </p>
        </div>
        <ol className="space-y-3">
          {questions.map((q, k) => {
            const ok = picked[k] === q.answer;
            return (
              <li key={k} className="rounded-xl border border-black/10 p-4 text-sm dark:border-white/10">
                <p className="font-semibold">
                  <span className={ok ? "text-emerald-500" : "text-red-500"}>{ok ? "✓" : "✗"}</span> {k + 1}. {q.question}
                </p>
                {!ok && picked[k] !== null && (
                  <p className="mt-1 text-red-500">Your answer: {q.options[picked[k]!]}</p>
                )}
                <p className="mt-1 text-emerald-600 dark:text-emerald-400">Correct: {q.options[q.answer]}</p>
                {q.explanation && <p className="mt-1 text-neutral-500">{q.explanation}</p>}
              </li>
            );
          })}
        </ol>
        <button onClick={restart} className={`rounded-lg px-4 py-2 text-sm font-semibold ${accentSoft} ${accentText}`}>
          Retake quiz
        </button>
      </div>
    );
  }

  const q = questions[i];
  const chosen = picked[i];
  const revealed = chosen !== null;
  const last = i === questions.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>
          Question {i + 1} of {questions.length}
        </span>
        <span className={accentText}>{picked.filter((p) => p !== null).length} answered</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div className={`h-full ${accentBg} transition-all`} style={{ width: `${((i + (revealed ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <h3 className="text-lg font-semibold leading-snug">{q.question}</h3>

      <div className="space-y-2">
        {q.options.map((o, j) => {
          let cls = "border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10";
          if (revealed && j === q.answer) cls = "border-emerald-500/60 bg-emerald-500/10";
          else if (revealed && j === chosen) cls = "border-red-500/60 bg-red-500/10";
          else if (revealed) cls = "border-black/10 opacity-60 dark:border-white/10";
          return (
            <button
              key={j}
              disabled={revealed}
              onClick={() => setPicked((p) => p.map((v, k) => (k === i ? j : v)))}
              className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-[15px] transition ${cls}`}
            >
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-bold ${accentSoft} ${accentText}`}>{"ABCD"[j]}</span>
              {o}
            </button>
          );
        })}
      </div>

      {revealed && (
        <p className={`rounded-xl p-3 text-sm ${chosen === q.answer ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>
          <strong>{chosen === q.answer ? "Correct. " : "Not quite. "}</strong>
          {q.explanation}
        </p>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setI((x) => Math.max(0, x - 1))}
          disabled={i === 0}
          className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
        >
          ← Back
        </button>
        {last ? (
          <button
            onClick={() => setDone(true)}
            disabled={picked.some((p) => p === null)}
            className={`rounded-lg bg-gradient-to-r ${gradient} px-5 py-2 text-sm font-semibold text-white disabled:opacity-40`}
          >
            Finish &amp; see score
          </button>
        ) : (
          <button
            onClick={() => setI((x) => x + 1)}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
          >
            {revealed ? "Next →" : "Skip →"}
          </button>
        )}
      </div>
    </div>
  );
}
