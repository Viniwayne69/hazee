"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { HazeChat } from "@/components/chat/HazeChat";

type ChatContextValue = {
  /** Abre o chat do robô HAZE. */
  openChat: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Mantém o estado "chat aberto" e renderiza o modal uma única vez.
 * Qualquer componente abaixo pode abrir o chat com `useChat().openChat()`.
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  // `session` muda a cada abertura e reinicia a conversa do zero.
  const [session, setSession] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleExited = useCallback(() => setIsOpen(false), []);

  const value = useMemo<ChatContextValue>(
    () => ({
      openChat: () => {
        setSession((current) => current + 1);
        setIsOpen(true);
      },
    }),
    [],
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
      {isOpen && <HazeChat key={session} onExited={handleExited} />}
    </ChatContext.Provider>
  );
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat deve ser usado dentro de <ChatProvider>.");
  return context;
}
