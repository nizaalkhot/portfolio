"use client";

import { cn } from "@/lib/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-black hover:shadow-[0_0_40px_-4px_var(--accent-glow)] hover:-translate-y-[1px] active:translate-y-0",
  secondary:
    "border border-[var(--hairline-strong)] bg-[var(--bg-elev)]/40 text-[var(--fg)] hover:bg-[var(--bg-elev)] hover:border-white/20",
  ghost:
    "text-[var(--fg-muted)] hover:text-[var(--fg)]",
};

type BaseProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

type Props = LinkButtonProps | NativeButtonProps;

export function Button(props: Props) {
  const { variant = "primary", arrow = false, className, children } = props;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );

  if ("href" in props && props.href) {
    const { href, arrow: _a, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _a; void _v; void _c; void _ch;
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(base, variants[variant], className)}
          {...(rest as ComponentProps<"a">)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
        {content}
      </Link>
    );
  }

  const { arrow: _a, variant: _v, className: _c, children: _ch, ...rest } = props as NativeButtonProps;
  void _a; void _v; void _c; void _ch;
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      {content}
    </button>
  );
}
