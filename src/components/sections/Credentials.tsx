"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, education } from "@/data/content";
import { Award, GraduationCap, ArrowUpRight } from "lucide-react";

export function Credentials() {
  const reduce = useReducedMotion();
  return (
    <section
      id="credentials"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Credentials" title="Certified. Schooled. Shipping." />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {certifications.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5 transition-colors hover:border-[var(--accent)]/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5 text-[var(--accent)]">
                <Award size={18} aria-hidden />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-[var(--fg)]">{c.name}</h3>
                  <ArrowUpRight size={14} className="text-[var(--fg-subtle)] transition-colors group-hover:text-[var(--accent)]" aria-hidden />
                </div>
                <p className="mt-1 text-xs text-[var(--fg-muted)]">{c.issuer}</p>
                <p className="mt-2 mono text-[10px] text-[var(--fg-subtle)]">credly.com</p>
              </div>
            </motion.a>
          ))}

          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg)] text-[var(--fg-muted)]">
                <GraduationCap size={18} aria-hidden />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-[var(--fg)]">{e.degree}</h3>
                <p className="mt-1 text-xs text-[var(--fg-muted)]">
                  {e.institution} · {e.location}
                </p>
                <p className="mt-2 mono text-[10px] text-[var(--fg-subtle)]">
                  {e.year} · {e.grade}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
