"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "../../service/auth.service";
import { Code2, Loader2, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      toast.success(msg);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      toast.success("Welcome back!");
      router.push("/dashboard"); 
    } catch (err: any) {
      const msg = err.message || "Invalid credentials. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

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
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
              <img src="/favicon.png" alt="Hawk Logo" className="h-full w-full object-contain invert" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Hawk</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md animate-fade-in">
          <h1 className="text-3xl font-bold leading-tight text-white mb-4">
            Welcome back to the command center.
          </h1>
          <p className="text-base text-zinc-400 mb-8 leading-relaxed">
            Monitor, manage, and scale your webhook deliveries with precision.
          </p>
          <ul className="space-y-3">
            {[
              "End-to-end encryption",
              "Detailed delivery logs",
              "Advanced retry controls"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-white" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-[10px] uppercase tracking-widest text-zinc-500">
          &copy; {new Date().getFullYear()} Hawk Inc. The gold standard for developers.
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 xl:w-[60%]">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="xl:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden">
                <img src="/favicon.png" alt="Hawk Logo" className="h-full w-full object-contain dark:invert" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Hawk</span>
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                placeholder="guillermo@hawk.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-lg border border-zinc-200 bg-transparent px-4 py-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:focus:border-white dark:focus:ring-white transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
            New to Hawk?{" "}
            <Link href="/signup" className="font-bold text-black hover:underline dark:text-white transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black"><Loader2 className="h-6 w-6 animate-spin text-zinc-400" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
