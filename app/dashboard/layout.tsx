"use client";

import { Sidebar } from "../components/Sidebar";
import { DashboardProvider, useDashboard } from "./DashboardContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-grow flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
