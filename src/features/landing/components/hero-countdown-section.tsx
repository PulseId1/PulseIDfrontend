"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PulseLogo } from "@/components/ui/logo";
import { CountdownTimer } from "./countdown-timer";
import { MascotFace } from "./mascot-face";
import { HeroClockArc } from "./hero-clock-arc";
import {
  APP_HEADLINE,
  APP_SUBTITLE,
} from "@/lib/constants";

export function HeroCountdownSection() {
  return (
    <section
      id="countdown"
      aria-label="PulseID launch countdown"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center w-full px-4 py-6 sm:py-10 overflow-hidden bg-[#07111F]"
    >
      {/* Background ambient lighting - futuristic cyan/blue radial glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#2589FF]/18 via-[#35D6E8]/10 to-transparent blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-t from-[#2589FF]/10 via-[#102238]/20 to-transparent blur-[160px] rounded-full"
        aria-hidden="true"
      />

      {/* Clock Lines Flush on the Right Border (Desktop only) */}
      <HeroClockArc />

      {/* Architectural Background Watermark: COMING SOON (Pure Background Text, 100% Unclipped) */}
      <div
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[95vw] px-4 flex items-center justify-center text-white/[0.05] sm:text-white/[0.035] z-0 leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1300 160"
          className="w-full h-auto max-h-[170px] overflow-visible"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="currentColor"
            fontWeight="900"
            letterSpacing="0.08em"
            fontSize="115"
            className="font-sans font-black uppercase"
          >
            COMING SOON
          </text>
        </svg>
      </div>

      {/* Unified Cohesive Hero Stack: Minimized Spacing & Zero Dead Voids */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center w-full">
        {/* Official PulseID Brand Logo Centered (Minimal gap to headline) */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center mb-2.5 sm:mb-4"
        >
          <a
            href="#countdown"
            className="group inline-flex items-center gap-3 p-1 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
            aria-label="PulseID home"
          >
            <PulseLogo size="md" />
          </a>
        </motion.header>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F8FC] mb-1.5 sm:mb-2.5 leading-tight"
        >
          {APP_HEADLINE}
        </motion.h1>

        {/* Short Supporting Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base text-[#9BAFC3] max-w-lg mx-auto mb-3 sm:mb-5 font-normal leading-relaxed"
        >
          {APP_SUBTITLE}
        </motion.p>

        {/* Interactive Mascot Face looking at the counter below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-5 flex justify-center"
        >
          <MascotFace />
        </motion.div>

        {/* The Dominant Countdown Component */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto"
        >
          <CountdownTimer />
        </motion.div>

        {/* Minimal Scroll Indicator directly below countdown (No big blank gap) */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 sm:mt-6 shrink-0"
        >
          <a
            href="#team"
            className="group inline-flex flex-col items-center gap-1 text-[11px] font-medium text-[#9BAFC3] hover:text-[#35D6E8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8] rounded-xl px-3 py-1"
            aria-label="Scroll down to meet the team"
          >
            <span className="tracking-wider uppercase text-[10px]">
              Meet the team
            </span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5 text-[#35D6E8]" />
          </a>
        </motion.footer>
      </div>
    </section>
  );
}
