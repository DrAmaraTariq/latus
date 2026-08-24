import type { RiskLevel } from "../types";
import { riskConfig, cn } from "../lib/risk";

export default function RiskBadge({ risk, size = "sm" }: { risk: RiskLevel; size?: "sm" | "md" }) {
  const c = riskConfig[risk];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        c.bg,
        c.text,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
