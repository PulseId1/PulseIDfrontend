"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";

export function SimulationNotice() {
  const { t } = useAuth();

  return (
    <div
      role="region"
      aria-label="Simulation Notice"
      className="w-full bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl p-3 text-xs flex items-start gap-2.5 text-slate-700"
    >
      <div className="shrink-0 mt-0.5 text-[#0080DF]">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>
      <div className="flex-1 text-slate-600 leading-relaxed text-start">
        <strong className="text-[#002D62] font-semibold me-1">
          {t.simulation.bannerTitle}:
        </strong>
        {t.simulation.bannerText}
      </div>
    </div>
  );
}
