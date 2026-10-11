"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

const STRENGTH = 0.32;
const DESKTOP_MIN_WIDTH = 769;

/** Link que "puxa" levemente em direção ao cursor (somente desktop). */
export function MagneticLink({
  onMouseMove,
  onMouseLeave,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseMove?.(event);
    if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * STRENGTH;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * STRENGTH;
    element.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseLeave?.(event);
    event.currentTarget.style.transform = "";
  };

  return <a {...props} onMouseMove={handleMove} onMouseLeave={handleLeave} />;
}
