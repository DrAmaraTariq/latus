import { useState } from "react";
import AppShell from "../layouts/AppShell";
import { messages as initialMessages } from "../data/misc";
import { cn } from "../lib/risk";

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);
  const [activeId, setActiveId] = useState(initialMessages[0]?.id ?? null);

  const active = messages.find((m) => m.id === activeId);

  function openMessage(id: string) {
    setActiveId(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
  }

  return (
    <AppShell title="Messages">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => openMessage(m.id)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-border last:border-0 hover:bg-slate-50 transition-colors",
                activeId === m.id && "bg-brand-50/50"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className={cn("text-[13px] truncate", m.unread ? "font-semibold text-ink" : "font-medium text-ink")}>
                  {m.from}
                </p>
                {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-brand-600 shrink-0" />}
              </div>
              <p className="text-[12px] text-muted truncate mt-0.5">{m.preview}</p>
              <p className="text-[10.5px] text-muted mt-1">{m.time}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-surface border border-border rounded-lg shadow-subtle p-5">
          {active ? (
            <div>
              <h3 className="text-[15px] font-semibold text-ink">{active.from}</h3>
              <p className="text-[11.5px] text-muted mt-0.5">{active.time}</p>
              <p className="text-[13.5px] text-ink leading-relaxed mt-4">{active.preview}</p>
            </div>
          ) : (
            <p className="text-[13px] text-muted">Select a message to read it.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
