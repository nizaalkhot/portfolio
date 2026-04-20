"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let lenisInstance: { raf: (t: number) => void; destroy: () => void } | null = null;

    (async () => {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  return null;
}
