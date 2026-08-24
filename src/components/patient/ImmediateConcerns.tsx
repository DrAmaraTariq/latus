import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Concern } from "../../types";
import { useEvidence } from "../../hooks/useEvidence";
import { cn } from "../../lib/risk";

export default function ImmediateConcerns({ concerns }: { concerns: Concern[] }) {
  const { openEvidence } = useEvidence();
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-3">Immediate Concerns</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {concerns.map((c) => {
          const isAck = acknowledged[c.id];
          return (
            <div
              key={c.id}
              className={cn(
                "border rounded-lg p-3.5 transition-opacity",
                c.severity === "critical" ? "border-red-100 bg-red-50/40" : "border-amber-100 bg-amber-50/40",
                isAck && "opacity-50"
              )}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span>{c.severity === "critical" ? "🔴" : "🟠"}</span>
                <p className="text-[13px] font-semibold text-ink">{c.title}</p>
              </div>
              <p className="text-[11.5px] text-muted mb-0.5">Source: {c.source}</p>
              <p className="text-[11.5px] text-muted mb-3">Detected: {c.detectedAt}</p>
              {isAck ? (
                <div className="flex items-center gap-1.5 text-[12px] text-success font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledged
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEvidence(c.evidenceKey)}
                    className="px-2.5 py-1 text-[12px] font-medium bg-surface border border-border rounded-md text-ink hover:bg-slate-50 transition-colors"
                  >
                    Review
                  </button>
                  {c.severity === "critical" && (
                    <button
                      onClick={() => setAcknowledged((prev) => ({ ...prev, [c.id]: true }))}
                      className="px-2.5 py-1 text-[12px] font-medium text-muted hover:text-ink transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
