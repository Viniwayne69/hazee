"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useChat } from "@/components/chat/ChatProvider";
import { CHAT_INVITE, SPLINE } from "@/data/site";
import { cx } from "@/lib/cx";

/** Tempo que o balão espera após a seção aparecer (animação inicial do robô). */
const INVITE_DELAY_MS = 3200;
const MOBILE_MAX_WIDTH = 768;
const SMALL_MOBILE_MAX_WIDTH = 390;

/**
 * Posiciona o balão ao lado da cabeça do robô. No desktop ele fica acima e à
 * direita (a cauda aponta para baixo-esquerda); no mobile, à direita da cabeça.
 */
function positionInvite(section: HTMLElement, invite: HTMLElement) {
  const { width: w, height: h } = section.getBoundingClientRect();
  const viewport = window.innerWidth;
  const isMobile = viewport <= MOBILE_MAX_WIDTH;

  let bubbleWidth = 220;
  if (viewport <= SMALL_MOBILE_MAX_WIDTH) bubbleWidth = 118;
  else if (isMobile) bubbleWidth = 130;
  else if (viewport <= 900) bubbleWidth = 200;

  const bubbleHeight = isMobile ? 88 : 130;
  let left: number;
  let top: number;

  if (isMobile) {
    const headCenterX = w * 0.5;
    const headCenterY = h * 0.26;
    const headHalfWidth = 32;

    left = headCenterX + headHalfWidth + 22;
    top = headCenterY - bubbleHeight / 2;

    left = Math.max(12, Math.min(left, w - bubbleWidth - 12));
    top = Math.max(12, top);
  } else {
    const headCenterX = w * 0.5;
    const headCenterY = h * 0.32;
    const headHalfWidth = 55;
    const offsetRight = 60;
    const offsetUp = 80;

    left = headCenterX + headHalfWidth + offsetRight;
    top = headCenterY - bubbleHeight - offsetUp;

    left = Math.max(16, Math.min(left, w - bubbleWidth - 16));
    top = Math.max(16, top);
  }

  invite.style.left = `${left}px`;
  invite.style.top = `${top}px`;
}

/** Remove a marca d'água do viewer assim que o shadow DOM estiver disponível. */
function useHideSplineBadge(viewerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const interval = window.setInterval(() => {
      const shadow = viewer.shadowRoot;
      if (!shadow) return;

      const logo = shadow.querySelector("#logo");
      if (logo) {
        logo.remove();
        window.clearInterval(interval);
        return;
      }
      shadow
        .querySelectorAll('a, [class*="logo"], [id*="logo"], [class*="brand"], [class*="watermark"]')
        .forEach((element) => element.remove());
    }, 100);
    const timeout = window.setTimeout(() => window.clearInterval(interval), 8000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [viewerRef]);
}

export function RoboSpline() {
  const { openChat } = useChat();
  const sectionRef = useRef<HTMLElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const [inviteVisible, setInviteVisible] = useState(false);

  useHideSplineBadge(viewerRef);

  const reposition = useCallback(() => {
    if (sectionRef.current && inviteRef.current) {
      positionInvite(sectionRef.current, inviteRef.current);
    }
  }, []);

  // Mantém o balão alinhado à cabeça do robô.
  useEffect(() => {
    const viewer = viewerRef.current;
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(reposition, 100);
    };

    reposition();
    window.addEventListener("resize", onResize);
    window.addEventListener("load", reposition);
    viewer?.addEventListener("load", reposition);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", reposition);
      viewer?.removeEventListener("load", reposition);
    };
  }, [reposition]);

  // Mostra o balão só depois que a animação inicial do robô terminar.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          reposition();
          setInviteVisible(true);
        }, INVITE_DELAY_MS);
      },
      { threshold: 0.4 },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [reposition]);

  return (
    <section id="spline-section" ref={sectionRef}>
      <Script src={SPLINE.viewerScript} type="module" strategy="afterInteractive" />

      <div className="spline-overlay" />
      <spline-viewer id="splineViewer" ref={viewerRef} url={SPLINE.scene} />

      <div className="spline-text">
        <p className="spline-text-label">{SPLINE.label}</p>
        <h2 className="spline-text-headline">
          {SPLINE.headline[0]}
          <br />
          {SPLINE.headline[1]}
        </h2>
      </div>

      <div
        className={cx("haze-invite", inviteVisible && "visible")}
        id="hazeInvite"
        ref={inviteRef}
        role="button"
        tabIndex={inviteVisible ? 0 : -1}
        aria-hidden={!inviteVisible}
        onClick={openChat}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openChat();
          }
        }}
      >
        <div className="haze-invite-text">
          <p className="invite-name">{CHAT_INVITE.name}</p>
          <p className="invite-msg">
            {CHAT_INVITE.message[0]}
            <br />
            {CHAT_INVITE.message[1]}
          </p>
          <span className="invite-cta">{CHAT_INVITE.cta}</span>
        </div>
      </div>
    </section>
  );
}
