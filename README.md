# Nizaal Khot — Portfolio

Production-grade personal site positioning as a senior AI Engineer working on **Agentic AI, Multi-Agent Systems, MCP, Generative AI, and Vibe Coding**.

Built with Next.js 15 App Router, TypeScript (strict), Tailwind CSS v4, Framer Motion, Lenis, and cmdk.

---

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Production:

```bash
pnpm build
pnpm start
```

---

## Architecture

```
src/
  app/                   # App Router routes
    page.tsx             # Home (all sections composed)
    terminal/            # /terminal retro terminal route
    console/             # /console easter-egg
    opengraph-image.tsx  # Dynamic 1200×630 OG image
    sitemap.ts           # /sitemap.xml
    robots.ts            # /robots.txt
    layout.tsx           # Root layout + metadata + JSON-LD Person
    globals.css          # Design system tokens
  components/
    sections/            # One file per page section
    agents/              # Multi-agent graph SVG components
    ui/                  # Primitives: Button, Chip, Nav, Footer, etc.
  data/
    content.ts           # ALL copy, skills, experience, projects
  lib/
    cn.ts                # Tailwind className merger
```

## Editing content

All copy lives in one place: [`src/data/content.ts`](./src/data/content.ts).

- `site` — name, role, pitch, email, socials, URL
- `stats` — hero/about metric tiles
- `tickerTech` — marquee under hero
- `capabilities` — the six capability cards
- `skillGroups` — expertise grid
- `experience` — timeline roles (array order = display order, newest first)
- `projects` — work grid (set `kind: "featured"` on the anchor)
- `certifications`, `education` — credentials section
- `navLinks` — nav menu

Update `site.url` to your real domain before deploying (affects SEO + sitemap + OG).

## Resume file

Drop your PDF at `public/resume.pdf`. The About section and Command Palette link to `/resume.pdf`.

## Deploy (Vercel)

1. Push to a GitHub repo.
2. Import into Vercel (no config — it auto-detects Next.js 15).
3. Set the production domain.
4. Update `site.url` in `data/content.ts` to the final URL.
5. OG image, sitemap, and robots regenerate on each deploy.

## Design system

CSS variables in `globals.css`:

- **Colors** — `--bg`, `--fg`, `--accent` (electric green `#00FF88`), hairlines, status chips
- **Type scale** — `--step-0` … `--step-7` (12/14/16/20/28/40/64/96)
- **Spacing** — `--space-1` … `--space-32`
- **Motion** — `--ease-out`, `--ease-in-out`, `--ease-spring`, `--dur-fast/mid/slow`

Fonts loaded via `next/font/google`: Geist Sans + Geist Mono.

## Interactions

- `⌘K` / `Ctrl+K` — Command palette (cmdk)
- `/terminal` — Retro terminal: `help`, `whoami`, `ls experience`, `cat resume.txt`, `open github`, `contact`, `clear`
- `/console` — Hidden easter-egg page (linked in footer, `noindex`)
- Lenis smooth scroll (respects `prefers-reduced-motion`)
- Scroll-triggered metric counters in About
- Looping marquee tech ticker in hero
- Animated multi-agent SVG graph (hero + playground)

## Accessibility

- Semantic HTML (single `h1`, sectioning elements, `main#main` skip link)
- Visible focus rings everywhere (`:focus-visible`)
- `prefers-reduced-motion` respected (Framer Motion `useReducedMotion`, CSS fallback)
- ARIA labels on icon-only buttons and the agent graph
- Color contrast meets WCAG AA on all text surfaces

## License

Personal portfolio — content © Nizaal Khot. Code MIT-licensed if you want to learn from it.
