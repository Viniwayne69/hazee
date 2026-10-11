"use client";

import { useEffect } from "react";

/**
 * Executa `handler` no scroll (throttled por rAF) e uma vez na montagem.
 * Não causa re-render: o handler deve mexer no DOM diretamente.
 */
export function useScrollEffect(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        handler();
      });
    };

    handler();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [handler, enabled]);
}
