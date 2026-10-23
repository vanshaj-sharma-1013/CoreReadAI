import type { Metadata } from "next";
import TaskPageView from "@/components/TaskPageView";

export const metadata: Metadata = {
  title: "Quiz · Nora AI",
  description: "Generate a multiple-choice quiz from your material.",
};

export default function Page() {
  return <TaskPageView slug="quiz" />;
}
