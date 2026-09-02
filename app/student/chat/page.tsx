"use client";

import { useRef, useState } from "react";
import { Send, Paperclip, Image as ImageIcon, Search } from "lucide-react";
import { Avatar, Card, PageHeader } from "../components/ui";
import { messages } from "../data";

type Contact = (typeof messages)[number];
type ChatMessage = { from: string; text: string; time: string };

const initialConversation: ChatMessage[] = [
  {
    from: "Sarah M.",
    text: "Hi Roban! Great progress on the module. Let's discuss your project tomorrow.",
    time: "09:38 AM",
  },
  {
    from: "me",
    text: "Thank you! I'll share the repository link before the session.",
    time: "09:41 AM",
  },
  {
    from: "Sarah M.",
    text: "Perfect. See you at 4 PM.",
    time: "09:42 AM",
  },
];

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState<Contact>(messages[0]);
  const [conversation, setConversation] = useState<ChatMessage[]>(initialConversation);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const attachRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const filtered = messages.filter((contact) =>
    contact.from.toLowerCase().includes(query.toLowerCase()),
  );

  const sendMessage = () => {
    if (!draft.trim()) return;
    setConversation((prev) => [
      ...prev,
      { from: "me", text: draft.trim(), time: "now" },
    ]);
    setDraft("");
  };

  const sendFile = (type: "file" | "image", name: string) => {
    setConversation((prev) => [
      ...prev,
      {
        from: "me",
        text: type === "file" ? `Attached: ${name}` : `Image sent: ${name}`,
        time: "now",
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chat & Communication"
        subtitle="Message your instructors, the office and support."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* ================= CONVERSATION LIST ================= */}
        <Card className="p-3 lg:col-span-1">
          <label className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ background: "var(--secondary-bg-dashboard)" }}>
            <Search size={14} style={{ color: "var(--tertiary-text-dashboard)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full outline-none text-(--text-primary-dashboard)"
              style={{ background: "transparent" }}
            />
          </label>

          <div className="flex flex-col gap-1">
            {filtered.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setActiveContact(contact)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:cursor-pointer ${
                  activeContact.id === contact.id
                    ? "bg-(--bg-lightblue)"
                    : "hover:bg-(--secondary-bg-dashboard)"
                }`}
              >
                <Avatar
                  name={contact.from}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-(--text-primary-dashboard)">
                      {contact.from}
                    </p>
                    <span className="shrink-0 text-[10px] text-(--tertiary-text-dashboard)">
                      {contact.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-(--text-primary-dashboard)/60">
                    {contact.text}
                  </p>
                </div>
                {contact.unread > 0 && (
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-(--bg-primary-dashboard)"
                    style={{ background: "var(--bg-lightblue)" }}
                  >
                    {contact.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* ================= CHAT WINDOW ================= */}
        <Card className="flex flex-col p-0 lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-(--border-primary-dashboard) px-5 py-4">
            <Avatar name={activeContact.from} size="sm" />
            <div>
              <p className="text-sm font-semibold text-(--text-primary-dashboard)">
                {activeContact.from}
              </p>
              <p className="text-[11px] text-(--tertiary-text-dashboard)">
                {activeContact.role === "Office" ? "DarbarTech Office" : "Instructor"} • Online
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5" style={{ maxHeight: "420px" }}>
            {conversation.map((msg, i) => {
              const mine = msg.from === "me";
              return (
                <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                      mine
                        ? "rounded-br-md bg-(--bg-lightblue) text-(--text-primary-dashboard)"
                        : "rounded-bl-md text-(--text-primary-dashboard)"
                    }`}
                    style={mine ? undefined : { background: "var(--secondary-bg-dashboard)" }}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-right text-[10px] ${mine ? "text-(--text-primary-dashboard)/60" : "text-(--tertiary-text-dashboard)"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-t border-(--border-primary-dashboard) px-4 py-3">
            <button
              type="button"
              title="Attach file"
              onClick={() => attachRef.current?.click()}
              className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <Paperclip size={17} />
            </button>
            <input
              ref={attachRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const name = e.target.files?.[0]?.name;
                if (name) sendFile("file", name);
              }}
            />
            <button
              type="button"
              title="Send image"
              onClick={() => imageRef.current?.click()}
              className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer"
            >
              <ImageIcon size={17} />
            </button>
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const name = e.target.files?.[0]?.name;
                if (name) sendFile("image", name);
              }}
            />
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2 text-sm outline-none text-(--text-primary-dashboard)"
              style={{ background: "var(--secondary-bg-dashboard)" }}
            />
            <button
              type="button"
              onClick={sendMessage}
              title="Send"
              className="rounded-full bg-(--bg-lightblue) p-2.5 text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}