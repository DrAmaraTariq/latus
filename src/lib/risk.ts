import type { RiskLevel } from "../types";

export const riskConfig: Record<RiskLevel, { label: string; bg: string; text: string; dot: string }> = {
  "high-risk": { label: "High Risk", bg: "bg-red-50", text: "text-critical", dot: "bg-critical" },
  "needs-review": { label: "Needs Review", bg: "bg-amber-50", text: "text-warning", dot: "bg-warning" },
  stable: { label: "Stable", bg: "bg-green-50", text: "text-success", dot: "bg-success" },
  "follow-up-due": { label: "Follow-up Due", bg: "bg-slate-100", text: "text-muted", dot: "bg-muted" },
};

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
