"use client";

import React, { useId, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LAUNCH_TARGET_ISO,
  LAUNCH_DISPLAY_DATE,
  LAUNCH_TIMEZONE_LABEL,
} from "@/lib/constants";

interface TimeRemaining {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
  readonly isExpired: boolean;
  readonly totalSeconds: number;
}

const targetTimestamp = new Date(LAUNCH_TARGET_ISO).getTime();

function calculateTimeRemaining(): TimeRemaining {
  const now = Date.now();
  const diffMs = targetTimestamp - now;

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      totalSeconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    totalSeconds,
  };
}

// Server snapshot for SSR
const serverSnapshot: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
  totalSeconds: 0,
};

// Cached snapshot to prevent infinite re-render loops in useSyncExternalStore
let cachedSnapshot: TimeRemaining = calculateTimeRemaining();

function getClientSnapshot(): TimeRemaining {
  const latest = calculateTimeRemaining();
  if (
    latest.seconds !== cachedSnapshot.seconds ||
    latest.minutes !== cachedSnapshot.minutes ||
    latest.hours !== cachedSnapshot.hours ||
    latest.days !== cachedSnapshot.days ||
    latest.isExpired !== cachedSnapshot.isExpired
  ) {
    cachedSnapshot = latest;
  }
  return cachedSnapshot;
}

function subscribeTimer(callback: () => void): () => void {
  const id = window.setInterval(() => {
    const next = calculateTimeRemaining();
    if (
      next.seconds !== cachedSnapshot.seconds ||
      next.minutes !== cachedSnapshot.minutes ||
      next.hours !== cachedSnapshot.hours ||
      next.days !== cachedSnapshot.days ||
      next.isExpired !== cachedSnapshot.isExpired
    ) {
      cachedSnapshot = next;
      callback();
    }
  }, 1000);

  return () => {
    window.clearInterval(id);
  };
}

const emptySubscribe = () => () => {};

function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

interface AnimatedDigitBlockProps {
  readonly value: number;
  readonly label: string;
  readonly mounted: boolean;
}

function CountdownBlock({ value, label, mounted }: AnimatedDigitBlockProps) {
  const formattedNumber = mounted ? String(value).padStart(2, "0") : "--";

  return (
    <div className="relative flex flex-col items-center group w-full min-w-0">
      {/* Container with restrained glow on hover */}
      <div className="relative w-full min-w-0 rounded-2xl sm:rounded-3xl border border-[#1C344D]/80 bg-[#0B192B]/90 py-3 sm:py-4 md:py-5 lg:py-6 px-2 sm:px-4 md:px-5 backdrop-blur-md shadow-[0_8px_32px_rgba(5,11,20,0.6)] transition-all duration-300 group-hover:border-[#2589FF]/60 group-hover:shadow-[0_0_36px_rgba(37,137,255,0.22)]">
        {/* Subtle top accent highlight */}
        <div className="absolute top-0 inset-x-4 sm:inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-[#2589FF]/40 to-transparent group-hover:via-[#35D6E8]/80 transition-all duration-300" />

        {/* Animated numeral - fully unclipped with leading-none */}
        <div className="relative flex items-center justify-center py-1">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={formattedNumber}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-mono font-bold tracking-tight text-[#F4F8FC] tabular-nums select-none leading-none drop-shadow-[0_4px_24px_rgba(37,137,255,0.25)]"
              aria-hidden="true"
            >
              {formattedNumber}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Unit label below numeral */}
        <span className="mt-1.5 sm:mt-2.5 block text-center text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-[#35D6E8]/90 group-hover:text-[#35D6E8] transition-colors">
          {label}
        </span>
      </div>
    </div>
  );
}

export function CountdownTimer() {
  const liveRegionId = useId();
  const mounted = useHasMounted();

  const timeLeft = useSyncExternalStore(
    subscribeTimer,
    getClientSnapshot,
    () => serverSnapshot
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-0">
      {/* Screen reader live announcement */}
      <div
        id={liveRegionId}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {!mounted
          ? "Loading launch countdown timer..."
          : timeLeft.isExpired
          ? "PulseID launch milestone reached."
          : `Launch countdown: ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds remaining.`}
      </div>

      {mounted && timeLeft.isExpired ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-[#35D6E8]/40 bg-[#0B192B]/90 p-6 sm:p-10 text-center backdrop-blur-md shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#35D6E8]/10 text-[#35D6E8] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#35D6E8]/20">
            Launch Milestone Active
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold text-[#F4F8FC] mb-2">
            PulseID Has Arrived
          </h3>
          <p className="text-[#9BAFC3] max-w-md mx-auto text-sm sm:text-base">
            The target launch milestone of {LAUNCH_DISPLAY_DATE} is officially here. Platform rollout is currently in progress.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3 sm:space-y-4 w-full">
          {/* Main 4-unit countdown grid: 2x2 on mobile, 4 columns on tablet/desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 items-center justify-center w-full">
            <CountdownBlock value={timeLeft.days} label="Days" mounted={mounted} />
            <CountdownBlock value={timeLeft.hours} label="Hours" mounted={mounted} />
            <CountdownBlock value={timeLeft.minutes} label="Minutes" mounted={mounted} />
            <CountdownBlock value={timeLeft.seconds} label="Seconds" mounted={mounted} />
          </div>

          {/* Timezone and target announcement metadata */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-[#9BAFC3] pt-1 text-center">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#35D6E8] animate-pulse" />
              <span className="text-[#F4F8FC] font-medium">Target:</span>
              <strong className="text-[#35D6E8] font-semibold">{LAUNCH_DISPLAY_DATE}</strong>
            </span>
            <span className="text-[#1C344D]">•</span>
            <span>
              Timezone: <span className="font-mono text-[#F4F8FC]/90">{LAUNCH_TIMEZONE_LABEL}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
