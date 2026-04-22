import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, BarChart3, Code2, Terminal } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white shadow-md shadow-black/10 dark:shadow-white/5">
              <Code2 className="h-4 w-4 text-white dark:text-black" />
            </div>
            <span className="text-xl font-bold tracking-tight">Hawk</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">Features</Link>
            <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">Login</Link>
            <Link 
              href="/signup" 
              className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all"
            >
              Get Started
            </Link>
          </div>
          <div className="md:hidden">
             <Link href="/signup" className="text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 rounded-full dark:bg-white dark:text-black">Join</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          {/* Background Illustration */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-100/50 via-white to-white dark:from-zinc-900/30 dark:via-black dark:to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-10 dark:opacity-20">
              <Image 
                src="/hero_background_abstract_1776866263140.png" 
                alt="Background" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                Reliability Redefined
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-b from-black via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent leading-tight sm:leading-[1.1]">
              The Webhook Engine <br className="hidden sm:block" /> You Can Trust.
            </h1>
            <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Deliver millions of events with sub-millisecond latency. Hawk provides the infrastructure so you can focus on building your product.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/signup"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-base font-bold text-white shadow-lg hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all active:scale-95"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#docs" className="group flex items-center gap-2 text-base font-semibold leading-6 hover:text-black dark:hover:text-white transition-colors">
                Read documentation 
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Code Preview */}
          <div className="mx-auto mt-16 w-full max-w-4xl px-2 sm:px-0 animate-fade-in [animation-delay:200ms]">
            <div className="group relative rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  <Terminal className="h-3 w-3" />
                  POST /events
                </div>
              </div>
              <div className="overflow-x-auto p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed">
                <div className="flex gap-4">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">01</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">curl -X POST https://api.hawk.dev/events \</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">02</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">  -H "Authorization: Bearer <span className="text-zinc-500">{"<YOUR_API_KEY>"}</span>" \</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">03</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">  -d '{"{"}</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">04</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">    "type": "payment.succeeded",</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">05</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">    "payload": {"{"} "status": "paid" {"}"}</span>
                </div>
                <div className="flex gap-4 mt-1">
                  <span className="text-zinc-300 dark:text-zinc-800 select-none">06</span>
                  <span className="text-zinc-900 dark:text-zinc-100 whitespace-nowrap text-wrap">  {"}"}'</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 sm:py-32 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative group p-6 rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900/50 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-5">
                  <Zap className="h-5 w-5 text-white dark:text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2">Ultra-low Latency</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-6">Events are processed and delivered in under 50ms, ensuring real-time consistency across your stack.</p>
              </div>
              <div className="relative group p-6 rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900/50 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-5">
                  <Shield className="h-5 w-5 text-white dark:text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2">Enterprise Security</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-6">Automated HMAC signing and secret rotation to protect your endpoints from unauthorized access.</p>
              </div>
              <div className="relative group p-6 rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900/50 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-5">
                  <BarChart3 className="h-5 w-5 text-white dark:text-black" />
                </div>
                <h3 className="text-lg font-bold mb-2">Infinite Scalability</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-6">Whether it's 10 or 10 million events, Hawk scales horizontally to meet your peak demands.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 sm:py-32 px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-extrabold sm:text-5xl mb-6 tracking-tight">Ready to build the future?</h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-10">Join thousands of developers who trust Hawk for their mission-critical infrastructure.</p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-black px-10 py-3.5 text-lg font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all shadow-xl"
            >
              Get started for free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-4 bg-zinc-50 dark:bg-black">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-5 w-5" />
              <span className="text-xl font-bold tracking-tight">Hawk</span>
            </div>
            <p className="text-zinc-500 max-w-xs text-xs leading-5">The modern infrastructure for reliable, secure, and observable webhook delivery.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[10px] uppercase tracking-widest text-zinc-400">Product</h4>
            <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-[10px] uppercase tracking-widest text-zinc-400">Company</h4>
            <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Hawk Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-black dark:hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
