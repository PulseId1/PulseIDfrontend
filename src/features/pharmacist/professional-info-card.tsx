import React from "react";

export function ProfessionalInfoCard() {
  return (
    <div
      className="bg-white border border-[rgba(191,199,211,0.7)] flex flex-col gap-[24px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] w-full"
      data-node-id="609:12364"
      data-name="Professional Information"
    >
      <div
        className="border-b border-[rgba(191,199,211,0.3)] flex items-center justify-between pb-[16px] relative shrink-0 w-full"
        data-node-id="609:12365"
        data-name="Card heading"
      >
        <div
          className="flex gap-[12px] items-center relative shrink-0"
          data-node-id="609:12366"
          data-name="Section identity"
        >
          <div
            className="bg-[#f1f3ff] flex items-center justify-center rounded-[8px] shrink-0 size-[36px]"
            data-node-id="609:12367"
            data-name="Section symbol"
          >
            <div
              className="h-[13.13px] w-[14px] relative shrink-0"
              data-node-id="609:12368"
              data-name="Container"
            >
              <img
                alt=""
                className="absolute inset-0 size-full block max-w-none"
                src="/assets/pharmacist/678e1b98d5c4aaf5ccf3bc41c95beceff1bcb1d2.svg"
              />
            </div>
          </div>
          <p
            className="font-bold leading-[26px] text-[20px] text-[#01091e] whitespace-nowrap"
            data-node-id="609:12370"
          >
            Professional Information
          </p>
        </div>
        <button
          type="button"
          className="bg-white border border-[#d0deff] flex gap-[8px] items-center px-[16px] py-[9px] rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
          data-node-id="609:12371"
          data-name="Action"
        >
          <div
            className="relative shrink-0 size-[14px]"
            data-node-id="609:12372"
            data-name="pencil"
          >
            <img
              alt=""
              className="absolute inset-0 size-full block max-w-none"
              src="/assets/pharmacist/55d7b80e04f88ffdada2276bdcbd59c98ccc7074.svg"
            />
          </div>
          <span
            className="font-bold leading-[18px] text-[13px] text-[#01091e] whitespace-nowrap"
            data-node-id="609:12374"
          >
            Edit
          </span>
        </button>
      </div>

      {/* Row 1: Pharmacy Name & Type */}
      <div
        className="flex flex-col sm:flex-row gap-[32px] items-start w-full"
        data-node-id="609:12375"
        data-name="Professional details"
      >
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12376"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12377"
          >
            Pharmacy Name
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12378"
          >
            Al-Shifa Clinical Pharmacy Network
          </p>
        </div>
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12379"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12380"
          >
            Pharmacy Type
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12381"
          >
            Hospital &amp; Community Clinical Dispensary
          </p>
        </div>
      </div>

      {/* Row 2: Pharmacy License Number & Registration ID */}
      <div
        className="flex flex-col sm:flex-row gap-[32px] items-start w-full"
        data-node-id="609:12382"
        data-name="Professional details"
      >
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12383"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12384"
          >
            Pharmacy License Number
          </p>
          <p
            className="font-bold leading-[20px] text-[14px] text-[#1e293b] w-full"
            data-node-id="609:12385"
          >
            EGY-MOH-PH-948201
          </p>
        </div>
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12386"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12387"
          >
            Pharmacy Registration ID
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12388"
          >
            PID-PHARM-88219
          </p>
        </div>
      </div>

      {/* Row 3: Pharmacy Address & Account Verification Status */}
      <div
        className="flex flex-col sm:flex-row gap-[32px] items-start w-full"
        data-node-id="609:12389"
        data-name="Professional details"
      >
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12390"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12391"
          >
            Pharmacy Address
          </p>
          <p
            className="font-bold leading-[20px] text-[14px] text-[#1e293b] w-full"
            data-node-id="609:12392"
          >
            24 El-Tahrir Square, Downtown Medical District, Cairo
          </p>
        </div>
        <div
          className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
          data-node-id="609:12393"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12394"
          >
            Account Verification Status
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#047857] w-full"
            data-node-id="609:12395"
          >
            Verified &amp; Active Facility
          </p>
        </div>
      </div>
    </div>
  );
}
