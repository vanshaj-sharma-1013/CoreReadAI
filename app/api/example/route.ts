import { generateExample, TASKS, type TaskType } from "@/lib/nora";
import { rateLimited } from "@/lib/ratelimit";

// Returns { text }: a freshly generated sample for the given tool. Errors are generic; the client falls back to a built-in sample.
export async function POST(request: Request) {
  if (rateLimited(request)) return Response.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429 });

  let task: unknown;
  try {
    task = (await request.json()).task;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof task !== "string" || !Object.hasOwn(TASKS, task)) return Response.json({ error: "Unknown task." }, { status: 400 });

  try {
    return Response.json({ text: await generateExample(task as TaskType) });
  } catch (e) {
    console.error("[nora] example generation failed:", e);
    return Response.json({ error: "Couldn't generate an example right now." }, { status: 502 });
  }
}
