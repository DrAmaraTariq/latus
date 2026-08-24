import { useState } from "react";
import { Sparkles, X, ArrowLeft } from "lucide-react";
import { soapNoteDraft } from "../../data/sarahMitchell";

const options = [
  {
    id: "consult-summary",
    label: "Generate Consultation Summary",
    response:
      "Sarah Mitchell (58F) presents with a 14-day decline in activity, sleep quality, and oxygen saturation, alongside worsening fatigue and shortness of breath. Wearable and patient-reported data show a consistent downward trend across recovery and cardiovascular indicators. Recommend cardiology follow-up and continued monitoring.",
  },
  {
    id: "soap",
    label: "Generate SOAP Note",
    response: soapNoteDraft,
  },
  {
    id: "patient-summary",
    label: "Generate Patient Summary",
    response:
      "58-year-old female with a history of hypertension and hyperlipidemia, currently managed on Metoprolol, Atorvastatin, and Lisinopril. Recent trend data shows declining activity and sleep quality with an emerging cardiovascular risk pattern. Adherence remains fair at 84%.",
  },
  {
    id: "followup",
    label: "Generate Follow-up Instructions",
    response:
      "Return in 7 days or sooner if shortness of breath worsens. Continue current medications as prescribed. Light daily walking as tolerated. Monitor and report any chest pain, dizziness, or significant fatigue immediately.",
  },
];

export default function LatusAssistant() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<typeof options[number] | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {open && (
        <div className="mb-3 w-80 bg-surface border border-border rounded-xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-brand-50">
            <div className="flex items-center gap-2">
              {active && (
                <button onClick={() => setActive(null)} className="text-brand-700 hover:text-brand-600">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <p className="text-[13px] font-semibold text-ink leading-tight">Latus AI</p>
                <p className="text-[11px] text-muted leading-tight">Clinical intelligence assistant</p>
              </div>
            </div>
            <button onClick={() => { setOpen(false); setActive(null); }} className="text-muted hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 max-h-96 overflow-y-auto">
            {!active ? (
              <div className="space-y-1.5">
                {options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setActive(o)}
                    className="w-full text-left px-3 py-2.5 rounded-md border border-border hover:border-brand-600 hover:bg-brand-50/40 transition-colors text-[13px] text-ink font-medium"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-brand-700 mb-2">
                  {active.label}
                </p>
                <div className="bg-bg border border-border rounded-md p-3 text-[12.5px] leading-relaxed text-ink whitespace-pre-line">
                  {active.response}
                </div>
                <p className="mt-2 text-[10.5px] text-muted italic">
                  AI-generated draft — physician review required
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 rounded-full bg-brand-600 text-white shadow-card flex items-center justify-center hover:bg-brand-700 transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
      </button>
    </div>
  );
}
