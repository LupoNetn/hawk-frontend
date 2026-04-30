"use client";

import Link from "next/link";
import { 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Key, 
  Webhook, 
  ArrowRight, 
  Info, 
  Code2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getMe } from "../service/auth.service";
import { DocsHeader } from "./components/DocsHeader";
import { DocsSidebar } from "./components/DocsSidebar";
import { CodeTabs } from "./components/CodeTabs";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  const sectionRefs = {
    introduction: useRef<HTMLElement>(null),
    authentication: useRef<HTMLElement>(null),
    webhooks: useRef<HTMLElement>(null),
    "sending-events": useRef<HTMLElement>(null),
    verification: useRef<HTMLElement>(null),
    reliability: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe();
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const eventSnippets = [
    {
      language: "bash",
      label: "cURL",
      code: `curl -X POST https://api.hawk.dev/events \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "order.completed",
    "payload": {
      "id": "ord_123",
      "amount": 49.99
    }
  }'`
    },
    {
      language: "javascript",
      label: "JavaScript",
      code: `await fetch('https://api.hawk.dev/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_API_KEY>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'order.completed',
    payload: { id: 'ord_123', amount: 49.99 }
  })
});`
    },
    {
      language: "go",
      label: "Go",
      code: `package main

import (
    "bytes"
    "net/http"
)

func main() {
    url := "https://api.hawk.dev/events"
    jsonBody := []byte(\`{"type": "order.completed", "payload": {"id": "ord_123"}}\`)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
    req.Header.Set("Authorization", "Bearer <YOUR_API_KEY>")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    client.Do(req)
}`
    },
    {
      language: "python",
      label: "Python",
      code: `import requests

url = "https://api.hawk.dev/events"
headers = {
    "Authorization": "Bearer <YOUR_API_KEY>",
    "Content-Type": "application/json"
}
payload = {
    "type": "order.completed",
    "payload": {"id": "ord_123", "amount": 49.99}
}

requests.post(url, json=payload, headers=headers)`
    }
  ];

  const verifySnippets = [
    {
      language: "javascript",
      label: "Node.js",
      code: `const crypto = require('crypto');

const signature = req.headers['x-hawk-signature'];
const hmac = crypto.createHmac('sha256', process.env.HAWK_SECRET);
const digest = hmac.update(JSON.stringify(req.body)).digest('hex');

if (signature === digest) {
    console.log("Verified!");
}`
    },
    {
      language: "go",
      label: "Go",
      code: `package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
)

func verify(payload []byte, signature string, secret string) bool {
    h := hmac.New(sha256.New, []byte(secret))
    h.Write(payload)
    expected := hex.EncodeToString(h.Sum(nil))
    return expected == signature
}`
    },
    {
      language: "python",
      label: "Python",
      code: `import hmac
import hashlib

def verify(payload_bytes, signature, secret):
    expected = hmac.new(
        secret.encode(), 
        payload_bytes, 
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)`
    }
  ];

  const navGroups = [
    { label: "Getting Started", items: [
      { id: "introduction", label: "Introduction" },
      { id: "authentication", label: "Authentication" },
    ]},
    { label: "Core Concepts", items: [
      { id: "webhooks", label: "Managing Webhooks" },
      { id: "sending-events", label: "Sending Events" },
    ]},
    { label: "Security", items: [
      { id: "verification", label: "Verifying Signatures" },
    ]},
    { label: "Advanced", items: [
      { id: "reliability", label: "Reliability & Retries" },
    ]}
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <DocsHeader onMenuClick={() => setIsMobileMenuOpen(true)} isLoggedIn={isLoggedIn} />

      <div className="mx-auto flex w-full max-w-7xl flex-grow px-4 sm:px-6 lg:px-8 py-12 gap-12 relative">
        <DocsSidebar 
          navItems={navGroups} 
          activeSection={activeSection} 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Main Content */}
        <main className="flex-grow max-w-3xl min-w-0">
          <section id="introduction" ref={sectionRefs.introduction} className="scroll-mt-28 mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight mb-6 sm:text-5xl">Introduction</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-8 mb-8">
              Hawk is a modern webhook engine built for reliability, security, and developer experience. 
              It acts as the infrastructure layer between your services, ensuring that events are 
              delivered successfully even when your targets are temporarily down.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 transition-all hover:shadow-md">
                <Zap className="h-6 w-6 mb-3 text-emerald-500" />
                <h3 className="font-bold mb-1">Instant Delivery</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Sub-millisecond processing from event receipt to first delivery attempt.</p>
              </div>
              <div className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 transition-all hover:shadow-md">
                <ShieldCheck className="h-6 w-6 mb-3 text-blue-500" />
                <h3 className="font-bold mb-1">Guaranteed Security</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Automatic HMAC signing ensures your webhook endpoints are never compromised.</p>
              </div>
            </div>
          </section>

          <hr className="border-zinc-200 dark:border-zinc-800 mb-16" />

          <section id="authentication" ref={sectionRefs.authentication} className="scroll-mt-28 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Key className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Authentication</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-6">
              To interact with the Hawk API, you'll need an API Key. You can generate and manage your keys in the 
              <Link href="/dashboard/keys" className="text-black dark:text-white font-semibold underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-all ml-1">Dashboard</Link>.
            </p>
            <div className="rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900 flex items-start gap-3 border border-zinc-200 dark:border-zinc-800">
              <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Always keep your API Key secret. If a key is compromised, revoke it immediately and generate a new one.
              </p>
            </div>
          </section>

          <section id="webhooks" ref={sectionRefs.webhooks} className="scroll-mt-28 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Webhook className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Managing Webhooks</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-6">
              A Webhook in Hawk represents a destination URL where events will be sent. 
              When creating a webhook, you specify:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <div>
                  <p className="font-bold text-sm">Endpoint URL</p>
                  <p className="text-xs text-zinc-500 mt-1">The public URL of your server that will receive POST requests.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                <div>
                  <p className="font-bold text-sm">Subscribed Events</p>
                  <p className="text-xs text-zinc-500 mt-1">Select exactly which event types this endpoint should receive (e.g., <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">user.created</code>).</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <div>
                  <p className="font-bold text-sm">Secret Key</p>
                  <p className="text-xs text-zinc-500 mt-1">Hawk generates a unique secret for each webhook to sign payloads.</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="sending-events" ref={sectionRefs["sending-events"]} className="scroll-mt-28 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Sending Events</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-6">
              Trigger events by sending a POST request to our event ingest endpoint. 
              Hawk will instantly identify all webhooks subscribed to that event type and queue them for delivery.
            </p>
            
            <CodeTabs snippets={eventSnippets} />
          </section>

          <section id="verification" ref={sectionRefs.verification} className="scroll-mt-28 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Verifying Signatures</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-6">
              To ensure that a webhook was actually sent by Hawk, you should verify the 
              <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono text-xs">X-Hawk-Signature</code> header.
              This signature is a HMAC-SHA256 hash of the request body using your Webhook Secret.
            </p>

            <CodeTabs snippets={verifySnippets} />
          </section>

          <section id="reliability" ref={sectionRefs.reliability} className="scroll-mt-28 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                <Zap className="h-5 w-5 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">Reliability & Retries</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 leading-7 mb-6">
              Hawk uses a high-performance Redis-backed queue system (BullMQ) to manage deliveries. 
              If your endpoint is down or returns an error, we don't just give up.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                  <ArrowRight className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Exponential Backoff</h4>
                  <p className="text-sm text-zinc-500 leading-6">We retry failed deliveries up to 5 times with increasing delays between attempts (1s, 2s, 4s, 8s, 16s).</p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Code2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Observability</h4>
                  <p className="text-sm text-zinc-500 leading-6">Every single attempt, including status codes and error messages, is recorded and available in your logs.</p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-zinc-200 dark:border-zinc-800 mb-16" />

          <section className="bg-zinc-900 rounded-3xl p-8 text-center border border-zinc-800 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
             <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Still have questions?</h2>
             <p className="text-zinc-400 mb-6 max-w-sm mx-auto relative z-10">Our team is here to help you integrate Hawk into your mission-critical systems.</p>
             <button className="relative z-10 rounded-full bg-white px-8 py-2.5 text-sm font-bold text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-lg">
                Contact Support
             </button>
          </section>
        </main>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-4 bg-zinc-50 dark:bg-black mt-12">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Hawk Logo" className="h-4 w-4 object-contain dark:invert opacity-50" />
            <p>&copy; {new Date().getFullYear()} Hawk Inc. Documentation.</p>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <Link href="/dashboard" className="hover:text-black dark:hover:text-white transition-colors">Dashboard</Link>
            <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
