"use client";

import React, { useState } from "react";

export interface PrescriptionFormData {
  doctor: string;
  date: string;
  medications: Array<{
    id: number;
    name: string;
    dosage: string;
    quantity: string;
    frequency: string;
    duration: string;
    instructions: string;
    role: string;
  }>;
}

export interface CreateNewPrescriptionFormProps {
  doctorName?: string;
  defaultDate?: string;
  onSave?: (data: PrescriptionFormData) => void;
  onCancel?: () => void;
  onClear?: () => void;
}

export function CreateNewPrescriptionForm({
  doctorName = "Dr. Sherif Mansour (Current signed-in doctor)",
  defaultDate = "12 Nov 2026",
  onSave,
  onCancel,
  onClear,
}: CreateNewPrescriptionFormProps) {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "",
      dosage: "",
      quantity: "",
      frequency: "",
      duration: "",
      instructions: "",
      role: "Primary therapeutic agent",
    },
  ]);

  const [date, setDate] = useState(defaultDate);

  const handleAddMedication = () => {
    setMedications((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "",
        dosage: "",
        quantity: "",
        frequency: "",
        duration: "",
        instructions: "",
        role: `Adjunct agent ${prev.length + 1}`,
      },
    ]);
  };

  const handleClear = () => {
    setMedications([
      {
        id: 1,
        name: "",
        dosage: "",
        quantity: "",
        frequency: "",
        duration: "",
        instructions: "",
        role: "Primary therapeutic agent",
      },
    ]);
    if (onClear) onClear();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({ doctor: doctorName, date, medications });
    }
  };

  return (
    <div
      className="bg-white border border-[#e2e8f0] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[24px] items-start p-[25px] rounded-[12px] w-full"
      data-node-id="652:2498"
      data-name="Section - CreateNewPrescriptionForm"
    >
      {/* Horizontal Border & Header (Figma 652:2499) */}
      <div
        className="border-b border-[#f1f5f9] pb-[17px] w-full"
        data-node-id="652:2499"
        data-name="HorizontalBorder"
      >
        <div
          className="font-bold text-[#0f172a] text-[18px] leading-[28px] w-full"
          data-node-id="652:2501"
          data-name="Heading 3"
        >
          Create new prescription
        </div>
        <p
          className="font-normal text-[#64748b] text-[12px] leading-[16px] w-full mt-1"
          data-node-id="652:2503"
          data-name="Container"
        >
          Record new clinical prescription, specify medications, and authorize pharmacy fulfillment.
        </p>
      </div>

      {/* Form Content (Figma 652:2504) */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] items-start w-full"
        data-node-id="652:2504"
        data-name="Form"
      >
        {/* Row 1: Doctor & Date (Figma 652:2505) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-start w-full"
          data-node-id="652:2505"
          data-name="Row 1: Doctor & Date"
        >
          {/* Prescribing doctor */}
          <div
            className="flex flex-col gap-[4px] items-start w-full"
            data-node-id="652:2506"
          >
            <label
              className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
              data-node-id="652:2508"
            >
              Prescribing doctor *
            </label>
            <div
              className="bg-[#f8fafc] border border-[#cbd5e1] px-[13px] py-[9px] rounded-[8px] w-full text-[#475569] text-[14px] leading-[20px]"
              data-node-id="652:2509"
              data-name="Input"
            >
              {doctorName}
            </div>
          </div>

          {/* Prescription date */}
          <div
            className="flex flex-col gap-[4px] items-start w-full"
            data-node-id="652:2512"
          >
            <label
              className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
              data-node-id="652:2514"
            >
              Prescription date *
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white border border-[#cbd5e1] px-[13px] py-[9px] rounded-[8px] w-full text-[#1e293b] text-[14px] leading-[20px] focus:outline-none focus:border-[#078bde]"
              data-node-id="652:2515"
              data-name="Input"
            />
          </div>
        </div>

        {/* Medication Entry Blocks */}
        {medications.map((med, index) => (
          <div
            key={med.id}
            className="bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] p-[17px] rounded-[12px] flex flex-col gap-[16px] items-start w-full"
            data-node-id={index === 0 ? "652:2518" : undefined}
            data-name={`Medication Entry Block ${index + 1}`}
          >
            {/* Medication Header */}
            <div
              className="border-b border-[#e2e8f0] pb-[9px] flex items-center justify-between w-full"
              data-node-id="652:2519"
              data-name="HorizontalBorder"
            >
              <div className="flex gap-[6px] items-center">
                <div className="size-[14px] relative shrink-0">
                  <img
                    alt=""
                    className="block size-full"
                    src="/assets/pharmacist/6263ea5b87e87c3ec6d968708a3b0a2bee55d58c.svg"
                  />
                </div>
                <span
                  className="font-bold text-[#1e293b] text-[12px] tracking-[0.6px] uppercase leading-[16px]"
                  data-node-id="652:2523"
                >
                  MEDICATION {index + 1}
                </span>
              </div>
              <span
                className="font-normal text-[#94a3b8] text-[11px] leading-[16.5px]"
                data-node-id="652:2525"
              >
                {med.role}
              </span>
            </div>

            {/* Row A: Name & Dosage (Figma 652:2526) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] items-start w-full"
              data-node-id="652:2526"
              data-name="Row A: Name & Dosage"
            >
              <div
                className="col-span-1 sm:col-span-2 flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2527"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2529"
                >
                  Medication name *
                </label>
                <input
                  type="text"
                  placeholder="Search medication name or active substance e.g. Lisinopril"
                  value={med.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, name: val } : m))
                    );
                  }}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[10px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde]"
                  data-node-id="652:2530"
                  data-name="Input"
                />
              </div>

              <div
                className="col-span-1 flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2533"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2535"
                >
                  Dosage *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10 mg or 500 mg"
                  value={med.dosage}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, dosage: val } : m))
                    );
                  }}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[10px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde]"
                  data-node-id="652:2536"
                  data-name="Input"
                />
              </div>
            </div>

            {/* Row B: Quantity & Frequency (Figma 652:2539) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-start w-full"
              data-node-id="652:2539"
              data-name="Row B: Quantity & Frequency"
            >
              <div
                className="flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2540"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2542"
                >
                  Quantity *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30 tablets"
                  value={med.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, quantity: val } : m))
                    );
                  }}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[10px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde]"
                  data-node-id="652:2543"
                  data-name="Input"
                />
              </div>

              <div
                className="flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2546"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2548"
                >
                  Frequency *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Once daily with meals"
                  value={med.frequency}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, frequency: val } : m))
                    );
                  }}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[10px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde]"
                  data-node-id="652:2549"
                  data-name="Input"
                />
              </div>
            </div>

            {/* Row C: Duration & Usage instructions (Figma 652:2552) */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] items-start w-full"
              data-node-id="652:2552"
              data-name="Row C: Duration & Usage instructions"
            >
              <div
                className="col-span-1 flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2553"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2555"
                >
                  Duration *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 30 days or Ongoing"
                  value={med.duration}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, duration: val } : m))
                    );
                  }}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[10px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde]"
                  data-node-id="652:2556"
                  data-name="Input"
                />
              </div>

              <div
                className="col-span-1 sm:col-span-2 flex flex-col gap-[4px] items-start w-full"
                data-node-id="652:2559"
              >
                <label
                  className="font-semibold text-[#334155] text-[12px] leading-[16px] w-full"
                  data-node-id="652:2561"
                >
                  Usage / administration instructions *
                </label>
                <textarea
                  placeholder="Enter specific instructions, precautions, food interactions..."
                  value={med.instructions}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMedications((prev) =>
                      prev.map((m) => (m.id === med.id ? { ...m, instructions: val } : m))
                    );
                  }}
                  rows={2}
                  className="bg-white border border-[#cbd5e1] rounded-[8px] px-[13px] py-[9px] w-full text-[14px] text-[#1e293b] placeholder-[#94a3b8] focus:outline-none focus:border-[#078bde] min-h-[44px]"
                  data-node-id="652:2562"
                  data-name="Textarea"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Button - Add another medication button (Figma 652:2565) */}
        <button
          type="button"
          onClick={handleAddMedication}
          className="border-2 border-[#cbd5e1] border-dashed rounded-[8px] px-[18px] py-[12px] flex items-center justify-center gap-[8px] w-full hover:bg-slate-50 cursor-pointer transition-colors"
          data-node-id="652:2565"
          data-name="Button - Add another medication button"
        >
          <div
            className="size-[14px] relative shrink-0"
            data-node-id="652:2566"
            data-name="Container"
          >
            <img
              alt=""
              className="block size-full"
              src="/assets/pharmacist/fcc923c5d3e418f34b3a7e8e69012de71b8073fd.svg"
            />
          </div>
          <span
            className="font-semibold text-[#475569] text-[14px] leading-[20px]"
            data-node-id="652:2568"
          >
            Add Another Medication
          </span>
        </button>

        {/* Helper Note (Figma 652:2569) */}
        <div
          className="font-normal text-[#64748b] text-[11px] leading-[16.5px] w-full"
          data-node-id="652:2570"
          data-name="Helper Note"
        >
          * Required fields • Clinical authorization &amp; patient consent verified before dispensing.
        </div>

        {/* Submission actions (Figma 652:2571) */}
        <div
          className="flex items-center gap-[12px] w-full pt-1"
          data-node-id="652:2571"
          data-name="Submission actions"
        >
          <button
            type="submit"
            className="bg-[#078bde] border border-[#078bde] hover:bg-[#0070c5] text-white font-bold text-[12px] leading-[1.45] px-[14px] py-[8px] rounded-[4px] cursor-pointer shadow-xs transition-colors"
            data-node-id="652:2572"
            data-name="Save diagnosis"
          >
            Save diagnosis
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-white border border-[#dde7ff] hover:bg-slate-50 text-[#01091e] font-bold text-[12px] leading-[1.45] px-[14px] py-[8px] rounded-[4px] cursor-pointer transition-colors"
            data-node-id="652:2574"
            data-name="Clear form"
          >
            Clear form
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="ml-auto text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Bottom Disclaimer inside card (Figma 652:2576) */}
        <div
          className="border-t border-[#f1f5f9] pt-[13px] w-full"
          data-node-id="652:2576"
          data-name="Bottom Disclaimer inside card"
        >
          <p
            className="font-normal text-[#64748b] text-[12px] leading-[16px] w-full"
            data-node-id="652:2577"
          >
            Newly created prescriptions will be assigned a unique Rx ID and marked Pending until dispensed by an authorized pharmacy.
          </p>
        </div>
      </form>
    </div>
  );
}
export default CreateNewPrescriptionForm;
