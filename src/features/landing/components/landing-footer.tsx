"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PulseLogo } from "@/components/ui/logo";

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#03307D] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Centered Brand Logo */}
        <div className="mb-8">
          <PulseLogo size="lg" theme="light" />
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer Navigation" className="mb-12">
          <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-medium text-slate-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter Subscription Box matching Figma */}
        <div className="w-full max-w-xl bg-[#021845]/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl mb-4 sm:mb-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Stay Updated with PulseID
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
            Get the latest announcements, clinical protocol releases, and security
            advisories sent directly to your inbox.
          </p>

          {isSubscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 py-3 px-4 rounded-xl text-sm font-medium animate-in fade-in duration-300">
              ✓ Thank you! You have been added to the PulseID advisory updates list.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work or clinical email"
                  required
                  className="w-full bg-[#010D27] border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0080DF] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0080DF] hover:bg-[#0072C6] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/30 shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-400 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </footer>
  );
}
