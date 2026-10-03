"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { profile } from "@/data/profile";
import { answer, type ChatAction, type ChatContext } from "@/lib/chat-engine";
import { OPEN_CHAT_EVENT } from "./open-chat";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  shown: number;
  actions?: ChatAction[];
  suggestions?: string[];
};

const WELCOME: Message = {
  id: 0,
  from: "bot",
  text: `Hi! 👋 I'm **${profile.firstName}'s** portfolio assistant.\nAsk me anything about his experience, skills, projects or how to reach him.\n\nأقدر أرد بالعربي كمان ✨`,
  shown: Infinity,
  suggestions: ["Who is Ahmed?", "What's his experience?", "Does he know Laravel?", "Show me his projects", "How can I contact him?", "مشاريعه إيه؟"],
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-white">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function RichText({ text }: { text: string }) {
  const balanced = (text.match(/\*\*/g)?.length ?? 0) % 2 === 1 ? `${text}**` : text;
  const lines = balanced.split("\n");
  const blocks: ReactNode[] = [];
  lines.forEach((line, i) => {
    if (line.startsWith("• ")) {
      blocks.push(
        <div key={i} className="flex gap-2 ps-1">
          <span className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-linear-to-br from-cyan-300 to-indigo-400" />
          <span>{renderInline(line.slice(2))}</span>
        </div>,
      );
    } else if (line.trim() === "") {
      blocks.push(<div key={i} className="h-2" />);
    } else {
      blocks.push(<p key={i}>{renderInline(line)}</p>);
    }
  });
  return <div className="space-y-0.5">{blocks}</div>;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(true);
  const context = useRef<ChatContext>({});
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const streaming = messages.some((m) => m.shown < m.text.length);
  const busy = typing || streaming;

  const ask = useCallback((raw: string) => {
    const question = raw.trim();
    if (!question) return;
    const userMsg: Message = { id: nextId.current++, from: "user", text: question, shown: Infinity };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const { reply, context: nextContext } = answer(question, context.current);
    context.current = nextContext;
    const delay = 450 + Math.min(reply.text.length * 2, 700);

    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, from: "bot", text: reply.text, shown: 0, actions: reply.actions, suggestions: reply.suggestions },
      ]);
    }, delay);
  }, []);

  useEffect(() => {
    if (!streaming) return;
    const timer = window.setInterval(() => {
      setMessages((prev) =>
        prev.map((m) => (m.shown < m.text.length ? { ...m, shown: Math.min(m.text.length, m.shown + 4) } : m)),
      );
    }, 16);
    return () => window.clearInterval(timer);
  }, [streaming]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    function onOpen(e: Event) {
      const question = (e as CustomEvent<{ question?: string }>).detail?.question;
      setOpen(true);
      setUnread(false);
      if (question) ask(question);
      window.setTimeout(() => inputRef.current?.focus(), 250);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, [ask]);

  function toggle() {
    setOpen((o) => !o);
    setUnread(false);
    window.setTimeout(() => inputRef.current?.focus(), 250);
  }

  function reset() {
    context.current = {};
    setMessages([WELCOME]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!busy) ask(input);
  }

  const last = messages[messages.length - 1];

  return (
    <>
      <div
        role="dialog"
        aria-label="Chat with Ahmed's assistant"
        aria-hidden={!open}
        inert={!open}
        className={`fixed z-50 flex flex-col overflow-hidden border border-white/10 bg-[#0a0c1a]/95 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl transition-all duration-300 ease-out max-sm:inset-0 sm:right-6 sm:bottom-24 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-3xl ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="relative flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/70 to-transparent" />
          <div className="relative">
            <div className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-sm font-bold text-white">
              {profile.initials}
            </div>
            <span className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-[#0a0c1a] bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-white">Ask about {profile.firstName}</p>
            <p className="text-xs text-muted">Instant answers · English / عربي</p>
          </div>
          <button onClick={reset} aria-label="Restart conversation" className="rounded-xl p-2 text-muted transition hover:bg-white/5 hover:text-white">
            <Icon name="refresh" className="size-4" />
          </button>
          <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-xl p-2 text-muted transition hover:bg-white/5 hover:text-white">
            <Icon name="x" className="size-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
          {messages.map((m) => (
            <div key={m.id} className={`animate-pop flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              {m.from === "bot" && (
                <div className="me-2 mt-1 grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-cyan-400/20 to-indigo-500/30 text-indigo-200">
                  <Icon name="sparkles" className="size-3.5" />
                </div>
              )}
              <div className="max-w-[85%] space-y-2">
                <div
                  dir="auto"
                  className={`rounded-2xl px-4 py-3 text-[0.9rem] leading-relaxed ${
                    m.from === "user"
                      ? "rounded-br-md bg-linear-to-br from-indigo-500 to-fuchsia-600 text-white"
                      : "rounded-bl-md border border-white/[0.07] bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {m.from === "bot" ? <RichText text={m.text.slice(0, m.shown)} /> : m.text}
                </div>
                {m.from === "bot" && m.shown >= m.text.length && m.actions && m.actions.length > 0 && (
                  <div className="animate-pop flex flex-wrap gap-2">
                    {m.actions.map((a) =>
                      a.external ? (
                        <a
                          key={a.href + a.label}
                          href={a.href}
                          target={a.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 transition hover:border-indigo-300/60 hover:bg-indigo-500/20"
                        >
                          {a.label}
                          <Icon name="arrow-up-right" className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          key={a.href + a.label}
                          href={a.href}
                          onClick={() => window.matchMedia("(max-width: 639px)").matches && setOpen(false)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
                        >
                          {a.label}
                          <Icon name="arrow-right" className="size-3.5" />
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="animate-pop flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-cyan-400/20 to-indigo-500/30 text-indigo-200">
                <Icon name="sparkles" className="size-3.5" />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.04] px-4 py-3.5">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="size-2 animate-bounce rounded-full bg-indigo-300/80" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}

          {!busy && last.from === "bot" && last.suggestions && (
            <div className="animate-pop flex flex-wrap gap-2 ps-9">
              {last.suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  dir="auto"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition hover:-translate-y-0.5 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 ps-4 transition focus-within:border-indigo-400/50">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything… / اسأل أي حاجة"
              dir="auto"
              maxLength={300}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-cyan-400 to-indigo-500 text-white transition hover:scale-105 disabled:scale-100 disabled:opacity-40"
            >
              <Icon name="send" className="size-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[0.68rem] text-slate-500">Answers are generated from Ahmed&apos;s CV data.</p>
        </form>
      </div>

      <button
        onClick={toggle}
        aria-label={open ? "Close chat" : "Chat with Ahmed's assistant"}
        className={`group fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6 ${open ? "max-sm:hidden" : ""}`}
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-indigo-500/40" />}
        <span className="relative grid size-14 place-items-center rounded-full bg-linear-to-br from-cyan-400 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/40 transition group-hover:scale-110">
          <Icon name={open ? "x" : "chat"} className="size-6" />
        </span>
        {unread && !open && (
          <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-background bg-rose-500 text-[0.6rem] font-bold text-white">
            1
          </span>
        )}
        {!open && (
          <span className="pointer-events-none absolute top-1/2 right-[4.5rem] hidden -translate-y-1/2 rounded-xl border border-white/10 bg-[#0a0c1a]/95 px-3 py-2 text-sm whitespace-nowrap text-slate-200 opacity-0 shadow-xl transition group-hover:opacity-100 sm:block">
            Ask me anything about {profile.firstName} ✨
          </span>
        )}
      </button>
    </>
  );
}
