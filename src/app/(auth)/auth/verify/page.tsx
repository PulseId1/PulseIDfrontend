import { OtpVerification } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Phone Number | PulseID",
  description: "Enter your 6-digit verification code to confirm your phone number.",
};

export default function VerifyPage() {
  return <OtpVerification />;
}

