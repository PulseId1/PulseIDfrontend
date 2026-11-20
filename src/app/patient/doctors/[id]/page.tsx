"use client";

import React, { useState } from "react";
import { PatientNavbar } from "@/features/patient/components/patient-navbar";
import { PatientFooter } from "@/features/patient/components/patient-footer";
import {
  DoctorProfileHeader,
  DEFAULT_DOCTOR_DATA,
} from "@/features/patient/components/doctor-view/doctor-profile-header";
import { VisitHistoryTab } from "@/features/patient/components/doctor-view/visit-history-tab";
import { PrescriptionsTestsTab } from "@/features/patient/components/doctor-view/prescriptions-tests-tab";
import { ClinicalFollowupTab } from "@/features/patient/components/doctor-view/clinical-followup-tab";
import { History, Pill, CheckCircle2 } from "lucide-react";

type DoctorTabKey = "visits" | "prescriptions" | "followup";

export default function PatientDoctorProfilePage() {
  const [activeTab, setActiveTab] = useState<DoctorTabKey>("visits");

  const tabs = [
    {
      key: "visits" as const,
      label: "Visit History",
      icon: History,
      nodeId: "583:5513",
      count: 3,
    },
    {
      key: "prescriptions" as const,
      label: "Prescriptions & Requests",
      icon: Pill,
      nodeId: "583:5809",
      count: 5,
    },
    {
      key: "followup" as const,
      label: "Clinical Follow-up",
      icon: CheckCircle2,
      nodeId: "583:6134",
      count: 4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 selection:bg-[#0A7DC5]/30 selection:text-[#0A7DC5]">
      <PatientNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Profile Header & Top Cards (Figma Node 583:5555) */}
        <DoctorProfileHeader doctor={DEFAULT_DOCTOR_DATA} />

        {/* Tab Selection Navigation Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-[#D8DFEB] rounded-[10px] shadow-xs w-full overflow-x-auto custom-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-[8px] px-4 py-2.5 rounded-[8px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#078BDE] text-white shadow-xs"
                    : "text-[#41474F] hover:bg-[#F5F8FC] hover:text-[#02307D]"
                }`}
                data-node-id={tab.nodeId}
              >
                <Icon className="size-[16px]" />
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-[8px] py-[2px] rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF8FE] text-[#02307D]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <div className="w-full">
          {activeTab === "visits" && <VisitHistoryTab />}
          {activeTab === "prescriptions" && <PrescriptionsTestsTab />}
          {activeTab === "followup" && <ClinicalFollowupTab />}
        </div>
      </main>

      <PatientFooter />
    </div>
  );
}
