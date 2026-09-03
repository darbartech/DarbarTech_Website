"use client";

import { useRef, useState } from "react";
import { Paperclip, Search, Send } from "lucide-react";

const contacts = [
  { id: 1, name: "Alex Johnson", role: "Student", unread: 2, lastMsg: "Thanks for the feedback!" },
  { id: 2, name: "Maria Garcia", role: "Student", unread: 0, lastMsg: "When is the next assignment?" },
  { id: 3, name: "Admin Office", role: "Office", unread: 1, lastMsg: "Your schedule update is ready." },
  { id: 4, name: "Raj Patel", role: "Student", unread: 0, lastMsg: "Submitted the lab work." },
];

type ChatMsg = { from: string; text: string; time: string };

const initialMessages: ChatMsg[] = [
  { from: "Alex Johnson", text: "Hi! I have a question about the React hooks assignment.", time: "10:15 AM" },
  { from: "me", text: "Sure, what part are you stuck on?", time: "10:18 AM" },
  { from: "Alex Johnson", text: "The useEffect cleanup function — should it return a function or just run code?", time: "10:20 AM" },
  { from: "me", text: "It should return a cleanup function. I will share an example in the next class.", time: "10:22 AM" },
  { from: "Alex Johnson", text: "Thanks for the feedback!", time: "10:23 AM" },
];

export default function ChatPage() {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState<ChatMsg[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [...prev, { from: "me", text: draft.trim(), time: "now" }]);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold text-(--text-primary-dashboard)">Messages</h1>
        <p className="mt-1 text-sm text-(--text-primary-dashboard)/70">Communicate with students and staff.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
        {/* ================= CONVERSATION LIST ================= */}

        <div className="rounded-2xl bg-(--primary-dashboard) p-3 shadow-sm lg:col-span-1">
          <label className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2 text-sm" style={{ background: "var(--secondary-bg-dashboard)" }}>
            <Search size={14} style={{ color: "var(--tertiary-text-dashboard)" }} />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search messages..." className="w-full outline-none text-(--text-primary-dashboard)" style={{ background: "transparent" }} />
          </label>

          <div className="flex flex-col gap-1">
            {filtered.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setActiveContact(contact)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:cursor-pointer ${
                  activeContact.id === contact.id ? "bg-(--bg-lightblue)" : "hover:bg-(--secondary-bg-dashboard)"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--secondary-bg-dashboard)", color: "var(--secondary-text-dashboard)" }}>
                  {contact.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-(--text-primary-dashboard)">{contact.name}</p>
                    {contact.unread > 0 && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-(--bg-primary-dashboard)" style={{ background: "var(--bg-lightblue)" }}>
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-(--tertiary-text-dashboard)">{contact.role}</p>
                  <p className="truncate text-xs text-(--text-primary-dashboard)/60">{contact.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= CHAT WINDOW ================= */}

        <div className="flex flex-col rounded-2xl bg-(--primary-dashboard) shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-(--border-primary-dashboard) px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--secondary-bg-dashboard)", color: "var(--secondary-text-dashboard)" }}>
              {activeContact.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <div>
              <p className="text-sm font-semibold text-(--text-primary-dashboard)">{activeContact.name}</p>
              <p className="text-[11px] text-(--tertiary-text-dashboard)">{activeContact.role} • Online</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5" style={{ maxHeight: "420px" }}>
            {messages.map((msg, i) => {
              const mine = msg.from === "me";
              return (
                <div key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${mine ? "rounded-br-md bg-(--bg-lightblue) text-(--text-primary-dashboard)" : "rounded-bl-md text-(--text-primary-dashboard)"}`}
                    style={mine ? undefined : { background: "var(--secondary-bg-dashboard)" }}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 text-right text-[10px] ${mine ? "text-(--text-primary-dashboard)/60" : "text-(--tertiary-text-dashboard)"}`}>{msg.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-t border-(--border-primary-dashboard) px-4 py-3">
            <button type="button" onClick={() => fileRef.current?.click()} className="rounded-lg p-2 text-(--tertiary-text-dashboard) transition hover:bg-(--secondary-bg-dashboard) hover:cursor-pointer">
              <Paperclip size={17} />
            </button>
            <input ref={fileRef} type="file" className="hidden" />
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2 text-sm outline-none text-(--text-primary-dashboard)"
              style={{ background: "var(--secondary-bg-dashboard)" }}
            />
            <button type="button" onClick={sendMessage} className="rounded-full bg-(--bg-lightblue) p-2.5 text-(--text-primary-dashboard) transition hover:opacity-90 hover:cursor-pointer">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
