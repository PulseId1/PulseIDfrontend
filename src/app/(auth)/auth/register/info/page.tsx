import { PersonalInfoForm } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Information | PulseID",
  description: "Complete your PulseID healthcare registration details.",
};

export default function RegisterInfoPage() {
  return <PersonalInfoForm />;
}
