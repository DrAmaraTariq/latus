import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import AppShell from "../layouts/AppShell";
import PatientAvatar from "../components/PatientAvatar";
import RiskBadge from "../components/RiskBadge";
import { patients } from "../data/patients";
import { cn } from "../lib/risk";
import type { RiskLevel } from "../types";

const filters: { label: string; value: RiskLevel | "all" }[] = [
  { label: "All", value: "all" },
  { label: "High Risk", value: "high-risk" },
  { label: "Needs Review", value: "needs-review" },
  { label: "Stable", value: "stable" },
  { label: "Follow-up Due", value: "follow-up-due" },
];

export default function Patients() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "all">("all");
  const navigate = useNavigate();

  const filtered = patients.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.mrn.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || p.risk === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <AppShell title="Patients">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient name or ID..."
            className="w-full pl-9 pr-3 py-2 text-[13px] rounded-md border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-surface border border-border rounded-md p-0.5 w-fit">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-3 py-1.5 text-[12.5px] font-medium rounded whitespace-nowrap transition-colors",
                filter === f.value ? "bg-brand-50 text-brand-700" : "text-muted hover:text-ink"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/patients/${p.id}`)}
            className="bg-surface border border-border rounded-lg p-4 text-left hover:border-brand-600/40 hover:shadow-subtle transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <PatientAvatar name={p.name} color={p.avatarColor} />
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-ink truncate">{p.name}</p>
                <p className="text-[12px] text-muted">{p.age} • {p.sex}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] text-muted font-mono">{p.mrn}</span>
              <RiskBadge risk={p.risk} />
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-[13px] text-muted col-span-full text-center py-10">
            No patients match your search.
          </p>
        )}
      </div>
    </AppShell>
  );
}
