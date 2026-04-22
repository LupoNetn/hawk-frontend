"use client";

import { Header } from "../../components/Header";
import { Webhook, Plus, MoreVertical, Shield, Globe, Power } from "lucide-react";

const webhooks = [
  { id: 1, name: "Production API", url: "https://api.myapp.com/webhooks", status: "active", events: ["user.created", "payment.succeeded"] },
  { id: 2, name: "Slack Notifications", url: "https://hooks.slack.com/services/...", status: "active", events: ["order.placed"] },
  { id: 3, name: "Staging Environment", url: "https://staging.myapp.com/webhooks", status: "inactive", events: ["*"] },
];

export default function WebhooksPage() {
  return (
    <div className="flex flex-col">
      <Header title="Webhooks" />
      
      <div className="p-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Endpoints</h2>
            <p className="text-sm text-zinc-500">Manage your webhook destinations and event filters.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-black hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-white transition-all">
              <Shield className="h-4 w-4" />
              Manage Secrets
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95">
              <Plus className="h-4 w-4" />
              Add Endpoint
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {webhooks.map((hook) => (
            <div key={hook.id} className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-10 w-10 rounded-xl flex items-center justify-center ${hook.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                    <Webhook className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold">{hook.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${hook.status === 'active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                        {hook.status}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                      <Globe className="h-3 w-3" />
                      {hook.url}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hook.events.map((event) => (
                        <span key={event} className="rounded-md bg-zinc-50 px-2 py-1 text-[10px] font-medium text-zinc-600 border border-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                    <Power className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {webhooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center mb-4">
              <Webhook className="h-8 w-8 text-zinc-300" />
            </div>
            <h3 className="text-lg font-bold">No webhooks yet</h3>
            <p className="text-zinc-500 mb-6">Start by adding your first delivery endpoint.</p>
            <button className="flex items-center gap-2 rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all">
              <Plus className="h-4 w-4" />
              Add your first endpoint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
