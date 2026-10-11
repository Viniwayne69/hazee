import { MARQUEE_BOTTOM, MARQUEE_TOP } from "@/data/site";
import { cx } from "@/lib/cx";

type MarqueeRowProps = {
  items: readonly string[];
  reverse?: boolean;
};

/** Faixa de palavras em rolagem infinita (a lista é repetida para o loop). */
function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  return (
    <div className={cx("marquee-section", reverse && "marquee-reverse")} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) =>
          items.map((label) => (
            <span key={`${copy}-${label}`} className="marquee-item">
              {label} <span className="marquee-dot" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <>
      <MarqueeRow items={MARQUEE_TOP} />
      <MarqueeRow items={MARQUEE_BOTTOM} reverse />
    </>
  );
}
