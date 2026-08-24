import type { LucideIcon } from "lucide-react";

export default function OverviewCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-lg px-4 py-3.5 flex items-center gap-3 shadow-subtle">
      <div
        className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
        style={{ backgroundColor: accent ? `${accent}14` : "#F1F5F1" }}
      >
        <Icon className="w-[17px] h-[17px]" style={{ color: accent ?? "#355E3B" }} strokeWidth={2} />
      </div>
      <div>
        <p className="text-[19px] font-semibold text-ink leading-tight tabular-nums">{value}</p>
        <p className="text-[12px] text-muted leading-tight mt-0.5">{label}</p>
      </div>
    </div>
  );
}
