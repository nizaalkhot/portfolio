"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/data/content";
import { ArrowUpRight, Globe, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectDrawer } from "@/components/ui/ProjectDrawer";
import { cn } from "@/lib/cn";

const CATEGORIES = ["All", "Agentic Systems", "Benchmarks & DevTools", "Production AI"] as const;
type Category = (typeof CATEGORIES)[number];

export function Work() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const featured = activeCategory === "All" ? filteredProjects.find((p) => p.kind === "featured") : undefined;
  const list = activeCategory === "All" ? filteredProjects.filter((p) => p.kind !== "featured") : filteredProjects;

  return (
    <section
      id="work"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected Work & Repositories"
          title="Shipped systems & open-source tools."
          description="Autonomous multi-agent ecosystems, adversarial benchmarks, and production enterprise deployments."
        />

        {/* Category Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200",
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "border-[var(--hairline-strong)] bg-[var(--bg-elev)]/50 text-[var(--fg-muted)] hover:border-[var(--hairline)] hover:text-[var(--fg)]"
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "mono text-[10px] px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-[var(--accent)]/20 text-[var(--accent)]" : "bg-[var(--bg-elev-2)] text-[var(--fg-subtle)]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {featured && (
            <ProjectCard
              project={featured}
              className="md:col-span-12"
              featured
              onInspect={setInspectedProject}
            />
          )}
          {list.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              className="md:col-span-6 lg:col-span-4"
              index={i + (featured ? 1 : 0)}
              onInspect={setInspectedProject}
            />
          ))}
        </div>
      </div>

      {/* System Architecture Blueprint Slide-Over Drawer */}
      <ProjectDrawer
        project={inspectedProject}
        onClose={() => setInspectedProject(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  className,
  featured = false,
  index = 0,
  onInspect,
}: {
  project: Project;
  className?: string;
  featured?: boolean;
  index?: number;
  onInspect: (p: Project) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-6 transition-all duration-300",
          "hover:border-[var(--accent)]/30 hover:bg-[var(--bg-elev)]/60",
          featured && "md:flex-row md:gap-10 md:p-8"
        )}
      >
        {featured && (
          <div className="relative md:w-1/2">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--hairline)] bg-gradient-to-br from-[var(--bg)] to-[var(--bg-elev-2)]">
              <DrishtiVisual />
            </div>
          </div>
        )}

        <div className={cn("flex flex-1 flex-col gap-4", featured && "justify-between")}>
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)] font-semibold">
              {project.badge || (project.kind === "featured" ? "flagship" : project.kind === "opensource" ? "open source" : "case study")}
            </span>
            <div className="flex items-center gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-subtle)] transition-colors hover:text-[var(--accent)]"
                  title="Live Deployment"
                  aria-label={`Live Deployment for ${project.name}`}
                >
                  <Globe size={15} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-subtle)] transition-colors hover:text-[var(--accent)]"
                  title="GitHub Repository"
                  aria-label={`GitHub Repository for ${project.name}`}
                >
                  <GithubIcon size={15} />
                </a>
              )}
              {!project.github && project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[var(--fg-subtle)] transition-colors hover:text-[var(--accent)]"
                  title="Open Link"
                  aria-label={`Open link for ${project.name}`}
                >
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <h3
              className={cn(
                "font-semibold tracking-[-0.015em] text-[var(--fg)]",
                featured ? "text-2xl md:text-3xl" : "text-lg"
              )}
            >
              {project.name}
            </h3>
            <p className="mono text-[11px] text-[var(--fg-subtle)]">{project.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-[var(--fg-muted)]">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((s) => (
              <li
                key={s}
                className="mono rounded-md border border-[var(--hairline-strong)] bg-[var(--bg)] px-2 py-0.5 text-[10px] text-[var(--fg-muted)]"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline)] pt-4">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs mono font-medium text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                >
                  <GithubIcon size={13} />
                  <span>Repo</span>
                  <ArrowUpRight size={12} className="opacity-70" />
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs mono font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
                >
                  <Globe size={13} />
                  <span>Demo</span>
                  <ArrowUpRight size={12} />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-1.5 text-xs mono text-[var(--accent)] transition-opacity hover:opacity-85 font-semibold"
            >
              <Layers size={13} />
              <span>Architecture Spec →</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DrishtiVisual() {
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

      {/* Drishti Agentic Security Nodes */}
      {[
        { x: 80, y: 80, label: "apk_eval" },
        { x: 200, y: 55, label: "google_adk" },
        { x: 320, y: 95, label: "mule_graph" },
        { x: 140, y: 175, label: "interceptor" },
        { x: 270, y: 175, label: "fiu_rails" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={28} fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9.5" fill="var(--fg)">
            {n.label}
          </text>
        </g>
      ))}

      {/* Connectors */}
      <g stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeDasharray="3 4">
        <path d="M 108 75 L 172 60" />
        <path d="M 228 60 L 292 90" />
        <path d="M 310 120 L 280 150" />
        <path d="M 242 175 L 168 175" />
        <path d="M 120 152 L 95 106" />
        <path d="M 195 83 L 150 150" />
        <path d="M 205 83 L 260 150" />
      </g>
    </svg>
  );
}
