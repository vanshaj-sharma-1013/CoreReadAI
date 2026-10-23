import type { Metadata } from "next";
import TaskPageView from "@/components/TaskPageView";

export const metadata: Metadata = {
  title: "Flashcards · Nora AI",
  description: "Turn notes into flip-able flashcards.",
};

export default function Page() {
  return <TaskPageView slug="flashcards" />;
}
