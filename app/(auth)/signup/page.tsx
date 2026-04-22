"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signup } from "../../service/auth.service";
import { Code2, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signup(formData);
      toast.success("Account created successfully!");
      router.push("/login?message=Account created successfully. Please log in.");
    } catch (err: any) {
      const msg = err.message || "Something went wrong. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Left Side: Illustration & Branding (Hidden on mobile/tablet) */}
      <div className="relative hidden w-[40%] flex-col justify-between bg-zinc-900 p-10 xl:flex">
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/auth_sidebar_illustration_1776866237742.png" 
            alt="Auth Illustration" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Code2 className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Hawk</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md animate-fade-in">
          <h1 className="text-3xl font-bold leading-tight text-white mb-4">
            Join the elite circle of reliable delivery.
          </h1>
          <p className="text-base text-zinc-400 mb-8 leading-relaxed">
            Secure, scalable, and built for the modern developer workflow.
          </p>
          <ul className="space-y-3">
            {[
              "Real-time event tracking",
              "Automated HMAC security",
              "Sub-50ms delivery latency"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-white" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-[10px] uppercase tracking-widest text-zinc-500">
          &copy; {new Date().getFullYear()} Hawk Inc. Trusted by 5,000+ devs.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 xl:w-[60%]">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="xl:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
                <Code2 className="h-5 w-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight">Hawk</span>
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Create account</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Start building your secure webhook infrastructure.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-xs font-medium text-red-500 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                placeholder="Guillermo Rauch"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Work Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                placeholder="guillermo@vercel.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-md active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-black hover:underline dark:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
