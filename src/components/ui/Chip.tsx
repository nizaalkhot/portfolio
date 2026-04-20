import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent";
};

export function Chip({ children, className, tone = "default" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-tight transition-colors",
        tone === "default"
          ? "border-[var(--hairline-strong)] bg-[var(--bg-elev)]/60 text-[var(--fg-muted)]"
          : "border-[var(--accent)]/40 bg-[var(--accent)]/5 text-[var(--accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
