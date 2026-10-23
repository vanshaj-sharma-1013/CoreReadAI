import type { Result } from "./tasks";

// Plain-text rendering of any result, used by Copy and Download.
export function resultToText(r: Result): string {
  if (r.text) return r.text;
  if (r.cards) return r.cards.map((c, i) => `${i + 1}. Q: ${c.front}\n   A: ${c.back}`).join("\n\n");
  if (r.questions)
    return r.questions
      .map(
        (q, i) =>
          `${i + 1}. ${q.question}\n` +
          q.options.map((o, j) => `   ${"ABCD"[j]}. ${o}`).join("\n") +
          `\n   Answer: ${"ABCD"[q.answer]}. ${q.explanation}`,
      )
      .join("\n\n");
  return "";
}

export const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
