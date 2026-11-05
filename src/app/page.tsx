import React from "react";
import {
  Navbar,
  HeroSection,
  ChallengesSection,
  SolutionsSection,
  CompleteHealthcareSection,
  LandingFooter,
} from "@/features/landing";

export const metadata = {
  title: "PulseID — Your Health Data. One Secure Identity.",
  description:
    "PulseID brings your medical records together in one secure place, helping you manage your health information and control how it is shared with authorized healthcare professionals.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#01091E] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section: "Your Health Data. One Secure Identity." */}
        <HeroSection />

        {/* 3. Section 2: "The Challenges Users Face" */}
        <ChallengesSection />

        {/* 4. Section 3: "How PulseID Makes a Difference" */}
        <SolutionsSection />

        {/* 5. Section 4: "Complete Healthcare, All in One Place" */}
        <CompleteHealthcareSection />
      </main>

      {/* 6. Footer: Dark Navy with Newsletter Box */}
      <LandingFooter />
    </div>
  );
}
