import React from "react";
import {
  PatientNavbar,
  PatientHero,
  QuickActions,
  HealthRewardBanner,
  RecentMedicalActivity,
  PatientFooter,
} from "@/features/patient";

export const metadata = {
  title: "PulseID Patient Portal — Your Health Journey. All in One Place.",
  description:
    "PulseID patient identity portal uniting your medical history, verified prescriptions, laboratory results, and AI health assistant in one secure place.",
};

export default function PatientHomePage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="299:4931"
      data-name="Home Patient ff"
    >
      {/* 1. Unified Navigation Header matching Figma Node 353:10098 (Desktop) & 364:4446 (Mobile) */}
      <PatientNavbar />

      <main className="flex-1 flex flex-col">
        {/* 2. Hero Section matching Figma Node 299:4932 (Desktop) & 364:4478 (Mobile) */}
        <PatientHero />

        {/* 3. Quick Actions Section matching Figma Node 299:4957 (Desktop) & 364:4494 (Mobile) */}
        <QuickActions />

        {/* 4. Walk 5,000 Steps Daily Health Reward Banner matching Figma Node 299:5181 (Desktop) & 364:4540 (Mobile) */}
        <HealthRewardBanner />

        {/* 5. Recent Medical Activity matching Figma Node 299:5018 (Desktop) & 364:4539 (Mobile) */}
        <RecentMedicalActivity />
      </main>

      {/* 6. Footer: PulseID Dark Navy Footer with Newsletter matching Figma Node 299:5108 */}
      <PatientFooter />
    </div>
  );
}
