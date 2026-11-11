import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PulseID — Authentication & Registration",
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
        <div className="min-h-screen bg-[#FBFEFF] flex items-center justify-center text-slate-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#078BDE]" />
        </div>
      }
    >
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8F9FE] py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#078BDE]/20 selection:text-[#078BDE] overflow-x-hidden">
        {children}
      </div>
    </Suspense>
  );
}
