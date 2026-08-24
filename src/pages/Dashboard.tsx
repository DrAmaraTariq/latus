import { CalendarCheck, RotateCcw, AlertTriangle, MessageSquare } from "lucide-react";
import AppShell from "../layouts/AppShell";
import OverviewCard from "../components/dashboard/OverviewCard";
import AppointmentRow from "../components/dashboard/AppointmentRow";
import AttentionPatientCard from "../components/dashboard/AttentionPatientCard";
import { appointments } from "../data/appointments";
import { patients } from "../data/patients";
import { recentChanges } from "../data/misc";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const attentionPatients = patients.filter(
    (p) => p.risk === "high-risk" || p.risk === "needs-review" || p.flag
  );

  return (
    <AppShell title="Dashboard">
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-ink">Good morning, Dr. Patel</h2>
        <p className="text-[13.5px] text-muted mt-1">Here's what needs your attention today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <OverviewCard label="Today's Appointments" value={8} icon={CalendarCheck} accent="#355E3B" />
        <OverviewCard label="Follow-ups" value={3} icon={RotateCcw} accent="#6B7280" />
        <OverviewCard label="Patients Requiring Review" value={2} icon={AlertTriangle} accent="#DC2626" />
        <OverviewCard label="Unread Messages" value={5} icon={MessageSquare} accent="#F59E0B" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-[13.5px] font-semibold text-ink">Upcoming Appointments</h3>
              <button
                onClick={() => navigate("/appointments")}
                className="text-[12px] font-medium text-brand-600 hover:text-brand-700"
              >
                View all
              </button>
            </div>
            <div>
              {appointments.slice(0, 4).map((a) => (
                <AppointmentRow key={a.id} appt={a} />
              ))}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-[13.5px] font-semibold text-ink">Recent Patient Changes</h3>
            </div>
            <div>
              {recentChanges.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/patients/${c.patientId}`)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border last:border-0 hover:bg-slate-50 transition-colors text-left"
                >
                  <p className="text-[13px] text-ink">
                    <span className="font-medium">{c.patientName}</span>{" "}
                    <span className="text-muted">— {c.text}</span>
                  </p>
                  <span className="text-[11px] text-muted shrink-0">{c.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
            <h3 className="text-[13.5px] font-semibold text-ink mb-3">Patients Needing Attention</h3>
            <div className="space-y-2">
              {attentionPatients.map((p) => (
                <AttentionPatientCard key={p.id} patient={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
