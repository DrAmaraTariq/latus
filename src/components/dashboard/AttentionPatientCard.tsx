import { useNavigate } from "react-router-dom";
import type { Patient } from "../../types";
import PatientAvatar from "../PatientAvatar";
import RiskBadge from "../RiskBadge";

export default function AttentionPatientCard({ patient }: { patient: Patient }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/patients/${patient.id}`)}
      className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-brand-600/40 hover:bg-slate-50 transition-colors text-left"
    >
      <PatientAvatar name={patient.name} color={patient.avatarColor} />
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-medium text-ink truncate">{patient.name}</p>
        <p className="text-[12px] text-muted">{patient.age} • {patient.sex}</p>
      </div>
      <div className="text-right shrink-0">
        <RiskBadge risk={patient.risk} />
        {patient.flag && <p className="text-[11px] text-muted mt-1">{patient.flag}</p>}
      </div>
    </button>
  );
}
