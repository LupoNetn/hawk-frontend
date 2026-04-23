"use client";

import { useState } from "react";
import { Header } from "../../components/Header";
import { useDashboard } from "../DashboardContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiKeyService } from "@/app/service/apikey.service";
import { Key, Plus, Trash2, Copy, Check, AlertCircle, Loader2, Shield } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ApiKeysPage() {
  const { setSidebarOpen } = useDashboard();
  const queryClient = useQueryClient();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { data, isPending, isError } = useQuery({
    queryKey: ["apikeys"],
    queryFn: apiKeyService.getApiKeys
  });

  const createMutation = useMutation({
    mutationFn: () => apiKeyService.createApiKey({ name: newKeyName }),
    onSuccess: (data: any) => {
      setGeneratedKey(data.apiKey);
      setNewKeyName("");
      setIsCreating(false);
      queryClient.invalidateQueries({ queryKey: ["apikeys"] });
      toast.success("API key generated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create API key");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: apiKeyService.deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apikeys"] });
      toast.success("API key revoked successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to revoke API key");
    }
  });

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseGeneratedKey = () => {
    setGeneratedKey(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="API Keys" onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="p-4 sm:p-8 animate-fade-in max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">API Keys</h2>
            <p className="text-xs sm:text-sm text-zinc-500">Manage access to your organization's resources.</p>
          </div>
          
          {!isCreating && !generatedKey && (
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Generate New Key</span>
            </button>
          )}
        </div>

        {/* Create Key Form */}
        {isCreating && (
          <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="text-sm font-bold mb-4">Create New API Key</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text"
                placeholder="e.g. Production Environment"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-black dark:focus:border-white dark:focus:ring-white transition-all"
                autoFocus
              />
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => createMutation.mutate()}
                  disabled={!newKeyName.trim() || createMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Generate"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Generated Key Alert */}
        {generatedKey && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10 animate-fade-in">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Save your API key</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400/80 mt-1 mb-4">
                  Please copy this key and save it somewhere safe. For security reasons, <strong>we cannot show it to you again</strong>.
                </p>
                
                <div className="flex items-center gap-2 group">
                  <div className="flex-1 rounded-lg bg-white dark:bg-black border border-emerald-200 dark:border-emerald-500/20 px-4 py-3 font-mono text-sm break-all text-black dark:text-white relative overflow-hidden">
                    {generatedKey}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px] pointer-events-none" />
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="p-3 rounded-lg border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-black dark:hover:bg-zinc-900 transition-all shrink-0 shadow-sm"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                
                <button 
                  onClick={handleCloseGeneratedKey}
                  className="mt-6 text-xs font-bold text-emerald-700 underline dark:text-emerald-400 hover:opacity-80"
                >
                  I have saved my key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Keys List */}
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 px-6 py-3">
            <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <div className="col-span-4 sm:col-span-3">Name</div>
              <div className="col-span-5 sm:col-span-6">Key Preview</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {isPending && (
              <div className="p-6 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
              </div>
            )}
            
            {isError && (
              <div className="p-6 text-center text-sm text-red-500 flex flex-col items-center">
                <AlertCircle className="h-6 w-6 mb-2" />
                Failed to load API keys
              </div>
            )}

            {!isPending && !isError && data?.data?.length === 0 && (
              <div className="p-12 text-center">
                <Key className="h-8 w-8 text-zinc-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">No API keys found</h3>
                <p className="text-xs text-zinc-500 mt-1">Generate your first key to start using the API.</p>
              </div>
            )}

            {data?.data?.map((apiKey: any) => (
              <div key={apiKey.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <div className="col-span-4 sm:col-span-3 min-w-0">
                  <p className="text-sm font-bold truncate text-zinc-900 dark:text-white">{apiKey.name}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Created {new Date(apiKey.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="col-span-5 sm:col-span-6 min-w-0">
                  <code className="text-xs font-mono px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400 truncate block">
                    {apiKey.keyHash}
                  </code>
                </div>
                <div className="col-span-3 flex justify-end">
                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to revoke this key? This action cannot be undone.")) {
                        deleteMutation.mutate(apiKey.id);
                      }
                    }}
                    disabled={deleteMutation.isPending && deleteMutation.variables === apiKey.id}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                    title="Revoke Key"
                  >
                    {deleteMutation.isPending && deleteMutation.variables === apiKey.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
