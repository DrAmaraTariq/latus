import type { ClinicalSummary as ClinicalSummaryType } from "../../types";
import { useEvidence } from "../../hooks/useEvidence";

export default function ClinicalSummary({ summary, evidenceKey = "activity-decline" }: { summary: ClinicalSummaryType; evidenceKey?: string }) {
  const { openEvidence } = useEvidence();

  return (
    <div className="bg-brand-50/50 border border-brand-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13.5px] font-semibold text-ink flex items-center gap-1.5">
          <span>🤖</span> AI Clinical Summary
        </h3>
        <span className="text-[11.5px] font-medium text-brand-700 bg-white px-2 py-0.5 rounded-full border border-brand-100">
          Confidence: {summary.confidence}%
        </span>
      </div>

      <ul className="space-y-1.5 mb-3">
        {summary.findings.map((f) => (
          <li key={f.id} className="text-[13px] text-ink flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />
            {f.text}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-[11.5px] text-muted">
          Based on: {summary.basedOn.join(" • ")}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openEvidence(evidenceKey)}
            className="px-3 py-1.5 text-[12px] font-medium bg-surface border border-border rounded-md text-ink hover:bg-slate-50 transition-colors"
          >
            View Evidence
          </button>
          <button className="px-3 py-1.5 text-[12px] font-medium text-brand-700 hover:text-brand-600 transition-colors">
            Why am I seeing this?
          </button>
        </div>
      </div>
    </div>
  );
}
