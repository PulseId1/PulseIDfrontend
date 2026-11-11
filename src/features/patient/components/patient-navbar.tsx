"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

const emptySubscribe = () => () => {};

interface PatientNavbarProps {
  readonly activeLanguage?: "en" | "ar";
  readonly onLanguageToggle?: () => void;
  readonly patientName?: string;
  readonly patientId?: string;
}

export function PatientNavbar({
  activeLanguage = "en",
  onLanguageToggle,
  patientName,
  patientId,
}: PatientNavbarProps) {
  const [internalLang, setInternalLang] = useState<"en" | "ar">(activeLanguage);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout, userId, isDemo } = useAuth();

  const activeDemoAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const displayName =
    patientName ||
    (isDemo && activeDemoAccount?.fullName
      ? activeDemoAccount.fullName
      : isDemo
      ? "Sara Mahmoud Ibrahim"
      : userId
      ? `Patient (${userId})`
      : "Patient Account");
  const displayId =
    patientId ||
    (isDemo && activeDemoAccount
      ? `PID-EG-${activeDemoAccount.nationalId.slice(-6)}`
      : isDemo
      ? "PID-EG-2980412"
      : userId
      ? `PID-${userId}`
      : "PulseID Identity");

  const initials =
    displayName
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "PT";

  const isProfileCompleted = useSyncExternalStore(
    emptySubscribe,
    () => localStorage.getItem("pulseid_patient_profile_completed") === "true",
    () => true
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageToggle = () => {
    if (onLanguageToggle) {
      onLanguageToggle();
    } else {
      setInternalLang((prev) => (prev === "en" ? "ar" : "en"));
    }
  };

  const handleProfileNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    setProfileMenuOpen(false);
    const completed = typeof window !== "undefined" && localStorage.getItem("pulseid_patient_profile_completed") === "true";
    if (!completed) {
      router.push("/patient/profile/edit?first_time=true");
    } else {
      router.push("/patient/profile");
    }
  };

  const handlePersonalInformation = (e: React.MouseEvent) => {
    e.preventDefault();
    setProfileMenuOpen(false);
    router.push("/patient/profile/edit");
  };

  const handleMedicalInformation = (e: React.MouseEvent) => {
    e.preventDefault();
    setProfileMenuOpen(false);
    router.push("/patient/medical-info");
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    setProfileMenuOpen(false);
    router.push("/auth/login");
  };

  const currentLang = onLanguageToggle ? activeLanguage : internalLang;
  const isHome = pathname === "/patient";

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full h-[80px] bg-[#02307D] border-b border-[#1A438A]/50 shadow-sm" data-node-id="299:5257">
      <div className="w-full max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between" data-node-id="299:5259">
        {/* Left: Brand Logo Lockup matching Figma Node 299:5260 */}
        <Link
          href="/patient"
          className="flex items-center gap-[12px] group focus:outline-none focus:ring-2 focus:ring-[#078BDE] rounded-lg shrink-0"
          data-node-id="299:5260"
        >
          <div className="w-[32px] h-[30px] relative shrink-0" data-node-id="299:5261">
            <Image
              src="/assets/patient-home/header-logo.svg"
              alt="PulseID Logo"
              width={32}
              height={30}
              unoptimized
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading font-bold text-[18px] text-white tracking-[0.9px] leading-[18px]">
            PULSEID
          </span>
        </Link>

        {/* Center: Navigation Pill Bar (Home, About, Contact, عربي) matching Figma Node 299:5283 */}
        <nav
          aria-label="Patient Portal Navigation"
          className="hidden md:flex items-center bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] rounded-[12px] p-[7px] gap-[4px]"
          data-node-id="299:5283"
        >
          <Link
            href="/patient"
            className={`rounded-[12px] px-[20px] py-[8px] flex items-center gap-[6px] transition-all font-normal text-[14px] leading-normal ${
              isHome
                ? "bg-[#078BDE] text-[#EAEDF6] shadow-sm drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] font-medium"
                : "text-[#EAEDF6] hover:bg-white/10"
            }`}
            data-node-id="299:5284"
          >
            <span className="size-[6px] rounded-full bg-white inline-block" />
            <span>Home</span>
          </Link>
          <Link
            href="/#about"
            className="rounded-[12px] px-[20px] py-[8px] text-[#EAEDF6] hover:bg-white/10 font-normal text-[14px] leading-normal transition-colors"
            data-node-id="299:5287"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="rounded-[12px] px-[20px] py-[8px] text-[#EAEDF6] hover:bg-white/10 font-normal text-[14px] leading-normal transition-colors"
            data-node-id="299:5289"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={handleLanguageToggle}
            className="rounded-[12px] px-[20px] py-[8px] text-[#EAEDF6] hover:bg-white/10 font-normal text-[14px] leading-normal transition-colors cursor-pointer w-[40px] text-center"
            title="Switch language"
            data-node-id="299:5291"
          >
            {currentLang === "en" ? "عربي" : "English"}
          </button>
        </nav>

        {/* Right Actions: User Profile Pill, Search Icon, Notification Bell matching Figma Node 299:5293 */}
        <div className="flex items-center gap-[12px]" ref={dropdownRef} data-node-id="299:5293">
          {/* User Profile Quick Pill matching Figma Node 280:90 / 280:91 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setNotificationsOpen(false);
              }}
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-[12px] flex gap-[12px] sm:gap-[30px] items-center pb-[5px] pl-[5px] pr-[9px] pt-[7px] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#078BDE]"
              aria-expanded={profileMenuOpen}
              aria-label="User menu"
              data-node-id="280:91"
            >
              <div
                className="bg-[#0079C3] rounded-[12px] size-[28px] shrink-0 flex items-center justify-center text-white font-heading font-bold text-[12px] leading-[16px]"
                data-node-id="280:92"
              >
                {initials}
              </div>
              <span
                className="text-white text-[13px] font-medium leading-[16px] whitespace-nowrap"
                data-node-id="280:95"
              >
                {displayName}
              </span>
              <div className="w-[7px] h-[4.3px] relative shrink-0" data-node-id="280:96">
                <Image
                  src="/assets/patient-home/dropdown-chevron.svg"
                  alt=""
                  width={7}
                  height={5}
                  unoptimized
                  className={`w-full h-full object-contain transition-transform duration-200 ${
                    profileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Profile Dropdown Menu matching Figma Component 1 (Node 280:98 / 280:99) */}
            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-[195px] bg-[#EAEDF6] rounded-b-[10px] rounded-t-[4px] p-[8px] flex flex-col gap-[8px] items-center z-50 shadow-2xl border border-[#D0DEFF] animate-in fade-in slide-in-from-top-2 duration-150"
                data-node-id="280:98"
              >
                {/* User Avatar + Full Name Header */}
                <div className="flex flex-col gap-[6px] items-center w-full pt-1" data-node-id="280:100">
                  <div className="size-[40px] rounded-full overflow-hidden relative shrink-0 ring-2 ring-[#078BDE]/40" data-node-id="280:101">
                    <Image
                      src="/assets/patient-home/user-avatar.png"
                      alt="Ahmed Hassan"
                      width={40}
                      height={40}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center font-medium text-[14px] text-[#078BDE] leading-[20px]" data-node-id="280:102">
                    {displayName}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono -mt-1">
                    {displayId}
                  </span>
                  {isProfileCompleted === false && (
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-semibold">
                      Profile Incomplete
                    </span>
                  )}
                </div>

                {/* Dropdown Options List */}
                <div className="flex flex-col gap-[4px] items-start w-full" data-node-id="280:103">
                  {/* Row 1: My Profile */}
                  <button
                    type="button"
                    onClick={handleProfileNavigation}
                    className="w-full bg-white border-b border-[#E9EFFD] hover:bg-[#F4F7FC] rounded-[10px] h-[35px] px-[12px] flex items-center justify-between transition-colors cursor-pointer"
                    data-node-id="280:104"
                  >
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[16px] relative shrink-0">
                        <Image
                          src="/assets/patient-home/menu-profile-icon.svg"
                          alt=""
                          width={16}
                          height={16}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-normal text-[#040A17] whitespace-nowrap">
                        My profile
                      </span>
                    </div>
                    <div className="size-[16px] relative shrink-0 rotate-180">
                      <Image
                        src="/assets/patient-home/menu-arrow-back-ios.svg"
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>

                  {/* Row 2: Personal Information */}
                  <button
                    type="button"
                    onClick={handlePersonalInformation}
                    className="w-full bg-white border-b border-[#E9EFFD] hover:bg-[#F4F7FC] rounded-[10px] h-[35px] px-[12px] flex items-center justify-between transition-colors cursor-pointer"
                    data-node-id="280:114"
                  >
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[16px] relative shrink-0">
                        <Image
                          src="/assets/patient-home/menu-personal-info.svg"
                          alt=""
                          width={16}
                          height={16}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-normal text-[#040A17] whitespace-nowrap">
                        Personal information
                      </span>
                    </div>
                    <div className="size-[16px] relative shrink-0 rotate-180">
                      <Image
                        src="/assets/patient-home/menu-arrow-back-ios.svg"
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>

                  {/* Row 3: Medical Information */}
                  <button
                    type="button"
                    onClick={handleMedicalInformation}
                    className="w-full bg-white border-b border-[#E9EFFD] hover:bg-[#F4F7FC] rounded-[10px] h-[35px] px-[12px] flex items-center justify-between transition-colors cursor-pointer"
                    data-node-id="280:124"
                  >
                    <div className="flex items-center gap-[8px]">
                      <div className="size-[16px] relative shrink-0">
                        <Image
                          src="/assets/patient-home/menu-medical-info.svg"
                          alt=""
                          width={16}
                          height={16}
                          unoptimized
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-normal text-[#040A17] whitespace-nowrap">
                        Medical Information
                      </span>
                    </div>
                    <div className="size-[16px] relative shrink-0 rotate-180">
                      <Image
                        src="/assets/patient-home/menu-arrow-back-ios.svg"
                        alt=""
                        width={16}
                        height={16}
                        unoptimized
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </button>

                  {/* Row 4: Sign Out */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full bg-white hover:bg-rose-50 rounded-[10px] h-[35px] px-[12px] flex items-center justify-between transition-colors cursor-pointer text-rose-600"
                  >
                    <div className="flex items-center gap-[8px]">
                      <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      <span className="text-[10px] font-semibold text-rose-600 whitespace-nowrap">
                        Sign Out
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Icon Button matching Figma Node 240:753 */}
          <button
            type="button"
            className="size-[40px] rounded-[12px] bg-[#EAEDF6] border border-[#D0DEFF] flex items-center justify-center p-px cursor-pointer hover:bg-white transition-colors"
            aria-label="Search records"
            data-node-id="240:753"
          >
            <div className="size-[24px] relative shrink-0" data-node-id="240:754">
              <Image
                src="/assets/patient-home/basil-search-outline.svg"
                alt="Search"
                width={24}
                height={24}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
          </button>

          {/* Notification Bell Icon Button with border matching Figma Node 299:5296 */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileMenuOpen(false);
              }}
              className="size-[40px] rounded-[12px] bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#078BDE] flex items-center justify-center p-[0.5px] cursor-pointer hover:bg-[rgba(192,202,227,0.2)] transition-colors relative"
              aria-label="Notifications"
              data-node-id="299:5296"
            >
              <div className="size-[24px] relative shrink-0" data-node-id="I299:5296;226:8047">
                <Image
                  src="/assets/patient-home/header-bell.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            {/* Notifications Popup */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150 text-slate-800">
                <p className="text-[13px] font-bold text-[#02307D] mb-2 px-1">Notifications</p>
                <div className="flex flex-col gap-2">
                  <div className="p-2 rounded-xl bg-sky-50 text-[12px] border border-sky-100">
                    <p className="font-semibold text-[#078BDE]">Access Request Pending</p>
                    <p className="text-slate-600">Dr. Sara Ahmed requested access to your Lab records.</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 text-[12px]">
                    <p className="font-semibold text-slate-700">New Lab Result</p>
                    <p className="text-slate-500">Comprehensive Lipid Panel uploaded by Cairo Clinical Labs.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
