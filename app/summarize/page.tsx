import type { Metadata } from "next";
import TaskPageView from "@/components/TaskPageView";

export const metadata: Metadata = {
  title: "Summarize · Nora AI",
  description: "Summarize text into key bullet points.",
};

export default function Page() {
  return <TaskPageView slug="summarize" />;
}
