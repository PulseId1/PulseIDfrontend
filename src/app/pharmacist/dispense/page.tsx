"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PharmacistNavbar } from "@/features/pharmacist/pharmacist-navbar";
import { AiMedicalAssistantDrawer } from "@/features/pharmacist/ai-medical-assistant-drawer";
import { Footer } from "@/components/common";
import { Check, X, ShieldCheck, Printer, ArrowRight, ArrowLeft } from "lucide-react";

interface PrescriptionOption {
  id: string;
  rxNumber: string;
  doctor: string;
  specialty: string;
  clinic: string;
  date: string;
  medCount: number;
  status: "Pending Dispensing" | "Partially Dispensed";
  statusVariant: "sky" | "emerald";
  medicationsText: string;
}

interface MedicationItem {
  id: string;
  name: string;
  regimen: string;
  prescribedText: string;
  instructions: string;
  quantity: number;
  excluded: boolean;
  canExclude: boolean;
}

function DispensingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  
  // Steps:
  // 0: Select Prescription & AI Safety Review (Figma 609:11294)
  // 1: Medication Review & Exclusions (Figma 609:11520)
  // 2: Dispensing Confirmation (Figma 609:11720)
  const initialStep = stepParam === "2" ? 2 : stepParam === "0" || stepParam === "select" ? 0 : 1;
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const [selectedRxId, setSelectedRxId] = useState<string>("RX-2026-9042");
  const [alertsAcknowledged, setAlertsAcknowledged] = useState<boolean>(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  const [confirmedModalOpen, setConfirmedModalOpen] = useState<boolean>(false);

  // AI Assistant interactive state (Step 0)
  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>(
    "Current medicines: Metformin 500 mg twice daily and lisinopril 10 mg daily [1].\nAllergy: Ibuprofen — hives [2].\nHistory: Type 2 diabetes and hypertension [3].\nSelected potassium chloride may raise potassium with lisinopril. Confirm monitoring with the prescriber [1,4]. No recent laboratory results are in the authorized record set."
  );
  const [activeQuestionTitle, setActiveQuestionTitle] = useState<string>(
    "Summarize the patient’s medication history."
  );

  const prescriptions: PrescriptionOption[] = [
    {
      id: "RX-2026-9042",
      rxNumber: "RX-2026-9042",
      doctor: "Dr. Mohamed Ahmed",
      specialty: "Cardiology",
      clinic: "Al Shifa Medical Center",
      date: "Nov 10, 2026",
      medCount: 3,
      status: "Pending Dispensing",
      statusVariant: "sky",
      medicationsText: "Amoxicillin 500 mg, Potassium chloride 10 mEq, Lisinopril 10 mg",
    },
    {
      id: "RX-2026-9018",
      rxNumber: "RX-2026-9018",
      doctor: "Dr. Mohamed Ali",
      specialty: "Internal Medicine",
      clinic: "Cairo Medical Clinic",
      date: "Nov 08, 2026",
      medCount: 2,
      status: "Pending Dispensing",
      statusVariant: "sky",
      medicationsText: "Metformin 500 mg, Atorvastatin 20 mg",
    },
    {
      id: "RX-2026-8975",
      rxNumber: "RX-2026-8975",
      doctor: "Dr. Sara Mahmoud",
      specialty: "Dermatology",
      clinic: "Al Noor Clinic",
      date: "Nov 05, 2026",
      medCount: 4,
      status: "Partially Dispensed",
      statusVariant: "emerald",
      medicationsText: "Hydrocortisone cream, Cetirizine 10 mg, Multivitamin",
    },
  ];

  const selectedPrescription =
    prescriptions.find((p) => p.id === selectedRxId) || prescriptions[0];

  // Medications state for RX-2026-9042 (Step 1)
  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: "med-1",
      name: "Amoxicillin 500 mg",
      regimen: "1 capsule • Three times daily • 7 days",
      prescribedText: "Prescribed: 21 capsules • Previously dispensed: 0",
      instructions: "Take after food. Complete the prescribed course.",
      quantity: 21,
      excluded: false,
      canExclude: false,
    },
    {
      id: "med-2",
      name: "Potassium chloride 10 mEq",
      regimen: "1 tablet • Once daily • 14 days",
      prescribedText: "Prescribed: 14 tablets • Previously dispensed: 0",
      instructions: "Take with food and a full glass of water. Do not crush.",
      quantity: 14,
      excluded: false,
      canExclude: true,
    },
    {
      id: "med-3",
      name: "Potassium chloride 10 mEq",
      regimen: "1 tablet • Once daily • 14 days",
      prescribedText: "Prescribed: 14 tablets • Previously dispensed: 0",
      instructions: "Take with food and a full glass of water. Do not crush.",
      quantity: 14,
      excluded: true, // Default to excluded to match design total (2 selected, 35 units total)
      canExclude: true,
    },
  ]);

  const toggleExclude = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, excluded: !med.excluded } : med))
    );
  };

  const activeMedications = medications.filter((m) => !m.excluded);
  const selectedMedCount = activeMedications.length;
  const totalUnits = activeMedications.reduce((sum, m) => sum + m.quantity, 0);

  const goToStep = (step: number) => {
    setCurrentStep(step);
    router.push(`/pharmacist/dispense?step=${step}`);
  };

  const handleSelectQuestion = (q: string) => {
    setActiveQuestionTitle(q);
    if (q.includes("conflict")) {
      setAiResponse(
        "Potential interaction identified [1,4]: Concurrent potassium chloride and lisinopril may increase serum potassium. Lisinopril reduces aldosterone, impairing potassium excretion. Clinical verification recommended."
      );
    } else if (q.includes("allergies")) {
      setAiResponse(
        "Verified allergy record [2]: Patient has a confirmed allergic reaction to Ibuprofen presenting as hives (urticaria). Avoid all NSAIDs unless explicitly cleared by allergist."
      );
    } else if (q.includes("safety concerns")) {
      setAiResponse(
        "Safety alert: 1 moderate interaction between Lisinopril and Potassium chloride [4]. Kidney function (eGFR/Creatinine) and electrolyte panel should be verified prior to chronic administration."
      );
    } else {
      setAiResponse(
        "Current medicines: Metformin 500 mg twice daily and lisinopril 10 mg daily [1].\nAllergy: Ibuprofen — hives [2].\nHistory: Type 2 diabetes and hypertension [3].\nSelected potassium chloride may raise potassium with lisinopril. Confirm monitoring with the prescriber [1,4]. No recent laboratory results are in the authorized record set."
      );
    }
  };

  const handleSendCustomQuestion = () => {
    if (!aiQuestion.trim()) return;
    setActiveQuestionTitle(aiQuestion);
    setAiResponse(
      `AI review for query: "${aiQuestion}"\nBased on authorized patient records [1-3], no additional contraindications were found beyond the documented ibuprofen allergy and potassium monitoring advisory.`
    );
    setAiQuestion("");
  };

  return (
    <div
      className="min-h-screen bg-white text-[#41474f] flex flex-col font-sans selection:bg-[#078bde]/30 selection:text-[#078bde]"
      data-node-id={
        currentStep === 0
          ? "609:11294"
          : currentStep === 1
          ? "609:11520"
          : "609:11720"
      }
      data-name={
        currentStep === 0
          ? "Dispensing body • Prescription Selection & AI Review"
          : currentStep === 1
          ? "Dispensing body • Medication Review & Exclusions"
          : "Dispensing Confirmation body"
      }
    >
      <PharmacistNavbar onOpenAiAssistant={() => setAiAssistantOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6">
        <div className="flex flex-col gap-[20px] items-start w-full max-w-[1216px] mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
            <div
              className="font-semibold text-sm leading-[20px] text-[#040a17]"
              data-node-id="609:11295"
            >
              <Link href="/pharmacist" className="hover:text-[#078bde] transition-colors">
                Home
              </Link>
              {"  /  "}
              <Link
                href="/pharmacist/prescriptions"
                className="hover:text-[#078bde] transition-colors"
              >
                Incoming Prescriptions
              </Link>
              {"  /  "}
              <span className="text-[#040a17]">Medication Dispensing</span>
            </div>

            {/* Step Navigation Pill Indicator */}
            <div className="flex items-center gap-1.5 bg-[#f8fafc] border border-[#dde7ff] p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => goToStep(0)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currentStep === 0
                    ? "bg-[#008fe5] text-white font-semibold shadow-xs"
                    : "text-[#07377f] hover:bg-white"
                }`}
              >
                1. Prescriptions &amp; AI
              </button>
              <span className="text-slate-300">›</span>
              <button
                type="button"
                onClick={() => goToStep(1)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currentStep === 1
                    ? "bg-[#008fe5] text-white font-semibold shadow-xs"
                    : "text-[#07377f] hover:bg-white"
                }`}
              >
                2. Review &amp; Exclude
              </button>
              <span className="text-slate-300">›</span>
              <button
                type="button"
                onClick={() => goToStep(2)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  currentStep === 2
                    ? "bg-[#008fe5] text-white font-semibold shadow-xs"
                    : "text-[#07377f] hover:bg-white"
                }`}
              >
                3. Confirmation
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* STEP 0: Prescription Selection & AI Safety Review (Figma 609:11294) */}
          {/* ============================================================== */}
          {currentStep === 0 && (
            <div
              className="flex flex-col gap-[24px] items-start w-full"
              data-node-id="609:11294"
              data-name="Dispensing body"
            >
              {/* Screen heading (Figma 609:11296) */}
              <div
                className="flex flex-col gap-[4px] items-start w-full"
                data-node-id="609:11296"
                data-name="Screen heading"
              >
                <h1
                  className="font-semibold text-[28px] leading-[36px] text-[#07377f] w-full"
                  data-node-id="609:11297"
                >
                  Medication Dispensing &amp; Safety Review
                </h1>
                <p
                  className="font-normal text-sm leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11298"
                >
                  Select prescription, review AI safety alerts, and verify suitability before adjusting quantities.
                </p>
              </div>

              {/* Patient and dispensing information (Figma 609:11299) */}
              <div
                className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11299"
                data-name="Patient and dispensing information"
              >
                <div
                  className="flex flex-col sm:flex-row gap-[16px] sm:gap-[12px] items-start sm:items-center w-full"
                  data-node-id="609:11300"
                  data-name="Patient identity and pharmacy"
                >
                  <div
                    className="relative rounded-[12px] size-[56px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200"
                    data-node-id="609:11301"
                    data-name="Pulse / Patient avatar"
                  >
                    <img
                      alt="Ahmed Hassan"
                      className="absolute inset-0 object-cover rounded-[12px] size-full"
                      src="/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png";
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-col gap-[4px] items-start w-full sm:w-[440px]"
                    data-node-id="609:11302"
                    data-name="Patient identity"
                  >
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                      data-node-id="609:11303"
                    >
                      Ahmed Hassan
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#41474f] w-full"
                      data-node-id="609:11304"
                    >
                      PT-10482 • Male, 48 years • National ID: ••••••4821
                    </p>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-[200px]"
                    data-node-id="609:11305"
                    data-name="Pharmacy identity"
                  >
                    <p
                      className="font-semibold text-base leading-[26px] text-[#078bde] w-full"
                      data-node-id="609:11306"
                    >
                      Al Shifa Pharmacy
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#41474f] w-full"
                      data-node-id="609:11307"
                    >
                      Actual dispensing pharmacist: Mohamed Ali • PH-2841
                    </p>
                  </div>
                </div>

                <p
                  className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11308"
                >
                  Authorized pharmacy access • Shared clinical summary and prescriptions only.
                </p>

                {/* Dispensing type buttons */}
                <div
                  className="flex gap-[12px] items-center w-full pt-1"
                  data-node-id="609:11309"
                  data-name="Dispensing type"
                >
                  <p
                    className="font-semibold text-sm leading-[20px] text-[#078bde] whitespace-nowrap"
                    data-node-id="609:11310"
                  >
                    Dispensing type
                  </p>
                  <button
                    type="button"
                    className="bg-[#008fe5] text-white font-semibold text-sm leading-[20px] h-[40px] w-[164px] rounded-[8px] flex items-center justify-center cursor-pointer shadow-xs transition-opacity"
                    data-node-id="609:11311"
                    data-name="@modeRx"
                  >
                    Prescription
                  </button>
                  <Link
                    href="/pharmacist/otc"
                    className="bg-white border border-[#dde7ff] text-[#07377f] hover:bg-slate-50 font-semibold text-sm leading-[20px] h-[40px] w-[104px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                    data-node-id="609:11312"
                    data-name="@modeOtc"
                  >
                    OTC
                  </Link>
                </div>

                <div className="pt-1">
                  <p
                    className="font-semibold text-sm leading-[20px] text-[#078bde] w-full"
                    data-node-id="609:11313"
                  >
                    Prescription • {selectedPrescription.rxNumber}
                  </p>
                  <p
                    className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                    data-node-id="609:11314"
                  >
                    Prescription creator: Dr. Farida Amin • Pharmacist PH-1937
                  </p>
                </div>
              </div>

              {/* Medication workspace and AI assistant (Figma 609:11315) */}
              <div
                className="flex flex-col lg:flex-row gap-[24px] items-start w-full"
                data-node-id="609:11315"
                data-name="Medication workspace and AI assistant"
              >
                {/* Left Column: Available Prescriptions */}
                <div
                  className="flex flex-1 flex-col gap-[16px] items-start w-full min-w-0"
                  data-node-id="609:11316"
                  data-name="Section - LEFT COLUMN: Available Prescriptions (8 Cols)"
                >
                  <div
                    className="flex flex-col gap-[2px] items-start w-full"
                    data-node-id="609:11317"
                    data-name="Header for Section"
                  >
                    <div
                      className="font-bold text-base leading-normal text-[#01091e] w-full"
                      data-node-id="609:11319"
                    >
                      Available Prescriptions
                    </div>
                    <div
                      className="font-normal text-xs leading-normal text-[#41474f] w-full"
                      data-node-id="609:11321"
                    >
                      Select a prescription to review and dispense medications. Dispensing summary updates based on selection.
                    </div>
                  </div>

                  {/* Prescriptions Container */}
                  <div
                    className="flex flex-col gap-[14px] items-start w-full"
                    data-node-id="609:11322"
                    data-name="Prescriptions Container"
                  >
                    {prescriptions.map((rx) => {
                      const isSelected = selectedRxId === rx.id;
                      return (
                        <div
                          key={rx.id}
                          onClick={() => setSelectedRxId(rx.id)}
                          className={`bg-white rounded-[16px] transition-all cursor-pointer w-full ${
                            isSelected
                              ? "border-2 border-[#078bde] p-[22px] shadow-[0px_0px_0px_1px_rgba(0,133,215,0.2),0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                              : "border border-[#d8e5f2] p-[21px] hover:border-[#078bde]/40"
                          } flex flex-col gap-[14px] items-start relative`}
                          data-node-id={isSelected ? "609:11323" : "609:11356"}
                        >
                          <div className="flex items-start justify-between w-full">
                            <div className="flex gap-[12px] items-start">
                              <div className="flex flex-col items-start pt-[2px]">
                                {isSelected ? (
                                  <div className="bg-white border-2 border-[#078bde] rounded-full size-[20px] flex items-center justify-center p-[2px]">
                                    <div className="bg-[#078bde] rounded-full size-[10px]" />
                                  </div>
                                ) : (
                                  <div className="bg-white border border-[#cbd5e1] rounded-full size-[20px]" />
                                )}
                              </div>

                              <div className="flex flex-col gap-[4px] items-start max-w-lg">
                                <div className="flex flex-wrap gap-[8px] items-center w-full">
                                  <span className="font-bold text-sm text-[#078bde] whitespace-nowrap">
                                    Prescription #{rx.rxNumber}
                                  </span>
                                  {rx.statusVariant === "sky" ? (
                                    <span className="bg-[#8ebfde]/20 border border-[#02307d]/55 text-[#022a43] text-[11px] font-semibold px-[9px] py-[3px] rounded-[6px] whitespace-nowrap">
                                      {rx.status}
                                    </span>
                                  ) : (
                                    <span className="bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-[11px] font-semibold px-[9px] py-[3px] rounded-[6px] whitespace-nowrap">
                                      {rx.status}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-x-2 gap-y-1 items-center w-full text-xs">
                                  <span className="font-medium text-[#02307d] whitespace-nowrap">
                                    {rx.doctor}
                                  </span>
                                  <span className="text-[#cbd5e1]">•</span>
                                  <span className="font-normal text-[#41474f] whitespace-nowrap">
                                    {rx.specialty}
                                  </span>
                                  <span className="text-[#cbd5e1]">•</span>
                                  <span className="font-normal text-[#41474f] whitespace-nowrap">
                                    {rx.clinic}
                                  </span>
                                  <span className="text-[#cbd5e1]">•</span>
                                  <span className="font-medium text-[#41474f] whitespace-nowrap">
                                    {rx.date}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div
                              className={`flex flex-col items-start px-[11px] py-[5px] rounded-[8px] border shrink-0 ${
                                isSelected
                                  ? "bg-[#eff6ff] border-[#dbeafe] text-[#078bde]"
                                  : "bg-[#f8fafc] border-[#e2e8f0] text-[#41474f]"
                              }`}
                            >
                              <span className="font-semibold text-xs whitespace-nowrap">
                                {rx.medCount} Medications
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-[#f1f5f9] pt-[13px] pl-[32px] w-full">
                            <p className="text-xs">
                              <span
                                className={`font-medium ${
                                  isSelected ? "text-[#078bde]" : "text-[#02307d]"
                                }`}
                              >
                                Medications:
                              </span>
                              <span className="font-normal text-[#41474f]">
                                {" "}{rx.medicationsText}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {/* Drug interactions & allergy review card (Figma 609:11418) */}
                    <div
                      className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                      data-node-id="609:11418"
                      data-name="Drug interactions and allergies"
                    >
                      <p
                        className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                        data-node-id="609:11419"
                      >
                        Drug interactions &amp; allergy review
                      </p>
                      <div
                        className="font-normal text-sm text-[#41474f] space-y-0 w-full"
                        data-node-id="609:11420"
                      >
                        <p className="leading-[20px] m-0">
                          Verified record • Ibuprofen allergy: hives [AL-10482-01].
                        </p>
                        <p className="leading-[20px] m-0">
                          Current medicines: Metformin 500 mg twice daily; lisinopril 10 mg daily [MR-10482-02].
                        </p>
                      </div>

                      <div
                        className="flex flex-col gap-[4px] items-start w-full text-sm leading-[20px]"
                        data-node-id="609:11424"
                        data-name="Potential interaction detected"
                      >
                        <p
                          className="font-semibold text-[#ab4a05] w-full"
                          data-node-id="609:11425"
                        >
                          MODERATE • Potassium chloride + lisinopril
                        </p>
                        <p
                          className="font-normal text-[#41474f] w-full"
                          data-node-id="609:11426"
                        >
                          Concurrent potassium supplementation and lisinopril may raise serum potassium. Verify recent potassium and renal function, and clarify monitoring with the prescriber before dispensing.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAiAssistantOpen(true)}
                        className="font-semibold text-sm leading-[20px] text-[#078bde] hover:underline cursor-pointer text-left"
                        data-node-id="609:11431"
                      >
                        View alert details &amp; sources
                      </button>

                      <button
                        type="button"
                        onClick={() => setAlertsAcknowledged(!alertsAcknowledged)}
                        className={`border border-[#dde7ff] rounded-[8px] h-[40px] px-4 flex items-center justify-center cursor-pointer transition-all w-full max-w-[752px] ${
                          alertsAcknowledged
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                            : "bg-white hover:bg-slate-50 text-[#41474f]"
                        }`}
                        data-node-id="609:11435"
                        data-name="@acknowledge"
                      >
                        <span className="font-semibold text-sm leading-[20px] flex items-center gap-2">
                          <span className="text-base font-mono">
                            {alertsAcknowledged ? "☑" : "□"}
                          </span>
                          <span>I reviewed the alerts and verified clinical suitability</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: AI Medical Assistant • RAG (Figma 609:11436) */}
                <div
                  className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full lg:w-[384px] shrink-0"
                  data-node-id="609:11436"
                  data-name="AI Medical Assistant • RAG"
                >
                  <p
                    className="font-semibold text-[18px] leading-[26px] text-[#07377f] w-full"
                    data-node-id="609:11437"
                  >
                    AI Medical Assistant
                  </p>
                  <p
                    className="font-semibold text-xs leading-[20px] text-[#008fe5] w-full"
                    data-node-id="609:11438"
                  >
                    RAG • Authorized patient records only
                  </p>
                  <p
                    className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                    data-node-id="609:11439"
                  >
                    AI-generated content is not a verified medical record. Responses below are illustrative prototype responses.
                  </p>

                  <p
                    className="font-semibold text-sm leading-[20px] text-[#07377f] w-full pt-1"
                    data-node-id="609:11440"
                  >
                    {activeQuestionTitle}
                  </p>

                  <div
                    className="bg-white border border-[#dde7ff] rounded-[8px] p-3 w-full"
                    data-node-id="609:11441"
                    data-name="AI-generated medication review"
                  >
                    <div
                      className="font-normal text-xs leading-[18px] text-[#41474f] space-y-1"
                      data-node-id="609:11442"
                    >
                      <p className="font-semibold text-[10px] tracking-wider text-[#008fe5] uppercase mb-1">
                        AI-GENERATED REVIEW
                      </p>
                      {aiResponse.split("\n").map((line, idx) => (
                        <p key={idx} className="mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAiAssistantOpen(true)}
                    className="font-semibold text-sm leading-[20px] text-[#07377f] hover:underline cursor-pointer text-left"
                    data-node-id="609:11443"
                  >
                    [1–4] View authorized record sources
                  </button>

                  <p
                    className="font-semibold text-sm leading-[20px] text-[#07377f] w-full pt-1"
                    data-node-id="609:11446"
                  >
                    Suggested questions
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectQuestion(
                        "Does this medication conflict with the patient’s current medications?"
                      )
                    }
                    className="bg-white hover:bg-slate-50 border border-[#dde7ff] p-[12px] rounded-[8px] w-full text-left transition-colors cursor-pointer"
                    data-node-id="609:11447"
                  >
                    <p className="font-normal text-xs leading-[18px] text-[#07377f]">
                      Does this medication conflict with the patient’s current medications?
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectQuestion("Does the patient have any relevant drug allergies?")
                    }
                    className="bg-white hover:bg-slate-50 border border-[#dde7ff] p-[12px] rounded-[8px] w-full text-left transition-colors cursor-pointer"
                    data-node-id="609:11449"
                  >
                    <p className="font-normal text-xs leading-[18px] text-[#07377f]">
                      Does the patient have any relevant drug allergies?
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectQuestion("Summarize the patient’s medication history.")
                    }
                    className="bg-white hover:bg-slate-50 border border-[#dde7ff] p-[12px] rounded-[8px] w-full text-left transition-colors cursor-pointer"
                    data-node-id="609:11451"
                  >
                    <p className="font-normal text-xs leading-[18px] text-[#07377f]">
                      Summarize the patient’s medication history.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectQuestion("Are there any potential safety concerns?")
                    }
                    className="bg-white hover:bg-slate-50 border border-[#dde7ff] p-[12px] rounded-[8px] w-full text-left transition-colors cursor-pointer"
                    data-node-id="609:11453"
                  >
                    <p className="font-normal text-xs leading-[18px] text-[#07377f]">
                      Are there any potential safety concerns?
                    </p>
                  </button>

                  <div className="w-full pt-1">
                    <input
                      type="text"
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendCustomQuestion()}
                      placeholder="Ask about authorized medication records…"
                      className="bg-white border border-[#dde7ff] p-[12px] rounded-[8px] w-full text-sm text-[#41474f] placeholder-[#727272] focus:outline-none focus:border-[#008fe5]"
                      data-node-id="609:11455"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSendCustomQuestion}
                    className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] rounded-[8px] w-full flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                    data-node-id="609:11459"
                  >
                    Send question
                  </button>

                  <p
                    className="font-normal text-xs leading-[18px] text-[#727272] w-full pt-1"
                    data-node-id="609:11460"
                  >
                    Supports professional judgment; does not replace clinical evaluation. Unshared records are never retrieved.
                  </p>
                </div>
              </div>

              {/* Dispensing summary card (Figma 609:11461) */}
              <div
                className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11461"
                data-name="Dispensing summary"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#07377f] w-full"
                  data-node-id="609:11462"
                >
                  Dispensing summary
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-start sm:items-center w-full"
                  data-node-id="609:11463"
                  data-name="Dispensing totals"
                >
                  <div
                    className="flex flex-col gap-[4px] items-start w-full sm:w-[240px]"
                    data-node-id="609:11464"
                    data-name="Total units to dispense"
                  >
                    <p className="font-normal text-xs leading-[20px] text-[#727272]">
                      Total units to dispense
                    </p>
                    <p
                      className="font-semibold text-[24px] leading-[36px] text-[#07377f]"
                      data-node-id="609:11466"
                    >
                      {selectedPrescription.medCount}
                    </p>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start"
                    data-node-id="609:11467"
                    data-name="Reviewed alerts"
                  >
                    <p className="font-normal text-xs leading-[20px] text-[#727272]">
                      Drug interaction alerts
                    </p>
                    <p className="font-normal text-sm leading-[20px] text-[#41474f]">
                      {alertsAcknowledged ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                          <Check className="size-4" /> 1 moderate alert acknowledged &amp; clinically verified
                        </span>
                      ) : (
                        "1 moderate alert • Review and acknowledge before continuing"
                      )}
                    </p>
                  </div>
                </div>

                <p
                  className="font-semibold text-sm leading-[20px] text-[#07377f] w-full whitespace-pre-wrap pt-1"
                  data-node-id="609:11470"
                >
                  Mohamed Ali • Pharmacist PH-2841 &nbsp;|&nbsp; Al Shifa Pharmacy
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[12px] items-center w-full pt-1"
                  data-node-id="609:11473"
                  data-name="Review actions"
                >
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[280px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    data-node-id="609:11474"
                  >
                    <span>Continue to Medication Review</span>
                    <ArrowRight className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/pharmacist/prescriptions")}
                    className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#02307d] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[140px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                    data-node-id="609:11475"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Footer audit text (Figma 609:11476) */}
              <p
                className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                data-node-id="609:11476"
              >
                Pulse ID • Illustrative patient records and AI responses • No real dispensing operation is performed
              </p>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 1: Medication Review & Exclusions (Figma 609:11520) */}
          {/* ============================================================== */}
          {currentStep === 1 && (
            <div
              className="flex flex-col gap-[24px] items-start w-full"
              data-node-id="609:11520"
              data-name="Dispensing body"
            >
              {/* Screen heading (Figma 609:11522) */}
              <div
                className="flex flex-col gap-[4px] items-start w-full"
                data-node-id="609:11522"
                data-name="Screen heading"
              >
                <h1
                  className="font-semibold text-[28px] leading-[36px] text-[#07377f] w-full"
                  data-node-id="609:11523"
                >
                  Medication Dispensing &amp; Safety Review
                </h1>
                <p
                  className="font-normal text-sm leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11524"
                >
                  Step 1 of 2 • Review medications, resolve safety concerns, and verify quantities.
                </p>
              </div>

              {/* Patient and dispensing information (Figma 609:11525) */}
              <div
                className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11525"
                data-name="Patient and dispensing information"
              >
                <div
                  className="flex flex-col sm:flex-row gap-[16px] sm:gap-[12px] items-start sm:items-center w-full"
                  data-node-id="609:11526"
                  data-name="Patient identity and pharmacy"
                >
                  <div
                    className="relative rounded-[12px] size-[56px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200"
                    data-node-id="609:11527"
                    data-name="Pulse / Patient avatar"
                  >
                    <img
                      alt="Ahmed Hassan"
                      className="absolute inset-0 object-cover rounded-[12px] size-full"
                      src="/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png";
                      }}
                    />
                  </div>

                  <div
                    className="flex flex-col gap-[4px] items-start w-full sm:w-[440px]"
                    data-node-id="609:11528"
                    data-name="Patient identity"
                  >
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                      data-node-id="609:11529"
                    >
                      Ahmed Hassan
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#41474f] w-full"
                      data-node-id="609:11530"
                    >
                      PT-10482 • Male, 48 years • National ID: ••••••4821
                    </p>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-[200px]"
                    data-node-id="609:11531"
                    data-name="Pharmacy identity"
                  >
                    <p
                      className="font-semibold text-base leading-[26px] text-[#078bde] w-full"
                      data-node-id="609:11532"
                    >
                      Al Shifa Pharmacy
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#41474f] w-full"
                      data-node-id="609:11533"
                    >
                      Actual dispensing pharmacist: Mohamed Ali • PH-2841
                    </p>
                  </div>
                </div>

                <p
                  className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11534"
                >
                  Authorized pharmacy access • Shared clinical summary and prescriptions only.
                </p>

                {/* Dispensing type buttons */}
                <div
                  className="flex gap-[12px] items-center w-full pt-1"
                  data-node-id="609:11535"
                  data-name="Dispensing type"
                >
                  <p
                    className="font-semibold text-sm leading-[20px] text-[#078bde] whitespace-nowrap"
                    data-node-id="609:11536"
                  >
                    Dispensing type
                  </p>
                  <button
                    type="button"
                    className="bg-[#008fe5] text-white font-semibold text-sm leading-[20px] h-[40px] w-[164px] rounded-[8px] flex items-center justify-center cursor-pointer shadow-xs transition-opacity"
                    data-node-id="609:11537"
                    data-name="@modeRx"
                  >
                    Prescription
                  </button>
                  <Link
                    href="/pharmacist/otc"
                    className="bg-white border border-[#dde7ff] text-[#07377f] hover:bg-slate-50 font-semibold text-sm leading-[20px] h-[40px] w-[104px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                    data-node-id="609:11538"
                    data-name="@modeOtc"
                  >
                    OTC
                  </Link>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 w-full">
                  <div>
                    <p
                      className="font-semibold text-sm leading-[20px] text-[#078bde]"
                      data-node-id="609:11539"
                    >
                      Prescription • RX-2026-9042
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272]"
                      data-node-id="609:11540"
                    >
                      Prescription creator: Dr. Farida Amin • Pharmacist PH-1937
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(0)}
                    className="text-xs font-semibold text-[#008fe5] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Change Prescription / View AI Screening</span>
                  </button>
                </div>
              </div>

              {/* Medication workspace (Figma 609:11541) */}
              <div
                className="flex flex-col gap-[20px] items-start w-full"
                data-node-id="609:11541"
                data-name="Medication workspace and AI assistant"
              >
                <div
                  className="flex flex-col gap-[20px] items-start w-full"
                  data-node-id="609:11542"
                  data-name="Medication and safety review"
                >
                  <div className="flex flex-col gap-[4px] items-start w-full">
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#01091e] w-full"
                      data-node-id="609:11543"
                    >
                      Selected medications
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                      data-node-id="609:11544"
                    >
                      Adjust quantities within the prescribed limit. OTC mode does not require a prescription.
                    </p>
                  </div>

                  {/* Medication cards list */}
                  {medications.map((med, index) => {
                    return (
                      <div
                        key={med.id}
                        className={`bg-white border ${
                          med.excluded && index !== 2 ? "border-slate-200 opacity-60 bg-slate-50/50" : "border-[#dde7ff]"
                        } drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full transition-all`}
                        data-node-id={
                          index === 0
                            ? "609:11545"
                            : index === 1
                            ? "609:11564"
                            : "609:11584"
                        }
                        data-name={`Medication ${index + 1}`}
                      >
                        <div
                          className="flex items-center w-full justify-between"
                          data-node-id={
                            index === 0
                              ? "609:11546"
                              : index === 1
                              ? "609:11565"
                              : "609:11585"
                          }
                          data-name="Medication title"
                        >
                          <div className="flex flex-col gap-[4px] items-start flex-1 min-w-0">
                            <p className="font-semibold text-[18px] leading-[26px] text-[#078bde]">
                              {med.name}
                            </p>
                            <p className="font-normal text-sm leading-[20px] text-[#41474f]">
                              {med.regimen}
                            </p>
                          </div>
                        </div>

                        <p className="font-normal text-xs leading-[20px] text-[#727272] w-full">
                          {med.prescribedText}
                        </p>

                        <p className="font-normal text-sm leading-[20px] text-[#41474f] w-full">
                          {med.instructions}
                        </p>

                        {med.canExclude && (
                          <button
                            type="button"
                            onClick={() => toggleExclude(med.id)}
                            className="font-semibold text-sm leading-[20px] text-[#078bde] hover:underline cursor-pointer text-left transition-colors"
                            data-node-id={index === 1 ? "609:11583" : "609:11603"}
                          >
                            Exclude this medication from dispensing
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dispensing summary card (Figma 609:11658) */}
              <div
                className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11658"
                data-name="Dispensing summary"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#07377f] w-full"
                  data-node-id="609:11659"
                >
                  Dispensing summary
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-start sm:items-center w-full"
                  data-node-id="609:11660"
                  data-name="Dispensing totals"
                >
                  <div
                    className="flex flex-col gap-[12px] items-start w-full sm:w-[240px]"
                    data-node-id="609:11661"
                    data-name="Selected medications"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272]"
                      data-node-id="609:11662"
                    >
                      Selected medications
                    </p>
                    <p
                      className="font-semibold text-[24px] leading-[36px] text-[#07377f]"
                      data-node-id="609:11663"
                    >
                      {selectedMedCount}
                    </p>
                  </div>

                  <div
                    className="flex flex-col gap-[12px] items-start w-full sm:w-[240px]"
                    data-node-id="609:11664"
                    data-name="Total units to dispense"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272]"
                      data-node-id="609:11665"
                    >
                      Total units to dispense
                    </p>
                    <p
                      className="font-semibold text-[24px] leading-[36px] text-[#07377f]"
                      data-node-id="609:11666"
                    >
                      {totalUnits}
                    </p>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[12px] items-start leading-[20px]"
                    data-node-id="609:11667"
                    data-name="Reviewed alerts"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272]"
                      data-node-id="609:11668"
                    >
                      Drug interaction alerts
                    </p>
                    <p
                      className="font-normal text-sm leading-[20px] text-[#41474f]"
                      data-node-id="609:11669"
                    >
                      1 moderate alert • Review and acknowledge before continuing
                    </p>
                  </div>
                </div>

                <p
                  className="font-semibold text-sm leading-[20px] text-[#07377f] w-full whitespace-pre-wrap pt-1"
                  data-node-id="609:11670"
                >
                  Mohamed Ali • Pharmacist PH-2841 &nbsp;|&nbsp; Al Shifa Pharmacy
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[12px] items-center w-full pt-1"
                  data-node-id="609:11673"
                  data-name="Review actions"
                >
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[280px] rounded-[8px] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                    data-node-id="609:11674"
                    data-name="@continue"
                  >
                    <span>Continue to Confirmation</span>
                    <ArrowRight className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => goToStep(0)}
                    className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#02307d] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[180px] rounded-[8px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                    <span>Back to Step 1</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/pharmacist/prescriptions")}
                    className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#727272] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[120px] rounded-[8px] flex items-center justify-center cursor-pointer transition-colors"
                    data-node-id="609:11675"
                    data-name="@cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Footer audit text (Figma 609:11676) */}
              <p
                className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                data-node-id="609:11676"
              >
                Pulse ID • Illustrative patient records and AI responses • No real dispensing operation is performed
              </p>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 2: Dispensing Confirmation (Figma 609:11720) */}
          {/* ============================================================== */}
          {currentStep === 2 && (
            <div
              className="flex flex-col gap-[24px] items-start w-full"
              data-node-id="609:11720"
              data-name="Dispensing body"
            >
              {/* Confirmation heading (Figma 609:11722) */}
              <div
                className="flex flex-col gap-[4px] items-start w-full"
                data-node-id="609:11722"
                data-name="Confirmation heading"
              >
                <h1
                  className="font-semibold text-[28px] leading-[36px] text-[#07377f] w-full"
                  data-node-id="609:11723"
                >
                  Dispensing Confirmation
                </h1>
                <p
                  className="font-normal text-sm leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11724"
                >
                  Step 2 of 2 • Review and approve the dispensing operation. Dr. Mohamed Ahmed
                </p>
              </div>

              {/* Patient and classification (Figma 609:11732) */}
              <div
                className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11732"
                data-name="Patient and classification"
              >
                <div
                  className="flex gap-[12px] items-center w-full"
                  data-node-id="609:11733"
                  data-name="Patient summary"
                >
                  <div
                    className="relative rounded-[12px] size-[56px] shrink-0 overflow-hidden bg-slate-100 border border-slate-200"
                    data-node-id="609:11734"
                    data-name="Pulse / Patient avatar"
                  >
                    <img
                      alt="Ahmed Hassan"
                      className="absolute inset-0 object-cover rounded-[12px] size-full"
                      src="/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png";
                      }}
                    />
                  </div>
                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-0"
                    data-node-id="609:11735"
                    data-name="Patient summary facts"
                  >
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                      data-node-id="609:11736"
                    >
                      Ahmed Hassan
                    </p>
                    <p
                      className="font-normal text-xs leading-[20px] text-[#41474f] w-full"
                      data-node-id="609:11737"
                    >
                      Patient ID: PT-10482 • National ID: ••••••4821
                    </p>
                    <p
                      className="font-semibold text-sm leading-[20px] text-[#078bde] w-full"
                      data-node-id="609:11738"
                    >
                      Prescription • RX-2026-9042
                    </p>
                  </div>
                </div>
              </div>

              {/* Final medication review (Figma 609:11739) */}
              <div
                className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11739"
                data-name="Final medication review"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#01091e] w-full"
                  data-node-id="609:11740"
                >
                  Medications being dispensed
                </p>

                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#02307d] w-full"
                  data-node-id="609:11741"
                >
                  <span>DR . Mohamed Ahmed </span>
                  <span className="text-[#bacfd7]">•</span>
                  <span> </span>
                  <span className="text-[#41474f]">Cardiology </span>
                  <span className="text-[#bacfd7]">•</span>
                  <span className="font-normal text-[#41474f]"> Nov 10, 2026</span>
                </p>

                {/* Final medication 1 */}
                <div
                  className="flex flex-col gap-[8px] items-start w-full pt-1"
                  data-node-id="609:11742"
                  data-name="Final medication 1"
                >
                  <p
                    className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                    data-node-id="609:11743"
                  >
                    Amoxicillin 500 mg
                  </p>
                  <p
                    className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                    data-node-id="609:11744"
                  >
                    1 capsule • Three times daily • 7 days
                  </p>
                  <div
                    className="flex gap-[12px] items-center w-full whitespace-nowrap"
                    data-node-id="609:11745"
                    data-name="Dispensed quantity"
                  >
                    <p
                      className="font-normal text-sm leading-[20px] text-[#727272]"
                      data-node-id="609:11746"
                    >
                      Quantity to dispense:
                    </p>
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#078bde]"
                      data-node-id="609:11747"
                    >
                      21
                    </p>
                  </div>
                  <p
                    className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                    data-node-id="609:11748"
                  >
                    Take after food. Complete the prescribed course.
                  </p>
                </div>

                {/* Final medication 2 */}
                <div
                  className="flex flex-col gap-[8px] items-start w-full pt-2"
                  data-node-id="609:11749"
                  data-name="Final medication 2"
                >
                  <p
                    className="font-semibold text-[18px] leading-[26px] text-[#078bde] w-full"
                    data-node-id="609:11750"
                  >
                    Potassium chloride 10 mEq
                  </p>
                  <p
                    className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                    data-node-id="609:11751"
                  >
                    1 tablet • Once daily • 14 days
                  </p>
                  <div
                    className="flex gap-[12px] items-center w-full whitespace-nowrap"
                    data-node-id="609:11752"
                    data-name="Dispensed quantity"
                  >
                    <p
                      className="font-normal text-sm leading-[20px] text-[#727272]"
                      data-node-id="609:11753"
                    >
                      Quantity to dispense:
                    </p>
                    <p
                      className="font-semibold text-[18px] leading-[26px] text-[#078bde]"
                      data-node-id="609:11754"
                    >
                      14
                    </p>
                  </div>
                  <p
                    className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                    data-node-id="609:11755"
                  >
                    Take with food and a full glass of water. Do not crush.
                  </p>
                </div>

                {/* Final totals */}
                <div
                  className="flex gap-[12px] items-center w-full whitespace-nowrap pt-3 border-t border-[#f1f5f9]"
                  data-node-id="609:11756"
                  data-name="Final totals"
                >
                  <p
                    className="font-normal text-sm leading-[20px] text-[#727272]"
                    data-node-id="609:11757"
                  >
                    Total medications:
                  </p>
                  <p
                    className="font-semibold text-base leading-[26px] text-[#078bde]"
                    data-node-id="609:11758"
                  >
                    {selectedMedCount}
                  </p>
                  <p
                    className="font-normal text-sm leading-[20px] text-[#727272] ml-4"
                    data-node-id="609:11759"
                  >
                    Total units:
                  </p>
                  <p
                    className="font-semibold text-base leading-[26px] text-[#078bde]"
                    data-node-id="609:11760"
                  >
                    {totalUnits}
                  </p>
                </div>
              </div>

              {/* Reviewed safety alerts card (Figma 609:11761) */}
              <div
                className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11761"
                data-name="Reviewed safety alerts"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#01091e] w-full"
                  data-node-id="609:11762"
                >
                  Reviewed drug interaction alerts
                </p>
                <p
                  className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                  data-node-id="609:11763"
                >
                  1 moderate alert • Review and acknowledge before continuing
                </p>

                <div
                  className="flex flex-col gap-[12px] items-start leading-[20px] text-sm w-full"
                  data-node-id="609:11764"
                  data-name="Moderate alert review"
                >
                  <p
                    className="font-semibold text-[#ab4a05] w-full"
                    data-node-id="609:11765"
                  >
                    MODERATE • Potassium chloride + lisinopril
                  </p>
                  <p
                    className="font-normal text-[#41474f] w-full"
                    data-node-id="609:11766"
                  >
                    Concurrent potassium supplementation and lisinopril may raise serum potassium. Verify recent potassium and renal function, and clarify monitoring with the prescriber before dispensing.
                  </p>
                </div>

                <p
                  className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11767"
                >
                  Known allergy: Ibuprofen — hives • Reviewed against authorized record AL-10482-01.
                </p>
                <p
                  className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11768"
                >
                  Safety review acknowledged by Mohamed Ali. AI-generated guidance is supplementary; approval is the pharmacist’s responsibility.
                </p>
              </div>

              {/* Pharmacist and pharmacy audit card (Figma 609:11769) */}
              <div
                className="bg-white border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11769"
                data-name="Pharmacist and pharmacy audit"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#01091e] w-full"
                  data-node-id="609:11770"
                >
                  Pharmacist &amp; pharmacy audit
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[16px] sm:gap-[12px] items-start sm:items-center w-full"
                  data-node-id="609:11771"
                  data-name="Audit identity and timestamp"
                >
                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-[200px]"
                    data-node-id="609:11772"
                    data-name="Actual dispensing pharmacist"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                      data-node-id="609:11773"
                    >
                      Actual dispensing pharmacist
                    </p>
                    <div
                      className="font-semibold text-sm text-[#078bde] w-full"
                      data-node-id="609:11774"
                    >
                      <p className="leading-[20px] mb-0">Mohamed Ali</p>
                      <p className="leading-[20px]">Pharmacist ID: PH-2841</p>
                    </div>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-[200px]"
                    data-node-id="609:11775"
                    data-name="Dispensing pharmacy"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                      data-node-id="609:11776"
                    >
                      Dispensing pharmacy
                    </p>
                    <div
                      className="font-semibold text-sm text-[#078bde] w-full"
                      data-node-id="609:11777"
                    >
                      <p className="leading-[20px] mb-0">Al Shifa Pharmacy</p>
                      <p className="leading-[20px]">Pharmacy ID: PHR-0048</p>
                    </div>
                  </div>

                  <div
                    className="flex flex-1 flex-col gap-[4px] items-start min-w-[200px]"
                    data-node-id="609:11778"
                    data-name="Dispensing date & time"
                  >
                    <p
                      className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                      data-node-id="609:11779"
                    >
                      Dispensing date &amp; time
                    </p>
                    <div
                      className="font-semibold text-sm text-[#078bde] w-full"
                      data-node-id="609:11780"
                    >
                      <p className="leading-[20px] mb-0">Nov 12, 2026</p>
                      <p className="leading-[20px]">11:18 AM • Example timestamp</p>
                    </div>
                  </div>
                </div>

                <p
                  className="font-normal text-sm leading-[20px] text-[#727272] w-full pt-1"
                  data-node-id="609:11781"
                >
                  Prescription creator: Dr. Farida Amin • Pharmacist PH-1937
                </p>
                <p
                  className="font-normal text-xs leading-[20px] text-[#727272] w-full"
                  data-node-id="609:11782"
                >
                  The original prescription author and the pharmacist performing this dispensing operation are stored as separate identities.
                </p>
              </div>

              {/* Final confirmation actions (Figma 609:11783) */}
              <div
                className="bg-[#fbfeff] border border-[#dde7ff] drop-shadow-[0px_2px_4px_rgba(7,55,128,0.04)] flex flex-col gap-[12px] items-start p-[24px] rounded-[16px] w-full"
                data-node-id="609:11783"
                data-name="Final confirmation actions"
              >
                <p
                  className="font-semibold text-[18px] leading-[26px] text-[#07377f] w-full"
                  data-node-id="609:11784"
                >
                  Confirm this operation
                </p>
                <p
                  className="font-normal text-sm leading-[20px] text-[#41474f] w-full"
                  data-node-id="609:11785"
                >
                  Completing creates a permanent medical record linked to this patient, pharmacy, and actual dispensing pharmacist. No operation is saved before confirmation.
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-[12px] items-center w-full pt-1"
                  data-node-id="609:11788"
                  data-name="Confirmation controls"
                >
                  <button
                    type="button"
                    onClick={() => setConfirmedModalOpen(true)}
                    className="bg-[#008fe5] hover:bg-[#007cc7] text-white font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[320px] rounded-[8px] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
                    data-node-id="609:11789"
                    data-name="@confirm"
                  >
                    Confirm &amp; Complete Dispensing
                  </button>

                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#02307d] font-semibold text-sm leading-[20px] h-[40px] w-full sm:w-[180px] rounded-[8px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    data-node-id="609:11790"
                    data-name="@back"
                  >
                    <ArrowLeft className="size-4" />
                    <span>Back to Review</span>
                  </button>
                </div>
              </div>

              {/* Footer audit text */}
              <p className="font-normal text-xs leading-[20px] text-[#727272] w-full">
                Pulse ID • Illustrative patient records and AI responses • No real dispensing operation is performed
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Dispensing Completed Success Modal */}
      {confirmedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 bg-[#02307d] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                  <Check className="size-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Dispensing Completed</h3>
                  <p className="text-xs text-sky-200">
                    RX-2026-9042 • Ahmed Hassan (PT-10482)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConfirmedModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-left">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-sm text-emerald-800">
                  <ShieldCheck className="size-4" />
                  <span>Permanent Dispensing Record Verified</span>
                </div>
                <p>
                  Receipt ID: <span className="font-mono font-bold">RCPT-2026-9042-8841</span>
                </p>
                <p>
                  Dispensed {selectedMedCount} medications ({totalUnits} total units) by Pharmacist Mohamed Ali (PH-2841) at Al Shifa Pharmacy.
                </p>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-2 text-xs">
                <p className="font-semibold text-[#02307d]">Dispensed Items:</p>
                {activeMedications.map((med, idx) => (
                  <div key={idx} className="flex justify-between text-slate-700">
                    <span>{med.name}</span>
                    <span className="font-semibold">{med.quantity} units</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500">
                Patient record updated in national repository. Prescription status marked as completed.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-white flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="size-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmedModalOpen(false);
                  router.push("/pharmacist/prescriptions");
                }}
                className="px-5 py-2 rounded-lg bg-[#008fe5] hover:bg-[#007cc7] text-white text-sm font-bold shadow-xs cursor-pointer"
              >
                Return to Prescriptions
              </button>
            </div>
          </div>
        </div>
      )}

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

export default function PharmacistDispensingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <p className="text-sm font-semibold text-[#07377f]">Loading dispensing review...</p>
        </div>
      }
    >
      <DispensingContent />
    </Suspense>
  );
}
