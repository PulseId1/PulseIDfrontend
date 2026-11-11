"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PatientNavbar,
  PatientProfileBanner,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { PatientService } from "@/lib/api/patient-service";
import { AccessRequestItem } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export default function AccessRequestsPage() {
  const { isDemo } = useAuth();
  const [requests, setRequests] = useState<AccessRequestItem[]>(() =>
    PatientService.getAccessRequests()
  );
  const [selectedRequest, setSelectedRequest] = useState<AccessRequestItem | null>(null);
  const [modalType, setModalType] = useState<"approve" | "reject" | "revoke" | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (isDemo) {
      const timer = setTimeout(() => {
        setRequests(DemoService.getAccessRequests());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDemo]);

  const pendingList = requests.filter((r) => r.status === "pending");
  const activeList = requests.filter((r) => r.status === "approved");
  const historyList = requests.filter((r) => r.status === "rejected" || r.status === "revoked");

  const openModal = (req: AccessRequestItem, type: "approve" | "reject" | "revoke") => {
    setSelectedRequest(req);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalType(null);
  };

  const handleConfirmAction = () => {
    if (!selectedRequest || !modalType) return;

    if (isDemo) {
      const updated = DemoService.respondToAccessRequest(
        selectedRequest.id,
        modalType === "approve" ? "approve" : "reject"
      );
      setRequests(updated);
      setActionNotice(
        `Demo Mode: Request from ${selectedRequest.doctorName} marked as ${
          modalType === "approve" ? "Approved" : "Rejected"
        } in local demo fixtures.`
      );
      closeModal();
      setTimeout(() => setActionNotice(null), 6000);
      return;
    }

    const newStatus = modalType === "approve" ? "approved" : modalType === "reject" ? "rejected" : "revoked";
    const updated = PatientService.updateAccessRequestStatus(selectedRequest.id, newStatus);
    setRequests(updated);
    setActionNotice(
      `Prototype Simulation: Request from ${selectedRequest.doctorName} marked as ${newStatus} in local view. (Electronic consent endpoints are BACKEND_UNSUPPORTED in API v1; no live permissions changed).`
    );
    closeModal();
    setTimeout(() => setActionNotice(null), 6000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      <MobilePatientHeader />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Page Introduction matching Figma Node 299:1037 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
              Access Requests
            </h1>
            <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans max-w-2xl">
              Review who can access your health records. Approve only what you&apos;re comfortable sharing, and revoke access at any time.
            </p>
          </div>
          <span className="text-[12px] font-semibold text-slate-400 font-mono">
            3 Nov 2026
          </span>
        </div>

        {/* Prototype Demonstration Banner */}
        <div className="w-full p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Demonstration Prototype:</strong> Access requests and consent management are not supported in backend API v1 (classified as <code className="font-mono bg-amber-100 px-1 rounded text-[11px]">BACKEND_UNSUPPORTED</code>). This screen demonstrates the intended Figma UX workflow using prototype data.
          </div>
        </div>

        {actionNotice && (
          <div className="w-full p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <span className="font-bold text-[#078BDE] mt-0.5">✓</span>
            <div>{actionNotice}</div>
          </div>
        )}

        {/* Hero Identity Banner matching Node 299:1042 */}
        <PatientProfileBanner />

        {/* 3 Summary metric cards matching Node 299:1075 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          {/* Card 1: Pending */}
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#02307D] font-heading">Pending Requests</span>
                <span className="text-[12px] text-slate-500 font-sans">Waiting for your decision</span>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#02307D] font-mono">
              0{pendingList.length}
            </span>
          </div>

          {/* Card 2: Active */}
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#02307D] font-heading">Active Access</span>
                <span className="text-[12px] text-slate-500 font-sans">Approved by you</span>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#02307D] font-mono">
              0{activeList.length}
            </span>
          </div>

          {/* Card 3: History */}
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-[#02307D] font-heading">Request History</span>
                <span className="text-[12px] text-slate-500 font-sans">Rejected or revoked</span>
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#02307D] font-mono">
              0{historyList.length}
            </span>
          </div>
        </div>

        {/* Information Banner matching Node 299:1104 */}
        <div className="p-4 rounded-2xl bg-[#EAF2FF] border border-[#D0E5F5] flex items-center gap-3.5 text-[#0080DF]">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div className="text-[13px] text-[#41474F]">
            <strong className="text-[#02307D] font-semibold">Your records. Your permission.</strong> Nothing is shared while a request is pending. Review the exact records and permission level before you approve.
          </div>
        </div>

        {/* SECTION 1: Pending Requests matching Node 299:1115 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#01091E] font-heading">
              Pending Requests
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              {pendingList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pendingList.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-5"
              >
                <div className="flex flex-col gap-4">
                  {/* Top: Doctor & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={req.avatarUrl || "/assets/figma/avatars/doctor-sara.png"}
                          alt={req.doctorName}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-[#0080DF] flex items-center justify-center text-white font-bold text-sm -z-10">
                          {req.doctorName.split(" ").map(n => n[0]).join("")}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[16px] font-bold text-[#02307D] font-heading leading-tight">
                          {req.doctorName}
                        </h3>
                        <p className="text-[12px] text-slate-500 font-medium">
                          {req.doctorSpecialty} • {req.hospitalClinic}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                        Pending
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{req.requestId}</span>
                    </div>
                  </div>

                  {/* Permissions Categories tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-[#0080DF] inline-flex items-center gap-1 mr-1">
                      <span>👁️</span> View permission:
                    </span>
                    {req.permissions.map((p) => (
                      <span
                        key={p.category}
                        className="px-2.5 py-1 rounded-md bg-[#F4F8FD] text-[#02307D] text-[11px] font-medium border border-[#E2ECF8]"
                      >
                        {p.category}
                      </span>
                    ))}
                  </div>

                  {/* Reason for access box */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD] flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      REASON FOR ACCESS
                    </span>
                    <p className="text-[13px] text-[#41474F] leading-relaxed">
                      {req.reasonForAccess}
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 text-[12px] text-slate-500 pt-1">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-medium uppercase">Requested</span>
                      <span className="font-semibold text-slate-700">{req.requestedDate}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 font-medium uppercase">Access expires</span>
                      <span className="font-semibold text-slate-700">{req.accessExpires || "14 days"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions: Review & Approve / Reject */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#F0F4FA]">
                  <button
                    type="button"
                    onClick={() => openModal(req, "approve")}
                    className="flex-1 py-2.5 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    Review & Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal(req, "reject")}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-red-600 text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Active Access matching Node 299:1200 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#01091E] font-heading">
              Active Access
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              {activeList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeList.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-5"
              >
                <div className="flex flex-col gap-4">
                  {/* Doctor Info & Approved Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative bg-slate-100 border border-slate-200 shrink-0">
                        <Image
                          src={req.avatarUrl || "/assets/figma/avatars/doctor-sara.png"}
                          alt={req.doctorName}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-emerald-600 flex items-center justify-center text-white font-bold text-sm -z-10">
                          {req.doctorName.split(" ").map(n => n[0]).join("")}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-[16px] font-bold text-[#02307D] font-heading leading-tight">
                          {req.doctorName}
                        </h3>
                        <p className="text-[12px] text-slate-500 font-medium">
                          {req.doctorSpecialty} • {req.hospitalClinic}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Approved
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{req.requestId}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {req.permissions.map((p) => (
                      <span
                        key={p.category}
                        className="px-2.5 py-1 rounded-md bg-[#F4F8FD] text-[#02307D] text-[11px] font-medium border border-[#E2ECF8]"
                      >
                        {p.category}
                      </span>
                    ))}
                  </div>

                  {/* Reason */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD] flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      REASON FOR ACCESS
                    </span>
                    <p className="text-[13px] text-[#41474F] leading-relaxed">
                      {req.reasonForAccess}
                    </p>
                  </div>

                  <p className="text-[12px] text-emerald-700 font-semibold">
                    {req.expiresText}
                  </p>
                </div>

                {/* Revoke button */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#F0F4FA]">
                  <button
                    type="button"
                    onClick={() => openModal(req, "approve")}
                    className="text-[13px] font-semibold text-[#0080DF] hover:underline cursor-pointer"
                  >
                    View shared information
                  </button>
                  <button
                    type="button"
                    onClick={() => openModal(req, "revoke")}
                    className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-semibold transition-colors cursor-pointer"
                  >
                    Revoke Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Request History matching Node 299:1300 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-sky-50 flex items-center justify-center text-[#0080DF]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-[18px] font-bold text-[#01091E] font-heading">
              Request History
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
              {historyList.length}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {historyList.map((req) => (
              <div
                key={req.id}
                className="bg-white/80 rounded-[20px] p-6 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4 opacity-90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative bg-slate-100 border border-slate-200 shrink-0">
                      <Image
                        src={req.avatarUrl || "/assets/figma/avatars/doctor-sara.png"}
                        alt={req.doctorName}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-400 flex items-center justify-center text-white font-bold text-xs -z-10">
                        {req.doctorName.split(" ").map(n => n[0]).join("")}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[15px] font-bold text-[#02307D] font-heading leading-tight">
                        {req.doctorName}
                      </h3>
                      <p className="text-[12px] text-slate-500 font-medium">
                        {req.doctorSpecialty} • {req.hospitalClinic}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      req.status === "rejected"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {req.status === "rejected" ? "Rejected" : "Revoked"}
                  </span>
                </div>

                <p className="text-[12px] text-slate-500 leading-relaxed font-sans">
                  {req.expiresText}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL 1: Review & Approve Access matching Figma Node 299:1463 */}
      {modalType === "approve" && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200"
            data-node-id="299:1463"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#01091E] font-heading">
                    Review & Approve Access
                  </h3>
                  <p className="text-[12px] text-slate-500">
                    Check exactly what you&apos;ll share with {selectedRequest.doctorName} before giving permission.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Doctor Info card */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E9EFFD] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative">
                  <Image src={selectedRequest.avatarUrl || "/assets/figma/avatars/doctor-sara.png"} alt="" fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#02307D]">{selectedRequest.doctorName}</h4>
                  <p className="text-[12px] text-slate-500">{selectedRequest.doctorSpecialty} • {selectedRequest.hospitalClinic}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">{selectedRequest.requestId}</span>
            </div>

            {/* Information you will share checklist */}
            <div className="flex flex-col gap-3">
              <span className="text-[13px] font-bold text-[#01091E]">Information you will share</span>
              <div className="flex flex-col gap-2.5">
                {selectedRequest.permissions.map((p) => (
                  <div
                    key={p.category}
                    className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-start gap-3"
                  >
                    <svg className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-[#02307D]">{p.category}</span>
                        <span className="text-[11px] font-medium text-slate-400">{p.recordsCount} records</span>
                      </div>
                      <p className="text-[12px] text-slate-600 mt-0.5">{p.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiration Note */}
            <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 flex items-center gap-3 text-[12px] text-[#0080DF]">
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{selectedRequest.expiresText}</span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0080DF] hover:bg-[#0070C5] shadow-sm cursor-pointer"
              >
                ✓ Approve Access
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Reject Confirmation */}
      {modalType === "reject" && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#01091E]">Reject Request</h3>
            </div>
            <p className="text-sm text-[#41474F] leading-relaxed">
              Are you sure you want to reject the access request from <strong className="text-slate-900">{selectedRequest.doctorName}</strong>? No clinical records will be shared.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Revoke Confirmation */}
      {modalType === "revoke" && selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#01091E]">Revoke Access</h3>
            </div>
            <p className="text-sm text-[#41474F] leading-relaxed">
              Are you sure you want to revoke access for <strong className="text-slate-900">{selectedRequest.doctorName}</strong>? Their permissions to view your medical information will terminate immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm cursor-pointer"
              >
                Revoke Immediately
              </button>
            </div>
          </div>
        </div>
      )}

      <PatientFooter />
      <MobileBottomNav />
    </div>
  );
}
