import React from "react";
import { CountdownTimer } from "./countdown-timer";
import { LAUNCH_DISPLAY_DATE } from "@/lib/constants";

export function CountdownSection() {
  return (
    <section
      id="countdown"
      aria-labelledby="countdown-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B192B]/60 border-y border-[#1C344D]"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30"
        aria-hidden="true"
      >
        <div className="w-[500px] h-[300px] bg-gradient-to-r from-[#2589FF]/20 to-[#35D6E8]/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102238] border border-[#1C344D] text-[#35D6E8] text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35D6E8]" />
          Launch Schedule
        </div>

        <h2
          id="countdown-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F8FC] mb-4"
        >
          Counting Down to Launch
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#9BAFC3] max-w-2xl mx-auto mb-10 sm:mb-14">
          PulseID is currently in active development. Our public rollout is scheduled for{" "}
          <strong className="text-[#F4F8FC] font-semibold">{LAUNCH_DISPLAY_DATE}</strong>. Track our progress as we prepare for launch.
        </p>

        {/* Live Client Component */}
        <CountdownTimer />
      </div>
    </section>
  );
}

