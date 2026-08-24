import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { VitalMetric } from "../../types";
import { cn } from "../../lib/risk";

function TrendIcon({ trend, trendGood }: { trend?: "up" | "down" | "flat"; trendGood?: boolean }) {
  if (!trend || trend === "flat") return <Minus className="w-3 h-3 text-muted" />;
  const color = trendGood ? "text-success" : "text-critical";
  return trend === "up" ? (
    <ArrowUp className={cn("w-3 h-3", color)} />
  ) : (
    <ArrowDown className={cn("w-3 h-3", color)} />
  );
}

export default function PatientSnapshot({ metrics }: { metrics: VitalMetric[] }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-3">Patient Snapshot</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
        {metrics.map((m) => (
          <div key={m.id} className="border border-border rounded-md p-3">
            <p className="text-[11px] text-muted mb-1">{m.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[16px] font-semibold text-ink tabular-nums">{m.value}</span>
              {m.unit && <span className="text-[11px] text-muted">{m.unit}</span>}
              <TrendIcon trend={m.trend} trendGood={m.trendGood} />
            </div>
            <p className="text-[10.5px] text-muted mt-1">{m.timestamp}</p>
            {m.note && <p className="text-[10px] text-muted italic mt-0.5">{m.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
