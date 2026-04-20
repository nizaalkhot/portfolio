import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
        404 — not found
      </span>
      <h1 className="text-[clamp(2rem,6vw,4rem)] font-semibold tracking-[-0.03em]">
        That route doesn&apos;t exist.
      </h1>
      <p className="max-w-md text-[var(--fg-muted)]">
        Try the <span className="mono text-[var(--fg)]">home</span> page or drop into{" "}
        <Link href="/terminal" className="mono text-[var(--accent)] hover:underline">
          /terminal
        </Link>
        .
      </p>
      <Link
        href="/"
        className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:shadow-[0_0_40px_-4px_var(--accent-glow)]"
      >
        Home
      </Link>
    </main>
  );
}
