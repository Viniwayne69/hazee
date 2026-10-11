"use client";

import { VALUES } from "@/data/site";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { ValueIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

const STAGGER_MS = 90;

type ValueItemProps = (typeof VALUES)[number] & {
  index: number;
  revealed: boolean;
  setRef?: (node: HTMLDivElement | null) => void;
};

function ValueItem({ index, revealed, setRef, icon, title, description }: ValueItemProps) {
  const visible = useDelayedFlag(revealed, index * STAGGER_MS);

  return (
    <div
      ref={setRef}
      className="value-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1), background 0.35s ease",
      }}
    >
      <ValueIcon id={icon} />
      <p className="value-title">{title}</p>
      <p className="value-desc">{description}</p>
    </div>
  );
}

export function Valores() {
  const [setFirstItem, revealed] = useInViewOnce<HTMLDivElement>(0.1);

  return (
    <section id="valores">
      <Reveal as="span" className="section-label">
        Por que a HAZE
      </Reveal>
      <Reveal className="values-grid">
        {VALUES.map((value, index) => (
          <ValueItem
            key={value.title}
            {...value}
            index={index}
            revealed={revealed}
            setRef={index === 0 ? setFirstItem : undefined}
          />
        ))}
      </Reveal>
    </section>
  );
}
