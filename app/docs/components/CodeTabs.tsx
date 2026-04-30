"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "../../lib/utils";

interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

interface CodeTabsProps {
  snippets: CodeSnippet[];
}

export function CodeTabs({ snippets }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
        <div className="flex">
          {snippets.map((snippet, index) => (
            <button
              key={snippet.label}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative py-3 px-4 text-xs font-medium transition-colors",
                activeTab === index 
                  ? "text-black dark:text-white" 
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              )}
            >
              {snippet.label}
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-all"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-4 select-none text-[10px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
           <Terminal className="h-3 w-3" />
           {snippets[activeTab].language}
        </div>
        <pre className="overflow-x-auto p-6 pt-12 text-sm font-mono leading-relaxed text-zinc-800 dark:text-zinc-300">
          <code>{snippets[activeTab].code}</code>
        </pre>
      </div>
    </div>
  );
}
