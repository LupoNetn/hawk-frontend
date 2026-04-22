"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Webhook, 
  History, 
  Key, 
  Settings, 
  LogOut,
  Code2,
  ChevronRight
} from "lucide-react";
import { cn } from "../lib/utils";
import { getMe } from "../service/auth.service";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Webhook, label: "Webhooks", href: "/dashboard/webhooks" },
  { icon: History, label: "Delivery Logs", href: "/dashboard/logs" },
  { icon: Key, label: "API Keys", href: "/dashboard/keys" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [org, setOrg] = useState<any>(null);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await getMe();
        setOrg(response.data);
      } catch (err) {
        // Silently fail or handle redirect to login
      }
    };
    fetchOrg();
  }, []);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-black">
      <div className="flex items-center gap-2.5 px-2 mb-10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white shadow-lg shadow-black/10 dark:shadow-white/5">
          <Code2 className="h-5 w-5 text-white dark:text-black" />
        </div>
        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Hawk</span>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <nav className="space-y-1">
          <p className="px-2 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Main Menu</p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-4 w-4", isActive ? "text-black dark:text-white" : "text-zinc-400 group-hover:text-black dark:group-hover:text-white")} />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="h-3 w-3 text-zinc-400" />}
              </Link>
            );
          })}
        </nav>

        <nav className="space-y-1">
          <p className="px-2 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Account</p>
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  isActive 
                    ? "bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-black dark:text-white" : "text-zinc-400")} />
                {item.label}
              </Link>
            );
          })}
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
            onClick={() => {/* Handle Logout */}}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </nav>
      </div>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
             <div className="h-full w-full bg-gradient-to-br from-zinc-400 to-zinc-600" />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold truncate">{org?.name || "Organization"}</p>
            <p className="text-[10px] text-zinc-500 truncate">{org?.email || "Free Plan"}</p>
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div className="h-full w-[65%] bg-black dark:bg-white rounded-full" />
        </div>
        <p className="mt-2 text-[10px] text-zinc-500">6,500 / 10,000 events used</p>
      </div>
    </aside>
  );
}
