"use client";

import React, { useState } from "react";

type FilterTab = "all" | "pending" | "approved" | "rejected";

interface JoinRequest {
  id: string;
  name: string;
  initials: string;
  status: "pending" | "approved" | "rejected";
  statusText: string;
  pulseId: string;
  license: string;
  specialty: string;
  dateText: string;
  avatarBg: string;
  avatarBorder: string;
  avatarText: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeIcon: string;
}

const INITIAL_REQUESTS: JoinRequest[] = [
  {
    id: "req-1",
    name: "Dr. Nourhan Mostafa, PharmD",
    initials: "NM",
    status: "pending",
    statusText: "Pending Review",
    pulseId: "PID-10492-EGY",
    license: "LIC-2024-99120",
    specialty: "Clinical Pharmacotherapy",
    dateText: "Submitted 12 Oct 2026",
    avatarBg: "bg-[#fef3c7]",
    avatarBorder: "border-[#fde68a]",
    avatarText: "text-[#b45309]",
    badgeBg: "bg-[#fffbeb]",
    badgeBorder: "border-[#fde68a]",
    badgeText: "text-[#b45309]",
    badgeIcon: "/assets/pharmacist/c1789b4fa71641d41c572bdcfb25a4fa059d1a5d.svg",
  },
  {
    id: "req-2",
    name: "Dr. Omar Selim, PharmD",
    initials: "OS",
    status: "approved",
    statusText: "Approved",
    pulseId: "PID-5591-EGY",
    license: "LIC-2022-44190",
    specialty: "Hospital Pharmacist",
    dateText: "Approved 10 Oct 2026",
    avatarBg: "bg-[#d1fae5]",
    avatarBorder: "border-[#a7f3d0]",
    avatarText: "text-[#047857]",
    badgeBg: "bg-[#ecfdf5]",
    badgeBorder: "border-[#a7f3d0]",
    badgeText: "text-[#047857]",
    badgeIcon: "/assets/pharmacist/9e14fb477157aab97af69db533613c59ab049617.svg",
  },
  {
    id: "req-3",
    name: "Dr. Tarek Ibrahim, BPharm",
    initials: "TI",
    status: "rejected",
    statusText: "Rejected",
    pulseId: "PID-7731-EGY",
    license: "LIC-2023-84102",
    specialty: "Community Dispensing",
    dateText: "Rejected 08 Oct 2026",
    avatarBg: "bg-[#f1f5f9]",
    avatarBorder: "border-[#e2e8f0]",
    avatarText: "text-[#475569]",
    badgeBg: "bg-[#fff1f2]",
    badgeBorder: "border-[#fecdd3]",
    badgeText: "text-[#be123c]",
    badgeIcon: "/assets/pharmacist/8399c40c575bebeea11b7a6e95748d1d1c85d504.svg",
  },
];

export function PharmacistJoinRequestsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [requests, setRequests] = useState<JoinRequest[]>(INITIAL_REQUESTS);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const rejectedCount = requests.filter((r) => r.status === "rejected").length;
  const allCount = requests.length;

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "all") return true;
    return req.status === activeTab;
  });

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "approved",
              statusText: "Approved",
              dateText: "Approved just now",
              avatarBg: "bg-[#d1fae5]",
              avatarBorder: "border-[#a7f3d0]",
              avatarText: "text-[#047857]",
              badgeBg: "bg-[#ecfdf5]",
              badgeBorder: "border-[#a7f3d0]",
              badgeText: "text-[#047857]",
              badgeIcon:
                "/assets/pharmacist/9e14fb477157aab97af69db533613c59ab049617.svg",
            }
          : r
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "rejected",
              statusText: "Rejected",
              dateText: "Rejected just now",
              avatarBg: "bg-[#f1f5f9]",
              avatarBorder: "border-[#e2e8f0]",
              avatarText: "text-[#475569]",
              badgeBg: "bg-[#fff1f2]",
              badgeBorder: "border-[#fecdd3]",
              badgeText: "text-[#be123c]",
              badgeIcon:
                "/assets/pharmacist/8399c40c575bebeea11b7a6e95748d1d1c85d504.svg",
            }
          : r
      )
    );
  };

  return (
    <div
      className="bg-white border border-[rgba(226,232,240,0.8)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[16px] items-start p-[25px] relative rounded-[16px] w-full"
      data-node-id="609:12396"
      data-name="Section - PharmacistJoinRequests"
    >
      {/* Section Header */}
      <div
        className="border-b border-[#f1f5f9] pb-[17px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full"
        data-node-id="609:12397"
        data-name="Section Header"
      >
        <div
          className="flex flex-col gap-[4px] items-start"
          data-node-id="609:12398"
          data-name="Container"
        >
          <div
            className="flex items-center gap-[12px]"
            data-node-id="609:12399"
            data-name="Container"
          >
            <div
              className="bg-[#f0f9ff] border border-[#e0f2fe] flex items-center justify-center rounded-[12px] shrink-0 size-[36px]"
              data-node-id="609:12400"
              data-name="Background+Border"
            >
              <div
                className="h-[14px] w-[17.5px] relative shrink-0"
                data-node-id="609:12401"
                data-name="Container"
              >
                <img
                  alt=""
                  className="absolute inset-0 size-full block max-w-none"
                  src="/assets/pharmacist/c1bed2885ebe72487f79878231a99e99e7c05306.svg"
                />
              </div>
            </div>
            <h3
              className="font-bold text-[18px] text-[#1e293b] leading-normal"
              data-node-id="609:12404"
            >
              Pharmacist Join Requests
            </h3>
          </div>
          <p
            className="font-normal text-[12px] text-[#64748b] leading-normal"
            data-node-id="609:12406"
          >
            Review and manage pharmacists who have submitted requests to join
            your pharmacy.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div
          className="bg-[#f1f5f9] p-[4px] rounded-[12px] flex items-center shrink-0"
          data-node-id="609:12407"
          data-name="Filter Pill Tabs"
        >
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-[12px] py-[6px] rounded-[8px] text-[12px] transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-white font-semibold text-[#1e293b] shadow-xs"
                : "font-medium text-[#475569] hover:text-[#1e293b]"
            }`}
            data-node-id="609:12408"
            data-name="Button"
          >
            All Requests ({allCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={`px-[12px] py-[6px] rounded-[8px] text-[12px] transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-white font-semibold text-[#1e293b] shadow-xs"
                : "font-medium text-[#475569] hover:text-[#1e293b]"
            }`}
            data-node-id="609:12413"
            data-name="Button"
          >
            Pending ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("approved")}
            className={`px-[12px] py-[6px] rounded-[8px] text-[12px] transition-all cursor-pointer ${
              activeTab === "approved"
                ? "bg-white font-semibold text-[#1e293b] shadow-xs"
                : "font-medium text-[#475569] hover:text-[#1e293b]"
            }`}
            data-node-id="609:12418"
            data-name="Button"
          >
            Approved ({approvedCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("rejected")}
            className={`px-[12px] py-[6px] rounded-[8px] text-[12px] transition-all cursor-pointer ${
              activeTab === "rejected"
                ? "bg-white font-semibold text-[#1e293b] shadow-xs"
                : "font-medium text-[#475569] hover:text-[#1e293b]"
            }`}
            data-node-id="609:12423"
            data-name="Button"
          >
            Rejected ({rejectedCount})
          </button>
        </div>
      </div>

      {/* Request Rows List */}
      <div
        className="flex flex-col gap-[12px] items-start w-full"
        data-node-id="609:12428"
        data-name="Request Rows List"
      >
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="border border-[rgba(226,232,240,0.9)] flex flex-col md:flex-row items-start md:items-center justify-between p-[17px] rounded-[12px] w-full gap-4 hover:border-slate-300 transition-colors"
          >
            {/* Pharmacist Info */}
            <div
              className="flex items-center gap-[14px]"
              data-name="Pharmacist Info"
            >
              {/* Initials Avatar */}
              <div
                className={`${req.avatarBg} ${req.avatarBorder} border flex items-center justify-center rounded-full size-[40px] shrink-0`}
              >
                <span
                  className={`${req.avatarText} font-bold text-[14px] leading-[20px]`}
                >
                  {req.initials}
                </span>
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-[8px] flex-wrap">
                  <span className="font-bold text-[14px] text-[#0f172a] leading-normal">
                    {req.name}
                  </span>
                  <div
                    className={`${req.badgeBg} ${req.badgeBorder} border flex items-center gap-[4px] px-[9px] py-[3px] rounded-full`}
                  >
                    <div className="size-[10px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute inset-0 size-full block max-w-none"
                        src={req.badgeIcon}
                      />
                    </div>
                    <span
                      className={`${req.badgeText} font-medium text-[11px] leading-normal`}
                    >
                      {req.statusText}
                    </span>
                  </div>
                </div>

                <p className="font-normal text-[12px] text-[#64748b] leading-normal">
                  {req.pulseId} • Lic: {req.license} • {req.specialty} •{" "}
                  {req.dateText}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-[8px] flex-wrap shrink-0 self-end md:self-center">
              {req.status === "pending" ? (
                <>
                  <button
                    type="button"
                    className="border border-[#e2e8f0] flex items-center justify-center gap-[4px] px-[13px] py-[7px] rounded-[8px] text-[12px] font-medium text-[#334155] hover:bg-slate-50 transition-colors cursor-pointer"
                    data-node-id="609:12445"
                    data-name="Button"
                  >
                    <div className="h-[12px] w-[9px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute inset-0 size-full block max-w-none"
                        src="/assets/pharmacist/6603108f479866302c6369ff0c50f88a33c54a66.svg"
                      />
                    </div>
                    <span>View Docs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(req.id)}
                    className="border border-[#fecdd3] px-[15px] py-[7px] rounded-[8px] text-[12px] font-medium text-[#e11d48] hover:bg-rose-50 transition-colors cursor-pointer"
                    data-node-id="609:12448"
                    data-name="Button"
                  >
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(req.id)}
                    className="bg-[#008fe5] hover:bg-[#007cc6] px-[14px] py-[6px] rounded-[8px] text-[12px] font-semibold text-white flex items-center gap-[4px] transition-colors cursor-pointer shadow-xs"
                    data-node-id="609:12450"
                    data-name="Button"
                  >
                    <div className="h-[6.88px] w-[9.63px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute inset-0 size-full block max-w-none"
                        src="/assets/pharmacist/caa309da504b8b9c5f9e40829243363245708fff.svg"
                      />
                    </div>
                    <span>Approve</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="border border-[#e2e8f0] px-[13px] py-[7px] rounded-[8px] text-[12px] font-medium text-[#334155] hover:bg-slate-50 transition-colors cursor-pointer"
                  data-name="Actions → Button"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
