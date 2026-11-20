"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UIPatientProfile } from "@/lib/api/patient-types";

interface ContactInfoCardProps {
  readonly profile: UIPatientProfile;
}

export function ContactInfoCard({ profile }: ContactInfoCardProps) {
  return (
    <div
      className="bg-white border border-[#bfc7d3]/70 rounded-[8px] p-[24px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] flex flex-col justify-between gap-[24px]"
      data-node-id="299:6628"
      data-name="Contact Information"
    >
      <div>
        {/* Card Heading matching Figma Node 299:6629 */}
        <div
          className="border-b border-[#bfc7d3]/30 flex items-center justify-between pb-[16px] w-full"
          data-node-id="299:6629"
        >
          <div className="flex items-center gap-[12px]" data-node-id="299:6630">
            <div
              className="bg-[#f1f3ff] rounded-[8px] size-[36px] flex items-center justify-center shrink-0"
              data-node-id="299:6631"
            >
              <Image
                src="/assets/phone-blue.svg"
                alt=""
                width={19}
                height={19}
                unoptimized
                className="size-[19px]"
                data-node-id="299:6632"
              />
            </div>
            <h2
              className="font-bold text-[20px] text-[#01091e] font-heading whitespace-nowrap"
              data-node-id="299:6634"
            >
              Contact Information
            </h2>
          </div>

          <Link
            href="/patient/profile/edit"
            className="bg-white border border-[#d0deff] rounded-[8px] px-[16px] py-[9px] flex items-center gap-[8px] text-[13px] font-bold text-[#01091e] hover:bg-slate-50 transition-colors shrink-0"
            data-node-id="299:6635"
          >
            <Image
              src="/assets/pencil.svg"
              alt=""
              width={14}
              height={14}
              unoptimized
              className="size-[14px]"
              data-node-id="299:6636"
            />
            <span data-node-id="299:6638">Edit</span>
          </Link>
        </div>

        {/* Data Fields */}
        <div className="flex flex-col gap-[16px] pt-[20px]">
          <div className="flex flex-col gap-[6px]" data-node-id="299:6639">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6640">
              Phone Number
            </span>
            <p className="text-[15px] font-semibold text-[#01091e] font-mono" data-node-id="299:6641">
              {profile.phone || "+20 100 123 4567"}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]" data-node-id="299:6642">
            <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6643">
              Email Address
            </span>
            <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6644">
              {profile.email || "ahmed.hassan@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy note matching Figma 299:6645 */}
      <div
        className="border-t border-[#bfc7d3]/30 pt-[16px] flex items-center gap-[8px]"
        data-node-id="299:6645"
      >
        <div className="shrink-0 w-[14px] h-[16px]" data-node-id="299:6646">
          <Image
            src="/assets/lock-keyhole.svg"
            alt=""
            width={14}
            height={16}
            unoptimized
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-[12px] text-[#41474f] font-normal font-sans" data-node-id="299:6648">
          Your contact details are kept private and secure.
        </p>
      </div>
    </div>
  );
}
