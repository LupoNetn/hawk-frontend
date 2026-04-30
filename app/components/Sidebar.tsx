"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Webhook, 
  History, 
  Key, 
  Settings, 
  LogOut,
  Code2,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "../lib/utils";
import { getMe, logout } from "../service/auth.service";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Webhook, label: "Webhooks", href: "/dashboard/webhooks" },
  { icon: History, label: "Delivery Logs", href: "/dashboard/logs" },
  { icon: Key, label: "API Keys", href: "/dashboard/keys" },
  { icon: Code2, label: "Documentation", href: "/docs" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [org, setOrg] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Successfully logged out");
      router.push("/login");
    } catch (err: any) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6 transition-transform duration-300 dark:border-zinc-800 dark:bg-black lg:sticky lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-2 mb-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <img src="/favicon.png" alt="Hawk Logo" className="h-full w-full object-contain dark:invert" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Hawk</span>
          </div>
          <button 
            className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
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
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all disabled:opacity-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            {isLoggingOut ? "Signing out..." : "Sign Out"}
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
    </>
  );
}
