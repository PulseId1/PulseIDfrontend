"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import {
  ShieldCheck,
  Building,
  Phone,
  AlertTriangle,
  Award,
  CheckCircle2,
  Trash2,
  X,
  Clock,
} from "lucide-react";

export default function DoctorProfilePage() {
  const router = useRouter();
  const { logout, userId, isDemo } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // In demo mode, reflect Dr. Tarek Al-Husseini's pulmonology credentials
  const doctorName = isDemo ? "Dr. Tarek Al-Husseini, MD, FCCP" : "Dr. Ahmed Mahmoud Hassan, MD, FESC";
  const doctorInitials = isDemo ? "TH" : "AH";
  const doctorTitle = isDemo
    ? "Consultant Pulmonologist & Respiratory Specialist • Kasr Al Ainy University Hospitals"
    : "Consultant Interventional Cardiologist • Kasr Al Ainy University Hospitals";
  const legalName = isDemo ? "Tarek Al-Husseini" : "Ahmed Mahmoud Hassan";
  const degree = isDemo ? "MBBCh, MSc, MD (Pulmonology)" : "MBBCh, MSc, MD (Cardiology)";
  const fellowship = isDemo
    ? "Fellow of the American College of Chest Physicians (FCCP)"
    : "Fellow of the European Society of Cardiology (FESC)";
  const specialty = isDemo ? "Pulmonary & Respiratory Medicine" : "Cardiovascular Medicine";
  const subspecialty = isDemo
    ? "Severe Asthma, Airway Diseases & Spirometry"
    : "Coronary Angioplasty & Echocardiography";
  const clinicAddress = isDemo
    ? "Medical Park Premier, North 90th St, New Cairo, Egypt"
    : "Building 44, North 90th Street, New Cairo, Egypt";
  const email = isDemo ? "dr.tarek.husseini@pulseid-demo.eg" : "dr.ahassan@kasralainy.edu.eg";

  const handleDeleteAccount = () => {
    if (confirmText.toLowerCase() !== "delete") return;
    setIsDeleting(true);
    setTimeout(() => {
      logout();
      router.replace("/auth/login?role=doctor&deleted=true");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:11005"
      data-name="doctor info"
    >
      <DoctorNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Page Introduction */}
        <div className="flex flex-col gap-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
            Physician Profile &amp; Practice Credentials
          </h1>
          <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans">
            Manage your verified practitioner identity, medical syndicate credentials, and institutional clinic affiliations.
          </p>
        </div>

        {/* Prototype Demonstration Banner */}
        <div className="w-full p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Design Template / Prototype:</strong> This screen renders the Figma physician credentials layout (node <code>353:11005</code>). In API v1, detailed doctor syndicate/fellowship fields are not provided by the backend (<code className="font-mono text-[11px] bg-amber-100 px-1 rounded">BACKEND_UNSUPPORTED</code>).
          </div>
        </div>

        {/* Hero Identity Banner matching Figma Node 353:11046 */}
        <div className="bg-gradient-to-r from-[#02307D] via-[#03449E] to-[#078BDE] rounded-[24px] p-6 sm:p-8 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white text-[#02307D] font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg shrink-0">
            {doctorInitials}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {doctorName}
              </h2>
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-sky-100 text-xs font-bold border border-white/30 backdrop-blur-xs inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                Syndicate Verified
              </span>
            </div>

            <p className="text-sm text-sky-100 font-sans">
              {doctorTitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-200 font-mono">
              <span>Syndicate Reg: #EG-MED-491028</span>
              <span>•</span>
              <span>License Status: Active (Expires Dec 2028)</span>
              <span>•</span>
              <span>User ID: {userId || "DOC-DEMO-8842"}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Credentials & Affiliations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Card 1: Personal & Medical Credentials */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#078BDE]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#02307D] font-heading">
                    Syndicate &amp; Academic Credentials
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Official medical license records on file.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 mt-4 text-xs sm:text-sm">
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Full Legal Name</span>
                  <span className="font-bold text-[#02307D] font-heading">{legalName}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Egyptian Syndicate ID</span>
                  <span className="font-bold text-[#02307D] font-mono">491028</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Medical Degree</span>
                  <span className="font-bold text-[#02307D]">{degree}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Fellowship</span>
                  <span className="font-bold text-[#02307D]">{fellowship}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Primary Specialty</span>
                  <span className="font-bold text-[#078BDE]">{specialty}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-slate-500 font-sans">Sub-specialty</span>
                  <span className="font-bold text-slate-800">{subspecialty}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-[#02307D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#078BDE] shrink-0" />
              <span>Certified under Egyptian Ministry of Health Law No. 415/1954 for Medical Practice.</span>
            </div>
          </div>

          {/* Card 2: Hospital Affiliations & Consultation Hours */}
          <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#02307D] font-heading">
                    Affiliations &amp; Clinic Hours
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Registered clinical consultation locations.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 mt-4 text-xs sm:text-sm">
                <div className="py-3">
                  <span className="text-slate-500 text-xs block mb-1">Primary Academic Hospital</span>
                  <p className="font-bold text-[#02307D] leading-tight">
                    Kasr Al Ainy University Hospital, Cairo University
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isDemo
                      ? "Department of Pulmonology & Respiratory Medicine • Inpatient & Bronchoscopy Suite"
                      : "Department of Cardiovascular Medicine • Inpatient & Cath Lab"}
                  </p>
                </div>

                <div className="py-3">
                  <span className="text-slate-500 text-xs block mb-1">Private Practice Center</span>
                  <p className="font-bold text-[#02307D] leading-tight">
                    {isDemo ? "New Cairo Chest & Allergy Clinic" : "Pulse Heart & Vascular Clinic"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {clinicAddress}
                  </p>
                </div>

                <div className="py-3">
                  <span className="text-slate-500 text-xs block mb-1">Consultation Schedule</span>
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-700 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#078BDE]" />
                      <span className="font-semibold">Mon &amp; Wed:</span> 09:00 AM - 02:00 PM (Kasr Al Ainy)
                    </p>
                    <p className="text-slate-700 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#078BDE]" />
                      <span className="font-semibold">Sat &amp; Thu:</span> 04:00 PM - 09:00 PM (New Cairo Clinic)
                    </p>
                  </div>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-slate-500 text-xs">Professional Email</span>
                  <span className="font-mono text-xs text-[#078BDE]">{email}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Clinic Appointments Direct Hotline: <strong>+20 2 2794 8800</strong></span>
            </div>
          </div>
        </div>

        {/* Danger Zone: Account Deletion matching Figma Node 353:11290 */}
        <div className="bg-rose-50/50 rounded-[24px] p-6 sm:p-7 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-rose-900 font-heading">
                Deactivate Practitioner Credentials
              </h3>
            </div>
            <p className="text-xs text-rose-700 mt-1 max-w-xl font-sans">
              Permanently deactivates your physician profile on PulseID. All active patient consent grants and pending record requests will be immediately revoked.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Doctor Account</span>
          </button>
        </div>
      </main>

      {/* Delete Confirmation Modal matching Figma Node 353:11290 */}
      {deleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#01091E] font-heading">
                  Confirm Account Deletion
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#41474F] leading-relaxed font-sans">
              This action cannot be undone. To verify that you want to permanently revoke your practitioner identity and delete all associated records, type <strong className="text-rose-600 font-mono">delete</strong> below:
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type 'delete' to confirm"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={confirmText.toLowerCase() !== "delete" || isDeleting}
                onClick={handleDeleteAccount}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isDeleting ? "Deactivating..." : "Permanently Deactivate"}
              </button>
            </div>
          </div>
        </div>
      )}

      <DoctorFooter />
    </div>
  );
}
