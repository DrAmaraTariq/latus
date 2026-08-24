import type { Medication } from "../../types";
import { cn } from "../../lib/risk";

export default function MedicationList({ medications }: { medications: Medication[] }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-3">Medications</h3>
      <div className="grid grid-cols-[1.2fr_0.7fr_1fr_1fr_0.9fr] gap-2 px-1 pb-2 border-b border-border text-[11px] text-muted font-medium">
        <span>Name</span>
        <span>Dose</span>
        <span>Frequency</span>
        <span>Adherence</span>
        <span>Start Date</span>
      </div>
      {medications.map((m) => (
        <div
          key={m.id}
          className="grid grid-cols-[1.2fr_0.7fr_1fr_1fr_0.9fr] gap-2 items-center px-1 py-2.5 border-b border-border last:border-0"
        >
          <span className="text-[13px] font-medium text-ink">{m.name}</span>
          <span className="text-[12.5px] text-muted tabular-nums">{m.dose}</span>
          <span className="text-[12.5px] text-muted">{m.frequency}</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-bg overflow-hidden">
              <div
                className={cn("h-full rounded-full", m.adherence >= 90 ? "bg-success" : m.adherence >= 80 ? "bg-warning" : "bg-critical")}
                style={{ width: `${m.adherence}%` }}
              />
            </div>
            <span className="text-[12px] text-ink tabular-nums w-8">{m.adherence}%</span>
          </div>
          <span className="text-[12px] text-muted tabular-nums">{m.startDate}</span>
        </div>
      ))}
    </div>
  );
}
