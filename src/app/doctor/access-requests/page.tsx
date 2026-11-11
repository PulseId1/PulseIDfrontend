"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  ChevronRight,
} from "lucide-react";

interface DoctorAccessRequest {
  id: string;
  patientName: string;
  nationalId: string;
  department: string;
  reason: string;
  scope: string;
  duration: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "expired";
}

const INITIAL_REQUESTS: DoctorAccessRequest[] = [
  {
    id: "req-101",
    patientName: "Ahmed Hassan",
    nationalId: "28809140102345",
    department: "Cardiology",
    reason: "Review hypertension history & evaluate new echocardiogram",
    scope: "Full Medical Records",
    duration: "7 Days",
    requestDate: "03 Nov 2026",
    status: "approved",
  },
  {
    id: "req-102",
    patientName: "Omar Farouk",
    nationalId: "27911220104321",
    department: "General Surgery",
    reason: "Post-surgical follow-up and surgical notes review",
    scope: "Surgeries & Medications",
    duration: "24 Hours",
    requestDate: "08 Nov 2026",
    status: "pending",
  },
  {
    id: "req-103",
    patientName: "Khaled Youssef",
    nationalId: "28403190105432",
    department: "Cardiology",
    reason: "Routine cardiovascular check & lipid telemetry review",
    scope: "Lab Tests & Allergies",
    duration: "30 Days",
    requestDate: "07 Nov 2026",
    status: "pending",
  },
  {
    id: "req-104",
    patientName: "Nadia Soliman",
    nationalId: "29107120108934",
    department: "Cardiology",
    reason: "Second opinion on Holter monitor results",
    scope: "Radiology & Reports",
    duration: "24 Hours",
    requestDate: "20 Oct 2026",
    status: "expired",
  },
];

function DoctorAccessRequestsContent() {
  const searchParams = useSearchParams();
  const prefilledId = searchParams.get("id") || "";

  const [requests, setRequests] = useState<DoctorAccessRequest[]>(INITIAL_REQUESTS);
  const [nationalIdInput, setNationalIdInput] = useState(prefilledId);
  const [department, setDepartment] = useState("Cardiology");
  const [reason, setReason] = useState("");
  const [scope, setScope] = useState("Full Medical Records");
  const [duration, setDuration] = useState("7 Days");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalIdInput.trim() || nationalIdInput.trim().length !== 14) {
      setFormError("Please enter a valid 14-digit Egyptian National ID.");
      return;
    }
    if (!reason.trim()) {
      setFormError("Please provide a clinical justification / reason for requesting access.");
      return;
    }

    setFormError(null);

    const newReq: DoctorAccessRequest = {
      id: `req-${Date.now()}`,
      patientName: nationalIdInput.trim() === "28809140102345" ? "Ahmed Hassan" : `Patient (${nationalIdInput.slice(-4)})`,
      nationalId: nationalIdInput.trim(),
      department,
      reason: reason.trim(),
      scope,
      duration,
      requestDate: "Today",
      status: "pending",
    };

    setRequests([newReq, ...requests]);
    setSubmitSuccess(true);
    setReason("");
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const handleCancelRequest = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:10441"
      data-name="Access Requests · Desktop"
    >
      <DoctorNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Page Introduction matching Figma Node 353:10487 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
              Patient Permission &amp; Access Requests
            </h1>
            <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans max-w-2xl">
              Request authorized access to patient health records, diagnostic tests, and past clinical histories. All requests require explicit patient authorization.
            </p>
          </div>
          <span className="text-[12px] font-semibold text-slate-400 font-mono">
            9 Nov 2026
          </span>
        </div>

        {/* Prototype Demonstration Banner */}
        <div className="w-full p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Demonstration Prototype:</strong> Electronic patient consent dispatch and permission tracking are simulated using prototype state (<code className="font-mono bg-amber-100 px-1 rounded text-[11px]">BACKEND_UNSUPPORTED</code> in API v1).
          </div>
        </div>

        {/* Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  Pending Approvals
                </span>
                <span className="text-xs text-slate-500">
                  Awaiting patient authorization
                </span>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-amber-600 font-mono">
              0{pendingCount}
            </span>
          </div>

          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  Active Access Grants
                </span>
                <span className="text-xs text-slate-500">
                  Full chart access active
                </span>
              </div>
            </div>
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">
              0{approvedCount}
            </span>
          </div>

          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#078BDE]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#02307D] font-heading block">
                  HIPAA / Syndicate Standard
                </span>
                <span className="text-xs text-slate-500">
                  Biometrically audited logs
                </span>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#02307D]">
              Compliant
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Form (Left) & Requests Table (Right) matching Figma Node 353:10520 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: New Request Form (5 cols) matching Node 353:10521 */}
          <div className="lg:col-span-5 bg-white rounded-[24px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-[#02307D] font-heading flex items-center gap-2">
                <Send className="w-4 h-4 text-[#078BDE]" />
                <span>Submit New Access Request</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Demonstration workflow for patient record permission requests.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#078BDE] shrink-0 mt-0.5" />
                <div>
                  <strong>Demonstration Request Logged:</strong> The request was added to your local tracking session. <em>(Electronic patient consent endpoints are BACKEND_UNSUPPORTED in API v1; no live SMS or biometric notification was dispatched).</em>
                </div>
              </div>
            )}

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 font-sans">
                  Patient National ID (14 Digits) *
                </label>
                <input
                  type="text"
                  maxLength={14}
                  required
                  value={nationalIdInput}
                  onChange={(e) => setNationalIdInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 28809140102345"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:border-[#078BDE] focus:outline-none focus:ring-2 focus:ring-[#078BDE]/20 transition-all"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tip: Use demo ID <code className="font-mono font-bold text-[#02307D]">28809140102345</code> for Ahmed Hassan.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 font-sans">
                  Clinical Department / Specialty *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#078BDE] focus:outline-none focus:ring-2 focus:ring-[#078BDE]/20 transition-all"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="General Surgery">General Surgery</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Pulmonology">Pulmonology</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 font-sans">
                  Clinical Justification / Reason *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Inpatient cardiovascular diagnostic consultation and medication adjustment..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#078BDE] focus:outline-none focus:ring-2 focus:ring-[#078BDE]/20 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-sans">
                    Scope of Records
                  </label>
                  <select
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#078BDE] focus:outline-none"
                  >
                    <option value="Full Medical Records">Full Chart</option>
                    <option value="Lab Tests only">Lab Tests only</option>
                    <option value="Radiology & Reports">Radiology &amp; Reports</option>
                    <option value="Allergies & Medications">Allergies &amp; Meds</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 font-sans">
                    Access Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-[#078BDE] focus:outline-none"
                  >
                    <option value="24 Hours">24 Hours</option>
                    <option value="7 Days">7 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="Treatment Plan (90 Days)">90 Days</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#02307D] hover:bg-[#03449E] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Access Request to Patient</span>
              </button>
            </form>
          </div>

          {/* Right Column: Tracking Table (7 cols) matching Node 353:10614 */}
          <div className="lg:col-span-7 bg-white rounded-[24px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-[#02307D] font-heading">
                  Tracked Access Requests &amp; Grants
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Audit trail of all permissions dispatched from your physician account.
                </p>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono">
                {requests.length} Requests
              </span>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border border-slate-100 bg-[#FBFDFF] hover:border-slate-200 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] text-[#02307D] font-bold text-xs flex items-center justify-center shrink-0">
                        {req.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-[#02307D] font-heading">
                            {req.patientName}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              req.status === "approved"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : req.status === "pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {req.status === "approved"
                              ? "Active Access"
                              : req.status === "pending"
                              ? "Pending Patient"
                              : "Expired"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          National ID: {req.nationalId} • Scope: {req.scope}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-sans">
                      {req.requestDate}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 font-sans">
                    <span className="font-semibold text-slate-700">Justification: </span>
                    {req.reason} ({req.duration})
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Dept: {req.department}
                    </span>

                    <div className="flex items-center gap-2">
                      {req.status === "approved" && (
                        <Link
                          href={`/doctor/find-patient?id=${req.nationalId}`}
                          className="px-3 py-1.5 rounded-lg bg-[#02307D] text-white hover:bg-[#03449E] text-xs font-bold transition-colors inline-flex items-center gap-1"
                        >
                          <span>Open Medical Chart</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {req.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleCancelRequest(req.id)}
                          className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <DoctorFooter />
    </div>
  );
}

export default function DoctorAccessRequestsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFEFF]" />}>
      <DoctorAccessRequestsContent />
    </Suspense>
  );
}
