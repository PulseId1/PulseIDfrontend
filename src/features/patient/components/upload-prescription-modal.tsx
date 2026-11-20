"use client";

import React, { useState } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";

interface UploadPrescriptionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSaveSuccess?: () => void;
}

export function UploadPrescriptionModal({
  isOpen,
  onClose,
  onSaveSuccess,
}: UploadPrescriptionModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const extractedData = {
    doctor: "Dr. Tarek Al-Husseini",
    clinic: "Cairo Pulmonology & Allergy Center",
    date: "14 Nov 2026",
    medications: [
      { name: "Ventolin Inhaler (100mcg)", dosage: "2 puffs", frequency: "As needed for wheezing" },
      { name: "Lisinopril 10mg", dosage: "1 tablet", frequency: "Once daily in the morning" },
    ],
    diagnosisNotes: "Controlled mild hypertension with seasonal allergen-induced asthma.",
  };

  if (!isOpen) return null;

  const handleSimulateUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsExtracted(true);
    }, 1200);
  };

  const handleSave = () => {
    onSaveSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full sm:max-w-xl bg-white rounded-t-[28px] sm:rounded-[24px] max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        {/* Mobile Drag Indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto -mt-2 mb-2 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#078BDE] shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#01091E] font-heading">
                Upload & Digitize Prescription
              </h2>
              <p className="text-xs text-[#41474F] font-sans">
                Scan or upload a prescription to automatically extract clinical details using OCR.
              </p>
            </div>
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

        {/* Upload Dropzone */}
        {!isExtracted && !isAnalyzing && (
          <div
            onClick={handleSimulateUpload}
            className="border-2 border-dashed border-slate-200 hover:border-[#078BDE] bg-[#F8FAFC] hover:bg-sky-50/30 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
          >
            <div className="size-14 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Upload className="w-6 h-6 text-[#078BDE]" />
            </div>
            <h3 className="text-sm font-bold text-[#02307D] font-heading">
              Click to select or drop prescription scan
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports JPEG, PNG, or PDF images up to 10MB
            </p>
            <span className="mt-4 px-3 py-1 bg-white rounded-full text-[11px] font-semibold text-[#078BDE] border border-slate-200 shadow-xs">
              Simulate Egyptian Doctor Prescription Scan
            </span>
          </div>
        )}

        {/* OCR Processing State */}
        {isAnalyzing && (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
            <div className="size-14 rounded-full border-4 border-[#078BDE]/20 border-t-[#078BDE] animate-spin" />
            <div>
              <h3 className="text-base font-bold text-[#02307D] font-heading">
                Extracting Prescription Telemetry...
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Applying OCR neural model calibrated on handwritten clinical scripts.
              </p>
            </div>
          </div>
        )}

        {/* OCR Extracted Results Preview */}
        {isExtracted && (
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>OCR Extraction Completed: 2 standardized medications recognized.</span>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-200 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-200 pb-2">
                <span>Physician: <strong className="text-slate-800">{extractedData.doctor}</strong></span>
                <span>Date: <strong className="text-slate-800">{extractedData.date}</strong></span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Clinic: {extractedData.clinic}
              </p>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#02307D]">
                  Standardized Medications
                </span>
                <div className="mt-1.5 flex flex-col gap-2">
                  {extractedData.medications.map((med, i) => (
                    <div key={i} className="p-2.5 bg-white rounded-lg border border-slate-100 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#02307D]">{med.name}</p>
                        <p className="text-[11px] text-slate-500">{med.frequency}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#078BDE] font-semibold text-[11px]">
                        {med.dosage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          {isExtracted ? (
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-[#078BDE] hover:bg-[#0072C6] text-white font-semibold text-sm shadow-[0px_4px_10px_rgba(7,139,222,0.3)] transition-all cursor-pointer"
            >
              Save to Medical Records
            </button>
          ) : (
            <button
              type="button"
              disabled={isAnalyzing}
              onClick={handleSimulateUpload}
              className="px-6 py-2.5 rounded-xl bg-[#078BDE] hover:bg-[#0072C6] text-white font-semibold text-sm shadow-[0px_4px_10px_rgba(7,139,222,0.3)] transition-all disabled:opacity-50 cursor-pointer"
            >
              Select Sample Scan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
