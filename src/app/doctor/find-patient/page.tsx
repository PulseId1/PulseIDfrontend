"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

interface PatientResultItem {
  id: string;
  name: string;
  pulseId: string;
  nationalId: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  statusText: string;
  statusBg: string;
  statusTextColor: string;
  age: string;
  sex: string;
  location: string;
  hasAccess: boolean;
  bloodType: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
  vitals: { bp: string; hr: string; glucose: string };
  emergencyContact: { name: string; relation: string; phone: string };
}

const DEFAULT_PATIENTS: PatientResultItem[] = [
  {
    id: "p-1",
    name: "Ahmed Hassan",
    pulseId: "PID-8924-EGY",
    nationalId: "28809140102345",
    initials: "AH",
    avatarBg: "bg-[#dbeafe]",
    avatarText: "text-[#078bde]",
    statusText: "In your care",
    statusBg: "bg-[#ecfdf5]",
    statusTextColor: "text-[#047857]",
    age: "34 Yrs",
    sex: "Male",
    location: "Cairo",
    hasAccess: true,
    bloodType: "O+ (Positive)",
    conditions: ["Primary Essential Hypertension", "Hyperlipidemia"],
    allergies: ["Penicillin (Severe rash)", "Sulfa antibiotics"],
    medications: ["Lisinopril 10mg Daily", "Atorvastatin 20mg Bedtime"],
    vitals: { bp: "128 / 82 mmHg", hr: "72 bpm", glucose: "94 mg/dL (Fasting)" },
    emergencyContact: { name: "Mohamed Hassan", relation: "Father", phone: "+20 100 123 4567" },
  },
  {
    id: "p-2",
    name: "Ahmed Hassan Ali",
    pulseId: "PID-6350-EGY",
    nationalId: "28305120104891",
    initials: "AA",
    avatarBg: "bg-[#f3e8ff]",
    avatarText: "text-[#9333ea]",
    statusText: "Consent required",
    statusBg: "bg-[#fffbeb]",
    statusTextColor: "text-[#b45309]",
    age: "41 Yrs",
    sex: "Male",
    location: "Giza",
    hasAccess: false,
    bloodType: "B+ (Positive)",
    conditions: ["Type 2 Diabetes Mellitus (Controlled)"],
    allergies: ["No known drug allergies"],
    medications: ["Metformin 500mg twice daily"],
    vitals: { bp: "122 / 80 mmHg", hr: "76 bpm", glucose: "115 mg/dL" },
    emergencyContact: { name: "Fatma Ali", relation: "Spouse", phone: "+20 111 987 6543" },
  },
];

function FindPatientContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "Ahmed Hassan";
  const { isDemo } = useAuth();

  const [searchBy, setSearchBy] = useState<"nationalId" | "pulseId" | "fullName">("fullName");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [selectedPatientModal, setSelectedPatientModal] = useState<PatientResultItem | null>(null);
  const [consentRequestModal, setConsentRequestModal] = useState<PatientResultItem | null>(null);
  const [consentPermissions, setConsentPermissions] = useState<string[]>(["Lab Results", "Clinical Notes"]);
  const [notification, setNotification] = useState<string | null>(null);

  // Active Clinician display
  const activeAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const doctorDisplayName =
    isDemo && activeAccount?.fullName ? activeAccount.fullName : "Dr. Mohamed";

  const handleSearch = () => {
    setActiveQuery(searchQuery.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSendConsentRequest = (patient: PatientResultItem) => {
    setConsentRequestModal(null);
    setNotification(`Access request successfully dispatched for ${patient.name} (${patient.pulseId})`);
    setTimeout(() => setNotification(null), 4000);
  };

  const togglePermission = (perm: string) => {
    setConsentPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  // Filter patients based on query
  const qLower = activeQuery.toLowerCase().trim();
  const filteredPatients = DEFAULT_PATIENTS.filter((p) => {
    if (!qLower) return true;
    if (searchBy === "nationalId") {
      return p.nationalId.includes(qLower);
    } else if (searchBy === "pulseId") {
      return p.pulseId.toLowerCase().includes(qLower);
    }
    return p.name.toLowerCase().includes(qLower);
  });

  return (
    <div
      className="bg-white min-h-screen flex flex-col text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:10776"
      data-name="Find Patient · Desktop"
    >
      {/* 1. Website Header matching Figma Node 353:10777 */}
      <DoctorNavbar />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <p className="text-xs sm:text-sm font-medium">{notification}</p>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full">
        {/* 2. Page introduction matching Figma Node 353:10822 */}
        <div
          className="bg-[#f3f9fe] content-stretch flex flex-col gap-[22px] items-start p-4 sm:p-[32px] relative shrink-0 w-full"
          data-node-id="353:10822"
          data-name="Page introduction"
        >
          {/* Breadcrumb matching Figma Node 353:10823 */}
          <div
            className="content-stretch flex gap-[8px] items-center relative shrink-0"
            data-node-id="353:10823"
            data-name="Breadcrumb"
          >
            <div className="relative shrink-0 size-[15px]" data-node-id="353:10824" data-name="house">
              <Image
                src="/assets/doctor/find-patient/imgHouse.svg"
                alt="Home icon"
                width={15}
                height={15}
                className="block size-full object-contain"
              />
            </div>
            <Link
              href="/doctor"
              className="font-['Inter'] font-normal text-[13px] text-[#078bde] hover:underline whitespace-nowrap"
              data-node-id="353:10826"
            >
              Home
            </Link>
            <div className="relative shrink-0 size-[12px]" data-node-id="353:10827" data-name="chevron-right">
              <Image
                src="/assets/doctor/find-patient/imgChevronRight.svg"
                alt="Chevron right"
                width={12}
                height={12}
                className="block size-full object-contain"
              />
            </div>
            <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] whitespace-nowrap" data-node-id="353:10829">
              Find Patient
            </p>
          </div>

          {/* Page title matching Figma Node 353:10830 */}
          <div
            className="break-words content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
            data-node-id="353:10830"
            data-name="Page title"
          >
            <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10831">
              Welcome back, {doctorDisplayName}
            </p>
            <h1 className="font-['Inter'] font-bold leading-[1.25] text-[32px] sm:text-[36px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10832">
              Find Patient
            </h1>
            <p className="font-['Inter'] font-normal leading-[1.5] text-[15px] sm:text-[16px] text-[#41474f] w-full" data-node-id="353:10833">
              Find the right patient and securely view their medical profile.
            </p>
          </div>

          {/* Clinical quick actions matching Figma Node 353:10834 */}
          <div
            className="content-stretch flex flex-col sm:flex-row gap-[16px] items-start relative shrink-0 w-full"
            data-node-id="353:10834"
            data-name="Clinical quick actions"
          >
            {/* Action 1: Find Patient (Active) */}
            <Link
              href="/doctor/find-patient"
              className="bg-white border-[1.5px] border-[#078bde] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto shadow-xs"
              data-node-id="353:10835"
              data-name="Destination"
            >
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10836" data-name="Destination title">
                <div className="relative shrink-0 size-[22px]" data-node-id="353:10837" data-name="Icon">
                  <Image
                    src="/assets/doctor/find-patient/imgIcon.svg"
                    alt="Find Patient icon"
                    width={22}
                    height={22}
                    className="block size-full object-contain"
                  />
                </div>
                <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#078bde]" data-node-id="353:10838">
                  Find Patient
                </p>
              </div>
              <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10839">
                Secure patient lookup
              </p>
            </Link>

            {/* Action 2: Access Requests */}
            <Link
              href="/doctor/access-requests"
              className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto hover:bg-sky-50/50 transition-colors"
              data-node-id="353:10840"
              data-name="Destination"
            >
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10841" data-name="Destination title">
                <div className="relative shrink-0 size-[22px]" data-node-id="353:10842" data-name="Icon">
                  <Image
                    src="/assets/doctor/find-patient/imgIcon1.svg"
                    alt="Access Requests icon"
                    width={22}
                    height={22}
                    className="block size-full object-contain"
                  />
                </div>
                <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#02307d]" data-node-id="353:10843">
                  Access Requests
                </p>
              </div>
              <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10844">
                5 incoming requests
              </p>
            </Link>

            {/* Action 3: My Patients */}
            <Link
              href="/doctor/find-patient"
              className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto hover:bg-sky-50/50 transition-colors"
              data-node-id="353:10845"
              data-name="Destination"
            >
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10846" data-name="Destination title">
                <div className="relative shrink-0 size-[22px]" data-node-id="353:10847" data-name="Patient directory icon">
                  <Image
                    src="/assets/doctor/find-patient/imgGroup.svg"
                    alt="My Patients icon"
                    width={22}
                    height={22}
                    className="block size-full object-contain"
                  />
                </div>
                <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#02307d]" data-node-id="353:10853">
                  My Patients
                </p>
              </div>
              <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10854">
                148 patients in your care
              </p>
            </Link>
          </div>
        </div>

        {/* 3. Patient lookup container matching Figma Node 353:10855 */}
        <div
          className="content-stretch flex flex-col gap-[28px] items-start pb-[48px] pt-[32px] px-4 sm:px-[32px] relative shrink-0 w-full max-w-[1280px] mx-auto"
          data-node-id="353:10855"
          data-name="Patient lookup"
        >
          {/* Search panel matching Figma Node 353:10856 */}
          <div
            className="border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start p-6 sm:p-[28px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full bg-white"
            data-node-id="353:10856"
            data-name="Search panel"
          >
            {/* Search introduction matching Figma Node 353:10857 */}
            <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full" data-node-id="353:10857" data-name="Search introduction">
              <div className="relative shrink-0 size-[48px]" data-node-id="353:10858" data-name="Search symbol">
                <Image
                  src="/assets/doctor/find-patient/imgSearchSymbol.svg"
                  alt="Search symbol"
                  width={48}
                  height={48}
                  className="block size-full object-contain"
                />
              </div>
              <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative" data-node-id="353:10860" data-name="Search instructions">
                <h2 className="font-['Inter'] font-bold leading-[1.25] text-[20px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10861">
                  Search for a patient
                </h2>
                <p className="font-['Inter'] font-normal leading-[1.5] text-[#41474f] text-[13px] w-full" data-node-id="353:10862">
                  Use a 14-digit National ID, Pulse ID or full patient name.
                </p>
              </div>
            </div>

            {/* Search form matching Figma Node 353:10863 */}
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="353:10863" data-name="Search form">
              <label className="break-words font-['Inter'] font-semibold leading-[1.5] text-[13px] text-[#02307d]" data-node-id="353:10864">
                Search by
              </label>

              {/* Identification methods matching Figma Node 353:10865 */}
              <div className="bg-[#f3f9fe] content-stretch flex flex-wrap gap-[4px] items-start p-[4px] relative rounded-[10px] shrink-0" data-node-id="353:10865" data-name="Identification methods">
                {/* Method 1: National ID */}
                <button
                  type="button"
                  onClick={() => setSearchBy("nationalId")}
                  className={`content-stretch flex items-start justify-center px-[18px] py-[10px] relative rounded-[8px] shrink-0 transition-all cursor-pointer ${
                    searchBy === "nationalId"
                      ? "bg-white border border-[#d0deff] shadow-xs text-[#078bde] font-semibold"
                      : "bg-[#f3f9fe] border border-[#f3f9fe] text-[#64748b] hover:bg-white/50 font-normal"
                  }`}
                  data-node-id="353:10866"
                >
                  <span className="font-['Inter'] text-[13px] leading-normal whitespace-nowrap">
                    National ID
                  </span>
                </button>

                {/* Method 2: Pulse ID */}
                <button
                  type="button"
                  onClick={() => setSearchBy("pulseId")}
                  className={`content-stretch flex items-start justify-center px-[18px] py-[10px] relative rounded-[8px] shrink-0 transition-all cursor-pointer ${
                    searchBy === "pulseId"
                      ? "bg-white border border-[#d0deff] shadow-xs text-[#078bde] font-semibold"
                      : "bg-[#f3f9fe] border border-[#f3f9fe] text-[#64748b] hover:bg-white/50 font-normal"
                  }`}
                  data-node-id="353:10868"
                >
                  <span className="font-['Inter'] text-[13px] leading-normal whitespace-nowrap">
                    Pulse ID
                  </span>
                </button>

                {/* Method 3: Full name */}
                <button
                  type="button"
                  onClick={() => setSearchBy("fullName")}
                  className={`content-stretch flex items-start justify-center px-[18px] py-[10px] relative rounded-[8px] shrink-0 transition-all cursor-pointer ${
                    searchBy === "fullName"
                      ? "bg-white border border-[#d0deff] shadow-xs text-[#078bde] font-semibold"
                      : "bg-[#f3f9fe] border border-[#f3f9fe] text-[#64748b] hover:bg-white/50 font-normal"
                  }`}
                  data-node-id="353:10870"
                >
                  <span className="font-['Inter'] text-[13px] leading-normal whitespace-nowrap">
                    Full name
                  </span>
                </button>
              </div>

              <label className="break-words font-['Inter'] font-semibold leading-[1.5] text-[13px] text-[#02307d]" data-node-id="353:10872">
                {searchBy === "nationalId"
                  ? "14-digit National ID"
                  : searchBy === "pulseId"
                  ? "Pulse ID (e.g. PID-8924-EGY)"
                  : "Full patient name"}
              </label>

              {/* Search controls matching Figma Node 353:10873 */}
              <div className="content-stretch flex flex-col sm:flex-row gap-[12px] items-stretch sm:items-center relative shrink-0 w-full" data-node-id="353:10873" data-name="Search controls">
                <div
                  className="bg-white border border-[#d0deff] border-solid content-stretch flex flex-1 gap-[10px] items-center min-h-[48px] px-[14px] py-[12px] relative rounded-[8px] focus-within:border-[#078bde] transition-colors"
                  data-node-id="353:10874"
                  data-name="Input field"
                >
                  <div className="relative shrink-0 size-[18px]" data-node-id="353:10875" data-name="Icon">
                    <Image
                      src="/assets/doctor/find-patient/imgIcon2.svg"
                      alt="Input search icon"
                      width={18}
                      height={18}
                      className="block size-full object-contain"
                    />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      searchBy === "nationalId"
                        ? "e.g. 28809140102345"
                        : searchBy === "pulseId"
                        ? "e.g. PID-8924-EGY"
                        : "e.g. Ahmed Hassan"
                    }
                    className="bg-transparent border-none outline-none font-['Inter'] font-normal text-[14px] text-[#41474f] placeholder-[#94a3b8] w-full"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-[#078bde] border border-[#078bde] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#0079c3] transition-colors cursor-pointer text-white shadow-xs"
                  data-node-id="353:10877"
                  data-name="Action"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="353:10878" data-name="Icon">
                    <Image
                      src="/assets/doctor/find-patient/imgIcon3.svg"
                      alt="Search icon"
                      width={16}
                      height={16}
                      className="block size-full object-contain"
                    />
                  </div>
                  <span className="font-['Inter'] font-semibold text-[14px] text-white whitespace-nowrap leading-normal" data-node-id="353:10879">
                    Search
                  </span>
                </button>
              </div>

              <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10880">
                For a National ID, enter all 14 digits. IDs are never shown in full in results.
              </p>
            </div>
          </div>

          {/* 4. Search results matching Figma Node 353:10881 */}
          <div
            className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
            data-node-id="353:10881"
            data-name="Search results"
          >
            {/* Results heading matching Figma Node 353:10882 */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="353:10882" data-name="Results heading">
              <h2 className="break-words flex-1 font-['Inter'] font-bold leading-[1.25] text-[22px] text-[#02307d] tracking-[-0.4px]" data-node-id="353:10883">
                Search results
              </h2>
              <div className="bg-[#f3f9fe] content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="353:10884" data-name="Status">
                <span className="font-['Inter'] font-semibold leading-[1.3] text-[11px] text-[#078bde] whitespace-nowrap" data-node-id="353:10885">
                  {filteredPatients.length} {filteredPatients.length === 1 ? "match" : "matches"}
                </span>
              </div>
            </div>

            <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[14px] w-full" data-node-id="353:10886">
              Matches for “{activeQuery || "Ahmed Hassan"}”. Confirm the patient’s details before continuing.
            </p>

            {filteredPatients.length === 0 ? (
              <div className="border border-[#dde7ff] rounded-[16px] p-8 text-center w-full bg-white text-[#64748b]">
                <p className="text-[15px] font-medium text-[#02307d]">No patients matched your search query</p>
                <p className="text-[13px] mt-1">Try searching for &quot;Ahmed Hassan&quot; or &quot;PID-8924-EGY&quot;.</p>
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const isConsentReq = !patient.hasAccess;

                return (
                  <div
                    key={patient.id}
                    className="border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start p-6 sm:p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full bg-white hover:border-[#b8d1ff] transition-colors"
                    data-node-id={isConsentReq ? "353:10915" : "353:10887"}
                    data-name="Patient result"
                  >
                    {/* Patient overview */}
                    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                      <div
                        className={`${patient.avatarBg} content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]`}
                      >
                        <span className={`font-['Inter'] font-bold text-[17px] ${patient.avatarText} whitespace-nowrap`}>
                          {patient.initials}
                        </span>
                      </div>

                      <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative">
                        <h3 className="font-['Inter'] font-bold leading-[1.25] text-[18px] text-[#02307d] tracking-[-0.4px] w-full">
                          {patient.name}
                        </h3>
                        <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full">
                          Patient ID: {patient.pulseId}
                        </p>
                      </div>

                      <div className={`${patient.statusBg} content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0`}>
                        <span className={`font-['Inter'] font-semibold leading-[1.3] text-[11px] ${patient.statusTextColor} whitespace-nowrap`}>
                          {patient.statusText}
                        </span>
                      </div>
                    </div>

                    {/* Patient details (Demographics) */}
                    <div className="break-words content-stretch flex gap-8 sm:gap-[64px] items-start leading-[1.5] relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[45px]">
                        <span className="font-['Inter'] font-normal text-[#64748b] text-[12px] w-full">Age</span>
                        <span className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full">{patient.age}</span>
                      </div>
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[33px]">
                        <span className="font-['Inter'] font-normal text-[#64748b] text-[12px] w-full">Sex</span>
                        <span className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full">{patient.sex}</span>
                      </div>
                      <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[49px]">
                        <span className="font-['Inter'] font-normal text-[#64748b] text-[12px] w-full">Location</span>
                        <span className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full">{patient.location}</span>
                      </div>
                    </div>

                    {/* Profile access footer */}
                    <div className="content-stretch flex flex-col sm:flex-row gap-3 sm:gap-0 items-start sm:items-center justify-between relative shrink-0 w-full pt-2 border-t border-slate-100">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="relative shrink-0 size-[16px]">
                          <Image
                            src={isConsentReq ? "/assets/doctor/find-patient/imgIcon4.svg" : "/assets/doctor/find-patient/imgBadgeCheck.svg"}
                            alt={isConsentReq ? "Private status" : "Verified status"}
                            width={16}
                            height={16}
                            className="block size-full object-contain"
                          />
                        </div>
                        <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] whitespace-nowrap">
                          {isConsentReq ? "Medical details remain private" : "Patient identity verified"}
                        </p>
                      </div>

                      {patient.hasAccess ? (
                        <button
                          type="button"
                          onClick={() => setSelectedPatientModal(patient)}
                          className="bg-[#078bde] border border-[#078bde] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#0079c3] transition-colors cursor-pointer text-white shadow-xs"
                        >
                          <span className="font-['Inter'] font-semibold text-[14px] text-white whitespace-nowrap leading-normal">
                            View Medical Profile
                          </span>
                          <div className="relative shrink-0 size-[16px]">
                            <Image
                              src="/assets/doctor/find-patient/imgArrowRight.svg"
                              alt="Arrow right"
                              width={16}
                              height={16}
                              className="block size-full object-contain"
                            />
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConsentRequestModal(patient)}
                          className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 hover:bg-[#e0efff] transition-colors cursor-pointer text-[#078bde]"
                        >
                          <span className="font-['Inter'] font-semibold text-[14px] text-[#078bde] whitespace-nowrap leading-normal">
                            Request Access
                          </span>
                          <div className="relative shrink-0 size-[16px]">
                            <Image
                              src="/assets/doctor/find-patient/imgArrowRight1.svg"
                              alt="Arrow right"
                              width={16}
                              height={16}
                              className="block size-full object-contain"
                            />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* Privacy guidance matching Figma Node 353:10942 */}
            <div
              className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full mt-4"
              data-node-id="353:10942"
              data-name="Privacy guidance"
            >
              <div className="relative shrink-0 size-[22px]" data-node-id="353:10943" data-name="Icon">
                <Image
                  src="/assets/doctor/find-patient/imgIcon1.svg"
                  alt="Privacy shield"
                  width={22}
                  height={22}
                  className="block size-full object-contain"
                />
              </div>
              <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start leading-[1.5] relative" data-node-id="353:10944" data-name="Guidance">
                <h3 className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10945">
                  Patient privacy comes first
                </h3>
                <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] w-full" data-node-id="353:10946">
                  Search reveals identity details only. Medical information is available solely with valid patient permission. Every record access is securely logged.
                </p>
              </div>
            </div>

            {/* Search help matching Figma Node 353:10947 */}
            <div
              className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full"
              data-node-id="353:10947"
              data-name="Search help"
            >
              <div className="relative shrink-0 size-[18px]" data-node-id="353:10948" data-name="circle-help">
                <Image
                  src="/assets/doctor/find-patient/imgCircleHelp.svg"
                  alt="Circle help"
                  width={18}
                  height={18}
                  className="block size-full object-contain"
                />
              </div>
              <p className="break-words flex-1 font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px]" data-node-id="353:10950">
                Can’t find the patient? Check the spelling or try their Pulse ID or 14-digit National ID.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Medical Profile Modal for Patient with Access */}
      {selectedPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#02307d] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white">
                  {selectedPatientModal.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{selectedPatientModal.name}</h3>
                  <p className="text-xs text-sky-200">Patient ID: {selectedPatientModal.pulseId} • Blood: {selectedPatientModal.bloodType}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatientModal(null)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Clinical Vitals */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Latest Clinical Vitals</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3">
                    <span className="text-xs text-slate-500 block">Blood Pressure</span>
                    <span className="text-base font-bold text-[#02307d]">{selectedPatientModal.vitals.bp}</span>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3">
                    <span className="text-xs text-slate-500 block">Heart Rate</span>
                    <span className="text-base font-bold text-[#02307d]">{selectedPatientModal.vitals.hr}</span>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3">
                    <span className="text-xs text-slate-500 block">Glucose Level</span>
                    <span className="text-base font-bold text-[#02307d]">{selectedPatientModal.vitals.glucose}</span>
                  </div>
                </div>
              </div>

              {/* Chronic Conditions & Allergies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#078bde] mb-2">Diagnosed Conditions</h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    {selectedPatientModal.conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">Critical Allergies</h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    {selectedPatientModal.allergies.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Active Prescriptions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Active Prescriptions</h4>
                <div className="space-y-2">
                  {selectedPatientModal.medications.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700">
                      <span className="font-medium">{m}</span>
                      <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-center justify-between text-xs text-slate-600">
                <span>Emergency Contact: <strong className="text-slate-800">{selectedPatientModal.emergencyContact.name}</strong> ({selectedPatientModal.emergencyContact.relation})</span>
                <span className="font-mono text-[#078bde]">{selectedPatientModal.emergencyContact.phone}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedPatientModal(null)}
                className="px-4 py-2 bg-[#02307d] text-white rounded-lg text-sm font-semibold hover:bg-[#00225d] transition-colors cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Consent Request Modal for Patients Requiring Authorization */}
      {consentRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full flex flex-col overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="px-6 py-4 bg-[#02307d] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-base">
                  🔒
                </div>
                <div>
                  <h3 className="text-base font-bold">Request Clinical Access</h3>
                  <p className="text-xs text-sky-200">{consentRequestModal.name} • {consentRequestModal.pulseId}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConsentRequestModal(null)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                This patient&apos;s medical records are protected under healthcare privacy protocols. Specify the scope of clinical access you require. An electronic consent authorization will be sent to the patient&apos;s PulseID application.
              </p>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Requested Permission Scope</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Lab Results", "Clinical Notes", "Prescription History", "Radiology Imaging"].map((perm) => (
                    <button
                      key={perm}
                      type="button"
                      onClick={() => togglePermission(perm)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors cursor-pointer ${
                        consentPermissions.includes(perm)
                          ? "bg-sky-50 border-[#078bde] text-[#078bde]"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{perm}</span>
                      <span>{consentPermissions.includes(perm) ? "✓" : "+"}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-800">
                <p className="font-semibold">Compliance Notice</p>
                <p className="mt-0.5 text-amber-700">Access requests expire in 72 hours if not authorized by the patient. All requests are securely audited.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setConsentRequestModal(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSendConsentRequest(consentRequestModal)}
                className="px-4 py-2 bg-[#078bde] hover:bg-[#0079c3] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Dispatch Authorization Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Website Footer matching Figma Node 353:10951 */}
      <DoctorFooter />
    </div>
  );
}

export default function FindPatientDesktopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <FindPatientContent />
    </Suspense>
  );
}
