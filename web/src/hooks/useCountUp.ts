"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  /** ms to wait after the element enters the viewport before animating. */
  delay?: number;
};

export function useCountUp({ end, duration = 2000, suffix = "", prefix = "", delay = 0 }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let timer = 0;

    const begin = () => {
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();
          if (delay > 0) {
            timer = window.setTimeout(begin, delay);
          } else {
            begin();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration, delay]);

  return { count, ref, formatted: `${prefix}{count}${suffix}` };
}
