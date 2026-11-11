import React from "react";
import {
  PatientNavbar,
  PatientHero,
  QuickActions,
  HealthRewardBanner,
  RecentMedicalActivity,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";

export const metadata = {
  title: "PulseID Patient Portal — Your Health Journey. All in One Place.",
  description:
    "PulseID patient identity portal uniting your medical history, verified prescriptions, laboratory results, and AI health assistant in one secure place.",
};

export default function PatientHomePage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE] pb-16 lg:pb-0"
      data-node-id="299:4931"
      data-name="Home Patient ff"
    >
      {/* 1. Desktop Sticky Navigation Bar matching Figma Node 299:5257 */}
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      {/* 2. Mobile Patient Greeting & Search Header */}
      <MobilePatientHeader />

      <main className="flex-1 flex flex-col">
        {/* 3. Hero Section matching Figma Node 299:4932 */}
        <PatientHero />

        {/* 4. Quick Actions Section matching Figma Node 299:4957 */}
        <QuickActions />

        {/* 5. Walk 5,000 Steps Daily Health Reward Banner matching Figma Node 299:5181 */}
        <HealthRewardBanner />

        {/* 6. Recent Medical Activity matching Figma Node 299:5018 */}
        <RecentMedicalActivity />
      </main>

      {/* 7. Footer: PulseID Dark Navy Footer with Newsletter matching Figma Node 299:5108 */}
      <PatientFooter />

      {/* 8. Mobile Bottom Navigation Tabs */}
      <MobileBottomNav />
    </div>
  );
}
