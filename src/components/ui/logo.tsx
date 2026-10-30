import React from "react";
import { APP_NAME } from "@/lib/constants";

interface LogoProps {
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly showSymbolOnly?: boolean;
}

/**
 * PulseID Temporary Brand Mark
 *
 * NOTE: This is a proposed temporary visual identity combining a minimalist
 * electrocardiogram pulse rhythm with clinical geometric symmetry.
 * Pending official corporate brand approval.
 */
export function PulseLogo({
  className = "",
  size = "md",
  showSymbolOnly = false,
}: LogoProps) {
  const symbolDimensions = {
    sm: { width: 26, height: 26, stroke: 2.2 },
    md: { width: 34, height: 34, stroke: 2.4 },
    lg: { width: 44, height: 44, stroke: 2.6 },
  }[size];

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label={`${APP_NAME} brand mark`}
    >
      <svg
        width={symbolDimensions.width}
        height={symbolDimensions.height}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2589FF" />
            <stop offset="100%" stopColor="#35D6E8" />
          </linearGradient>
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Rounded protective shield/hexagon background */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="10"
          fill="#102238"
          stroke="#1C344D"
          strokeWidth="1.5"
        />

        {/* Dynamic Pulse Rhythm Line */}
        <path
          d="M6 18H11.5L14 11L18 25L21.5 15L24 19.5H30"
          stroke="url(#pulseGradient)"
          strokeWidth={symbolDimensions.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#subtleGlow)"
        />

        {/* Medical connectivity nodes */}
        <circle cx="6" cy="18" r="1.5" fill="#2589FF" />
        <circle cx="30" cy="18" r="1.5" fill="#35D6E8" />
      </svg>

      {!showSymbolOnly && (
        <span
          className={`font-semibold tracking-tight font-sans ${textClasses} text-[#F4F8FC] flex items-baseline`}
        >
          <span>Pulse</span>
          <span className="text-[#35D6E8] ml-0.5 font-bold">ID</span>
        </span>
      )}
    </div>
  );
}

