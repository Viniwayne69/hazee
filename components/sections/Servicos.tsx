"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type TouchEvent } from "react";
import {
  SERVICE_CARDS,
  SERVICE_SLIDES,
  SERVICES_DESCRIPTION,
  SERVICES_HEADLINE,
} from "@/data/site";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/cx";

const CARD_STAGGER_MS = 60;
const SWIPE_DISTANCE = 50;
const LIGHTBOX_FADE_MS = 300;
const IMAGE_SWAP_MS = 180;

/* ── Card com entrada escalonada e inclinação 3D ────────────────────── */

type ServiceCardProps = {
  index: number;
  revealed: boolean;
  onOpen: () => void;
  setRef?: (node: HTMLDivElement | null) => void;
};

function ServiceCard({ index, revealed, onOpen, setRef }: ServiceCardProps) {
  const card = SERVICE_CARDS[index];
  const slide = SERVICE_SLIDES[index];
  const visible = useDelayedFlag(revealed, index * CARD_STAGGER_MS);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.transition = "transform 0.08s ease, box-shadow 0.5s ease";
    element.style.transform = `scale(1.04) perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  };

  const handleLeave = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    element.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease";
    element.style.transform = "";
  };

  return (
    <div
      ref={setRef}
      className="svc-card"
      role="button"
      tabIndex={0}
      aria-label={`Ampliar ${card.label}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Image
        src={slide.src}
        alt={card.alt}
        width={slide.width}
        height={slide.height}
        sizes="(max-width: 767px) 50vw, 25vw"
        draggable={false}
      />
      <div className="svc-overlay">
        <span>{card.label}</span>
      </div>
    </div>
  );
}

/* ── Lightbox ───────────────────────────────────────────────────────── */

type LightboxPhase = "closed" | "opening" | "open" | "closing";

type LightboxProps = {
  phase: LightboxPhase;
  index: number;
  changing: boolean;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
};

function Lightbox({ phase, index, changing, onClose, onStep }: LightboxProps) {
  const touchX = useRef(0);
  const slide = SERVICE_SLIDES[index];

  // Teclado: Esc fecha; setas navegam.
  useEffect(() => {
    if (phase !== "open") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onStep(-1);
      if (event.key === "ArrowRight") onStep(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [phase, onClose, onStep]);

  // Trava a rolagem da página enquanto o lightbox existe.
  useEffect(() => {
    if (phase === "closed") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const dx = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > SWIPE_DISTANCE) onStep(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className={cx("svc-lightbox", phase === "open" && "open")}
      style={phase === "closed" ? undefined : { display: "flex" }}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de soluções HAZE"
      aria-hidden={phase === "closed"}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <button type="button" className="svc-lb-close" aria-label="Fechar" onClick={onClose}>
        ✕
      </button>
      <button
        type="button"
        className="svc-lb-nav svc-lb-prev"
        aria-label="Imagem anterior"
        onClick={() => onStep(-1)}
      >
        ←
      </button>

      <Image
        className={cx("svc-lb-img", changing && "changing")}
        src={slide.src}
        alt={`Serviço HAZE ${index + 1}`}
        width={slide.width}
        height={slide.height}
        sizes="80vw"
        quality={90}
        draggable={false}
      />

      <button
        type="button"
        className="svc-lb-nav svc-lb-next"
        aria-label="Próxima imagem"
        onClick={() => onStep(1)}
      >
        →
      </button>

      <div className="svc-lb-dots" aria-hidden="true">
        {SERVICE_SLIDES.map((item, dotIndex) => (
          <div key={item.src} className={cx("svc-lb-dot", dotIndex === index && "active")} />
        ))}
      </div>
      <p className="svc-lb-counter">
        {index + 1} / {SERVICE_SLIDES.length}
      </p>
    </div>
  );
}

/* ── Seção ──────────────────────────────────────────────────────────── */

export function Servicos() {
  const [setFirstCard, revealed] = useInViewOnce<HTMLDivElement>(0.1);
  const [phase, setPhase] = useState<LightboxPhase>("closed");
  const [index, setIndex] = useState(0);
  const [changing, setChanging] = useState(false);

  const openLightbox = useCallback((target: number) => {
    setIndex(target);
    setPhase("opening");
    // Um frame depois, aplica `.open` para a transição de opacidade rodar.
    window.requestAnimationFrame(() => setPhase("open"));
  }, []);

  const closeLightbox = useCallback(() => setPhase("closing"), []);

  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(() => setPhase("closed"), LIGHTBOX_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const step = useCallback((direction: 1 | -1) => {
    setChanging(true);
    window.setTimeout(() => {
      setIndex((current) => (current + direction + SERVICE_SLIDES.length) % SERVICE_SLIDES.length);
      setChanging(false);
    }, IMAGE_SWAP_MS);
  }, []);

  return (
    <>
      <section id="servicos">
        <div className="services-inner">
          <div className="services-top">
            <Reveal as="h2" className="services-headline">
              {SERVICES_HEADLINE}
            </Reveal>
            <Reveal as="p" className="services-desc">
              {SERVICES_DESCRIPTION}
            </Reveal>
          </div>
        </div>

        <div className="services-gallery" id="svcGallery">
          {SERVICE_CARDS.map((card, cardIndex) => (
            <ServiceCard
              key={card.alt}
              index={cardIndex}
              revealed={revealed}
              setRef={cardIndex === 0 ? setFirstCard : undefined}
              onOpen={() => openLightbox(cardIndex)}
            />
          ))}
        </div>
      </section>

      <Lightbox
        phase={phase}
        index={index}
        changing={changing}
        onClose={closeLightbox}
        onStep={step}
      />
    </>
  );
}
