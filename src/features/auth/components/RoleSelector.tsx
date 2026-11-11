"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthRole } from "../types/auth";
import { AuthCardShell } from "./AuthCardShell";

interface RoleCardItem {
  id: AuthRole;
  title: string;
  iconPath: string;
}

const ROLES: RoleCardItem[] = [
  {
    id: "patient",
    title: "Patient",
    iconPath: "/assets/auth/role-patient.svg",
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    iconPath: "/assets/auth/role-pharmacist.svg",
  },
  {
    id: "doctor",
    title: "Doctor",
    iconPath: "/assets/auth/role-doctor.svg",
  },
];

export function RoleSelector() {
  const router = useRouter();

  const handleSelectRole = (roleId: AuthRole) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pulseid_selected_role", roleId);
    }
    router.push(`/auth/register?role=${roleId}`);
  };

  return (
    <AuthCardShell heroImage="/assets/auth/auth-role-hero.png">
      <div className="w-full max-w-[421px] flex flex-col items-start min-w-0" data-node-id="238:668">
        {/* Heading Block matching Figma node 238:669 */}
        <div className="pb-[40px] w-full" data-node-id="238:669">
          <div className="flex flex-col gap-[8px] items-start w-full" data-node-id="238:670">
            <h1 className="text-[30px] font-bold leading-normal font-sans" data-node-id="238:671">
              <span className="text-[#02307D]">Welcome to </span>
              <span className="text-[#078BDE]">PulseID</span>
            </h1>
            <p className="text-[16px] text-[#41474F] font-normal leading-normal" data-node-id="238:674">
              Choose your account type
            </p>
          </div>
        </div>

        {/* Role Options matching Figma node 238:675 */}
        <div className="flex flex-col gap-[8px] w-full max-w-[358px]" data-node-id="238:675">
          {ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => handleSelectRole(role.id)}
              className="bg-white border-b border-[#E9EFFD] px-[12px] py-[20px] rounded-[10px] flex items-center justify-between w-full hover:bg-slate-50/80 cursor-pointer transition-colors group text-left"
            >
              <div className="flex items-center gap-[21px]">
                <div className="w-[30px] h-[30px] relative flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src={role.iconPath}
                    alt={role.title}
                    width={30}
                    height={30}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[14px] font-medium text-[#040A17] group-hover:text-[#078BDE] transition-colors leading-[20px]">
                  {role.title}
                </span>
              </div>

              <div className="w-5 h-5 relative flex items-center justify-center shrink-0">
                <Image
                  src="/assets/auth/arrow-chevron-right.svg"
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="w-full h-full object-contain transition-transform group-hover:translate-x-1"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Link matching Figma node 238:702 */}
        <div className="pt-[40px] w-full flex items-center justify-center" data-node-id="238:702">
          <p className="text-[14px] text-[#41474F] text-center">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#078BDE] font-bold hover:underline transition-colors ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthCardShell>
  );
}
