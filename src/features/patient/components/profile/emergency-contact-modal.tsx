"use client";

import React from "react";
import { EmergencyContactDTO } from "@/lib/api/patient-types";

interface AddEmergencyContactModalProps {
  readonly isOpen: boolean;
  readonly newContact: EmergencyContactDTO;
  readonly onChange: (contact: EmergencyContactDTO) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onClose: () => void;
}

export function AddEmergencyContactModal({
  isOpen,
  newContact,
  onChange,
  onSubmit,
  onClose,
}: AddEmergencyContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#02307D]">Add Emergency Contact</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahmoud Hassan"
              value={newContact.fullName}
              onChange={(e) => onChange({ ...newContact, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="e.g. +20 122 345 6789"
              value={newContact.phone}
              onChange={(e) => onChange({ ...newContact, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Relationship</label>
            <select
              value={newContact.relationship}
              onChange={(e) => onChange({ ...newContact, relationship: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF] bg-white"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Other">Other</option>
            </select>
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
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface EditEmergencyContactModalProps {
  readonly editingContact: EmergencyContactDTO | null;
  readonly onChange: (contact: EmergencyContactDTO) => void;
  readonly onSubmit: (e: React.FormEvent) => void;
  readonly onClose: () => void;
}

export function EditEmergencyContactModal({
  editingContact,
  onChange,
  onSubmit,
  onClose,
}: EditEmergencyContactModalProps) {
  if (!editingContact) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-lg font-bold text-[#02307D]">Edit Emergency Contact</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahmoud Hassan"
              value={editingContact.fullName}
              onChange={(e) => onChange({ ...editingContact, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="e.g. +20 122 345 6789"
              value={editingContact.phone}
              onChange={(e) => onChange({ ...editingContact, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Relationship</label>
            <select
              value={editingContact.relationship}
              onChange={(e) => onChange({ ...editingContact, relationship: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF] bg-white"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Spouse">Spouse</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Other">Other</option>
            </select>
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
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
