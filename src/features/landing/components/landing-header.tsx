"use client";

import React, { useState } from "react";
import { PulseLogo } from "@/components/ui/logo";
import { LANDING_NAV_LINKS } from "@/lib/constants";
import { Menu, X, Clock } from "lucide-react";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#1C344D]/80 bg-[#07111F]/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Identity / Home Anchor */}
        <a
          href="#intro"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded-xl p-1"
          aria-label="PulseID Home"
        >
          <PulseLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8"
        >
          {LANDING_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#9BAFC3] hover:text-[#F4F8FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded-md px-2 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#countdown"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#102238] border border-[#1C344D] text-[#35D6E8] hover:text-[#F4F8FC] hover:border-[#2589FF]/60 hover:bg-[#102238]/90 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
          >
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Launch Countdown</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-[#9BAFC3] hover:text-[#F4F8FC] hover:bg-[#102238] border border-transparent hover:border-[#1C344D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1C344D] bg-[#07111F]/98 backdrop-blur-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-3">
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#F4F8FC] hover:text-[#35D6E8] py-2 px-3 rounded-lg hover:bg-[#102238] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-[#1C344D]">
            <a
              href="#countdown"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2589FF] text-[#07111F] text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#35D6E8]"
            >
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>Launch Countdown</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
