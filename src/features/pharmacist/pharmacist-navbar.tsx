"use client";

import React from "react";
import { Header } from "@/components/common/Header";

export interface PharmacistNavbarProps {
  onOpenAiAssistant?: () => void;
}

export function PharmacistNavbar({ onOpenAiAssistant }: PharmacistNavbarProps = {}) {
  return <Header role="pharmacist" onOpenAiAssistant={onOpenAiAssistant} />;
}
