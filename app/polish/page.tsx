import type { Metadata } from "next";
import TaskPageView from "@/components/TaskPageView";

export const metadata: Metadata = {
  title: "Polish · Nora AI",
  description: "Polish grammar, tone and syntax.",
};

export default function Page() {
  return <TaskPageView slug="polish" />;
}
