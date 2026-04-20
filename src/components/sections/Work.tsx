"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Work() {
  const featured = projects.find((p) => p.kind === "featured");
  const rest = projects.filter((p) => p.kind !== "featured");

  return (
    <section
      id="work"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work"
          title="Shipped systems, not prototypes."
          description="Each project made it to production with measurable business impact."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {featured && <ProjectCard project={featured} className="md:col-span-12" featured />}
          {rest.map((p, i) => (
            <ProjectCard key={p.name} project={p} className="md:col-span-6 lg:col-span-4" index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  className,
  featured = false,
  index = 0,
}: {
  project: (typeof import("@/data/content"))["projects"][number];
  className?: string;
  featured?: boolean;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const Wrap = project.href ? "a" : "div";
  const wrapProps = project.href
    ? { href: project.href, target: "_blank" as const, rel: "noreferrer noopener" }
    : {};

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Wrap
        {...wrapProps}
        className={cn(
          "group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-6 transition-all",
          "hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elev)]/60",
          featured && "md:flex-row md:gap-10 md:p-8",
        )}
      >
        {featured && (
          <div className="relative md:w-1/2">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--hairline)] bg-gradient-to-br from-[var(--bg)] to-[var(--bg-elev-2)]">
              <FeaturedVisual />
            </div>
          </div>
        )}

        <div className={cn("flex flex-1 flex-col gap-4", featured && "justify-between")}>
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
              {project.kind === "featured" ? "featured" : "case"}
            </span>
            <ArrowUpRight
              size={16}
              className={cn(
                "text-[var(--fg-subtle)] transition-all duration-300",
                "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]",
              )}
              aria-hidden
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3
              className={cn(
                "font-semibold tracking-[-0.015em] text-[var(--fg)]",
                featured ? "text-2xl md:text-3xl" : "text-lg",
              )}
            >
              {project.name}
            </h3>
            <p className="mono text-[11px] text-[var(--fg-subtle)]">{project.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
            {project.description}
          </p>

          <ul className="mt-auto flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <li
                key={s}
                className="mono rounded-md border border-[var(--hairline-strong)] bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--fg-muted)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </motion.div>
  );
}

function FeaturedVisual() {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="fv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <pattern id="fv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#fv-grid)" />
      <rect width="400" height="250" fill="url(#fv-grad)" />

      {/* Agent nodes */}
      {[
        { x: 80, y: 90, label: "research" },
        { x: 200, y: 60, label: "analyst" },
        { x: 320, y: 110, label: "writer" },
        { x: 200, y: 180, label: "memory" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={28} fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="10" fill="var(--fg)">
            {n.label}
          </text>
        </g>
      ))}

      {/* Connectors */}
      <g stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeDasharray="3 4">
        <path d="M 108 85 L 172 65" />
        <path d="M 228 65 L 292 105" />
        <path d="M 320 138 L 228 175" />
        <path d="M 172 175 L 108 118" />
      </g>
    </svg>
  );
}
