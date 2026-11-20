"use client";

import React, { useState } from "react";
import {
  CheckIcon,
  AlertTriangleIcon,
  LungsIcon,
  DnaIcon,
  PillIcon,
  PhoneCallIcon,
  LockIcon,
} from "./icons";

interface EmergencyPatient {
  id: string;
  name: string;
  age: number;
  pulseId: string;
  nationalIdMasked: string;
  bloodGroup: string;
  bloodNote: string;
  allergies: string[];
  chronic: string[];
  family: string;
  medications: string[];
  contactName: string;
  contactRelation: string;
  contactPhone: string;
}

const DEMO_PATIENTS: EmergencyPatient[] = [
  {
    id: "sara",
    name: "Sara Mahmoud Ibrahim",
    age: 28,
    pulseId: "PT-DEMO-2026-01",
    nationalIdMasked: "2980••••••••567",
    bloodGroup: "O+",
    bloodNote: "Universal red cell donor",
    allergies: ["Penicillin (Amoxicillin)", "Aspirin & NSAIDs"],
    chronic: ["Bronchial asthma", "Seasonal allergic rhinitis"],
    family: "Family history of asthma (mother)",
    medications: ["Symbicort Turbuhaler 160", "Ventolin Inhaler 100 mcg"],
    contactName: "Ahmed Mahmoud",
    contactRelation: "brother",
    contactPhone: "+20 100 482 9102",
  },
  {
    id: "tarek",
    name: "Amr Tarek Hassan",
    age: 45,
    pulseId: "PT-DEMO-2026-02",
    nationalIdMasked: "2790••••••••123",
    bloodGroup: "A+",
    bloodNote: "A+ / AB+ Compatible",
    allergies: ["Sulfa drugs (Sulfonamides)"],
    chronic: ["Type 2 Diabetes Mellitus", "Hypertension"],
    family: "Coronary artery disease (father)",
    medications: ["Metformin 1000mg", "Concor 5mg"],
    contactName: "Mona Hassan",
    contactRelation: "wife",
    contactPhone: "+20 102 345 6789",
  },
];

export function EmergencyTab() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("sara");
  const [searchMethod, setSearchMethod] = useState<"name" | "id" | "finger" | "face">("name");
  const [searchQuery, setSearchQuery] = useState("Sara Mahmoud Ibrahim");
  const [isCalling, setIsCalling] = useState(false);
  const [activeHighlightCard, setActiveHighlightCard] = useState<string | null>(null);

  const patient = DEMO_PATIENTS.find((p) => p.id === selectedPatientId) ?? DEMO_PATIENTS[0];

  const handleSelectPatient = (p: EmergencyPatient) => {
    setSelectedPatientId(p.id);
    setSearchQuery(p.name);
    setIsCalling(false);
  };

  const handleTriggerCall = () => {
    setIsCalling(true);
    setTimeout(() => setIsCalling(false), 3000);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* =========================================================
            LEFT COLUMN: IDENTIFICATION & TELEMETRY SEARCH CONTROLS
            ========================================================= */}
        <div className="lg:col-span-4 bg-white border border-[#dde7ff] rounded-[18px] p-4 sm:p-5 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="size-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#078bde]">
                EMERGENCY TELEMETRY SEARCH
              </span>
            </div>
            <h3 className="font-sans font-bold text-[17px] text-[#02307d]">
              Patient Emergency Locator
            </h3>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Life-saving telemetry is retrieved instantly upon authorized identity resolution.
            </p>
          </div>

          {/* Search method selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[12px] font-semibold">
            <button
              type="button"
              onClick={() => {
                setSearchMethod("name");
                setSearchQuery(patient.name);
              }}
              className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                searchMethod === "name" ? "bg-[#078bde] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Name
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchMethod("id");
                setSearchQuery(patient.nationalIdMasked);
              }}
              className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                searchMethod === "id" ? "bg-[#078bde] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              National ID
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchMethod("finger");
                setSearchQuery("Biometric Hardware Token #FING-8841");
              }}
              className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                searchMethod === "finger" ? "bg-[#078bde] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Fingerprint
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchMethod("face");
                setSearchQuery("Facial Geometry Hash #FACE-0294");
              }}
              className={`flex-1 py-1.5 rounded-lg text-center cursor-pointer transition-all ${
                searchMethod === "face" ? "bg-[#078bde] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Face
            </button>
          </div>

          {/* Active search input */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              {searchMethod === "name" && "Patient Full Name"}
              {searchMethod === "id" && "14-Digit National ID Number"}
              {searchMethod === "finger" && "Touch Hardware Biometric Sensor"}
              {searchMethod === "face" && "Facial Landmark Sensor Stream"}
            </label>
            <input
              type="text"
              readOnly
              value={searchQuery}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-800 bg-[#f8fbfe]"
            />
          </div>

          {/* Verified identity confirmation pill */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-[12px] font-bold">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="size-3.5" />
              <span>Identified: {patient.name}</span>
            </span>
          </div>

          {/* Quick patient switch selector */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wide">
              Switch Cohort Record:
            </span>
            <div className="space-y-1.5">
              {DEMO_PATIENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPatient(p)}
                  className={`w-full p-2.5 rounded-lg text-left text-[12px] transition-all cursor-pointer border ${
                    selectedPatientId === p.id
                      ? "bg-blue-50/80 border-[#078bde] text-[#02307d] font-bold shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{p.bloodGroup}</span>
                  </div>
                  <span className="text-[10.5px] text-slate-400 block">
                    {p.age} yrs &middot; {p.pulseId}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: EMERGENCY ACCESS TELEMETRY DECK
            ========================================================= */}
        <div className="lg:col-span-8 bg-white border border-[#dde7ff] rounded-[18px] overflow-hidden shadow-sm">
          {/* Header banner with physician authorization */}
          <div className="bg-red-600 text-white px-5 py-2.5 flex items-center justify-between text-[12.5px] font-bold">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-white animate-ping" />
              <span>EMERGENCY ACCESS OVERRIDE</span>
            </div>
            <span className="text-[11.5px] font-medium text-red-100">
              Dr. Tarek Al-Husseini &middot; licence verified
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {/* Patient identity overview */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-[#02307d] text-white flex items-center justify-center font-bold text-[14px]">
                  {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <span className="font-bold text-[16px] text-slate-900 block leading-tight">
                    {patient.name}
                  </span>
                  <span className="text-[11.5px] text-slate-500">
                    {patient.age} yrs &middot; PulseID {patient.pulseId} &middot; National ID {patient.nationalIdMasked}
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded">
                <CheckIcon className="size-3" />
                <span>Identified by {searchMethod}</span>
              </span>
            </div>

            {/* 6 Grid Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px]">
              {/* Card 1: Blood Group */}
              <div
                onClick={() => setActiveHighlightCard(activeHighlightCard === "blood" ? null : "blood")}
                className={`p-3.5 rounded-xl text-center cursor-pointer transition-all ${
                  activeHighlightCard === "blood"
                    ? "bg-red-100 border-2 border-red-500 shadow-md scale-102"
                    : "bg-red-50/70 border border-red-200 hover:border-red-300"
                }`}
              >
                <span className="text-[10.5px] font-bold text-red-600 uppercase block mb-1">
                  BLOOD GROUP
                </span>
                <span className="text-[32px] font-black text-red-600 block leading-none">
                  {patient.bloodGroup}
                </span>
                <span className="text-[10px] font-semibold text-red-800 block mt-1">
                  {patient.bloodNote}
                </span>
              </div>

              {/* Card 2: Allergies */}
              <div
                onClick={() => setActiveHighlightCard(activeHighlightCard === "allergies" ? null : "allergies")}
                className={`p-3.5 rounded-xl cursor-pointer transition-all ${
                  activeHighlightCard === "allergies"
                    ? "bg-amber-100 border-2 border-amber-500 shadow-md scale-102"
                    : "bg-amber-50/50 border border-amber-200 hover:border-amber-300"
                }`}
              >
                <span className="text-[10.5px] font-bold text-amber-800 uppercase flex items-center gap-1 mb-1.5">
                  <AlertTriangleIcon className="size-3.5 text-amber-600" />
                  <span>ALLERGIES</span>
                </span>
                <div className="space-y-1 text-[11.5px]">
                  {patient.allergies.map((allergy) => (
                    <span key={allergy} className="block text-red-700 font-bold">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Chronic Conditions */}
              <div
                onClick={() => setActiveHighlightCard(activeHighlightCard === "chronic" ? null : "chronic")}
                className={`p-3.5 rounded-xl cursor-pointer transition-all ${
                  activeHighlightCard === "chronic"
                    ? "bg-blue-100 border-2 border-[#078bde] shadow-md scale-102"
                    : "bg-[#f8fbfe] border border-[#dde7ff] hover:border-[#078bde]/40"
                }`}
              >
                <span className="text-[10.5px] font-bold text-[#02307d] uppercase flex items-center gap-1 mb-1.5">
                  <LungsIcon className="size-3.5 text-[#078bde]" />
                  <span>CHRONIC CONDITIONS</span>
                </span>
                <div className="space-y-1 text-[11.5px]">
                  {patient.chronic.map((c) => (
                    <span key={c} className="block font-semibold text-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4: Family History */}
              <div className="p-3.5 bg-[#f8fbfe] border border-slate-200 rounded-xl">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1.5">
                  <DnaIcon className="size-3.5 text-[#078bde]" />
                  <span>FAMILY HISTORY</span>
                </span>
                <span className="text-[11.5px] font-semibold text-slate-700 block">
                  {patient.family}
                </span>
              </div>

              {/* Card 5: Current Medications */}
              <div className="p-3.5 bg-[#f8fbfe] border border-slate-200 rounded-xl">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase flex items-center gap-1 mb-1.5">
                  <PillIcon className="size-3.5 text-[#078bde]" />
                  <span>CURRENT MEDICATIONS</span>
                </span>
                <div className="space-y-1 text-[11.5px]">
                  {patient.medications.map((med) => (
                    <span key={med} className="block font-semibold text-slate-800">
                      {med}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 6: Emergency Contact */}
              <div
                onClick={handleTriggerCall}
                className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-xl cursor-pointer hover:bg-blue-100/60 transition-colors"
              >
                <span className="text-[10.5px] font-bold text-[#02307d] uppercase flex items-center gap-1 mb-1.5">
                  <PhoneCallIcon className="size-3.5 text-[#078bde]" />
                  <span>EMERGENCY CONTACT</span>
                </span>
                <span className="block font-bold text-slate-800 text-[12px]">
                  {patient.contactName} ({patient.contactRelation})
                </span>
                <span className="text-[11.5px] text-[#078bde] font-mono font-bold block mt-0.5">
                  {isCalling ? "Dialing..." : `${patient.contactPhone} [Tap to call]`}
                </span>
              </div>
            </div>

            {/* Privacy boundary note */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-slate-500">
              <span>NOT VISIBLE IN EMERGENCY MODE &middot; requires explicit patient consent</span>
              <div className="flex gap-3">
                <span className="hover:text-[#078bde] cursor-pointer inline-flex items-center gap-1">
                  <LockIcon className="size-3 text-slate-400" /> Lab results
                </span>
                <span className="hover:text-[#078bde] cursor-pointer inline-flex items-center gap-1">
                  <LockIcon className="size-3 text-slate-400" /> Radiology
                </span>
                <span className="hover:text-[#078bde] cursor-pointer inline-flex items-center gap-1">
                  <LockIcon className="size-3 text-slate-400" /> Full records
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
