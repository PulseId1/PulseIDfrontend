"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UIPatientProfile } from "@/lib/api/patient-types";
import { formatDateOfBirth } from "../../hooks/use-patient-profile";

interface PersonalInfoCardProps {
  readonly profile: UIPatientProfile;
}

export function PersonalInfoCard({ profile }: PersonalInfoCardProps) {
  return (
    <div
      className="bg-white border border-[#bfc7d3]/70 rounded-[8px] p-[24px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] flex flex-col justify-between gap-[24px]"
      data-node-id="299:6600"
      data-name="Personal Information"
    >
      <div>
        {/* Card Heading matching Figma Node 299:6601 */}
        <div
          className="border-b border-[#bfc7d3]/30 flex items-center justify-between pb-[16px] w-full"
          data-node-id="299:6601"
        >
          <div className="flex items-center gap-[12px]" data-node-id="299:6602">
            <div
              className="bg-[#f1f3ff] rounded-[8px] size-[36px] flex items-center justify-center shrink-0"
              data-node-id="299:6603"
            >
              <Image
                src="/assets/user-round.svg"
                alt=""
                width={19}
                height={19}
                unoptimized
                className="size-[19px]"
                data-node-id="299:6604"
              />
            </div>
            <h2
              className="font-bold text-[20px] text-[#01091e] font-heading whitespace-nowrap"
              data-node-id="299:6606"
            >
              Personal Information
            </h2>
          </div>

          <Link
            href="/patient/profile/edit"
            className="bg-white border border-[#d0deff] rounded-[8px] px-[16px] py-[9px] flex items-center gap-[8px] text-[13px] font-bold text-[#01091e] hover:bg-slate-50 transition-colors shrink-0"
            data-node-id="299:6607"
          >
            <Image
              src="/assets/pencil.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
              className="size-[14px]"
              data-node-id="299:6608"
            />
            <span data-node-id="299:6610">Edit</span>
          </Link>
        </div>

        {/* Personal Details Row 1 matching Figma 299:6611 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-[20px]" data-node-id="299:6611">
          <div className="flex flex-col gap-[6px]" data-node-id="299:6612">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6613">
              Full Name
            </span>
            <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6614">
              {profile.nameEn || "Ahmed Hassan"}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]" data-node-id="299:6615">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6616">
              Date of Birth
            </span>
            <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6617">
              {formatDateOfBirth(profile.birthDate) || "15 March 1992"}
            </p>
          </div>
        </div>

        {/* Identity Details Row 2 matching Figma 299:6618 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-[16px]" data-node-id="299:6618">
          <div className="flex flex-col gap-[6px]" data-node-id="299:6619">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6620">
              Gender
            </span>
            <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6621">
              {profile.genderTypeId === 1 ? "Male" : profile.genderTypeId === 2 ? "Female" : "Male"}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]" data-node-id="299:6622">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6623">
              National ID
            </span>
            <p className="text-[15px] font-semibold text-[#01091e] font-mono" data-node-id="299:6624">
              {profile.nationalId || "29203150101234"}
            </p>
          </div>
        </div>

        {/* Address Field matching Figma 299:6625 */}
        <div className="flex flex-col gap-[6px] pt-[16px]" data-node-id="299:6625">
          <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6626">
            Address
          </span>
          <p className="text-[15px] font-semibold text-[#01091e] leading-relaxed" data-node-id="299:6627">
            {profile.address || "24 El Nozha Street, Heliopolis, Cairo, Egypt"}
          </p>
        </div>
      </div>
    </div>
  );
}
