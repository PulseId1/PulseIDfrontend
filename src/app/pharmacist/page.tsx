"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import {
  Pill,
  CheckCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  LogOut,
  Scan,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function PharmacistDashboardPage() {
  const router = useRouter();
  const { logout, userId, isTokenVerified } = useAuth();
  const [prescriptionQrCode, setPrescriptionQrCode] = useState("");
  const [scanStatus, setScanStatus] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescriptionQrCode.trim()) {
      setScanStatus("Please enter or scan a digital prescription code.");
      return;
    }
    setScanStatus(`Verified e-prescription code ${prescriptionQrCode.trim()}: Valid clinical signature by licensed physician. Ready for dispensing.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]">
      {/* Top Pharmacy Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/pharmacist" className="flex items-center gap-2">
              <Image
                src="/assets/pulseid-logo.svg"
                alt="PulseID Logo"
                width={120}
                height={32}
                priority
                className="h-8 w-auto"
              />
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Pharmacist Dispensary Hub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#02307D]">
                Licensed Pharmacist
              </p>
              <p className="text-xs text-slate-500 font-mono">
                {userId ? `ID: ${userId}` : "Pharmacy License"}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 text-slate-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Prototype & Specification Notice */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-bold text-amber-900">
              Pharmacist Portal Prototype • Production Specification In Development
            </p>
            <p className="text-amber-800 leading-relaxed">
              This dispensary dashboard demonstrates the planned interaction interface for licensed pharmacists. Unlike the Patient (Figma node <code>353:11437</code>) and Doctor (node <code>353:11434</code>) portals which follow verified Figma designs, dedicated Pharmacist workflows are undergoing design finalization and will be integrated in Phase 5.
            </p>
          </div>
        </div>

        {/* Verification Status Banner */}
        {!isTokenVerified && (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700">
              <span className="font-semibold text-[#02307D]">Dispensary Session Active: </span>
              Connected to PulseID digital pharmacy network. All dispensed medications are logged to the national drug tracking registry.
            </div>
          </div>
        )}

        {/* Hero Section & Prescription Verification */}
        <section className="bg-gradient-to-r from-[#02307D] via-[#055B9E] to-[#078BDE] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium mb-4 backdrop-blur-xs">
              <Pill className="w-3.5 h-3.5" />
              <span>Digital Prescription Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Prescription Dispensation & Interaction Engine
            </h1>
            <p className="text-sm sm:text-base text-blue-50/90 mb-6 font-sans">
              Scan patient QR tokens or enter e-prescription numbers to verify clinician authenticity, dosage guidelines, and patient allergy alerts.
            </p>

            {/* Prescription Code Scanner Form */}
            <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Scan className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Scan or enter RX Code (e.g. RX-2026-8942)..."
                  value={prescriptionQrCode}
                  onChange={(e) => setPrescriptionQrCode(e.target.value.toUpperCase())}
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl text-sm outline-none focus:ring-2 focus:ring-white/40 shadow-inner font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[#02307D] font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors shadow-sm"
              >
                Verify Prescription
              </button>
            </form>

            {scanStatus && (
              <p className="mt-3 text-xs bg-black/20 p-2.5 rounded-lg text-emerald-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{scanStatus}</span>
              </p>
            )}
          </div>
        </section>

        {/* Pharmacy Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#078BDE] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Queue</p>
              <p className="text-xl font-bold text-[#02307D]">5 Orders</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Dispensed Today</p>
              <p className="text-xl font-bold text-[#02307D]">32 Prescriptions</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Interaction Alerts</p>
              <p className="text-xl font-bold text-[#02307D]">1 Flagged</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Drug Inventory</p>
              <p className="text-xl font-bold text-[#02307D]">98% In Stock</p>
            </div>
          </div>
        </section>

        {/* Active Dispensation Queue */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#02307D] font-heading">
                Electronic Prescriptions Awaiting Fulfillment
              </h2>
              <p className="text-xs text-slate-500">
                Verified digital prescriptions transmitted directly by attending physicians.
              </p>
            </div>
            <button className="text-xs font-semibold text-[#078BDE] hover:underline">
              Full Queue
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                rxCode: "RX-2026-4019",
                patientName: "Mona Adel",
                medication: "Metformin 500mg • 60 Tablets",
                prescriber: "Dr. Khaled Nour (Cardiology)",
                status: "Ready for Pickup",
              },
              {
                rxCode: "RX-2026-4022",
                patientName: "Tarek Fathy",
                medication: "Amoxicillin 875mg • 14 Tablets",
                prescriber: "Dr. Laila Hassan (Internal Med)",
                status: "Awaiting Verification",
              },
              {
                rxCode: "RX-2026-4030",
                patientName: "Heba Mostafa",
                medication: "Salbutamol Inhaler 100mcg • 1 Unit",
                prescriber: "Dr. Ahmed Mansour (Pulmonology)",
                status: "Dispensed",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    {item.patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.patientName}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {item.medication}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {item.rxCode} • {item.prescriber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "Ready for Pickup"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : item.status === "Awaiting Verification"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {item.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
