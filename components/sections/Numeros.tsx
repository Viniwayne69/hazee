"use client";

import { useCallback, useEffect, useState } from "react";
import { STATS } from "@/data/site";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/cx";

const COUNT_DURATION_MS = 1600;
const GLOW_DELAY_MS = 600;

type StatProps = (typeof STATS)[number];

function StatItem({ value, suffix, label }: StatProps) {
  const [setCountNode, countStarted] = useInViewOnce<HTMLSpanElement>(0.4);
  const [setGlowNode, glowStarted] = useInViewOnce<HTMLSpanElement>(0.6);
  const glow = useDelayedFlag(glowStarted, GLOW_DELAY_MS);
  const [display, setDisplay] = useState(0);

  const setRef = useCallback(
    (node: HTMLSpanElement | null) => {
      setCountNode(node);
      setGlowNode(node);
    },
    [setCountNode, setGlowNode],
  );

  // Contagem animada com easing "ease-out cubic".
  useEffect(() => {
    if (!countStarted) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(progress < 1 ? Math.floor(eased * value) : value);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [countStarted, value]);

  return (
    <Reveal className="numero-item">
      <div className="numero-val-wrap">
        <span ref={setRef} className={cx("numero-val", glow && "glow-animate")}>
          {display}
        </span>
        {suffix && <span className="numero-suffix">{suffix}</span>}
      </div>
      <span className="numero-label">{label}</span>
    </Reveal>
  );
}

export function Numeros() {
  return (
    <div id="numeros">
      {STATS.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}
