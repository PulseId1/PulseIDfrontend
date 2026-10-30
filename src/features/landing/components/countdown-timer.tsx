"use client";

import React, { useId, useSyncExternalStore } from "react";
import { LAUNCH_TARGET_ISO, LAUNCH_DISPLAY_DATE, LAUNCH_TIMEZONE_LABEL } from "@/lib/constants";

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

function subscribeTimer(callback: () => void): () => void {
  const id = window.setInterval(callback, 1000);
  return () => {
    window.clearInterval(id);
  };
}

const emptySubscribe = () => () => {};

/**
 * Hook to detect client mount without cascading renders
 */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function CountdownTimer() {
  const liveRegionId = useId();
  const mounted = useHasMounted();

  // Subscribe to live second-by-second updates via useSyncExternalStore
  const timeLeft = useSyncExternalStore(
    subscribeTimer,
    calculateTimeRemaining,
    () => serverSnapshot
  );

  const units = [
    { label: "Days", value: timeLeft.days, padLength: 2 },
    { label: "Hours", value: timeLeft.hours, padLength: 2 },
    { label: "Minutes", value: timeLeft.minutes, padLength: 2 },
    { label: "Seconds", value: timeLeft.seconds, padLength: 2 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
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
        <div className="rounded-2xl border border-[#35D6E8]/40 bg-[#102238]/90 p-8 text-center backdrop-blur-sm shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35D6E8]/10 text-[#35D6E8] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#35D6E8]/20">
            Launch Phase Active
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F8FC] mb-2">
            PulseID Launch Target Reached
          </h3>
          <p className="text-[#9BAFC3] max-w-lg mx-auto text-sm sm:text-base">
            The target launch milestone of {LAUNCH_DISPLAY_DATE} has arrived. Platform rollout and service initialization are in progress.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main 4-unit countdown grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {units.map((unit) => {
              const formattedNumber = mounted
                ? String(unit.value).padStart(unit.padLength, "0")
                : "--";

              return (
                <div
                  key={unit.label}
                  className="relative group rounded-xl sm:rounded-2xl border border-[#1C344D] bg-[#102238]/80 p-4 sm:p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#2589FF]/40 hover:bg-[#102238] hover:shadow-[0_0_24px_rgba(37,137,255,0.12)]"
                >
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-[#2589FF]/30 to-transparent group-hover:via-[#35D6E8]/60 transition-colors" />

                  <span
                    className="block text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight text-[#F4F8FC] tabular-nums"
                    aria-hidden="true"
                  >
                    {formattedNumber}
                  </span>
                  <span className="mt-1 sm:mt-2 block text-xs sm:text-sm font-medium uppercase tracking-wider text-[#9BAFC3]">
                    {unit.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timezone and target specification banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-[#9BAFC3] pt-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#35D6E8] animate-pulse" />
              <span>Live Countdown</span>
            </span>
            <span className="hidden sm:inline text-[#1C344D]">•</span>
            <span>
              Target: <strong className="text-[#F4F8FC] font-semibold">{LAUNCH_DISPLAY_DATE} 00:00:00</strong>
            </span>
            <span className="hidden sm:inline text-[#1C344D]">•</span>
            <span>
              Timezone: <span className="font-mono text-[#F4F8FC]/90">{LAUNCH_TIMEZONE_LABEL}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
