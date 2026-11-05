import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth";

export const metadata: Metadata = {
  title: "PulseID Authentication",
  description:
    "Secure role-based healthcare authentication for Patients, Doctors, and Pharmacists.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center text-slate-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0080DF]" />
        </div>
      }
    >
      <AuthProvider>
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F4F6FA] p-2.5 sm:p-6 md:p-10 font-sans selection:bg-[#0080DF]/20 selection:text-[#0080DF] overflow-x-hidden">
          {/* Centered Floating Figma Card (No navbar, No footer) */}
          <div className="w-full max-w-[1020px] bg-white rounded-[20px] sm:rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07),0_0_1px_1px_rgba(0,0,0,0.03)] overflow-hidden border border-slate-100/80">
            {children}
          </div>
        </div>
      </AuthProvider>
    </Suspense>
  );
}
