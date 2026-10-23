import { rateLimited } from "@/lib/ratelimit";
import { AllProvidersFailed, generateAIResponse, parseCards, parseQuestions, TASKS, type TaskType } from "@/lib/nora";

const MAX_CHARS = 20_000;

// The browser only ever receives structured results or { error }. Provider/model details stay on the server.
export async function POST(request: Request) {
  if (rateLimited(request)) return Response.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });

  let body: { text?: unknown; task?: unknown; options?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  const task = body.task as TaskType;

  if (!text) return Response.json({ error: "Please enter some text." }, { status: 400 });
  if (text.length > MAX_CHARS)
    return Response.json({ error: `Text is too long (max ${MAX_CHARS.toLocaleString()} characters).` }, { status: 400 });
  if (typeof task !== "string" || !Object.hasOwn(TASKS, task)) return Response.json({ error: "Unknown task." }, { status: 400 });

  // Keep only string option values; unknown values fall back to defaults inside lib/nora.ts.
  const opts: Record<string, string> = {};
  if (body.options && typeof body.options === "object")
    for (const [k, v] of Object.entries(body.options)) if (typeof v === "string") opts[k] = v.slice(0, 20);

  try {
    const result = await generateAIResponse(text, task, opts);
    // Server-side log only, for your own debugging.
    console.log(`[nora] ${task} served by ${result.provider}/${result.model} in ${result.elapsedMs}ms (${result.failures.length} fallbacks)`);
    if (task === "flashcards") return Response.json({ cards: parseCards(result.text) });
    if (task === "quiz") return Response.json({ questions: parseQuestions(result.text) });
    return Response.json({ text: result.text });
  } catch (e) {
    if (e instanceof AllProvidersFailed) {
      console.error("[nora] all providers failed:", e.failures);
      return Response.json({ error: "The service is temporarily unavailable. Please try again in a moment." }, { status: 502 });
    }
    console.error("[nora] unexpected error:", e);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
