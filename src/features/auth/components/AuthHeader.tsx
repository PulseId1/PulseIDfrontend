"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PulseLogo } from "@/components/ui/logo";
import { useAuth } from "../context/AuthContext";

export function AuthHeader() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useAuth();

  const isRoleStep = pathname.includes("/auth/role") || pathname === "/auth";
  const isDetailsStep =
    pathname.includes("/auth/login") || pathname.includes("/auth/register");
  const currentStepNumber = isRoleStep ? 1 : isDetailsStep ? 2 : 3;

  return (
    <header className="w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0080DF] rounded-lg p-1 transition-opacity hover:opacity-90"
          title="Return to PulseID home"
        >
          <PulseLogo size="md" theme="dark" />
        </Link>

        {/* Step Indicator Progress Bar (Hidden on narrow mobile, visible on sm+) */}
        <nav
          aria-label="Authentication progress"
          className="hidden sm:flex items-center gap-2 text-xs font-medium"
        >
          {/* Step 1: Role */}
          <div
            className={`flex items-center gap-1.5 transition-colors ${
              currentStepNumber >= 1 ? "text-[#0080DF] font-semibold" : "text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                currentStepNumber > 1
                  ? "bg-[#0080DF] text-white border-[#0080DF]"
                  : currentStepNumber === 1
                  ? "bg-[#0080DF]/10 text-[#0080DF] border-[#0080DF]"
                  : "bg-transparent text-slate-400 border-slate-300"
              }`}
            >
              {currentStepNumber > 1 ? "✓" : "1"}
            </span>
            <span>{t.steps.role}</span>
          </div>

          <div
            className={`w-6 h-0.5 rounded-full transition-colors ${
              currentStepNumber >= 2 ? "bg-[#0080DF]" : "bg-slate-200"
            }`}
          />

          {/* Step 2: Details */}
          <div
            className={`flex items-center gap-1.5 transition-colors ${
              currentStepNumber >= 2 ? "text-[#0080DF] font-semibold" : "text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                currentStepNumber > 2
                  ? "bg-[#0080DF] text-white border-[#0080DF]"
                  : currentStepNumber === 2
                  ? "bg-[#0080DF]/10 text-[#0080DF] border-[#0080DF]"
                  : "bg-transparent text-slate-400 border-slate-300"
              }`}
            >
              {currentStepNumber > 2 ? "✓" : "2"}
            </span>
            <span>{t.steps.details}</span>
          </div>

          <div
            className={`w-6 h-0.5 rounded-full transition-colors ${
              currentStepNumber >= 3 ? "bg-[#0080DF]" : "bg-slate-200"
            }`}
          />

          {/* Step 3: Verification */}
          <div
            className={`flex items-center gap-1.5 transition-colors ${
              currentStepNumber >= 3 ? "text-[#0080DF] font-semibold" : "text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                currentStepNumber === 3
                  ? "bg-[#0080DF]/10 text-[#0080DF] border-[#0080DF]"
                  : "bg-transparent text-slate-400 border-slate-300"
              }`}
            >
              3
            </span>
            <span>{t.steps.verify}</span>
          </div>
        </nav>

        {/* Right side: Language Switcher */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:text-[#0080DF] hover:border-[#0080DF]/40 transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
          >
            <span>🌐</span>
            <span>{t.switchLanguage}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
