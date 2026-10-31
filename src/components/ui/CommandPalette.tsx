"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { navLinks, site, projects } from "@/data/content";
import {
  ArrowRight,
  FileDown,
  Mail,
  Terminal,
  Award,
  Home,
  Code2,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("palette:open", onOpen);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        router.push("/" + href);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("http") || href.startsWith("mailto:")) {
      window.open(href, href.startsWith("http") ? "_blank" : "_self", "noopener");
    } else {
      router.push(href);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/95 shadow-2xl backdrop-blur-xl"
      >
        <Command label="Command menu" className="flex flex-col">
          <div className="border-b border-[var(--hairline)] px-4 py-3">
            <Command.Input
              autoFocus
              placeholder="Jump to a section, repo, or link…"
              className="w-full bg-transparent text-[15px] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-none"
            />
          </div>

          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--fg-subtle)]">
              No results.
            </Command.Empty>

            <Command.Group heading="Navigate" className="px-2 pb-2 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              <PaletteItem icon={<Home size={14} />} onSelect={() => go("/")}>
                Home
              </PaletteItem>
              {navLinks.map((link) => (
                <PaletteItem
                  key={link.href}
                  icon={<ArrowRight size={14} />}
                  onSelect={() => go(link.href)}
                >
                  {link.label}
                </PaletteItem>
              ))}
              <PaletteItem icon={<Terminal size={14} />} onSelect={() => go("/terminal")}>
                Terminal
              </PaletteItem>
              <PaletteItem icon={<Activity size={14} />} onSelect={() => go("/console")}>
                Observability Console
              </PaletteItem>
            </Command.Group>

            <Command.Group heading="Projects & Repositories" className="px-2 pb-2 pt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              {projects.map((p) => {
                const target = p.github || p.live || p.href || "#work";
                return (
                  <PaletteItem
                    key={p.name}
                    icon={p.github ? <GithubIcon size={14} /> : <Code2 size={14} />}
                    onSelect={() => go(target)}
                  >
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-[var(--fg)] font-medium">{p.name}</span>
                      <span className="mono text-[10px] text-[var(--fg-subtle)]">{p.tagline}</span>
                    </div>
                  </PaletteItem>
                );
              })}
            </Command.Group>

            <Command.Group heading="Actions" className="px-2 pb-2 pt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              <PaletteItem icon={<FileDown size={14} />} onSelect={() => go(site.resumeUrl)}>
                Download resume
              </PaletteItem>
              <PaletteItem icon={<Mail size={14} />} onSelect={() => go(`mailto:${site.email}`)}>
                Email me
              </PaletteItem>
              <PaletteItem icon={<Award size={14} />} onSelect={() => go("#credentials")}>
                View credentials
              </PaletteItem>
            </Command.Group>

            <Command.Group heading="Socials" className="px-2 pb-2 pt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
              <PaletteItem icon={<LinkedinIcon size={14} />} onSelect={() => go(site.socials.linkedin)}>
                LinkedIn
              </PaletteItem>
              <PaletteItem icon={<GithubIcon size={14} />} onSelect={() => go(site.socials.github)}>
                GitHub
              </PaletteItem>
              <PaletteItem icon={<ShieldCheck size={14} />} onSelect={() => go(site.socials.credly)}>
                Credly Verified Badges
              </PaletteItem>
              <PaletteItem icon={<InstagramIcon size={14} />} onSelect={() => go(site.socials.instagram)}>
                Instagram
              </PaletteItem>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-[var(--hairline)] px-4 py-2 text-[11px] text-[var(--fg-subtle)]">
            <span>Type to search</span>
            <span className="flex items-center gap-1">
              <kbd className="kbd">↵</kbd> to select
              <kbd className="kbd ml-2">esc</kbd> to close
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
}

function PaletteItem({
  icon,
  children,
  onSelect,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-[var(--fg-muted)] normal-case tracking-normal data-[selected=true]:bg-white/5 data-[selected=true]:text-[var(--fg)]"
    >
      <span className="text-[var(--fg-subtle)]" aria-hidden>
        {icon}
      </span>
      {children}
    </Command.Item>
  );
}
