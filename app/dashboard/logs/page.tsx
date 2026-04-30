"use client";

import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { getDeliveries } from "../../service/dashboard.service";
import { toast } from "react-hot-toast";
import { useDashboard } from "../DashboardContext";
import { Search, Filter, Loader2, CheckCircle2, AlertCircle, RefreshCw, Server, Globe } from "lucide-react";

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setSidebarOpen } = useDashboard();
  
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await getDeliveries({ 
        limit: 50, 
        status: statusFilter !== "all" ? statusFilter : undefined 
      });
      setLogs(res.data);
    } catch (err) {
      toast.error("Failed to load delivery logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [statusFilter]);

  return (
    <div className="flex flex-col h-full">
      <Header 
        title="Delivery Logs" 
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 animate-fade-in">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-lg">
            {["all", "success", "failed", "pending"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${
                  statusFilter === status 
                    ? "bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm" 
                    : "text-zinc-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-zinc-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <button 
            onClick={fetchLogs} 
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Logs Table */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Event Type</th>
                  <th className="px-6 py-4 font-bold">Endpoint</th>
                  <th className="px-6 py-4 font-bold">Response</th>
                  <th className="px-6 py-4 font-bold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-zinc-400 mb-2" />
                      <p className="text-zinc-500 text-sm">Loading deliveries...</p>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                      No logs found for this filter.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {log.status === "success" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                          {log.status === "failed" && <AlertCircle className="h-4 w-4 text-red-500" />}
                          {log.status === "pending" && <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />}
                          <span className={`text-xs font-bold capitalize ${
                            log.status === 'success' ? 'text-emerald-700 dark:text-emerald-400' :
                            log.status === 'failed' ? 'text-red-700 dark:text-red-400' :
                            'text-blue-700 dark:text-blue-400'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                          {log.event?.type || "unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-xs text-zinc-600 dark:text-zinc-400">
                        {log.webhook?.url || "Deleted Webhook"}
                      </td>
                      <td className="px-6 py-4">
                        {log.responseStatus ? (
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            log.responseStatus >= 200 && log.responseStatus < 300 
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                          }`}>
                            {log.responseStatus}
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-400">N/A</span>
                        )}
                        {log.error && (
                          <p className="text-[10px] text-red-500 mt-1 max-w-[150px] truncate" title={log.error}>
                            {log.error}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-500">
                        {new Date(log.createdAt).toLocaleString()}
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          Attempt {log.attempts}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
