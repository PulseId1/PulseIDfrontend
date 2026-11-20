"use client";

import React from "react";
import { HealthSubcategory } from "../../hooks/use-medical-info";

interface AddMedicalItemModalProps {
  readonly activeModal: HealthSubcategory | null;
  readonly newItemName: string;
  readonly newItemDetail: string;
  readonly onNameChange: (val: string) => void;
  readonly onDetailChange: (val: string) => void;
  readonly onClose: () => void;
  readonly onSubmit: (e: React.FormEvent) => void;
}

export function AddMedicalItemModal({
  activeModal,
  newItemName,
  newItemDetail,
  onNameChange,
  onDetailChange,
  onClose,
  onSubmit,
}: AddMedicalItemModalProps) {
  if (!activeModal) return null;

  const title =
    activeModal === "chronic"
      ? "Add Chronic Condition"
      : activeModal === "allergies"
      ? "Add Allergy"
      : activeModal === "medications"
      ? "Add Medication"
      : "Add Surgical Record";

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#01091E] font-heading">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Asthma, Lisinopril..."
              value={newItemName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Details / Notes</label>
            <input
              type="text"
              placeholder="Dosage, reaction, facility notes..."
              value={newItemDetail}
              onChange={(e) => onDetailChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#0080DF] hover:bg-[#0070C5] shadow-sm cursor-pointer"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
