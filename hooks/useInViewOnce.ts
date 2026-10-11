"use client";

import { useEffect, useState } from "react";

/**
 * Observa um elemento e retorna `true` assim que ele entra na viewport
 * (uma única vez). Use o primeiro item da tupla como `ref` do elemento.
 */
export function useInViewOnce<T extends Element = HTMLElement>(threshold = 0.1) {
  const [node, setNode] = useState<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!node || seen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, seen, threshold]);

  return [setNode, seen] as const;
}
