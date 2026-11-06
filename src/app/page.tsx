import React from "react";
import {
  HeroCountdownSection,
  TeamSection,
  MinimalFooter,
} from "@/features/landing";

export default function PreRevealCountdownPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F4F8FC] selection:bg-[#2589FF]/30 selection:text-[#35D6E8]">
      <main className="flex-1 flex flex-col">
        {/* Section A — Launch Countdown (Dominant 1st Viewport Focus) */}
        <HeroCountdownSection />

        {/* Section B — Meet the Team (Interactive Categories & Transitions) */}
        <TeamSection />
      </main>

      {/* Minimal Footer */}
      <MinimalFooter />
    </div>
  );
}
