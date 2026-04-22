"use client";

import { useState } from "react";
import { Header } from "../../../components/Header";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { api } from "../../../lib/api";
import { 
  ArrowLeft, 
  Globe, 
  Shield, 
  Zap, 
  Info,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function NewWebhookPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    subscriptions: [] as string[],
  });

  const availableEvents = [
    "user.created",
    "user.updated",
    "payment.succeeded",
    "payment.failed",
    "subscription.created",
    "subscription.deleted",
  ];

  const handleEventToggle = (event: string) => {
    setFormData(prev => ({
      ...prev,
      subscriptions: prev.subscriptions.includes(event)
        ? prev.subscriptions.filter(e => e !== event)
        : [...prev.subscriptions, event]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.subscriptions.length === 0) {
      return toast.error("Please select at least one event type");
    }

    setIsLoading(true);
    try {
      await api("/webhook", {
        method: "POST",
        body: JSON.stringify({
          url: formData.url,
          subscriptions: formData.subscriptions,
          // name: formData.name // Backend might not support name yet based on schema audit
        }),
      });
      toast.success("Webhook created successfully!");
      router.push("/dashboard/webhooks");
    } catch (err: any) {
      toast.error(err.message || "Failed to create webhook");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Header title="Create Webhook" />
      
      <div className="mx-auto w-full max-w-3xl p-8 animate-fade-in">
        <Link href="/dashboard/webhooks" className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Endpoints
        </Link>

        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight">New Endpoint</h2>
          <p className="mt-2 text-zinc-500">Configure where you want Hawk to deliver your event notifications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* URL Section */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Globe className="h-4 w-4 text-zinc-500" />
              </div>
              <h3 className="font-bold">Endpoint Details</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="url" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Destination URL
                </label>
                <input
                  id="url"
                  type="url"
                  required
                  placeholder="https://api.yourdomain.com/webhooks"
                  className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
                <p className="text-[10px] text-zinc-400">Must be a public HTTPS URL (except for localhost in development).</p>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-zinc-500" />
                </div>
                <h3 className="font-bold">Select Events</h3>
              </div>
              <button 
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, subscriptions: availableEvents }))}
                className="text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white"
              >
                Select All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableEvents.map(event => (
                <label 
                  key={event}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    formData.subscriptions.includes(event) 
                      ? 'border-black bg-zinc-50 dark:border-white dark:bg-zinc-800/50' 
                      : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800'
                  }`}
                >
                  <span className="text-sm font-mono">{event}</span>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-white"
                    checked={formData.subscriptions.includes(event)}
                    onChange={() => handleEventToggle(event)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div className="flex gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
            <Info className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold mb-1">HMAC Security</p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Hawk will generate a unique signing secret for this endpoint. Every delivery will include an <code className="text-[10px] bg-zinc-200 dark:bg-zinc-800 px-1 rounded">X-Hawk-Signature</code> header that you should use to verify the request integrity.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Link href="/dashboard/webhooks" className="text-sm font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-xl active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Endpoint"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
