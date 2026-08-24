import { useNavigate } from "react-router-dom";
import type { Patient } from "../../types";
import PatientAvatar from "../PatientAvatar";

export default function PatientHeader({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  const score = patient.healthScore ?? 0;
  const isHigh = patient.risk === "high-risk";

  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <PatientAvatar name={patient.name} color={patient.avatarColor} size="lg" />
        <div>
          <h2 className="text-[19px] font-semibold text-ink">{patient.name}</h2>
          <p className="text-[13px] text-muted mt-0.5">
            {patient.age} Years • {patient.sex}
          </p>
          <p className="text-[12px] text-muted mt-0.5">Patient ID: {patient.mrn}</p>
          <div className="flex items-center gap-4 mt-2 text-[12px]">
            <span className="text-muted">
              Last consultation: <span className="text-ink font-medium">{patient.lastConsultation}</span>
            </span>
            <span className="text-muted">
              Next appointment: <span className="text-ink font-medium">{patient.nextAppointment}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 lg:border-l lg:border-border lg:pl-5">
        <div>
          <p className="text-[10.5px] uppercase tracking-wide text-muted font-medium mb-1">Health Score</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-[26px] font-semibold tabular-nums ${isHigh ? "text-critical" : "text-ink"}`}>
              {score}
            </span>
            <span className="text-[13px] text-muted">/ 100</span>
          </div>
          {isHigh && (
            <span className="inline-block mt-1 text-[11px] font-semibold text-critical bg-red-50 px-2 py-0.5 rounded-full">
              HIGH RISK
            </span>
          )}
          <p className="text-[11.5px] text-muted mt-1.5 max-w-[180px]">
            Needs physician review today
          </p>
        </div>
        <button
          onClick={() => navigate(`/consultation/${patient.id}`)}
          className="px-4 py-2.5 bg-brand-600 text-white text-[13px] font-medium rounded-md hover:bg-brand-700 transition-colors whitespace-nowrap self-start lg:self-auto"
        >
          Start Consultation
        </button>
      </div>
    </div>
  );
}
