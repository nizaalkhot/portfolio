"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, education, publications, site, type Certification } from "@/data/content";
import { Award, GraduationCap, ArrowUpRight, BookOpen, ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

type CredentialCategory = "All" | "Cloud & AI" | "Data & Deep Learning" | "Research & Education";

export function Credentials() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<CredentialCategory>("All");

  const totalCount = certifications.length + publications.length + education.length;

  const showCloudAI = activeCategory === "All" || activeCategory === "Cloud & AI";
  const showDataDL = activeCategory === "All" || activeCategory === "Data & Deep Learning";
  const showResearchEdu = activeCategory === "All" || activeCategory === "Research & Education";

  const cloudAICerts = certifications.filter((c) => c.category === "Cloud & AI");
  const dataDLCerts = certifications.filter((c) => c.category === "Data & Deep Learning");

  return (
    <section
      id="credentials"
      className="relative border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            eyebrow="Accreditations & Research"
            title="Certified. Published. Shipping."
            description="Tier-1 Cloud & AI certifications across AWS, Microsoft, Google Cloud, and IBM alongside peer-reviewed academic research."
          />

          <a
            href={site.socials.credly}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-xs font-semibold mono text-[var(--accent)] transition-all hover:bg-[var(--accent)]/20 hover:border-[var(--accent)] shrink-0 self-start md:self-auto"
          >
            <ShieldCheck size={14} />
            <span>Verify on Credly</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {(["All", "Cloud & AI", "Data & Deep Learning", "Research & Education"] as CredentialCategory[]).map(
            (cat) => {
              const count =
                cat === "All"
                  ? totalCount
                  : cat === "Cloud & AI"
                    ? cloudAICerts.length
                    : cat === "Data & Deep Learning"
                      ? dataDLCerts.length
                      : publications.length + education.length;

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
                      isActive
                        ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                        : "bg-[var(--bg-elev-2)] text-[var(--fg-subtle)]"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Credentials Grid */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Cloud & AI Certifications */}
          {showCloudAI &&
            cloudAICerts.map((c, i) => (
              <CertificationCard key={c.name} cert={c} index={i} reduce={reduce} />
            ))}

          {/* Data & Deep Learning Certifications */}
          {showDataDL &&
            dataDLCerts.map((c, i) => (
              <CertificationCard
                key={c.name}
                cert={c}
                index={i + cloudAICerts.length}
                reduce={reduce}
              />
            ))}

          {/* Peer-Reviewed Publication */}
          {showResearchEdu &&
            publications.map((p, i) => (
              <motion.div
                key={p.title}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col justify-between gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5 transition-colors hover:border-[var(--accent)]/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]">
                    <BookOpen size={20} aria-hidden />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                        Peer-Reviewed Research Paper
                      </span>
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[var(--fg-subtle)] transition-colors hover:text-[var(--accent)]"
                          aria-label={`Open paper ${p.title}`}
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[var(--fg)] mt-1">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--fg-muted)]">
                      {p.journal} · {p.volume}
                    </p>
                    <p className="mt-2 text-xs text-[var(--fg-subtle)] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--hairline)] pt-3 mono text-[10px] text-[var(--fg-subtle)]">
                  <span>Authors: {p.authors.join(", ")}</span>
                  <span>{p.year}</span>
                </div>
              </motion.div>
            ))}

          {/* Education Card */}
          {showResearchEdu &&
            education.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i + 1) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline-strong)] bg-[var(--bg)] text-[var(--fg-muted)]">
                    <GraduationCap size={20} aria-hidden />
                  </div>
                  <div className="flex-1">
                    <span className="mono text-[10px] uppercase tracking-wider text-[var(--fg-subtle)]">
                      Verified Academic Degree
                    </span>
                    <h3 className="text-base font-semibold text-[var(--fg)] mt-1">
                      {e.degree}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--fg-muted)]">
                      {e.institution} · {e.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--hairline)] pt-3 mono text-[11px]">
                  <span className="text-[var(--accent)] font-semibold">{e.grade}</span>
                  <span className="text-[var(--fg-subtle)]">Graduated {e.year}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

function CertificationCard({
  cert,
  index,
  reduce,
}: {
  cert: Certification;
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.a
      href={cert.href}
      target="_blank"
      rel="noreferrer noopener"
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4 rounded-2xl border border-[var(--hairline)] bg-[var(--bg-elev)]/40 p-5 transition-all duration-300 hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elev)]/60"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--hairline-strong)] bg-[var(--bg)] overflow-hidden p-1">
        {cert.badgeUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cert.badgeUrl}
            alt={cert.name}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <Award size={20} className="text-[var(--accent)]" aria-hidden />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <span className="mono text-[10px] text-[var(--accent)] font-semibold uppercase tracking-wider">
            {cert.issuer}
          </span>
          <ArrowUpRight
            size={14}
            className="text-[var(--fg-subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)] shrink-0"
            aria-hidden
          />
        </div>

        <h3 className="text-sm font-semibold text-[var(--fg)] mt-0.5 leading-snug">
          {cert.name}
        </h3>

        <div className="mt-2 flex items-center justify-between text-[10px] mono text-[var(--fg-subtle)]">
          <span>{cert.category}</span>
          <span className="text-[var(--accent)] opacity-80 group-hover:opacity-100">
            credly.com ↗
          </span>
        </div>
      </div>
    </motion.a>
  );
}
