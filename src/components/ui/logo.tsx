import React from "react";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

interface LogoProps {
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly showSymbolOnly?: boolean;
}

/**
 * PulseID Official Brand Mark
 *
 * Uses public/logo.svg (the pulse crest symbol) along with clean typographic wordmark.
 */
export function PulseLogo({
  className = "",
  size = "md",
  showSymbolOnly = false,
}: LogoProps) {
  const dimensions = {
    sm: { width: 30, height: 28 },
    md: { width: 36, height: 34 },
    lg: { width: 44, height: 41 },
  }[size];

  const textClasses = {
    sm: "text-base tracking-wider",
    md: "text-lg tracking-wider",
    lg: "text-xl tracking-wider",
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      aria-label={`${APP_NAME} brand mark`}
    >
      <div className="relative shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_16px_rgba(13,225,241,0.35)]">
        <Image
          src="/logo.svg"
          alt="PulseID Logo"
          width={dimensions.width}
          height={dimensions.height}
          priority
          className="w-auto h-auto"
        />
      </div>

      {!showSymbolOnly && (
        <span
          className={`font-bold font-sans ${textClasses} text-[#F4F8FC] uppercase tracking-wider flex items-center`}
        >
          <span>PULSE</span>
          <span className="text-[#35D6E8] ml-1">ID</span>
        </span>
      )}
    </div>
  );
}
