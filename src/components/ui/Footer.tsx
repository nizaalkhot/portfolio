import Link from "next/link";
import { site } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3 text-xs text-[var(--fg-subtle)]">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span aria-hidden>·</span>
          <span className="mono">Built with Next.js + Claude Code</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-[var(--fg-subtle)]">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-[var(--fg)]"
          >
            {site.email}
          </a>
          <span aria-hidden>·</span>
          <Link
            href="/terminal"
            className="mono transition-colors hover:text-[var(--accent)]"
            aria-label="Terminal mode"
          >
            /terminal
          </Link>
          <Link
            href="/console"
            className="mono transition-colors hover:text-[var(--accent)]"
            aria-label="Console easter egg"
          >
            /console
          </Link>
        </div>
      </div>
    </footer>
  );
}
