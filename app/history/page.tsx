import type { Metadata } from "next";
import HistoryView from "@/components/HistoryView";

export const metadata: Metadata = {
  title: "History · Nora AI",
  description: "Everything you've generated, saved privately in your browser.",
};

export default function Page() {
  return (
    <div className="w-full px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12">
      <header className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Your <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">history</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Every summary, explanation, polish, deck and quiz you create is saved here. It lives only in this browser, so it stays private.
        </p>
      </header>
      <HistoryView />
    </div>
  );
}
