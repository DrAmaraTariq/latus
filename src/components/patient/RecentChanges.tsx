import { useState } from "react";
import type { ChangeItem } from "../../types";
import { cn } from "../../lib/risk";

const periods = ["7D", "14D", "30D", "1Y"] as const;

export default function RecentChanges({ changesByPeriod }: { changesByPeriod: Record<string, ChangeItem[]> }) {
  const [period, setPeriod] = useState<(typeof periods)[number]>("14D");
  const changes = changesByPeriod[period];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13.5px] font-semibold text-ink">Recent Changes</h3>
        <div className="flex items-center gap-1 bg-bg border border-border rounded-md p-0.5">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "px-2.5 py-1 text-[11.5px] font-medium rounded transition-colors",
                period === p ? "bg-brand-50 text-brand-700" : "text-muted hover:text-ink"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {changes.map((c) => (
          <div key={c.id} className="border border-border rounded-md px-3 py-2.5">
            <p className="text-[11px] text-muted mb-0.5">{c.label}</p>
            <p
              className={cn(
                "text-[13.5px] font-semibold",
                c.direction === "down" || c.direction === "up" ? "text-critical" : "text-ink"
              )}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
