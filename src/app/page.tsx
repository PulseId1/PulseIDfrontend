import React from "react";
import {
  Navbar,
  HeroSection,
  FeaturesInteractiveSection,
  ConnectedHealthSection,
  BridgingGapSection,
  HowItWorksSection,
  ConnectsEveryoneSection,
  FaqSection,
  TeamSection,
  CtaBannerSection,
  LandingFooter,
} from "@/features/landing";

export const metadata = {
  title: "PulseID — Your Health Data. One Secure Identity.",
  description:
    "PulseID brings your medical records together in one secure place, helping you manage your health information and control how it is shared with authorized healthcare professionals.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#078bde]/30 selection:text-[#078bde]">
      {/* 1. Header (Figma 665:3519) */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section: "Your Health Data. One Secure Identity." (Figma 665:3565) */}
        <HeroSection />

        {/* 3. Achievements & Interactive Features: "Healthcare Features Designed Around You" (Figma 665:3591) */}
        <FeaturesInteractiveSection />

        {/* 4. Connected Health: "Your Health, Smarter and More Connected." (Figma 665:3614) */}
        <ConnectedHealthSection />

        {/* 5. Bridging the Gap: "Bridging the gap between patients and doctors" (Figma 665:3681) */}
        <BridgingGapSection />

        {/* 6. How PulseID Works (Figma 665:3708) */}
        <HowItWorksSection />

        {/* 7. Healthcare That Connects Everyone: Doctor, Patient, Pharmacist (Figma 665:3750) */}
        <ConnectsEveryoneSection />

        {/* 8. Frequently Asked Questions (Figma 665:3789) */}
        <FaqSection />

        {/* 8b. Leadership Team (Investor Pitch Slide) */}
        <TeamSection />

        {/* 9. Call to Action Banner: "Your Health Data. Your Control. Your PulseID." (Figma 665:3864) */}
        <CtaBannerSection />

        {/* 10. Subtle horizontal divider (Figma 665:3873) */}
        <div className="w-full max-w-[1120px] mx-auto border-t border-slate-200" />
      </main>

      {/* 11. Authentic PulseID Footer (Figma 665:3875) */}
      <LandingFooter />
    </div>
  );
}
