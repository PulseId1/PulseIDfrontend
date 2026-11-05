"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MobilePatientHeaderProps {
  readonly patientName?: string;
}

export function MobilePatientHeader({
  patientName = "Mohamed Hassan",
}: MobilePatientHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="block lg:hidden w-full bg-[#01091E] text-white pt-2 pb-4 px-4 border-b border-white/10">
      {/* Top Greeting Row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/patient/profile"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0080DF] to-[#00B4D8] border border-white/30 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
          >
            {patientName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-slate-300 font-normal leading-tight">Welcome back</p>
            <h2 className="text-base font-bold text-white truncate leading-tight mt-0.5">
              {patientName}
            </h2>
          </div>
        </div>

        {/* Notification Bell */}
        <Link
          href="/patient/notifications"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white/90 shrink-0 relative transition-colors"
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </Link>
      </div>

      {/* Search Bar matching Figma Home-patient-mobile.pdf (Search medical records) */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medical records"
          className="w-full h-11 pl-10 pr-4 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-slate-400 text-sm rounded-xl border border-white/15 focus:border-[#0080DF] focus:outline-none focus:ring-1 focus:ring-[#0080DF] transition-all"
        />
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}

