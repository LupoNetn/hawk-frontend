"use client";

import { Header } from "../../components/Header";
import { Webhook, Plus, MoreVertical, Shield, Globe, Power, AlertCircle, Loader2, Clock } from "lucide-react";
import { useDashboard } from "../DashboardContext";
import { useQuery } from "@tanstack/react-query";
import { webhooksService } from "@/app/service/webhook.service";
import Link from "next/link";

export default function WebhooksPage() {
  const { setSidebarOpen } = useDashboard();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["webhooks"],
    queryFn: webhooksService.getWebhooks
  })

  return (
    <div className="flex flex-col">
      <Header title="Webhooks" onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="p-4 sm:p-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Endpoints</h2>
            <p className="text-xs sm:text-sm text-zinc-500">Manage your webhook destinations and filters.</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-black hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-white transition-all">
              <Shield className="h-3.5 w-3.5 sm:h-4 w-4" />
              <span className="hidden xs:inline">Secrets</span>
              <span className="xs:hidden">Secrets</span>
            </button>
            <Link 
              href="/dashboard/webhooks/new"
              className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-black px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 w-4" />
              <span>Add Endpoint</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {isPending && (
            [1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 sm:p-6 dark:border-zinc-900 dark:bg-zinc-900/20 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-48 bg-zinc-100 dark:bg-zinc-800/50 rounded" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-md" />
                      <div className="h-5 w-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-12 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
              <AlertCircle className="h-8 w-8 text-red-500 mb-3" />
              <h3 className="text-sm font-bold text-red-800 dark:text-red-400">Failed to load webhooks</h3>
              <p className="text-xs text-red-600 dark:text-red-400/60 mt-1">{(error as any)?.message || "Internal server error"}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 text-xs font-bold text-red-700 underline dark:text-red-400"
              >
                Try refreshing
              </button>
            </div>
          )}

          {data?.data
            ?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            ?.map((hook: any) => (
            <div key={hook.id} className="group relative rounded-xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
              <Link href={`/dashboard/webhooks/${hook.id}`} className="block p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${hook.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                      <Webhook className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-bold truncate group-hover:text-black dark:group-hover:text-white transition-colors">{hook.name || "Unnamed Endpoint"}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${hook.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                          {hook.status}
                        </span>
                      </div>
                    <div className="mt-1 flex flex-col gap-1">
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-zinc-500">
                        <Globe className="h-3 w-3 shrink-0 mt-1" />
                        <span className="break-all">{hook.url}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>Created {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(hook.createdAt))}</span>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                      {hook.subscriptions?.map((event: string) => (
                        <span key={event} className="rounded-md bg-zinc-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium text-zinc-600 border border-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
                
              <div className="absolute top-4 right-4 flex items-center gap-1 sm:gap-2">
                 <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white transition-all">
                  <Power className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white transition-all">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isPending && !isError && (!data?.data || data.data.length === 0) && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-center">
            <div className="h-12 w-12 sm:h-16 sm:w-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
              <Webhook className="h-6 w-6 sm:h-8 sm:w-8 text-zinc-300" />
            </div>
            <h3 className="text-base sm:text-lg font-bold">No webhooks yet</h3>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6 max-w-[200px] sm:max-w-none">Start by adding your first delivery endpoint.</p>
            <Link 
              href="/dashboard/webhooks/new"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add your first endpoint
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
