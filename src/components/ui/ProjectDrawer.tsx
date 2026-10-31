"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Globe, Layers, Cpu, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { type Project } from "@/data/content";
import { ARCHITECTURE_DETAILS } from "@/data/architectures";

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const details = project ? ARCHITECTURE_DETAILS[project.name] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="drawer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          onClick={onClose}
        >
          <motion.div
            ref={drawerRef}
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-full max-h-screen w-full max-w-2xl flex-col min-h-0 border-l border-[var(--hairline-strong)] bg-[#090a0d] shadow-2xl overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex shrink-0 items-center justify-between border-b border-[var(--hairline)] px-6 py-5 bg-[#090a0d] z-10">
              <div className="flex items-center gap-2.5">
                <span className="mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
                  {project.category}
                </span>
                <span className="text-[var(--fg-subtle)] text-xs mono">
                  system architecture spec
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-[var(--fg-subtle)] transition-colors hover:bg-[var(--bg-elev)] hover:text-[var(--fg)]"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-6 space-y-8 select-text"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Title & Tagline */}
              <div>
                <h2
                  id="drawer-title"
                  className="text-2xl font-bold tracking-tight text-[var(--fg)] md:text-3xl"
                >
                  {project.name}
                </h2>
                <p className="mt-1.5 mono text-xs text-[var(--accent)]">
                  {project.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {details?.overview || project.description}
                </p>
              </div>

              {/* Quick Action Links */}
              <div className="flex flex-wrap items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3.5 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    <GithubIcon size={14} />
                    <span>View Repository</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--hairline-strong)] bg-[var(--bg-elev)] px-3.5 py-2 text-xs font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  >
                    <Globe size={14} />
                    <span>Live Deployment</span>
                    <ArrowUpRight size={13} />
                  </a>
                )}
              </div>

              {/* Metrics Grid */}
              {details?.metrics && (
                <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/50 p-4">
                  <span className="mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block mb-3">
                    Production Telemetry & Impact
                  </span>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {details.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-lg font-bold mono text-[var(--accent)]">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-[var(--fg-subtle)] mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Flow Timeline */}
              {details?.flowSteps && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={15} className="text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--fg)]">
                      Execution Graph & Dataflow
                    </h3>
                  </div>
                  <div className="space-y-2 border-l border-[var(--hairline-strong)] ml-2 pl-4">
                    {details.flowSteps.map((s, idx) => (
                      <div key={idx} className="relative pb-3">
                        <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-[var(--accent)]" />
                        <div className="flex items-center gap-2">
                          <span className="mono text-[11px] font-bold text-[var(--fg)]">
                            {s.step} · {s.actor}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--fg-muted)] mt-0.5 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Decisions & Trade-Offs */}
              {details?.decisions && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Cpu size={15} className="text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--fg)]">
                      Key Architectural Decisions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {details.decisions.map((d, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-4"
                      >
                        <h4 className="text-xs font-semibold text-[var(--fg)]">
                          {d.question}
                        </h4>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="mono text-[10px] text-[var(--accent)] bg-[var(--accent)]/15 px-2 py-0.5 rounded">
                            Choice: {d.choice}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-[var(--fg-muted)]">
                          {d.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Extract */}
              {details?.codeSnippet && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code2 size={15} className="text-[var(--accent)]" />
                      <h3 className="text-sm font-semibold text-[var(--fg)]">
                        Production Code Extract
                      </h3>
                    </div>
                    <span className="mono text-[10px] text-[var(--fg-subtle)]">
                      {details.codeSnippet.filename}
                    </span>
                  </div>
                  <pre className="overflow-x-auto rounded-xl border border-[var(--hairline-strong)] bg-[#040405] p-4 text-[12px] mono text-[var(--fg-muted)] leading-relaxed">
                    <code>{details.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="pb-6">
                <span className="mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)] block mb-2">
                  Technologies & Tools
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li
                      key={s}
                      className="mono rounded-md border border-[var(--hairline-strong)] bg-[var(--bg-elev)] px-2.5 py-1 text-xs text-[var(--fg)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
