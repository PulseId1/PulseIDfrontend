"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer } from "@/components/common";

interface MedicationDetail {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
  quantity: string;
  instructions: string;
  dispensedStatus: string;
}

interface IncomingPrescription {
  id: string;
  rxNumber: string;
  patientName: string;
  patientId: string;
  patientAvatar: string;
  doctorName: string;
  doctorSpecialty?: string;
  status: "pending" | "partial" | "completed" | "expired";
  statusBadge: string;
  statusColor: string;
  statusSubtext: string;
  issueDate: string;
  expirationDate: string;
  medCount: string;
  previewText: string;
  subPreviewText?: string;
  canDispense: boolean;
  medications: MedicationDetail[];
}

export default function PharmacistIncomingPrescriptionsPage() {
  const router = useRouter();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusTab, setActiveStatusTab] = useState<
    "all" | "pending" | "partial" | "completed" | "expired"
  >("all");
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [expandedRxId, setExpandedRxId] = useState<string | null>("RX-2026-9042");

  const prescriptions: IncomingPrescription[] = [
    {
      id: "RX-2026-9042",
      rxNumber: "RX-2026-9042",
      patientName: "Ahmed Hassan",
      patientId: "PT-10482",
      patientAvatar: "/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png",
      doctorName: "Dr. Farida Amin",
      doctorSpecialty: "Prescribing doctor",
      status: "pending",
      statusBadge: "●  Pending",
      statusColor: "text-[#07377f]",
      statusSubtext: "Waiting for dispensing",
      issueDate: "Nov 12, 2026",
      expirationDate: "Dec 12, 2026",
      medCount: "2 medications",
      previewText: "Amoxicillin 500 mg, Potassium chloride 10 mEq",
      canDispense: true,
      medications: [
        {
          name: "Amoxicillin 500 mg",
          dose: "1 capsule",
          frequency: "Three times daily",
          duration: "7 days",
          quantity: "21 capsules",
          instructions: "Doctor’s instructions: Take after food. Complete the prescribed course.",
          dispensedStatus: "0 of 21 capsules dispensed",
        },
        {
          name: "Potassium chloride 10 mEq",
          dose: "1 tablet",
          frequency: "Once daily",
          duration: "14 days",
          quantity: "14 tablets",
          instructions: "Doctor’s instructions: Take with food and a full glass of water. Do not crush.",
          dispensedStatus: "0 of 14 tablets dispensed",
        },
      ],
    },
    {
      id: "RX-2026-9051",
      rxNumber: "RX-2026-9051",
      patientName: "Salma Adel",
      patientId: "PT-10635",
      patientAvatar: "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png",
      doctorName: "Dr. Nadia Saleh",
      doctorSpecialty: "Endocrinology",
      status: "partial",
      statusBadge: "●  Partially Dispensed",
      statusColor: "text-[#045385]",
      statusSubtext: "1 of 2 medications dispensed",
      issueDate: "Nov 10, 2026",
      expirationDate: "Dec 10, 2026",
      medCount: "2 medications",
      previewText: "Metformin 500 mg, Atorvastatin 20 mg",
      subPreviewText: "30 Metformin tablets remaining to dispense",
      canDispense: true,
      medications: [
        {
          name: "Metformin 500 mg",
          dose: "1 tablet",
          frequency: "Twice daily with meals",
          duration: "30 days",
          quantity: "60 tablets",
          instructions: "Doctor’s instructions: Take with meals to reduce GI effects.",
          dispensedStatus: "30 of 60 tablets dispensed",
        },
        {
          name: "Atorvastatin 20 mg",
          dose: "1 tablet",
          frequency: "Once daily at bedtime",
          duration: "30 days",
          quantity: "30 tablets",
          instructions: "Doctor’s instructions: Take at night.",
          dispensedStatus: "30 of 30 tablets dispensed",
        },
      ],
    },
    {
      id: "RX-2026-8827",
      rxNumber: "RX-2026-8827",
      patientName: "Tarek Ibrahim",
      patientId: "PT-10891",
      patientAvatar: "/assets/pharmacist/62ac8540e98b2a02d94d67498b0383b9a21ec7dc.png",
      doctorName: "Dr. Omar Nabil",
      doctorSpecialty: "Cardiology",
      status: "completed",
      statusBadge: "●  Completed",
      statusColor: "text-[#056e4f]",
      statusSubtext: "All prescribed medications dispensed",
      issueDate: "Oct 30, 2026",
      expirationDate: "Nov 29, 2026",
      medCount: "1 medication",
      previewText: "Amlodipine 5 mg",
      canDispense: false,
      medications: [
        {
          name: "Amlodipine 5 mg",
          dose: "1 tablet",
          frequency: "Once daily",
          duration: "30 days",
          quantity: "30 tablets",
          instructions: "Doctor’s instructions: Monitor morning blood pressure.",
          dispensedStatus: "30 of 30 tablets dispensed",
        },
      ],
    },
    {
      id: "RX-2026-8316",
      rxNumber: "RX-2026-8316",
      patientName: "Mohamed Kareem",
      patientId: "PT-10374",
      patientAvatar: "/assets/pharmacist/1af2086220affecd5f498aeca93f64918a91bf86.png",
      doctorName: "Dr. Leila Mansour",
      doctorSpecialty: "Gastroenterology",
      status: "expired",
      statusBadge: "●  Expired",
      statusColor: "text-[#b81f29]",
      statusSubtext: "Prescription is no longer valid",
      issueDate: "Oct 1, 2026",
      expirationDate: "Oct 31, 2026",
      medCount: "1 medication",
      previewText: "Omeprazole 20 mg",
      canDispense: false,
      medications: [
        {
          name: "Omeprazole 20 mg",
          dose: "1 capsule",
          frequency: "Once daily before breakfast",
          duration: "30 days",
          quantity: "30 capsules",
          instructions: "Doctor’s instructions: Take 30 minutes before first meal.",
          dispensedStatus: "0 of 30 capsules dispensed (Expired)",
        },
      ],
    },
  ];

  const handleApplySampleQuery = (q: string) => {
    setSearchQuery(q);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveStatusTab("all");
    setSelectedDateFilter("all");
    setShowDateDropdown(false);
  };

  const filteredPrescriptions = prescriptions.filter((rx) => {
    // Status filter
    if (activeStatusTab !== "all" && rx.status !== activeStatusTab) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesPatient = rx.patientName.toLowerCase().includes(q);
      const matchesPatientId = rx.patientId.toLowerCase().includes(q);
      const matchesRx = rx.rxNumber.toLowerCase().includes(q);
      const matchesDoc = rx.doctorName.toLowerCase().includes(q);
      if (!matchesPatient && !matchesPatientId && !matchesRx && !matchesDoc) {
        return false;
      }
    }
    // Date filter
    if (selectedDateFilter === "7days" && rx.id !== "RX-2026-9042") {
      return false;
    }
    if (selectedDateFilter === "beforeOct14" && !rx.issueDate.includes("Oct")) {
      return false;
    }
    return true;
  });

  return (
    <div
      className="min-h-screen bg-white text-[#41474f] flex flex-col font-sans selection:bg-[#078bde]/30 selection:text-[#078bde]"
      data-node-id="609:10815"
      data-name="Incoming Prescriptions"
    >
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6">
        <div
          className="flex flex-col gap-[20px] items-start w-full max-w-[1216px] mx-auto pb-[40px]"
          data-node-id="609:10858"
          data-name="Incoming prescriptions body"
        >
          {/* Page header (Figma 609:10859) */}
          <div
            className="flex flex-col gap-[16px] items-start w-full"
            data-node-id="609:10859"
            data-name="Page header"
          >
            <p
              className="font-semibold text-sm leading-[20px] text-[#07377f] w-full"
              data-node-id="609:10860"
            >
              <Link href="/pharmacist" className="hover:text-[#078bde] transition-colors">
                Home
              </Link>{" "}
              &nbsp;/&nbsp; Prescriptions &nbsp;/&nbsp;{" "}
              <span className="text-[#07377f]">Incoming Prescriptions</span>
            </p>

            <div
              className="flex gap-[16px] items-center w-full justify-between"
              data-node-id="609:10861"
              data-name="Page title and prescription count"
            >
              <h1
                className="font-semibold text-[28px] leading-[36px] text-[#07377f]"
                data-node-id="609:10862"
              >
                Incoming Prescriptions
              </h1>
              <div
                className="bg-[#fbfeff] border border-[#dde7ff] flex items-center px-[12px] py-[6px] rounded-[8px] shrink-0 shadow-2xs"
                data-node-id="609:10863"
                data-name="Total prescription count"
              >
                <span
                  className="font-semibold text-xs leading-[20px] text-[#07377f]"
                  data-node-id="609:10864"
                >
                  {prescriptions.length} prescriptions
                </span>
              </div>
            </div>

            <p
              className="font-normal text-sm leading-[20px] text-[#727272] w-full -mt-2"
              data-node-id="609:10865"
            >
              View prescriptions shared by doctors with their patients and manage medication dispensing.
            </p>
          </div>

          {/* Search and date filters (Figma 609:10866 / 609:11157) */}
          <div
            className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] rounded-[16px] w-full"
            data-node-id="609:11157"
            data-name="Search and date filters"
          >
            <p
              className="font-semibold text-sm leading-[20px] text-[#07377f] w-full"
              data-node-id="609:11158"
            >
              Search incoming prescriptions
            </p>

            {/* Search bar and submit */}
            <div
              className="flex flex-col sm:flex-row gap-[16px] items-center w-full"
              data-node-id="609:11159"
              data-name="Search bar and submit"
            >
              <div
                className="bg-white border border-[#dde7ff] flex flex-1 gap-[12px] h-[44px] items-center px-[16px] rounded-[8px] w-full"
                data-node-id="609:11160"
                data-name="Search by patient, prescription, or doctor"
              >
                <div
                  className="relative shrink-0 size-[24px]"
                  data-name="ant-design:search-outlined"
                >
                  <img
                    alt=""
                    className="absolute block inset-0 size-full"
                    src="/assets/pharmacist/38aeaad45a8148c71049cb40bfd845ffe5e101d0.svg"
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Patient name, Patient ID, Prescription ID, or Doctor name"
                  className="font-semibold text-sm leading-[20px] text-[#41474f] placeholder-[#727272] w-full bg-transparent focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {}}
                className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] px-6 rounded-[8px] shrink-0 flex items-center justify-center cursor-pointer transition-colors shadow-xs w-full sm:w-[180px]"
                data-node-id="609:11161"
                data-name="Apply search"
              >
                Search
              </button>
            </div>

            {/* Search suggestions (Figma 609:11162) */}
            <div
              className="flex flex-col gap-[8px] items-start pt-[4px] w-full"
              data-node-id="609:11162"
              data-name="Search suggestions"
            >
              <p
                className="font-medium text-xs leading-[20px] text-[#727272] w-full"
                data-node-id="609:11163"
              >
                Try a sample search
              </p>
              <div className="flex flex-wrap gap-2 w-full">
                <button
                  type="button"
                  onClick={() => handleApplySampleQuery("Ahmed Hassan")}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-xs leading-[20px] h-[36px] px-3.5 rounded-[8px] cursor-pointer transition-colors"
                  data-name="Query 1 | Ahmed Hassan"
                >
                  Patient name: Ahmed Hassan
                </button>
                <button
                  type="button"
                  onClick={() => handleApplySampleQuery("PT-10635")}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-xs leading-[20px] h-[36px] px-3.5 rounded-[8px] cursor-pointer transition-colors"
                  data-name="Query 2 | PT-10635"
                >
                  Patient ID: PT-10635
                </button>
                <button
                  type="button"
                  onClick={() => handleApplySampleQuery("RX-2026-8827")}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-xs leading-[20px] h-[36px] px-3.5 rounded-[8px] cursor-pointer transition-colors"
                  data-name="Query 3 | RX-2026-8827"
                >
                  Prescription ID: RX-2026-8827
                </button>
                <button
                  type="button"
                  onClick={() => handleApplySampleQuery("Dr. Omar Nabil")}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-xs leading-[20px] h-[36px] px-3.5 rounded-[8px] cursor-pointer transition-colors"
                  data-name="Query 4 | Dr. Omar Nabil"
                >
                  Doctor name: Dr. Omar Nabil
                </button>
                <button
                  type="button"
                  onClick={() => handleApplySampleQuery("RX-2026-0000")}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-xs leading-[20px] h-[36px] px-3.5 rounded-[8px] cursor-pointer transition-colors"
                  data-name="Query 5 | RX-2026-0000"
                >
                  Prescription ID: RX-2026-0000 (no match)
                </button>
              </div>
            </div>

            {/* Prescription date and clear filters (Figma 609:11169) */}
            <div
              className="flex flex-col sm:flex-row gap-[16px] items-start sm:items-center w-full pt-1"
              data-node-id="609:11169"
              data-name="Prescription date and clear filters"
            >
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-sm leading-[20px] h-[40px] px-4 rounded-[8px] flex items-center justify-between cursor-pointer w-full sm:w-[300px]"
                  data-node-id="609:11170"
                  data-name="Open date filters"
                >
                  <span>
                    Prescription date:{" "}
                    {selectedDateFilter === "all"
                      ? "All dates"
                      : selectedDateFilter === "7days"
                      ? "Last 7 days"
                      : selectedDateFilter === "30days"
                      ? "Last 30 days"
                      : "Before Oct 14, 2026"}
                  </span>
                  <span className="ml-2">▾</span>
                </button>
                {showDateDropdown && (
                  <div className="absolute left-0 top-[44px] z-20 bg-white border border-[#dde7ff] rounded-[8px] shadow-lg w-[300px] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDateFilter("all");
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#07377f] hover:bg-sky-50 font-semibold"
                    >
                      All dates
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDateFilter("7days");
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#07377f] hover:bg-sky-50 font-semibold"
                    >
                      Last 7 days
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDateFilter("30days");
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#07377f] hover:bg-sky-50 font-semibold"
                    >
                      Last 30 days
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDateFilter("beforeOct14");
                        setShowDateDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-[#07377f] hover:bg-sky-50 font-semibold"
                    >
                      Before Oct 14, 2026
                    </button>
                  </div>
                )}
              </div>

              <p
                className="font-normal text-xs leading-[20px] text-[#727272] flex-1"
                data-node-id="609:11171"
              >
                Filter by the date the prescription was issued.
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-sm leading-[20px] h-[40px] px-4 rounded-[8px] cursor-pointer transition-colors shrink-0"
                data-node-id="609:11172"
                data-name="Clear all filters"
              >
                Clear filters
              </button>
            </div>

            {/* Date options pills (Figma 609:11173) */}
            <div
              className="flex flex-wrap gap-[12px] items-center w-full pt-1"
              data-node-id="609:11173"
              data-name="Date options"
            >
              <button
                type="button"
                onClick={() => setSelectedDateFilter("all")}
                className={`border border-[#dde7ff] h-[40px] px-4 rounded-[8px] font-semibold text-sm transition-colors cursor-pointer ${
                  selectedDateFilter === "all"
                    ? "bg-[#07377f] text-white border-[#07377f]"
                    : "bg-white text-[#07377f] hover:bg-slate-50"
                }`}
                data-name="Date option 0"
              >
                All dates
              </button>
              <button
                type="button"
                onClick={() => setSelectedDateFilter("7days")}
                className={`border border-[#dde7ff] h-[40px] px-4 rounded-[8px] font-semibold text-sm transition-colors cursor-pointer ${
                  selectedDateFilter === "7days"
                    ? "bg-[#07377f] text-white border-[#07377f]"
                    : "bg-white text-[#07377f] hover:bg-slate-50"
                }`}
                data-name="Date option 1"
              >
                Last 7 days
              </button>
              <button
                type="button"
                onClick={() => setSelectedDateFilter("30days")}
                className={`border border-[#dde7ff] h-[40px] px-4 rounded-[8px] font-semibold text-sm transition-colors cursor-pointer ${
                  selectedDateFilter === "30days"
                    ? "bg-[#07377f] text-white border-[#07377f]"
                    : "bg-white text-[#07377f] hover:bg-slate-50"
                }`}
                data-name="Date option 2"
              >
                Last 30 days
              </button>
              <button
                type="button"
                onClick={() => setSelectedDateFilter("beforeOct14")}
                className={`border border-[#dde7ff] h-[40px] px-4 rounded-[8px] font-semibold text-sm transition-colors cursor-pointer ${
                  selectedDateFilter === "beforeOct14"
                    ? "bg-[#07377f] text-white border-[#07377f]"
                    : "bg-white text-[#07377f] hover:bg-slate-50"
                }`}
                data-name="Date option 3"
              >
                Before Oct 14, 2026
              </button>
            </div>
          </div>

          {/* Prescription status tabs (Figma 609:10887) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-5 gap-[12px] sm:gap-[16px] w-full"
            data-node-id="609:10887"
            data-name="Prescription status tabs"
          >
            {[
              { id: "all", label: "All Prescriptions" },
              { id: "pending", label: "Pending Dispensing" },
              { id: "partial", label: "Partially Dispensed" },
              { id: "completed", label: "Completed" },
              { id: "expired", label: "Expired" },
            ].map((tab) => {
              const isActive = activeStatusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveStatusTab(
                      tab.id as "all" | "pending" | "partial" | "completed" | "expired"
                    )
                  }
                  className={`border border-[#dde7ff] h-[40px] rounded-[8px] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center cursor-pointer ${
                    isActive
                      ? "bg-[#008fe5] text-white border-[#008fe5] shadow-xs"
                      : "bg-white text-[#07377f] hover:bg-slate-50"
                  }`}
                  data-name={`Status tab ${tab.id}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Prescription results (Figma 609:10893) */}
          <div
            className="flex flex-col gap-[20px] items-start w-full"
            data-node-id="609:10893"
            data-name="Prescription results"
          >
            {/* Result count and sorting */}
            <div
              className="flex gap-[16px] items-center w-full"
              data-node-id="609:10894"
              data-name="Result count and sorting"
            >
              <p
                className="font-semibold text-[18px] leading-[26px] text-[#07377f] whitespace-nowrap"
                data-node-id="609:10895"
              >
                Prescriptions
              </p>
              <p
                className="font-semibold text-sm text-[#07377f] flex-1"
                data-node-id="609:10896"
              >
                {filteredPrescriptions.length}
              </p>
              <p
                className="font-normal text-xs leading-[20px] text-[#727272] whitespace-nowrap"
                data-node-id="609:10897"
              >
                Newest prescription first
              </p>
            </div>

            {/* Prescription Cards List */}
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((rx) => {
                const isExpanded = expandedRxId === rx.id;
                return (
                  <div
                    key={rx.id}
                    className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] rounded-[16px] w-full"
                    data-name={`Prescription Card ${rx.rxNumber}`}
                  >
                    {/* Patient, prescriber and status */}
                    <div
                      className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-start sm:items-center w-full justify-between"
                      data-name="Patient, prescriber and status"
                    >
                      {/* Patient identity */}
                      <div className="flex gap-[16px] h-[56px] items-center w-full sm:w-[360px]">
                        <div className="relative rounded-[12px] size-[56px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            alt={rx.patientName}
                            className="absolute inset-0 object-cover rounded-[12px] size-full"
                            src={rx.patientAvatar}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png";
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[4px] items-start flex-1 min-w-0">
                          <p className="font-semibold text-[18px] leading-[26px] text-[#07377f] truncate w-full">
                            {rx.patientName}
                          </p>
                          <p className="font-normal text-xs leading-[20px] text-[#727272] w-full">
                            {rx.patientId}
                          </p>
                        </div>
                      </div>

                      {/* Prescribing doctor */}
                      <div className="flex flex-col gap-[4px] items-start leading-[20px] flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#07377f] truncate w-full">
                          {rx.doctorName}
                        </p>
                        <p className="font-normal text-xs text-[#727272] w-full">
                          {rx.doctorSpecialty || "Prescribing doctor"}
                        </p>
                      </div>

                      {/* Prescription status */}
                      <div className="flex flex-col gap-[4px] h-[56px] items-start sm:items-end w-full sm:w-[310px] shrink-0">
                        <div className="bg-[#fbfeff] border border-[#dde7ff] flex items-center px-[12px] py-[4px] rounded-[8px]">
                          <span className={`font-semibold text-xs leading-[20px] ${rx.statusColor}`}>
                            {rx.statusBadge}
                          </span>
                        </div>
                        <p className="font-normal text-xs leading-[20px] text-[#727272] whitespace-nowrap">
                          {rx.statusSubtext}
                        </p>
                      </div>
                    </div>

                    {/* Prescription dates and medication count */}
                    <div
                      className="grid grid-cols-2 sm:grid-cols-4 gap-[16px] sm:gap-[24px] items-start leading-[20px] w-full pt-1"
                      data-name="Prescription dates and medication count"
                    >
                      <div className="flex flex-col gap-[2px] items-start">
                        <span className="font-normal text-xs text-[#727272]">Prescription ID</span>
                        <span className="font-medium text-sm text-[#41474f]">{rx.rxNumber}</span>
                      </div>
                      <div className="flex flex-col gap-[2px] items-start">
                        <span className="font-normal text-xs text-[#727272]">Prescription date</span>
                        <span className="font-medium text-sm text-[#41474f]">{rx.issueDate}</span>
                      </div>
                      <div className="flex flex-col gap-[2px] items-start">
                        <span className="font-normal text-xs text-[#727272]">Expiration date</span>
                        <span
                          className={`font-medium text-sm ${
                            rx.status === "expired" ? "text-[#b81f29]" : "text-[#41474f]"
                          }`}
                        >
                          {rx.expirationDate}
                        </span>
                      </div>
                      <div className="flex flex-col gap-[2px] items-start">
                        <span className="font-normal text-xs text-[#727272]">Prescribed medications</span>
                        <span className="font-medium text-sm text-[#41474f]">{rx.medCount}</span>
                      </div>
                    </div>

                    {/* Medication preview and actions */}
                    <div
                      className="flex flex-col sm:flex-row gap-[16px] items-start sm:items-center w-full pt-1"
                      data-name="Medication preview and actions"
                    >
                      <div className="flex flex-1 flex-col gap-[2px] items-start min-w-0">
                        <p className="font-normal text-sm leading-[20px] text-[#41474f] truncate w-full">
                          {rx.previewText}
                        </p>
                        {rx.subPreviewText && (
                          <p className="font-normal text-xs leading-[20px] text-[#045385] w-full">
                            {rx.subPreviewText}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-[12px] items-center w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setExpandedRxId(isExpanded ? null : rx.id)}
                          className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[180px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                          data-name={`View prescription ${rx.rxNumber}`}
                        >
                          {isExpanded ? "Hide Details" : "View Prescription"}
                        </button>

                        {rx.canDispense ? (
                          <button
                            type="button"
                            onClick={() => router.push(`/pharmacist/dispense?id=${rx.rxNumber}`)}
                            className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[200px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                            data-name={`Dispense prescription ${rx.rxNumber}`}
                          >
                            Dispense Medication
                          </button>
                        ) : (
                          <div
                            className="bg-white border border-[#dde7ff] text-[#07377f] opacity-45 font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[200px] rounded-[8px] flex items-center justify-center cursor-not-allowed"
                            data-name={`Unavailable dispense ${rx.rxNumber}`}
                          >
                            Dispense Medication
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expandable Full Prescription Details (Figma 609:11210 / 609:11178) */}
                    {isExpanded && (
                      <div
                        className="border-t border-[#dde7ff] flex flex-col gap-[16px] items-start pt-[16px] w-full animate-in fade-in"
                        data-name="Full prescription details"
                      >
                        <div className="flex gap-[16px] items-center w-full justify-between">
                          <p className="font-semibold text-base leading-[20px] text-[#07377f]">
                            Prescribed medications
                          </p>
                          <button
                            type="button"
                            onClick={() => setExpandedRxId(null)}
                            className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#07377f] font-semibold text-sm leading-[20px] h-[36px] px-4 rounded-[8px] flex items-center justify-center cursor-pointer"
                          >
                            Close details
                          </button>
                        </div>

                        {rx.medications.map((med, mIdx) => (
                          <div
                            key={mIdx}
                            className="bg-[#fbfeff] border border-[#dde7ff] flex flex-col gap-[8px] items-start p-[16px] rounded-[8px] w-full"
                          >
                            <p className="font-semibold text-sm leading-[20px] text-[#07377f] w-full">
                              {med.name}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px] w-full text-xs">
                              <div className="flex flex-col gap-[2px]">
                                <span className="text-[#727272]">Dose</span>
                                <span className="font-normal text-sm text-[#41474f]">{med.dose}</span>
                              </div>
                              <div className="flex flex-col gap-[2px]">
                                <span className="text-[#727272]">Frequency</span>
                                <span className="font-normal text-sm text-[#41474f]">{med.frequency}</span>
                              </div>
                              <div className="flex flex-col gap-[2px]">
                                <span className="text-[#727272]">Duration</span>
                                <span className="font-normal text-sm text-[#41474f]">{med.duration}</span>
                              </div>
                              <div className="flex flex-col gap-[2px]">
                                <span className="text-[#727272]">Quantity</span>
                                <span className="font-normal text-sm text-[#41474f]">{med.quantity}</span>
                              </div>
                            </div>
                            <p className="font-normal text-sm leading-[20px] text-[#41474f] w-full pt-1">
                              {med.instructions}
                            </p>
                            <p className="font-normal text-xs leading-[20px] text-[#727272] w-full">
                              {med.dispensedStatus}
                            </p>
                          </div>
                        ))}

                        {/* Figma Node 609:10968 & 609:10969 / 609:11248 & 609:11249 */}
                        {rx.canDispense && (
                          <div
                            className="border-t border-[#dde7ff] pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full"
                            data-node-id="609:11248"
                          >
                            <p className="font-normal text-xs leading-[20px] text-[#727272]">
                              Review allergies, interactions, and quantities in Medication Dispensing before continuing.
                            </p>
                            <Link
                              href={`/pharmacist/dispense?id=${rx.rxNumber}&step=0`}
                              className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-xs leading-[20px] h-[36px] px-4 rounded-[8px] flex items-center justify-center transition-colors shadow-xs cursor-pointer shrink-0"
                              data-node-id="609:11249"
                            >
                              Start dispensing
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-[16px] p-8 text-center w-full">
                <p className="text-sm font-semibold text-slate-700">No prescriptions found</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search criteria or clearing active filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-3 text-xs font-semibold text-[#008fe5] hover:underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Footer (Figma 609:11155) */}
          <div
            className="flex flex-col items-start w-full pt-4"
            data-node-id="609:11155"
            data-name="Footer"
          >
            <p
              className="font-normal text-xs leading-[20px] text-[#727272] w-full"
              data-node-id="609:11156"
            >
              Pulse ID • Al Shifa Pharmacy • Illustrative patient data
            </p>
          </div>
        </div>
      </main>

      {/* AI Assistant Drawer */}
      <AiMedicalAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        patientName="Ahmed Hassan"
      />

      <Footer />
    </div>
  );
}
