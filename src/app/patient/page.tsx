import React from "react";
import {
  PatientNavbar,
  PatientHero,
  QuickActions,
  HealthRewardBanner,
  RecentMedicalActivity,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { LandingFooter } from "@/features/landing";

export const metadata = {
  title: "PulseID Patient Portal — Your Health Data. One Secure Identity.",
  description:
    "PulseID patient identity portal uniting your medical history, verified prescriptions, laboratory results, and AI health assistant in one secure place.",
};

export default function PatientHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      {/* 1. Desktop Sticky Navigation Bar */}
      <div className="hidden lg:block">
        <PatientNavbar patientName="Mohamed Hassan" />
      </div>

      {/* 2. Mobile Patient Greeting & Search Header matching Home-patient-mobile.pdf */}
      <MobilePatientHeader patientName="Mohamed Hassan" />

      <main className="flex-1">
        {/* 3. Hero Section: "Your Health Data. One Secure Identity." */}
        <PatientHero />

        {/* 4. Section: Quick Actions (Medical Records, Upload Prescription, AI Assistant, Access Requests) */}
        <QuickActions />

        {/* 5. Section: Walk 5,000 Steps Daily Health Reward Banner */}
        <HealthRewardBanner />

        {/* 6. Section: Recent Medical Activity (Prescription, Labs, Diagnosis, Imaging) */}
        <RecentMedicalActivity />
      </main>

      {/* 7. Footer: PulseID Dark Navy Footer with Newsletter */}
      <LandingFooter />

      {/* 8. Mobile Bottom Navigation Tabs (Home, Records, Scan, Assistant, Profile) */}
      <MobileBottomNav />
    </div>
  );
}

