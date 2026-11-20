"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PendingPrescriptionsTable() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pending" | "partial" | "completed">("pending");

  const pendingItems = [
    {
      id: "RX-2026-8924",
      patientName: "Ahmed Hassan",
      status: "Pending",
      photo: "/assets/pharmacist/e36177f193c85b45ffc5c98695a3a33c15facbf4.png",
      permission: "Rx",
      medication: "Amoxicillin 500 mg · 21 capsules",
      date: "Nov 12, 2026",
    },
    {
      id: "RX-2026-5268",
      patientName: "Salma Adel",
      status: "Pending",
      photo: "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png",
      permission: "Rx",
      medication: "Metformin 500 mg · 60 tablets",
      date: "Nov 12, 2026",
    },
    {
      id: "RX-2026-7731",
      patientName: "Tarek Ibrahim",
      status: "Pending",
      photo: "/assets/pharmacist/62ac8540e98b2a02d94d67498b0383b9a21ec7dc.png",
      permission: "Rx",
      medication: "Amlodipine 5 mg · 30 tablets",
      date: "Nov 11, 2026",
    },
  ];

  const partiallyDispensedItems = [
    {
      id: "RX-2026-8310",
      patientName: "Mona Selim",
      status: "Partially Dispensed",
      photo: "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png",
      permission: "Rx",
      medication: "Augmentin 1g · 7 of 14 dispensed",
      date: "Nov 9, 2026",
    },
  ];

  const completedItems = [
    {
      id: "RX-2026-8104",
      patientName: "Farida El-Sayed",
      status: "Completed",
      photo: "/assets/pharmacist/aa824485f5de52e1131d4a4b59799f31d35747b1.png",
      permission: "Rx",
      medication: "Lisinopril 10 mg · 28 tablets completed",
      date: "Nov 8, 2026",
    },
  ];

  const currentItems =
    activeTab === "pending"
      ? pendingItems
      : activeTab === "partial"
      ? partiallyDispensedItems
      : completedItems;

  return (
    <section
      aria-label="Pending Prescriptions"
      className="content-stretch flex flex-col gap-[16px] items-start relative w-full"
      data-node-id="609:12062"
      data-name="PendingAccessRequestsSection"
    >
      {/* Header Container matching Figma Node 609:12063 */}
      <div className="content-stretch flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative shrink-0 w-full" data-node-id="609:12063">
        <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-node-id="609:12064">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:12065">
            <h2 className="[word-break:break-word] font-['Inter'] font-bold text-[24px] text-[#01091e] tracking-[-0.6px] leading-[32px] whitespace-nowrap" data-node-id="609:12066">
              Pending Prescriptions
            </h2>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="609:12067">
            <p className="[word-break:break-word] font-['Inter'] font-normal text-[14px] text-[#41474f] leading-[20px] whitespace-nowrap" data-node-id="609:12068">
              Prescriptions awaiting medication dispensing.
            </p>
          </div>
        </div>

        <Link
          href="/pharmacist/prescriptions"
          className="content-stretch flex gap-[4px] items-center relative shrink-0 text-[#078bde] hover:underline cursor-pointer"
          data-node-id="609:12069"
        >
          <span className="[word-break:break-word] font-['Inter'] font-semibold text-[14px] leading-[20px] whitespace-nowrap" data-node-id="609:12070">
            View All Prescriptions (8)
          </span>
          <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-node-id="609:12071">
            <Image
              src="/assets/pharmacist/2b85021e588d231cb712ee496f2f8816726ac3e6.svg"
              alt="Arrow right"
              width={16}
              height={16}
              className="size-full object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Table Container matching Figma Node 609:12073 */}
      <div
        className="bg-white border border-[rgba(226,232,240,0.8)] border-solid content-stretch flex flex-col items-start overflow-hidden p-px relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full"
        data-node-id="609:12073"
      >
        {/* Tabs Bar matching Figma Node 609:12074 */}
        <div className="border-[rgba(226,232,240,0.8)] border-b border-solid relative shrink-0 w-full" data-node-id="609:12074">
          <div className="content-stretch flex gap-[24px] items-center px-[24px] relative size-full overflow-x-auto">
            {/* Pending Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className="content-stretch flex flex-col gap-[8px] items-center py-[12px] relative shrink-0 cursor-pointer"
              data-node-id="609:12075"
            >
              <span
                className={`[word-break:break-word] font-['Inter'] leading-normal not-italic text-[14px] whitespace-nowrap ${
                  activeTab === "pending" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                }`}
                data-node-id="609:12076"
              >
                Pending
              </span>
              {activeTab === "pending" && (
                <div className="bg-[#078bde] h-[2px] relative rounded-[1px] shrink-0 w-[40px]" data-node-id="609:12077" />
              )}
            </button>

            {/* Partially Dispensed Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("partial")}
              className="content-stretch flex flex-col gap-[8px] items-center py-[12px] relative shrink-0 cursor-pointer"
              data-node-id="609:12078"
            >
              <span
                className={`[word-break:break-word] font-['Inter'] leading-normal not-italic text-[14px] whitespace-nowrap ${
                  activeTab === "partial" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                }`}
                data-node-id="609:12079"
              >
                Partially Dispensed
              </span>
              {activeTab === "partial" && (
                <div className="bg-[#078bde] h-[2px] relative rounded-[1px] shrink-0 w-[40px]" />
              )}
            </button>

            {/* Completed Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className="content-stretch flex flex-col gap-[8px] items-center py-[12px] relative shrink-0 cursor-pointer"
              data-node-id="609:12081"
            >
              <span
                className={`[word-break:break-word] font-['Inter'] leading-normal not-italic text-[14px] whitespace-nowrap ${
                  activeTab === "completed" ? "font-bold text-[#078bde]" : "font-semibold text-[#727272]"
                }`}
                data-node-id="609:12082"
              >
                Completed
              </span>
              {activeTab === "completed" && (
                <div className="bg-[#078bde] h-[2px] relative rounded-[1px] shrink-0 w-[40px]" />
              )}
            </button>
          </div>
        </div>

        {/* Requests List matching Figma Node 609:12084 */}
        <div className="relative shrink-0 w-full divide-y divide-[#f1f5f9]" data-node-id="609:12084">
          {currentItems.map((item, idx) => (
            <div
              key={item.id}
              className="content-stretch flex flex-col md:flex-row md:items-center justify-between p-[24px] gap-4 relative shrink-0 w-full hover:bg-slate-50/50 transition-colors"
              data-node-id={idx === 0 ? "609:12085" : idx === 1 ? "609:12105" : "609:12125"}
            >
              {/* Left Column: Photo + Details */}
              <div className="content-stretch flex flex-1 gap-[16px] items-center min-w-px relative">
                <div className="relative rounded-[12px] shrink-0 size-[56px] overflow-hidden">
                  <Image
                    src={item.photo}
                    alt={item.patientName}
                    width={56}
                    height={56}
                    className="absolute inset-0 object-cover rounded-[12px] size-full pointer-events-none"
                  />
                </div>
                <div className="content-stretch flex flex-1 flex-col gap-[6px] items-start min-w-px relative">
                  <div className="[word-break:break-word] content-stretch flex gap-[8px] items-center leading-normal not-italic relative shrink-0 w-full whitespace-nowrap flex-wrap">
                    <span className="font-['Inter'] font-bold text-[16px] text-[#02307d]">
                      {item.patientName}
                    </span>
                    <span className="font-['Inter'] font-normal text-[12px] text-[#8b8b8b]">
                      {item.id}
                    </span>
                    <span className="font-['Inter'] font-normal text-[#996800] text-[12px]">
                      {item.status}
                    </span>
                  </div>

                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full flex-wrap">
                    <div className="bg-[rgba(142,191,222,0.2)] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0">
                      <span className="font-['Inter'] font-semibold text-[12px] text-[#078bde] whitespace-nowrap">
                        {item.permission}
                      </span>
                    </div>
                    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0">
                      <span className="font-['Inter'] font-normal text-[12px] text-[#727272] whitespace-nowrap">
                        {item.medication}
                      </span>
                    </div>
                    <div className="bg-[#f1f5f9] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[9999px] shrink-0">
                      <span className="font-['Inter'] font-normal text-[12px] text-[#8b8b8b] whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={() => router.push(`/pharmacist/patient?q=${encodeURIComponent(item.patientName)}`)}
                  className="bg-[#f1f5f9] hover:bg-slate-200 transition-colors content-stretch flex flex-col items-center justify-center px-[14px] py-[8px] relative rounded-[12px] shrink-0 cursor-pointer"
                >
                  <span className="font-['Inter'] font-semibold text-[14px] text-[#41474f] whitespace-nowrap">
                    View Details
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push(`/pharmacist/dispense?rx=${encodeURIComponent(item.id)}`)}
                  className="bg-[rgba(139,139,139,0.2)] hover:bg-[#078bde]/20 transition-colors content-stretch flex flex-col items-center justify-center px-[14px] py-[8px] relative rounded-[12px] shrink-0 cursor-pointer"
                >
                  <span className="font-['Inter'] font-semibold text-[14px] text-[#078bde] whitespace-nowrap">
                    Dispense Medication
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
