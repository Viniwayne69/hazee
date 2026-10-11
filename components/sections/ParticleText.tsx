"use client";

import { useEffect, useRef } from "react";
import { PARTICLE_WORDS_DESKTOP, PARTICLE_WORDS_MOBILE } from "@/data/site";
import { ParticleText as ParticleEngine } from "@/lib/particle-text";

const MOBILE_MAX_WIDTH = 768;

/**
 * Seção com palavras formadas por partículas (canvas).
 * No mobile, um ciclo de palavras em CSS substitui o canvas.
 */
export function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let engine: ParticleEngine | null = null;
    let cancelled = false;
    let visible = false;

    const isDesktop = () => window.innerWidth > MOBILE_MAX_WIDTH;

    // Pausa a animação fora da tela para economizar CPU/GPU.
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        engine?.setVisible(visible);
      },
      { threshold: 0.05 },
    );
    observer.observe(section);

    // O next/font renomeia a família; lemos o valor já resolvido pelo CSS.
    const fontFamily =
      getComputedStyle(canvas).getPropertyValue("--font-display").trim() ||
      "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif";

    // Só amostra os pixels depois que a fonte estiver carregada.
    const fontReady = document.fonts.load(`900 120px ${fontFamily}`, "HAZE").catch(() => undefined);

    // Liga o canvas no desktop e desliga no mobile (onde um ciclo CSS o substitui).
    const sync = () => {
      if (!isDesktop()) {
        engine?.destroy();
        engine = null;
        return;
      }
      if (engine) {
        engine.resize();
        return;
      }
      fontReady.then(() => {
        if (cancelled || engine || !isDesktop()) return;
        engine = new ParticleEngine({ canvas, words: PARTICLE_WORDS_DESKTOP, fontFamily });
        engine.setVisible(visible);
        engine.resize();
        engine.start();
      });
    };

    sync();
    window.addEventListener("resize", sync);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("resize", sync);
      engine?.destroy();
    };
  }, []);

  return (
    <section id="pong-section" ref={sectionRef}>
      <canvas id="pong-canvas" ref={canvasRef} aria-hidden="true" />
      <div id="pt-mobile" aria-hidden="true">
        {PARTICLE_WORDS_MOBILE.map((word) => (
          <span key={word} className="pt-mob-word">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
