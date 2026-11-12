"use client";

import React from "react";
import { Header } from "@/components/common/Header";

export interface PatientNavbarProps {
  readonly activeLanguage?: "en" | "ar";
  readonly onLanguageToggle?: () => void;
  readonly patientName?: string;
  readonly patientId?: string;
}

export function PatientNavbar(_props?: PatientNavbarProps) {
  void _props;
  return <Header role="patient" />;
}
