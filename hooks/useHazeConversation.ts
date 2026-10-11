"use client";

import { useCallback, useRef, useState } from "react";
import type { RobotGesture } from "@/components/chat/HazeRobot";
import { whatsappLink } from "@/lib/whatsapp";

export type ChatMessage =
  | { id: number; kind: "bubble"; who: "haze" | "user"; text: string }
  | { id: number; kind: "whatsapp"; href: string };

type Token = { cancelled: boolean };

/** Sinaliza que a conversa foi encerrada (chat fechado) no meio de um fluxo. */
class Cancelled extends Error {}

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

function ignoreCancelled(error: unknown) {
  if (!(error instanceof Cancelled)) throw error;
}

/**
 * Roteiro da conversa com o robô HAZE:
 * 0) apresentação → 1) nome → 2) marca → 3) detalhes → botão de WhatsApp.
 */
export function useHazeConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gesture, setGestureState] = useState<{ name: RobotGesture; key: number }>({
    name: "thinking",
    key: 0,
  });
  /** Texto de placeholder do campo; `null` quando o campo está oculto. */
  const [placeholder, setPlaceholder] = useState<string | null>(null);

  const tokenRef = useRef<Token>({ cancelled: true });
  const stepRef = useRef(0);
  const nameRef = useRef("");
  const idRef = useRef(0);

  const setGesture = useCallback((name: RobotGesture) => {
    setGestureState((current) => ({ name, key: current.key + 1 }));
  }, []);

  const say = useCallback(
    async (token: Token, who: "haze" | "user", text: string, delay = 0) => {
      if (delay) await sleep(delay);
      if (token.cancelled) throw new Cancelled();
      const id = ++idRef.current;
      setMessages((current) => [...current, { id, kind: "bubble", who, text }]);
    },
    [],
  );

  const intro = useCallback(
    async (token: Token) => {
      stepRef.current = 0;
      await say(token, "haze", "Oii, prazer em te conhecer!", 400);
      await say(token, "haze", "Qual é o seu nome?", 1200);
      setPlaceholder("Seu nome...");
      stepRef.current = 1;
    },
    [say],
  );

  /** Inicia (ou reinicia) a conversa. Retorna a função que a cancela. */
  const start = useCallback(() => {
    const token: Token = { cancelled: false };
    tokenRef.current = token;
    intro(token).catch(ignoreCancelled);
    return () => {
      token.cancelled = true;
    };
  }, [intro]);

  const reply = useCallback(
    async (token: Token, value: string) => {
      const name = nameRef.current;

      switch (stepRef.current) {
        case 1:
          nameRef.current = value;
          await say(token, "user", value);
          setGesture("heart");
          await say(token, "haze", `Boa hora pra aparecer, ${value}!`, 800);
          await say(token, "haze", "Você não chegou aqui por acaso", 1600);
          await say(token, "haze", "Pois tenho um presente bem especial pra te entregar!", 2400);
          await say(token, "haze", `Mas antes, ${value}, me conta uma coisa`, 3200);
          await say(token, "haze", "Você já tem uma marca ou está começando do zero?", 4000);
          setPlaceholder("Tenho uma marca / Estou começando...");
          stepRef.current = 2;
          break;

        case 2:
          await say(token, "user", value);
          setGesture("thinking");
          await say(token, "haze", "Me conta mais sobre sua marca e visão!", 800);
          setPlaceholder("Conta tudo...");
          stepRef.current = 3;
          break;

        case 3: {
          stepRef.current = 0;
          await say(token, "user", value);
          setGesture("thumbsup");
          await say(token, "haze", `Você é um humano bem inteligente, ${name}!`, 800);
          await say(token, "haze", "Meu sócio vai te entregar o presente", 1800);
          await say(token, "haze", "Ele já está esperando por você", 2600);
          await sleep(3800);
          if (token.cancelled) throw new Cancelled();
          const id = ++idRef.current;
          const href = whatsappLink(
            `Olá! Me chamo ${name}, conversei com o HAZE e fui avisado que tenho um presente especial me esperando!`,
          );
          setMessages((current) => [...current, { id, kind: "whatsapp", href }]);
          break;
        }
      }
    },
    [say, setGesture],
  );

  /** Envia a resposta do usuário para o passo atual da conversa. */
  const submit = useCallback(
    (raw: string) => {
      const value = raw.trim();
      const token = tokenRef.current;
      if (!value || token.cancelled || stepRef.current === 0) return;

      setPlaceholder(null);
      reply(token, value).catch(ignoreCancelled);
    },
    [reply],
  );

  return { messages, gesture, placeholder, start, submit };
}

