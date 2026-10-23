// Renders the model's plain-text answer as structured blocks:
// "Heading:" labels become section titles, "-" lines become lists, the rest are paragraphs.

type Block = { type: "p"; text: string } | { type: "ul"; items: string[] };
type Section = { title?: string; blocks: Block[] };

const HEADING = /^\s*(?:#{1,3}\s*)?\**(In short|Explanation|Example|Polished text|Changes)\**\s*:\**\s*(.*)$/i;
const BULLET = /^\s*[-*•]\s+(.*)$/;

const clean = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");

function parse(raw: string): Section[] {
  const sections: Section[] = [{ blocks: [] }];
  const cur = () => sections[sections.length - 1];
  const push = (line: string) => {
    const b = BULLET.exec(line);
    const blocks = cur().blocks;
    const last = blocks[blocks.length - 1];
    if (b) {
      if (last?.type === "ul") last.items.push(clean(b[1]));
      else blocks.push({ type: "ul", items: [clean(b[1])] });
    } else if (line.trim()) {
      blocks.push({ type: "p", text: clean(line.trim()) });
    }
  };

  for (const line of raw.split("\n")) {
    const h = HEADING.exec(line);
    if (h) {
      sections.push({ title: h[1], blocks: [] });
      if (h[2]) push(h[2]);
    } else push(line);
  }
  return sections.filter((s) => s.title || s.blocks.length);
}

export default function ResultView({ text, accentText, accentSoft, accentBorder }: {
  text: string;
  accentText: string;
  accentSoft: string;
  accentBorder: string;
}) {
  const sections = parse(text);
  const hasTitles = sections.some((s) => s.title);

  return (
    <div className="space-y-5">
      {sections.map((s, i) => (
        <div
          key={i}
          className={
            hasTitles && s.title?.toLowerCase() === "polished text"
              ? `rounded-xl border ${accentBorder} ${accentSoft} p-4`
              : undefined
          }
        >
          {s.title && (
            <h3 className={`mb-2 text-xs font-bold uppercase tracking-widest ${accentText}`}>{s.title}</h3>
          )}
          <div className="space-y-3 text-[15px] leading-7">
            {s.blocks.map((b, j) =>
              b.type === "ul" ? (
                <ul key={j} className="space-y-2">
                  {b.items.map((it, k) => (
                    <li key={k} className="flex gap-3">
                      <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${accentText}`} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={j}>{b.text}</p>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
