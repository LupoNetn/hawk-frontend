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
import { getDashboardStats, getDeliveries } from "../service/dashboard.service";
import { toast } from "react-hot-toast";
import { useDashboard } from "./DashboardContext";

export default function DashboardPage() {
  const [org, setOrg] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebarOpen } = useDashboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgRes, statsRes, deliveriesRes] = await Promise.all([
          getMe(),
          getDashboardStats(),
          getDeliveries({ limit: 5 })
        ]);
        setOrg(orgRes.data);
        setDashboardStats(statsRes.data);
        setRecentActivity(deliveriesRes.data);
      } catch (err: any) {
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const statsList = [
    { label: "Total Events", value: dashboardStats?.overview?.totalEvents || 0, icon: Zap },
    { label: "Success Rate", value: `${dashboardStats?.overview?.successRate || 0}%`, icon: CheckCircle2 },
    { label: "Total Deliveries", value: dashboardStats?.overview?.totalDeliveries || 0, icon: AlertCircle },
    { label: "Active Webhooks", value: dashboardStats?.overview?.activeWebhooks || 0, icon: Clock },
  ];

  return (
    <div className="flex flex-col">
      <Header 
        title={org ? `Welcome, ${org.name}` : "Overview"} 
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            // Skeleton Stats
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                  <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                </div>
                <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              </div>
            ))
          ) : (
            statsList.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 sm:px-6 py-4 dark:border-zinc-800">
              <h3 className="text-sm font-bold tracking-tight">Recent Activity</h3>
              <Link href="/dashboard/logs" className="text-xs font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
                View all
              </Link>
            </div>
            
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 overflow-x-auto">
              {isLoading ? (
                // Skeleton List
                [1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="h-2 w-2 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                      <div className="space-y-2 w-full max-w-xs">
                        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-3 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              ) : recentActivity.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-sm">
                  No deliveries yet. Try triggering an event!
                </div>
              ) : (
                recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group min-w-[400px] sm:min-w-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`h-2 w-2 rounded-full shrink-0 ${item.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold font-mono truncate">{item.event?.type}</p>
                        <p className="text-[10px] sm:text-xs text-zinc-500 truncate max-w-[150px] sm:max-w-xs">{item.webhook?.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <span className="text-[10px] font-medium text-zinc-400">{new Date(item.createdAt).toLocaleTimeString()}</span>
                      <Link href="/dashboard/logs" className="text-zinc-400 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions / Getting Started */}
          <div className="space-y-6">
            <div className="rounded-xl bg-black p-6 text-white dark:bg-zinc-900 shadow-xl shadow-black/10">
              <h3 className="text-lg font-bold mb-2">Ready for production?</h3>
              <p className="text-sm text-zinc-400 mb-6">Complete your setup to start delivering at scale.</p>
              
              <ul className="space-y-4">
                {[
                  { label: "Create your first webhook", done: dashboardStats?.overview?.activeWebhooks > 0 },
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

              <Link href="/dashboard/webhooks" className="mt-8 w-full rounded-lg bg-white py-2 text-xs font-bold text-black hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                Continue Setup
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
