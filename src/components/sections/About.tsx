"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site, getYearsOfExperience, getStats } from "@/data/content";
import { FileDown, Mail } from "lucide-react";

export function About() {
  const [years, setYears] = useState(() => getYearsOfExperience());
  const [currentStats, setCurrentStats] = useState(() => getStats());

  useEffect(() => {
    setYears(getYearsOfExperience());
    setCurrentStats(getStats());
  }, []);
  return (
    <section
      id="about"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeader
            eyebrow="About"
            title="Senior AI engineer. Production agents, not demos."
          />
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="text-lg leading-relaxed text-[var(--fg-muted)]">
                {years}+ years of software engineering, now focused on{" "}
                <span className="text-[var(--fg)]">autonomous multi-agent systems</span>{" "}
                and <span className="text-[var(--fg)]">generative AI</span> at enterprise scale.
                I architect orchestration graphs in <span className="mono text-[var(--fg)]">LangGraph</span>,
                build MCP tool servers, fine-tune open-source models with{" "}
                <span className="mono text-[var(--fg)]">LoRA/QLoRA</span>, and ship RAG pipelines that
                clear evals — not just vibes.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {currentStats.map((s, i) => (
                  <StatBlock key={s.label} stat={s} delay={i * 0.05} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Button href={site.resumeUrl} variant="primary" arrow>
                  <span className="inline-flex items-center gap-2">
                    <FileDown size={15} aria-hidden />
                    Download resume
                  </span>
                </Button>
                <Button href={`mailto:${site.email}`} variant="secondary">
                  <span className="inline-flex items-center gap-2">
                    <Mail size={15} aria-hidden />
                    {site.email}
                  </span>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  stat,
  delay,
}: {
  stat: { value: string; label: string };
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!inView || reduce) return;
    const match = stat.value.match(/^([\d.]+)/);
    if (!match) return;
    const end = parseFloat(match[1]);
    const suffix = stat.value.slice(match[1].length);
    const duration = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = end * eased;
      setDisplay(
        (val < 10 && end < 10 ? val.toFixed(1) : Math.round(val).toString()) + suffix,
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-4"
    >
      <div className="text-[clamp(1.4rem,3vw,1.9rem)] font-semibold tracking-[-0.02em] text-[var(--fg)]">
        {display}
      </div>
      <div className="mt-1 text-xs text-[var(--fg-muted)]">{stat.label}</div>
    </motion.div>
  );
}
