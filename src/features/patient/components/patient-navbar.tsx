"use client";

import React from "react";
import { Header } from "@/components/common/Header";
import { MobilePatientHeader } from "./mobile-patient-header";

export interface PatientNavbarProps {
  readonly activeLanguage?: "en" | "ar";
  readonly onLanguageToggle?: () => void;
  readonly patientName?: string;
  readonly patientId?: string;
}

export function PatientNavbar(props?: PatientNavbarProps) {
  return (
    <>
      {/* Desktop Header matching Figma Node 353:10098 / 299:4931 */}
      <div className="hidden lg:block w-full">
        <Header role="patient" />
      </div>

      {/* Mobile Header matching Figma Node 364:4446 */}
      <div className="block lg:hidden w-full">
        <MobilePatientHeader patientName={props?.patientName} />
      </div>
    </>
  );
}
