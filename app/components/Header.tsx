"use client";

import { Bell, Search, Plus, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const router = useRouter();

  const handleNewWebhook = () => {
    router.push("/dashboard/webhooks/new");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 sm:px-8 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <img src="/favicon.png" alt="Hawk Logo" className="h-6 w-6 object-contain dark:invert" />
        </div>
        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 lg:hidden mx-1" />
        <h1 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white truncate max-w-[150px] sm:max-w-none">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-40 lg:w-64 rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-xs focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-white dark:focus:ring-white transition-all"
          />
        </div>
        
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-all">
          <Bell className="h-4 w-4" />
        </button>

        <button 
          onClick={handleNewWebhook}
          className="flex items-center gap-2 rounded-lg bg-black px-3 sm:px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden xs:inline">New Webhook</span>
        </button>
      </div>
    </header>
  );
}
