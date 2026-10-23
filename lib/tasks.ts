// Client-safe task metadata (no prompts, no keys). Prompts live in lib/nora.ts (server-only).

export type TaskType = "summary" | "explain" | "grammar" | "flashcards" | "quiz";

export type Card = { front: string; back: string };
export type Question = { question: string; options: string[]; answer: number; explanation: string };

// What the API returns / what history stores: exactly one of these is set.
export type Result = { text?: string; cards?: Card[]; questions?: Question[] };

export type TaskOption = {
  key: string;
  label: string;
  default: string;
  choices: { value: string; label: string }[];
};

export type TaskPage = {
  id: TaskType;
  kind: "text" | "flashcards" | "quiz";
  slug: string;
  nav: string;
  title: string;
  headline: { accent: string; rest: string };
  tagline: string;
  button: string;
  placeholder: string;
  sample: string;
  steps: string[];
  options: TaskOption[];
  // Full class strings so Tailwind can see them.
  accentText: string;
  accentBg: string;
  accentSoft: string;
  accentBorder: string;
  gradient: string;
  glow: string;
  icon: string;
};

export const TASK_PAGES: TaskPage[] = [
  {
    id: "summary",
    kind: "text",
    slug: "summarize",
    nav: "Summarize",
    title: "Summarize",
    headline: { accent: "Summarize", rest: "your text" },
    tagline: "Turn long articles, papers and chapters into crisp key bullet points.",
    button: "Summarize text",
    placeholder: "Paste an article, abstract, lecture notes or any long passage…",
    sample:
      "Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy stored in glucose. It takes place mainly in the chloroplasts, where chlorophyll absorbs sunlight. In the light-dependent reactions, water is split to release oxygen and produce ATP and NADPH. In the Calvin cycle, these energy carriers are used to fix carbon dioxide into sugars. Photosynthesis is the foundation of most food chains and is responsible for the oxygen in Earth's atmosphere.",
    steps: ["Paste your text", "Pick a summary length", "Copy, download or listen"],
    options: [
      {
        key: "length",
        label: "Length",
        default: "standard",
        choices: [
          { value: "brief", label: "Brief" },
          { value: "standard", label: "Standard" },
          { value: "detailed", label: "Detailed" },
        ],
      },
    ],
    accentText: "text-indigo-600 dark:text-indigo-300",
    accentBg: "bg-indigo-500",
    accentSoft: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/30",
    gradient: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.28)",
    icon: "≡",
  },
  {
    id: "explain",
    kind: "text",
    slug: "explain",
    nav: "Explain",
    title: "Explain",
    headline: { accent: "Explain", rest: "any concept" },
    tagline: "Get hard concepts broken down in plain language, with a clear example.",
    button: "Explain concept",
    placeholder: "Paste a concept, definition or confusing paragraph you want explained…",
    sample:
      "Quantum entanglement is a phenomenon in which two or more particles become correlated so that the quantum state of each cannot be described independently of the others, even when separated by large distances.",
    steps: ["Paste a tough concept", "Choose your level", "Read the breakdown and example"],
    options: [
      {
        key: "level",
        label: "Explain like I'm",
        default: "undergrad",
        choices: [
          { value: "eli5", label: "A beginner" },
          { value: "undergrad", label: "An undergrad" },
          { value: "expert", label: "An expert" },
        ],
      },
    ],
    accentText: "text-emerald-600 dark:text-emerald-300",
    accentBg: "bg-emerald-500",
    accentSoft: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/30",
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.25)",
    icon: "?",
  },
  {
    id: "grammar",
    kind: "text",
    slug: "polish",
    nav: "Polish",
    title: "Polish",
    headline: { accent: "Polish", rest: "your writing" },
    tagline: "Fix grammar, tone and syntax so your writing reads as clear, formal academic prose.",
    button: "Polish text",
    placeholder: "Paste the draft you want corrected and refined…",
    sample:
      "me and my teammates was working on the project since last week, but the results isnt matching what we expected and we dont know why its happening.",
    steps: ["Paste your draft", "Pick a tone", "Review every change made"],
    options: [
      {
        key: "tone",
        label: "Tone",
        default: "academic",
        choices: [
          { value: "academic", label: "Academic" },
          { value: "professional", label: "Professional" },
          { value: "friendly", label: "Friendly" },
        ],
      },
    ],
    accentText: "text-fuchsia-600 dark:text-fuchsia-300",
    accentBg: "bg-fuchsia-500",
    accentSoft: "bg-fuchsia-500/10",
    accentBorder: "border-fuchsia-500/30",
    gradient: "from-fuchsia-500 to-pink-500",
    glow: "rgba(217,70,239,0.25)",
    icon: "✓",
  },
  {
    id: "flashcards",
    kind: "flashcards",
    slug: "flashcards",
    nav: "Flashcards",
    title: "Flashcards",
    headline: { accent: "Flashcards", rest: "from your notes" },
    tagline: "Turn notes and chapters into flip-able study cards you can shuffle and track.",
    button: "Make flashcards",
    placeholder: "Paste lecture notes, a chapter or a topic to study…",
    sample:
      "The mitochondrion is the organelle that produces most of a cell's ATP through oxidative phosphorylation. It has a double membrane; the inner membrane folds into cristae that increase surface area. Mitochondria contain their own circular DNA and ribosomes, supporting the endosymbiotic theory that they descend from free-living bacteria. The Krebs cycle occurs in the mitochondrial matrix, while the electron transport chain is embedded in the inner membrane.",
    steps: ["Paste your study material", "Choose how many cards", "Flip, shuffle and mark what you know"],
    options: [
      {
        key: "count",
        label: "Cards",
        default: "10",
        choices: [
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
        ],
      },
    ],
    accentText: "text-amber-600 dark:text-amber-300",
    accentBg: "bg-amber-500",
    accentSoft: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    gradient: "from-amber-500 to-orange-500",
    glow: "rgba(245,158,11,0.25)",
    icon: "▤",
  },
  {
    id: "quiz",
    kind: "quiz",
    slug: "quiz",
    nav: "Quiz",
    title: "Quiz",
    headline: { accent: "Quiz", rest: "yourself" },
    tagline: "Generate a multiple-choice test from your material and get scored with explanations.",
    button: "Generate quiz",
    placeholder: "Paste the material you want to be tested on…",
    sample:
      "The French Revolution began in 1789 amid financial crisis, food shortages and resentment of the privileged estates. The storming of the Bastille on 14 July became its symbol. The Declaration of the Rights of Man and of the Citizen proclaimed liberty and equality before the law. The monarchy was abolished in 1792, Louis XVI was executed in 1793, and the Reign of Terror followed under the Committee of Public Safety, led by Robespierre. The period ended with Napoleon Bonaparte's coup in 1799.",
    steps: ["Paste your material", "Pick length and difficulty", "Answer and see your score"],
    options: [
      {
        key: "count",
        label: "Questions",
        default: "5",
        choices: [
          { value: "5", label: "5" },
          { value: "10", label: "10" },
        ],
      },
      {
        key: "difficulty",
        label: "Difficulty",
        default: "medium",
        choices: [
          { value: "easy", label: "Easy" },
          { value: "medium", label: "Medium" },
          { value: "hard", label: "Hard" },
        ],
      },
    ],
    accentText: "text-sky-600 dark:text-sky-300",
    accentBg: "bg-sky-500",
    accentSoft: "bg-sky-500/10",
    accentBorder: "border-sky-500/30",
    gradient: "from-sky-500 to-blue-500",
    glow: "rgba(14,165,233,0.25)",
    icon: "✎",
  },
];

export const getTaskPage = (slug: string) => TASK_PAGES.find((t) => t.slug === slug)!;
export const getTaskById = (id: string) => TASK_PAGES.find((t) => t.id === id);
