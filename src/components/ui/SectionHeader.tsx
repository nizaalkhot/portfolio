import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, description, className, align = "left" }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          <span className="text-[var(--fg-subtle)]">— </span>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-[22ch] text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="max-w-[56ch] text-[var(--fg-muted)] leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
