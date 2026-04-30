"use client";

import Link from "next/link";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface DocsSidebarProps {
  navItems: NavGroup[];
  activeSection: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DocsSidebar({ navItems, activeSection, isOpen, onClose }: DocsSidebarProps) {
  return (
    <>
      {/* Mobile Navigation Drawer Overlay */}
      <div className={cn(
        "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )} onClick={onClose} />
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 p-6 transform transition-transform duration-300 lg:sticky lg:top-28 lg:z-0 lg:w-64 lg:p-0 lg:border-none lg:bg-transparent lg:dark:bg-transparent lg:translate-x-0 lg:self-start h-screen lg:h-auto overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="lg:hidden flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="Hawk Logo" className="h-6 w-6 object-contain dark:invert" />
            <span className="text-xl font-bold tracking-tight">Hawk Docs</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900">
             <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="space-y-8 pb-20 lg:pb-0">
          {navItems.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 px-3">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link 
                    key={item.id}
                    href={`#${item.id}`} 
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all",
                      activeSection === item.id 
                        ? "bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white font-semibold" 
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-900/50 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
