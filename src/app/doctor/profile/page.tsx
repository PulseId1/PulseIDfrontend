"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DoctorNavbar, DoctorFooter } from "@/features/doctor";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

const imgDoctorPhoto = "/assets/doctor/profile/imgDoctorPhoto.png";
const imgUserRound = "/assets/doctor/profile/imgUserRound.svg";
const imgPencil = "/assets/doctor/profile/imgPencil.svg";
const imgPhone = "/assets/doctor/profile/imgPhone.svg";
const imgLockKeyhole = "/assets/doctor/profile/imgLockKeyhole.svg";
const imgStethoscope = "/assets/doctor/profile/imgStethoscope.svg";
const imgPencil1 = "/assets/doctor/profile/imgPencil1.svg";
const imgFileText = "/assets/doctor/profile/imgFileText.svg";
const imgPlus = "/assets/doctor/profile/imgPlus.svg";
const imgPencil2 = "/assets/doctor/profile/imgPencil2.svg";
const imgSettings = "/assets/doctor/profile/imgSettings.svg";
const imgAlertTriangle = "/assets/doctor/profile/imgAlertTriangle.svg";
const imgTrash2 = "/assets/doctor/profile/imgTrash2.svg";

export default function DoctorProfilePage() {
  const router = useRouter();
  const { logout, isDemo } = useAuth();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active doctor credentials
  const activeDocAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const isCustomDoctor = activeDocAccount?.role === "doctor" && activeDocAccount.id !== "DOC-DEMO-8842";

  const doctorFullName =
    isDemo && isCustomDoctor && activeDocAccount?.fullName
      ? activeDocAccount.fullName
      : "Dr. Ahmed Hassan";

  const doctorSpecialty =
    isDemo && isCustomDoctor && activeDocAccount?.specialty
      ? activeDocAccount.specialty
      : "Cardiology";

  const doctorPhone =
    isDemo && isCustomDoctor && activeDocAccount?.phone
      ? activeDocAccount.phone
      : "+20 100 123 4567";

  const doctorEmail =
    isDemo && isCustomDoctor && activeDocAccount?.email
      ? activeDocAccount.email
      : "ahmed.hassan@pulseid.health";

  const clinicAddress =
    isDemo && isCustomDoctor && activeDocAccount?.clinicAddress
      ? activeDocAccount.clinicAddress
      : "24 El Nozha Street, Heliopolis, Cairo, Egypt";

  const licenseNumber =
    isDemo && isCustomDoctor && (activeDocAccount?.license || activeDocAccount?.medicalLicenseName)
      ? (activeDocAccount?.license || activeDocAccount?.medicalLicenseName || "Not provided")
      : "Not provided";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConfirmDelete = () => {
    setDeleteModalOpen(false);
    logout();
    router.replace("/auth/login?role=doctor&deleted=true");
  };

  return (
    <div
      className="bg-white min-h-screen flex flex-col text-slate-900 selection:bg-[#078BDE]/30 selection:text-[#078BDE]"
      data-node-id="423:5199"
      data-name="doctor info"
    >
      {/* 1. Unified Website Header matching Figma Node 423:5199 */}
      <DoctorNavbar />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#02307D] text-white px-5 py-3 rounded-2xl shadow-2xl border border-sky-400/30 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* 2. Main Profile Content matching Figma Node 423:5240 */}
      <main className="w-full flex-1 flex flex-col">
        <div
          className="content-stretch flex flex-col gap-[44px] items-start pb-[80px] pt-[41px] px-[32px] relative shrink-0 w-full max-w-[1280px] mx-auto"
          data-node-id="423:5240"
          data-name="Profile content"
        >
          {/* Page heading matching Figma Node 423:5241 */}
          <div
            className="[word-break:break-word] border-[#e9effd] border-b border-solid content-stretch flex flex-col gap-[8px] items-start not-italic pb-[16px] relative shrink-0 w-full"
            data-node-id="423:5241"
            data-name="Page heading"
          >
            <h1
              className="font-['Inter'] font-bold leading-[39px] relative shrink-0 text-[32px] text-[#01091e] w-full"
              data-node-id="423:5242"
            >
              Doctor Information
            </h1>
            <p
              className="font-['Inter'] font-normal leading-[21px] relative shrink-0 text-[15px] text-[#41474f] w-full"
              data-node-id="423:5243"
            >
              Manage your professional profile, verification credentials, and contact details securely.
            </p>
          </div>

          {/* Doctor overview banner matching Figma Node 423:5244 */}
          <div
            className="border border-[rgba(0,121,195,0.4)] border-solid content-stretch flex flex-col sm:flex-row h-auto sm:h-[146px] items-start sm:items-center justify-between p-[32px] relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full gap-4"
            data-node-id="423:5244"
            style={{
              backgroundImage:
                "linear-gradient(134.11deg, rgb(2, 48, 125) 0.34%, rgb(10, 125, 197) 93.11%)",
            }}
            data-name="Doctor overview"
          >
            <div
              className="content-stretch flex gap-[20px] items-center relative shrink-0"
              data-node-id="423:5245"
              data-name="Doctor identity"
            >
              <div
                className="relative rounded-[50px] shrink-0 size-[80px] overflow-hidden bg-sky-900 border-2 border-white/20"
                data-node-id="353:11052"
                data-name="Doctor photo"
              >
                <Image
                  alt={doctorFullName}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[50px] size-full"
                  src={imgDoctorPhoto}
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div
                className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0"
                data-node-id="353:11053"
                data-name="Identification"
              >
                <div
                  className="content-stretch flex gap-[10px] items-center relative shrink-0"
                  data-node-id="353:11054"
                  data-name="Name and specialty"
                >
                  <p
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[29px] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap"
                    data-node-id="353:11055"
                  >
                    {doctorFullName}
                  </p>
                  <div
                    className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] border-solid content-stretch flex items-start px-[10px] py-[3px] relative rounded-[50px] shrink-0"
                    data-node-id="353:11056"
                    data-name="Specialty badge"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[11px] text-white whitespace-nowrap"
                      data-node-id="353:11057"
                    >
                      {doctorSpecialty}
                    </span>
                  </div>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex gap-[6px] items-start leading-[normal] not-italic relative shrink-0 text-[13px] whitespace-nowrap"
                  data-node-id="353:11058"
                  data-name="Professional identification"
                >
                  <span
                    className="font-['Inter'] font-bold relative shrink-0 text-[#bacfd7]"
                    data-node-id="353:11059"
                  >
                    Pulse ID:
                  </span>
                  <span
                    className="font-['Inter'] font-normal relative shrink-0 text-white"
                    data-node-id="353:11060"
                  >
                    PID-8924-EGY
                  </span>
                </div>
              </div>
            </div>
            <div
              className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[10px] relative rounded-[8px] shrink-0"
              data-node-id="423:5255"
              data-name="Verification status"
            >
              <div className="relative shrink-0 size-[18px]" data-node-id="609:3662" data-name="griddy-icons:check-verified-filled">
                <Image alt="Verified" className="absolute block inset-0 max-w-none size-full" src="/assets/check-verified-filled.svg" width={18} height={18} />
              </div>
              <p
                className="[word-break:break-word] font-['Inter'] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap"
                data-node-id="423:5258"
              >
                Pending Review
              </p>
            </div>
          </div>

          {/* Personal and contact information row matching Figma Node 353:11065 */}
          <div
            className="content-stretch flex flex-col lg:flex-row gap-[24px] items-start relative shrink-0 w-full"
            data-node-id="353:11065"
            data-name="Personal and contact information"
          >
            {/* Card 1: Personal Information matching Figma Node 353:11066 */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full lg:w-[744px]"
              data-node-id="353:11066"
              data-name="Personal Information"
            >
              <div
                className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-center justify-between pb-[16px] relative shrink-0 w-full"
                data-node-id="353:11067"
                data-name="Card heading"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0"
                  data-node-id="353:11068"
                  data-name="Section identity"
                >
                  <div
                    className="bg-[#f1f3ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]"
                    data-node-id="353:11069"
                    data-name="Section symbol"
                  >
                    <div className="relative shrink-0 size-[19px]" data-node-id="353:11070" data-name="user-round">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgUserRound} width={19} height={19} />
                    </div>
                  </div>
                  <h2
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[26px] not-italic relative shrink-0 text-[20px] text-[#01091e] whitespace-nowrap"
                    data-node-id="353:11072"
                  >
                    Personal Information
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Personal info editor is available in doctor settings.")}
                  className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                  data-node-id="353:11073"
                  data-name="Action"
                >
                  <div className="relative shrink-0 size-[14px]" data-node-id="353:11074" data-name="pencil">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil} width={14} height={14} />
                  </div>
                  <span
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                    data-node-id="353:11076"
                  >
                    Edit
                  </span>
                </button>
              </div>

              {/* Personal details row 1 matching Figma Node 353:11077 */}
              <div
                className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] items-start not-italic relative shrink-0 w-full"
                data-node-id="353:11077"
                data-name="Personal details"
              >
                <div
                  className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                  data-node-id="353:11078"
                  data-name="Information field"
                >
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11079"
                  >
                    Full Name
                  </p>
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11080"
                  >
                    {doctorFullName}
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                  data-node-id="353:11081"
                  data-name="Information field"
                >
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11082"
                  >
                    Date of Birth
                  </p>
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11083"
                  >
                    15 March 1992
                  </p>
                </div>
              </div>

              {/* Identity details row 2 matching Figma Node 353:11084 */}
              <div
                className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] items-start not-italic relative shrink-0 w-full"
                data-node-id="353:11084"
                data-name="Identity details"
              >
                <div
                  className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                  data-node-id="353:11085"
                  data-name="Information field"
                >
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11086"
                  >
                    Gender
                  </p>
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11087"
                  >
                    Male
                  </p>
                </div>
                <div
                  className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                  data-node-id="353:11088"
                  data-name="Information field"
                >
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11089"
                  >
                    National ID
                  </p>
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11090"
                  >
                    29203150101234
                  </p>
                </div>
              </div>

              {/* Address row 3 matching Figma Node 353:11091 */}
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full"
                data-node-id="353:11091"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11092"
                >
                  Address
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11093"
                >
                  {clinicAddress}
                </p>
              </div>
            </div>

            {/* Card 2: Contact Information matching Figma Node 353:11094 */}
            <div
              className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-1 flex-col gap-[24px] items-start min-w-px p-[24px] relative rounded-[8px] self-stretch shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] w-full"
              data-node-id="353:11094"
              data-name="Contact Information"
            >
              <div
                className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-center justify-between pb-[16px] relative shrink-0 w-full"
                data-node-id="353:11095"
                data-name="Card heading"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0"
                  data-node-id="353:11096"
                  data-name="Section identity"
                >
                  <div
                    className="bg-[#f1f3ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]"
                    data-node-id="353:11097"
                    data-name="Section symbol"
                  >
                    <div className="relative shrink-0 size-[19px]" data-node-id="353:11098" data-name="phone">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPhone} width={19} height={19} />
                    </div>
                  </div>
                  <h2
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[26px] not-italic relative shrink-0 text-[20px] text-[#01091e] whitespace-nowrap"
                    data-node-id="353:11100"
                  >
                    Contact Information
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Contact info editor is available in doctor settings.")}
                  className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                  data-node-id="353:11101"
                  data-name="Action"
                >
                  <div className="relative shrink-0 size-[14px]" data-node-id="353:11102" data-name="pencil">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil} width={14} height={14} />
                  </div>
                  <span
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                    data-node-id="353:11104"
                  >
                    Edit
                  </span>
                </button>
              </div>

              {/* Phone number matching Figma Node 353:11105 */}
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full"
                data-node-id="353:11105"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11106"
                >
                  Phone Number
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11107"
                >
                  {doctorPhone}
                </p>
              </div>

              {/* Email matching Figma Node 353:11108 */}
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start not-italic relative shrink-0 w-full"
                data-node-id="353:11108"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11109"
                >
                  Professional Email Address
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11110"
                >
                  {doctorEmail}
                </p>
              </div>

              {/* Privacy note matching Figma Node 353:11111 */}
              <div
                className="border-[rgba(191,199,211,0.3)] border-solid border-t content-stretch flex gap-[8px] items-start pt-[16px] relative shrink-0 w-full"
                data-node-id="353:11111"
                data-name="Privacy note"
              >
                <div className="h-[16px] relative shrink-0 w-[14px]" data-node-id="353:11112" data-name="lock-keyhole">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgLockKeyhole} width={14} height={16} />
                </div>
                <p
                  className="[word-break:break-word] flex-1 font-['Inter'] font-normal leading-[18px] min-w-px not-italic relative text-[12px] text-[#41474f]"
                  data-node-id="353:11114"
                >
                  Your contact details are kept private and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Professional Information matching Figma Node 353:11115 */}
          <div
            className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
            data-node-id="353:11115"
            data-name="Professional Information"
          >
            <div
              className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-center justify-between pb-[16px] relative shrink-0 w-full"
              data-node-id="353:11116"
              data-name="Card heading"
            >
              <div
                className="content-stretch flex gap-[12px] items-center relative shrink-0"
                data-node-id="353:11117"
                data-name="Section identity"
              >
                <div
                  className="bg-[#f1f3ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]"
                  data-node-id="353:11118"
                  data-name="Section symbol"
                >
                  <div className="relative shrink-0 size-[19px]" data-node-id="353:11119" data-name="stethoscope">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgStethoscope} width={19} height={19} />
                  </div>
                </div>
                <h2
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[26px] not-italic relative shrink-0 text-[20px] text-[#01091e] whitespace-nowrap"
                  data-node-id="353:11121"
                >
                  Professional Information
                </h2>
              </div>
              <button
                type="button"
                onClick={() => showToast("Professional info editor is available in doctor settings.")}
                className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                data-node-id="353:11122"
                data-name="Action"
              >
                <div className="relative shrink-0 size-[14px]" data-node-id="353:11123" data-name="pencil">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil1} width={14} height={14} />
                </div>
                <span
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                  data-node-id="353:11125"
                >
                  Edit
                </span>
              </button>
            </div>

            {/* Row 1 matching Figma Node 353:11126 */}
            <div
              className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] items-start not-italic relative shrink-0 w-full"
              data-node-id="353:11126"
              data-name="Professional details"
            >
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11127"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11128"
                >
                  Medical Specialty
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11129"
                >
                  {doctorSpecialty}
                </p>
              </div>
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11130"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11131"
                >
                  Professional Title
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11132"
                >
                  Consultant
                </p>
              </div>
            </div>

            {/* Row 2 matching Figma Node 353:11133 */}
            <div
              className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] items-start not-italic relative shrink-0 w-full"
              data-node-id="353:11133"
              data-name="Professional details"
            >
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11134"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11135"
                >
                  Medical License Number
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11136"
                >
                  {licenseNumber}
                </p>
              </div>
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11137"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11138"
                >
                  Professional ID
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11139"
                >
                  Not provided
                </p>
              </div>
            </div>

            {/* Row 3 matching Figma Node 353:11140 */}
            <div
              className="[word-break:break-word] content-stretch flex flex-col sm:flex-row gap-[16px] sm:gap-[32px] items-start not-italic relative shrink-0 w-full"
              data-node-id="353:11140"
              data-name="Professional details"
            >
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11141"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11142"
                >
                  Hospital or Clinic Affiliation
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11143"
                >
                  Not provided
                </p>
              </div>
              <div
                className="content-stretch flex flex-1 flex-col gap-[8px] items-start min-w-px relative w-full sm:w-auto"
                data-node-id="353:11144"
                data-name="Information field"
              >
                <p
                  className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                  data-node-id="353:11145"
                >
                  Verification Status
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                  data-node-id="353:11146"
                >
                  Pending Review
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Professional Documents matching Figma Node 353:11147 */}
          <div
            className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
            data-node-id="353:11147"
            data-name="Professional Documents"
          >
            <div
              className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-[20px] relative shrink-0 w-full"
              data-node-id="353:11148"
              data-name="Card heading"
            >
              <div
                className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0"
                data-node-id="353:11149"
                data-name="Introduction"
              >
                <div
                  className="content-stretch flex gap-[12px] items-center relative shrink-0"
                  data-node-id="353:11150"
                  data-name="Section identity"
                >
                  <div
                    className="bg-[#f1f3ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]"
                    data-node-id="353:11151"
                    data-name="Section symbol"
                  >
                    <div className="relative shrink-0 size-[19px]" data-node-id="353:11152" data-name="file-text">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgFileText} width={19} height={19} />
                    </div>
                  </div>
                  <h2
                    className="[word-break:break-word] font-['Inter'] font-bold leading-[26px] not-italic relative shrink-0 text-[20px] text-[#01091e] whitespace-nowrap"
                    data-node-id="353:11154"
                  >
                    Professional Documents
                  </h2>
                </div>
                <p
                  className="[word-break:break-word] font-['Inter'] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-[#41474f]"
                  data-node-id="353:11155"
                >
                  Upload and verify your medical license, professional ID, and supporting documents for Pulse ID practitioner verification.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("Document upload modal is ready.")}
                className="bg-[#078bde] hover:bg-[#0079c3] border border-[#078bde] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors shadow-xs active:scale-[0.99]"
                data-node-id="353:11156"
                data-name="Action"
              >
                <div className="relative shrink-0 size-[14px]" data-node-id="353:11157" data-name="plus">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} width={14} height={14} />
                </div>
                <span
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap"
                  data-node-id="353:11159"
                >
                  Upload Document
                </span>
              </button>
            </div>

            {/* Document list matching Figma Node 353:11160 */}
            <div
              className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
              data-node-id="353:11160"
              data-name="Document list"
            >
              {/* Document row 1: Medical License */}
              <div
                className="bg-[#f1f3ff] border border-[#d0deff] border-solid content-stretch flex flex-col sm:flex-row gap-[16px] items-start sm:items-center justify-between p-[16px] relative rounded-[8px] shrink-0 w-full"
                data-node-id="353:11161"
                data-name="Document row"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-1 flex-col gap-[6px] items-start min-w-px not-italic relative"
                  data-node-id="353:11162"
                  data-name="Document details"
                >
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11163"
                  >
                    Medical License
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11164"
                  >
                    Uploaded: 12 Oct 2026 • Verification pending
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="353:11165" data-name="Document actions">
                  <button
                    type="button"
                    onClick={() => showToast("Medical license update mode triggered.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11166"
                    data-name="Action"
                  >
                    <div className="relative shrink-0 size-[14px]" data-node-id="353:11167" data-name="pencil">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil2} width={14} height={14} />
                    </div>
                    <span className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap">
                      Update
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Medical license viewer displayed.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11170"
                    data-name="Action"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                      data-node-id="353:11171"
                    >
                      View
                    </span>
                  </button>
                  <div
                    className="bg-[rgba(68,239,99,0.1)] border border-[rgba(68,239,99,0.1)] border-solid content-stretch flex items-start px-[12px] py-[6px] relative rounded-[9999px] shrink-0"
                    data-node-id="353:11172"
                    data-name="Verification status"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#074e94] text-[12px] whitespace-nowrap"
                      data-node-id="353:11173"
                    >
                      Unverified
                    </span>
                  </div>
                </div>
              </div>

              {/* Document row 2: Professional ID */}
              <div
                className="bg-[#f1f3ff] border border-[#d0deff] border-solid content-stretch flex flex-col sm:flex-row gap-[16px] items-start sm:items-center justify-between p-[16px] relative rounded-[8px] shrink-0 w-full"
                data-node-id="353:11174"
                data-name="Document row"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-1 flex-col gap-[6px] items-start min-w-px not-italic relative"
                  data-node-id="353:11175"
                  data-name="Document details"
                >
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11176"
                  >
                    Professional ID
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11177"
                  >
                    Uploaded: 10 Oct 2026 • Verification in progress
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="353:11178" data-name="Document actions">
                  <button
                    type="button"
                    onClick={() => showToast("Professional ID update mode triggered.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11179"
                    data-name="Action"
                  >
                    <div className="relative shrink-0 size-[14px]" data-node-id="353:11180" data-name="pencil">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil1} width={14} height={14} />
                    </div>
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                      data-node-id="353:11182"
                    >
                      Update
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Professional ID viewer displayed.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11183"
                    data-name="Action"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                      data-node-id="353:11184"
                    >
                      View
                    </span>
                  </button>
                  <div
                    className="bg-[rgba(142,191,222,0.2)] border border-[rgba(142,191,222,0.2)] border-solid content-stretch flex items-start px-[12px] py-[6px] relative rounded-[9999px] shrink-0"
                    data-node-id="353:11185"
                    data-name="Verification status"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#078bde] text-[12px] whitespace-nowrap"
                      data-node-id="353:11186"
                    >
                      Unverified
                    </span>
                  </div>
                </div>
              </div>

              {/* Document row 3: Uploaded Verification Documents */}
              <div
                className="bg-[#f1f3ff] border border-[#d0deff] border-solid content-stretch flex flex-col sm:flex-row gap-[16px] items-start sm:items-center justify-between p-[16px] relative rounded-[8px] shrink-0 w-full"
                data-node-id="353:11187"
                data-name="Document row"
              >
                <div
                  className="[word-break:break-word] content-stretch flex flex-1 flex-col gap-[6px] items-start min-w-px not-italic relative"
                  data-node-id="353:11188"
                  data-name="Document details"
                >
                  <p
                    className="font-['Inter'] font-semibold leading-[21px] relative shrink-0 text-[15px] text-[#01091e] w-full"
                    data-node-id="353:11189"
                  >
                    Uploaded Verification Documents
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[18px] relative shrink-0 text-[13px] text-[#41474f] w-full"
                    data-node-id="353:11190"
                  >
                    Uploaded: 08 Oct 2026 • 3 files • Verification pending
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="353:11191" data-name="Document actions">
                  <button
                    type="button"
                    onClick={() => showToast("Supporting documents update mode triggered.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11192"
                    data-name="Action"
                  >
                    <div className="relative shrink-0 size-[14px]" data-node-id="353:11193" data-name="pencil">
                      <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgPencil1} width={14} height={14} />
                    </div>
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                      data-node-id="353:11195"
                    >
                      Update
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast("Supporting documents viewer displayed.")}
                    className="bg-white border border-[#d0deff] border-solid content-stretch flex items-center px-[16px] py-[9px] relative rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="353:11196"
                    data-name="Action"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[18px] not-italic relative shrink-0 text-[13px] text-[#01091e] whitespace-nowrap"
                      data-node-id="353:11197"
                    >
                      View
                    </span>
                  </button>
                  <div
                    className="bg-[rgba(68,239,99,0.1)] border border-[rgba(68,239,99,0.1)] border-solid content-stretch flex items-start px-[12px] py-[6px] relative rounded-[9999px] shrink-0"
                    data-node-id="353:11198"
                    data-name="Verification status"
                  >
                    <span
                      className="[word-break:break-word] font-['Inter'] font-bold leading-[normal] not-italic relative shrink-0 text-[#074e94] text-[12px] whitespace-nowrap"
                      data-node-id="353:11199"
                    >
                      Unverified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Account Settings matching Figma Node 353:11200 */}
          <div
            className="bg-white border border-[rgba(191,199,211,0.7)] border-solid content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] shrink-0 w-full"
            data-node-id="353:11200"
            data-name="Account Settings"
          >
            <div
              className="border-[rgba(191,199,211,0.3)] border-b border-solid content-stretch flex items-center justify-between pb-[16px] relative shrink-0 w-full"
              data-node-id="353:11201"
              data-name="Card heading"
            >
              <div
                className="content-stretch flex gap-[12px] items-center relative shrink-0"
                data-node-id="353:11202"
                data-name="Section identity"
              >
                <div
                  className="bg-[#f1f3ff] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]"
                  data-node-id="353:11203"
                  data-name="Section symbol"
                >
                  <div className="relative shrink-0 size-[19px]" data-node-id="353:11204" data-name="settings">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgSettings} width={19} height={19} />
                  </div>
                </div>
                <h2
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[26px] not-italic relative shrink-0 text-[20px] text-[#01091e] whitespace-nowrap"
                  data-node-id="353:11206"
                >
                  Account Settings
                </h2>
              </div>
            </div>

            {/* Danger zone matching Figma Node 353:11207 */}
            <div
              className="bg-[#fef2f2] border border-[#fecaca] border-solid content-stretch flex flex-col gap-[16px] items-start p-[20px] relative rounded-[12px] shrink-0 w-full"
              data-node-id="353:11207"
              data-name="Danger zone"
            >
              <div
                className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full"
                data-node-id="353:11208"
                data-name="Danger header"
              >
                <div
                  className="bg-[#fee2e2] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]"
                  data-node-id="353:11209"
                  data-name="Alert icon"
                >
                  <div className="relative shrink-0 size-[20px]" data-node-id="353:11210" data-name="alert-triangle">
                    <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgAlertTriangle} width={20} height={20} />
                  </div>
                </div>
                <div
                  className="[word-break:break-word] content-stretch flex flex-1 flex-col gap-[4px] items-start min-w-px not-italic relative"
                  data-node-id="353:11212"
                  data-name="Danger copy"
                >
                  <p
                    className="font-['Inter'] font-bold leading-[22px] relative shrink-0 text-[#991b1b] text-[16px] w-full"
                    data-node-id="353:11213"
                  >
                    Delete Account
                  </p>
                  <p
                    className="font-['Inter'] font-normal leading-[20px] relative shrink-0 text-[#b91c1c] text-[14px] w-full"
                    data-node-id="353:11214"
                  >
                    Deleting your account is permanent and will remove your profile, verification history, and access to Pulse ID.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="bg-[#dc2626] hover:bg-[#b91c1c] content-stretch flex items-center justify-center px-[20px] py-[10px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors shadow-xs active:scale-[0.99]"
                data-node-id="353:11215"
                data-name="Delete button"
              >
                <span
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap"
                  data-node-id="353:11216"
                >
                  Delete Account
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Delete Account Confirmation Modal matching Figma Node 353:11290 */}
      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#8d99ad]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          data-node-id="423:5484"
          data-name="Delete account confirmation"
        >
          <div
            className="bg-white border border-[#e2e7ef] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_20px_56px_-12px_rgba(1,9,30,0.2)] shrink-0 w-full max-w-[536px] animate-in zoom-in-95 duration-200"
            data-node-id="423:5485"
            data-name="Confirmation dialog"
          >
            <div
              className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative shrink-0 w-full"
              data-node-id="423:5486"
              data-name="Confirmation content"
            >
              <div
                className="bg-[#fee2e2] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]"
                data-node-id="423:5487"
                data-name="Danger symbol"
              >
                <div className="relative shrink-0 size-[24px]" data-node-id="423:5488" data-name="trash-2">
                  <Image alt="" className="absolute block inset-0 max-w-none size-full" src={imgTrash2} width={24} height={24} />
                </div>
              </div>
              <div
                className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 w-full"
                data-node-id="423:5490"
                data-name="Deletion warning"
              >
                <h3
                  className="font-['Inter'] font-bold leading-[32px] relative shrink-0 text-[24px] text-[#01091e] tracking-[-0.4px] w-full"
                  data-node-id="423:5491"
                >
                  Permanently delete your doctor account?
                </h3>
                <p
                  className="font-['Inter'] font-normal leading-[24px] relative shrink-0 text-[15px] text-[#41474f] w-full"
                  data-node-id="423:5492"
                >
                  Deleting your account will remove your profile, verification history, and access to Pulse ID.
                </p>
                <p
                  className="font-['Inter'] font-semibold leading-[20px] relative shrink-0 text-[#b91c1c] text-[14px] w-full"
                  data-node-id="423:5493"
                >
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>
            <div
              className="border-[#e9effd] border-solid border-t content-stretch flex gap-[12px] items-center justify-end px-[32px] py-[24px] relative shrink-0 w-full bg-slate-50/50"
              data-node-id="423:5494"
              data-name="Confirmation actions"
            >
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="bg-white border border-[#d0deff] border-solid content-stretch flex h-[44px] items-center justify-center px-[24px] relative rounded-[8px] shrink-0 cursor-pointer hover:bg-slate-50 transition-colors"
                data-node-id="423:5495"
                data-name="Cancel button"
              >
                <span
                  className="[word-break:break-word] font-['Inter'] font-semibold leading-[20px] not-italic relative shrink-0 text-[#02307d] text-[14px] whitespace-nowrap"
                  data-node-id="423:5496"
                >
                  Cancel
                </span>
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-[#dc2626] hover:bg-[#b91c1c] content-stretch flex h-[44px] items-center justify-center px-[24px] relative rounded-[8px] shrink-0 cursor-pointer transition-colors shadow-xs active:scale-[0.99]"
                data-node-id="423:5497"
                data-name="Confirm delete button"
              >
                <span
                  className="[word-break:break-word] font-['Inter'] font-bold leading-[20px] not-italic relative shrink-0 text-white text-[14px] whitespace-nowrap"
                  data-node-id="423:5498"
                >
                  Confirm Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Unified Website Footer matching Figma Node 353:11217 / 353:10951 */}
      <DoctorFooter />
    </div>
  );
}
