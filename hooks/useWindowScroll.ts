"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback, { passive: true });
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

/**
 * Lê um valor derivado da posição de scroll/viewport e re-renderiza apenas
 * quando o valor retornado muda (ex.: um booleano).
 */
export function useWindowScroll<T extends boolean | number | string>(
  select: () => T,
  serverValue: T,
): T {
  return useSyncExternalStore(subscribe, select, () => serverValue);
}
