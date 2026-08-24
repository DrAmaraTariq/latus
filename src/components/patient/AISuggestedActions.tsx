import type { AISuggestion } from "../../types";
import { useEvidence } from "../../hooks/useEvidence";

export default function AISuggestedActions({ suggestions }: { suggestions: AISuggestion[] }) {
  const { openEvidence } = useEvidence();

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13.5px] font-semibold text-ink flex items-center gap-1.5">
          <span>🤖</span> AI Suggested Actions
        </h3>
      </div>
      <p className="text-[11.5px] text-muted mb-3">AI-generated suggestions for physician review.</p>
      <div className="space-y-2">
        {suggestions.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between gap-3 px-3.5 py-2.5 border border-border rounded-md"
          >
            <p className="text-[13px] text-ink">{s.text}</p>
            <button
              onClick={() => openEvidence(s.evidenceKey)}
              className="text-[12px] font-medium text-brand-700 hover:text-brand-600 shrink-0 transition-colors"
            >
              View Evidence
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
