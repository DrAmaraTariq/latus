import { useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import type { Finding } from "../../types";
import { cn } from "../../lib/risk";

export default function KeyFindings({ findings }: { findings: Finding[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-3">Key Findings</h3>
      <div className="space-y-2">
        {findings.map((f) => {
          const isOpen = expanded === f.id;
          return (
            <div key={f.id} className="border border-border rounded-md">
              <button
                onClick={() => setExpanded(isOpen ? null : f.id)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors"
              >
                <p
                  className={cn(
                    "text-[13px] font-medium flex-1",
                    f.direction === "down" ? "text-critical" : "text-warning"
                  )}
                >
                  {f.label}
                </p>
                <div className="w-16 h-6 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={f.trend}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={f.direction === "down" ? "#DC2626" : "#F59E0B"}
                        strokeWidth={1.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <span className="text-[11px] text-muted w-24 text-right shrink-0">{f.timestamp}</span>
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3 flex items-center justify-between text-[11.5px] text-muted">
                  <span>Source: {f.source}</span>
                  <span className="text-brand-700 font-medium">View Details</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
