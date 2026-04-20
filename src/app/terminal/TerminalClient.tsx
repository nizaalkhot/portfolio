"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site, experience, skillGroups, projects, capabilities } from "@/data/content";
import Link from "next/link";

type Line = { kind: "cmd" | "out" | "err" | "sys" | "banner"; text: string };

const INITIAL: Line[] = [
  { kind: "banner", text: "" },
  { kind: "sys", text: "welcome to nizaal.sh · type 'help' for a list of commands." },
  { kind: "sys", text: "tip: press up/down to recall history · 'clear' to reset" },
  { kind: "sys", text: "" },
];

const HELP = [
  "whoami            — bio",
  "ls experience     — list roles",
  "ls skills         — list skill groups",
  "ls projects       — list projects",
  "ls capabilities   — list capabilities",
  "cat resume.txt    — print resume summary",
  "open <target>     — open github | linkedin | instagram | email",
  "contact           — show contact info",
  "home              — back to /",
  "clear             — clear screen",
  "help              — this list",
];

export function TerminalClient() {
  const [lines, setLines] = useState<Line[]>(INITIAL);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const println = useCallback((text: string, kind: Line["kind"] = "out") => {
    setLines((l) => [...l, { kind, text }]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      setLines((l) => [...l, { kind: "cmd", text: cmd }]);
      if (!cmd) return;

      const [head, ...rest] = cmd.split(/\s+/);
      const arg = rest.join(" ").toLowerCase();

      switch (head.toLowerCase()) {
        case "help":
          HELP.forEach((h) => println(h));
          break;
        case "whoami":
          println(`${site.name} · ${site.role}`);
          println(site.pitch);
          println(site.description);
          break;
        case "clear":
        case "cls":
          setLines([]);
          break;
        case "home":
        case "exit":
          if (typeof window !== "undefined") window.location.href = "/";
          break;
        case "contact":
          println(`email:     ${site.email}`);
          println(`phone:     ${site.phone}`);
          println(`location:  ${site.location}`);
          println(`linkedin:  ${site.socials.linkedin}`);
          println(`github:    ${site.socials.github}`);
          break;
        case "cat":
          if (arg === "resume.txt" || arg === "resume") {
            println(`# ${site.name}`);
            println(`${site.role} — ${site.subRole}`);
            println(`${site.location} · ${site.email}`);
            println("");
            println("## experience");
            experience.forEach((r) => {
              println(`- ${r.title} @ ${r.company} · ${r.dates}`);
            });
            println("");
            println("## highlights");
            println("- 86% reduction in coding time via hierarchical multi-agent LangGraph ecosystem");
            println("- 52% reduction in manual data entry via multimodal AWS Bedrock agent");
            println("- 28% compliance adherence improvement via DSPy optimizers");
          } else {
            println(`cat: ${arg || "(none)"}: no such file`, "err");
          }
          break;
        case "ls":
          if (arg === "experience" || arg === "exp") {
            experience.forEach((r, i) => {
              println(`${String(i + 1).padStart(2, "0")}  ${r.dates.padEnd(22)} ${r.title}`);
            });
          } else if (arg === "skills") {
            skillGroups.forEach((g) => {
              println(`${g.label}:`);
              println(`  ${g.items.join(", ")}`);
            });
          } else if (arg === "projects" || arg === "work") {
            projects.forEach((p, i) => {
              println(`${String(i + 1).padStart(2, "0")}  ${p.name} — ${p.tagline}`);
            });
          } else if (arg === "capabilities") {
            capabilities.forEach((c) => println(`- ${c.title} — ${c.definition}`));
          } else if (!arg) {
            println("experience  skills  projects  capabilities");
          } else {
            println(`ls: ${arg}: unknown`, "err");
          }
          break;
        case "open":
          {
            const targets: Record<string, string> = {
              github: site.socials.github,
              linkedin: site.socials.linkedin,
              instagram: site.socials.instagram,
              hackerrank: site.socials.hackerrank,
              email: `mailto:${site.email}`,
              mail: `mailto:${site.email}`,
              resume: site.resumeUrl,
            };
            const t = targets[arg];
            if (!t) {
              println(`open: ${arg || "(none)"}: unknown target`, "err");
              println(`available: ${Object.keys(targets).join(", ")}`);
            } else {
              println(`opening ${t}…`);
              if (typeof window !== "undefined") {
                window.open(t, t.startsWith("http") ? "_blank" : "_self", "noopener");
              }
            }
          }
          break;
        case "echo":
          println(rest.join(" "));
          break;
        case "date":
          println(new Date().toString());
          break;
        default:
          println(`${head}: command not found. type \`help\` for options.`, "err");
      }
    },
    [println],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input;
      if (v.trim()) {
        setHistory((h) => [...h, v]);
        setHistIdx(-1);
      }
      setInput("");
      run(v);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-none border border-[var(--hairline-strong)] bg-[#050506] font-mono text-[13px] leading-[1.55] text-[var(--fg)] md:rounded-xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[#0a0a0b] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-[var(--fg-subtle)]">
            {site.name.toLowerCase().replace(" ", "-")}@portfolio — zsh — 80×24
          </span>
        </div>
        <Link href="/" className="text-xs text-[var(--fg-subtle)] hover:text-[var(--accent)]">
          ← back
        </Link>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {lines.map((l, i) => {
          if (l.kind === "banner") {
            return <Banner key={i} />;
          }
          return (
            <div
              key={i}
              className={
                l.kind === "cmd"
                  ? "text-[var(--fg)]"
                  : l.kind === "err"
                    ? "text-[#ff6b6b]"
                    : l.kind === "sys"
                      ? "text-[var(--accent)] opacity-90"
                      : "whitespace-pre-wrap text-[var(--fg-muted)]"
              }
            >
              {l.kind === "cmd" ? (
                <>
                  <span className="text-[var(--accent)]">➜</span>{" "}
                  <span className="text-[#0aa5ff]">~/portfolio</span>{" "}
                  <span>{l.text}</span>
                </>
              ) : (
                l.text || "\u00A0"
              )}
            </div>
          );
        })}

        <div className="flex items-center gap-2">
          <span className="text-[var(--accent)]">➜</span>
          <span className="text-[#0aa5ff]">~/portfolio</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            aria-label="terminal input"
            className="flex-1 bg-transparent text-[var(--fg)] outline-none caret-[var(--accent)]"
          />
        </div>

        <div ref={endRef} />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div className="mb-5 select-none border-b border-[var(--hairline)] pb-5">
      <div className="flex items-baseline gap-3">
        <span
          className="text-[clamp(1.6rem,5vw,2.4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--fg)]"
          style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui" }}
        >
          nizaal
        </span>
        <span className="text-[var(--accent)] text-xl leading-none">·</span>
        <span
          className="text-[clamp(1.6rem,5vw,2.4rem)] font-semibold leading-none tracking-[-0.04em] text-[var(--fg)]"
          style={{ fontFamily: "var(--font-sans), ui-sans-serif, system-ui" }}
        >
          khot
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-[var(--fg-muted)]">
        <span className="text-[var(--accent)]">{">"}</span>
        <span>ai engineer — agentic systems, mcp, multi-agent</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-[var(--fg-subtle)]">
        <span>mumbai · shipping autonomous agents in production</span>
      </div>
    </div>
  );
}
