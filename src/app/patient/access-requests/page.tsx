"use client";

import React from "react";
import { PatientNavbar } from "@/features/patient/components/patient-navbar";
import { PatientFooter } from "@/features/patient/components/patient-footer";
import { PatientInfoCard } from "@/features/patient/components/patient-info-card";
import { useAuth } from "@/lib/auth/auth-context";
import { useAccessRequests } from "@/features/patient/hooks/use-access-requests";
import { AccessSummaryCards } from "@/features/patient/components/access-requests/access-summary-cards";
import { AccessRequestCard } from "@/features/patient/components/access-requests/access-request-card";
import { ReviewApproveModal } from "@/features/patient/components/access-requests/review-approve-modal";
import { RejectRequestModal } from "@/features/patient/components/access-requests/reject-request-modal";
import { RevokeAccessModal } from "@/features/patient/components/access-requests/revoke-access-modal";
import { ShieldCheck, Clock3, History } from "lucide-react";

export default function AccessRequestsPage() {
  const { isDemo } = useAuth();
  const {
    pendingList,
    activeList,
    historyList,
    selectedRequest,
    modalType,
    actionNotice,
    openModal,
    closeModal,
    handleConfirmAction,
  } = useAccessRequests();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 selection:bg-[#0A7DC5]/30 selection:text-[#0A7DC5]">
      <PatientNavbar />

      <main className="flex-1 w-full max-w-[1360px] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* 1. PAGE INTRODUCTION — Figma Node 583:5013 & 583:5016 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div className="flex flex-col gap-1.5 max-w-[820px]">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0F172A] tracking-tight font-heading">
              Access Requests
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-sans max-w-[820px]">
              Review who can access your health records. Approve only what you&apos;re comfortable
              sharing, and revoke access at any time.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#94A3B8] font-mono shrink-0">
            3 Nov 2026
          </span>
        </div>

        {actionNotice && (
          <div className="w-full p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
            <span className="font-bold text-[#0A7DC5] mt-0.5">✓</span>
            <div>{actionNotice}</div>
          </div>
        )}

        {/* 2. REUSABLE PATIENT INFORMATION CARD — Figma Node 583:5018 & 299:1910 */}
        <PatientInfoCard
          variant="general"
          isDemoPreview={isDemo}
          nodeId="583:5018"
        />

        {/* 3. ACCESS SUMMARY CARDS — Figma Node 583:5053 */}
        <AccessSummaryCards
          pendingCount={pendingList.length}
          activeCount={activeList.length}
          historyCount={historyList.length}
        />

        {/* 4. PATIENT CONTROL NOTICE — Figma Node 583:5078 */}
        <div
          className="bg-[#EFF8FE] content-stretch flex gap-[12px] items-start p-[16px] rounded-[8px] text-left w-full shadow-xs"
          data-node-id="583:5078"
          data-name="Patient control notice"
        >
          <div className="relative shrink-0 size-[20px] text-[#078BDE] mt-0.5" data-node-id="583:5079">
            <ShieldCheck className="size-[20px]" />
          </div>
          <div className="flex flex-1 flex-col gap-[4px] text-left">
            <p className="font-semibold text-[13px] text-[#02307D] leading-[1.5]" data-node-id="583:5082">
              Your records. Your permission.
            </p>
            <p className="font-normal text-[12px] text-[#41474F] leading-[1.5]" data-node-id="583:5083">
              Nothing is shared while a request is pending. Review the exact records and permission level before you approve.
            </p>
          </div>
        </div>

        {/* 5. PENDING REQUESTS SECTION — Figma Node 583:5084 & 583:5085 */}
        <section className="flex flex-col gap-4" data-node-id="583:5084">
          <div className="flex items-start justify-between gap-[12px] min-h-[56px]" data-node-id="583:5085" data-name="Section heading">
            <div className="flex items-start gap-[12px]">
              <div className="size-[23px] text-[#078BDE] shrink-0 mt-1" data-node-id="583:5086">
                <Clock3 className="size-[23px]" />
              </div>
              <div className="flex flex-col gap-[6px] text-left" data-node-id="583:5088">
                <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]" data-node-id="583:5089">
                  Pending Requests
                </h2>
                <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]" data-node-id="583:5090">
                  Review the requested information before making a decision. No access has been granted.
                </p>
              </div>
            </div>
            <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0" data-node-id="583:5091">
              <span className="text-[13px] font-bold text-[#02307D] leading-normal" data-node-id="583:5092">
                {pendingList.length}
              </span>
            </div>
          </div>

          {pendingList.length === 0 ? (
            <div className="bg-white rounded-[8px] p-8 border border-[#D8DFEB] text-center text-slate-400 text-sm">
              No pending access requests. You have reviewed all active clinical requests.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-node-id="583:5093">
              {pendingList.map((req, idx) => (
                <AccessRequestCard
                  key={req.id}
                  request={req}
                  cardType="pending"
                  nodeId={idx === 0 ? "583:5094" : "583:5137"}
                  onAction={(action) => openModal(req, action as "approve" | "reject")}
                />
              ))}
            </div>
          )}
        </section>

        {/* 6. ACTIVE ACCESS SECTION — Doctor Grantees */}
        {activeList.length > 0 && (
          <section className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-[12px] min-h-[56px]">
              <div className="flex items-start gap-[12px]">
                <div className="size-[23px] text-[#16734E] shrink-0 mt-1">
                  <ShieldCheck className="size-[23px]" />
                </div>
                <div className="flex flex-col gap-[6px] text-left">
                  <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]">
                    Active Access
                  </h2>
                  <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]">
                    Authorized healthcare professionals who can currently view your records.
                  </p>
                </div>
              </div>
              <div className="bg-[#EAF7EF] px-[12px] py-[5px] rounded-[100px] shrink-0">
                <span className="text-[13px] font-bold text-[#16734E] leading-normal">
                  {activeList.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeList.map((req) => (
                <AccessRequestCard
                  key={req.id}
                  request={req}
                  cardType="active"
                  onAction={() => openModal(req, "revoke")}
                />
              ))}
            </div>
          </section>
        )}

        {/* 7. REQUEST HISTORY SECTION — Figma Node 583:5178 */}
        {historyList.length > 0 && (
          <section className="flex flex-col gap-4" data-node-id="583:5178">
            <div className="flex items-start justify-between gap-[12px] min-h-[56px]" data-node-id="583:5179">
              <div className="flex items-start gap-[12px]">
                <div className="size-[23px] text-[#078BDE] shrink-0 mt-1" data-node-id="583:5180">
                  <History className="size-[23px]" />
                </div>
                <div className="flex flex-col gap-[6px] text-left" data-node-id="583:5182">
                  <h2 className="text-[24px] font-bold text-[#01091E] font-heading leading-[1.25]" data-node-id="583:5183">
                    Request History
                  </h2>
                  <p className="text-[13px] font-normal text-[#41474F] font-sans leading-[1.5]" data-node-id="583:5184">
                    A transparent record of your past decisions. These doctors have no current access.
                  </p>
                </div>
              </div>
              <div className="bg-[#EFF8FE] px-[12px] py-[5px] rounded-[100px] shrink-0" data-node-id="583:5185">
                <span className="text-[13px] font-bold text-[#02307D] leading-normal" data-node-id="583:5186">
                  {historyList.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {historyList.map((req) => (
                <AccessRequestCard
                  key={req.id}
                  request={req}
                  cardType="history"
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer matching Figma Node 610:17227 */}
      <PatientFooter />

      {/* Modal 1: Review & Approve */}
      <ReviewApproveModal
        request={selectedRequest}
        isOpen={modalType === "approve"}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
      />

      {/* Modal 2: Reject */}
      <RejectRequestModal
        request={selectedRequest}
        isOpen={modalType === "reject"}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
      />

      {/* Modal 3: Revoke */}
      <RevokeAccessModal
        request={selectedRequest}
        isOpen={modalType === "revoke"}
        onClose={closeModal}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}
