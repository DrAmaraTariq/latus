import type { TimelineEvent } from "../../types";

export default function PatientTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
      <h3 className="text-[13.5px] font-semibold text-ink mb-4">Patient Timeline</h3>
      <div className="relative pl-5">
        <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border" />
        <div className="space-y-5">
          {events.map((e) => (
            <div key={e.id} className="relative">
              <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-brand-600 ring-4 ring-surface" />
              <p className="text-[11px] font-medium text-brand-700 uppercase tracking-wide">{e.when}</p>
              <p className="text-[13.5px] font-medium text-ink mt-0.5">{e.title}</p>
              {e.detail && <p className="text-[12.5px] text-muted mt-0.5">{e.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
