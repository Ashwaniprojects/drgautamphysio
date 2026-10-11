"use client";

import { useEffect, useRef } from "react";

type RevealOptions = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export function ScrollReveal({ children, className, threshold, rootMargin, once }: RevealOptions) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

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
      { threshold: threshold ?? 0.12, rootMargin: rootMargin ?? "0px 0px -30px 0px" }
    );

    const targets: Element[] = [];
    if (root.classList.contains("reveal")) targets.push(root);
    root.querySelectorAll(".reveal").forEach((el) => targets.push(el));
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [String(threshold), String(rootMargin), String(once)]);

  return <div ref={rootRef} className={className ?? ""}>{children}</div>;
}
