"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PatientNavbar,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { PatientService, EMPTY_PATIENT_PROFILE } from "@/lib/api/patient-service";
import { UserAddUpdateDTO, UIPatientProfile, BloodTypeDTO } from "@/lib/api/patient-types";

const emptySubscribe = () => () => {};

function PatientHealthInfoEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<UIPatientProfile>(EMPTY_PATIENT_PROFILE);
  const [bloodTypes, setBloodTypes] = useState<BloodTypeDTO[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const isFirstTimeQuery = searchParams.get("first_time") === "true";
  const isCompletedStore = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem("pulseid_patient_profile_completed") === "true",
    () => true
  );
  const isFirstTime = (isFirstTimeQuery || !isCompletedStore) && !profileSaved;

  // Individual tag input fields
  const [chronicInput, setChronicInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [medicationInput, setMedicationInput] = useState("");
  const [medicalHistoryText, setMedicalHistoryText] = useState("");

  useEffect(() => {
    PatientService.getPatientProfile()
      .then((data) => {
        setProfile(data);
        if (data.pastMedicalHistory && data.pastMedicalHistory.length > 0) {
          setMedicalHistoryText(
            data.pastMedicalHistory.map((h) => h.name || h.conditionDescription).filter(Boolean).join("\n")
          );
        }
      })
      .catch((err) => {
        if (err?.kind === "UNAUTHENTICATED" || err?.statusCode === 401) {
          router.replace("/auth/login?role=patient&expired=true");
        }
      });
    PatientService.getBloodTypes().then(setBloodTypes);
  }, [router]);

  const handleAddChronic = () => {
    if (!chronicInput.trim()) return;
    const current = profile.chronicDiseases || [];
    setProfile({
      ...profile,
      chronicDiseases: [
        ...current,
        { id: Date.now(), name: chronicInput.trim(), status: "Active Follow-up", date: "Recent" },
      ],
    });
    setChronicInput("");
  };

  const handleRemoveChronic = (id?: number) => {
    setProfile({
      ...profile,
      chronicDiseases: (profile.chronicDiseases || []).filter((c) => c.id !== id),
    });
  };

  const handleAddAllergy = () => {
    if (!allergyInput.trim()) return;
    const current = profile.allergyMenu || [];
    setProfile({
      ...profile,
      allergyMenu: [
        ...current,
        { id: Date.now(), name: allergyInput.trim(), severity: "Moderate", date: "Recent" },
      ],
    });
    setAllergyInput("");
  };

  const handleRemoveAllergy = (id?: number) => {
    setProfile({
      ...profile,
      allergyMenu: (profile.allergyMenu || []).filter((a) => a.id !== id),
    });
  };

  const handleAddMedication = () => {
    if (!medicationInput.trim()) return;
    const current = profile.currentMedications || [];
    setProfile({
      ...profile,
      currentMedications: [
        ...current,
        { id: Date.now(), name: medicationInput.trim(), status: "Active", date: "Recent" },
      ],
    });
    setMedicationInput("");
  };

  const handleRemoveMedication = (id?: number) => {
    setProfile({
      ...profile,
      currentMedications: (profile.currentMedications || []).filter((m) => m.id !== id),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveSuccess(false);

    // Prepare updated payload
    const updatedPayload: UserAddUpdateDTO = {
      ...profile,
      pastMedicalHistory: medicalHistoryText
        .split("\n")
        .filter((line) => line.trim())
        .map((line, idx) => ({
          id: idx + 1,
          name: line.trim(),
          date: "Documented history",
        })),
    };

    await PatientService.updatePatientProfile(updatedPayload);
    if (typeof window !== "undefined") {
      localStorage.setItem("pulseid_patient_profile_completed", "true");
    }
    setIsSubmitting(false);
    setSaveSuccess(true);
    setProfileSaved(true);

    setTimeout(() => {
      router.push("/patient/profile");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      <MobilePatientHeader />

      <main className="flex-1 w-full max-w-[974px] mx-auto px-4 sm:px-6 py-6 lg:py-14 flex flex-col gap-6">
        {/* First time profile completion banner */}
        {isFirstTime && (
          <div className="p-5 rounded-2xl bg-[#EBF5FF] border border-[#078BDE]/40 text-[#02307D] shadow-sm flex items-start gap-3.5 animate-in fade-in">
            <span className="text-2xl mt-0.5">🔔</span>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-[16px] text-[#02307D]">
                Complete Your Profile to Unlock Your Account
              </h3>
              <p className="mt-1 font-sans text-[13px] text-[#41474F] leading-relaxed">
                Welcome to PulseID! Before viewing or sharing your health records and accessing the full portal features, please review and save your clinical information below.
              </p>
            </div>
          </div>
        )}

        {/* Page Introduction matching Figma Node 299:5299 */}
        <div className="flex flex-col gap-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#01091E] tracking-tight font-heading">
            Patient Health Information
          </h1>
          <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans">
            Update and manage your medical details easily.
          </p>
        </div>

        {/* Save confirmation toast */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-3 animate-in fade-in">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Your health information has been updated and synchronized successfully!</span>
          </div>
        )}

        {/* Main Form Container matching Figma Node 299:5306 */}
        <form
          onSubmit={handleSave}
          className="bg-white rounded-[24px] p-6 sm:p-10 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-7"
          data-node-id="299:5306"
        >
          {/* Row 1: Date of Birth & Blood Type matching Node 299:5309 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#01091E]">Date of Birth</label>
              <div className="relative">
                <input
                  type="date"
                  value={profile.birthDate || ""}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] text-[#01091E] focus:outline-none focus:ring-2 focus:ring-[#0080DF] focus:border-transparent font-sans"
                />
              </div>
            </div>

            {/* Blood Type */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-semibold text-[#01091E]">Blood Type</label>
                {bloodTypes.length === 0 && (
                  <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Backend reference unseeded
                  </span>
                )}
              </div>
              <select
                value={profile.bloodTypeId || ""}
                disabled={bloodTypes.length === 0}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : undefined;
                  setProfile({ ...profile, bloodTypeId: val });
                }}
                className="w-full px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] text-[#01091E] focus:outline-none focus:ring-2 focus:ring-[#0080DF] focus:border-transparent bg-white font-sans cursor-pointer disabled:bg-slate-50 disabled:text-slate-400"
              >
                {bloodTypes.length === 0 ? (
                  <option value="">Blood types unavailable from server</option>
                ) : (
                  <>
                    <option value="">Select blood type</option>
                    {bloodTypes.map((bt) => (
                      <option key={bt.id} value={bt.id}>
                        {bt.nameEn || `Blood Group #${bt.id}`}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Row 2: Chronic Conditions matching Node 299:5321 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-semibold text-[#01091E]">Chronic Conditions</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter a condition"
                value={chronicInput}
                onChange={(e) => setChronicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddChronic();
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0080DF] font-sans"
              />
              <button
                type="button"
                onClick={handleAddChronic}
                className="px-6 py-3 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#0080DF] text-[14px] font-bold transition-colors cursor-pointer shrink-0"
              >
                +Add
              </button>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(profile.chronicDiseases || []).map((c) => (
                <span
                  key={c.id || c.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EBF1F9] text-[#02307D] text-[13px] font-medium"
                >
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChronic(c.id)}
                    className="text-slate-400 hover:text-red-500 font-bold transition-colors cursor-pointer"
                    aria-label={`Remove ${c.name}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 3: Allergies matching Node 299:5337 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-semibold text-[#01091E]">Allergies</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter an allergy"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAllergy();
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0080DF] font-sans"
              />
              <button
                type="button"
                onClick={handleAddAllergy}
                className="px-6 py-3 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#0080DF] text-[14px] font-bold transition-colors cursor-pointer shrink-0"
              >
                +Add
              </button>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(profile.allergyMenu || []).map((a) => (
                <span
                  key={a.id || a.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EBF1F9] text-[#02307D] text-[13px] font-medium"
                >
                  <span>{a.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAllergy(a.id)}
                    className="text-slate-400 hover:text-red-500 font-bold transition-colors cursor-pointer"
                    aria-label={`Remove ${a.name}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 4: Current Medications matching Node 299:5353 */}
          <div className="flex flex-col gap-2.5">
            <label className="text-[14px] font-semibold text-[#01091E]">Current Medications</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter a medication"
                value={medicationInput}
                onChange={(e) => setMedicationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddMedication();
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0080DF] font-sans"
              />
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-6 py-3 rounded-xl bg-[#EAF2FF] hover:bg-[#D8E7FF] text-[#0080DF] text-[14px] font-bold transition-colors cursor-pointer shrink-0"
              >
                +Add
              </button>
            </div>

            {/* Tags list */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(profile.currentMedications || []).map((m) => (
                <span
                  key={m.id || m.name}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#EBF1F9] text-[#02307D] text-[13px] font-medium"
                >
                  <span>{m.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(m.id)}
                    className="text-slate-400 hover:text-red-500 font-bold transition-colors cursor-pointer"
                    aria-label={`Remove ${m.name}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Row 5: Previous Medical History matching Node 299:5369 */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#01091E]">Previous Medical History</label>
            <textarea
              rows={4}
              placeholder="Enter previous medical conditions or relevant history."
              value={medicalHistoryText}
              onChange={(e) => setMedicalHistoryText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#DCE4F0] text-[14px] text-[#01091E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0080DF] font-sans leading-relaxed resize-y"
            />
          </div>

          {/* Action Buttons matching Node 299:5373 */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#F0F4FA]">
            <button
              type="button"
              onClick={() => router.push("/patient/profile")}
              className="px-6 py-2.5 rounded-xl border border-[#0080DF] text-[#0080DF] text-[14px] font-semibold hover:bg-sky-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[14px] font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-60"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{isSubmitting ? "Saving..." : "Save Information"}</span>
            </button>
          </div>
        </form>
      </main>

      <PatientFooter />
      <MobileBottomNav />
    </div>
  );
}

export default function PatientHealthInfoEditPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FBFEFF]" />}>
      <PatientHealthInfoEditContent />
    </React.Suspense>
  );
}
