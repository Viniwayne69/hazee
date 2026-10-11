"use client";

import { useCallback, useRef } from "react";
import { useScrollEffect } from "@/hooks/useScrollEffect";

/** Barra fina no topo que acompanha o progresso de rolagem da página. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${percent.toFixed(2)}%`;
  }, []);

  useScrollEffect(update);

  return <div id="scroll-progress" ref={barRef} aria-hidden="true" />;
}
