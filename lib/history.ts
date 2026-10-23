// Browser-only history (localStorage). Nothing is sent to the server.
import type { Result, TaskType } from "./tasks";

export type HistoryEntry = { id: string; task: TaskType; input: string; result: Result; ts: number };

const KEY = "nora-history-v1";
const MAX = 40;

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function save(list: HistoryEntry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {}
}

export function addHistory(task: TaskType, input: string, result: Result) {
  const entry: HistoryEntry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, task, input, result, ts: Date.now() };
  save([entry, ...getHistory()]);
}

export function removeHistory(id: string) {
  save(getHistory().filter((e) => e.id !== id));
}

export function clearHistory() {
  save([]);
}
