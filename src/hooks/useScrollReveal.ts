"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(
  selector: string,
  motionReadyClass: string,
  visibleClass: string,
) {
  const pageRef = useRef<T>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const targets = page.querySelectorAll<HTMLElement>(selector);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof window.IntersectionObserver !== "function") {
      targets.forEach((target) => target.classList.add(visibleClass));
      return;
    }

    page.classList.add(motionReadyClass);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [motionReadyClass, selector, visibleClass]);

  return pageRef;
}
