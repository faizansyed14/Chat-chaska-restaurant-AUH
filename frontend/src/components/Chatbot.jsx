import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, User } from "lucide-react";
import {
  GREETING,
  FALLBACK,
  QUICK_REPLIES,
  findAnswer,
} from "@/lib/chatbotData";

let idSeq = 1;
const nextId = () => idSeq++;

// Bot avatar - uses the Chaat Chaska logo, falls back to a drawn mark.
function BotAvatar({ className = "" }) {
  const [err, setErr] = useState(false);
  if (!err)
    return (
      <img
        src="/images/logo.jpg"
        alt="Chaat Chaska"
        onError={() => setErr(true)}
        className={`rounded-full bg-white object-contain p-0.5 ring-2 ring-saffron/40 ${className}`}
      />
    );
  return (
    <span
      className={`grid place-items-center rounded-full bg-cream ring-2 ring-saffron/40 ${className}`}
    >
      <svg viewBox="0 0 100 100" className="h-3/4 w-3/4">
        <path
          d="M70 22 A30 30 0 1 0 70 78 L70 64 A16 16 0 1 1 70 36 Z"
          fill="#E23A1E"
        />
        <path
          d="M62 34 A18 18 0 1 0 62 66 L62 56 A8 8 0 1 1 62 44 Z"
          fill="#F4900C"
        />
      </svg>
    </span>
  );
}

function UserAvatar({ className = "" }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-masala text-cream ${className}`}
    >
      <User className="h-1/2 w-1/2" />
    </span>
  );
}

// Types out text character by character, then calls onDone once.
function TypeOut({ text, speed = 16, onTick, onDone }) {
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (n < text.length) {
      const t = setTimeout(() => {
        setN((v) => v + 1);
        onTick && onTick();
      }, speed);
      return () => clearTimeout(t);
    } else if (!done.current) {
      done.current = true;
      onDone && onDone();
    }
  }, [n, text, speed, onTick, onDone]);

  return <span className="whitespace-pre-line">{text.slice(0, n)}</span>;
}

// The three-dot "typing…" indicator before the bot replies.
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-masala/40"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false); // bot is "thinking"
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, pending, open]);

  // Seed greeting the first time the chat is opened.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { id: nextId(), role: "bot", text: GREETING, typing: true },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const pushUser = (text) =>
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);

  const replyTo = (text) => {
    setPending(true);
    // Small human-like delay before the bot "types".
    setTimeout(() => {
      const intent = findAnswer(text);
      const answer = intent ? intent.answer : FALLBACK;
      const action = intent?.action || null;
      setPending(false);
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "bot", text: answer, typing: true, action },
      ]);
    }, 550);
  };

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    pushUser(text);
    setInput("");
    replyTo(text);
  };

  const markDone = (id) =>
    setMessages((m) =>
      m.map((msg) => (msg.id === id ? { ...msg, typing: false } : msg))
    );

  const showQuickReplies =
    messages.length > 0 &&
    messages[messages.length - 1].role === "bot" &&
    !messages[messages.length - 1].typing &&
    !pending;

  return (
    <>
      {/* Launcher button (bottom-right) */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            aria-label="Chat with Chaat Chaska"
            className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-chili p-1.5 text-white shadow-soft sm:bottom-6 sm:right-6 lg:pr-4"
          >
            <span className="absolute inset-0 -z-10 hidden animate-ping rounded-full bg-chili opacity-20 sm:block" />
            <BotAvatar className="h-9 w-9 sm:h-11 sm:w-11" />
            <span className="hidden text-sm font-bold lg:block">
              Ask us anything
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-4 right-4 z-50 flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-cream shadow-warm"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-chili to-saffron px-4 py-3 text-white">
              <BotAvatar className="h-10 w-10 shrink-0" />
              <div className="min-w-0 flex-1 leading-tight">
                <p className="font-display text-lg font-black">Chaat Chaska</p>
                <p className="flex items-center gap-1.5 text-xs text-white/85">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  Online · usually replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-spice px-3 py-4"
            >
              {messages.map((msg) =>
                msg.role === "bot" ? (
                  <div key={msg.id} className="flex items-end gap-2">
                    <BotAvatar className="h-7 w-7 shrink-0" />
                    <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-masala shadow-soft">
                      {msg.typing ? (
                        <TypeOut
                          text={msg.text}
                          onTick={scrollToBottom}
                          onDone={() => markDone(msg.id)}
                        />
                      ) : (
                        <span className="whitespace-pre-line">{msg.text}</span>
                      )}
                      {!msg.typing && msg.action && (
                        <a
                          href={msg.action.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white"
                        >
                          {msg.action.label}
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    className="flex items-end justify-end gap-2"
                  >
                    <div className="max-w-[78%] rounded-2xl rounded-br-md bg-masala px-3.5 py-2.5 text-sm leading-relaxed text-cream shadow-soft">
                      <span className="whitespace-pre-line">{msg.text}</span>
                    </div>
                    <UserAvatar className="h-7 w-7 shrink-0" />
                  </div>
                )
              )}

              {pending && (
                <div className="flex items-end gap-2">
                  <BotAvatar className="h-7 w-7 shrink-0" />
                  <div className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2 shadow-soft">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Quick replies */}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-chili/30 bg-white px-3 py-1.5 text-xs font-bold text-chili transition-colors hover:bg-chili hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-border bg-cream p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type your question…"
                className="h-11 flex-1 rounded-full border-2 border-input bg-white px-4 text-sm font-medium outline-none focus:border-saffron"
              />
              <button
                onClick={() => send()}
                aria-label="Send"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-chili text-white transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
