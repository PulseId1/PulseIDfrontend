import { RoleSelector } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Role | PulseID",
  description: "Select your PulseID account role: Patient, Doctor, or Pharmacist.",
};

export default function RoleSelectionPage() {
  return <RoleSelector />;
}

