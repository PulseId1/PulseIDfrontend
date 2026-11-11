"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { DemoService } from "@/lib/demo/demo-service";
import { DemoAccount } from "@/lib/demo/demo-data";
import {
  Search,
  User,
  ShieldCheck,
  Heart,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Lock,
  Activity,
  Pill,
} from "lucide-react";

interface MockPatientDirectoryEntry {
  nationalId: string;
  fullName: string;
  age: number;
  dob: string;
  bloodType: string;
  city: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  hasAccess: boolean;
  chronicConditions: string[];
  allergies: string[];
  medications: string[];
  recentVitals: {
    bp: string;
    heartRate: string;
    glucose: string;
  };
}

const KNOWN_PATIENTS: Record<string, MockPatientDirectoryEntry> = {
  "29804120108924": {
    nationalId: "29804120108924",
    fullName: "Sara Mahmoud Ibrahim",
    age: 28,
    dob: "12 Apr 1998",
    bloodType: "A+ (Positive)",
    city: "New Cairo, Egypt",
    emergencyContact: {
      name: "Mahmoud Ibrahim",
      relationship: "Father",
      phone: "+20 100 123 4567",
    },
    hasAccess: true,
    chronicConditions: [
      "Bronchial Asthma (Moderate persistent)",
      "Seasonal Allergic Rhinitis (Dust & olive pollen)",
    ],
    allergies: [
      "Penicillin / Amoxicillin (Severe - Anaphylaxis)",
      "Aspirin & NSAIDs (Bronchospasm)",
      "Tree Nuts & Hazelnuts (Oral allergy)",
    ],
    medications: [
      "Symbicort Turbuhaler 160/4.5mcg (1 inhalation twice daily)",
      "Ventolin Inhaler 100mcg (1-2 puffs PRN)",
      "Claritin 10mg (Daily during flare-ups)",
    ],
    recentVitals: {
      bp: "118 / 76 mmHg",
      heartRate: "76 bpm",
      glucose: "88 mg/dL (Fasting)",
    },
  },
  "28809140102345": {
    nationalId: "28809140102345",
    fullName: "Ahmed Hassan",
    age: 38,
    dob: "14 Sep 1988",
    bloodType: "O+ (Positive)",
    city: "Cairo, Egypt",
    emergencyContact: {
      name: "Mohamed Hassan",
      relationship: "Father",
      phone: "+20 100 123 4567",
    },
    hasAccess: true,
    chronicConditions: ["Primary Essential Hypertension", "Hyperlipidemia"],
    allergies: ["Penicillin (Severe rash)", "Sulfa antibiotics"],
    medications: ["Lisinopril 10mg Daily", "Atorvastatin 20mg Bedtime"],
    recentVitals: {
      bp: "128 / 82 mmHg",
      heartRate: "72 bpm",
      glucose: "94 mg/dL (Fasting)",
    },
  },
  "29204150109876": {
    nationalId: "29204150109876",
    fullName: "Mariam Adel",
    age: 34,
    dob: "22 Apr 1992",
    bloodType: "A+ (Positive)",
    city: "Alexandria, Egypt",
    emergencyContact: {
      name: "Tarek Adel",
      relationship: "Brother",
      phone: "+20 111 987 6543",
    },
    hasAccess: true,
    chronicConditions: ["Type 2 Diabetes Mellitus"],
    allergies: ["Aspirin"],
    medications: ["Metformin 500mg Twice Daily"],
    recentVitals: {
      bp: "120 / 78 mmHg",
      heartRate: "68 bpm",
      glucose: "112 mg/dL",
    },
  },
  "27911220104321": {
    nationalId: "27911220104321",
    fullName: "Omar Farouk",
    age: 47,
    dob: "18 Nov 1979",
    bloodType: "B+ (Positive)",
    city: "Giza, Egypt",
    emergencyContact: {
      name: "Rania Farouk",
      relationship: "Spouse",
      phone: "+20 122 345 6789",
    },
    hasAccess: false,
    chronicConditions: [],
    allergies: [],
    medications: [],
    recentVitals: {
      bp: "--",
      heartRate: "--",
      glucose: "--",
    },
  },
};

function DoctorFindPatientContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(initialId);
  const [registeredPatients] = useState<DemoAccount[]>(() => {
    if (typeof window === "undefined") return [];
    return DemoService.getAccounts().filter(
      (a) => a.role === "patient" && a.id !== "pt-sara-01"
    );
  });

  const resolvePatientEntry = (cleanId: string): MockPatientDirectoryEntry | null => {
    // 1. Check predefined hardcoded fixtures
    if (KNOWN_PATIENTS[cleanId]) {
      return KNOWN_PATIENTS[cleanId];
    }

    // 2. Check demo accounts & profiles
    const account = DemoService.findAccountByIdentifier(cleanId);
    if (account && account.role === "patient") {
      const profile = DemoService.getPatientProfile(account.id);
      const emergency = profile.emergencyContacts?.[0];
      return {
        nationalId: account.nationalId,
        fullName: account.fullName,
        age: DemoService.calculateAge(profile.birthDate || account.birthDate),
        dob: profile.birthDate || account.birthDate || "01 Jan 1995",
        bloodType: account.bloodType ? `${account.bloodType} (Positive)` : "O+ (Positive)",
        city: `${account.address || "Cairo"}, Egypt`,
        emergencyContact: {
          name: emergency?.fullName || account.emergencyContactName || "Next of Kin",
          relationship: emergency?.relationship || account.emergencyContactRelation || "Family",
          phone: emergency?.phone || account.emergencyContactPhone || account.phone,
        },
        hasAccess: true,
        chronicConditions:
          profile.chronicDiseases && profile.chronicDiseases.length > 0
            ? profile.chronicDiseases.map((c) => c.name || "").filter(Boolean)
            : account.initialCondition
            ? [account.initialCondition]
            : ["None recorded"],
        allergies:
          profile.allergyMenu && profile.allergyMenu.length > 0
            ? profile.allergyMenu.map((a) => a.name || "").filter(Boolean)
            : ["None recorded"],
        medications:
          profile.currentMedications && profile.currentMedications.length > 0
            ? profile.currentMedications
                .map((m) => (m.dosage ? `${m.name} (${m.dosage})` : m.name || ""))
                .filter(Boolean)
            : ["None recorded"],
        recentVitals: {
          bp: "120 / 80 mmHg",
          heartRate: "72 bpm",
          glucose: "95 mg/dL",
        },
      };
    }

    return null;
  };

  const [searchedPatient, setSearchedPatient] = useState<MockPatientDirectoryEntry | null>(() => {
    if (!initialId) return null;
    return resolvePatientEntry(initialId);
  });
  const [hasSearched, setHasSearched] = useState(Boolean(initialId));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim();
    if (!cleanId) return;

    setHasSearched(true);
    setSearchedPatient(resolvePatientEntry(cleanId));
  };

  const handleQuickChipClick = (id: string) => {
    setSearchId(id);
    setSearchedPatient(resolvePatientEntry(id));
    setHasSearched(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FBFEFF] text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:10776"
      data-name="Find Patient · Desktop"
    >
      <DoctorNavbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 flex flex-col gap-8">
        {/* Page Introduction matching Figma Node 353:10822 */}
        <div className="flex flex-col gap-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#01091E] tracking-tight font-heading">
            Find Patient Directory
          </h1>
          <p className="text-sm sm:text-base text-[#41474F] leading-normal font-sans max-w-2xl">
            Lookup authenticated patient identities and clinical profiles across Egypt&apos;s national healthcare network using their 14-digit National ID or QR patient code.
          </p>
        </div>

        {/* Prototype Demonstration Banner */}
        <div className="w-full p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="font-bold text-amber-600 mt-0.5">ℹ</span>
          <div>
            <strong>Demonstration Directory:</strong> Direct patient lookup by National ID across hospital databases is a planned feature (<code className="font-mono text-[11px] bg-amber-100 px-1 rounded">BACKEND_UNSUPPORTED</code> in API v1). The cards below simulate the clinical record view using sample patient records.
          </div>
        </div>

        {/* Search Bar Section matching Figma Node 353:10855 */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#E9EFFD] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 14-digit National ID (e.g. 28809140102345)..."
                className="w-full h-13 pl-12 pr-4 rounded-xl border border-slate-200 text-sm font-mono focus:border-[#078BDE] focus:outline-none focus:ring-2 focus:ring-[#078BDE]/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            <button
              type="submit"
              className="h-13 px-8 rounded-xl bg-[#02307D] hover:bg-[#03449E] text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Directory</span>
            </button>
          </form>

          {/* Quick Demo ID Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-sans">Quick Demo Patients:</span>
            {registeredPatients.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleQuickChipClick(p.nationalId)}
                className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                {p.fullName} ({p.nationalId}) • Registered
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleQuickChipClick("29804120108924")}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              Sara Mahmoud (29804120108924) • Demo Patient
            </button>
            <button
              type="button"
              onClick={() => handleQuickChipClick("28809140102345")}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#02307D] hover:bg-blue-100 text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              Ahmed Hassan (28809140102345) • Active
            </button>
            <button
              type="button"
              onClick={() => handleQuickChipClick("29204150109876")}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#02307D] hover:bg-blue-100 text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              Mariam Adel (29204150109876) • Active
            </button>
            <button
              type="button"
              onClick={() => handleQuickChipClick("27911220104321")}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              Omar Farouk (27911220104321) • Access Required
            </button>
          </div>
        </div>

        {/* Search Results Display matching Figma Node 353:10881 */}
        {hasSearched && (
          <div className="w-full">
            {searchedPatient ? (
              <div className="bg-white rounded-[24px] border border-[#E9EFFD] shadow-sm overflow-hidden flex flex-col">
                {/* Header Profile Row */}
                <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50/60 to-slate-50/60 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#02307D] text-white font-bold text-xl flex items-center justify-center shadow-sm shrink-0">
                      {searchedPatient.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#02307D] font-heading">
                          {searchedPatient.fullName}
                        </h2>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Citizen
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-sans mt-1">
                        <span className="font-mono">ID: {searchedPatient.nationalId}</span>
                        <span>•</span>
                        <span>{searchedPatient.age} years old</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {searchedPatient.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {searchedPatient.hasAccess ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Active Clinical Access (Expires in 6d)</span>
                      </span>
                    ) : (
                      <Link
                        href={`/doctor/access-requests?id=${searchedPatient.nationalId}`}
                        className="px-4 py-2 rounded-xl bg-[#02307D] text-white hover:bg-[#03449E] text-xs font-bold transition-all inline-flex items-center gap-2 shadow-xs"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Request Access Permission</span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Identity & Emergency Row */}
                <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-100 bg-white">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Blood Group
                    </span>
                    <span className="text-base font-bold text-[#02307D] flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      {searchedPatient.bloodType}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Date of Birth
                    </span>
                    <span className="text-base font-bold text-[#02307D] flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#078BDE]" />
                      {searchedPatient.dob}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Emergency Contact
                    </span>
                    <span className="text-xs font-bold text-slate-800 block">
                      {searchedPatient.emergencyContact.name} ({searchedPatient.emergencyContact.relationship})
                    </span>
                    <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                      {searchedPatient.emergencyContact.phone}
                    </span>
                  </div>
                </div>

                {/* Clinical Data Section (Gated by Access Grant) */}
                {searchedPatient.hasAccess ? (
                  <div className="p-6 sm:p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#02307D] font-heading flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#078BDE]" />
                        <span>Clinical Profile &amp; Vitals Snapshot</span>
                      </h3>
                      <span className="text-xs text-slate-400 font-sans">
                        Last Telemetry: Today, 08:30 AM
                      </span>
                    </div>

                    {/* Vitals */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                        <span className="text-[11px] font-semibold text-slate-500">Blood Pressure</span>
                        <p className="text-lg font-bold text-[#02307D] mt-0.5 font-mono">
                          {searchedPatient.recentVitals.bp}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                        <span className="text-[11px] font-semibold text-slate-500">Resting Heart Rate</span>
                        <p className="text-lg font-bold text-[#02307D] mt-0.5 font-mono">
                          {searchedPatient.recentVitals.heartRate}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                        <span className="text-[11px] font-semibold text-slate-500">Fasting Glucose</span>
                        <p className="text-lg font-bold text-[#02307D] mt-0.5 font-mono">
                          {searchedPatient.recentVitals.glucose}
                        </p>
                      </div>
                    </div>

                    {/* Chronic & Allergies & Medications */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Chronic */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <span className="text-xs font-bold text-[#02307D] flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-[#0080DF]" />
                          Chronic Conditions
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {searchedPatient.chronicConditions.map((c) => (
                            <li key={c} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Allergies */}
                      <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100 space-y-2">
                        <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          Documented Allergies
                        </span>
                        <ul className="text-xs text-rose-900 space-y-1">
                          {searchedPatient.allergies.map((a) => (
                            <li key={a} className="flex items-center gap-1.5 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Medications */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                        <span className="text-xs font-bold text-[#02307D] flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5 text-indigo-600" />
                          Current Medications
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {searchedPatient.medications.map((m) => (
                            <li key={m} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Gated Record Notice */
                  <div className="p-8 text-center flex flex-col items-center justify-center gap-3 bg-slate-50/70">
                    <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="max-w-md">
                      <h4 className="text-base font-bold text-slate-800 font-heading">
                        Medical Records Gated by Patient Consent
                      </h4>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        In accordance with Egyptian Healthcare Compliance and HIPAA guidelines, full medical history and diagnostic files are only visible after patient biometric consent.
                      </p>
                    </div>
                    <Link
                      href={`/doctor/access-requests?id=${searchedPatient.nationalId}`}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-[#02307D] hover:bg-[#03449E] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Request Access for Omar Farouk</span>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              /* Patient Not Found */
              <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-[#E9EFFD] text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 font-heading">
                  No Patient Registered with National ID &ldquo;{searchId}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 max-w-md font-sans">
                  The National ID entered does not match any registered citizen in the PulseID database. Check the number or try one of the demo patients above.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <DoctorFooter />
    </div>
  );
}

export default function DoctorFindPatientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFEFF]" />}>
      <DoctorFindPatientContent />
    </Suspense>
  );
}
