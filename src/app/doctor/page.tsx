"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { HeroBackgroundSlider, DEFAULT_DOCTOR_HERO_SLIDES } from "@/components/common";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

interface PendingRequestItem {
  id: string;
  patientName: string;
  pulseId: string;
  nationalId: string;
  photoUrl: string;
  status: "Pending" | "Approved" | "Rejected";
  permission: "View" | "Edit" | "Full Access";
  categories: string;
  date: string;
}

const INITIAL_REQUESTS: PendingRequestItem[] = [
  {
    id: "req-1",
    patientName: "Ahmed Hassan",
    pulseId: "PID-8924-EGY",
    nationalId: "28809140102345",
    photoUrl: "/assets/doctor/imgPatientPhoto.png",
    status: "Pending",
    permission: "View",
    categories: "Lab Results & Prescription History",
    date: "Nov 5, 2026",
  },
  {
    id: "req-2",
    patientName: "Salma Adel",
    pulseId: "PID-5268-EGY",
    nationalId: "29204150109876",
    photoUrl: "/assets/doctor/imgPatientPhoto1.png",
    status: "Pending",
    permission: "Edit",
    categories: "Clinical Notes",
    date: "Nov 4, 2026",
  },
  {
    id: "req-3",
    patientName: "Tarek Ibrahim",
    pulseId: "PID-7731-EGY",
    nationalId: "27911220104321",
    photoUrl: "/assets/doctor/imgPatientPhoto2.png",
    status: "Pending",
    permission: "View",
    categories: "Cardiology & Vital Signs",
    date: "Nov 3, 2026",
  },
];

const RECENT_PATIENTS = [
  {
    id: "p-1",
    name: "Ahmed Hassan",
    nationalId: "28809140102345",
    status: "Active Care",
    badgeBg: "bg-[#ecfdf5]",
    badgeText: "text-[#047857]",
    time: "Today, 10:30 AM",
    description: "Lab Results Uploaded — Fasting Glucose (94 mg/dL)",
    iconUrl: "/assets/doctor/imgSvg8.svg",
  },
  {
    id: "p-2",
    name: "Farida El-Sayed",
    nationalId: "29204150109876",
    status: "Follow-up",
    badgeBg: "bg-[#eff6ff]",
    badgeText: "text-[#1d4ed8]",
    time: "Yesterday, 02:15 PM",
    description: "Prescription Refill — Lisinopril 10mg",
    iconUrl: "/assets/doctor/imgSvg10.svg",
  },
  {
    id: "p-3",
    name: "Omar Abdelaziz",
    nationalId: "27911220104321",
    status: "Consultation",
    badgeBg: "bg-[#fffbeb]",
    badgeText: "text-[#b45309]",
    time: "Oct 24, 2026",
    description: "Radiology Report — Chest PA Digital X-Ray",
    iconUrl: "/assets/doctor/imgSvg11.svg",
  },
  {
    id: "p-4",
    name: "Nourhan Mostafa",
    nationalId: "29804120108924",
    status: "Routine",
    badgeBg: "bg-[#f1f5f9]",
    badgeText: "text-[#334155]",
    time: "Oct 21, 2026",
    description: "Vitals Check — BP 120/80 mmHg, Pulse 72 bpm",
    iconUrl: "/assets/doctor/imgSvg12.svg",
  },
];

export default function HomeHomeDoctor() {
  const router = useRouter();
  const { userId, isDemo } = useAuth();

  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [requests, setRequests] = useState<PendingRequestItem[]>(INITIAL_REQUESTS);
  const [quickSearchId, setQuickSearchId] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<PendingRequestItem | null>(null);

  // Dynamic doctor identification
  const activeDocAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const isDoctorRole = activeDocAccount?.role === "doctor";
  const doctorDisplayName =
    isDemo && isDoctorRole && activeDocAccount?.fullName
      ? activeDocAccount.fullName
      : isDemo
      ? "Dr. Mohamed."
      : userId
      ? `Dr. Practitioner (${userId})`
      : "Dr. Mohamed.";

  const greetingDoctorName = doctorDisplayName.endsWith(".") ? doctorDisplayName : `${doctorDisplayName}.`;

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickSearchId.trim();
    if (!trimmed) {
      setSearchError("Please enter a National ID, Pulse ID, or patient name.");
      return;
    }
    setSearchError(null);
    router.push(`/doctor/find-patient?id=${encodeURIComponent(trimmed)}`);
  };

  const handleCancelRequest = (requestId: string, patientName: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    setNotification(`Access request for ${patientName} has been cancelled.`);
    setTimeout(() => setNotification(null), 4000);
  };

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <div
      className="bg-white min-h-screen flex flex-col text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:9999"
      data-name="Home home doctor"
    >
      {/* 1. Sticky Navigation Header matching Figma Node 353:10098 */}
      <DoctorNavbar />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <p className="text-xs sm:text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* 2. Hero Section matching Figma Node 353:10000 */}
      <section
        className="w-full relative h-[668px] overflow-hidden bg-[#01091e] flex items-center shrink-0"
        data-node-id="353:10000"
      >
        {/* Background Slides matching Figma Node 322:1291 */}
        <HeroBackgroundSlider
          slides={DEFAULT_DOCTOR_HERO_SLIDES}
          intervalMs={6000}
          dataNodeId="322:1291"
        />

        {/* Hero Content Container matching Figma Node 353:10002 */}
        <div
          className="relative z-20 max-w-[1280px] w-full mx-auto px-4 sm:px-8 flex flex-col items-start"
          data-node-id="353:10002"
        >
          <div className="max-w-[1216px] w-full flex flex-col items-start" data-node-id="353:10003">
            <div className="flex flex-col items-start pb-[24px]" data-node-id="353:10005">
              {/* Heading 1 matching Figma Node 353:10006 */}
              <div
                className="font-['Inter'] font-bold text-[38px] sm:text-[64px] flex flex-col gap-[4px] items-start not-italic leading-tight tracking-tight"
                data-node-id="353:10006"
                data-name="Heading 1"
              >
                <div className="text-white" data-node-id="353:10007">
                  <p className="leading-normal">Welcome back</p>
                </div>
                <div className="text-[#078bde]" data-node-id="353:10008">
                  <p className="leading-normal">{greetingDoctorName}</p>
                </div>
              </div>
            </div>

            {/* Subtitle matching Figma Node 353:10009 */}
            <div className="max-w-[672px] pb-[24px] pr-[1.97px]" data-node-id="353:10009">
              <div className="font-['Inter'] font-normal text-[16px] sm:text-[18px] text-[#eaedf6] max-w-[662px] leading-normal" data-node-id="353:10010">
                <p className="leading-normal mb-0">Manage your patients, send medical record access requests, and</p>
                <p className="leading-normal">track patient approvals in one secure place.</p>
              </div>
            </div>

            {/* Dual CTA Buttons matching Figma Node 353:10011 */}
            <div className="pb-[32px]" data-node-id="353:10011">
              <div className="flex flex-wrap gap-[16px] items-center" data-node-id="353:10012">
                {/* Primary: Send Access Request */}
                <Link
                  href="/doctor/access-requests"
                  className="bg-[#078bde] hover:bg-[#0677BF] px-[28px] py-[14px] rounded-[10px] flex items-center justify-center gap-[8px] text-white font-['Inter'] font-semibold text-[16px] leading-normal transition-all cursor-pointer shadow-sm group"
                  data-node-id="353:10013"
                  data-name="Link"
                >
                  <span className="text-[#eaedf6] group-hover:text-white">Send Access Request</span>
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

                {/* Secondary: Track Requests */}
                <a
                  href="#pending-requests"
                  className="bg-[rgba(2,48,125,0.55)] hover:bg-[rgba(2,48,125,0.85)] border border-[#02307d] px-[28px] py-[14px] rounded-[10px] flex items-center justify-center gap-[8px] text-[#eaedf6] hover:text-white font-['Inter'] font-semibold text-[16px] leading-normal transition-all cursor-pointer"
                  data-node-id="353:10014"
                  data-name="Link"
                >
                  <span>Track Requests</span>
                  <div className="size-[12px] relative shrink-0">
                    <Image
                      src="/assets/doctor/imgContainer.svg"
                      alt="Arrow"
                      width={12}
                      height={12}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Social / Trust Strip matching Figma Node 353:10015 */}
            <div className="pt-[24px] w-full" data-node-id="353:10015">
              <div
                className="border-t border-[rgba(255,255,255,0.15)] pt-[33px] flex flex-col sm:flex-row sm:items-center gap-[12px] w-full"
                data-node-id="353:10016"
              >
                <div className="pr-[8px]" data-node-id="353:10018">
                  <p className="font-['Inter'] font-semibold text-[12px] text-[rgba(255,255,255,0.7)] tracking-[1.2px] uppercase leading-[16px]">
                    FOLLOW THE SUMMIT:
                  </p>
                </div>

                <div className="flex gap-[8px] items-center" data-node-id="353:10020">
                  <a
                    href="https://www.facebook.com/share/19kGnJB7Bf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#dde7ff] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[#078bde] transition-colors"
                    data-node-id="353:10021"
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
                    data-node-id="353:10022"
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
                    data-node-id="353:10023"
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

                  <a
                    href="mailto:Admin@pulseideg.com"
                    className="backdrop-blur-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#dde7ff] rounded-[8px] size-[36px] flex items-center justify-center p-[0.5px] hover:bg-[#078bde] transition-colors"
                    data-node-id="353:10024"
                    title="Email"
                  >
                    <div className="size-[16px] relative">
                      <Image
                        src="/assets/doctor/imgSelfhstGmailCleanerDark.svg"
                        alt="Email"
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

      {/* 3. Main Content matching Figma Node 353:10138 */}
      <main
        className="max-w-[1280px] w-full mx-auto p-4 sm:p-[32px] flex flex-col gap-[48px]"
        data-node-id="353:10138"
        data-name="MainContent"
      >
        {/* Section A: 3 Overview Statistics Cards matching Figma Node 353:10139 */}
        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-[20px] w-full"
          data-node-id="353:10139"
          data-name="HeroOverviewSection → 3 Overview Statistics Cards"
        >
          {/* Card 1: Total Patients matching Figma Node 353:10140 */}
          <div
            className="bg-white border border-[#dde7ff] rounded-[16px] p-[21px] flex flex-col gap-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            data-node-id="353:10140"
            data-name="Stat Card 1"
          >
            <div className="flex items-center justify-between w-full" data-node-id="353:10141">
              <span className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px]">
                Total Patients
              </span>
              <div
                className="bg-[rgba(139,139,139,0.2)] rounded-[12px] size-[40px] flex items-center justify-center"
                data-node-id="353:10144"
              >
                <div className="size-[24px] relative">
                  <Image
                    src="/assets/doctor/imgGroup2.svg"
                    alt="Total Patients"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between my-[8px] h-[48px]" data-node-id="353:10152">
              <span className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px]">
                148
              </span>
              <span
                className="bg-[rgba(139,139,139,0.2)] px-[10px] py-[2px] rounded-[9999px] font-['Inter'] font-semibold text-[12px] text-[#01091e] leading-[16px]"
                data-node-id="353:10154"
              >
                +12 this month
              </span>
            </div>

            <p className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px]" data-node-id="353:10157">
              Under active ongoing medical management
            </p>
          </div>

          {/* Card 2: Pending Requests matching Figma Node 353:10158 */}
          <div
            className="bg-white border border-[#dde7ff] rounded-[16px] p-[21px] flex flex-col gap-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            data-node-id="353:10158"
            data-name="Stat Card 2"
          >
            <div className="flex items-center justify-between w-full" data-node-id="353:10159">
              <span className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px]">
                Pending Requests
              </span>
              <div
                className="bg-[rgba(142,191,222,0.2)] rounded-[12px] size-[40px] flex items-center justify-center"
                data-node-id="353:10162"
              >
                <div className="size-[24px] relative">
                  <Image
                    src="/assets/doctor/imgBxLockOpen.svg"
                    alt="Pending Requests"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between my-[8px] h-[48px]" data-node-id="353:10165">
              <span className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px]">
                {pendingCount} Pending
              </span>
              <span
                className="bg-[rgba(142,191,222,0.2)] px-[10px] py-[2px] rounded-[9999px] font-['Inter'] font-semibold text-[12px] text-[#045385] leading-[16px]"
                data-node-id="353:10167"
              >
                Patient approval
              </span>
            </div>

            <p className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px]" data-node-id="353:10170">
              Requests sent by you and waiting for patient approval
            </p>
          </div>

          {/* Card 3: Recently Accessed matching Figma Node 353:10171 */}
          <div
            className="bg-white border border-[#dde7ff] rounded-[16px] p-[21px] flex flex-col gap-[4px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
            data-node-id="353:10171"
            data-name="Stat Card 3"
          >
            <div className="flex items-center justify-between w-full" data-node-id="353:10172">
              <span className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px]">
                Recently Accessed
              </span>
              <div
                className="bg-[rgba(68,239,99,0.1)] rounded-[12px] size-[40px] flex items-center justify-center"
                data-node-id="353:10175"
              >
                <div className="size-[24px] relative">
                  <Image
                    src="/assets/doctor/imgFamiconsTimeOutline.svg"
                    alt="Recently Accessed"
                    width={24}
                    height={24}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between my-[8px] h-[48px]" data-node-id="353:10179">
              <span className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px]">
                24 Patients
              </span>
              <span
                className="bg-[rgba(68,239,99,0.1)] px-[10px] py-[2px] rounded-[9999px] font-['Inter'] font-semibold text-[12px] text-[#047857] leading-[16px]"
                data-node-id="353:10181"
              >
                Updated today
              </span>
            </div>

            <p className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px]" data-node-id="353:10184">
              EHR synchronizations past 24 hours
            </p>
          </div>
        </section>

        {/* Section B: Quick Actions matching Figma Node 353:10185 */}
        <section
          className="flex flex-col gap-[16px] w-full"
          data-node-id="353:10185"
          data-name="QuickActionsSection"
        >
          <div className="flex flex-col gap-[2px] w-full" data-node-id="353:10186">
            <h2
              className="font-['Inter'] font-bold text-[24px] text-[#078bde] tracking-[-0.6px] leading-[32px]"
              data-node-id="353:10188"
            >
              Quick Actions
            </h2>
            <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-[20px]" data-node-id="353:10190">
              Direct access to essential clinical workflows, patient lookup, and permission controls.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[24px] w-full"
            data-node-id="353:10191"
            data-name="3 Quick Action Cards matching Reference Layout"
          >
            {/* Action Card 1: Find Patient (Elevated Action) matching Figma Node 353:10192 */}
            <div
              className="bg-white border-2 border-[rgba(7,139,222,0.4)] rounded-[16px] p-[26px] flex flex-col justify-between shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:border-[#078bde] transition-all"
              data-node-id="353:10192"
              data-name="Action Card 1: Find Patient (Elevated Action)"
            >
              <div className="flex flex-col gap-[6.9px] w-full">
                <div className="flex items-center justify-between w-full" data-node-id="353:10195">
                  <div
                    className="bg-[rgba(142,191,222,0.2)] rounded-[12px] size-[48px] flex items-center justify-center"
                    data-node-id="353:10196"
                  >
                    <div className="size-[24px] relative">
                      <Image
                        src="/assets/doctor/imgAntDesignSearchOutlined.svg"
                        alt="Search"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="size-[32px] rounded-[9999px] flex items-center justify-center" data-node-id="353:10199">
                    <div className="size-[20px] relative">
                      <Image
                        src="/assets/doctor/imgSvg4.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-[13.1px]" data-node-id="353:10202">
                  <h3 className="font-['Inter'] font-bold text-[18px] text-[#02307d] leading-normal" data-node-id="353:10203">
                    Find Patient
                  </h3>
                </div>

                <div className="pb-[0.625px]" data-node-id="353:10204">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal mb-0" data-node-id="353:10205">
                    Instantly lookup a patient using their 14-digit
                  </p>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal">
                    National ID, Pulse ID, or full legal name.
                  </p>
                </div>
              </div>

              {/* Quick Interactive Lookup Form matching Figma Node 353:10207 */}
              <div className="pt-[24px] w-full" data-node-id="353:10206">
                <div className="border-t border-[#e9effd] pt-[17px] w-full" data-node-id="353:10207">
                  <form onSubmit={handleQuickSearch} className="relative w-full">
                    <input
                      type="text"
                      value={quickSearchId}
                      onChange={(e) => {
                        setQuickSearchId(e.target.value);
                        if (searchError) setSearchError(null);
                      }}
                      placeholder="National ID / Pulse ID..."
                      className="w-full bg-[rgba(192,202,227,0.1)] border border-[#d0deff] rounded-[8px] pb-[12px] pl-[13px] pr-[81px] pt-[11px] font-['Inter'] font-normal text-[12px] text-[#41474f] focus:outline-none focus:border-[#078bde] focus:bg-white transition-all"
                      data-node-id="353:10209"
                    />

                    <button
                      type="submit"
                      className="absolute right-[4px] top-1/2 -translate-y-1/2 bg-[#078bde] hover:bg-[#0677BF] px-[12px] pt-[6.5px] pb-[7.5px] rounded-[6px] font-['Inter'] font-semibold text-[12px] text-white text-center transition-colors cursor-pointer"
                      data-node-id="353:10212"
                    >
                      Search
                    </button>
                  </form>
                  {searchError && (
                    <p className="text-xs text-rose-500 font-medium mt-1">{searchError}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Card 2: Send & Track Requests matching Figma Node 353:10214 */}
            <div
              className="bg-white border border-[#d0deff] rounded-[16px] p-[25px] flex flex-col justify-between gap-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#078bde]/40 transition-all"
              data-node-id="353:10214"
              data-name="Link - Action Card 2: Access Requests"
            >
              <div className="flex flex-col gap-[6.9px] w-full">
                <div className="flex items-center justify-between w-full" data-node-id="353:10216">
                  <div
                    className="bg-[rgba(142,191,222,0.2)] rounded-[12px] size-[48px] flex items-center justify-center"
                    data-node-id="353:10217"
                  >
                    <div className="size-[24px] relative">
                      <Image
                        src="/assets/doctor/imgFluentShieldKeyhole16Regular.svg"
                        alt="Shield"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="size-[32px] rounded-[9999px] flex items-center justify-center" data-node-id="353:10220">
                    <div className="size-[20px] relative">
                      <Image
                        src="/assets/doctor/imgSvg4.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-[13.1px]" data-node-id="353:10223">
                  <h3 className="font-['Inter'] font-bold text-[18px] text-[#02307d] leading-normal" data-node-id="353:10224">
                    Send &amp; Track Requests
                  </h3>
                </div>

                <div className="pb-[0.625px]" data-node-id="353:10225">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal mb-0">
                    Send requests to patients and track approvals,
                  </p>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal">
                    edits, and pending decisions in one place.
                  </p>
                </div>
              </div>

              <div className="pt-[24px] w-full" data-node-id="353:10227">
                <div className="border-t border-[#e9effd] pt-[17px] w-full" data-node-id="353:10228">
                  <Link
                    href="/doctor/access-requests"
                    className="flex gap-[4px] items-center text-[#078bde] hover:underline"
                  >
                    <span className="font-['Inter'] font-semibold text-[12px] leading-normal">
                      Send and track 5 requests
                    </span>
                    <div className="size-[16px] relative shrink-0">
                      <Image
                        src="/assets/doctor/imgSvg5.svg"
                        alt="Arrow"
                        width={16}
                        height={16}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Card 3: My Patients matching Figma Node 353:10232 */}
            <div
              className="bg-white border border-[#d0deff] rounded-[16px] p-[25px] flex flex-col justify-between gap-[24px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#078bde]/40 transition-all"
              data-node-id="353:10232"
              data-name="Link - Action Card 3: My Patients"
            >
              <div className="flex flex-col gap-[6.9px] w-full">
                <div className="flex items-center justify-between w-full" data-node-id="353:10234">
                  <div
                    className="bg-[rgba(142,191,222,0.2)] rounded-[12px] size-[48px] flex items-center justify-center"
                    data-node-id="353:10235"
                  >
                    <div className="size-[24px] relative">
                      <Image
                        src="/assets/doctor/imgGroup3.svg"
                        alt="My Patients"
                        width={24}
                        height={24}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="size-[32px] rounded-[9999px] flex items-center justify-center" data-node-id="353:10242">
                    <div className="size-[20px] relative">
                      <Image
                        src="/assets/doctor/imgSvg4.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-[13.1px]" data-node-id="353:10245">
                  <h3 className="font-['Inter'] font-bold text-[18px] text-[#02307d] leading-normal" data-node-id="353:10246">
                    My Patients
                  </h3>
                </div>

                <div className="pb-[0.625px]" data-node-id="353:10247">
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal mb-0">
                    Quickly browse and manage medical records of all
                  </p>
                  <p className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-normal">
                    patients under your ongoing care.
                  </p>
                </div>
              </div>

              <div className="pt-[24px] w-full" data-node-id="353:10249">
                <div className="border-t border-[#e9effd] pt-[17px] w-full" data-node-id="353:10250">
                  <Link
                    href="/doctor/find-patient"
                    className="flex gap-[3.99px] items-center text-[#078bde] hover:underline"
                  >
                    <span className="font-['Inter'] font-semibold text-[12px] leading-normal">
                      View Patient Directory
                    </span>
                    <div className="size-[16px] relative shrink-0">
                      <Image
                        src="/assets/doctor/imgSvg5.svg"
                        alt="Arrow"
                        width={16}
                        height={16}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Pending Access Requests matching Figma Node 353:10254 */}
        <section
          id="pending-requests"
          className="flex flex-col gap-[16px] w-full"
          data-node-id="353:10254"
          data-name="PendingAccessRequestsSection"
        >
          <div className="flex items-center justify-between w-full" data-node-id="353:10255">
            <div className="flex flex-col gap-[2px] w-[359px]" data-node-id="353:10256">
              <h2
                className="font-['Inter'] font-bold text-[24px] text-[#02307d] tracking-[-0.6px] leading-[32px] whitespace-nowrap"
                data-node-id="353:10258"
              >
                Pending Access Requests
              </h2>
              <p
                className="font-['Inter'] font-normal text-[14px] text-[#41474f] leading-[20px] whitespace-nowrap"
                data-node-id="353:10260"
              >
                Requests you sent to patients, awaiting their approval.
              </p>
            </div>

            <Link
              href="/doctor/access-requests"
              className="flex gap-[4px] items-center text-[#078bde] hover:underline"
              data-node-id="353:10261"
            >
              <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap">
                View All Requests (5)
              </span>
              <div className="size-[16px] relative shrink-0">
                <Image
                  src="/assets/doctor/imgSvg6.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Table / List Container matching Figma Node 353:10265 */}
          <div
            className="bg-white border border-[rgba(226,232,240,0.8)] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-clip w-full flex flex-col"
            data-node-id="353:10265"
          >
            {/* Tabs matching Figma Node 353:10266 */}
            <div className="border-b border-[rgba(226,232,240,0.8)] flex gap-[24px] px-[24px]" data-node-id="353:10266">
              <button
                type="button"
                onClick={() => setActiveTab("Pending")}
                className="flex flex-col gap-[8px] items-center py-[12px] cursor-pointer"
                data-node-id="353:10267"
              >
                <span
                  className={`font-['Inter'] text-[14px] leading-normal whitespace-nowrap ${
                    activeTab === "Pending" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                  }`}
                >
                  Pending ({pendingCount})
                </span>
                {activeTab === "Pending" && (
                  <div className="bg-[#078bde] h-[2px] w-[40px] rounded-[1px]" data-node-id="353:10269" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Approved")}
                className="flex flex-col gap-[8px] items-center py-[12px] cursor-pointer"
                data-node-id="353:10270"
              >
                <span
                  className={`font-['Inter'] text-[14px] leading-normal whitespace-nowrap ${
                    activeTab === "Approved" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                  }`}
                >
                  Approved (1)
                </span>
                {activeTab === "Approved" && (
                  <div className="bg-[#078bde] h-[2px] w-[40px] rounded-[1px]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Rejected")}
                className="flex flex-col gap-[8px] items-center py-[12px] cursor-pointer"
                data-node-id="353:10273"
              >
                <span
                  className={`font-['Inter'] text-[14px] leading-normal whitespace-nowrap ${
                    activeTab === "Rejected" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                  }`}
                >
                  Rejected (1)
                </span>
                {activeTab === "Rejected" && (
                  <div className="bg-[#078bde] h-[2px] w-[40px] rounded-[1px]" />
                )}
              </button>
            </div>

            {/* Pending Requests List matching Figma Node 353:10276 */}
            {activeTab === "Pending" && (
              <div className="w-full flex flex-col" data-node-id="353:10276">
                {requests.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-[24px] gap-4 w-full ${
                      index > 0 ? "border-t border-[#f1f5f9]" : ""
                    }`}
                    data-node-id={index === 0 ? "353:10277" : index === 1 ? "353:10297" : "353:10317"}
                  >
                    <div className="flex flex-1 gap-[16px] items-center">
                      {/* Exact Patient Photo */}
                      <div className="size-[56px] rounded-[12px] relative shrink-0 overflow-hidden" data-node-id="353:10279">
                        <Image
                          src={item.photoUrl}
                          alt={item.patientName}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-[6px] items-start" data-node-id="353:10280">
                        {/* Patient Header matching Figma */}
                        <div className="flex gap-[8px] items-center leading-normal whitespace-nowrap" data-node-id="353:10281">
                          <span className="font-['Inter'] font-bold text-[16px] text-[#02307d]">
                            {item.patientName}
                          </span>
                          <span className="font-['Inter'] font-normal text-[12px] text-[#8b8b8b]">
                            {item.pulseId}
                          </span>
                          <span className="font-['Inter'] font-normal text-[12px] text-[#996800]">
                            {item.status}
                          </span>
                        </div>

                        {/* Request Meta Chips matching Figma */}
                        <div className="flex flex-wrap gap-[8px] items-center" data-node-id="353:10285">
                          {/* Permission Chip */}
                          <div
                            className="bg-[rgba(142,191,222,0.2)] px-[8px] py-[2px] rounded-[9999px]"
                            data-node-id="353:10286"
                          >
                            <span className="font-['Inter'] font-semibold text-[12px] text-[#078bde] leading-normal whitespace-nowrap">
                              {item.permission}
                            </span>
                          </div>

                          {/* Categories Chip */}
                          <div
                            className="bg-[#f1f5f9] px-[8px] py-[2px] rounded-[9999px]"
                            data-node-id="353:10288"
                          >
                            <span className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-normal whitespace-nowrap">
                              {item.categories}
                            </span>
                          </div>

                          {/* Date Chip */}
                          <div
                            className="bg-[#f1f5f9] px-[8px] py-[2px] rounded-[9999px]"
                            data-node-id="353:10290"
                          >
                            <span className="font-['Inter'] font-normal text-[12px] text-[#8b8b8b] leading-normal whitespace-nowrap">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons matching Figma Node 353:10292 */}
                    <div className="flex gap-[10px] items-center shrink-0 self-end sm:self-center" data-node-id="353:10292">
                      <button
                        type="button"
                        onClick={() => setSelectedRequestDetails(item)}
                        className="bg-[#f1f5f9] hover:bg-slate-200 px-[14px] py-[8px] rounded-[12px] font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-normal whitespace-nowrap transition-colors cursor-pointer"
                        data-node-id="353:10293"
                      >
                        View Request Details
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCancelRequest(item.id, item.patientName)}
                        className="bg-[#fee2e2] hover:bg-rose-200 px-[14px] py-[8px] rounded-[12px] font-['Inter'] font-semibold text-[14px] text-[#ef4444] leading-normal whitespace-nowrap transition-colors cursor-pointer"
                        data-node-id="353:10295"
                      >
                        Cancel Pending Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Approved" && (
              <div className="p-[24px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-[56px] rounded-[12px] bg-emerald-50 text-emerald-700 font-bold text-lg flex items-center justify-center">
                      SM
                    </div>
                    <div>
                      <p className="font-bold text-[#02307d]">Sara Mahmoud Ibrahim</p>
                      <p className="text-xs text-slate-500">PID-2804-EGY • Full Access Approved on Nov 2, 2026</p>
                    </div>
                  </div>
                  <Link
                    href="/doctor/find-patient?id=29804120108924"
                    className="bg-[#078bde] text-white px-4 py-2 rounded-[12px] text-sm font-semibold hover:bg-[#0677BF]"
                  >
                    Open Patient Chart
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "Rejected" && (
              <div className="p-[24px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-[56px] rounded-[12px] bg-rose-50 text-rose-700 font-bold text-lg flex items-center justify-center">
                      KY
                    </div>
                    <div>
                      <p className="font-bold text-[#02307d]">Khaled Youssef</p>
                      <p className="text-xs text-slate-500">PID-6612-EGY • Patient declined on Oct 29, 2026</p>
                    </div>
                  </div>
                  <Link
                    href="/doctor/access-requests"
                    className="bg-slate-100 text-slate-700 px-4 py-2 rounded-[12px] text-sm font-semibold hover:bg-slate-200"
                  >
                    Resend Request
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section D: My Patients matching Figma Node 353:10337 */}
        <section
          className="flex flex-col gap-[16px] w-full"
          data-node-id="353:10337"
          data-name="MyPatientsSection"
        >
          <div className="flex items-center justify-between w-full" data-node-id="353:10338">
            <div className="flex flex-col gap-[2px]" data-node-id="353:10339">
              <h2
                className="font-['Inter'] font-bold text-[24px] text-[#02307d] tracking-[-0.6px] leading-[32px] whitespace-nowrap"
                data-node-id="353:10340"
              >
                My Patients
              </h2>
              <p
                className="font-['Inter'] font-normal text-[14px] text-[#475569] leading-[20px] whitespace-nowrap"
                data-node-id="353:10342"
              >
                Patients recently treated or consulted with active clinical synchronization.
              </p>
            </div>

            <Link
              href="/doctor/find-patient"
              className="flex gap-[4px] items-center text-[#078bde] hover:underline"
              data-node-id="353:10344"
            >
              <span className="font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap">
                See All Patients
              </span>
              <div className="size-[16px] relative shrink-0">
                <Image
                  src="/assets/doctor/imgSvg7.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* 4 Patient Cards Grid matching Figma Node 353:10348 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] w-full"
            data-node-id="353:10348"
            data-name="4 Patient Cards in a Responsive Desktop Grid matching reference"
          >
            {RECENT_PATIENTS.map((p, index) => (
              <div
                key={p.id}
                className="bg-white border border-[rgba(226,232,240,0.8)] rounded-[16px] p-[21px] flex flex-col justify-between drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
                data-node-id={index === 0 ? "353:10349" : index === 1 ? "353:10372" : index === 2 ? "353:10395" : "353:10418"}
              >
                <div className="flex flex-col gap-[16px] w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="bg-[#e8f5fd] rounded-[12px] size-[40px] flex items-center justify-center shrink-0">
                      <div className="size-[20px] relative">
                        <Image
                          src={p.iconUrl}
                          alt="Category Icon"
                          width={20}
                          height={20}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="bg-[#f1f5f9] px-[10px] py-[4px] rounded-[9999px]">
                      <span className="font-['Inter'] font-semibold text-[11px] text-[#64748b] leading-[16.5px] whitespace-nowrap">
                        {p.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[4px] w-full">
                    <div className="flex items-center justify-between w-full">
                      <h4 className="font-['Inter'] font-bold text-[16px] text-[#02307d] leading-[24px] whitespace-nowrap truncate">
                        {p.name}
                      </h4>
                      <div className={`${p.badgeBg} px-[8px] py-[2px] rounded-[9999px]`}>
                        <span className={`font-['Inter'] font-bold text-[10px] ${p.badgeText} leading-[15px] whitespace-nowrap`}>
                          {p.status}
                        </span>
                      </div>
                    </div>

                    <div className="overflow-hidden w-full">
                      <p className="font-['Inter'] font-normal text-[12px] text-[#64748b] leading-[16px] line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Link matching Figma */}
                <div className="pt-[20px] w-full">
                  <div className="border-t border-[#f1f5f9] pt-[13px] w-full">
                    <Link
                      href={`/doctor/find-patient?id=${p.nationalId}`}
                      className="flex items-center justify-between text-[#078bde] hover:underline w-full"
                    >
                      <span className="font-['Inter'] font-semibold text-[12px] leading-[16px] whitespace-nowrap">
                        View Medical Record
                      </span>
                      <div className="size-[16px] relative shrink-0">
                        <Image
                          src="/assets/doctor/imgSvg9.svg"
                          alt="Arrow"
                          width={16}
                          height={16}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Details Modal */}
      {selectedRequestDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#078BDE] uppercase tracking-wider">
                  Access Request Details
                </span>
                <h3 className="text-xl font-bold text-[#02307D] font-heading mt-0.5">
                  {selectedRequestDetails.patientName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedRequestDetails.pulseId} • ID: {selectedRequestDetails.nationalId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequestDetails(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Requested Permission:</span>
                <span className="font-bold text-[#02307D]">{selectedRequestDetails.permission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Data Categories:</span>
                <span className="font-bold text-slate-800">{selectedRequestDetails.categories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Initiated:</span>
                <span className="font-bold text-slate-800">{selectedRequestDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-[#996800]">{selectedRequestDetails.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              This request is waiting for the patient&apos;s authorization via their PulseID app or SMS verification code. Once authorized, clinical access will be granted instantly.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedRequestDetails(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCancelRequest(selectedRequestDetails.id, selectedRequestDetails.patientName);
                  setSelectedRequestDetails(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Footer matching Figma Node 353:10025 */}
      <DoctorFooter />
    </div>
  );
}
