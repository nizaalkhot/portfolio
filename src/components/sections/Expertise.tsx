"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/data/content";

export function Expertise() {
  return (
    <section
      id="expertise"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Stack"
          title="What I reach for."
          description="A focused stack for agentic systems — optimized for evals, observability, and real latency in production."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <GroupCard key={g.label} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GroupCard({
  group,
  index,
}: {
  group: (typeof import("@/data/content"))["skillGroups"][number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5 transition-colors hover:border-white/14"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-tight text-[var(--fg)]">
          {group.label}
        </h3>
        <span className="mono text-[10px] text-[var(--fg-subtle)]">
          {String(group.items.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="mono rounded-md border border-[var(--hairline-strong)] bg-[var(--bg)] px-2 py-1 text-[11px] text-[var(--fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:text-[var(--fg)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
