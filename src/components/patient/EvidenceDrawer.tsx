import { X } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useEvidence } from "../../hooks/useEvidence";
import type { Evidence } from "../../types";
import { cn } from "../../lib/risk";

export default function EvidenceDrawer({ evidenceLibrary }: { evidenceLibrary: Record<string, Evidence> }) {
  const { activeKey, close } = useEvidence();
  const evidence = activeKey ? evidenceLibrary[activeKey] : null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-opacity",
        evidence ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink/20 transition-opacity",
          evidence ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-full max-w-md bg-surface border-l border-border shadow-card transition-transform duration-200 flex flex-col",
          evidence ? "translate-x-0" : "translate-x-full"
        )}
      >
        {evidence && (
          <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-[15px] font-semibold text-ink">Why am I seeing this?</h3>
              <button onClick={close} className="text-muted hover:text-ink">
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div>
                <h4 className="text-[15px] font-semibold text-ink mb-1">{evidence.title}</h4>
                <p className="text-[13px] text-muted">{evidence.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[12.5px]">
                <div>
                  <p className="text-muted mb-0.5">Source</p>
                  <p className="text-ink font-medium">{evidence.sourceIcon} {evidence.source}</p>
                </div>
                <div>
                  <p className="text-muted mb-0.5">Detected</p>
                  <p className="text-ink font-medium">{evidence.detectedAt}</p>
                </div>
                {evidence.baseline && (
                  <div>
                    <p className="text-muted mb-0.5">Baseline</p>
                    <p className="text-ink font-medium tabular-nums">{evidence.baseline}</p>
                  </div>
                )}
                {evidence.current && (
                  <div>
                    <p className="text-muted mb-0.5">Current</p>
                    <p className="text-ink font-medium tabular-nums">{evidence.current}</p>
                  </div>
                )}
              </div>

              {evidence.chartData && (
                <div className="border border-border rounded-md p-3">
                  <p className="text-[11px] text-muted mb-2">Trend</p>
                  <ResponsiveContainer width="100%" height={140}>
                    <LineChart data={evidence.chartData}>
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                      <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                      <Tooltip
                        contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="bg-bg border border-border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-medium text-ink">Confidence</p>
                  <p className="text-[12px] font-semibold text-brand-700">{evidence.confidence}%</p>
                </div>
                <p className="text-[11.5px] text-muted mb-1.5">Sources</p>
                <ul className="space-y-1">
                  {evidence.sources.map((s) => (
                    <li key={s} className="text-[12.5px] text-ink flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-muted" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-border">
              <button
                onClick={close}
                className="w-full py-2 text-[13px] font-medium border border-border rounded-md text-ink hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
