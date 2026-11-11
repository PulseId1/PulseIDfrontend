"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PatientNavbar,
  PatientProfileBanner,
  PatientFooter,
  MobilePatientHeader,
  MobileBottomNav,
} from "@/features/patient";
import { PatientService, EMPTY_PATIENT_PROFILE } from "@/lib/api/patient-service";
import { UIPatientProfile, EmergencyContactDTO } from "@/lib/api/patient-types";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

export default function PatientProfilePage() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [profile, setProfile] = useState<UIPatientProfile>(EMPTY_PATIENT_PROFILE);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContactDTO>({
    fullName: "",
    phone: "",
    relationship: "Father",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCompleted = localStorage.getItem("pulseid_patient_profile_completed") === "true";
      if (!isCompleted) {
        router.replace("/patient/profile/edit?first_time=true");
        return;
      }
    }

    if (isDemo) {
      const timer = setTimeout(() => {
        setProfile(DemoService.getPatientProfile());
      }, 0);
      return () => clearTimeout(timer);
    }

    PatientService.getPatientProfile()
      .then(setProfile)
      .catch((err) => {
        if (err?.kind === "UNAUTHENTICATED" || err?.statusCode === 401) {
          router.replace("/auth/login?role=patient&expired=true");
        }
      });
  }, [router, isDemo]);

  const handleAddEmergencyContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.fullName || !newContact.phone) return;

    if (isDemo) {
      const updated = DemoService.addEmergencyContact(newContact);
      setProfile(updated);
    } else {
      const updated = {
        ...profile,
        emergencyContacts: [
          ...(profile.emergencyContacts || []),
          { ...newContact, id: `ec-${Date.now()}` },
        ],
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }

    setIsAddContactModalOpen(false);
    setNewContact({ fullName: "", phone: "", relationship: "Father" });
  };

  const handleDeleteEmergencyContact = (id?: string) => {
    if (!id) return;

    if (isDemo) {
      const updated = DemoService.removeEmergencyContact(id);
      setProfile(updated);
    } else {
      const updated = {
        ...profile,
        emergencyContacts: (profile.emergencyContacts || []).filter((c) => c.id !== id),
      };
      setProfile(updated);
      PatientService.updatePatientProfile(updated);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF] pb-16 lg:pb-0">
      {/* 1. Header Navigation */}
      <div className="hidden lg:block sticky top-0 z-50">
        <PatientNavbar />
      </div>

      <MobilePatientHeader />

      {/* 2. Main Profile Content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 flex flex-col gap-6 lg:gap-8">
        {/* Page Introduction matching Figma Node 299:6581 */}
        <div className="flex flex-col gap-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
            Patient Information
          </h1>
          <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans">
            Manage your personal details and emergency contact information securely.
          </p>
        </div>

        {/* Hero Identity Banner matching Figma Node 299:6586 */}
        <PatientProfileBanner showVerifiedBadge={true} profile={profile} />

        {/* 2-Column Grid: Personal Information & Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Personal Information Card matching Figma Node 299:6600 */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#F0F4FA]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-[18px] font-bold text-[#02307D] font-heading">
                    Personal Information
                  </h2>
                </div>

                <Link
                  href="/patient/profile/edit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0E5F5] text-[13px] font-semibold text-[#0080DF] hover:bg-sky-50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <span>Edit</span>
                </Link>
              </div>

              {/* Data Fields 2x2 grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-6 pt-5">
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Full Name</span>
                  <p className="text-[15px] font-bold text-[#01091E]">
                    {profile.nameEn || "—"}
                  </p>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Date of Birth</span>
                  <p className="text-[15px] font-bold text-[#01091E]">
                    {profile.birthDate || "Not recorded"}
                  </p>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Gender</span>
                  <p className="text-[15px] font-bold text-[#01091E]">
                    {profile.genderTypeId === 1 ? "Male" : profile.genderTypeId === 2 ? "Female" : "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">National ID</span>
                  <p className="text-[15px] font-bold font-mono text-[#01091E]">
                    {profile.nationalId || "—"}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Address</span>
                  <p className="text-[14px] font-medium text-[#41474F] leading-relaxed">
                    {profile.address || "Not recorded"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card matching Figma Node 299:6625 */}
          <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#F0F4FA]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <h2 className="text-[18px] font-bold text-[#02307D] font-heading">
                    Contact Information
                  </h2>
                </div>

                <Link
                  href="/patient/profile/edit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0E5F5] text-[13px] font-semibold text-[#0080DF] hover:bg-sky-50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <span>Edit</span>
                </Link>
              </div>

              {/* Data Fields */}
              <div className="flex flex-col gap-5 pt-5">
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Phone Number</span>
                  <p className="text-[15px] font-bold font-mono text-[#01091E]">
                    {profile.phone || "—"}
                  </p>
                </div>
                <div>
                  <span className="text-[12px] font-medium text-slate-400 block mb-1">Email Address</span>
                  <p className="text-[15px] font-medium text-[#01091E]">
                    {profile.email || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy footnote */}
            <div className="pt-6 mt-6 border-t border-[#F0F4FA] flex items-center gap-2 text-[12px] text-slate-400">
              <svg className="w-4 h-4 text-[#0080DF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>Your contact details are kept private and secure.</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section matching Figma Node 299:6644 */}
        <div className="bg-white rounded-[20px] p-6 sm:p-7 border border-[#E9EFFD] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0F4FA]">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-[#0080DF]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h2 className="text-[18px] font-bold text-[#02307D] font-heading">
                  Emergency Contact
                </h2>
              </div>
              <p className="text-[13px] text-[#41474F] mt-1 pl-12">
                Add someone we can contact on your behalf in case of an emergency.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080DF] hover:bg-[#0070C5] text-white text-[13px] font-semibold transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
            >
              <span>+</span>
              <span>Add Emergency Contact</span>
            </button>
          </div>

          {/* Contact Cards List */}
          <div className="flex flex-col gap-3">
            {(profile.emergencyContacts || []).map((contact) => (
              <div
                key={contact.id}
                className="bg-[#F8FAFC] rounded-xl p-4 sm:p-5 border border-[#E1EAF5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Contact Full Name</span>
                    <p className="text-[14px] font-bold text-[#01091E]">{contact.fullName}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Phone Number</span>
                    <p className="text-[14px] font-mono text-[#01091E]">{contact.phone}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Relationship</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0080DF] text-[12px] font-semibold">
                      {contact.relationship}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteEmergencyContact(contact.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete contact"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-slate-400">
            Relationship options when adding a contact: Father • Mother • Brother • Sister • Spouse • Other
          </p>
        </div>
      </main>

      {/* Add Emergency Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#02307D]">Add Emergency Contact</h3>
              <button
                type="button"
                onClick={() => setIsAddContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEmergencyContact} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahmoud Hassan"
                  value={newContact.fullName}
                  onChange={(e) => setNewContact({ ...newContact, fullName: e.target.value })}
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
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0080DF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Relationship</label>
                <select
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
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
                  onClick={() => setIsAddContactModalOpen(false)}
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
      )}

      {/* 3. Footer */}
      <PatientFooter />
      <MobileBottomNav />
    </div>
  );
}
