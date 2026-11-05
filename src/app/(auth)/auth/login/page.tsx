import { LoginForm } from "@/features/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PulseID",
  description: "Sign in with your mobile phone number to PulseID.",
};

export default function LoginPage() {
  return <LoginForm />;
}

