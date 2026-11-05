"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PulseLogo } from "@/components/ui/logo";

interface PatientNavbarProps {
  readonly activeLanguage?: "en" | "ar";
  readonly onLanguageToggle?: () => void;
  readonly patientName?: string;
}

export function PatientNavbar({
  activeLanguage = "en",
  onLanguageToggle,
  patientName = "Mohamed Hassan",
}: PatientNavbarProps) {
  const [internalLang, setInternalLang] = useState<"en" | "ar">(activeLanguage);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    if (onLanguageToggle) {
      onLanguageToggle();
    } else {
      setInternalLang((prev) => (prev === "en" ? "ar" : "en"));
    }
  };

  const currentLang = onLanguageToggle ? activeLanguage : internalLang;

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full h-[81px] bg-[#02307D] border-b border-[#1B458A]">
      <div className="w-full max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/patient"
          className="flex items-center group transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg shrink-0"
        >
          <PulseLogo size="md" theme="light" />
        </Link>

        {/* Center: Navigation Pill Bar (Home, About, Contact, عربي) matching Figma */}
        <nav
          aria-label="Patient Portal Navigation"
          className="hidden md:inline-flex items-center h-[48px] bg-[#153F87] border border-[#244B8F] rounded-2xl p-1 gap-1 text-sm shadow-inner"
        >
          <Link
            href="/patient"
            className="h-[36px] min-w-[80px] inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0072C6] text-white font-medium px-5 rounded-xl shadow-sm transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors cursor-pointer"
            title="Switch language"
          >
            {currentLang === "en" ? "عربي" : "English"}
          </button>
        </nav>

        {/* Right: Patient Profile / Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-[#153F87] transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
            aria-expanded={profileMenuOpen}
            aria-label="User menu"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0080DF] to-[#00B4D8] border-2 border-white/40 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {patientName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-white text-sm font-semibold leading-tight">
                {patientName}
              </span>
              <span className="text-cyan-200/80 text-xs font-normal">
                Patient ID: #PID-84920
              </span>
            </div>
            <span
              className={`hidden sm:inline-block text-white/80 text-xs transition-transform duration-200 ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            >
              ⌄
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-bold text-[#02307D]">{patientName}</p>
                <p className="text-xs text-slate-500">patient@pulseid.eg</p>
              </div>
              <Link
                href="/patient/profile"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 text-slate-700 hover:text-[#0080DF] transition-colors"
                onClick={() => setProfileMenuOpen(false)}
              >
                <span>👤</span>
                <span>My Health Profile</span>
              </Link>
              <Link
                href="/patient/records"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 text-slate-700 hover:text-[#0080DF] transition-colors"
                onClick={() => setProfileMenuOpen(false)}
              >
                <span>📋</span>
                <span>Medical History</span>
              </Link>
              <Link
                href="/patient/access"
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 text-slate-700 hover:text-[#0080DF] transition-colors"
                onClick={() => setProfileMenuOpen(false)}
              >
                <span>🔐</span>
                <span>Access Permissions</span>
              </Link>
              <div className="border-t border-slate-100 my-1" />
              <Link
                href="/"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => setProfileMenuOpen(false)}
              >
                <span>🚪</span>
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

