"use client";

import React, { useState } from "react";
import { Bot, Send } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Roban! I'm your DarbarTech assistant. I can help you draft course content, answer questions about the platform, or generate announcements.",
  },
];

const Page = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const [draft, setDraft] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();

    const text = draft.trim();

    if (!text) return;

    sendMessage(text);
  };

  const sendMessage = (text: string) => {
    setMessages((previous) => [
      ...previous,
      {
        id: previous.length + 1,
        role: "user",
        text,
      },
    ]);

    setDraft("");

    setIsTyping(true);

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          id: previous.length + 1,
          role: "assistant",
          text: "I've received your request. For now this is a demo assistant — full AI support is coming soon.",
        },
      ]);

      setIsTyping(false);
    }, 1200);
  };

  return (
    <section className="flex flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">
              AI & Chat
            </h1>

            <p className="mt-2 text-sm text-(--text-primary-dashboard)/70">
              Ask questions or request help from the DarbarTech assistant.
            </p>
          </div>

          {/* ================= MESSAGES ================= */}

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-2xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) p-5 shadow-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                    <Bot size={18} />
                  </div>
                )}

                <div
                  className={`
                    max-w-[75%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6
                    ${
                      message.role === "user"
                        ? "bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                        : "border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) text-(--text-primary-dashboard)"
                    }
                  `}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--secondary-bg-dashboard) text-(--secondary-text-dashboard)">
                  <Bot size={18} />
                </div>

                <span className="rounded-2xl border border-(--border-primary-dashboard) bg-(--bg-primary-dashboard) px-4 py-3 text-sm text-(--tertiary-text-dashboard)">
                  Typing...
                </span>
              </div>
            )}
          </div>

          {/* ================= INPUT ================= */}

          <form
            onSubmit={handleSend}
            className="mt-4 flex items-center gap-3"
          >
            <input
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Type a message..."
              aria-label="Chat message"
              className="flex-1 rounded-xl border border-(--border-primary-dashboard) bg-(--primary-dashboard) px-4 py-3 text-sm text-(--text-primary-dashboard) outline-none transition focus:border-(--bg-lightblue) focus:ring-2 focus:ring-(--bg-lightblue)/20"
            />

            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--bg-lightblue) text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
    </section>
  );
};

export default Page;