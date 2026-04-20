import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Console",
  robots: { index: false, follow: false },
};

const log = [
  "[boot] agent.runtime initialized",
  "[boot] loading memory.weaviate…",
  "[boot] loading memory.graphiti…",
  "[ok]   mcp.server listening on tool://*",
  "[ok]   llm.router mounted (opus-4.6, sonnet-4.5, haiku-4.5)",
  "[warn] you shouldn't be reading these logs.",
  "",
  "if you're a recruiter: hi. good find.",
  "if you're a founder: let's talk.",
  "if you're a fellow engineer: what's up.",
];

export default function Console() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col gap-6 px-6 py-32 font-mono text-sm">
      <Link href="/" className="text-xs text-[var(--fg-subtle)] hover:text-[var(--accent)]">
        ← back
      </Link>
      <h1 className="text-xl font-semibold text-[var(--fg)]">/console</h1>
      <pre className="whitespace-pre-wrap text-[var(--fg-muted)]">
        {log.map((l, i) => (
          <div key={i}>
            {l.startsWith("[ok]") && <span className="text-[var(--accent)]">{l}</span>}
            {l.startsWith("[warn]") && <span className="text-[#ffd60a]">{l}</span>}
            {l.startsWith("[boot]") && <span className="text-[#0aa5ff]">{l}</span>}
            {!l.startsWith("[") && <span>{l || "\u00A0"}</span>}
          </div>
        ))}
      </pre>
    </main>
  );
}
