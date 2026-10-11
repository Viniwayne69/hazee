"use client";

import { useEffect, useState } from "react";

/** Vira `true` depois de `delayMs` quando `trigger` fica verdadeiro. */
export function useDelayedFlag(trigger: boolean, delayMs: number) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    const timer = window.setTimeout(() => setOn(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [trigger, delayMs]);

  return on;
}
