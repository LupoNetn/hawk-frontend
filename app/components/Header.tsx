"use client";

import { Bell, Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header({ title }: { title: string }) {
  const router = useRouter();

  const handleNewWebhook = () => {
    router.push("/dashboard/webhooks/new");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search events or webhooks..."
            className="h-9 w-64 rounded-lg border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-xs focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-white dark:focus:ring-white transition-all"
          />
        </div>
        
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-all">
          <Bell className="h-4 w-4" />
        </button>

        <button 
          onClick={handleNewWebhook}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95"
        >
          <Plus className="h-4 w-4" />
          New Webhook
        </button>
      </div>
    </header>
  );
}
