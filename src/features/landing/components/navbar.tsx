"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PulseLogo } from "@/components/ui/logo";

interface NavbarProps {
  readonly activeLanguage?: "en" | "ar";
  readonly onLanguageToggle?: () => void;
}

export function Navbar({
  activeLanguage = "en",
  onLanguageToggle,
}: NavbarProps) {
  const [internalLang, setInternalLang] = useState<"en" | "ar">(activeLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="w-full max-w-[1280px] mx-auto h-full px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center group transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg shrink-0"
        >
          <PulseLogo size="md" theme="light" />
        </Link>

        {/* Center: Navigation Pill Bar (Home, About, Contact, عربي) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:inline-flex items-center h-[48px] bg-[#153F87] border border-[#244B8F] rounded-2xl p-1 gap-1 text-sm shadow-inner"
        >
          <Link
            href="/"
            className="h-[36px] min-w-[80px] inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0072C6] text-white font-medium px-5 rounded-xl shadow-sm transition-colors"
          >
            Home
          </Link>
          <a
            href="#about"
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="h-[36px] inline-flex items-center justify-center text-white/90 hover:text-white font-medium px-4 rounded-xl transition-colors cursor-pointer"
            title="Switch language"
          >
            {currentLang === "en" ? "عربي" : "English"}
          </button>
        </nav>

        {/* Right: Authentication Actions (Log In, Create Account →) */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <Link
            href="/auth/login"
            className="h-[41px] min-w-[80px] inline-flex items-center justify-center bg-[#153F87] hover:bg-[#1B4B9D] border border-[#244B8F] text-white font-medium text-sm px-5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="h-[41px] inline-flex items-center justify-center bg-[#0080DF] hover:bg-[#0072C6] text-white font-semibold text-sm px-5 rounded-xl transition-all shadow-md shadow-blue-900/40 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Create Account
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/auth/register"
            className="inline-flex items-center bg-[#0080DF] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
          >
            Join
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:text-cyan-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-[81px] left-0 right-0 border-b border-[#1B458A] bg-[#02307D] p-4 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white font-medium py-2 px-3 rounded-xl bg-[#0080DF] text-sm text-center"
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-white/80 font-medium py-2 px-3 rounded-xl text-sm transition-colors text-center"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-white/80 font-medium py-2 px-3 rounded-xl text-sm transition-colors text-center"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => {
              handleLanguageToggle();
              setMobileMenuOpen(false);
            }}
            className="text-center text-white hover:text-white/80 font-medium py-2 px-3 rounded-xl text-sm transition-colors"
          >
            {currentLang === "en" ? "عربي" : "English"}
          </button>
          <div className="pt-2 border-t border-white/15 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-[#153F87] text-white py-2 rounded-xl text-sm font-medium border border-[#244B8F]"
            >
              Log In
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-[#0080DF] hover:bg-[#0072C6] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
