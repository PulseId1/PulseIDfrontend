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
      className="relative min-h-[100dvh] flex flex-col justify-between items-center w-full px-0 py-4 sm:py-6 overflow-hidden bg-[#07111F]"
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

      {/* Clock Lines Flush on the Right Border (Inspired by inspire/2.jpeg) */}
      <HeroClockArc />

      {/* Giant Architectural Background Watermark: COMING SOON (SVG Text: 100% visible, perfectly centered, never cut) */}
      <div
        className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[96vw] px-2 flex items-center justify-center text-white/[0.035] z-0 leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 160"
          className="w-full h-auto max-h-[170px] overflow-visible"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fill="currentColor"
            fontWeight="900"
            letterSpacing="0.10em"
            fontSize="125"
            className="font-sans font-black uppercase"
          >
            COMING SOON
          </text>
        </svg>
      </div>

      {/* Top Header: Official PulseID Brand Logo Centered */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center shrink-0 pt-2 px-4"
      >
        <a
          href="#countdown"
          className="group inline-flex items-center gap-3 p-1 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
          aria-label="PulseID home"
        >
          <PulseLogo size="md" />
        </a>
      </motion.header>

      {/* Center: Main Countdown Hero Payload */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center my-auto py-2 sm:py-4 w-full px-4 sm:px-6">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F8FC] mb-2 sm:mb-3 leading-tight"
        >
          {APP_HEADLINE}
        </motion.h1>

        {/* Short Supporting Sentence */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm md:text-base text-[#9BAFC3] max-w-lg mx-auto mb-4 sm:mb-6 font-normal leading-relaxed"
        >
          {APP_SUBTITLE}
        </motion.p>

        {/* Interactive Mascot Face looking at the counter below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6 flex justify-center"
        >
          <MascotFace />
        </motion.div>

        {/* The Dominant Countdown Component (Main Event - Centered & Expanded) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto"
        >
          <CountdownTimer />
        </motion.div>
      </div>

      {/* Bottom: Minimal Scroll Indicator */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 pt-2 pb-1 shrink-0"
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
    </section>
  );
}
