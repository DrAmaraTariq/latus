import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown } from "lucide-react";
import { patients } from "../data/patients";
import { messages } from "../data/misc";
import { cn } from "../lib/risk";

interface HeaderProps {
  title: string;
  breadcrumb?: string;
}

export default function Header({ title, breadcrumb }: HeaderProps) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const results =
    query.length > 0
      ? patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      : [];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-surface/95 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="min-w-0">
        {breadcrumb && (
          <p className="text-[11px] text-muted mb-0.5 truncate">{breadcrumb}</p>
        )}
        <h1 className="text-[16px] font-semibold text-ink truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search patients..."
              className="w-64 pl-9 pr-3 py-1.5 text-[13px] rounded-md border border-border bg-bg focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition-colors"
            />
          </div>
          {searchOpen && results.length > 0 && (
            <div className="absolute right-0 mt-1.5 w-72 bg-surface border border-border rounded-lg shadow-card overflow-hidden">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigate(`/patients/${p.id}`);
                    setQuery("");
                    setSearchOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors"
                >
                  <div
                    className="w-7 h-7 rounded-full text-white flex items-center justify-center text-[11px] font-semibold shrink-0"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {p.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink truncate">{p.name}</p>
                    <p className="text-[11px] text-muted truncate">{p.age} • {p.sex} • {p.mrn}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-border" />

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <Bell className="w-[17px] h-[17px] text-muted" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-critical" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-1.5 w-80 bg-surface border border-border rounded-lg shadow-card overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-border">
                <p className="text-[12.5px] font-semibold text-ink">Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {messages.map((m) => (
                  <div key={m.id} className="px-3.5 py-2.5 border-b border-border last:border-0 hover:bg-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12.5px] font-medium text-ink truncate">{m.from}</p>
                      <span className="text-[10.5px] text-muted shrink-0">{m.time}</span>
                    </div>
                    <p className="text-[12px] text-muted truncate mt-0.5">{m.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] font-semibold">
              RP
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-[12.5px] font-medium text-ink leading-tight">Dr. Patel</p>
              <p className="text-[10.5px] text-success leading-tight flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" /> Online
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-surface border border-border rounded-lg shadow-card overflow-hidden py-1">
              {["View profile", "Preferences", "Sign out"].map((item) => (
                <button
                  key={item}
                  className={cn(
                    "w-full text-left px-3.5 py-2 text-[13px] hover:bg-slate-50 transition-colors",
                    item === "Sign out" ? "text-critical" : "text-ink"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
