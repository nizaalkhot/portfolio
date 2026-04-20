"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks, site } from "@/data/content";
import { cn } from "@/lib/cn";
import { Search } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Detect platform once post-mount to keep SSR markup stable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iP(hone|ad|od)/.test(navigator.platform));
  }, []);

  const modKey = isMac === null ? "⌘" : isMac ? "⌘" : "Ctrl";

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("palette:open"));
  };

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
        scrolled ? "pt-2" : "pt-4",
      )}
    >
      <nav
        className={cn(
          "flex items-center gap-1 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/80 px-2 py-1.5 backdrop-blur-xl transition-all duration-300",
          scrolled ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]" : "",
        )}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium tracking-tight text-[var(--fg)] hover:bg-white/5"
          aria-label="Home"
        >
          <span
            className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[10px] font-mono text-[var(--accent)]"
            aria-hidden
          >
            N
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <ul className="hidden items-center md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-[var(--fg-muted)] transition-colors hover:bg-white/5 hover:text-[var(--fg)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openPalette}
          className="ml-1 inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/60 px-3 py-1.5 text-xs text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          aria-label="Open command palette"
        >
          <Search size={12} aria-hidden />
          <span className="hidden sm:inline">Search</span>
          <kbd className="kbd" aria-hidden suppressHydrationWarning>{modKey} K</kbd>
        </button>
      </nav>
    </motion.header>
  );
}
