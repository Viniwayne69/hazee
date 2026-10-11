"use client";

import { useCallback } from "react";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { cx } from "@/lib/cx";

const UNDERLINE_DELAY_MS = 400;

function ManifestoQuote() {
  const [setRevealNode, revealed] = useInViewOnce<HTMLParagraphElement>(0.12);
  const [setUnderlineNode, underlineSeen] = useInViewOnce<HTMLParagraphElement>(0.5);
  const underlined = useDelayedFlag(underlineSeen, UNDERLINE_DELAY_MS);

  const setRef = useCallback(
    (node: HTMLParagraphElement | null) => {
      setRevealNode(node);
      setUnderlineNode(node);
    },
    [setRevealNode, setUnderlineNode],
  );

  return (
    <p
      ref={setRef}
      className={cx("manifesto-quote", "reveal", revealed && "visible", underlined && "underline-active")}
    >
      <span className="manifesto-dim">Marcas não são logotipos,</span> são a soma de cada vez que
      uma pessoa <span className="highlight-word">pensa em você</span>,{" "}
      <span className="manifesto-dim">
        e o que ela <span className="highlight-word">sente</span> nesse momento.
      </span>
    </p>
  );
}

export function Manifesto() {
  const [setSourceRef, sourceVisible] = useInViewOnce<HTMLParagraphElement>(0.12);

  return (
    <section id="manifesto" className="section-light">
      <div className="manifesto-inner">
        <ManifestoQuote />
        <p ref={setSourceRef} className={cx("manifesto-source", "reveal", sourceVisible && "visible")}>
          HAZE &nbsp;&nbsp; Manifesto
        </p>
      </div>
    </section>
  );
}
