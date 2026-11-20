"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full h-[81px] bg-[#02307d] border-b border-[rgba(255,255,255,0.1)] pb-px" data-node-id="665:3519">
      <div className="w-full max-w-[1280px] mx-auto h-[80px] px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo matching Figma 665:3522 */}
        <Link
          href="/"
          className="flex items-center gap-[12px] group focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg shrink-0"
        >
          <div className="w-[32px] h-[30px] relative shrink-0">
            <Image
              src="/favicon.svg"
              alt="PulseID Logo"
              width={32}
              height={30}
              className="size-full object-contain"
              priority
            />
          </div>
          <span className="font-sans font-bold text-[18px] text-white tracking-[0.9px]">
            PULSEID
          </span>
        </Link>

        {/* Center: Navigation Pill Bar matching Figma 665:3545 */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] rounded-[12px] p-[7px] gap-[4px] text-[14px]"
        >
          <Link
            href="/"
            className="flex items-center gap-[6px] bg-[#078bde] text-[#eaedf6] font-normal px-[20px] py-[8px] rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-colors"
          >
            <span className="size-[6px] rounded-full bg-cyan-300" />
            <span>Home</span>
          </Link>
          <a
            href="#solutions"
            className="text-[#eaedf6] hover:text-white px-[20px] py-[8px] rounded-[12px] transition-colors"
          >
            solutions
          </a>
          <a
            href="#how-it-works"
            className="text-[#eaedf6] hover:text-white px-[20px] py-[8px] rounded-[12px] transition-colors"
          >
            How it works
          </a>
          <a
            href="#our-work"
            className="text-[#eaedf6] hover:text-white px-[20px] py-[8px] rounded-[12px] transition-colors"
          >
            Our Work
          </a>
          <a
            href="#about"
            className="text-[#eaedf6] hover:text-white px-[20px] py-[8px] rounded-[12px] transition-colors"
          >
            About
          </a>
        </nav>

        {/* Right: Actions matching Figma 665:3557 */}
        <div className="hidden sm:flex items-center gap-[12px] shrink-0">
          <Link
            href="/auth/login"
            className="bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] text-[#eaedf6] hover:text-white text-[14px] font-normal px-[21px] py-[10px] rounded-[8px] transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/auth/role"
            className="bg-[#078bde] hover:bg-[#067bc5] text-[#eaedf6] hover:text-white text-[14px] font-normal px-[24px] py-[10px] rounded-[8px] flex items-center gap-[8px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-all group"
          >
            <span>Create Account</span>
            <Image
              src="/assets/landing-new/c9cf6cd0a7c6dfa87288b32055694afae2dc1896.svg"
              alt=""
              width={12}
              height={12}
              className="size-[12px] transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white"
            aria-label="Toggle navigation menu"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#02307d] border-b border-white/10 px-6 py-4 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white py-2 font-medium"
          >
            Home
          </Link>
          <a
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2"
          >
            solutions
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2"
          >
            How it works
          </a>
          <a
            href="#our-work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2"
          >
            Our Work
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-300 hover:text-white py-2"
          >
            About
          </a>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-white/10 text-white font-medium"
            >
              Log In
            </Link>
            <Link
              href="/auth/role"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#078bde] text-white font-medium flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <Image
                src="/assets/landing-new/c9cf6cd0a7c6dfa87288b32055694afae2dc1896.svg"
                alt=""
                width={12}
                height={12}
                className="size-[12px]"
              />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
