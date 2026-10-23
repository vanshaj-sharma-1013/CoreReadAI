import type { Metadata } from "next";
import TaskPageView from "@/components/TaskPageView";

export const metadata: Metadata = {
  title: "Explain · Nora AI",
  description: "Explain hard concepts in plain language.",
};

export default function Page() {
  return <TaskPageView slug="explain" />;
}
