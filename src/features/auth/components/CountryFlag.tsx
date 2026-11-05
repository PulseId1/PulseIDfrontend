"use client";

import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
}

export function CountryFlag({ code, className = "w-5 h-3.5" }: CountryFlagProps) {
  if (code === "EG") {
    return (
      <svg
        className={`rounded-xs overflow-hidden shrink-0 border border-slate-200/60 ${className}`}
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="600" height="133.3" fill="#CE1126" />
        <rect y="133.3" width="600" height="133.3" fill="#FFFFFF" />
        <rect y="266.6" width="600" height="133.4" fill="#000000" />
        {/* Eagle of Saladin in center */}
        <circle cx="300" cy="200" r="28" fill="#C09300" opacity="0.9" />
      </svg>
    );
  }

  if (code === "SA") {
    return (
      <svg
        className={`rounded-xs overflow-hidden shrink-0 border border-slate-200/60 ${className}`}
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="600" height="400" fill="#007A3D" />
        <line x1="200" y1="230" x2="400" y2="230" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
      </svg>
    );
  }

  if (code === "AE") {
    return (
      <svg
        className={`rounded-xs overflow-hidden shrink-0 border border-slate-200/60 ${className}`}
        viewBox="0 0 600 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="600" height="133.3" fill="#00732F" />
        <rect y="133.3" width="600" height="133.3" fill="#FFFFFF" />
        <rect y="266.6" width="600" height="133.4" fill="#000000" />
        <rect width="150" height="400" fill="#FF0000" />
      </svg>
    );
  }

  // Fallback generic
  return (
    <span className="text-xs font-bold text-slate-500 uppercase">
      {code}
    </span>
  );
}
