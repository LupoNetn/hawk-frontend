"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { webhooksService } from "@/app/service/webhook.service";
import { Header } from "../../../components/Header";
import { useDashboard } from "../../DashboardContext";
import { 
  Globe, 
  Shield, 
  Clock, 
  ArrowLeft, 
  Copy, 
  Check, 
  Trash2, 
  Zap, 
  AlertCircle,
  Loader2,
  Key
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function WebhookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { setSidebarOpen } = useDashboard();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["webhook", id],
    queryFn: () => webhooksService.getWebhookById(id as string),
    enabled: !!id,
  });

  const webhook = data?.data;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (isPending) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Loading..." onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      </div>
    );
  }

  if (isError || !webhook) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header title="Error" onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex flex-1 flex-col items-center justify-center p-4">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold">Webhook not found</h2>
          <p className="text-zinc-500 mt-2 text-center max-w-xs">We couldn't find the webhook you're looking for or you don't have permission to view it.</p>
          <Link href="/dashboard/webhooks" className="mt-6 text-sm font-bold underline">Back to list</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={webhook.name} onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="p-4 sm:p-8 animate-fade-in max-w-5xl">
        <div className="mb-8">
          <Link 
            href="/dashboard/webhooks" 
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Webhooks
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{webhook.name}</h1>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400`}>
                  Active
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Created {new Date(webhook.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span>HMAC-SHA256 Protected</span>
                </div>
              </div>
            </div>
            
            <button className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-all dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              <Trash2 className="h-4 w-4" />
              Delete Endpoint
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Endpoint Configuration */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="font-bold text-lg">Endpoint Configuration</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Payload URL</label>
                  <div className="flex items-center gap-2 group">
                    <div className="flex-1 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 px-4 py-3 font-mono text-xs sm:text-sm break-all">
                      {webhook.url}
                    </div>
                    <button 
                      onClick={() => copyToClipboard(webhook.url, "URL")}
                      className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all shrink-0"
                    >
                      {copiedField === "URL" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Signing Secret</label>
                  <div className="flex items-center gap-2 group">
                    <div className="flex-1 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 px-4 py-3 font-mono text-xs sm:text-sm break-all relative overflow-hidden">
                      {webhook.secret}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
                    </div>
                    <button 
                      onClick={() => copyToClipboard(webhook.secret, "Secret")}
                      className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all shrink-0"
                    >
                      {copiedField === "Secret" ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400">Use this secret to verify that payloads are coming from Hawk.</p>
                </div>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="font-bold text-lg">Subscriptions</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {webhook.subscriptions.map((event: string) => (
                  <div key={event} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-100 dark:border-zinc-800">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="rounded-2xl bg-black dark:bg-white p-6 text-white dark:text-black shadow-xl">
               <h4 className="text-sm font-bold mb-2">Delivery Stats</h4>
               <p className="text-xs opacity-70 mb-4">You have 0 deliveries recorded for this endpoint yet.</p>
               <div className="flex items-end gap-1">
                 <span className="text-4xl font-black">0%</span>
                 <span className="text-[10px] font-bold uppercase mb-1 opacity-60">Success Rate</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
