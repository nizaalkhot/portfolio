"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { capabilities } from "@/data/content";
import { cn } from "@/lib/cn";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Six surfaces where I operate."
          description="Every card is a practice I ship in production — not a keyword."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Card key={c.slug} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  c,
  index,
}: {
  c: (typeof import("@/data/content"))["capabilities"][number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const n = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-6 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elev)]/70 hover:shadow-[0_20px_60px_-30px_var(--accent-glow)]",
        "focus-visible:border-[var(--accent)]/40",
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        <span className="mono text-[10px] text-[var(--fg-subtle)]">/{n}</span>
        <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
          {c.tag}
        </span>
      </div>

      <h3 className="text-xl font-semibold tracking-[-0.015em] text-[var(--fg)]">
        {c.title}
      </h3>

      <p className="text-sm leading-relaxed text-[var(--fg-muted)] transition-colors duration-300 group-hover:text-[var(--fg)]">
        {c.definition}
      </p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="mono text-[10px] text-[var(--fg-subtle)]">capability.{c.slug}</span>
        <span className="mono text-[10px] text-[var(--fg-subtle)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]">
          ↗
        </span>
      </div>
    </motion.div>
  );
}
