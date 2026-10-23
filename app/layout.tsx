import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nora AI",
  description: "Summarize, explain and polish text, then study it with flashcards and quizzes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex w-full flex-1 flex-col">{children}</main>
        <footer className="w-full border-t border-black/10 px-5 py-6 text-center text-xs text-neutral-500 dark:border-white/10 sm:px-8 lg:px-12">
          © Nora AI · Summarize · Explain · Polish · Flashcards · Quiz
        </footer>
      </body>
    </html>
  );
}
