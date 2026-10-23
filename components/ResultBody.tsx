import FlashcardDeck from "./FlashcardDeck";
import QuizView from "./QuizView";
import ResultView from "./ResultView";
import type { Result, TaskPage } from "@/lib/tasks";

// Picks the right renderer for a result (shared by the tool pages and the history page).
export default function ResultBody({ page, result }: { page: TaskPage; result: Result }) {
  const accent = { accentText: page.accentText, accentSoft: page.accentSoft };
  if (result.cards)
    return <FlashcardDeck cards={result.cards} {...accent} accentBg={page.accentBg} gradient={page.gradient} />;
  if (result.questions)
    return <QuizView questions={result.questions} {...accent} accentBg={page.accentBg} gradient={page.gradient} />;
  return <ResultView text={result.text ?? ""} {...accent} accentBorder={page.accentBorder} />;
}
