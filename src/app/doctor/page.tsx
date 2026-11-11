"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Users,
  Search,
  ShieldCheck,
  ChevronRight,
  Calendar,
  AlertCircle,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

interface ClinicalAppointment {
  id: string;
  patientName: string;
  nationalId: string;
  age: number;
  time: string;
  reason: string;
  status: "Checked In" | "In Progress" | "Scheduled" | "Completed";
  accessGranted: boolean;
}

const TODAY_APPOINTMENTS: ClinicalAppointment[] = [
  {
    id: "apt-1",
    patientName: "Ahmed Hassan",
    nationalId: "28809140102345",
    age: 38,
    time: "09:30 AM",
    reason: "Cardiology Follow-up (Hypertension & Lipid Panel)",
    status: "Checked In",
    accessGranted: true,
  },
  {
    id: "apt-2",
    patientName: "Mariam Adel",
    nationalId: "29204150109876",
    age: 34,
    time: "10:15 AM",
    reason: "Hypertension Review & Medication Adjustment",
    status: "In Progress",
    accessGranted: true,
  },
  {
    id: "apt-3",
    patientName: "Omar Farouk",
    nationalId: "27911220104321",
    age: 47,
    time: "11:00 AM",
    reason: "Post-Surgical Evaluation (Appendectomy follow-up)",
    status: "Scheduled",
    accessGranted: false,
  },
  {
    id: "apt-4",
    patientName: "Fatima Mahmoud",
    nationalId: "29506180108765",
    age: 31,
    time: "11:45 AM",
    reason: "ECG & Echocardiogram Diagnostic Review",
    status: "Completed",
    accessGranted: true,
  },
  {
    id: "apt-5",
    patientName: "Khaled Youssef",
    nationalId: "28403190105432",
    age: 42,
    time: "12:30 PM",
    reason: "Routine Cardiovascular Health Check",
    status: "Scheduled",
    accessGranted: false,
  },
];

export default function DoctorDashboardPage() {
  const router = useRouter();
  const { isTokenVerified } = useAuth();
  const [quickSearchId, setQuickSearchId] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickSearchId.trim();
    if (!trimmed) {
      setSearchError("Please enter a National ID or Patient ID.");
      return;
    }
    setSearchError(null);
    router.push(`/doctor/find-patient?id=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:9999"
      data-name="Home home doctor"
    >
      {/* 1. Sticky Navigation Header matching Figma Node 353:10098 */}
      <DoctorNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Verification / Compliance Notice */}
        {!isTokenVerified && (
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#078BDE] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <span className="font-bold text-[#02307D]">Authenticated Provider Session: </span>
              Your clinician identity is verified with the Egyptian Medical Syndicate. All patient record accesses are biometrically logged under clinical compliance protocols.
            </div>
          </div>
        )}

        {/* Prototype Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Clinical Prototype Mode:</strong> Real-time EHR appointment schedules and doctor access requests are demonstrated using prototype models (<code className="font-mono bg-amber-100 px-1 rounded text-[11px]">BACKEND_UNSUPPORTED</code> in API v1).
          </div>
        </div>

        {/* Hero Clinical Overview Banner matching Figma Node 353:10003 */}
        <section className="bg-gradient-to-r from-[#02307D] via-[#03449E] to-[#078BDE] rounded-[24px] p-6 sm:p-8 lg:p-10 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs text-sky-200 w-fit">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Cardiology Clinical Intelligence Workspace</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-white font-heading leading-tight">
              Empowering Physicians with Instant, Verified Health Data
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-2xl">
              Access authenticated patient medical histories, certified diagnostic laboratory results, and prescription records with biometric patient consent.
            </p>

            {/* Quick Interactive Search Bar */}
            <form onSubmit={handleQuickSearch} className="mt-2 w-full max-w-xl flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={quickSearchId}
                  onChange={(e) => setQuickSearchId(e.target.value)}
                  placeholder="Enter 14-digit Egyptian National ID or Patient ID..."
                  className="w-full h-12 pl-11 pr-4 bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-900 placeholder-white/70 focus:placeholder-slate-400 text-sm rounded-xl border border-white/25 focus:border-[#078BDE] focus:outline-none focus:ring-2 focus:ring-[#078BDE] transition-all font-sans"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-slate-400" />
              </div>
              <button
                type="submit"
                className="h-12 px-6 rounded-xl bg-white text-[#02307D] hover:bg-sky-50 font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Find Patient</span>
                <ArrowRight className="w-4 h-4 text-[#078BDE]" />
              </button>
            </form>
            {searchError && (
              <p className="text-xs text-rose-200 font-medium">{searchError}</p>
            )}
          </div>
        </section>

        {/* 3 Clinical Stat Cards matching Figma Node 353:10139 */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          {/* Card 1: Patients Scheduled Today */}
          <div className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#078BDE]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  Patients Today
                </span>
                <span className="text-xs text-slate-500 font-sans">
                  12 Completed • 6 Pending
                </span>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-[#02307D] font-mono">
              18
            </span>
          </div>

          {/* Card 2: Active Access Grants */}
          <div className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  Active Access
                </span>
                <span className="text-xs text-slate-500 font-sans">
                  04 Pending Approvals
                </span>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              12
            </span>
          </div>

          {/* Card 3: Diagnostic Reviews Pending */}
          <div className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  Critical Reviews
                </span>
                <span className="text-xs text-slate-500 font-sans">
                  Lab &amp; ECG Sign-offs
                </span>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-amber-600 font-mono">
              03
            </span>
          </div>
        </section>

        {/* 3 Quick Action Cards matching Reference Layout (Node 353:10191) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-[#01091E] font-heading">
              Clinical Quick Actions
            </h2>
            <span className="text-xs text-slate-400 font-sans">
              Direct access to vital workflows
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Find Patient (Elevated Action) Node 353:10192 */}
            <div className="bg-white rounded-[20px] p-6 border-2 border-[#D0E5F5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#078BDE]">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#02307D]">
                  Elevated Action
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#02307D] font-heading">
                  Find Patient Records
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                  Search by 14-digit Egyptian National ID to inspect medical history, allergies, and diagnostic records.
                </p>
              </div>
              <Link
                href="/doctor/find-patient"
                className="w-full py-2.5 px-4 rounded-xl bg-[#02307D] hover:bg-[#03449E] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Launch Search Directory</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Access Requests Node 353:10214 */}
            <div className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Permissions
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#02307D] font-heading">
                  Patient Access Requests
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                  Request access permissions from patients and track active clinical consent status in real time.
                </p>
              </div>
              <Link
                href="/doctor/access-requests"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Manage Permissions</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Card 3: Physician Profile & Settings Node 353:10237 */}
            <div className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Credentials
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#02307D] font-heading">
                  Physician Credentials
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-1 leading-relaxed">
                  Verify syndicate registration details, clinic affiliations, and clinical operating schedule.
                </p>
              </div>
              <Link
                href="/doctor/profile"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>View Doctor Profile</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </section>

        {/* Today's Schedule Table matching Figma Node 353:10260 */}
        <section className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-[#078BDE]" />
                <h2 className="text-lg sm:text-xl font-bold text-[#02307D] font-heading">
                  Today&apos;s Consultation Schedule
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-sans mt-1">
                Mon, 9 November 2026 • 5 Consultations (Demonstration Schedule — EHR Scheduling BACKEND_UNSUPPORTED in v1)
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
              Prototype Demonstration
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Patient</th>
                  <th className="pb-3 px-4">Time</th>
                  <th className="pb-3 px-4">Consultation Reason</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {TODAY_APPOINTMENTS.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EAF2FF] text-[#02307D] font-bold text-xs flex items-center justify-center shrink-0">
                          {apt.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-bold text-[#02307D] leading-tight font-heading">
                            {apt.patientName}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            ID: {apt.nationalId} • {apt.age} yrs
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-700 font-mono">
                        {apt.time}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600">
                      {apt.reason}
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          apt.status === "Checked In"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : apt.status === "In Progress"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : apt.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {apt.status}
                      </span>
                    </td>

                    <td className="py-4 pr-2 text-right whitespace-nowrap">
                      {apt.accessGranted ? (
                        <Link
                          href={`/doctor/find-patient?id=${apt.nationalId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#02307D] hover:bg-blue-100 text-xs font-bold transition-colors"
                        >
                          <span>Open Chart</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <Link
                          href={`/doctor/access-requests?id=${apt.nationalId}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
                        >
                          <span>Request Access</span>
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer matching Figma Node 353:10025 */}
      <DoctorFooter />
    </div>
  );
}
