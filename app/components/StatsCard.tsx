import { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">{value}</h3>
          
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              <span className={cn(
                "text-xs font-bold",
                trend.isUp ? "text-emerald-500" : "text-red-500"
              )}>
                {trend.isUp ? "+" : "-"}{trend.value}
              </span>
              <span className="text-[10px] text-zinc-500">vs last 24h</span>
            </div>
          )}
        </div>
        
        <div className="rounded-lg bg-zinc-50 p-2 dark:bg-zinc-800">
          <Icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
