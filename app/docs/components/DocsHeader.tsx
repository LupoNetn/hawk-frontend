"use client";

import Link from "next/link";
import { Menu, LayoutDashboard } from "lucide-react";

interface DocsHeaderProps {
  onMenuClick: () => void;
  isLoggedIn: boolean | null;
}

export function DocsHeader({ onMenuClick, isLoggedIn }: DocsHeaderProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
              <img src="/favicon.png" alt="Hawk Logo" className="h-full w-full object-contain dark:invert" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Hawk <span className="hidden sm:inline text-zinc-400 font-medium">Docs</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          {isLoggedIn === false && (
            <Link 
              href="/signup" 
              className="hidden sm:block rounded-full bg-black px-5 py-1.5 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
