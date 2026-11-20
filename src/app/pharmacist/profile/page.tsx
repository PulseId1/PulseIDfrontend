"use client";

import React, { useState } from "react";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer } from "@/components/common";
import {
  ProfileHeading,
  ProfileOverviewBanner,
  PersonalContactInfoCards,
  ProfessionalInfoCard,
  PharmacistJoinRequestsSection,
  AccountSettingsCard,
} from "@/features/pharmacist";

export default function PharmacistProfilePage() {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-[#FBFEFF] text-[#41474F] flex flex-col font-sans selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="609:12249"
      data-name="Pharmacist Information"
    >
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      <main
        className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-[40px] flex flex-col gap-[44px]"
        data-node-id="609:12290"
        data-name="Profile content"
      >
        {/* Node 609:12291: Page heading */}
        <ProfileHeading />

        {/* Node 609:12294: Doctor/Pharmacist overview banner */}
        <ProfileOverviewBanner />

        {/* Node 609:12314: Personal and contact information */}
        <PersonalContactInfoCards />

        {/* Node 609:12364: Professional Information */}
        <ProfessionalInfoCard />

        {/* Node 609:12396: Section - PharmacistJoinRequests */}
        <PharmacistJoinRequestsSection />

        {/* Node 609:12490: Account Settings */}
        <AccountSettingsCard />
      </main>

      {/* Slide-out AI Assistant */}
      <AiMedicalAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        patientName="Ahmed Hassan"
        patientId="PT-10482"
      />

      <Footer />
    </div>
  );
}
