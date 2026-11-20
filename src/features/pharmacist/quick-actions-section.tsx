"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function QuickActionsSection() {
  const router = useRouter();
  const [patientSearch, setPatientSearch] = useState("");

  const handlePatientSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientSearch.trim()) {
      router.push(`/pharmacist/patient?q=${encodeURIComponent(patientSearch.trim())}`);
    } else {
      router.push("/pharmacist/patient");
    }
  };

  return (
    <section
      aria-label="Quick Actions"
      className="content-stretch flex flex-col gap-[16px] items-start relative w-full"
      data-node-id="609:11993"
      data-name="QuickActionsSection"
    >
      {/* Heading Container matching Figma Node 609:11994 */}
      <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-full" data-node-id="609:11994">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:11995" data-name="Heading 2">
          <div className="[word-break:break-word] flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-[#078bde] tracking-[-0.6px] w-full" data-node-id="609:11996">
            <p className="leading-[32px]">Quick Actions</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:11997">
          <div className="[word-break:break-word] flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#41474f] w-full" data-node-id="609:11998">
            <p className="leading-[20px]">Direct access to patient lookup, prescription review, and safe medication dispensing.</p>
          </div>
        </div>
      </div>

      {/* 3 Action Cards matching Figma Node 609:11999 */}
      <div className="content-stretch flex flex-col md:flex-row gap-[24px] items-start justify-center relative shrink-0 w-full" data-node-id="609:11999" data-name="3 Quick Action Cards">
        
        {/* Card 1: Find Patient matching Figma Node 609:12000 */}
        <div
          className="bg-white border-2 border-[rgba(7,139,222,0.4)] border-solid content-stretch flex flex-1 flex-col items-start justify-between min-w-px p-[26px] relative rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] w-full min-h-[262.5px]"
          data-node-id="609:12000"
          data-name="Action Card 1: Find Patient"
        >
          <div className="relative shrink-0 w-full" data-node-id="609:12002">
            <div className="content-stretch flex flex-col gap-[6.9px] items-start relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="609:12003">
                <div className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-node-id="609:12004">
                  <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:12005">
                    <Image
                      src="/assets/pharmacist/38aeaad45a8148c71049cb40bfd845ffe5e101d0.svg"
                      alt="Search"
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-node-id="609:12007">
                  <div className="relative shrink-0 size-[20px] flex items-center justify-center" data-node-id="609:12008">
                    <Image
                      src="/assets/pharmacist/eccb1aea15133ce079fa3aa5d60cc86638d2d5f3.svg"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pt-[13.1px] relative shrink-0 w-full" data-node-id="609:12010">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#02307d] w-full" data-node-id="609:12011">
                  <p className="leading-normal">Find Patient</p>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="609:12012">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#41474f] w-full" data-node-id="609:12013">
                  <p className="leading-normal">Search for a patient using their National ID or full name.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-full pt-[24px]" data-node-id="609:12014">
            <div className="border-[#e9effd] border-solid border-t content-stretch flex flex-col items-start pt-[17px] relative shrink-0 w-full" data-node-id="609:12015">
              <form onSubmit={handlePatientSearchSubmit} className="relative w-full" data-node-id="609:12016">
                <div className="bg-[rgba(192,202,227,0.1)] border border-[#d0deff] border-solid content-stretch flex items-center overflow-hidden pl-[13px] pr-[76px] py-[6px] relative rounded-[8px] shrink-0 w-full" data-node-id="609:12017">
                  <input
                    type="text"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="National ID or full name..."
                    className="w-full bg-transparent font-['Inter'] font-normal text-[12px] text-[#41474f] placeholder:text-[#41474f]/70 outline-none"
                    data-node-id="609:12019"
                  />
                  <button
                    type="submit"
                    className="absolute right-[4px] top-1/2 -translate-y-1/2 bg-[#078bde] hover:bg-[#0677BF] transition-colors content-stretch flex items-center justify-center px-[12px] py-[6px] rounded-[6px] cursor-pointer"
                    data-node-id="609:12020"
                  >
                    <span className="font-['Inter'] font-semibold text-[12px] text-white text-center whitespace-nowrap" data-node-id="609:12021">
                      Search
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Card 2: Manage Prescriptions matching Figma Node 609:12022 */}
        <Link
          href="/pharmacist/prescriptions"
          className="bg-white border border-[#d0deff] border-solid content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#078bde] transition-all flex flex-1 flex-col justify-between min-w-px p-[25px] relative rounded-[16px] w-full min-h-[262.5px] group cursor-pointer"
          data-node-id="609:12022"
          data-name="Action Card 2: Manage Prescriptions"
        >
          <div className="relative shrink-0 w-full" data-node-id="609:12023">
            <div className="content-stretch flex flex-col gap-[6.9px] items-start relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="609:12024">
                <div className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-node-id="609:12025">
                  <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:12026">
                    <Image
                      src="/assets/pharmacist/660f97acf6e91b06429bf2985ae90c3971fdb649.svg"
                      alt="Prescriptions"
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-node-id="609:12028">
                  <div className="relative shrink-0 size-[20px] flex items-center justify-center" data-node-id="609:12029">
                    <Image
                      src="/assets/pharmacist/eccb1aea15133ce079fa3aa5d60cc86638d2d5f3.svg"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pt-[13.1px] relative shrink-0 w-full" data-node-id="609:12031">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#02307d] w-full" data-node-id="609:12032">
                  <p className="leading-normal">Manage Prescriptions</p>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="609:12033">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#41474f] w-full" data-node-id="609:12034">
                  <p className="leading-normal">Review prescriptions, medication details, dosages, and dispensing status.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-full pt-[24px]" data-node-id="609:12035">
            <div className="border-[#e9effd] border-solid border-t content-stretch flex gap-[4px] items-center pt-[17px] relative shrink-0 w-full" data-node-id="609:12036">
              <div className="[word-break:break-word] flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#078bde] group-hover:underline whitespace-nowrap" data-node-id="609:12037">
                <p className="leading-normal">View Prescriptions</p>
              </div>
              <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-node-id="609:12038">
                <Image
                  src="/assets/pharmacist/814b5c82d3f0db55c1db56bbaac96c7f6eb56d24.svg"
                  alt="Arrow right"
                  width={16}
                  height={16}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Card 3: OTC Dispensing matching Figma Node 609:12040 */}
        <Link
          href="/pharmacist/otc"
          className="bg-white border border-[#d0deff] border-solid content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#078bde] transition-all flex flex-1 flex-col justify-between min-w-px p-[25px] relative rounded-[16px] w-full min-h-[262.5px] group cursor-pointer"
          data-node-id="609:12040"
          data-name="Action Card 3: OTC Dispensing"
        >
          <div className="relative shrink-0 w-full" data-node-id="609:12041">
            <div className="content-stretch flex flex-col gap-[6.9px] items-start relative size-full">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="609:12042">
                <div className="bg-[rgba(142,191,222,0.2)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-node-id="609:12043">
                  <div className="relative shrink-0 size-[24px] flex items-center justify-center" data-node-id="609:12044">
                    <Image
                      src="/assets/pharmacist/03e71ebf628db2c973816401e9371fc1f8fc17e5.svg"
                      alt="OTC"
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-node-id="609:12050">
                  <div className="relative shrink-0 size-[20px] flex items-center justify-center" data-node-id="609:12051">
                    <Image
                      src="/assets/pharmacist/eccb1aea15133ce079fa3aa5d60cc86638d2d5f3.svg"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pt-[13.1px] relative shrink-0 w-full" data-node-id="609:12053">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[#02307d] w-full" data-node-id="609:12054">
                  <p className="leading-normal">OTC Dispensing</p>
                </div>
              </div>

              <div className="content-stretch flex flex-col items-start pb-[0.625px] relative shrink-0 w-full" data-node-id="609:12055">
                <div className="[word-break:break-word] flex flex-col font-['Inter'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#41474f] w-full" data-node-id="609:12056">
                  <p className="leading-normal">Record over-the-counter medication dispensing and review patient safety information.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-full pt-[24px]" data-node-id="609:12057">
            <div className="border-[#e9effd] border-solid border-t content-stretch flex gap-[4px] items-center pt-[17px] relative shrink-0 w-full" data-node-id="609:12058">
              <div className="[word-break:break-word] flex flex-col font-['Inter'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[#078bde] group-hover:underline whitespace-nowrap" data-node-id="609:12059">
                <p className="leading-normal">Start Dispensing</p>
              </div>
              <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-node-id="609:12060">
                <Image
                  src="/assets/pharmacist/814b5c82d3f0db55c1db56bbaac96c7f6eb56d24.svg"
                  alt="Arrow right"
                  width={16}
                  height={16}
                  className="size-full object-contain"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
