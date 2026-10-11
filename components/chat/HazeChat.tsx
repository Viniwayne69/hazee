"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type TouchEvent } from "react";
import { HazeRobot } from "@/components/chat/HazeRobot";
import { SendIcon, WhatsAppSolidIcon } from "@/components/ui/icons";
import { useHazeConversation } from "@/hooks/useHazeConversation";
import { cx } from "@/lib/cx";

type Phase = "mounted" | "open" | "closing";

const OPEN_DELAY_MS = 10;
const CLOSE_DURATION_MS = 500;
const DESKTOP_MIN_WIDTH = 769;
const SWIPE_CLOSE_DISTANCE = 90;

type HazeChatProps = {
  /** Chamado quando a animação de saída termina (o modal pode ser desmontado). */
  onExited: () => void;
};

/** Modal de conversa com o robô HAZE. Montado a cada abertura. */
export function HazeChat({ onExited }: HazeChatProps) {
  const [phase, setPhase] = useState<Phase>("mounted");
  const [value, setValue] = useState("");
  const { messages, gesture, placeholder, start, submit } = useHazeConversation();

  const innerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Abertura: anima a entrada e inicia o roteiro da conversa.
  useEffect(() => {
    const stopConversation = start();
    const openTimer = window.setTimeout(() => setPhase("open"), OPEN_DELAY_MS);
    // No mobile o foco é manual, para evitar saltos de scroll indesejados.
    const focusTimer =
      window.innerWidth >= DESKTOP_MIN_WIDTH
        ? window.setTimeout(() => inputRef.current?.focus(), 460)
        : undefined;

    return () => {
      stopConversation();
      window.clearTimeout(openTimer);
      window.clearTimeout(focusTimer);
    };
  }, [start]);

  const close = useCallback(() => setPhase("closing"), []);

  // Após a animação de saída, avisa o pai para desmontar o modal.
  useEffect(() => {
    if (phase !== "closing") return;
    const timer = window.setTimeout(onExited, CLOSE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [phase, onExited]);

  // Esc fecha o chat.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  // Mantém a conversa rolada até a última mensagem.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  // Foca o campo sempre que uma nova pergunta é feita.
  useEffect(() => {
    if (placeholder === null) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, [placeholder]);

  // iOS: o campo sobe junto com o teclado virtual.
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const onResize = () => {
      const offsetBottom = window.innerHeight - viewport.height - viewport.offsetTop;
      if (footerRef.current) {
        footerRef.current.style.paddingBottom = `${Math.max(18, offsetBottom)}px`;
      }
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    };

    viewport.addEventListener("resize", onResize);
    return () => viewport.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;
    submit(value);
    setValue("");
  };

  // Deslizar para baixo fecha o modal (mobile).
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;
    const dy = event.touches[0].clientY - touchStartY.current;
    if (dy > 0 && innerRef.current) {
      innerRef.current.style.transform = `translateY(${Math.min(dy * 0.4, 80)}px)`;
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startY = touchStartY.current;
    const inner = innerRef.current;
    touchStartY.current = null;
    if (startY === null || !inner) return;

    const dy = event.changedTouches[0].clientY - startY;
    inner.style.transform = "";
    inner.style.transition = "transform 0.3s cubic-bezier(0.22,1,0.36,1)";
    window.setTimeout(() => {
      inner.style.transition = "";
    }, 300);
    if (dy > SWIPE_CLOSE_DISTANCE) close();
  };

  return (
    <div
      className={cx("haze-modal", phase === "open" && "open")}
      style={{ display: "flex" }}
      role="dialog"
      aria-modal="true"
      aria-label="Conversa com a HAZE"
    >
      <div
        className="haze-modal-inner"
        ref={innerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="haze-modal-header">
          <div className="haze-modal-avatar">
            <HazeRobot key={gesture.key} gesture={gesture.name} />
          </div>

          <div className="haze-modal-header-text">
            <span className="haze-modal-brand">HAZE</span>
            <span className="haze-modal-status">Online · Disponível</span>
          </div>

          <button type="button" className="haze-modal-close" aria-label="Fechar conversa" onClick={close}>
            ✕
          </button>
        </div>

        <div className="haze-chat-wrap">
          <div className="haze-chat-messages" ref={listRef} aria-live="polite">
            {messages.map((message) =>
              message.kind === "bubble" ? (
                <div key={message.id} className={`chat-bubble ${message.who}`}>
                  <p className="bubble-label">{message.who === "haze" ? "HAZE" : "VOCÊ"}</p>
                  <p>{message.text}</p>
                </div>
              ) : (
                <a
                  key={message.id}
                  className="haze-whatsapp-btn"
                  href={message.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppSolidIcon /> Chamar no WhatsApp
                </a>
              ),
            )}
          </div>

          <div className="haze-chat-footer" ref={footerRef}>
            <form
              className="haze-chat-input-wrap"
              style={{ display: placeholder === null ? "none" : "flex" }}
              onSubmit={handleSubmit}
            >
              <input
                ref={inputRef}
                className="haze-chat-input"
                type="text"
                value={value}
                placeholder={placeholder ?? "Digite sua resposta..."}
                autoComplete="off"
                enterKeyHint="send"
                aria-label="Sua resposta"
                onChange={(event) => setValue(event.target.value)}
              />
              <button type="submit" className="haze-chat-send" aria-label="Enviar">
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
