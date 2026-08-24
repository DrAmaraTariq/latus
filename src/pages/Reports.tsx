import { FileBarChart } from "lucide-react";
import AppShell from "../layouts/AppShell";

const reports = [
  { name: "Weekly Patient Risk Summary", updated: "Today" },
  { name: "Medication Adherence Overview", updated: "Yesterday" },
  { name: "Cardiology Referrals — Q3", updated: "3 days ago" },
  { name: "Wearable Data Coverage Report", updated: "1 week ago" },
];

export default function Reports() {
  return (
    <AppShell title="Reports">
      <div className="bg-surface border border-border rounded-lg shadow-subtle divide-y divide-border">
        {reports.map((r) => (
          <button
            key={r.name}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors text-left"
          >
            <div className="w-9 h-9 rounded-md bg-brand-50 flex items-center justify-center shrink-0">
              <FileBarChart className="w-4 h-4 text-brand-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-medium text-ink truncate">{r.name}</p>
              <p className="text-[12px] text-muted">Updated {r.updated}</p>
            </div>
          </button>
        ))}
      </div>
    </AppShell>
  );
}
