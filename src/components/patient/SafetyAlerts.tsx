import { ShieldAlert } from "lucide-react";
import type { SafetyItem } from "../../types";
import { cn } from "../../lib/risk";

export default function SafetyAlerts({ items }: { items: SafetyItem[] }) {
  return (
    <div className="bg-red-50/60 border border-red-100 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <ShieldAlert className="w-4 h-4 text-critical" />
        <h3 className="text-[13px] font-semibold text-critical">Critical Safety Information</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.id}
            className={cn(
              "px-2.5 py-1 rounded-full text-[12px] font-medium border",
              item.severity === "critical"
                ? "bg-white text-critical border-red-200"
                : "bg-white text-warning border-amber-200"
            )}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
