import React from "react";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

interface LogoProps {
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
  readonly showSymbolOnly?: boolean;
  readonly theme?: "dark" | "light"; // "dark" = dark text on light bg, "light" = light text on dark bg
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
  theme = "light",
}: LogoProps) {
  const dimensions = {
    sm: { width: 28, height: 26 },
    md: { width: 32, height: 30 },
    lg: { width: 40, height: 38 },
  }[size];

  const textClasses = {
    sm: "text-sm tracking-wider",
    md: "text-base tracking-wider",
    lg: "text-lg tracking-wider",
  }[size];

  return (
    <div
      dir="ltr"
      className={`inline-flex items-center gap-3 select-none ${className}`}
      aria-label={`${APP_NAME} brand mark`}
    >
      <div className="relative shrink-0 transition-transform duration-300 hover:scale-105">
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
          className={`font-bold font-sans ${textClasses} ${
            theme === "dark" ? "text-[#002D62]" : "text-white"
          } uppercase tracking-wider flex items-center leading-none`}
        >
          PULSEID
        </span>
      )}
    </div>
  );
}
