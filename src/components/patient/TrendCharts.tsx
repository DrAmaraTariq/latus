import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import type { TrendSeries } from "../../types";
import { cn } from "../../lib/risk";

const periods = ["7D", "14D", "30D", "1Y"] as const;
const sources = ["⌚ Apple Watch", "⌚ Fitbit", "📱 Mobile Health", "📝 Patient Reported"];

export default function TrendCharts({ trendSeries }: { trendSeries: TrendSeries[] }) {
  const [period, setPeriod] = useState<(typeof periods)[number]>("14D");

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h3 className="text-[13.5px] font-semibold text-ink">Wearable & Health Trends</h3>
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

      <div className="flex flex-wrap gap-2 mb-4">
        {sources.map((s) => (
          <span key={s} className="text-[11px] text-muted px-2 py-1 rounded-full bg-bg border border-border">
            {s}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {trendSeries.map((series) => (
          <div key={series.id} className="border border-border rounded-md p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[12px] font-medium text-ink">{series.label}</p>
              <span className="text-[10.5px] text-muted">{series.source}</span>
            </div>
            <p className="text-[11px] text-muted mb-1">
              Latest:{" "}
              <span className="font-semibold text-ink tabular-nums">
                {series.data[series.data.length - 1].value} {series.unit}
              </span>
            </p>
            <ResponsiveContainer width="100%" height={70}>
              <AreaChart data={series.data}>
                <defs>
                  <linearGradient id={`grad-${series.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#355E3B" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#355E3B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                <Area type="monotone" dataKey="value" stroke="#355E3B" strokeWidth={1.75} fill={`url(#grad-${series.id})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
