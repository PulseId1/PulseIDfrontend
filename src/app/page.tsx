import React from "react";
import {
  LandingHeader,
  HeroSection,
  CountdownSection,
  TeamSection,
  LandingFooter,
} from "@/features/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07111F] text-[#F4F8FC] selection:bg-[#2589FF]/30 selection:text-[#35D6E8]">
      <LandingHeader />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <CountdownSection />
        <TeamSection />
      </main>
      <LandingFooter />
    </div>
  );
}
