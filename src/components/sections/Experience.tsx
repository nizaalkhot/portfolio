"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/content";

const METRIC_RE = /(\d+(?:\.\d+)?%)/;
const METRIC_SPLIT = /(\d+(?:\.\d+)?%)/g;

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Experience"
          title="Four years at Dentsu Global Services."
          description="Each role compounded — from scraping pipelines to autonomous multi-agent ecosystems."
        />

        <div className="relative mt-16">
          {/* Timeline rail */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[var(--hairline-strong)] to-transparent md:left-[11px]"
          />

          <ol className="flex flex-col gap-16">
            {experience.map((role, i) => (
              <RoleBlock key={i} role={role} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function RoleBlock({
  role,
  index,
}: {
  role: (typeof import("@/data/content"))["experience"][number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-6 pl-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-12 md:pl-12"
    >
      {/* Node dot */}
      <span
        aria-hidden
        className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--bg)] md:left-1"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      </span>

      <div className="md:sticky md:top-28 md:self-start">
        <span className="mono text-[11px] text-[var(--accent)]">{role.dates}</span>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-[var(--fg)]">
          {role.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">{role.company}</p>
        <p className="mt-0.5 text-xs text-[var(--fg-subtle)]">{role.location}</p>
      </div>

      <ul className="flex flex-col gap-3">
        {role.bullets.map((b, i) => (
          <li
            key={i}
            className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/30 p-4 text-sm leading-relaxed text-[var(--fg-muted)]"
          >
            <HighlightMetrics text={b} />
          </li>
        ))}
      </ul>
    </motion.li>
  );
}

function HighlightMetrics({ text }: { text: string }) {
  const parts = text.split(METRIC_SPLIT);
  return (
    <>
      {parts.map((part, i) =>
        METRIC_RE.test(part) ? (
          <strong key={i} className="mono text-[var(--accent)] font-medium">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
