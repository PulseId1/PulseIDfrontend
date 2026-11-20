"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { HeroOverviewSection } from "@/features/pharmacist/hero-overview-section";
import { QuickActionsSection } from "@/features/pharmacist/quick-actions-section";
import { PendingPrescriptionsTable } from "@/features/pharmacist/pending-prescriptions-table";
import { RecentPatientsSection } from "@/features/pharmacist/recent-patients-section";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer, HeroBackgroundSlider, DEFAULT_PHARMACIST_HERO_SLIDES } from "@/components/common";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export default function PharmacistHomePage() {
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const { userId, isDemo } = useAuth();

  // Dynamic pharmacist identification matching Doctor / Patient pattern
  const activeAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const isPharmacistRole = activeAccount?.role === "pharmacist";
  const pharmacistDisplayName =
    isDemo && isPharmacistRole && activeAccount?.fullName
      ? activeAccount.fullName
      : isDemo
      ? "Pharmacist Mohamed."
      : userId
      ? `Pharmacist (${userId})`
      : "Pharmacist Mohamed.";

  const greetingPharmacistName = pharmacistDisplayName.endsWith(".")
    ? pharmacistDisplayName
    : `${pharmacistDisplayName}.`;

  return (
    <div
      className="min-h-screen bg-[#FBFEFF] text-slate-900 flex flex-col font-sans selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="609:11802"
      data-name="Home  pharmacist"
    >
      {/* 1. Unified Navigation Header matching Figma Node 609:11904 & 353:10098 */}
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 w-full">
        {/* 2. Unified Hero Section matching Figma Node 609:11803 & 353:10000 */}
        <section
          className="w-full relative h-[668px] overflow-hidden bg-[#01091e] flex items-center shrink-0"
          data-node-id="609:11803"
          data-name="Hero Section"
        >
          {/* Background Slides with authentic Pharmacist photo and rotation */}
          <HeroBackgroundSlider
            slides={DEFAULT_PHARMACIST_HERO_SLIDES}
            intervalMs={6000}
            dataNodeId="609:11804"
          />

          {/* Hero Content Container matching Figma Container Node 353:10002 / 609:11809 */}
          <div
            className="relative z-20 max-w-[1280px] w-full mx-auto px-4 sm:px-8 flex flex-col items-start"
            data-node-id="609:11809"
          >
            <div className="max-w-[1216px] w-full flex flex-col items-start" data-node-id="609:11810">
              <div className="flex flex-col items-start pb-[24px]">
                {/* Heading 1 */}
                <div
                  className="font-['Inter'] font-bold text-[38px] sm:text-[64px] flex flex-col gap-[4px] items-start not-italic leading-tight tracking-tight"
                  data-name="Heading 1"
                >
                  <div className="text-white">
                    <p className="leading-normal">Welcome back</p>
                  </div>
                  <div className="text-[#078bde] flex items-center gap-3">
                    <p className="leading-normal">{greetingPharmacistName}</p>
                    <div className="size-[28px] sm:size-[36px] relative shrink-0">
                      <Image
                        src="/assets/check-verified-filled.svg"
                        alt="Verified"
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="max-w-[672px] pb-[24px] pr-[1.97px]">
                <div className="font-['Inter'] font-normal text-[16px] sm:text-[18px] text-[#eaedf6] max-w-[662px] leading-normal">
                  <p className="leading-normal mb-0">Manage prescriptions, review patient medications, and</p>
                  <p className="leading-normal">provide safe dispensing services in one secure place.</p>
                </div>
              </div>

              {/* Dual CTA Buttons */}
              <div className="pb-[32px]">
                <div className="flex flex-wrap gap-[16px] items-center">
                  {/* Primary: Search Patient */}
                  <Link
                    href="/pharmacist/patient"
                    className="bg-[#078bde] hover:bg-[#0677BF] px-[28px] py-[14px] rounded-[10px] flex items-center justify-center gap-[8px] text-white font-['Inter'] font-semibold text-[16px] leading-normal transition-all cursor-pointer shadow-sm group"
                    data-node-id="609:11818"
                    data-name="Link"
                  >
                    <span className="text-[#eaedf6] group-hover:text-white">Search Patient</span>
                    <div className="size-[12px] relative shrink-0">
                      <Image
                        src="/assets/doctor/imgContainer.svg"
                        alt="Arrow"
                        width={12}
                        height={12}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>

                  {/* Secondary: View Prescriptions */}
                  <Link
                    href="/pharmacist/prescriptions"
                    className="bg-[rgba(2,48,125,0.55)] hover:bg-[rgba(2,48,125,0.85)] border border-[#02307d] px-[28px] py-[14px] rounded-[10px] flex items-center justify-center gap-[8px] text-[#eaedf6] hover:text-white font-['Inter'] font-semibold text-[16px] leading-normal transition-all cursor-pointer"
                    data-node-id="609:11819"
                    data-name="Link"
                  >
                    <span>View Prescriptions</span>
                    <div className="size-[12px] relative shrink-0">
                      <Image
                        src="/assets/doctor/imgContainer.svg"
                        alt="Arrow"
                        width={12}
                        height={12}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Social / Trust Strip */}
              <div className="pt-[24px] w-full" data-node-id="609:11821">
                <div
                  className="border-t border-[rgba(255,255,255,0.15)] pt-[33px] flex flex-col sm:flex-row sm:items-center gap-[12px] w-full"
                  data-node-id="609:11822"
                >
                  <div className="pr-[8px]">
                    <p className="font-['Inter'] font-semibold text-[12px] text-[rgba(255,255,255,0.7)] tracking-[1.2px] uppercase leading-[16px]">
                      FOLLOW PULSEID:
                    </p>
                  </div>

                  <div className="flex gap-[8px] items-center">
                    <a
                      href="https://www.facebook.com/share/19kGnJB7Bf/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#dde7ff] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[#078bde] transition-colors"
                      title="Facebook"
                    >
                      <div className="size-[16px] relative">
                        <Image
                          src="/assets/doctor/imgSvg.svg"
                          alt="Facebook"
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/pulseid-tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#dde7ff] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[#078bde] transition-colors"
                      title="LinkedIn"
                    >
                      <div className="size-[16px] relative">
                        <Image
                          src="/assets/doctor/imgSvg1.svg"
                          alt="LinkedIn"
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/pulseid.eg?obrf=b3hqdTYwam9qMGs1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#dde7ff] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[#078bde] transition-colors"
                      title="Instagram"
                    >
                      <div className="size-[16px] relative">
                        <Image
                          src="/assets/doctor/imgSvg2.svg"
                          alt="Instagram"
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MainContent matching Figma Node 609:11946 (1280x1406.5)
           ========================================================================= */}
        <div
          className="w-full max-w-[1280px] mx-auto px-6 lg:px-[32px] py-10 space-y-10"
          data-node-id="609:11946"
          data-name="MainContent"
        >
          {/* Section 1: HeroOverviewSection → 3 Overview Statistics Cards matching Node 609:11947 */}
          <HeroOverviewSection />

          {/* Section 2: QuickActionsSection → 3 Action Cards matching Node 609:11993 */}
          <QuickActionsSection />

          {/* Section 3: PendingPrescriptionsTable matching Node 609:12062 */}
          <PendingPrescriptionsTable />

          {/* Section 4: RecentPatientsSection matching Node 609:12145 */}
          <RecentPatientsSection />
        </div>
      </main>

      {/* Slide-out AI Medical Assistant Drawer */}
      <AiMedicalAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        patientName="Ahmed Hassan"
        patientId="PT-10482"
      />

      {/* Authentic PulseID Footer matching Figma Node 652:4887 */}
      <Footer />
    </div>
  );
}
