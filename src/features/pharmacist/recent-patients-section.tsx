"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function RecentPatientsSection() {
  const recentPatients = [
    {
      id: "PT-10482",
      name: "Ahmed Hassan",
      timestamp: "Today, 10:30 AM",
      avatar: "/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png",
      tag: "Dispensed",
      tagBg: "bg-[#ecfdf5]",
      tagText: "text-[#047857]",
      medication: "Atorvastatin 20 mg",
    },
    {
      id: "PT-10312",
      name: "Farida El-Sayed",
      timestamp: "Yesterday, 02:15 PM",
      avatar: "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png",
      tag: "Refill",
      tagBg: "bg-[#eff6ff]",
      tagText: "text-[#1d4ed8]",
      medication: "Lisinopril 10 mg",
    },
    {
      id: "PT-10550",
      name: "Omar Abdelaziz",
      timestamp: "Nov 10, 2026",
      avatar: "/assets/pharmacist/62ac8540e98b2a02d94d67498b0383b9a21ec7dc.png",
      tag: "OTC",
      tagBg: "bg-[#fffbeb]",
      tagText: "text-[#b45309]",
      medication: "Paracetamol 500 mg",
    },
    {
      id: "PT-10772",
      name: "Nourhan Mostafa",
      timestamp: "Nov 9, 2026",
      avatar: "/assets/pharmacist/1af2086220affecd5f498aeca93f64918a91bf86.png",
      tag: "OTC",
      tagBg: "bg-[#f1f5f9]",
      tagText: "text-[#334155]",
      medication: "Cetirizine 10 mg",
    },
  ];

  return (
    <section
      aria-label="Recently Served Patients"
      className="content-stretch flex flex-col gap-[16px] items-start relative w-full mb-12"
      data-node-id="609:12145"
      data-name="MyPatientsSection"
    >
      {/* Header Container matching Figma Node 609:12146 */}
      <div className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative shrink-0 w-full" data-node-id="609:12146">
        <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-node-id="609:12147">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:12148">
            <h2 className="[word-break:break-word] font-['Inter'] font-bold text-[24px] text-[#040a17] tracking-[-0.6px] leading-[32px] whitespace-nowrap" data-node-id="609:12149">
              Recently Served Patients
            </h2>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:12150">
            <p className="[word-break:break-word] font-['Inter'] font-normal text-[14px] text-[#475569] leading-[20px] whitespace-nowrap" data-node-id="609:12151">
              Patients recently served through prescription and OTC dispensing.
            </p>
          </div>
        </div>

        <Link
          href="/pharmacist/patient"
          className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[#078bde] hover:underline cursor-pointer"
          data-node-id="609:12152"
        >
          <span className="[word-break:break-word] font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap" data-node-id="609:12153">
            See All Patients
          </span>
          <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-node-id="609:12154">
            <Image
              src="/assets/pharmacist/9dd5afa7a62830ceafc0c119c2c5edd40d41ee79.svg"
              alt="Arrow right"
              width={16}
              height={16}
              className="size-full object-contain"
            />
          </div>
        </Link>
      </div>

      {/* 4 Patient Cards Grid matching Figma Node 609:12156 */}
      <div className="content-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] items-start justify-center relative shrink-0 w-full" data-node-id="609:12156">
        {recentPatients.map((patient, idx) => (
          <div
            key={patient.id}
            className="bg-white border border-[rgba(226,232,240,0.8)] border-solid content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#078bde] transition-all flex flex-col h-[207px] items-start justify-between min-w-px p-[21px] relative rounded-[16px] group"
            data-node-id={
              idx === 0
                ? "609:12157"
                : idx === 1
                ? "609:12180"
                : idx === 2
                ? "609:12203"
                : "609:12226"
            }
          >
            <div className="relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full">
                {/* Top Row: Avatar + Timestamp */}
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <div className="relative rounded-[12px] shrink-0 size-[40px] overflow-hidden">
                    <Image
                      src={patient.avatar}
                      alt={patient.name}
                      width={40}
                      height={40}
                      className="absolute inset-0 object-cover rounded-[12px] size-full pointer-events-none"
                    />
                  </div>
                  <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[10px] py-[4px] relative rounded-[9999px] shrink-0">
                    <span className="[word-break:break-word] font-['Inter'] font-semibold text-[11px] text-[#64748b] leading-[16.5px] whitespace-nowrap">
                      {patient.timestamp}
                    </span>
                  </div>
                </div>

                {/* Middle: Patient Name & Tag + Medication */}
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start relative shrink-0">
                      <span className="[word-break:break-word] font-['Inter'] font-bold text-[16px] text-[#02307d] leading-[24px] whitespace-nowrap">
                        {patient.name}
                      </span>
                    </div>
                    <div className={`${patient.tagBg} content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0`}>
                      <span className={`[word-break:break-word] font-['Inter'] font-bold text-[10px] ${patient.tagText} leading-[15px] whitespace-nowrap`}>
                        {patient.tag}
                      </span>
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Inter'] font-normal text-[12px] text-[#64748b] leading-[16px] w-full truncate mb-0">
                      Recently dispensed
                    </p>
                    <p className="[word-break:break-word] font-['Inter'] font-normal text-[12px] text-[#64748b] leading-[16px] w-full truncate">
                      {patient.medication}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: View Medical Record Link */}
            <div className="relative shrink-0 w-full">
              <div className="border-[#f1f5f9] border-solid border-t content-stretch flex flex-col items-start pt-[13px] relative shrink-0 w-full">
                <Link
                  href={`/pharmacist/patient?q=${encodeURIComponent(patient.name)}`}
                  className="content-stretch flex items-center justify-between relative size-full w-full group-hover:text-[#02307d] cursor-pointer"
                >
                  <span className="[word-break:break-word] font-['Inter'] font-semibold text-[12px] text-[#078bde] group-hover:underline whitespace-nowrap">
                    View Medical Record
                  </span>
                  <div className="relative shrink-0 size-[16px] flex items-center justify-center">
                    <Image
                      src="/assets/pharmacist/a23002a8097851deaef33a9edfa7edc0078808dc.svg"
                      alt="Arrow"
                      width={16}
                      height={16}
                      className="size-full object-contain"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
