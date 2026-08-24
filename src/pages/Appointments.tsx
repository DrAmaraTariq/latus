import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import AppShell from "../layouts/AppShell";
import RiskBadge from "../components/RiskBadge";
import PatientAvatar from "../components/PatientAvatar";
import { appointments } from "../data/appointments";
import { getPatient } from "../data/patients";
import { cn } from "../lib/risk";

const views = ["Today", "Week", "Month"] as const;

export default function Appointments() {
  const [view, setView] = useState<(typeof views)[number]>("Today");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <AppShell title="Appointments">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1 bg-surface border border-border rounded-md p-0.5">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-3 py-1.5 text-[12.5px] font-medium rounded transition-colors",
                view === v ? "bg-brand-50 text-brand-700" : "text-muted hover:text-ink"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-slate-50 text-muted">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="text-[13.5px] font-medium text-ink">Sunday, August 23, 2026</p>
          <button className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:bg-slate-50 text-muted">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
        {appointments.map((a) => {
          const patient = getPatient(a.patientId);
          const isOpen = expandedId === a.id;
          return (
            <div key={a.id} className="border-b border-border last:border-0">
              <button
                onClick={() => setExpandedId(isOpen ? null : a.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-16 shrink-0">
                  <p className="text-[14px] font-semibold text-ink tabular-nums">{a.time}</p>
                </div>
                {patient && <PatientAvatar name={patient.name} color={patient.avatarColor} />}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-ink truncate">{a.patientName}</p>
                  <div className="flex items-center gap-1.5 text-[12.5px] text-muted mt-0.5">
                    {a.modality === "Video consultation" ? (
                      <Video className="w-3.5 h-3.5" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" />
                    )}
                    <span>{a.type}</span>
                    <span>•</span>
                    <span>{a.modality}</span>
                  </div>
                </div>
                <RiskBadge risk={a.risk} size="md" />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pl-[6.5rem] flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/patients/${a.patientId}`)}
                    className="px-3 py-1.5 text-[12.5px] font-medium border border-border rounded-md text-ink hover:bg-slate-50 transition-colors"
                  >
                    Open patient
                  </button>
                  <button
                    onClick={() => navigate(`/consultation/${a.patientId}`)}
                    className="px-3 py-1.5 text-[12.5px] font-medium bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
                  >
                    Start consultation
                  </button>
                  <button
                    onClick={() => setExpandedId(null)}
                    className="px-3 py-1.5 text-[12.5px] font-medium text-muted hover:text-ink transition-colors"
                  >
                    View details
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
