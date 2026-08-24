import { useNavigate } from "react-router-dom";
import { Video, Building2 } from "lucide-react";
import type { Appointment } from "../../types";
import RiskBadge from "../RiskBadge";
import { getPatient } from "../../data/patients";
import PatientAvatar from "../PatientAvatar";

export default function AppointmentRow({ appt }: { appt: Appointment }) {
  const navigate = useNavigate();
  const patient = getPatient(appt.patientId);

  return (
    <button
      onClick={() => navigate(`/patients/${appt.patientId}`)}
      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-border last:border-0"
    >
      <div className="w-14 shrink-0">
        <p className="text-[13px] font-semibold text-ink tabular-nums">{appt.time}</p>
      </div>
      {patient && <PatientAvatar name={patient.name} color={patient.avatarColor} size="sm" />}
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-medium text-ink truncate">{appt.patientName}</p>
        <div className="flex items-center gap-1.5 text-[12px] text-muted mt-0.5">
          {appt.modality === "Video consultation" ? (
            <Video className="w-3 h-3" />
          ) : (
            <Building2 className="w-3 h-3" />
          )}
          <span className="truncate">{appt.type}</span>
        </div>
      </div>
      <RiskBadge risk={appt.risk} />
    </button>
  );
}
