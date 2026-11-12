"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

interface PatientOption {
  id: string;
  name: string;
  pulseId: string;
  nationalId: string;
  age: string;
  sex: string;
  photoUrl?: string;
  initials: string;
  avatarBg?: string;
  avatarTextColor?: string;
}

const AVAILABLE_PATIENTS: PatientOption[] = [
  {
    id: "p-1",
    name: "Ahmed Hassan",
    pulseId: "PID-8924-EGY",
    nationalId: "28809140102345",
    age: "34 Yrs",
    sex: "Male",
    photoUrl: "/assets/doctor/access-requests/imgPatientPhoto.png",
    initials: "AH",
  },
  {
    id: "p-2",
    name: "Tarek Ibrahim",
    pulseId: "PID-7731-EGY",
    nationalId: "27204150109876",
    age: "52 Yrs",
    sex: "Male",
    photoUrl: "/assets/doctor/access-requests/imgPatientAvatar.png",
    initials: "TI",
  },
  {
    id: "p-3",
    name: "Farida El-Sayed",
    pulseId: "PID-4102-EGY",
    nationalId: "29608210103456",
    age: "28 Yrs",
    sex: "Female",
    initials: "FE",
    avatarBg: "bg-[#dbeafe]",
    avatarTextColor: "text-[#078bde]",
  },
  {
    id: "p-4",
    name: "Omar Abdelaziz",
    pulseId: "PID-6185-EGY",
    nationalId: "28309110105678",
    age: "41 Yrs",
    sex: "Male",
    initials: "OA",
    avatarBg: "bg-[#fee2e2]",
    avatarTextColor: "text-[#ef4444]",
  },
];

interface SentRequestItem {
  id: string;
  patient: PatientOption;
  permission: "View" | "Edit";
  categories: string[];
  reason: string;
  requestedDate: string;
  status: "pending" | "approved" | "rejected";
  statusText: string;
}

const INITIAL_SENT_REQUESTS: SentRequestItem[] = [
  {
    id: "req-1",
    patient: AVAILABLE_PATIENTS[1], // Tarek Ibrahim
    permission: "View",
    categories: ["Cardiology", "Vital Signs"],
    reason: "Review hypertension history & evaluate new echocardiogram",
    requestedDate: "Nov 3, 2026 • 11:00 AM",
    status: "pending",
    statusText: "Pending patient approval",
  },
  {
    id: "req-2",
    patient: AVAILABLE_PATIENTS[2], // Farida El-Sayed
    permission: "View",
    categories: ["Lab Results"],
    reason: "Routine clinical assessment and follow-up lab review",
    requestedDate: "Nov 2, 2026 • 10:45 AM",
    status: "approved",
    statusText: "Approved",
  },
  {
    id: "req-3",
    patient: AVAILABLE_PATIENTS[3], // Omar Abdelaziz
    permission: "Edit",
    categories: ["Clinical Notes"],
    reason: "Post-consultation clinical summary documentation",
    requestedDate: "Nov 1, 2026 • 08:20 AM",
    status: "rejected",
    statusText: "Rejected",
  },
];

const ALL_RECORD_CATEGORIES = [
  "Lab Results",
  "Prescription History",
  "Clinical Notes",
  "Radiology",
  "Cardiology",
  "Vital Signs",
];

function AccessRequestsContent() {
  const searchParams = useSearchParams();
  const prefilledQuery = searchParams.get("q") || searchParams.get("id") || "";
  const { isDemo } = useAuth();

  // Active Clinician display
  const activeAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const doctorDisplayName =
    isDemo && activeAccount?.fullName ? activeAccount.fullName : "Dr. Mohamed";

  // Form State
  const [selectedPatient, setSelectedPatient] = useState<PatientOption>(() => {
    if (prefilledQuery) {
      const match = AVAILABLE_PATIENTS.find(
        (p) =>
          p.pulseId.toLowerCase() === prefilledQuery.toLowerCase() ||
          p.nationalId === prefilledQuery ||
          p.name.toLowerCase().includes(prefilledQuery.toLowerCase())
      );
      if (match) return match;
    }
    return AVAILABLE_PATIENTS[0]; // Ahmed Hassan default
  });

  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [permissionType, setPermissionType] = useState<"View" | "Edit">("View");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Lab Results",
    "Prescription History",
  ]);
  const [requestReason, setRequestReason] = useState(
    "Review recent laboratory findings and medication history before the diabetes follow-up consultation."
  );

  // List State
  const [requestsList, setRequestsList] = useState<SentRequestItem[]>(INITIAL_SENT_REQUESTS);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedRequestDetails, setSelectedRequestDetails] = useState<SentRequestItem | null>(null);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 4000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSendRequest = () => {
    if (!selectedPatient) {
      showToast("Please select a patient first.");
      return;
    }
    if (selectedCategories.length === 0) {
      showToast("Please choose at least one medical record category.");
      return;
    }
    if (!requestReason.trim()) {
      showToast("Please provide a clinical justification reason.");
      return;
    }

    const newRequest: SentRequestItem = {
      id: `req-${Date.now()}`,
      patient: selectedPatient,
      permission: permissionType,
      categories: [...selectedCategories],
      reason: requestReason.trim(),
      requestedDate: "Just now • Nov 12, 2026",
      status: "pending",
      statusText: "Pending patient approval",
    };

    setRequestsList((prev) => [newRequest, ...prev]);
    showToast(`Access request dispatched to ${selectedPatient.name} (${selectedPatient.pulseId})`);
  };

  const handleCancelRequest = (id: string) => {
    setRequestsList((prev) => prev.filter((r) => r.id !== id));
    if (selectedRequestDetails?.id === id) {
      setSelectedRequestDetails(null);
    }
    showToast("Access request canceled.");
  };

  // Filtered requests
  const filteredRequests = requestsList.filter((req) => {
    if (activeTab === "pending") return req.status === "pending";
    if (activeTab === "approved") return req.status === "approved";
    if (activeTab === "rejected") return req.status === "rejected";
    return true;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === "newest") return b.id.localeCompare(a.id);
    return a.id.localeCompare(b.id);
  });

  const allCount = requestsList.length;
  const pendingCount = requestsList.filter((r) => r.status === "pending").length;
  const approvedCount = requestsList.filter((r) => r.status === "approved").length;
  const rejectedCount = requestsList.filter((r) => r.status === "rejected").length;

  return (
    <div
      className="bg-white min-h-screen flex flex-col text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="353:10441"
      data-name="Access Requests · Desktop"
    >
      {/* 1. Website Header matching Figma Node 353:10442 / 353:10098 */}
      <DoctorNavbar />

      {/* Floating Notification Toast */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <p className="text-xs sm:text-sm font-medium">{toastNotification}</p>
        </div>
      )}

      <main className="flex-1 flex flex-col w-full">
        {/* 2. Page introduction matching Figma Node 353:10487 */}
        <div
          className="bg-[#f3f9fe] w-full shrink-0 border-b border-[#dde7ff]/40"
          data-node-id="353:10487"
          data-name="Page introduction"
        >
          <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-[32px] py-[32px] flex flex-col gap-[22px] items-start">
            {/* Breadcrumb matching Figma Node 353:10488 */}
            <div
              className="content-stretch flex gap-[8px] items-center relative shrink-0"
              data-node-id="353:10488"
              data-name="Breadcrumb"
            >
              <div className="relative shrink-0 size-[15px]" data-node-id="353:10489" data-name="house">
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
                data-node-id="353:10491"
              >
                Home
              </Link>
              <div className="relative shrink-0 size-[12px]" data-node-id="353:10492" data-name="chevron-right">
                <Image
                  src="/assets/doctor/find-patient/imgChevronRight.svg"
                  alt="Chevron right"
                  width={12}
                  height={12}
                  className="block size-full object-contain"
                />
              </div>
              <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] whitespace-nowrap" data-node-id="353:10494">
                Access Requests
              </p>
            </div>

            {/* Page title matching Figma Node 353:10495 */}
            <div
              className="break-words content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full"
              data-node-id="353:10495"
              data-name="Page title"
            >
              <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10496">
                Welcome back, {doctorDisplayName}
              </p>
              <h1 className="font-['Inter'] font-bold leading-[1.25] text-[32px] sm:text-[36px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10497">
                Access Requests
              </h1>
              <p className="font-['Inter'] font-normal leading-[1.5] text-[15px] sm:text-[16px] text-[#41474f] w-full" data-node-id="353:10498">
                Send medical record access requests to patients and track their response status.
              </p>
            </div>

            {/* Clinical quick actions matching Figma Node 353:10499 */}
            <div
              className="content-stretch flex flex-col sm:flex-row gap-[16px] items-start relative shrink-0 w-full"
              data-node-id="353:10499"
              data-name="Clinical quick actions"
            >
              {/* Action 1: Find Patient */}
              <Link
                href="/doctor/find-patient"
                className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto hover:bg-sky-50/50 transition-colors"
                data-node-id="353:10500"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10501" data-name="Destination title">
                  <div className="relative shrink-0 size-[22px]" data-node-id="353:10502" data-name="Icon">
                    <Image
                      src="/assets/doctor/find-patient/imgIcon.svg"
                      alt="Find Patient icon"
                      width={22}
                      height={22}
                      className="block size-full object-contain"
                    />
                  </div>
                  <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#02307d]" data-node-id="353:10503">
                    Find Patient
                  </p>
                </div>
                <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10504">
                  Secure patient lookup
                </p>
              </Link>

              {/* Action 2: Access Requests (Active) */}
              <Link
                href="/doctor/access-requests"
                className="bg-white border-[1.5px] border-[#078bde] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto shadow-xs"
                data-node-id="353:10505"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10506" data-name="Destination title">
                  <div className="relative shrink-0 size-[22px]" data-node-id="353:10507" data-name="Icon">
                    <Image
                      src="/assets/doctor/find-patient/imgIcon1.svg"
                      alt="Access Requests icon"
                      width={22}
                      height={22}
                      className="block size-full object-contain"
                    />
                  </div>
                  <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#078bde]" data-node-id="353:10508">
                    Access Requests
                  </p>
                </div>
                <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10509">
                  {allCount} requests sent
                </p>
              </Link>

              {/* Action 3: My Patients */}
              <Link
                href="/doctor/find-patient"
                className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-1 flex-col gap-[8px] items-start justify-center p-[16px] relative rounded-[12px] w-full sm:w-auto hover:bg-sky-50/50 transition-colors"
                data-node-id="353:10510"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-node-id="353:10511" data-name="Destination title">
                  <div className="relative shrink-0 size-[22px]" data-node-id="353:10512" data-name="Patient directory icon">
                    <Image
                      src="/assets/doctor/find-patient/imgGroup.svg"
                      alt="My Patients icon"
                      width={22}
                      height={22}
                      className="block size-full object-contain"
                    />
                  </div>
                  <p className="break-words flex-1 font-['Inter'] font-semibold leading-[1.4] text-[15px] text-[#02307d]" data-node-id="353:10518">
                    My Patients
                  </p>
                </div>
                <p className="break-words font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10519">
                  148 patients in your care
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Patient permission requests container matching Figma Node 353:10520 */}
        <div
          className="w-full bg-white shrink-0"
          data-node-id="353:10520"
          data-name="Patient permission requests"
        >
          <div className="content-stretch flex flex-col gap-[24px] items-start pb-[48px] pt-[32px] px-4 sm:px-[32px] relative w-full max-w-[1280px] mx-auto">
            {/* New access request card matching Figma Node 353:10521 */}
            <div
              className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start p-5 sm:p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
              data-node-id="353:10521"
              data-name="New access request"
            >
              {/* Form header matching Figma Node 353:10522 */}
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="353:10522" data-name="Form header">
                <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative" data-node-id="353:10523" data-name="Title block">
                  <h2 className="font-['Inter'] font-bold leading-[1.25] text-[20px] sm:text-[22px] text-[#02307d] tracking-[-0.4px] whitespace-nowrap" data-node-id="353:10524">
                    New access request
                  </h2>
                  <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10525">
                    Create a draft request before sending it to the patient. This draft is not yet sent.
                  </p>
                </div>
                <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="353:10526" data-name="Draft badge">
                  <span className="font-['Inter'] font-semibold leading-[1.3] text-[11px] text-[#078bde] whitespace-nowrap" data-node-id="353:10527">
                    Draft
                  </span>
                </div>
              </div>

              {/* Form body matching Figma Node 353:10528 */}
              <div className="content-stretch flex flex-col lg:flex-row gap-[20px] items-start relative shrink-0 w-full" data-node-id="353:10528" data-name="Form body">
                {/* Left column matching Figma Node 353:10529 */}
                <div className="content-stretch flex flex-1 flex-col gap-[16px] items-start relative w-full" data-node-id="353:10529" data-name="Left column">
                  {/* Patient search field */}
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="353:10530" data-name="Patient field">
                    <label className="font-['Inter'] font-semibold text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10531">
                      Patient
                    </label>
                    <div className="relative w-full">
                      <div
                        className="bg-white border border-[#dde7ff] border-solid content-stretch flex gap-[10px] items-center min-h-[44px] p-[12px] relative rounded-[8px] shrink-0 w-full focus-within:border-[#078bde] transition-colors"
                        data-node-id="353:10532"
                        data-name="Searchable patient field"
                      >
                        <div className="relative shrink-0 size-[16px]" data-node-id="353:10533" data-name="search">
                          <Image
                            src="/assets/doctor/access-requests/imgSearch.svg"
                            alt="Search"
                            width={16}
                            height={16}
                            className="block size-full object-contain"
                          />
                        </div>
                        <input
                          type="text"
                          value={patientSearchQuery}
                          onChange={(e) => {
                            setPatientSearchQuery(e.target.value);
                            setShowPatientDropdown(true);
                          }}
                          onFocus={() => setShowPatientDropdown(true)}
                          placeholder="Search by name or Pulse ID"
                          className="flex-1 font-['Inter'] font-normal text-[14px] text-[#02307d] placeholder:text-[#8b8b8b] bg-transparent outline-none w-full"
                          data-node-id="353:10535"
                        />
                      </div>

                      {/* Patient Dropdown options */}
                      {showPatientDropdown && (
                        <div className="absolute top-[50px] left-0 right-0 z-30 bg-white border border-[#dde7ff] rounded-xl shadow-xl overflow-hidden py-1">
                          {AVAILABLE_PATIENTS.filter(
                            (p) =>
                              !patientSearchQuery ||
                              p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                              p.pulseId.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
                              p.nationalId.includes(patientSearchQuery)
                          ).map((patient) => (
                            <button
                              key={patient.id}
                              type="button"
                              onClick={() => {
                                setSelectedPatient(patient);
                                setPatientSearchQuery("");
                                setShowPatientDropdown(false);
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-sky-50 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                            >
                              <div>
                                <p className="font-semibold text-sm text-[#02307d]">{patient.name}</p>
                                <p className="text-xs text-[#64748b]">{patient.pulseId} • {patient.age} • {patient.sex}</p>
                              </div>
                              <span className="text-xs font-medium text-[#078bde] bg-sky-50 px-2.5 py-1 rounded-md">
                                Select
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected patient card matching Figma Node 353:10536 */}
                  <div
                    className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full"
                    data-node-id="353:10536"
                    data-name="Selected patient"
                  >
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="353:10537" data-name="Selected patient header">
                      <p className="font-['Inter'] font-semibold text-[13px] text-[#078bde] whitespace-nowrap" data-node-id="353:10538">
                        Selected patient
                      </p>
                      <div className="bg-[rgba(68,239,99,0.1)] content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="353:10539" data-name="Selected badge">
                        <span className="font-['Inter'] font-semibold leading-[1.3] text-[11px] text-[#047857] whitespace-nowrap" data-node-id="353:10540">
                          Selected
                        </span>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-node-id="353:10541" data-name="Patient summary">
                      <div className="relative rounded-[12px] shrink-0 size-[48px] overflow-hidden bg-slate-100" data-node-id="353:10542" data-name="Patient photo">
                        {selectedPatient.photoUrl ? (
                          <Image
                            src={selectedPatient.photoUrl}
                            alt={selectedPatient.name}
                            width={48}
                            height={48}
                            className="block size-full object-cover rounded-[12px]"
                          />
                        ) : (
                          <div
                            className={`size-full rounded-[12px] flex items-center justify-center font-bold text-base ${
                              selectedPatient.avatarBg || "bg-[#dbeafe]"
                            } ${selectedPatient.avatarTextColor || "text-[#078bde]"}`}
                          >
                            {selectedPatient.initials}
                          </div>
                        )}
                      </div>
                      <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative" data-node-id="353:10543" data-name="Patient details">
                        <p className="font-['Inter'] font-bold leading-[1.25] text-[16px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10544">
                          {selectedPatient.name}
                        </p>
                        <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10545">
                          Pulse ID: {selectedPatient.pulseId}
                        </p>
                        <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10546">
                          {selectedPatient.age} • {selectedPatient.sex}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Permission selector matching Figma Node 353:10547 */}
                  <div
                    className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full"
                    data-node-id="353:10547"
                    data-name="Permission selector"
                  >
                    <label className="font-['Inter'] font-semibold text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10548">
                      Permission
                    </label>
                    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="353:10549" data-name="Permission options">
                      {/* View option */}
                      <button
                        type="button"
                        onClick={() => setPermissionType("View")}
                        className={`content-stretch flex flex-1 items-center justify-center min-w-px px-[14px] py-[10px] relative rounded-[8px] border border-solid transition-all cursor-pointer ${
                          permissionType === "View"
                            ? "bg-[#078bde] border-[#078bde] text-white shadow-xs"
                            : "bg-white border-[#dde7ff] text-[#02307d] hover:bg-slate-50"
                        }`}
                        data-node-id="353:10550"
                        data-name="View option"
                      >
                        <span className="font-['Inter'] font-semibold text-[14px] whitespace-nowrap" data-node-id="353:10551">
                          View
                        </span>
                      </button>

                      {/* Edit option */}
                      <button
                        type="button"
                        onClick={() => setPermissionType("Edit")}
                        className={`content-stretch flex flex-1 items-center justify-center min-w-px px-[14px] py-[10px] relative rounded-[8px] border border-solid transition-all cursor-pointer ${
                          permissionType === "Edit"
                            ? "bg-[#078bde] border-[#078bde] text-white shadow-xs"
                            : "bg-white border-[#dde7ff] text-[#02307d] hover:bg-slate-50"
                        }`}
                        data-node-id="353:10552"
                        data-name="Edit option"
                      >
                        <span className="font-['Inter'] font-semibold text-[14px] whitespace-nowrap" data-node-id="353:10553">
                          Edit
                        </span>
                      </button>
                    </div>
                    <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10554">
                      View lets you read the authorized records without changing them. Edit lets you update only the categories the patient approves.
                    </p>
                  </div>

                  {/* Categories matching Figma Node 353:10555 */}
                  <div
                    className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full"
                    data-node-id="353:10555"
                    data-name="Categories"
                  >
                    <label className="font-['Inter'] font-semibold text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10556">
                      Categories
                    </label>
                    <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 gap-[12px] items-start relative shrink-0 w-full" data-node-id="353:10557" data-name="Category grid">
                      {ALL_RECORD_CATEGORIES.map((category) => {
                        const isChecked = selectedCategories.includes(category);

                        return (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleCategory(category)}
                            className={`border border-solid content-stretch flex gap-[10px] items-center p-[12px] relative rounded-[10px] transition-all cursor-pointer text-left ${
                              isChecked
                                ? "bg-[#078bde] border-[#078bde] text-white shadow-xs"
                                : "bg-white border-[#dde7ff] text-[#02307d] hover:border-sky-300"
                            }`}
                          >
                            <div
                              className={`content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[18px] transition-colors ${
                                isChecked
                                  ? "bg-white text-[#078bde]"
                                  : "bg-[#eaedf6] border border-[#dde7ff]"
                              }`}
                            >
                              {isChecked && (
                                <Image
                                  src="/assets/doctor/access-requests/imgCheck.svg"
                                  alt="Checked"
                                  width={12}
                                  height={12}
                                  className="block size-full object-contain"
                                />
                              )}
                            </div>
                            <span className="font-['Inter'] font-semibold text-[14px]">
                              {category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right column matching Figma Node 353:10583 */}
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full lg:w-[360px]" data-node-id="353:10583" data-name="Right column">
                  {/* Reason card matching Figma Node 353:10584 */}
                  <div
                    className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full"
                    data-node-id="353:10584"
                    data-name="Reason"
                  >
                    <label className="font-['Inter'] font-semibold text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10585">
                      Reason
                    </label>
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      rows={4}
                      placeholder="Specify reason for medical records access..."
                      className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col items-start min-h-[120px] p-[12px] relative rounded-[8px] shrink-0 w-full font-['Inter'] font-normal text-[14px] text-[#02307d] outline-none focus:border-[#078bde] resize-none"
                      data-node-id="353:10586"
                    />
                    <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10588">
                      Patients see this reason when they receive the request.
                    </p>
                  </div>

                  {/* Send action card matching Figma Node 353:10589 */}
                  <div
                    className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-full"
                    data-node-id="353:10589"
                    data-name="Send action"
                  >
                    <h3 className="font-['Inter'] font-semibold text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10590">
                      Send access request
                    </h3>
                    <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10591">
                      Sending notifies the patient in Pulse ID. They review your reason, categories and permission, then approve or reject.
                    </p>
                    <button
                      type="button"
                      onClick={handleSendRequest}
                      className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 w-full transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                      data-node-id="353:10592"
                      data-name="Primary action"
                    >
                      <span className="font-['Inter'] font-semibold text-[14px] text-white whitespace-nowrap" data-node-id="353:10593">
                        Send Access Request
                      </span>
                    </button>
                    <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10594">
                      Once sent, the request appears below in the Pending tab.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy guidance banner matching Figma Node 353:10595 */}
            <div
              className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full"
              data-node-id="353:10595"
              data-name="Privacy guidance"
            >
              <div className="relative shrink-0 size-[22px]" data-node-id="353:10596" data-name="Icon">
                <Image
                  src="/assets/doctor/find-patient/imgIcon1.svg"
                  alt="Guidance shield"
                  width={22}
                  height={22}
                  className="block size-full object-contain"
                />
              </div>
              <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start leading-[1.5] relative" data-node-id="353:10597" data-name="Guidance">
                <p className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10598">
                  {allCount} requests sent to patients
                </p>
                <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] w-full" data-node-id="353:10599">
                  Patients receive your request and approve or reject it. Approved access is limited to the selected medical record categories.
                </p>
              </div>
            </div>

            {/* Requests toolbar matching Figma Node 353:10600 */}
            <div
              className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full pt-4"
              data-node-id="353:10600"
              data-name="Requests toolbar"
            >
              {/* Category tabs matching Figma Node 353:10601 */}
              <div
                className="border-b border-[#dde7ff] border-solid content-stretch flex gap-[24px] sm:gap-[32px] items-start leading-normal pb-[14px] relative shrink-0 text-[14px] w-full overflow-x-auto whitespace-nowrap"
                data-node-id="353:10601"
                data-name="Request categories"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`font-['Inter'] font-semibold relative shrink-0 cursor-pointer transition-colors pb-[14px] -mb-[15px] ${
                    activeTab === "all"
                      ? "text-[#078bde] border-b-2 border-[#078bde]"
                      : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10602"
                >
                  All ({allCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("pending")}
                  className={`font-['Inter'] font-semibold relative shrink-0 cursor-pointer transition-colors pb-[14px] -mb-[15px] ${
                    activeTab === "pending"
                      ? "text-[#078bde] border-b-2 border-[#078bde]"
                      : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10603"
                >
                  Pending ({pendingCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("approved")}
                  className={`font-['Inter'] font-medium relative shrink-0 cursor-pointer transition-colors pb-[14px] -mb-[15px] ${
                    activeTab === "approved"
                      ? "text-[#078bde] border-b-2 border-[#078bde]"
                      : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10604"
                >
                  Approved ({approvedCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("rejected")}
                  className={`font-['Inter'] font-medium relative shrink-0 cursor-pointer transition-colors pb-[14px] -mb-[15px] ${
                    activeTab === "rejected"
                      ? "text-[#078bde] border-b-2 border-[#078bde]"
                      : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10605"
                >
                  Rejected ({rejectedCount})
                </button>
              </div>

              {/* List heading matching Figma Node 353:10606 */}
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="353:10606" data-name="List heading">
                <div className="break-words content-stretch flex flex-1 flex-col gap-[5px] items-start relative" data-node-id="353:10607" data-name="List introduction">
                  <h3 className="font-['Inter'] font-bold leading-[1.25] text-[20px] sm:text-[22px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10608">
                    Sent requests
                  </h3>
                  <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10609">
                    Requests you have sent to patients for medical record access.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
                  className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-sky-50 transition-colors"
                  data-node-id="353:10610"
                  data-name="Action"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="353:10611" data-name="arrow-down-wide-narrow">
                    <Image
                      src="/assets/doctor/access-requests/imgArrowDownWideNarrow.svg"
                      alt="Sort"
                      width={16}
                      height={16}
                      className="block size-full object-contain"
                    />
                  </div>
                  <span className="font-['Inter'] font-semibold text-[14px] text-[#078bde] whitespace-nowrap" data-node-id="353:10613">
                    {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                  </span>
                </button>
              </div>
            </div>

            {/* Pending & Sent Request list matching Figma Node 353:10614 */}
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10614" data-name="Pending request list">
              {sortedRequests.length === 0 ? (
                <div className="w-full p-12 text-center bg-slate-50 border border-[#dde7ff] rounded-2xl text-[#64748b]">
                  <p className="text-base font-medium">No access requests found in this category.</p>
                </div>
              ) : (
                sortedRequests.map((req) => {
                  const isPending = req.status === "pending";
                  const isApproved = req.status === "approved";
                  const isRejected = req.status === "rejected";

                  return (
                    <div
                      key={req.id}
                      className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[18px] items-start p-5 sm:p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full hover:border-sky-300 transition-colors"
                      data-node-id="353:10615"
                      data-name="Doctor-sent access request"
                    >
                      {/* Overview */}
                      <div className="content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[20px] items-start sm:items-center justify-between relative shrink-0 w-full" data-node-id="353:10616" data-name="Request overview">
                        <div className="content-stretch flex flex-1 gap-[14px] items-center relative" data-node-id="353:10617" data-name="Patient identity">
                          <div className="relative rounded-[12px] shrink-0 size-[48px] overflow-hidden bg-slate-100" data-node-id="353:10618" data-name="Patient avatar">
                            {req.patient.photoUrl ? (
                              <Image
                                src={req.patient.photoUrl}
                                alt={req.patient.name}
                                width={48}
                                height={48}
                                className="block size-full object-cover rounded-[12px]"
                              />
                            ) : (
                              <div
                                className={`size-full rounded-[12px] flex items-center justify-center font-bold text-[17px] ${
                                  req.patient.avatarBg || "bg-[#dbeafe]"
                                } ${req.patient.avatarTextColor || "text-[#078bde]"}`}
                              >
                                {req.patient.initials}
                              </div>
                            )}
                          </div>
                          <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative" data-node-id="353:10619" data-name="Patient details">
                            <p className="font-['Inter'] font-bold leading-[1.25] text-[17px] sm:text-[18px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10620">
                              {req.patient.name}
                            </p>
                            <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10621">
                              Patient ID: {req.patient.pulseId} · {req.patient.age}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0 ${
                            isPending
                              ? "bg-[#fff7e6]"
                              : isApproved
                              ? "bg-[#ecfdf5]"
                              : "bg-[#fee2e2]"
                          }`}
                          data-node-id="353:10622"
                          data-name="Status"
                        >
                          <span
                            className={`font-['Inter'] font-semibold leading-[1.3] text-[11px] whitespace-nowrap ${
                              isPending
                                ? "text-[#996800]"
                                : isApproved
                                ? "text-[#047857]"
                                : "text-[#ef4444]"
                            }`}
                            data-node-id="353:10623"
                          >
                            {req.statusText}
                          </span>
                        </div>
                      </div>

                      {/* Permission details */}
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="353:10624" data-name="Permission details">
                        <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px] w-full" data-node-id="353:10625">
                          Permission: {req.permission} • Requested medical record categories
                        </p>
                        <p className="font-['Inter'] font-semibold leading-[1.5] text-[14px] text-[#02307d] w-full" data-node-id="353:10626">
                          {req.categories.join(" and ")}
                        </p>
                        <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-node-id="353:10627" data-name="Request date">
                          <div className="relative shrink-0 size-[14px]" data-node-id="353:10628" data-name="clock-3">
                            <Image
                              src={
                                isRejected
                                  ? "/assets/doctor/access-requests/imgClock4.svg"
                                  : "/assets/doctor/access-requests/imgClock3.svg"
                              }
                              alt="Clock"
                              width={14}
                              height={14}
                              className="block size-full object-contain"
                            />
                          </div>
                          <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px]" data-node-id="353:10630">
                            Requested: {req.requestedDate}
                          </p>
                        </div>
                      </div>

                      {/* Decision controls */}
                      <div className="border-t border-[#e9effd] border-solid content-stretch flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-[16px] relative shrink-0 w-full" data-node-id="353:10631" data-name="Decision controls">
                        <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[12px]" data-node-id="353:10632">
                          {isPending && "Awaiting patient approval."}
                          {isApproved && "Patient approved access to authorized records only."}
                          {isRejected && "Patient rejected this request. No record access is available."}
                        </p>
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full sm:w-auto justify-end" data-node-id="353:10633" data-name="Request actions">
                          <button
                            type="button"
                            onClick={() => setSelectedRequestDetails(req)}
                            className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-sky-50 transition-colors"
                            data-node-id="353:10634"
                            data-name="Action"
                          >
                            <span className="font-['Inter'] font-semibold text-[14px] text-[#078bde] whitespace-nowrap" data-node-id="353:10635">
                              View Request Details
                            </span>
                          </button>

                          {isPending && (
                            <button
                              type="button"
                              onClick={() => handleCancelRequest(req.id)}
                              className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 text-white font-semibold text-[14px] whitespace-nowrap cursor-pointer transition-colors shadow-xs"
                              data-node-id="353:10636"
                              data-name="Action"
                            >
                              Cancel
                            </button>
                          )}

                          {isApproved && (
                            <Link
                              href={`/doctor/find-patient?q=${encodeURIComponent(req.patient.pulseId)}`}
                              className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] px-[16px] py-[10px] relative rounded-[8px] shrink-0 text-white font-semibold text-[14px] whitespace-nowrap cursor-pointer transition-colors shadow-xs"
                              data-node-id="353:10660"
                              data-name="Action"
                            >
                              View Authorized Records
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Showing all requests count */}
            <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10684">
              Showing all {sortedRequests.length} sent requests
            </p>

            {/* Privacy guidance banner 2 matching Figma Node 353:10685 */}
            <div
              className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[14px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full"
              data-node-id="353:10685"
              data-name="Privacy guidance"
            >
              <div className="relative shrink-0 size-[22px]" data-node-id="353:10686" data-name="Icon">
                <Image
                  src="/assets/doctor/find-patient/imgIcon1.svg"
                  alt="Guidance"
                  width={22}
                  height={22}
                  className="block size-full object-contain"
                />
              </div>
              <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start leading-[1.5] relative" data-node-id="353:10687" data-name="Guidance">
                <p className="font-['Inter'] font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10688">
                  Permission is granted by the patient
                </p>
                <p className="font-['Inter'] font-normal text-[#64748b] text-[13px] w-full" data-node-id="353:10689">
                  Approved access is limited to the selected medical record categories. Pending requests can be canceled before the patient responds. Rejected requests do not grant any access.
                </p>
              </div>
            </div>

            {/* Request details panel matching Figma Node 353:10690 */}
            {selectedRequestDetails && (
              <div
                className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start p-5 sm:p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full animate-in fade-in duration-200"
                data-node-id="353:10690"
                data-name="Request details panel"
              >
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="353:10691" data-name="Panel header">
                  <div className="break-words content-stretch flex flex-1 flex-col gap-[4px] items-start relative" data-node-id="353:10692" data-name="Title block">
                    <h3 className="font-['Inter'] font-bold leading-[1.25] text-[18px] text-[#02307d] tracking-[-0.4px] whitespace-nowrap" data-node-id="353:10693">
                      Request details
                    </h3>
                    <p className="font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px] w-full" data-node-id="353:10694">
                      Read-only summary for the selected request.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`content-stretch flex items-start px-[10px] py-[5px] relative rounded-[100px] shrink-0 ${
                        selectedRequestDetails.status === "pending"
                          ? "bg-[#fff7e6] text-[#996800]"
                          : selectedRequestDetails.status === "approved"
                          ? "bg-[#ecfdf5] text-[#047857]"
                          : "bg-[#fee2e2] text-[#ef4444]"
                      }`}
                      data-node-id="353:10695"
                      data-name="Status"
                    >
                      <span className="font-['Inter'] font-semibold leading-[1.3] text-[11px] whitespace-nowrap" data-node-id="353:10696">
                        {selectedRequestDetails.statusText}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedRequestDetails(null)}
                      className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="break-words content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10697" data-name="Details grid">
                  {/* Row 1 */}
                  <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10698" data-name="Row 1">
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10699" data-name="Sender">
                      <p className="text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10700">
                        Sender
                      </p>
                      <p className="font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10701">
                        {doctorDisplayName}
                      </p>
                    </div>
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10702" data-name="Recipient">
                      <p className="text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10703">
                        Recipient
                      </p>
                      <p className="font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10704">
                        {selectedRequestDetails.patient.name} · {selectedRequestDetails.patient.pulseId}
                      </p>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10705" data-name="Row 2">
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10706" data-name="Reason">
                      <p className="font-semibold text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10707">
                        Reason
                      </p>
                      <p className="font-normal leading-[1.5] text-[14px] text-[#02307d] w-full" data-node-id="353:10708">
                        {selectedRequestDetails.reason}
                      </p>
                    </div>
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10709" data-name="Categories">
                      <p className="font-semibold text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10710">
                        Categories
                      </p>
                      <p className="font-normal leading-[1.5] text-[14px] text-[#02307d] w-full" data-node-id="353:10711">
                        {selectedRequestDetails.categories.join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10712" data-name="Row 3">
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10713" data-name="Permission">
                      <p className="font-semibold text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10714">
                        Permission
                      </p>
                      <p className="font-semibold text-[14px] text-[#02307d] w-full" data-node-id="353:10715">
                        {selectedRequestDetails.permission}
                      </p>
                    </div>
                    <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[6px] items-start p-[16px] relative rounded-[12px] w-full" data-node-id="353:10716" data-name="Submitted">
                      <p className="font-semibold text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10717">
                        Submitted
                      </p>
                      <p className="font-normal leading-[1.5] text-[14px] text-[#02307d] w-full" data-node-id="353:10718">
                        {selectedRequestDetails.requestedDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* State note */}
                <div
                  className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[10px] items-center p-[16px] relative rounded-[12px] shrink-0 w-full"
                  data-node-id="353:10719"
                  data-name="State note"
                >
                  <div className="relative shrink-0 size-[18px]" data-node-id="353:10720" data-name="clock">
                    <Image
                      src="/assets/doctor/access-requests/imgClock.svg"
                      alt="Clock"
                      width={18}
                      height={18}
                      className="block size-full object-contain"
                    />
                  </div>
                  <p className="flex-1 font-['Inter'] font-normal leading-[1.5] text-[#64748b] text-[13px]" data-node-id="353:10722">
                    {selectedRequestDetails.status === "pending"
                      ? "Pending patient approval. The patient can approve or reject this request from their Pulse ID account."
                      : selectedRequestDetails.status === "approved"
                      ? "Request approved. You have authorized access to the approved medical categories."
                      : "Request rejected. The patient declined access to these medical categories."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. Unified Website Footer matching Figma Node 353:10723 / 353:10951 */}
      <DoctorFooter />
    </div>
  );
}

export default function AccessRequestsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#02307d] flex items-center justify-center text-white">
          <p className="font-medium animate-pulse text-sm">Loading Access Requests...</p>
        </div>
      }
    >
      <AccessRequestsContent />
    </Suspense>
  );
}
