import { cn } from "../lib/risk";

export default function PatientAvatar({
  name,
  color,
  size = "md",
}: {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  const sizeClasses = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-10 h-10 text-[13px]",
    lg: "w-14 h-14 text-[18px]",
  };
  return (
    <div
      className={cn(
        "rounded-full text-white flex items-center justify-center font-semibold shrink-0",
        sizeClasses[size]
      )}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
