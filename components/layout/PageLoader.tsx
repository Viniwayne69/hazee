"use client";

import { useEffect, useState } from "react";
import { cx } from "@/lib/cx";

const LOADER_DURATION_MS = 1200;

/** Tela de abertura com a marca. Some após ~1,2s (e via CSS caso o JS falhe). */
export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), LOADER_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div id="page-loader" className={cx(done && "done")} aria-hidden="true">
      <div className="loader-inner">
        <span className="loader-brand">HAZE</span>
        <div className="loader-progress">
          <div className="loader-progress-bar" />
        </div>
        <span className="loader-tagline">Marcas feitas para permanecer</span>
      </div>
    </div>
  );
}
