import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hawk - Reliable Webhook Delivery",
  description: "The modern infrastructure for reliable, secure, and observable webhook delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 5000,
            className: "dark:bg-zinc-950 dark:text-white dark:border-zinc-800",
            style: {
              background: "#000000",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "13px",
              letterSpacing: "-0.01em",
              borderRadius: "10px",
              padding: "10px 14px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
              fontFamily: "var(--font-geist-mono), monospace",
            },
            success: {
              icon: "✓",
              style: {
                borderLeft: "2px solid #10b981",
              },
            },
            error: {
              icon: "✕",
              style: {
                borderLeft: "2px solid #ef4444",
              },
            },
          }}
        />
       <Providers>
        {children}
       </Providers>
    </body>
    </html>
  );
}
