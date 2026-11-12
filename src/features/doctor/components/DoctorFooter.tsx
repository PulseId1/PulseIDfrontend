"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Check, ArrowRight } from "lucide-react";

export function DoctorFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#01091E] py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div
        className="max-w-[1280px] mx-auto bg-[#02307D] border border-[rgba(52,216,225,0.25)] rounded-[24px] p-8 sm:p-12 shadow-[0px_25px_50px_-12px_rgba(2,24,68,0.5)] flex flex-col items-center gap-8 relative overflow-hidden"
        data-node-id="353:10025"
        data-name="Contained Centered Content Card"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-[#078BDE]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-[#03449E]/20 blur-3xl pointer-events-none" />

        {/* Item 1: Centered Pulse ID Logo Lockup matching Figma Node 353:10027 */}
        <Link href="/doctor" className="flex items-center gap-3 relative z-10 group">
          <div className="bg-white/10 border border-white/20 rounded-[8px] size-10 flex items-center justify-center p-1 shadow-xs group-hover:bg-white/15 transition-colors">
            <Image
              src="/assets/figma/landing/pulseid-logo.svg"
              alt="PulseID Logo"
              width={24}
              height={24}
              className="w-6 h-6 brightness-0 invert"
            />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white font-heading">
            PULSEID
          </span>
        </Link>

        {/* Item 2: Horizontal Navigation Menu matching Figma Node 353:10052 */}
        <nav
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm sm:text-base font-medium text-white/90 relative z-10"
          data-node-id="353:10052"
        >
          <Link href="/doctor" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/doctor/find-patient" className="hover:text-white transition-colors">
            My Patients
          </Link>
          <Link href="/doctor/access-requests" className="hover:text-white transition-colors">
            Access Requests
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms &amp; Conditions
          </Link>
        </nav>

        {/* Item 3: Newsletter Box matching Figma Node 353:10064 */}
        <div
          className="w-full max-w-[576px] backdrop-blur-md bg-[rgba(1,11,31,0.65)] border border-[rgba(7,139,222,0.3)] rounded-[16px] p-6 sm:p-8 flex flex-col items-center gap-3 text-center relative z-10 shadow-lg"
          data-node-id="353:10064"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            Stay Updated with Pulse ID
          </h3>
          <p className="text-xs sm:text-sm text-[#EAEDF6]/80 max-w-[448px] leading-relaxed">
            Get the latest announcements, clinical protocol releases, and security advisories sent directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="w-full max-w-[448px] mt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work or clinical email"
                className="w-full h-11 pl-10 pr-3 rounded-[8px] bg-white/5 border border-white/20 text-white placeholder-white/50 text-xs sm:text-sm focus:outline-none focus:border-[#078BDE] focus:ring-1 focus:ring-[#078BDE] transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-[8px] bg-[#078BDE] hover:bg-[#0677BF] text-white font-bold text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-[#8B8B8B] mt-1">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Item 4: Social Media Icons matching Figma Node 353:10085 */}
        <div
          className="flex items-center gap-4 relative z-10"
          data-node-id="353:10085"
        >
          <a
            href="https://www.facebook.com/share/19kGnJB7Bf/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center text-white hover:bg-[#078BDE] hover:border-[#078BDE] transition-all shadow-xs"
            title="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center text-white hover:bg-[#078BDE] hover:border-[#078BDE] transition-all shadow-xs"
            title="X (Twitter)"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/pulseid.eg?obrf=b3hqdTYwam9qMGs1"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center text-white hover:bg-[#078BDE] hover:border-[#078BDE] transition-all shadow-xs"
            title="Instagram"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/pulseid-tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="size-10 rounded-[12px] bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] flex items-center justify-center text-white hover:bg-[#078BDE] hover:border-[#078BDE] transition-all shadow-xs"
            title="LinkedIn"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/50 pt-2 border-t border-white/10 w-full text-center">
          © 2026 PulseID Healthcare Platform. All rights reserved. Egyptian Medical Syndicate Compliant.
        </div>
      </div>
    </footer>
  );
}
