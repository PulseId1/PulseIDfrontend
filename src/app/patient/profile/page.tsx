"use client";

import React from "react";
import {
  PatientNavbar,
  PatientFooter,
  PatientInfoCard,
  mapProfileToPatientIdentity,
} from "@/features/patient";
import { usePatientProfile } from "@/features/patient/hooks/use-patient-profile";
import {
  PersonalInfoCard,
  ContactInfoCard,
  EmergencyContactSection,
  AddEmergencyContactModal,
  EditEmergencyContactModal,
} from "@/features/patient/components/profile";

export default function PatientProfilePage() {
  const {
    isDemo,
    profile,
    isAddContactModalOpen,
    setIsAddContactModalOpen,
    editingContact,
    setEditingContact,
    newContact,
    setNewContact,
    handleAddEmergencyContact,
    handleUpdateEmergencyContact,
    handleDeleteEmergencyContact,
  } = usePatientProfile();

  const patientIdentity = mapProfileToPatientIdentity(profile, isDemo);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#0080DF]/30 selection:text-[#0080DF]">
      {/* 1. Header Navigation matching Figma Node 353:10098 (Desktop) & 364:4446 (Mobile) */}
      <PatientNavbar />

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

        {/* Hero Identity Banner matching Figma Node 299:6586 / 299:6584 */}
        <PatientInfoCard
          patient={patientIdentity}
          variant="profile"
          isDemoPreview={isDemo}
          nodeId="299:6584"
        />

        {/* 2-Column Grid: Personal Information & Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <PersonalInfoCard profile={profile} />
          <ContactInfoCard profile={profile} />
        </div>

        {/* Emergency Contact Section matching Exact Figma Node 299:6649 */}
        <EmergencyContactSection
          emergencyContacts={profile.emergencyContacts}
          onAddContact={() => setIsAddContactModalOpen(true)}
          onEditContact={(contact) => setEditingContact(contact)}
          onDeleteContact={handleDeleteEmergencyContact}
        />
      </main>

      {/* Add Emergency Contact Modal */}
      <AddEmergencyContactModal
        isOpen={isAddContactModalOpen}
        newContact={newContact}
        onChange={setNewContact}
        onSubmit={handleAddEmergencyContact}
        onClose={() => setIsAddContactModalOpen(false)}
      />

      {/* Edit Emergency Contact Modal */}
      <EditEmergencyContactModal
        editingContact={editingContact}
        onChange={setEditingContact}
        onSubmit={handleUpdateEmergencyContact}
        onClose={() => setEditingContact(null)}
      />

      {/* 3. Footer */}
      <PatientFooter />
    </div>
  );
}
