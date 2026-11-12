"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";
import {
  Users,
  Search,
  LockOpen,
  Clock,
  Shield,
  ArrowRight,
  ChevronRight,
  Send,
  X,
  CheckCircle2,
  FileText,
  Activity,
  Pill,
  Stethoscope,
} from "lucide-react";

interface PendingRequestItem {
  id: string;
  patientName: string;
  pulseId: string;
  nationalId: string;
  avatarText: string;
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
    avatarText: "AH",
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
    avatarText: "SA",
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
    avatarText: "TI",
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
    statusColor: "bg-[#ECFDF5] text-[#047857]",
    time: "Today, 10:30 AM",
    description: "Lab Results Uploaded — Fasting Glucose (94 mg/dL)",
    icon: Activity,
  },
  {
    id: "p-2",
    name: "Farida El-Sayed",
    nationalId: "29204150109876",
    status: "Follow-up",
    statusColor: "bg-[#EFF6FF] text-[#1D4ED8]",
    time: "Yesterday, 02:15 PM",
    description: "Prescription Refill — Lisinopril 10mg",
    icon: Pill,
  },
  {
    id: "p-3",
    name: "Omar Abdelaziz",
    nationalId: "27911220104321",
    status: "Consultation",
    statusColor: "bg-[#FFFBEB] text-[#B45309]",
    time: "Oct 24, 2026",
    description: "Radiology Report — Chest PA Digital X-Ray",
    icon: FileText,
  },
  {
    id: "p-4",
    name: "Nourhan Mostafa",
    nationalId: "29804120108924",
    status: "Routine",
    statusColor: "bg-[#F1F5F9] text-[#334155]",
    time: "Oct 21, 2026",
    description: "Vitals Check — BP 120/80 mmHg, Pulse 72 bpm",
    icon: Stethoscope,
  },
];

export default function DoctorDashboardPage() {
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

  // Normalize greeting name (e.g. "Dr. Mohamed." or "Dr. Karim Fouad")
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
      className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:9999"
      data-name="Home home doctor"
    >
      {/* 1. Sticky Navigation Header matching Figma Node 353:10098 */}
      <DoctorNavbar />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{notification}</p>
        </div>
      )}

      {/* 2. Hero Section matching Figma Node 353:10000 */}
      <section
        className="w-full relative bg-[#01091E] overflow-hidden border-b border-[#02307D]/30"
        data-node-id="353:10000"
      >
        {/* Background Image with Cinematic Overlay matching Figma Frame 1171277916 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/assets/figma/landing/hero-clinical-physician.png"
            alt="Clinical Intelligence Background"
            fill
            priority
            className="object-cover object-right-top opacity-35 mix-blend-luminosity"
          />
          {/* Exact Figma Gradient overlay: rgba(1,9,30,0.95) to rgba(1,9,30,0) via rgba(1,9,30,0.75) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#01091E] via-[#01091E]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01091E] via-transparent to-transparent z-10" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative z-20 flex flex-col items-start">
          <div className="max-w-3xl flex flex-col items-start gap-4" data-node-id="353:10004">
            {/* Heading 1 matching Figma Node 353:10006 */}
            <h1
              className="font-bold tracking-tight text-white font-heading text-4xl sm:text-5xl lg:text-[64px] leading-tight flex flex-col gap-1"
              data-node-id="353:10006"
              data-name="Heading 1"
            >
              <span className="text-white">Welcome back</span>
              <span className="text-[#078BDE]">{greetingDoctorName}</span>
            </h1>

            {/* Subtitle matching Figma Node 353:10010 */}
            <p
              className="text-[#EAEDF6] text-base sm:text-lg leading-relaxed max-w-[662px] font-sans mt-2"
              data-node-id="353:10010"
            >
              Manage your patients, send medical record access requests, and track patient approvals in one secure place.
            </p>

            {/* Dual CTA Buttons matching Figma Node 353:10012 */}
            <div
              className="flex flex-wrap items-center gap-4 pt-4 sm:pt-6"
              data-node-id="353:10012"
              data-name="Container"
            >
              {/* Primary: Send Access Request */}
              <Link
                href="/doctor/access-requests"
                className="bg-[#078BDE] hover:bg-[#0677BF] text-[#EAEDF6] hover:text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-[10px] shadow-sm flex items-center gap-2.5 transition-all cursor-pointer group"
                data-node-id="353:10013"
                data-name="Link"
              >
                <span>Send Access Request</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Secondary: Track Requests */}
              <a
                href="#pending-requests"
                className="bg-[rgba(2,48,125,0.55)] hover:bg-[rgba(2,48,125,0.85)] border border-[#02307D] text-[#EAEDF6] hover:text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-[10px] flex items-center gap-2.5 transition-all cursor-pointer"
                data-node-id="353:10014"
                data-name="Link"
              >
                <span>Track Requests</span>
                <ChevronRight className="w-4 h-4 text-[#078BDE]" />
              </a>
            </div>

            {/* Social / Trust Strip matching Figma Node 353:10016 */}
            <div
              className="border-t border-white/15 pt-6 sm:pt-8 mt-6 sm:mt-8 w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              data-node-id="353:10016"
              data-name="HorizontalBorder"
            >
              <span className="text-xs font-semibold tracking-[1.2px] text-white/70 uppercase">
                FOLLOW THE SUMMIT:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/share/19kGnJB7Bf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-md bg-[rgba(192,202,227,0.1)] border border-[#DDE7FF]/30 size-9 rounded-[8px] flex items-center justify-center text-white/80 hover:text-white hover:bg-[#078BDE] transition-all"
                  title="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/pulseid-tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-md bg-[rgba(192,202,227,0.1)] border border-[#DDE7FF]/30 size-9 rounded-[8px] flex items-center justify-center text-white/80 hover:text-white hover:bg-[#078BDE] transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/pulseid.eg?obrf=b3hqdTYwam9qMGs1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="backdrop-blur-md bg-[rgba(192,202,227,0.1)] border border-[#DDE7FF]/30 size-9 rounded-[8px] flex items-center justify-center text-white/80 hover:text-white hover:bg-[#078BDE] transition-all"
                  title="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="mailto:Admin@pulseideg.com"
                  className="backdrop-blur-md bg-[rgba(192,202,227,0.1)] border border-[#DDE7FF]/30 size-9 rounded-[8px] flex items-center justify-center text-white/80 hover:text-white hover:bg-[#078BDE] transition-all"
                  title="Email PulseID"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Container matching Figma Node 353:10138 */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col gap-12">
        {/* Section A: 3 Overview Statistics Cards matching Figma Node 353:10139 */}
        <section
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full"
          data-node-id="353:10139"
          data-name="HeroOverviewSection → 3 Overview Statistics Cards"
        >
          {/* Card 1: Total Patients matching Figma Node 353:10140 */}
          <div
            className="bg-white border border-[#DDE7FF] rounded-[16px] p-5 sm:p-[21px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-1 hover:border-[#078BDE]/40 transition-colors"
            data-node-id="353:10140"
            data-name="Stat Card 1"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#41474F]">
                Total Patients
              </span>
              <div className="bg-[rgba(139,139,139,0.15)] size-10 rounded-[12px] flex items-center justify-center text-slate-700">
                <Users className="w-5 h-5 text-[#078BDE]" />
              </div>
            </div>

            <div className="flex items-center justify-between my-2">
              <span className="text-[30px] font-bold text-[#078BDE] leading-[36px] font-mono">
                148
              </span>
              <span className="bg-[rgba(139,139,139,0.15)] text-[#01091E] font-semibold text-xs px-2.5 py-0.5 rounded-full">
                +12 this month
              </span>
            </div>

            <p className="text-xs text-[#727272]">
              Under active ongoing medical management
            </p>
          </div>

          {/* Card 2: Pending Requests matching Figma Node 353:10158 */}
          <div
            className="bg-white border border-[#DDE7FF] rounded-[16px] p-5 sm:p-[21px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-1 hover:border-[#078BDE]/40 transition-colors"
            data-node-id="353:10158"
            data-name="Stat Card 2"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#41474F]">
                Pending Requests
              </span>
              <div className="bg-[rgba(142,191,222,0.2)] size-10 rounded-[12px] flex items-center justify-center text-[#078BDE]">
                <LockOpen className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between my-2">
              <span className="text-[30px] font-bold text-[#078BDE] leading-[36px] font-mono">
                {pendingCount} Pending
              </span>
              <span className="bg-[rgba(142,191,222,0.2)] text-[#045385] font-semibold text-xs px-2.5 py-0.5 rounded-full">
                Patient approval
              </span>
            </div>

            <p className="text-xs text-[#727272]">
              Requests sent by you and waiting for patient approval
            </p>
          </div>

          {/* Card 3: Recently Accessed matching Figma Node 353:10171 */}
          <div
            className="bg-white border border-[#DDE7FF] rounded-[16px] p-5 sm:p-[21px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-1 hover:border-[#078BDE]/40 transition-colors"
            data-node-id="353:10171"
            data-name="Stat Card 3"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-[#41474F]">
                Recently Accessed
              </span>
              <div className="bg-[rgba(68,239,99,0.15)] size-10 rounded-[12px] flex items-center justify-center text-[#047857]">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-center justify-between my-2">
              <span className="text-[30px] font-bold text-[#078BDE] leading-[36px] font-mono">
                24 Patients
              </span>
              <span className="bg-[rgba(68,239,99,0.15)] text-[#047857] font-semibold text-xs px-2.5 py-0.5 rounded-full">
                Updated today
              </span>
            </div>

            <p className="text-xs text-[#727272]">
              EHR synchronizations past 24 hours
            </p>
          </div>
        </section>

        {/* Section B: Quick Actions matching Figma Node 353:10185 */}
        <section
          className="flex flex-col gap-4 w-full"
          data-node-id="353:10185"
          data-name="QuickActionsSection"
        >
          <div className="flex flex-col gap-1">
            <h2
              className="text-2xl font-bold text-[#078BDE] tracking-tight font-heading"
              data-node-id="353:10188"
            >
              Quick Actions
            </h2>
            <p className="text-sm text-[#41474F]" data-node-id="353:10190">
              Direct access to essential clinical workflows, patient lookup, and permission controls.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            data-node-id="353:10191"
            data-name="3 Quick Action Cards matching Reference Layout"
          >
            {/* Card 1: Find Patient (Elevated Action) matching Figma Node 353:10192 */}
            <div
              className="bg-white border-2 border-[rgba(7,139,222,0.4)] rounded-[16px] p-6 shadow-md flex flex-col justify-between gap-5 relative hover:border-[#078BDE] transition-colors"
              data-node-id="353:10192"
              data-name="Action Card 1: Find Patient (Elevated Action)"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-[rgba(142,191,222,0.2)] size-12 rounded-[12px] flex items-center justify-center text-[#078BDE]">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center text-[#078BDE]">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#02307D] font-heading">
                    Find Patient
                  </h3>
                  <p className="text-sm text-[#41474F] mt-1 leading-normal">
                    Instantly lookup a patient using their 14-digit National ID, Pulse ID, or full legal name.
                  </p>
                </div>
              </div>

              {/* Quick Interactive Lookup Input matching Figma Node 353:10207 */}
              <div className="border-t border-[#E9EFFD] pt-4">
                <form onSubmit={handleQuickSearch} className="relative w-full">
                  <input
                    type="text"
                    value={quickSearchId}
                    onChange={(e) => {
                      setQuickSearchId(e.target.value);
                      if (searchError) setSearchError(null);
                    }}
                    placeholder="National ID / Pulse ID..."
                    className="w-full h-11 pl-3.5 pr-20 bg-[rgba(192,202,227,0.1)] border border-[#D0DEFF] focus:border-[#078BDE] focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#078BDE] transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#078BDE] hover:bg-[#0677BF] text-white font-semibold text-xs px-3.5 py-1.5 rounded-[6px] transition-colors cursor-pointer shadow-2xs"
                  >
                    Search
                  </button>
                </form>
                {searchError && (
                  <p className="text-xs text-rose-500 font-medium mt-1.5">{searchError}</p>
                )}
              </div>
            </div>

            {/* Card 2: Send & Track Requests matching Figma Node 353:10214 */}
            <div
              className="bg-white border border-[#D0DEFF] rounded-[16px] p-6 shadow-xs flex flex-col justify-between gap-5 hover:shadow-md hover:border-[#078BDE]/40 transition-all"
              data-node-id="353:10214"
              data-name="Link - Action Card 2: Access Requests"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-[rgba(142,191,222,0.2)] size-12 rounded-[12px] flex items-center justify-center text-[#078BDE]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#02307D] font-heading">
                    Send &amp; Track Requests
                  </h3>
                  <p className="text-sm text-[#41474F] mt-1 leading-normal">
                    Send requests to patients and track approvals, edits, and pending decisions in one place.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E9EFFD] pt-4">
                <Link
                  href="/doctor/access-requests"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#078BDE] hover:underline"
                >
                  <span>Send and track 5 requests</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: My Patients matching Figma Node 353:10232 */}
            <div
              className="bg-white border border-[#D0DEFF] rounded-[16px] p-6 shadow-xs flex flex-col justify-between gap-5 hover:shadow-md hover:border-[#078BDE]/40 transition-all"
              data-node-id="353:10232"
              data-name="Link - Action Card 3: My Patients"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="bg-[rgba(142,191,222,0.2)] size-12 rounded-[12px] flex items-center justify-center text-[#078BDE]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="size-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#02307D] font-heading">
                    My Patients
                  </h3>
                  <p className="text-sm text-[#41474F] mt-1 leading-normal">
                    Quickly browse and manage medical records of all patients under your ongoing care.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E9EFFD] pt-4">
                <Link
                  href="/doctor/find-patient"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#078BDE] hover:underline"
                >
                  <span>View Patient Directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Pending Access Requests matching Figma Node 353:10254 */}
        <section
          id="pending-requests"
          className="flex flex-col gap-4 w-full"
          data-node-id="353:10254"
          data-name="PendingAccessRequestsSection"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-[#02307D] tracking-tight font-heading">
                Pending Access Requests
              </h2>
              <p className="text-sm text-[#41474F] mt-0.5">
                Requests you sent to patients, awaiting their approval.
              </p>
            </div>
            <Link
              href="/doctor/access-requests"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#078BDE] hover:underline"
            >
              <span>View All Requests (5)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Table / List Container matching Figma Node 353:10265 */}
          <div className="bg-white border border-slate-200/80 rounded-[16px] shadow-xs overflow-clip">
            {/* Tabs matching Figma Node 353:10266 */}
            <div className="border-b border-slate-200/80 px-6 flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("Pending")}
                className={`py-3 text-sm flex flex-col items-center gap-2 cursor-pointer transition-colors relative ${
                  activeTab === "Pending"
                    ? "font-bold text-[#078BDE]"
                    : "font-semibold text-[#727272] hover:text-slate-900"
                }`}
              >
                <span>Pending ({pendingCount})</span>
                {activeTab === "Pending" && (
                  <span className="w-10 h-0.5 bg-[#078BDE] rounded-full absolute bottom-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Approved")}
                className={`py-3 text-sm flex flex-col items-center gap-2 cursor-pointer transition-colors relative ${
                  activeTab === "Approved"
                    ? "font-bold text-[#078BDE]"
                    : "font-semibold text-[#727272] hover:text-slate-900"
                }`}
              >
                <span>Approved (1)</span>
                {activeTab === "Approved" && (
                  <span className="w-10 h-0.5 bg-[#078BDE] rounded-full absolute bottom-0" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("Rejected")}
                className={`py-3 text-sm flex flex-col items-center gap-2 cursor-pointer transition-colors relative ${
                  activeTab === "Rejected"
                    ? "font-bold text-[#078BDE]"
                    : "font-semibold text-[#727272] hover:text-slate-900"
                }`}
              >
                <span>Rejected (1)</span>
                {activeTab === "Rejected" && (
                  <span className="w-10 h-0.5 bg-[#078BDE] rounded-full absolute bottom-0" />
                )}
              </button>
            </div>

            {/* Requests List */}
            {activeTab === "Pending" && (
              <div className="divide-y divide-slate-100">
                {requests.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No pending requests at this time.
                  </div>
                ) : (
                  requests.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="size-14 rounded-[12px] bg-[#E8F5FD] text-[#02307D] font-bold text-lg flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs font-mono">
                          {item.avatarText}
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-base text-[#02307D] font-heading">
                              {item.patientName}
                            </span>
                            <span className="text-xs text-[#8B8B8B] font-mono">
                              {item.pulseId}
                            </span>
                            <span className="text-xs font-semibold text-[#996800] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                              Pending
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-[rgba(142,191,222,0.2)] text-[#078BDE] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              {item.permission}
                            </span>
                            <span className="bg-[#F1F5F9] text-[#727272] text-xs px-2.5 py-0.5 rounded-full font-medium">
                              {item.categories}
                            </span>
                            <span className="bg-[#F1F5F9] text-[#8B8B8B] text-xs px-2.5 py-0.5 rounded-full font-medium">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons matching Figma Node 353:10292 */}
                      <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedRequestDetails(item)}
                          className="bg-[#F1F5F9] hover:bg-slate-200 text-[#41474F] font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-[12px] transition-colors cursor-pointer"
                        >
                          View Request Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancelRequest(item.id, item.patientName)}
                          className="bg-[#FEE2E2] hover:bg-red-200 text-[#EF4444] font-semibold text-xs sm:text-sm px-3.5 py-2 rounded-[12px] transition-colors cursor-pointer"
                        >
                          Cancel Pending Request
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "Approved" && (
              <div className="p-6 divide-y divide-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-[12px] bg-emerald-50 text-emerald-700 font-bold text-lg flex items-center justify-center shrink-0 border border-emerald-200">
                      SM
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#02307D]">
                          Sara Mahmoud Ibrahim
                        </span>
                        <span className="text-xs text-[#8B8B8B] font-mono">
                          PID-2804-EGY
                        </span>
                        <span className="text-xs font-semibold text-[#047857] bg-emerald-50 px-2 py-0.5 rounded-md">
                          Approved
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Full Clinical Access Granted • Verified via OTP on Nov 2, 2026
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/doctor/find-patient?id=29804120108924"
                    className="bg-[#078BDE] text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-[12px] hover:bg-[#0677BF] transition-colors"
                  >
                    Open Patient Chart
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "Rejected" && (
              <div className="p-6 divide-y divide-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-[12px] bg-rose-50 text-rose-700 font-bold text-lg flex items-center justify-center shrink-0 border border-rose-200">
                      KY
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#02307D]">
                          Khaled Youssef
                        </span>
                        <span className="text-xs text-[#8B8B8B] font-mono">
                          PID-6612-EGY
                        </span>
                        <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                          Declined
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Patient declined EHR sync request on Oct 29, 2026
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/doctor/access-requests"
                    className="bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm px-4 py-2 rounded-[12px] hover:bg-slate-200 transition-colors"
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
          className="flex flex-col gap-4 w-full"
          data-node-id="353:10337"
          data-name="MyPatientsSection"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-[#02307D] tracking-tight font-heading">
                My Patients
              </h2>
              <p className="text-sm text-[#475569] mt-0.5">
                Patients recently treated or consulted with active clinical synchronization.
              </p>
            </div>
            <Link
              href="/doctor/find-patient"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#078BDE] hover:underline"
            >
              <span>See All Patients</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Patient Cards Grid matching Figma Node 353:10348 */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
            data-node-id="353:10348"
            data-name="4 Patient Cards in a Responsive Desktop Grid matching reference"
          >
            {RECENT_PATIENTS.map((p) => {
              const IconComp = p.icon;
              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200/80 rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-4 hover:shadow-md hover:border-[#078BDE]/40 transition-all"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="size-10 rounded-[12px] bg-[#E8F5FD] flex items-center justify-center text-[#078BDE]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="bg-[#F1F5F9] text-[#64748B] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {p.time}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-base text-[#02307D] font-heading truncate">
                          {p.name}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.statusColor}`}>
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] line-clamp-2 mt-0.5 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-[#F1F5F9] pt-3">
                    <Link
                      href={`/doctor/find-patient?id=${p.nationalId}`}
                      className="flex items-center justify-between text-xs font-semibold text-[#078BDE] hover:underline"
                    >
                      <span>View Medical Record</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
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
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
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
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCancelRequest(selectedRequestDetails.id, selectedRequestDetails.patientName);
                  setSelectedRequestDetails(null);
                }}
                className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-colors"
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
