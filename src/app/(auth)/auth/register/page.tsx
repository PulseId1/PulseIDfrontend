import { RegisterEntryForm } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | PulseID",
  description: "Register your patient, doctor, or pharmacist account on PulseID.",
};

export default function RegisterPage() {
  return <RegisterEntryForm />;
}
