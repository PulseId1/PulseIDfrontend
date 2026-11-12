"use client";

import React, { useState, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

const imgPatientPhoto = "/assets/doctor/access-requests/imgPatientPhoto.png";
const imgPatientAvatar = "/assets/doctor/access-requests/imgPatientAvatar.png";
const imgHouse = "/assets/doctor/access-requests/imgHouse.svg";
const imgChevronRight = "/assets/doctor/access-requests/imgChevronRight.svg";
const imgIcon = "/assets/doctor/access-requests/imgIcon.svg";
const imgIcon1 = "/assets/doctor/access-requests/imgIcon1.svg";
const imgGroup = "/assets/doctor/access-requests/imgGroup.svg";
const imgSearch = "/assets/doctor/access-requests/imgSearch.svg";
const imgCheck = "/assets/doctor/access-requests/imgCheck.svg";
const imgArrowDownWideNarrow = "/assets/doctor/access-requests/imgArrowDownWideNarrow.svg";
const imgClock3 = "/assets/doctor/access-requests/imgClock3.svg";
const imgClock4 = "/assets/doctor/access-requests/imgClock4.svg";
const imgClock = "/assets/doctor/access-requests/imgClock.svg";

interface AccessRequestData {
  id: string;
  patientName: string;
  patientPulseId: string;
  patientAge: string;
  patientSex: string;
  avatarType: "image" | "initials";
  avatarImage?: string;
  initials?: string;
  avatarBg?: string;
  avatarTextColor?: string;
  status: "pending" | "approved" | "rejected";
  statusText: string;
  statusBg: string;
  statusTextColor: string;
  permission: "View" | "Edit";
  categories: string;
  requestedDate: string;
  clockIcon: string;
  decisionNote: string;
  reason: string;
}

const DEFAULT_REQUESTS: AccessRequestData[] = [
  {
    id: "req-1",
    patientName: "Tarek Ibrahim",
    patientPulseId: "PID-7731-EGY",
    patientAge: "52 Yrs",
    patientSex: "Male",
    avatarType: "image",
    avatarImage: imgPatientAvatar,
    status: "pending",
    statusText: "Pending patient approval",
    statusBg: "bg-[#fff7e6]",
    statusTextColor: "text-[#996800]",
    permission: "View",
    categories: "Cardiology and Vital Signs",
    requestedDate: "Nov 3, 2026 • 11:00 AM",
    clockIcon: imgClock3,
    decisionNote: "Awaiting patient approval.",
    reason: "Review cardiology trajectory and monitor telemetry vital signs post-infarction.",
  },
  {
    id: "req-2",
    patientName: "Farida El-Sayed",
    patientPulseId: "PID-4102-EGY",
    patientAge: "28 Yrs",
    patientSex: "Female",
    avatarType: "initials",
    initials: "FE",
    avatarBg: "bg-[#dbeafe]",
    avatarTextColor: "text-[#078bde]",
    status: "approved",
    statusText: "Approved",
    statusBg: "bg-[#ecfdf5]",
    statusTextColor: "text-[#047857]",
    permission: "View",
    categories: "Lab Results only",
    requestedDate: "Nov 2, 2026 • 10:45 AM",
    clockIcon: imgClock3,
    decisionNote: "Patient approved access to authorized records only.",
    reason: "Routine outpatient clinical laboratory review and endocrine follow-up.",
  },
  {
    id: "req-3",
    patientName: "Omar Abdelaziz",
    patientPulseId: "PID-6185-EGY",
    patientAge: "41 Yrs",
    patientSex: "Male",
    avatarType: "initials",
    initials: "OA",
    avatarBg: "bg-[#fee2e2]",
    avatarTextColor: "text-[#ef4444]",
    status: "rejected",
    statusText: "Rejected",
    statusBg: "bg-[#fee2e2]",
    statusTextColor: "text-[#ef4444]",
    permission: "Edit",
    categories: "Clinical Notes",
    requestedDate: "Nov 1, 2026 • 08:20 AM",
    clockIcon: imgClock4,
    decisionNote: "Patient rejected this request. No record access is available.",
    reason: "Review clinical consult notes prior to surgical admission.",
  },
];

function AccessRequestsContent() {
  const { isDemo } = useAuth();
  const detailsPanelRef = useRef<HTMLDivElement>(null);

  // Active doctor
  const activeAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const doctorDisplayName =
    isDemo && activeAccount?.fullName ? activeAccount.fullName : "Dr. Mohamed";

  // Form State
  const [selectedPermission, setSelectedPermission] = useState<"View" | "Edit">("View");
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({
    "Lab Results": true,
    "Prescription History": true,
    "Clinical Notes": false,
    Radiology: false,
    Cardiology: false,
    "Vital Signs": false,
  });
  const [reasonText, setReasonText] = useState(
    "Review recent laboratory findings and medication history before the diabetes follow-up consultation."
  );

  // List & Filter State
  const [requests, setRequests] = useState<AccessRequestData[]>(DEFAULT_REQUESTS);
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // In-page Request Details Panel State
  const [inspectedRequest, setInspectedRequest] = useState<{
    sender: string;
    recipient: string;
    reason: string;
    categories: string;
    permission: string;
    submitted: string;
    statusText: string;
    statusBg: string;
    statusTextColor: string;
  }>({
    sender: doctorDisplayName,
    recipient: "Ahmed Hassan · PID-8924-EGY",
    reason: "Review recent laboratory findings and medication history before the diabetes follow-up consultation.",
    categories: "Lab Results, Prescription History",
    permission: "View",
    submitted: "Nov 5, 2026 • 09:15 AM",
    statusText: "Pending patient approval",
    statusBg: "bg-[#fff7e6]",
    statusTextColor: "text-[#996800]",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleSendAccessRequest = () => {
    const activeCats = Object.keys(selectedCategories).filter((k) => selectedCategories[k]);
    if (activeCats.length === 0) {
      showToast("Please select at least one record category.");
      return;
    }
    if (!reasonText.trim()) {
      showToast("Please enter a reason for the access request.");
      return;
    }

    const newReq: AccessRequestData = {
      id: `req-${requests.length + 1}`,
      patientName: "Ahmed Hassan",
      patientPulseId: "PID-8924-EGY",
      patientAge: "34 Yrs",
      patientSex: "Male",
      avatarType: "image",
      avatarImage: imgPatientPhoto,
      status: "pending",
      statusText: "Pending patient approval",
      statusBg: "bg-[#fff7e6]",
      statusTextColor: "text-[#996800]",
      permission: selectedPermission,
      categories: activeCats.join(" and "),
      requestedDate: "Nov 12, 2026 • 12:15 PM",
      clockIcon: imgClock3,
      decisionNote: "Awaiting patient approval.",
      reason: reasonText.trim(),
    };

    setRequests((prev) => [newReq, ...prev]);

    setInspectedRequest({
      sender: doctorDisplayName,
      recipient: "Ahmed Hassan · PID-8924-EGY",
      reason: reasonText.trim(),
      categories: activeCats.join(", "),
      permission: selectedPermission,
      submitted: "Nov 12, 2026 • 12:15 PM",
      statusText: "Pending patient approval",
      statusBg: "bg-[#fff7e6]",
      statusTextColor: "text-[#996800]",
    });

    showToast("Access request sent to Ahmed Hassan (PID-8924-EGY)");
  };

  const handleCancelRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    showToast("Access request canceled.");
  };

  const handleViewDetails = (req: AccessRequestData) => {
    setInspectedRequest({
      sender: doctorDisplayName,
      recipient: `${req.patientName} · ${req.patientPulseId}`,
      reason: req.reason,
      categories: req.categories,
      permission: req.permission,
      submitted: req.requestedDate,
      statusText: req.statusText,
      statusBg: req.statusBg,
      statusTextColor: req.statusTextColor,
    });
    detailsPanelRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter & Sort
  const filteredRequests = requests.filter((r) => {
    if (activeTab === "Pending") return r.status === "pending";
    if (activeTab === "Approved") return r.status === "approved";
    if (activeTab === "Rejected") return r.status === "rejected";
    return true;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === "newest") return b.id.localeCompare(a.id);
    return a.id.localeCompare(b.id);
  });

  return (
    <div
      className="bg-white content-stretch flex flex-col items-start relative size-full min-h-screen text-slate-900"
      data-node-id="353:10441"
      data-name="Access Requests · Desktop"
    >
      {/* 1. Website Header matching Figma Node 353:10442 / Node 353:10098 */}
      <DoctorNavbar />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307d] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      <main className="w-full flex-1 flex flex-col">
        {/* 2. Page introduction matching Figma Node 353:10487 */}
        <div
          className="bg-[#f3f9fe] content-stretch flex flex-col items-start overflow-clip w-full border-b border-[#dde7ff]/40"
          data-node-id="353:10487"
          data-name="Page introduction"
        >
          <div className="w-full max-w-[1280px] mx-auto p-[32px] flex flex-col gap-[22px] items-start">
            {/* Breadcrumb matching Figma Node 353:10488 */}
            <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0" data-node-id="353:10488" data-name="Breadcrumb">
              <div className="relative shrink-0 size-[15px]" data-node-id="353:10489" data-name="house">
                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgHouse} width={15} height={15} />
              </div>
              <Link
                href="/doctor"
                className="[word-break:break-word] font-['Inter'] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-[#078bde] hover:underline whitespace-nowrap"
                data-node-id="353:10491"
              >
                Home
              </Link>
              <div className="relative shrink-0 size-[12px]" data-node-id="353:10492" data-name="chevron-right">
                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronRight} width={12} height={12} />
              </div>
              <p className="[word-break:break-word] font-['Inter'] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[13px] whitespace-nowrap" data-node-id="353:10494">
                Access Requests
              </p>
            </div>

            {/* Page title matching Figma Node 353:10495 */}
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="353:10495" data-name="Page title">
              <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10496">
                Welcome back, {doctorDisplayName}
              </p>
              <h1 className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[36px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10497">
                Access Requests
              </h1>
              <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[16px] text-[#41474f] w-full" data-node-id="353:10498">
                Send medical record access requests to patients and track their response status.
              </p>
            </div>

            {/* Clinical quick actions matching Figma Node 353:10499 */}
            <div className="content-stretch flex flex-col sm:flex-row gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10499" data-name="Clinical quick actions">
              {/* Destination 1: Find Patient */}
              <Link
                href="/doctor/find-patient"
                className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px overflow-clip p-[16px] relative rounded-[12px] hover:bg-sky-50/50 transition-colors w-full sm:w-auto"
                data-node-id="353:10500"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10501" data-name="Destination title">
                  <div className="relative shrink-0 size-[22px]" data-node-id="353:10502" data-name="Icon">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon} width={22} height={22} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-semibold leading-[1.4] min-w-px not-italic relative text-[15px] text-[#02307d]" data-node-id="353:10503">
                    Find Patient
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full" data-node-id="353:10504">
                  Secure patient lookup
                </p>
              </Link>

              {/* Destination 2: Access Requests (Active) */}
              <Link
                href="/doctor/access-requests"
                className="bg-white border-[1.5px] border-[#078bde] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px overflow-clip p-[16px] relative rounded-[12px] shadow-xs w-full sm:w-auto"
                data-node-id="353:10505"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10506" data-name="Destination title">
                  <div className="relative shrink-0 size-[22px]" data-node-id="353:10507" data-name="Icon">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} width={22} height={22} />
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-semibold leading-[1.4] min-w-px not-italic relative text-[15px] text-[#078bde]" data-node-id="353:10508">
                    Access Requests
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full" data-node-id="353:10509">
                  5 requests sent
                </p>
              </Link>

              {/* Destination 3: My Patients */}
              <Link
                href="/doctor/find-patient"
                className="bg-[rgba(192,202,227,0.1)] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-w-px overflow-clip p-[16px] relative rounded-[12px] hover:bg-sky-50/50 transition-colors w-full sm:w-auto"
                data-node-id="353:10510"
                data-name="Destination"
              >
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10511" data-name="Destination title">
                  <div className="overflow-clip relative shrink-0 size-[22px]" data-node-id="353:10512" data-name="Patient directory icon">
                    <div className="absolute inset-[6.25%_10.42%]" data-node-id="353:10513" data-name="Group">
                      <div className="absolute inset-[-2.6%_-2.87%_-2.59%_-2.87%]">
                        <Image alt="" className="block max-w-none size-full" src={imgGroup} width={22} height={22} />
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-semibold leading-[1.4] min-w-px not-italic relative text-[15px] text-[#02307d]" data-node-id="353:10518">
                    My Patients
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full" data-node-id="353:10519">
                  148 patients in your care
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Patient permission requests matching Figma Node 353:10520 */}
        <div
          className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full bg-white"
          data-node-id="353:10520"
          data-name="Patient permission requests"
        >
          <div className="w-full max-w-[1280px] mx-auto pb-[48px] pt-[32px] px-[32px] flex flex-col gap-[24px] items-start">
            {/* New access request card matching Figma Node 353:10521 */}
            <div
              className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
              data-node-id="353:10521"
              data-name="New access request"
            >
              {/* Form header matching Figma Node 353:10522 */}
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="353:10522" data-name="Form header">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative" data-node-id="353:10523" data-name="Title block">
                  <p className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[22px] text-[#02307d] tracking-[-0.4px] whitespace-nowrap" data-node-id="353:10524">
                    New access request
                  </p>
                  <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#64748b] text-[13px] w-[min-content]" data-node-id="353:10525">
                    Create a draft request before sending it to the patient. This draft is not yet sent.
                  </p>
                </div>
                <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex items-start overflow-clip px-[10px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="353:10526" data-name="Draft badge">
                  <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.3] not-italic relative shrink-0 text-[11px] text-[#078bde] whitespace-nowrap" data-node-id="353:10527">
                    Draft
                  </p>
                </div>
              </div>

              {/* Form body matching Figma Node 353:10528 */}
              <div className="content-stretch flex flex-col lg:flex-row gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10528" data-name="Form body">
                {/* Left column matching Figma Node 353:10529 */}
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip relative w-full" data-node-id="353:10529" data-name="Left column">
                  {/* Patient field matching Figma Node 353:10530 */}
                  <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10530" data-name="Patient field">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10531">
                      Patient
                    </p>
                    <div className="bg-white border border-[#dde7ff] border-solid content-stretch flex gap-[10px] items-center min-h-[44px] overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="353:10532" data-name="Searchable patient field">
                      <div className="relative shrink-0 size-[16px]" data-node-id="353:10533" data-name="search">
                        <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} width={16} height={16} />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name or Pulse ID"
                        className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[normal] min-w-px not-italic relative text-[14px] text-[#02307d] placeholder:text-[#8b8b8b] bg-transparent outline-none w-full"
                        data-node-id="353:10535"
                      />
                    </div>
                  </div>

                  {/* Selected patient matching Figma Node 353:10536 */}
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10536" data-name="Selected patient">
                    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="353:10537" data-name="Selected patient header">
                      <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#078bde] whitespace-nowrap" data-node-id="353:10538">
                        Selected patient
                      </p>
                      <div className="bg-[rgba(68,239,99,0.1)] content-stretch flex items-start overflow-clip px-[10px] py-[5px] relative rounded-[100px] shrink-0" data-node-id="353:10539" data-name="Selected badge">
                        <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.3] not-italic relative shrink-0 text-[11px] text-[#047857] whitespace-nowrap" data-node-id="353:10540">
                          Selected
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[12px] items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10541" data-name="Patient summary">
                      <div className="relative rounded-[12px] shrink-0 size-[48px] overflow-hidden" data-node-id="353:10542" data-name="Patient photo">
                        <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgPatientPhoto} width={48} height={48} />
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative" data-node-id="353:10543" data-name="Patient details">
                        <p className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[16px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10544">
                          Ahmed Hassan
                        </p>
                        <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10545">
                          Pulse ID: PID-8924-EGY
                        </p>
                        <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10546">
                          34 Yrs • Male
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Permission selector matching Figma Node 353:10547 */}
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10547" data-name="Permission selector">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10548">
                      Permission
                    </p>
                    <div className="content-stretch flex gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10549" data-name="Permission options">
                      <button
                        type="button"
                        onClick={() => setSelectedPermission("View")}
                        className={`${
                          selectedPermission === "View"
                            ? "bg-[#078bde] border border-[#078bde]"
                            : "bg-white border border-[#dde7ff]"
                        } border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[14px] py-[10px] relative rounded-[8px] cursor-pointer transition-colors`}
                        data-node-id="353:10550"
                        data-name="View option"
                      >
                        <p className={`[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] ${
                          selectedPermission === "View" ? "text-white" : "text-[#02307d]"
                        } whitespace-nowrap`} data-node-id="353:10551">
                          View
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPermission("Edit")}
                        className={`${
                          selectedPermission === "Edit"
                            ? "bg-[#078bde] border border-[#078bde]"
                            : "bg-white border border-[#dde7ff]"
                        } border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[14px] py-[10px] relative rounded-[8px] cursor-pointer transition-colors`}
                        data-node-id="353:10552"
                        data-name="Edit option"
                      >
                        <p className={`[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] ${
                          selectedPermission === "Edit" ? "text-white" : "text-[#02307d]"
                        } whitespace-nowrap`} data-node-id="353:10553">
                          Edit
                        </p>
                      </button>
                    </div>
                    <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#64748b] text-[12px] w-[min-content]" data-node-id="353:10554">
                      View lets you read the authorized records without changing them. Edit lets you update only the categories the patient approves.
                    </p>
                  </div>

                  {/* Categories matching Figma Node 353:10555 */}
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10555" data-name="Categories">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10556">
                      Categories
                    </p>
                    <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10557" data-name="Category grid">
                      {/* Row 1 matching Figma Node 353:10558 */}
                      <div className="content-stretch flex flex-col sm:flex-row gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10558" data-name="Row 1">
                        <button
                          type="button"
                          onClick={() => toggleCategory("Lab Results")}
                          className={`${
                            selectedCategories["Lab Results"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10559"
                          data-name="Lab Results"
                        >
                          <div
                            className={`${
                              selectedCategories["Lab Results"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10560"
                            data-name="Frame"
                          >
                            {selectedCategories["Lab Results"] && (
                              <div className="relative shrink-0 size-[12px]" data-node-id="353:10561" data-name="check">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Lab Results"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10563">
                            Lab Results
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCategory("Prescription History")}
                          className={`${
                            selectedCategories["Prescription History"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10564"
                          data-name="Prescription History"
                        >
                          <div
                            className={`${
                              selectedCategories["Prescription History"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10565"
                            data-name="Frame"
                          >
                            {selectedCategories["Prescription History"] && (
                              <div className="relative shrink-0 size-[12px]" data-node-id="353:10566" data-name="check">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Prescription History"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10568">
                            Prescription History
                          </p>
                        </button>
                      </div>

                      {/* Row 2 matching Figma Node 353:10569 */}
                      <div className="content-stretch flex flex-col sm:flex-row gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10569" data-name="Row 2">
                        <button
                          type="button"
                          onClick={() => toggleCategory("Clinical Notes")}
                          className={`${
                            selectedCategories["Clinical Notes"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10570"
                          data-name="Clinical Notes"
                        >
                          <div
                            className={`${
                              selectedCategories["Clinical Notes"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10571"
                            data-name="Frame"
                          >
                            {selectedCategories["Clinical Notes"] && (
                              <div className="relative shrink-0 size-[12px]">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Clinical Notes"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10572">
                            Clinical Notes
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCategory("Radiology")}
                          className={`${
                            selectedCategories["Radiology"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10573"
                          data-name="Radiology"
                        >
                          <div
                            className={`${
                              selectedCategories["Radiology"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10574"
                            data-name="Frame"
                          >
                            {selectedCategories["Radiology"] && (
                              <div className="relative shrink-0 size-[12px]">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Radiology"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10575">
                            Radiology
                          </p>
                        </button>
                      </div>

                      {/* Row 3 matching Figma Node 353:10576 */}
                      <div className="content-stretch flex flex-col sm:flex-row gap-[12px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10576" data-name="Row 3">
                        <button
                          type="button"
                          onClick={() => toggleCategory("Cardiology")}
                          className={`${
                            selectedCategories["Cardiology"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10577"
                          data-name="Cardiology"
                        >
                          <div
                            className={`${
                              selectedCategories["Cardiology"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10578"
                            data-name="Frame"
                          >
                            {selectedCategories["Cardiology"] && (
                              <div className="relative shrink-0 size-[12px]">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Cardiology"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10579">
                            Cardiology
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCategory("Vital Signs")}
                          className={`${
                            selectedCategories["Vital Signs"]
                              ? "bg-[#078bde] border-[#078bde] text-white"
                              : "bg-white border-[#dde7ff] text-[#02307d]"
                          } border border-solid content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px overflow-clip p-[12px] relative rounded-[10px] cursor-pointer transition-colors w-full sm:w-auto text-left`}
                          data-node-id="353:10580"
                          data-name="Vital Signs"
                        >
                          <div
                            className={`${
                              selectedCategories["Vital Signs"]
                                ? "bg-white"
                                : "bg-[#eaedf6] border border-[#dde7ff]"
                            } content-stretch flex items-center justify-center overflow-clip relative rounded-[6px] shrink-0 size-[18px]`}
                            data-node-id="353:10581"
                            data-name="Frame"
                          >
                            {selectedCategories["Vital Signs"] && (
                              <div className="relative shrink-0 size-[12px]">
                                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} width={12} height={12} />
                              </div>
                            )}
                          </div>
                          <p className={`[word-break:break-word] flex-[1_0_0] font-['Inter'] ${
                            selectedCategories["Vital Signs"] ? "font-semibold text-white" : "font-normal text-[#02307d]"
                          } leading-[normal] min-w-px not-italic relative text-[14px]`} data-node-id="353:10582">
                            Vital Signs
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column matching Figma Node 353:10583 */}
                <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full lg:w-[360px]" data-node-id="353:10583" data-name="Right column">
                  {/* Reason matching Figma Node 353:10584 */}
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10584" data-name="Reason">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10585">
                      Reason
                    </p>
                    <div className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col items-start min-h-[120px] overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full" data-node-id="353:10586" data-name="Textarea">
                      <textarea
                        value={reasonText}
                        onChange={(e) => setReasonText(e.target.value)}
                        className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[14px] text-[#02307d] w-full resize-none outline-none bg-transparent"
                        data-node-id="353:10587"
                        rows={4}
                      />
                    </div>
                    <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#64748b] text-[12px] w-[min-content]" data-node-id="353:10588">
                      Patients see this reason when they receive the request.
                    </p>
                  </div>

                  {/* Send action matching Figma Node 353:10589 */}
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[12px] items-start overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10589" data-name="Send action">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-[#02307d] whitespace-nowrap" data-node-id="353:10590">
                      Send access request
                    </p>
                    <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#64748b] text-[13px] w-[min-content]" data-node-id="353:10591">
                      Sending notifies the patient in Pulse ID. They review your reason, categories and permission, then approve or reject.
                    </p>
                    <button
                      type="button"
                      onClick={handleSendAccessRequest}
                      className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 w-full cursor-pointer transition-colors shadow-xs active:scale-[0.99]"
                      data-node-id="353:10592"
                      data-name="Primary action"
                    >
                      <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="353:10593">
                        Send Access Request
                      </p>
                    </button>
                    <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] min-w-full not-italic relative shrink-0 text-[#64748b] text-[12px] w-[min-content]" data-node-id="353:10594">
                      Once sent, the request appears below in the Pending tab.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy guidance matching Figma Node 353:10595 */}
            <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10595" data-name="Privacy guidance">
              <div className="relative shrink-0 size-[22px]" data-node-id="353:10596" data-name="Icon">
                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} width={22} height={22} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="353:10597" data-name="Guidance">
                <p className="font-['Inter'] font-semibold relative shrink-0 text-[14px] text-[#02307d] w-full" data-node-id="353:10598">
                  5 requests sent to patients
                </p>
                <p className="font-['Inter'] font-normal relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10599">
                  Patients receive your request and approve or reject it. Approved access is limited to the selected medical record categories.
                </p>
              </div>
            </div>

            {/* Requests toolbar matching Figma Node 353:10600 */}
            <div className="content-stretch flex flex-col gap-[20px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10600" data-name="Requests toolbar">
              <div className="[word-break:break-word] border-[#dde7ff] border-b border-solid content-stretch flex gap-[32px] items-start leading-[normal] not-italic overflow-clip pb-[14px] relative shrink-0 text-[14px] w-full whitespace-nowrap overflow-x-auto" data-node-id="353:10601" data-name="Request categories">
                <button
                  type="button"
                  onClick={() => setActiveTab("All")}
                  className={`font-['Inter'] font-semibold relative shrink-0 cursor-pointer transition-colors ${
                    activeTab === "All" ? "text-[#078bde] border-b-2 border-[#078bde] pb-[14px] -mb-[16px]" : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10602"
                >
                  All (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Pending")}
                  className={`font-['Inter'] font-semibold relative shrink-0 cursor-pointer transition-colors ${
                    activeTab === "Pending" ? "text-[#078bde] border-b-2 border-[#078bde] pb-[14px] -mb-[16px]" : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10603"
                >
                  Pending (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Approved")}
                  className={`font-['Inter'] font-normal relative shrink-0 cursor-pointer transition-colors ${
                    activeTab === "Approved" ? "text-[#078bde] font-semibold border-b-2 border-[#078bde] pb-[14px] -mb-[16px]" : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10604"
                >
                  Approved (1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Rejected")}
                  className={`font-['Inter'] font-normal relative shrink-0 cursor-pointer transition-colors ${
                    activeTab === "Rejected" ? "text-[#078bde] font-semibold border-b-2 border-[#078bde] pb-[14px] -mb-[16px]" : "text-[#64748b] hover:text-[#02307d]"
                  }`}
                  data-node-id="353:10605"
                >
                  Rejected (1)
                </button>
              </div>

              {/* List heading matching Figma Node 353:10606 */}
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="353:10606" data-name="List heading">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-start min-w-px not-italic overflow-clip relative" data-node-id="353:10607" data-name="List introduction">
                  <p className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[22px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10608">
                    Sent requests
                  </p>
                  <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10609">
                    Requests you have sent to patients for medical record access.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"))}
                  className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[8px] items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-sky-50 transition-colors"
                  data-node-id="353:10610"
                  data-name="Action"
                >
                  <div className="relative shrink-0 size-[16px]" data-node-id="353:10611" data-name="arrow-down-wide-narrow">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowDownWideNarrow} width={16} height={16} />
                  </div>
                  <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[#078bde] whitespace-nowrap" data-node-id="353:10613">
                    {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                  </p>
                </button>
              </div>
            </div>

            {/* Pending request list matching Figma Node 353:10614 */}
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="353:10614" data-name="Pending request list">
              {sortedRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[18px] items-start overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
                  data-node-id="353:10615"
                  data-name="Doctor-sent access request"
                >
                  <div className="content-stretch flex flex-col sm:flex-row gap-[20px] items-start sm:items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10616" data-name="Request overview">
                    <div className="content-stretch flex flex-[1_0_0] gap-[14px] items-center min-w-px overflow-clip relative" data-node-id="353:10617" data-name="Patient identity">
                      <div className="relative rounded-[12px] shrink-0 size-[48px] overflow-hidden" data-node-id="353:10618" data-name="Patient avatar">
                        {req.avatarType === "image" && req.avatarImage ? (
                          <Image alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={req.avatarImage} width={48} height={48} />
                        ) : (
                          <div className={`${req.avatarBg || "bg-[#dbeafe]"} content-stretch flex items-center justify-center overflow-clip relative rounded-[12px] shrink-0 size-[48px]`}>
                            <p className={`[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[17px] ${req.avatarTextColor || "text-[#078bde]"} whitespace-nowrap`}>
                              {req.initials}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative" data-node-id="353:10619" data-name="Patient details">
                        <p className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[18px] text-[#02307d] tracking-[-0.4px] w-full" data-node-id="353:10620">
                          {req.patientName}
                        </p>
                        <p className="font-['Inter'] font-normal leading-[1.5] relative shrink-0 text-[#64748b] text-[12px] w-full whitespace-pre-wrap" data-node-id="353:10621">{`Patient ID: ${req.patientPulseId}  ·  ${req.patientAge}`}</p>
                      </div>
                    </div>
                    <div className={`${req.statusBg} content-stretch flex items-start overflow-clip px-[10px] py-[5px] relative rounded-[100px] shrink-0`} data-node-id="353:10622" data-name="Status">
                      <p className={`[word-break:break-word] font-['Inter'] font-semibold leading-[1.3] not-italic relative shrink-0 text-[11px] ${req.statusTextColor} whitespace-nowrap`} data-node-id="353:10623">
                        {req.statusText}
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10624" data-name="Permission details">
                    <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[12px] w-full whitespace-pre-wrap" data-node-id="353:10625">{`Permission: ${req.permission}  •  Requested medical record categories`}</p>
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.5] not-italic relative shrink-0 text-[14px] text-[#02307d] w-full" data-node-id="353:10626">
                      {req.categories}
                    </p>
                    <div className="content-stretch flex gap-[6px] items-center overflow-clip relative shrink-0 w-full" data-node-id="353:10627" data-name="Request date">
                      <div className="relative shrink-0 size-[14px]" data-node-id="353:10628" data-name="clock-3">
                        <Image alt="" className="absolute block inset-0 max-w-none size-full" src={req.clockIcon} width={14} height={14} />
                      </div>
                      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[1.5] min-w-px not-italic relative text-[#64748b] text-[12px]" data-node-id="353:10630">
                        Requested: {req.requestedDate}
                      </p>
                    </div>
                  </div>
                  <div className="border-[#e9effd] border-solid border-t content-stretch flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between overflow-clip pt-[16px] relative shrink-0 w-full" data-node-id="353:10631" data-name="Decision controls">
                    <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[1.5] min-w-px not-italic relative text-[#64748b] text-[12px]" data-node-id="353:10632">
                      {req.decisionNote}
                    </p>
                    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0 w-full sm:w-auto justify-end" data-node-id="353:10633" data-name="Request actions">
                      <button
                        type="button"
                        onClick={() => handleViewDetails(req)}
                        className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-sky-50 transition-colors"
                        data-node-id="353:10634"
                        data-name="Action"
                      >
                        <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[#078bde] whitespace-nowrap" data-node-id="353:10635">
                          View Request Details
                        </p>
                      </button>

                      {req.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleCancelRequest(req.id)}
                          className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors"
                          data-node-id="353:10636"
                          data-name="Action"
                        >
                          <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="353:10637">
                            Cancel
                          </p>
                        </button>
                      )}

                      {req.status === "approved" && (
                        <Link
                          href={`/doctor/find-patient?q=${encodeURIComponent(req.patientPulseId)}`}
                          className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex items-center justify-center min-h-[44px] overflow-clip px-[16px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors"
                          data-node-id="353:10660"
                          data-name="Action"
                        >
                          <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="353:10661">
                            View Authorized Records
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Showing all 5 sent requests matching Figma Node 353:10684 */}
            <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.5] not-italic relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10684">
              Showing all 5 sent requests
            </p>

            {/* Privacy guidance matching Figma Node 353:10685 */}
            <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10685" data-name="Privacy guidance">
              <div className="relative shrink-0 size-[22px]" data-node-id="353:10686" data-name="Icon">
                <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon1} width={22} height={22} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.5] min-w-px not-italic overflow-clip relative" data-node-id="353:10687" data-name="Guidance">
                <p className="font-['Inter'] font-semibold relative shrink-0 text-[14px] text-[#02307d] w-full" data-node-id="353:10688">
                  Permission is granted by the patient
                </p>
                <p className="font-['Inter'] font-normal relative shrink-0 text-[#64748b] text-[13px] w-full" data-node-id="353:10689">
                  Approved access is limited to the selected medical record categories. Pending requests can be canceled before the patient responds. Rejected requests do not grant any access.
                </p>
              </div>
            </div>

            {/* Request details panel matching Figma Node 353:10690 */}
            <div
              ref={detailsPanelRef}
              className="bg-white border border-[#dde7ff] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_2px_4px_0px_rgba(2,48,125,0.03)] shrink-0 w-full scroll-mt-24"
              data-node-id="353:10690"
              data-name="Request details panel"
            >
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="353:10691" data-name="Panel header">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px not-italic overflow-clip relative" data-node-id="353:10692" data-name="Title block">
                  <p className="font-['Inter'] font-bold leading-[1.25] relative shrink-0 text-[18px] text-[#02307d] tracking-[-0.4px] whitespace-nowrap" data-node-id="353:10693">
                    Request details
                  </p>
                  <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#64748b] text-[13px] w-[min-content]" data-node-id="353:10694">
                    Read-only summary for the selected request.
                  </p>
                </div>
                <div className={`${inspectedRequest.statusBg} content-stretch flex items-start overflow-clip px-[10px] py-[5px] relative rounded-[100px] shrink-0`} data-node-id="353:10695" data-name="Status">
                  <p className={`[word-break:break-word] font-['Inter'] font-semibold leading-[1.3] not-italic relative shrink-0 text-[11px] ${inspectedRequest.statusTextColor} whitespace-nowrap`} data-node-id="353:10696">
                    {inspectedRequest.statusText}
                  </p>
                </div>
              </div>

              {/* Details grid matching Figma Node 353:10697 */}
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic overflow-clip relative shrink-0 w-full" data-node-id="353:10697" data-name="Details grid">
                {/* Row 1 matching Figma Node 353:10698 */}
                <div className="content-stretch flex flex-col sm:flex-row font-['Inter'] font-semibold gap-[16px] items-start leading-[normal] overflow-clip relative shrink-0 w-full" data-node-id="353:10698" data-name="Row 1">
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10699" data-name="Sender">
                    <p className="relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10700">
                      Sender
                    </p>
                    <p className="min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10701">
                      {inspectedRequest.sender}
                    </p>
                  </div>
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10702" data-name="Recipient">
                    <p className="relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10703">
                      Recipient
                    </p>
                    <p className="min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10704">
                      {inspectedRequest.recipient}
                    </p>
                  </div>
                </div>

                {/* Row 2 matching Figma Node 353:10705 */}
                <div className="content-stretch flex flex-col sm:flex-row gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10705" data-name="Row 2">
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10706" data-name="Reason">
                    <p className="font-['Inter'] font-semibold leading-[normal] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10707">
                      Reason
                    </p>
                    <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10708">
                      {inspectedRequest.reason}
                    </p>
                  </div>
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10709" data-name="Categories">
                    <p className="font-['Inter'] font-semibold leading-[normal] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10710">
                      Categories
                    </p>
                    <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10711">
                      {inspectedRequest.categories}
                    </p>
                  </div>
                </div>

                {/* Row 3 matching Figma Node 353:10712 */}
                <div className="content-stretch flex flex-col sm:flex-row gap-[16px] items-start overflow-clip relative shrink-0 w-full" data-node-id="353:10712" data-name="Row 3">
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col font-['Inter'] font-semibold gap-[6px] items-start leading-[normal] min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10713" data-name="Permission">
                    <p className="relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10714">
                      Permission
                    </p>
                    <p className="min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10715">
                      {inspectedRequest.permission}
                    </p>
                  </div>
                  <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip p-[16px] relative rounded-[12px] w-full sm:w-auto" data-node-id="353:10716" data-name="Submitted">
                    <p className="font-['Inter'] font-semibold leading-[normal] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap" data-node-id="353:10717">
                      Submitted
                    </p>
                    <p className="font-['Inter'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[14px] text-[#02307d] w-[min-content]" data-node-id="353:10718">
                      {inspectedRequest.submitted}
                    </p>
                  </div>
                </div>
              </div>

              {/* State note matching Figma Node 353:10719 */}
              <div className="bg-[#f3f9fe] border border-[#dde7ff] border-solid content-stretch flex gap-[10px] items-center overflow-clip p-[16px] relative rounded-[12px] shrink-0 w-full" data-node-id="353:10719" data-name="State note">
                <div className="relative shrink-0 size-[18px]" data-node-id="353:10720" data-name="clock">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgClock} width={18} height={18} />
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter'] font-normal leading-[1.5] min-w-px not-italic relative text-[#64748b] text-[13px]" data-node-id="353:10722">
                  Pending patient approval. The patient can approve or reject this request from their Pulse ID account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Unified Website Footer matching Figma Node 353:10723 / Node 353:10951 */}
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
