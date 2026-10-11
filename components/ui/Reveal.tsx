"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cx } from "@/lib/cx";

type RevealProps = {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Anima a entrada do bloco (classe `.reveal` → `.reveal.visible`). */
export function Reveal({ as: Tag = "div", className, style, children }: RevealProps) {
  const [ref, visible] = useInViewOnce<HTMLElement>(0.12);

  return (
    <Tag ref={ref} className={cx(className, "reveal", visible && "visible")} style={style}>
      {children}
    </Tag>
  );
}
