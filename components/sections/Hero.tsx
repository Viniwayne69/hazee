"use client";

import { getImageProps } from "next/image";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { HERO_SLIDES, HERO_TAGLINE } from "@/data/site";
import { useScrollEffect } from "@/hooks/useScrollEffect";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { cx } from "@/lib/cx";

const DESKTOP_MIN_WIDTH = 769;
const IMAGE_QUALITY = 85;

type HeroSlide = (typeof HERO_SLIDES)[number];

/** Fundo do slide: <picture> com imagens diferentes para desktop e mobile. */
function SlideBackground({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  const common = {
    alt: "",
    fill: true,
    sizes: "100vw",
    quality: IMAGE_QUALITY,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: slide.desktop });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: slide.mobile });

  return (
    <picture className="hero-slide-bg">
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <img {...imgProps} alt="" className="hero-slide-img" />
    </picture>
  );
}

/** `children` recebe a faixa de parceiros (renderizada no servidor). */
export function Hero({ children }: { children?: ReactNode }) {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax suave do texto/CTAs ao rolar (somente desktop).
  const parallax = useCallback(() => {
    const hero = heroRef.current;
    if (!hero || window.innerWidth < DESKTOP_MIN_WIDTH) return;
    const y = window.scrollY;
    if (y > window.innerHeight) return;
    hero.querySelectorAll<HTMLElement>(".hero-tagline").forEach((el) => {
      el.style.transform = `translateY(${y * 0.14}px)`;
    });
    hero.querySelectorAll<HTMLElement>(".hero-cta-wrap").forEach((el) => {
      el.style.transform = `translateY(${y * 0.18}px)`;
    });
  }, []);
  useScrollEffect(parallax);

  return (
    <section id="hero" ref={heroRef}>
      <div id="heroEtherealBg" aria-hidden="true">
        <svg width="0" height="0" style={{ position: "absolute", overflow: "visible" }}>
          <defs>
            <filter id="etherFilter" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence
                result="undulation"
                numOctaves="2"
                baseFrequency="0.0005,0.002"
                seed="0"
                type="turbulence"
              />
              <feColorMatrix id="etherHue" in="undulation" type="hueRotate" values="180" />
              <feColorMatrix
                in="dist"
                result="circulation"
                type="matrix"
                values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
              />
              <feDisplacementMap in="SourceGraphic" in2="circulation" scale="100" result="dist" />
              <feDisplacementMap in="dist" in2="undulation" scale="100" result="output" />
            </filter>
          </defs>
        </svg>
        <div id="etherDisplace">
          <div id="etherMask" />
        </div>
        <div id="etherNoise" />
      </div>

      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          id={`slide-${slide.id}`}
          className={cx("hero-slide", index === current && "active")}
        >
          <SlideBackground slide={slide} priority={index === 0} />
          <div className="hero-content">
            {index === 0 ? (
              <h1 className="hero-tagline">{HERO_TAGLINE}</h1>
            ) : (
              <p className="hero-tagline">{HERO_TAGLINE}</p>
            )}
            <div className="hero-cta-wrap">
              <MagneticLink className="hero-cta primary" href="#servicos">
                Conhecer as soluções
              </MagneticLink>
              <MagneticLink className="hero-cta ghost" href="#spline-section">
                Falar com a HAZE
              </MagneticLink>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-dots" role="tablist" aria-label="Slides do destaque">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={index === current}
            aria-label={`Slide ${index + 1}`}
            className={cx("hero-dot", index === current && "active")}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      {children}
    </section>
  );
}
