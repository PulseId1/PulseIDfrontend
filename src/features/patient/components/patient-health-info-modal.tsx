"use client";

import React, { useState } from "react";
import { X, ChevronDown, Plus } from "lucide-react";
import { UIPatientProfile } from "@/lib/api/patient-types";

interface PatientHealthInfoModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (updated: Partial<UIPatientProfile>) => void;
  readonly initialData?: {
    dateOfBirth?: string;
    bloodType?: string;
    chronicConditions?: string[];
    allergies?: string[];
    medications?: string[];
    medicalHistory?: string;
  };
}

export function PatientHealthInfoModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: PatientHealthInfoModalProps) {
  const [dob, setDob] = useState(initialData?.dateOfBirth || "1988-09-14");
  const [bloodType, setBloodType] = useState(initialData?.bloodType || "O+ (Positive)");
  
  const [chronicConditions, setChronicConditions] = useState<string[]>(
    initialData?.chronicConditions || ["Hypertension"]
  );
  const [conditionInput, setConditionInput] = useState("");

  const [allergies, setAllergies] = useState<string[]>(
    initialData?.allergies || ["Penicillin"]
  );
  const [allergyInput, setAllergyInput] = useState("");

  const [medications, setMedications] = useState<string[]>(
    initialData?.medications || ["Lisinopril 10mg"]
  );
  const [medicationInput, setMedicationInput] = useState("");

  const [medicalHistory, setMedicalHistory] = useState(
    initialData?.medicalHistory || "Pneumonia (2020), Concussion (2018)"
  );

  const [validationError, setValidationError] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"incomplete" | "submitted">("incomplete");

  if (!isOpen) return null;

  const handleAddCondition = (e: React.FormEvent) => {
    e.preventDefault();
    if (conditionInput.trim() && !chronicConditions.includes(conditionInput.trim())) {
      setChronicConditions([...chronicConditions, conditionInput.trim()]);
      setConditionInput("");
    }
  };

  const handleRemoveCondition = (item: string) => {
    setChronicConditions(chronicConditions.filter((c) => c !== item));
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (allergyInput.trim() && !allergies.includes(allergyInput.trim())) {
      setAllergies([...allergies, allergyInput.trim()]);
      setAllergyInput("");
    }
  };

  const handleRemoveAllergy = (item: string) => {
    setAllergies(allergies.filter((a) => a !== item));
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (medicationInput.trim() && !medications.includes(medicationInput.trim())) {
      setMedications([...medications, medicationInput.trim()]);
      setMedicationInput("");
    }
  };

  const handleRemoveMedication = (item: string) => {
    setMedications(medications.filter((m) => m !== item));
  };

  const handleSave = () => {
    // 1. Ordinary field validation
    if (!dob) {
      setValidationError("Date of birth is required.");
      return;
    }
    const birthDateObj = new Date(dob);
    const today = new Date();
    if (isNaN(birthDateObj.getTime()) || birthDateObj >= today) {
      setValidationError("Please select a valid date of birth in the past.");
      return;
    }
    if (!bloodType) {
      setValidationError("Please select your blood type.");
      return;
    }

    setValidationError(null);
    setSubmissionStatus("submitted");

    // Mark patient profile as completed in local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("pulseid_patient_profile_completed", "true");
    }

    onSave({
      birthDate: dob,
      chronicDiseases: chronicConditions.map((name, id) => ({
        id: id + 1,
        name: name,
        status: "Active Follow-up",
        date: "2025",
      })),
      allergyMenu: allergies.map((name, id) => ({
        id: id + 1,
        name: name,
        severity: "Moderate" as const,
        date: "2025",
      })),
      currentMedications: medications.map((name, id) => ({
        id: id + 1,
        name: name,
        dosage: "Standard",
        frequency: "Daily",
        date: "2025",
      })),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-2xl bg-white rounded-t-[28px] sm:rounded-[24px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        data-node-id="299:5297"
      >
        {/* Mobile Drag Indicator matching Figma 365:1747 */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-2 mb-2 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#01091E] font-heading">
                Patient Health Information
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                submissionStatus === "submitted"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-slate-100 text-slate-700"
              }`}>
                {submissionStatus === "submitted" ? "Submitted" : "Pending Submission"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#41474F] mt-1 font-sans">
              Update and manage your medical details easily.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <span className="font-bold text-red-600">✕</span>
            <span>{validationError}</span>
          </div>
        )}

        {/* AI Clinical Validation Status Banner */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-[11px] sm:text-xs flex items-start gap-2.5">
          <span className="font-bold text-amber-600 shrink-0 mt-0.5">ℹ</span>
          <div className="space-y-0.5">
            <p className="font-semibold text-amber-950">
              AI Clinical Validation: Pending (Backend AI Validation Service Contract Required)
            </p>
            <p className="text-amber-800/90 leading-relaxed">
              Standard demographic and clinical fields are validated locally before profile synchronization. Automated AI contraindication extraction and verification are classified as <code className="font-mono bg-amber-100/80 px-1 rounded text-[10px]">BACKEND_UNSUPPORTED</code> in API v1 and await a backend service contract.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex flex-col gap-5 text-left">
          {/* Row 1: Date of Birth & Blood Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
                Blood Type
              </label>
              <div className="relative">
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
                >
                  <option value="O+ (Positive)">O+ (Positive)</option>
                  <option value="O- (Negative)">O- (Negative)</option>
                  <option value="A+ (Positive)">A+ (Positive)</option>
                  <option value="A- (Negative)">A- (Negative)</option>
                  <option value="B+ (Positive)">B+ (Positive)</option>
                  <option value="B- (Negative)">B- (Negative)</option>
                  <option value="AB+ (Positive)">AB+ (Positive)</option>
                  <option value="AB- (Negative)">AB- (Negative)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Section: Chronic Conditions */}
          <div>
            <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
              Chronic Conditions
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                placeholder="Enter a condition"
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCondition(e);
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
              />
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-4 py-2.5 bg-[#EAEDF6] hover:bg-[#DCE3F3] text-[#02307D] font-bold text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {chronicConditions.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-[#00609B] text-xs font-semibold"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(item)}
                    className="hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section: Allergies */}
          <div>
            <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
              Allergies
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                placeholder="Enter an allergy"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAllergy(e);
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-4 py-2.5 bg-[#EAEDF6] hover:bg-[#DCE3F3] text-[#02307D] font-bold text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allergies.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-[#BA1A1A] text-xs font-semibold"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(item)}
                    className="hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section: Current Medications */}
          <div>
            <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
              Current Medications
            </label>
            <div className="flex gap-2 mb-2.5">
              <input
                type="text"
                placeholder="Enter a medication"
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddMedication(e);
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-4 py-2.5 bg-[#EAEDF6] hover:bg-[#DCE3F3] text-[#02307D] font-bold text-sm rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {medications.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(item)}
                    className="hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section: Previous Medical History */}
          <div>
            <label className="block text-xs font-semibold text-[#02307D] uppercase tracking-wider mb-2 font-sans">
              Previous Medical History
            </label>
            <textarea
              rows={3}
              placeholder="Enter previous medical conditions or relevant history."
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F8FAFC] text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#078BDE]/30 focus:border-[#078BDE]"
            />
          </div>
        </div>

        {/* Modal Footer Actions matching Figma 299:5389 & 299:5394 */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#078BDE] hover:bg-[#0072C6] text-white font-semibold text-sm shadow-[0px_4px_10px_rgba(7,139,222,0.3)] transition-all cursor-pointer"
          >
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
}
