import React from "react";
import { ArrowDown, Calendar } from "lucide-react";
import {
  APP_EYEBROW,
  APP_DESCRIPTION,
  LAUNCH_DISPLAY_DATE,
} from "@/lib/constants";

export function HeroSection() {
  return (
    <section
      id="intro"
      aria-label="PulseID introduction"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 md:pt-44 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden"
    >
      {/* Background ambient radial gradients */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[440px] bg-gradient-to-b from-[#2589FF]/15 via-[#35D6E8]/10 to-transparent blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102238]/90 border border-[#1C344D] text-[#35D6E8] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35D6E8] animate-pulse" />
          <span>{APP_EYEBROW}</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F4F8FC] mb-6 leading-[1.08]">
          Your health.{" "}
          <span className="bg-gradient-to-r from-[#2589FF] via-[#35D6E8] to-[#F4F8FC] bg-clip-text text-transparent">
            Connected.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl md:text-2xl text-[#9BAFC3] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          {APP_DESCRIPTION}
        </p>

        {/* Launch Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B192B] border border-[#1C344D] text-[#F4F8FC] text-xs sm:text-sm font-medium mb-10">
          <Calendar className="w-4 h-4 text-[#35D6E8]" aria-hidden="true" />
          <span>
            Launching <strong className="text-[#35D6E8] font-semibold">{LAUNCH_DISPLAY_DATE}</strong>
          </span>
        </div>

        {/* Primary CTA scroll to countdown */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#countdown"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#2589FF] to-[#2589FF]/90 hover:from-[#2589FF] hover:to-[#35D6E8] text-[#07111F] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(37,137,255,0.3)] hover:shadow-[0_6px_28px_rgba(53,214,232,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
          >
            <span>Countdown to Launch</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href="#team"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#1C344D] bg-[#102238]/60 hover:bg-[#102238] text-[#F4F8FC] font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 hover:border-[#2589FF]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
          >
            Meet the Team
          </a>
        </div>
      </div>
    </section>
  );
}
