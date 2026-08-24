import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  CalendarDays,
  Users,
  Sparkles,
  Stethoscope,
  MessageSquare,
  FileBarChart,
  Settings,
} from "lucide-react";
import { cn } from "../lib/risk";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/patients/sarah-mitchell", label: "Clinical Intelligence", icon: Sparkles },
  { to: "/consultation/sarah-mitchell", label: "Consultations", icon: Stethoscope },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/reports", label: "Reports", icon: FileBarChart },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-surface h-screen sticky top-0">
      <div className="h-16 flex items-center px-5 border-b border-border">
        <span className="text-[15px] font-semibold tracking-wide text-ink">
          LATUS
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-muted hover:bg-slate-50 hover:text-ink"
              )
            }
          >
            <item.icon className="w-[17px] h-[17px]" strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-3 space-y-0.5">
        <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13.5px] font-medium text-muted hover:bg-slate-50 hover:text-ink transition-colors">
          <Settings className="w-[17px] h-[17px]" strokeWidth={2} />
          Settings
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md">
          <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
            RP
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-ink truncate">Dr. Patel</p>
            <p className="text-[11px] text-muted truncate">Cardiology</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
