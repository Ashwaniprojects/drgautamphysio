"use client";

import { useEffect, useRef, useCallback } from "react";

export function useReveal(options: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { threshold = 0.12, rootMargin = "0px 0px -30px 0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealSelector = ".reveal, .reveal-left, .reveal-right, .reveal-scale";
    const targets = [el, ...Array.from(el.querySelectorAll(revealSelector))];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}
