import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import LatusAssistant from "../components/assistant/LatusAssistant";

interface AppShellProps {
  title: string;
  breadcrumb?: string;
  children: ReactNode;
}

export default function AppShell({ title, breadcrumb, children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header title={title} breadcrumb={breadcrumb} />
        <main className="flex-1 px-6 py-6 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
      <LatusAssistant />
    </div>
  );
}
