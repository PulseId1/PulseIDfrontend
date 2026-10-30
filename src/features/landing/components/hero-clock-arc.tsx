"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "motion/react";

/**
 * Right-Border Clock Dial Arc
 * Minimalist, grand-radius architectural clock arc (max 9 lines).
 * Subdued opacity with live active indicator tracking seconds.
 * Matches inspire/2.jpeg aesthetic.
 */

function subscribeSeconds(callback: () => void): () => void {
  const intervalId = window.setInterval(callback, 500);
  return () => window.clearInterval(intervalId);
}

function getSecondsSnapshot(): number {
  return new Date().getSeconds();
}

const emptySubscribe = () => () => {};

export function HeroClockArc({ className = "" }: { readonly className?: string }) {
  const seconds = useSyncExternalStore(
    subscribeSeconds,
    getSecondsSnapshot,
    () => 0
  );

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Exactly 9 tick lines maximum across a grand-radius arc
  const tickCount = 9;
  const startAngle = 132; // degrees
  const endAngle = 228;   // degrees
  const step = (endAngle - startAngle) / (tickCount - 1); // 12 degrees step

  // Grand radius circle geometry:
  // ViewBox: 450 wide by 900 high
  // Right border is x = 450
  const cx = 580;
  const cy = 450;
  const rOuter = 580; // Sweeps up to the left (cx - rOuter = 0 at apex 180°)
  const rInner = 518; // Tick length: 62px
  const rPill = 478;  // Companion active indicator pill radius

  // Map 0..59 seconds to which tick index is active (0..8)
  const activeTickIndex = isMounted ? Math.floor((seconds % 60) / (60 / tickCount)) : 4;

  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const angleDeg = startAngle + i * step;
    const rad = (angleDeg * Math.PI) / 180;

    const x1 = Math.min(450, cx + rOuter * Math.cos(rad));
    const y1 = cy + rOuter * Math.sin(rad);
    const x2 = cx + rInner * Math.cos(rad);
    const y2 = cy + rInner * Math.sin(rad);

    const pillX1 = cx + (rPill + 26) * Math.cos(rad);
    const pillY1 = cy + (rPill + 26) * Math.sin(rad);
    const pillX2 = cx + rPill * Math.cos(rad);
    const pillY2 = cy + rPill * Math.sin(rad);

    const isActive = i === activeTickIndex;

    return {
      index: i,
      x1,
      y1,
      x2,
      y2,
      pillX1,
      pillY1,
      pillX2,
      pillY2,
      isActive,
    };
  });

  const activeTick = ticks[activeTickIndex] ?? ticks[4];

  return (
    <div
      className={`pointer-events-none select-none absolute right-0 top-0 bottom-0 h-full w-48 sm:w-64 md:w-80 lg:w-[460px] overflow-hidden hidden sm:flex items-center justify-end z-0 opacity-80 sm:opacity-90 ${className}`}
      aria-hidden="true"
    >
      {/* Subdued Ambient Radial Lighting on right edge */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-64 h-[450px] bg-gradient-to-l from-[#35D6E8]/08 via-[#2589FF]/04 to-transparent blur-3xl rounded-full" />

      <svg
        viewBox="0 0 450 900"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMaxYMid meet"
      >
        <defs>
          {/* Subtle soft glow for active indicator */}
          <filter id="soft-arc-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dial Ticks along the grand arc (9 lines total with subdued opacity) */}
        {ticks.map((t) => (
          <line
            key={t.index}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.isActive ? "rgba(255, 255, 255, 0.75)" : "rgba(244, 248, 252, 0.16)"}
            strokeWidth={t.isActive ? "3.2" : "2.2"}
            strokeLinecap="round"
            filter={t.isActive ? "url(#soft-arc-glow)" : undefined}
            className="transition-colors duration-300"
          />
        ))}

        {/* Companion Active Highlight Pill (subtle cyan indicator dash) */}
        {activeTick && (
          <motion.line
            key={`pill-${activeTick.index}`}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 0.2 }}
            x1={activeTick.pillX1}
            y1={activeTick.pillY1}
            x2={activeTick.pillX2}
            y2={activeTick.pillY2}
            stroke="#35D6E8"
            strokeWidth="4.5"
            strokeLinecap="round"
            filter="url(#soft-arc-glow)"
          />
        )}
      </svg>
    </div>
  );
}
