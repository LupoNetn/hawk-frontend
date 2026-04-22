"use client";

import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { StatsCard } from "../components/StatsCard";
import { 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MoreHorizontal,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { getMe } from "../service/auth.service";
import { toast } from "react-hot-toast";

const stats = [
  { label: "Total Events", value: "12,482", icon: Zap, trend: { value: "12%", isUp: true } },
  { label: "Success Rate", value: "99.2%", icon: CheckCircle2, trend: { value: "0.5%", isUp: true } },
  { label: "Failed Deliveries", value: "42", icon: AlertCircle, trend: { value: "2%", isUp: false } },
  { label: "Avg. Latency", value: "48ms", icon: Clock, trend: { value: "4ms", isUp: true } },
];

const recentActivity = [
  { id: 1, type: "payment.succeeded", status: "delivered", time: "2 mins ago", endpoint: "https://api.myapp.com/webhooks" },
  { id: 2, type: "user.created", status: "delivered", time: "5 mins ago", endpoint: "https://api.myapp.com/webhooks" },
  { id: 3, type: "order.placed", status: "failed", time: "12 mins ago", endpoint: "https://hooks.slack.com/services/..." },
  { id: 4, type: "subscription.deleted", status: "delivered", time: "18 mins ago", endpoint: "https://api.myapp.com/webhooks" },
  { id: 5, type: "invoice.paid", status: "delivered", time: "25 mins ago", endpoint: "https://api.myapp.com/webhooks" },
];

export default function DashboardPage() {
  const [org, setOrg] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await getMe();
        setOrg(response.data);
      } catch (err: any) {
        toast.error("Failed to load organization profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrg();
  }, []);

  return (
    <div className="flex flex-col">
      <Header title={org ? `Welcome, ${org.name}` : "Overview"} />
      
      <div className="p-8 space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <h3 className="text-sm font-bold tracking-tight">Recent Activity</h3>
              <Link href="/dashboard/logs" className="text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                View all logs
              </Link>
            </div>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${item.status === 'delivered' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="text-sm font-bold font-mono">{item.type}</p>
                      <p className="text-xs text-zinc-500 truncate max-w-[200px] sm:max-w-xs">{item.endpoint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium text-zinc-400">{item.time}</span>
                    <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Getting Started */}
          <div className="space-y-6">
            <div className="rounded-xl bg-black p-6 text-white dark:bg-zinc-900 shadow-xl shadow-black/10">
              <h3 className="text-lg font-bold mb-2">Ready for production?</h3>
              <p className="text-sm text-zinc-400 mb-6">Complete your setup to start delivering at scale.</p>
              
              <ul className="space-y-4">
                {[
                  { label: "Create your first webhook", done: true },
                  { label: "Verify your domain", done: false },
                  { label: "Configure HMAC secrets", done: false },
                ].map((step, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`flex h-5 w-5 items-center justify-center rounded-full ${step.done ? 'bg-emerald-500' : 'border border-zinc-700'}`}>
                      {step.done && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-xs font-medium ${step.done ? 'text-zinc-300' : 'text-zinc-500'}`}>{step.label}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full rounded-lg bg-white py-2 text-xs font-bold text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                Continue Setup
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <h4 className="text-sm font-bold mb-4">Integrations</h4>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-lg bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                    <div className="h-5 w-5 bg-zinc-300 dark:bg-zinc-600 rounded-sm" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[10px] text-zinc-500">Connect your favorite tools to automate your workflow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
