"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site, tickerTech } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { AgentGraph } from "@/components/agents/AgentGraph";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-28 md:pt-40"
      aria-label="Introduction"
    >
      <div className="hero-glow" aria-hidden />
      <div className="grain" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Status line */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/60 px-3 py-1 text-xs text-[var(--fg-muted)] backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="mono">available for senior AI engineer roles</span>
        </motion.div>

        <motion.h1
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[18ch] text-[clamp(2.5rem,6.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--fg)]"
        >
          I build <span className="text-gradient-accent">autonomous AI</span> systems that replace manual work
          <span className="text-[var(--fg-subtle)]">—</span> not decks.
        </motion.h1>

        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-[52ch] text-[var(--fg-muted)] md:text-lg"
        >
          {site.name} · {site.role} specializing in <span className="mono text-[var(--fg)]">Agentic AI</span>,{" "}
          <span className="mono text-[var(--fg)]">MCP</span>, and{" "}
          <span className="mono text-[var(--fg)]">Multi-Agent</span> systems. Shipping production autonomy at enterprise scale.
        </motion.p>

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Button href="#work" variant="primary" arrow>
            See Work
          </Button>
          <Button href="#contact" variant="secondary">
            Get in Touch
          </Button>
        </motion.div>

        {/* Agent graph */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 rounded-2xl border border-[var(--hairline)] bg-gradient-to-b from-[var(--bg-elev)]/40 to-transparent p-4 sm:p-6"
        >
          <div className="mb-4 flex items-center justify-between text-[11px] text-[var(--fg-subtle)]">
            <span className="mono">graph.ts · multi-agent orchestration</span>
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="mono">live</span>
            </div>
          </div>
          <AgentGraph />
        </motion.div>
      </div>

      {/* Tech ticker */}
      <div
        className="relative z-10 mt-20 border-y border-[var(--hairline)] bg-[var(--bg-elev)]/30"
        aria-label="Technologies I work with"
      >
        <div className="no-scrollbar overflow-hidden py-5">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
            {[...tickerTech, ...tickerTech].map((t, i) => (
              <div
                key={`${t}-${i}`}
                className="flex items-center gap-10 text-sm text-[var(--fg-muted)]"
              >
                <span className="mono tracking-tight">{t}</span>
                <span className="text-[var(--fg-subtle)]" aria-hidden>
                  ◆
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
