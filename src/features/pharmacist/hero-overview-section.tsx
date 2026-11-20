"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroOverviewSection() {
  return (
    <section
      aria-label="3 Overview Statistics Cards"
      className="content-stretch flex flex-col md:flex-row gap-[20px] items-start justify-center relative w-full"
      data-node-id="609:11947"
      data-name="HeroOverviewSection → 3 Overview Statistics Cards"
    >
      {/* Stat Card 1: Today's Dispensing matching Figma Node 609:11948 */}
      <Link
        href="/pharmacist/dispense"
        className="bg-white border border-[#dde7ff] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-1 flex-col gap-[4px] items-start min-w-px p-[21px] relative rounded-[16px] hover:border-[#078bde] transition-all cursor-pointer group w-full"
        data-node-id="609:11948"
        data-name="Stat Card 1"
      >
        <div className="relative shrink-0 w-full" data-node-id="609:11949">
          <div className="flex items-center justify-between relative size-full">
            <div className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px] whitespace-nowrap" data-node-id="609:11951">
              Today’s Dispensing
            </div>
            <div
              className="bg-[rgba(139,139,139,0.2)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]"
              data-node-id="609:11952"
              data-name="Background"
            >
              <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:11953">
                <Image
                  src="/assets/pharmacist/785ab656800f6d688da57dfbae9bff3f284db3bc.svg"
                  alt="Today's Dispensing"
                  width={24}
                  height={24}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[48px] relative shrink-0 w-full" data-node-id="609:11960">
          <div className="flex items-center justify-between relative size-full">
            <div
              className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px] whitespace-nowrap"
              data-node-id="609:11961"
            >
              24 Operations
            </div>
            <div
              className="bg-[rgba(139,139,139,0.2)] flex items-center px-[10px] py-[2px] rounded-[9999px]"
              data-node-id="609:11962"
            >
              <div className="font-['Inter'] font-semibold text-[12px] text-[#01091e] whitespace-nowrap leading-[16px]" data-node-id="609:11963">
                Completed today
              </div>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 w-full" data-node-id="609:11964">
          <div className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px] w-full" data-node-id="609:11965">
            Prescription and OTC dispensing today
          </div>
        </div>
      </Link>

      {/* Stat Card 2: Pending Prescriptions matching Figma Node 609:11966 */}
      <Link
        href="/pharmacist/prescriptions"
        className="bg-white border border-[#dde7ff] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-1 flex-col gap-[4px] items-start min-w-px p-[21px] relative rounded-[16px] hover:border-[#078bde] transition-all cursor-pointer group w-full"
        data-node-id="609:11966"
        data-name="Stat Card 2"
      >
        <div className="relative shrink-0 w-full" data-node-id="609:11967">
          <div className="flex items-center justify-between relative size-full">
            <div className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px] whitespace-nowrap" data-node-id="609:11969">
              Pending Prescriptions
            </div>
            <div
              className="bg-[rgba(142,191,222,0.2)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]"
              data-node-id="609:11970"
              data-name="Background"
            >
              <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:11971">
                <Image
                  src="/assets/pharmacist/70c2f7cf5151623538049124cb0e9e9f77c97436.svg"
                  alt="Pending Prescriptions"
                  width={24}
                  height={24}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[48px] relative shrink-0 w-full" data-node-id="609:11973">
          <div className="flex items-center justify-between relative size-full">
            <div
              className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px] whitespace-nowrap"
              data-node-id="609:11974"
            >
              8 Pending
            </div>
            <div
              className="bg-[rgba(142,191,222,0.2)] flex items-center px-[10px] py-[2px] rounded-[9999px]"
              data-node-id="609:11975"
            >
              <div className="font-['Inter'] font-semibold text-[12px] text-[#045385] whitespace-nowrap leading-[16px]" data-node-id="609:11976">
                Awaiting dispensing
              </div>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 w-full" data-node-id="609:11977">
          <div className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px] w-full" data-node-id="609:11978">
            Prescriptions awaiting medication dispensing
          </div>
        </div>
      </Link>

      {/* Stat Card 3: Patients Served matching Figma Node 609:11979 */}
      <Link
        href="/pharmacist/patient"
        className="bg-white border border-[#dde7ff] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-1 flex-col gap-[4px] items-start min-w-px p-[21px] relative rounded-[16px] hover:border-[#078bde] transition-all cursor-pointer group w-full"
        data-node-id="609:11979"
        data-name="Stat Card 3"
      >
        <div className="relative shrink-0 w-full" data-node-id="609:11980">
          <div className="flex items-center justify-between relative size-full">
            <div className="font-['Inter'] font-semibold text-[14px] text-[#41474f] leading-[20px] whitespace-nowrap" data-node-id="609:11982">
              Patients Served
            </div>
            <div
              className="bg-[rgba(68,239,99,0.1)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]"
              data-node-id="609:11983"
              data-name="Background"
            >
              <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:11984">
                <Image
                  src="/assets/pharmacist/279a23da6922f36a34e0e6960824d0797e103a2f.svg"
                  alt="Patients Served"
                  width={24}
                  height={24}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-[48px] relative shrink-0 w-full" data-node-id="609:11987">
          <div className="flex items-center justify-between relative size-full">
            <div
              className="font-['Inter'] font-bold text-[30px] text-[#078bde] leading-[36px] whitespace-nowrap"
              data-node-id="609:11988"
            >
              148 Patients
            </div>
            <div
              className="bg-[rgba(68,239,99,0.1)] flex items-center px-[10px] py-[2px] rounded-[9999px]"
              data-node-id="609:11989"
            >
              <div className="font-['Inter'] font-semibold text-[12px] text-[#047857] whitespace-nowrap leading-[16px]" data-node-id="609:11990">
                Updated today
              </div>
            </div>
          </div>
        </div>

        <div className="relative shrink-0 w-full" data-node-id="609:11991">
          <div className="font-['Inter'] font-normal text-[12px] text-[#727272] leading-[16px] w-full" data-node-id="609:11992">
            Patients served through prescription and OTC care
          </div>
        </div>
      </Link>
    </section>
  );
}
