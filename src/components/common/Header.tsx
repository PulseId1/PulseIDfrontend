"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { DemoService } from "@/lib/demo/demo-service";

interface HeaderProps {
  role?: "patient" | "doctor" | "pharmacist";
}

export function Header({ role }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, userId, isDemo } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace(`/auth/login${isDoctor ? "?role=doctor" : ""}`);
  };

  const isDoctor = role === "doctor" || pathname.startsWith("/doctor");

  const activeAccount = isDemo && typeof window !== "undefined" ? DemoService.getActiveAccount() : null;
  const displayName =
    isDemo && activeAccount?.fullName
      ? activeAccount.fullName
      : isDemo
      ? isDoctor
        ? "Dr. Mohamed"
        : "Sara Mahmoud Ibrahim"
      : userId
      ? `${isDoctor ? "Dr." : "Patient"} (${userId})`
      : isDoctor
      ? "Ahmed H."
      : "Sara M.";

  // Pill short name (e.g. "Ahmed H." or "Sara M.")
  const pillShortName =
    displayName.length > 12
      ? displayName.split(" ").slice(0, 2).map((part, i) => (i === 1 ? `${part[0]}.` : part)).join(" ")
      : displayName;

  const initials =
    displayName
      .replace(/^Dr\.\s*/i, "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("") || (isDoctor ? "AH" : "SM");

  // Dynamic Navigation Items
  const navItems = isDoctor
    ? [
        { label: "Home", href: "/doctor", exact: true },
        { label: "My Patients", href: "/doctor/find-patient" },
        { label: "Access Requests", href: "/doctor/access-requests" },
      ]
    : [
        { label: "Home", href: "/patient", exact: true },
        { label: "Medical Info", href: "/patient/medical-info" },
        { label: "Records", href: "/patient/records" },
        { label: "Access Requests", href: "/patient/access-requests" },
      ];

  const profileHref = isDoctor ? "/doctor/profile" : "/patient/profile";
  const personalInfoHref = isDoctor ? "/doctor/profile" : "/patient/profile/edit";
  const medicalInfoHref = isDoctor ? "/doctor/find-patient" : "/patient/medical-info";

  return (
    <header
      className="bg-[#02307d] content-stretch flex flex-col items-center relative w-full sticky top-0 z-50 shadow-md"
      data-node-id="353:10098"
      data-name="Header"
    >
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 pointer-events-none" data-node-id="353:10099" data-name="Header:shadow" />
      <div className="h-[80px] max-w-[1280px] w-full relative shrink-0" data-node-id="353:10100" data-name="Container">
        <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex items-center justify-between max-w-[inherit] px-[32px] relative size-full">
          {/* Brand Logo & Name matching Figma Node 353:10101 */}
          <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-[198px]" data-node-id="353:10101">
            <Link href={isDoctor ? "/doctor" : "/patient"} className="flex items-center gap-[12px]">
              <div className="h-[30px] relative shrink-0 w-[32px]" data-node-id="353:10102">
                <Image
                  src="/assets/doctor/imgFrame1171276973.svg"
                  alt="PulseID Logo Mark"
                  width={32}
                  height={30}
                  className="absolute block inset-0 max-w-none size-full"
                  priority
                />
              </div>
              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[156px]" data-node-id="353:10121" data-name="Container">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="353:10122" data-name="Container">
                  <div className="break-words flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white tracking-[0.9px] whitespace-nowrap" data-node-id="353:10123">
                    <p className="leading-[18px]">PULSEID</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Center Nav Links matching Figma Node 353:10124 */}
          <nav
            className="hidden md:flex bg-[rgba(192,202,227,0.1)] border border-[rgba(192,202,227,0.1)] border-solid content-stretch gap-[4px] items-center p-[7px] relative rounded-[12px] shrink-0"
            data-node-id="353:10124"
            data-name="Center Nav Links: Home (Active) & About"
          >
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <div
                  key={item.label}
                  className={`relative rounded-[12px] shrink-0 transition-all ${
                    isActive ? "bg-[#078bde] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" : ""
                  }`}
                  data-node-id="353:10125"
                  data-name="Link"
                >
                  <Link
                    href={item.href}
                    className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex gap-[6px] items-center px-[20px] py-[8px] relative size-full"
                  >
                    {isActive && (
                      <div className="bg-white relative rounded-[12px] shrink-0 size-[6px]" data-node-id="353:10126" data-name="Background" />
                    )}
                    <div className="break-words flex flex-col font-['Inter'] font-normal justify-center leading-[0] relative shrink-0 text-[#eaedf6] text-[14px] whitespace-nowrap">
                      <p className="leading-normal">{item.label}</p>
                    </div>
                  </Link>
                </div>
              );
            })}

            {/* Language Toggle Link matching Figma Node 353:10132 */}
            <div className="relative rounded-[12px] shrink-0" data-node-id="353:10132" data-name="Link">
              <button
                type="button"
                className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-start px-[20px] py-[8px] relative size-full cursor-pointer"
              >
                <div className="break-words flex flex-col font-['Inter'] font-normal justify-center leading-[0] relative shrink-0 text-[#eaedf6] text-[14px] text-center w-[40px]">
                  <p className="leading-normal" dir="auto">عربي</p>
                </div>
              </button>
            </div>
          </nav>

          {/* Right Actions matching Figma Node 353:10134 */}
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="353:10134" data-name="Right Actions: Secondary 'Log In' & Primary 'Create Account">
            {/* User Quick Pill Container (Component 76 in Figma) */}
            <div className="content-stretch flex flex-col gap-[22px] h-[40px] items-end relative shrink-0 w-[201px]" data-node-id="353:10135" data-name="Component 76" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[30px] items-center pb-[5px] pl-[5px] pr-[9px] pt-[7px] relative rounded-[12px] shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
                data-node-id="I353:10135;285:6404"
                data-name="User Quick Pill"
              >
                <div className="bg-[#0079c3] relative rounded-[12px] shrink-0 size-[28px]" data-node-id="I353:10135;285:6405" data-name="Background">
                  <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex items-center justify-center relative size-full">
                    <div className="break-words flex flex-col font-['Space_Grotesk'] font-bold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap" data-node-id="I353:10135;285:6406">
                      <p className="leading-[16px]">{initials}</p>
                    </div>
                  </div>
                </div>

                <div className="relative shrink-0" data-node-id="I353:10135;285:6407" data-name="Container">
                  <div className="bg-clip-padding border-0 border-transparent border-solid content-stretch flex flex-col items-start relative size-full">
                    <div className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">
                      <p className="leading-[16px]">{pillShortName}</p>
                    </div>
                  </div>
                </div>

                <div className="h-[4.317px] relative shrink-0 w-[7px]" data-node-id="I353:10135;285:6409" data-name="Container">
                  <Image
                    src="/assets/doctor/imgContainer3.svg"
                    alt="Arrow"
                    width={7}
                    height={4}
                    className="absolute block inset-0 max-w-none size-full object-contain"
                  />
                </div>
              </button>

              {/* Exact Dropdown Menu matching Figma Node I353:10135;285:6446 */}
              {profileDropdownOpen && (
                <div
                  className="bg-[#eaedf6] overflow-clip absolute top-[44px] right-0 rounded-[12px] shadow-2xl z-50 w-[201px] p-[10px] animate-in fade-in slide-in-from-top-2 duration-150 border border-slate-200"
                  data-node-id="I353:10135;285:6446"
                >
                  <div className="content-stretch flex flex-col gap-[8px] items-center w-full" data-node-id="I353:10135;285:6447">
                    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-full" data-node-id="I353:10135;285:6448">
                      <div className="relative rounded-[40px] shrink-0 size-[40px] overflow-hidden" data-node-id="I353:10135;285:6449">
                        <Image
                          src={isDoctor ? "/assets/doctor/imgPatientPhoto.png" : "/assets/doctor/imgFrame1171277910.png"}
                          alt={displayName}
                          width={40}
                          height={40}
                          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[40px] size-full"
                        />
                      </div>
                      <div className="break-words flex flex-col font-['Inter'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#078bde] w-full text-center" data-node-id="I353:10135;285:6450">
                        <p className="leading-[20px] truncate">{displayName}</p>
                      </div>
                    </div>

                    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="I353:10135;285:6451">
                      {/* Row 1: My profile */}
                      <Link
                        href={profileHref}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="bg-white border-b border-[#e9effd] border-solid content-stretch flex h-[35px] items-center justify-between px-[12px] py-[20px] relative rounded-[10px] shrink-0 w-full hover:bg-slate-50 transition-colors"
                        data-node-id="I353:10135;285:6452"
                      >
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I353:10135;285:6455" data-name="gg:profile">
                            <Image
                              src="/assets/doctor/imgGroup.svg"
                              alt="Profile"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                          <p className="font-['Inter'] font-normal text-[10px] text-[#040a17] leading-[20px] whitespace-nowrap">
                            My profile
                          </p>
                        </div>
                        <div className="flex items-center justify-center relative shrink-0 rotate-180">
                          <div className="relative size-[16px]">
                            <Image
                              src="/assets/doctor/imgIcRoundArrowBackIos.svg"
                              alt="Arrow"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                        </div>
                      </Link>

                      {/* Row 2: Personal information */}
                      <Link
                        href={personalInfoHref}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="bg-white border-b border-[#e9effd] border-solid content-stretch flex h-[35px] items-center justify-between px-[12px] py-[20px] relative rounded-[10px] shrink-0 w-full hover:bg-slate-50 transition-colors"
                        data-node-id="I353:10135;285:6462"
                      >
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="I353:10135;285:6465" data-name="reicon:side-profile">
                            <Image
                              src="/assets/doctor/imgGroup1.svg"
                              alt="Personal info"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                          <p className="font-['Inter'] font-normal text-[10px] text-[#040a17] leading-[20px] whitespace-nowrap">
                            Personal info
                          </p>
                        </div>
                        <div className="flex items-center justify-center relative shrink-0 rotate-180">
                          <div className="relative size-[16px]">
                            <Image
                              src="/assets/doctor/imgIcRoundArrowBackIos.svg"
                              alt="Arrow"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                        </div>
                      </Link>

                      {/* Row 3: Medical Information */}
                      <Link
                        href={medicalInfoHref}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="bg-white border-b border-[#e9effd] border-solid content-stretch flex h-[35px] items-center justify-between px-[12px] py-[20px] relative rounded-[10px] shrink-0 w-full hover:bg-slate-50 transition-colors"
                        data-node-id="I353:10135;285:6472"
                      >
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="relative shrink-0 size-[16px]" data-node-id="I353:10135;285:6475" data-name="streamline:user-profile-focus">
                            <Image
                              src="/assets/doctor/imgStreamlineUserProfileFocus.svg"
                              alt="Medical info"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                          <p className="font-['Inter'] font-normal text-[10px] text-[#040a17] leading-[20px] whitespace-nowrap">
                            {isDoctor ? "Patient Lookup" : "Medical Info"}
                          </p>
                        </div>
                        <div className="flex items-center justify-center relative shrink-0 rotate-180">
                          <div className="relative size-[16px]">
                            <Image
                              src="/assets/doctor/imgIcRoundArrowBackIos.svg"
                              alt="Arrow"
                              width={16}
                              height={16}
                              className="absolute block inset-0 max-w-none size-full"
                            />
                          </div>
                        </div>
                      </Link>

                      {/* Sign out link */}
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className="bg-white border-b border-rose-100 flex h-[35px] items-center justify-between px-[12px] py-[18px] rounded-[10px] w-full text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                      >
                        <span className="font-['Inter'] font-bold text-[10px] whitespace-nowrap">
                          Sign Out
                        </span>
                        <span className="text-[12px]">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Button matching Figma Node 353:10136 */}
            <Link
              href={isDoctor ? "/doctor/find-patient" : "/patient/records"}
              className="bg-[#eaedf6] border border-[#d0deff] border-solid content-stretch cursor-pointer flex flex-col items-center justify-center p-px relative rounded-[12px] shrink-0 size-[40px] hover:bg-white transition-colors"
              data-node-id="353:10136"
              data-name="Button - Toggle navigation drawer"
              title="Search"
            >
              <div className="relative shrink-0 size-[24px]" data-node-id="I353:10136;226:8044" data-name="basil:search-outline">
                <Image
                  src="/assets/doctor/imgBasilSearchOutline.svg"
                  alt="Search"
                  width={24}
                  height={24}
                  className="absolute block inset-0 max-w-none size-full object-contain"
                />
              </div>
            </Link>

            {/* Notifications Button matching Figma Node 353:10137 */}
            <button
              type="button"
              className="bg-[rgba(192,202,227,0.1)] border-[0.5px] border-[#078bde] border-solid content-stretch flex flex-col items-center justify-center p-[0.5px] relative rounded-[12px] shrink-0 size-[40px] hover:bg-white/10 transition-colors cursor-pointer"
              data-node-id="353:10137"
              data-name="Button - Toggle navigation drawer"
              title="Notifications"
            >
              <div className="relative shrink-0 size-[24px]" data-node-id="I353:10137;226:8047" data-name="ic:outline-notifications">
                <Image
                  src="/assets/doctor/imgIcOutlineNotifications.svg"
                  alt="Notifications"
                  width={24}
                  height={24}
                  className="absolute block inset-0 max-w-none size-full object-contain"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

