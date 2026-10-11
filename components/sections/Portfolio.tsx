"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
  type TouchEvent,
} from "react";
import { PORTFOLIO_SLIDES, PORTFOLIO_SUBTITLE, PORTFOLIO_TITLE } from "@/data/site";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

const TOTAL = PORTFOLIO_SLIDES.length;
const AUTOPLAY_MS = 4000;
const SWIPE_DISTANCE = 40;
const ZOOM_MIN_WIDTH = 768;
const ZOOM_MIN_SCALE = 1;
const ZOOM_MAX_SCALE = 1.4;

/** Estilo de cada slide conforme a distância ao slide central (efeito 3D). */
function slideStyle(index: number, current: number): CSSProperties {
  const half = Math.floor(TOTAL / 2);
  let offset = index - current;
  if (offset > half) offset -= TOTAL;
  if (offset < -half) offset += TOTAL;

  const isCenter = offset === 0;
  const isAdjacent = Math.abs(offset) === 1;
  const isVisible = Math.abs(offset) <= 2;

  return {
    transform: `translateX(${offset * 50}%) scale(${isCenter ? 1 : isAdjacent ? 0.8 : 0.65}) rotateY(${offset * -14}deg)`,
    zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
    opacity: isCenter ? 1 : isAdjacent ? 0.42 : 0,
    filter: isCenter ? "blur(0px)" : "blur(3px)",
    visibility: isVisible ? "visible" : "hidden",
    cursor: isCenter ? "default" : "pointer",
  };
}

/** Em telas largas, o carrossel cresce suavemente ao se aproximar do centro da tela. */
function useScrollZoom(ref: RefObject<HTMLElement | null>) {
  const update = useCallback(() => {
    const element = ref.current;
    if (!element || window.innerWidth < ZOOM_MIN_WIDTH) return;

    const rect = element.getBoundingClientRect();
    const viewport = window.innerHeight;
    const distance = Math.abs(rect.top + rect.height / 2 - viewport / 2);
    const progress = Math.max(0, Math.min(1, 1 - distance / (viewport * 0.85)));
    const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const scale = ZOOM_MIN_SCALE + eased * (ZOOM_MAX_SCALE - ZOOM_MIN_SCALE);

    element.style.transform = `scale(${scale.toFixed(4)})`;
  }, [ref]);

  useScrollEffect(update);
}

export function Portfolio() {
  const [current, setCurrent] = useState(Math.floor(TOTAL / 2));
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const touchX = useRef(0);

  useScrollZoom(wrapRef);

  const goTo = useCallback((index: number) => setCurrent(((index % TOTAL) + TOTAL) % TOTAL), []);
  const next = useCallback(() => setCurrent((value) => (value + 1) % TOTAL), []);
  const previous = useCallback(() => setCurrent((value) => (value - 1 + TOTAL) % TOTAL), []);

  // Autoplay; reinicia o relógio a cada troca (manual ou automática).
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, current, next]);

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const dx = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > SWIPE_DISTANCE) {
      if (dx < 0) next();
      else previous();
    }
  };

  return (
    <section
      id="portfolio"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lp-inner">
        <Reveal className="lp-header">
          <h2 className="lp-title">
            {PORTFOLIO_TITLE.before}
            <br />
            {PORTFOLIO_TITLE.middle}
            <span>{PORTFOLIO_TITLE.highlight}</span>
          </h2>
          <p className="lp-subtitle">{PORTFOLIO_SUBTITLE}</p>
        </Reveal>

        <div className="lp-carousel-wrap" ref={wrapRef}>
          <div
            className="lp-carousel-track"
            id="lpCarouselTrack"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
          >
            {PORTFOLIO_SLIDES.map((slide, index) => (
              <div
                key={slide.src}
                className="lp-slide"
                style={slideStyle(index, current)}
                onClick={() => goTo(index)}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  sizes="260px"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <button type="button" className="lp-nav-btn lp-nav-prev" aria-label="Anterior" onClick={previous}>
            <ChevronLeftIcon />
          </button>
          <button type="button" className="lp-nav-btn lp-nav-next" aria-label="Próximo" onClick={next}>
            <ChevronRightIcon />
          </button>
        </div>

        <div className="lp-dots">
          {PORTFOLIO_SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={cx("lp-dot", index === current && "lp-dot-active")}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === current}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        <Reveal className="lp-footer">
          <p className="lp-footer-text">Quer uma página assim para o seu negócio?</p>
          <a href="#contato" className="pgallery-btn">
            Quero uma Landing Page
            <ArrowRightIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
