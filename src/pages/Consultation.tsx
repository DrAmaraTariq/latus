import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import AppShell from "../layouts/AppShell";
import PatientAvatar from "../components/PatientAvatar";
import { getPatient } from "../data/patients";
import {
  clinicalSummary,
  concerns,
  aiSuggestions,
  soapNoteDraft,
} from "../data/sarahMitchell";

export default function Consultation() {
  const { patientId } = useParams();
  const [notes, setNotes] = useState("");
  const [soapGenerated, setSoapGenerated] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!patientId) return <Navigate to="/patients" replace />;
  const patient = getPatient(patientId);
  if (!patient) return <Navigate to="/patients" replace />;

  const isSarah = patientId === "sarah-mitchell";

  return (
    <AppShell title="Consultation" breadcrumb={patient.name}>
      <div className="flex items-center gap-3 mb-5">
        <PatientAvatar name={patient.name} color={patient.avatarColor} size="lg" />
        <div>
          <h2 className="text-[18px] font-semibold text-ink">{patient.name}</h2>
          <p className="text-[13px] text-muted">{patient.age} • {patient.sex}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
            <h3 className="text-[13.5px] font-semibold text-ink mb-3 flex items-center gap-1.5">
              <span>🤖</span> AI Briefing
            </h3>

            <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-1.5">
              Key findings
            </p>
            <ul className="space-y-1 mb-3">
              {(isSarah ? clinicalSummary.findings : []).map((f) => (
                <li key={f.id} className="text-[12.5px] text-ink flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                  {f.text}
                </li>
              ))}
              {!isSarah && <li className="text-[12.5px] text-muted">No significant findings flagged.</li>}
            </ul>

            <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-1.5">
              Immediate concerns
            </p>
            <ul className="space-y-1 mb-3">
              {(isSarah ? concerns.slice(0, 2) : []).map((c) => (
                <li key={c.id} className="text-[12.5px] text-ink flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-critical mt-1.5 shrink-0" />
                  {c.title}
                </li>
              ))}
              {!isSarah && <li className="text-[12.5px] text-muted">None reported.</li>}
            </ul>

            <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-1.5">
              Suggested actions
            </p>
            <ul className="space-y-1">
              {(isSarah ? aiSuggestions : []).map((s) => (
                <li key={s.id} className="text-[12.5px] text-ink flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                  {s.text}
                </li>
              ))}
              {!isSarah && <li className="text-[12.5px] text-muted">No suggestions available.</li>}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
            <h3 className="text-[13.5px] font-semibold text-ink mb-3">Doctor Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter consultation notes..."
              rows={10}
              className="w-full text-[13.5px] leading-relaxed text-ink px-3.5 py-3 border border-border rounded-md bg-bg focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-600 transition-colors resize-none"
            />
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setSoapGenerated(true)}
                className="px-3.5 py-2 text-[12.5px] font-medium bg-surface border border-border rounded-md text-ink hover:bg-slate-50 transition-colors"
              >
                Generate SOAP Note
              </button>
              <button
                onClick={() => setSaved(true)}
                className="px-3.5 py-2 text-[12.5px] font-medium bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors flex items-center gap-1.5"
              >
                {saved && <CheckCircle2 className="w-3.5 h-3.5" />}
                {saved ? "Saved" : "Save Consultation"}
              </button>
            </div>
          </div>

          {soapGenerated && (
            <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[13.5px] font-semibold text-ink">SOAP Note</h3>
                <span className="text-[10.5px] font-medium text-warning bg-amber-50 px-2 py-0.5 rounded-full">
                  AI-generated draft — physician review required
                </span>
              </div>
              <div className="text-[13px] text-ink leading-relaxed whitespace-pre-line bg-bg border border-border rounded-md p-3.5">
                {isSarah ? soapNoteDraft : "S: No significant complaints reported.\nO: Vitals within normal range.\nA: Stable.\nP: Continue routine monitoring."}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
