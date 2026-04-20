"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/content";
import { Mail } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Contact() {
  const reduce = useReducedMotion();

  const socials = [
    { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", href: site.socials.github, Icon: GithubIcon },
    { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
    { label: "HackerRank", href: site.socials.hackerrank, Icon: HackerRankIcon },
  ] as const;

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[var(--hairline)] py-24 md:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 100%, rgba(0,255,136,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build autonomy."
          description="Open to senior AI engineer roles, agentic consulting, and research collaborations."
        />

        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-8 text-center"
        >
          <Link
            href={`mailto:${site.email}`}
            className="group relative inline-block text-[clamp(1.8rem,7vw,5rem)] font-semibold leading-[1] tracking-[-0.035em] text-[var(--fg)] break-all"
          >
            <span className="relative">
              {site.email}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
            </span>
          </Link>

          <p className="mono max-w-md text-xs text-[var(--fg-subtle)]">
            Based in {site.location} · Available worldwide (remote & hybrid) · {site.phone}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3">
            <SocialBtn href={`mailto:${site.email}`} label="Email" Icon={Mail} />
            {socials.map((s) => (
              <SocialBtn key={s.label} href={s.href} label={s.label} Icon={s.Icon} />
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function SocialBtn({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean; className?: string }>;
}) {
  const isExternal = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        className="group flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/50 text-[var(--fg-muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-[var(--bg-elev)] hover:text-[var(--accent)]"
        aria-label={label}
        title={label}
      >
        <Icon size={16} aria-hidden />
      </a>
    </li>
  );
}

function HackerRankIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3 17v-4.5H9V17H7V7h2v3.5h6V7h2v10h-2z" />
    </svg>
  );
}
