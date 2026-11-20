"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer } from "@/components/common";

export default function PharmacistPatientMedicalOverviewPage() {
  const searchParams = useSearchParams();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [changePatientModalOpen, setChangePatientModalOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");

  const patientIdQuery = searchParams.get("id") || "PT-10482";

  // Data fixtures for Ahmed Hassan PT-10482 (Figma Node 609:10593 / 609:10636)
  const patient = {
    id: patientIdQuery,
    name: "Ahmed Hassan",
    nationalId: "••••••••••4821",
    age: 48,
    gender: "Male",
    bloodType: "O positive (O+)",
    bloodNote: "Verified in shared medical record",
    allergies: "Ibuprofen • Hives",
    allergyNote: "Avoid ibuprofen and review related NSAIDs",
    chronicDiseases: "Type 2 diabetes • Diagnosed 2019   |   Hypertension • Diagnosed 2020",
    currentMedications: [
      { name: "Metformin 500 mg", freq: "Twice daily with meals" },
      { name: "Lisinopril 10 mg", freq: "Once daily" },
    ],
    medicalHistory: "Hypertension follow-up • Oct 2026. No other history shared.",
    surgeries: "Appendectomy • 2014. No other surgeries shared.",
  };

  const alternatePatients = [
    { id: "PT-10482", name: "Ahmed Hassan", nid: "••••••••••4821", age: "48 years", gender: "Male" },
    { id: "PT-10635", name: "Salma Adel", nid: "••••••••••3390", age: "42 years", gender: "Female" },
    { id: "PT-10819", name: "Tarek Ibrahim", nid: "••••••••••7721", age: "55 years", gender: "Male" },
    { id: "PT-10901", name: "Mona Selim", nid: "••••••••••1209", age: "39 years", gender: "Female" },
  ];

  return (
    <div
      className="min-h-screen bg-white text-[#41474f] flex flex-col font-sans selection:bg-[#078bde]/30 selection:text-[#078bde]"
      data-node-id="609:10593"
      data-name="02 • Patient Medical Overview"
    >
      {/* 1. Unified Top Navigation matching Figma Node 609:10594 (Patients tab active) */}
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-[32px] py-[32px]">
        {/* Workflow body matching Figma Node 609:10636 */}
        <div
          className="content-stretch flex flex-col gap-[20px] items-start w-full max-w-[1216px] mx-auto"
          data-node-id="609:10636"
          data-name="Workflow body"
        >
          {/* Breadcrumb Navigation matching Figma Node 609:10637 */}
          <nav aria-label="Breadcrumb" className="w-full">
            <p
              className="break-words font-['Inter'] font-semibold leading-[20px] text-[#01091e] text-[14px] whitespace-pre-wrap"
              data-node-id="609:10637"
            >
              <Link href="/pharmacist" className="hover:text-[#078bde] transition-colors">
                Home
              </Link>
              {"  /  "}
              <Link href="/pharmacist/patient" className="hover:text-[#078bde] transition-colors">
                Find Patient
              </Link>
              {"  /  "}
              <span>{patient.name}</span>
            </p>
          </nav>

          {/* Heading matching Figma Node 609:10638 */}
          <h1
            className="break-words font-['Inter'] font-semibold leading-[36px] text-[#02307d] text-[28px]"
            data-node-id="609:10638"
          >
            Patient Medical Overview
          </h1>

          {/* Subtitle matching Figma Node 609:10639 */}
          <p
            className="break-words font-['Inter'] font-normal leading-[20px] text-[#727272] text-[14px]"
            data-node-id="609:10639"
          >
            {patient.name} • {patient.id}
          </p>

          {/* Patient Result Card matching Figma Node 609:10640 */}
          <div
            className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col items-start p-[24px] relative rounded-[16px] shrink-0 w-full"
            data-node-id="609:10640"
            data-name="Patient result • Ahmed Hassan"
          >
            <div
              className="content-stretch flex flex-col lg:flex-row gap-[16px] items-start lg:items-center justify-between relative shrink-0 w-full"
              data-node-id="609:10641"
              data-name="Patient identity"
            >
              {/* Identity details with Avatar */}
              <div className="flex gap-[16px] items-center flex-1 min-w-0">
                <div
                  className="relative rounded-[12px] shrink-0 size-[56px] overflow-hidden"
                  data-node-id="463:1133"
                  data-name="Pulse / Patient avatar"
                >
                  <Image
                    src="/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png"
                    alt={patient.name}
                    width={56}
                    height={56}
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full"
                    priority
                  />
                </div>
                <div
                  className="break-words content-stretch flex flex-col gap-[4px] lg:gap-[6px] items-start min-w-px not-italic relative flex-1"
                  data-node-id="609:10643"
                  data-name="Identity details"
                >
                  <p
                    className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[18px] w-full"
                    data-node-id="609:10644"
                  >
                    {patient.name}
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[20px] text-[#727272] text-[12px] w-full whitespace-pre-wrap"
                    data-node-id="609:10645"
                  >
                    {`Patient ID: ${patient.id}   •   National ID: ${patient.nationalId}`}
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[20px] text-[#41474f] text-[12px] w-full"
                    data-node-id="609:10646"
                  >
                    {patient.gender} • {patient.age} years • Identity verified
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap gap-[12px] items-center shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => setChangePatientModalOpen(true)}
                  className="bg-[#078bde] hover:bg-[#0074bc] content-stretch flex h-[40px] items-center justify-center relative rounded-[8px] shrink-0 w-full sm:w-[256px] cursor-pointer transition-colors shadow-2xs"
                  data-node-id="463:1183"
                  data-name="Pulse / Button / Primary"
                >
                  <p
                    className="break-words font-['Inter'] font-semibold leading-[20px] text-white text-[14px] whitespace-nowrap"
                    data-node-id="463:1184"
                  >
                    Change Patient
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setAiAssistantOpen(true)}
                  className="bg-[#078bde] hover:bg-[#0074bc] border border-[#078bde] content-stretch cursor-pointer flex items-center justify-center px-[16px] py-[10px] relative rounded-[4px] shrink-0 w-full sm:w-[260px] transition-colors shadow-2xs"
                  data-node-id="666:3406"
                  data-name="AI Medical Assistant"
                >
                  <p
                    className="break-words font-['Inter'] font-medium leading-[1.5] text-white text-[14px] text-left w-full sm:w-[228px]"
                    data-node-id="666:3407"
                  >
                    AI Medical Assistant
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Authorized pharmacy access Card matching Figma Node 609:10648 */}
          <div
            className="break-words bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[4px] items-start leading-[20px] not-italic p-[24px] relative rounded-[16px] shrink-0 text-[14px] w-full"
            data-node-id="609:10648"
            data-name="Authorized pharmacy access"
          >
            <p
              className="font-['Inter'] font-semibold text-[#01091e] w-full"
              data-node-id="609:10649"
            >
              Authorized pharmacy access
            </p>
            <p
              className="font-['Inter'] font-normal text-[#41474f] w-full"
              data-node-id="609:10650"
            >
              Patient consent active • Shared clinical summary and prescriptions only. Private notes and unrelated records are not shown.
            </p>
          </div>

          {/* Clinical summary 3 columns matching Figma Node 609:10651 */}
          <div
            className="break-words content-stretch grid grid-cols-1 md:grid-cols-3 gap-[16px] items-stretch not-italic relative shrink-0 w-full"
            data-node-id="609:10651"
            data-name="Clinical summary"
          >
            {/* Basic Patient Information matching Figma Node 609:10652 */}
            <div
              className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] w-full"
              data-node-id="609:10652"
              data-name="Basic Patient Information"
            >
              <p
                className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
                data-node-id="609:10653"
              >
                Basic Patient Information
              </p>
              <div
                className="font-['Inter'] font-normal text-[#41474f] text-[14px] w-full space-y-0"
                data-node-id="609:10654"
              >
                <p className="leading-[20px] mb-0">{patient.name}</p>
                <p className="leading-[20px] mb-0">{patient.gender} • {patient.age} years</p>
                <p className="leading-[20px]">National ID: {patient.nationalId}</p>
              </div>
            </div>

            {/* Blood Type matching Figma Node 609:10655 */}
            <div
              className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] w-full"
              data-node-id="609:10655"
              data-name="Blood Type"
            >
              <p
                className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
                data-node-id="609:10656"
              >
                Blood Type
              </p>
              <div
                className="font-['Inter'] font-normal text-[#41474f] text-[14px] w-full space-y-0"
                data-node-id="609:10657"
              >
                <p className="leading-[20px] mb-0">{patient.bloodType}</p>
                <p className="leading-[20px]">{patient.bloodNote}</p>
              </div>
            </div>

            {/* Known Allergies matching Figma Node 609:10658 */}
            <div
              className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start p-[24px] relative rounded-[16px] w-full"
              data-node-id="609:10658"
              data-name="Known Allergies"
            >
              <p
                className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
                data-node-id="609:10659"
              >
                Known Allergies
              </p>
              <div
                className="font-['Inter'] font-normal text-[#ef4444] text-[14px] w-full space-y-0"
                data-node-id="609:10660"
              >
                <p className="leading-[20px] mb-0">{patient.allergies}</p>
                <p className="leading-[20px]">{patient.allergyNote}</p>
              </div>
            </div>
          </div>

          {/* Shared medical information matching Figma Node 609:10661 */}
          <div
            className="break-words bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[16px] items-start not-italic p-[24px] relative rounded-[16px] shrink-0 w-full"
            data-node-id="609:10661"
            data-name="Shared medical information"
          >
            {/* Chronic Diseases */}
            <p
              className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
              data-node-id="609:10662"
            >
              Chronic Diseases
            </p>
            <p
              className="font-['Inter'] font-normal leading-[20px] text-[#41474f] text-[14px] w-full whitespace-pre-wrap"
              data-node-id="609:10663"
            >
              {patient.chronicDiseases}
            </p>

            {/* Current Medications */}
            <p
              className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
              data-node-id="609:10664"
            >
              Current Medications
            </p>
            <div
              className="font-['Inter'] font-normal text-[#41474f] text-[14px] w-full space-y-0"
              data-node-id="609:10665"
            >
              {patient.currentMedications.map((med, idx) => (
                <p key={idx} className={`leading-[20px] ${idx === 0 ? "mb-0" : ""}`}>
                  {med.name} • {med.freq}
                </p>
              ))}
            </div>

            {/* Previous Medical History */}
            <p
              className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
              data-node-id="609:10666"
            >
              Previous Medical History
            </p>
            <p
              className="font-['Inter'] font-normal leading-[20px] text-[#41474f] text-[14px] w-full"
              data-node-id="609:10667"
            >
              {patient.medicalHistory}
            </p>

            {/* Previous Surgeries */}
            <p
              className="font-['Inter'] font-semibold leading-[26px] text-[#02307d] text-[16px] w-full"
              data-node-id="609:10668"
            >
              Previous Surgeries
            </p>
            <p
              className="font-['Inter'] font-normal leading-[20px] text-[#41474f] text-[14px] w-full"
              data-node-id="609:10669"
            >
              {patient.surgeries}
            </p>
          </div>

          {/* View Prescriptions Primary Button matching Figma Node 463:1183 */}
          <Link
            href={`/pharmacist/prescriptions?patient=${patient.id}`}
            className="bg-[#078bde] hover:bg-[#0074bc] content-stretch flex h-[40px] items-center justify-center relative rounded-[8px] shrink-0 w-[256px] transition-colors shadow-2xs cursor-pointer"
            data-node-id="463:1183"
            data-name="Pulse / Button / Primary"
          >
            <p
              className="break-words font-['Inter'] font-semibold leading-[20px] text-white text-[14px] whitespace-nowrap"
              data-node-id="463:1184"
            >
              View Prescriptions
            </p>
          </Link>

          {/* Illustrative patient data footer note matching Figma Node 609:10671 */}
          <p
            className="break-words font-['Inter'] font-normal leading-[20px] min-w-full not-italic relative shrink-0 text-[#727272] text-[12px] w-[min-content] whitespace-pre-wrap"
            data-node-id="609:10671"
          >
            {`Pulse ID  •  Pharmacy workspace  •  Illustrative patient data`}
          </p>
        </div>
      </main>

      {/* Interactive Change Patient Modal */}
      {changePatientModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[16px] p-6 max-w-lg w-full border border-[#dde7ff] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-['Inter'] font-semibold text-[18px] text-[#02307d]">
                Select Patient
              </h3>
              <button
                type="button"
                onClick={() => setChangePatientModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              placeholder="Search by name, Patient ID, or National ID..."
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[8px] border border-[#dde7ff] text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#078bde]"
            />
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {alternatePatients
                .filter(
                  (p) =>
                    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                    p.id.toLowerCase().includes(patientSearch.toLowerCase()) ||
                    p.nid.includes(patientSearch)
                )
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/pharmacist/patient?id=${p.id}`}
                    onClick={() => setChangePatientModalOpen(false)}
                    className="flex items-center justify-between p-3 rounded-[10px] hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[14px] text-[#02307d]">{p.name}</p>
                      <p className="text-[12px] text-[#727272]">
                        {p.id} • {p.nid} • {p.gender}, {p.age}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#078bde]">Select →</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Slide-out AI Medical Assistant Drawer */}
      <AiMedicalAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        patientName={patient.name}
        patientId={patient.id}
      />

      <Footer />
    </div>
  );
}
