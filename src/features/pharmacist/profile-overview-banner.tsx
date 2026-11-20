import React from "react";

export function ProfileOverviewBanner() {
  return (
    <div
      className="border border-[rgba(0,121,195,0.4)] flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden p-[32px] relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-full gap-6"
      style={{
        backgroundImage:
          "linear-gradient(134.11deg, #02307D 0.34%, #0A7DC5 93.11%)",
      }}
      data-node-id="609:12294"
      data-name="Doctor overview"
    >
      <div
        className="flex gap-[20px] items-center overflow-hidden relative shrink-0"
        data-node-id="609:12295"
        data-name="Doctor identity"
      >
        <div
          className="relative rounded-[50px] shrink-0 size-[80px] overflow-hidden"
          data-node-id="609:12296"
          data-name="Doctor photo"
        >
          <img
            alt="Dr. Ahmed Hassan"
            className="absolute inset-0 object-cover rounded-[50px] size-full pointer-events-none"
            src="/assets/pharmacist/1af2086220affecd5f498aeca93f64918a91bf86.png"
          />
        </div>
        <div
          className="flex flex-col gap-[8px] items-start overflow-hidden relative shrink-0"
          data-node-id="609:12297"
          data-name="Identification"
        >
          <div
            className="flex gap-[10px] items-center overflow-hidden relative shrink-0 flex-wrap"
            data-node-id="609:12298"
            data-name="Name and specialty"
          >
            <p
              className="font-bold leading-[29px] text-[24px] text-white whitespace-nowrap"
              data-node-id="609:12299"
            >
              Dr. Ahmed Hassan
            </p>
            <div
              className="backdrop-blur-[4px] bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] flex items-center px-[13px] py-[3px] rounded-full shrink-0"
              data-node-id="609:12300"
              data-name="Overlay+Border+OverlayBlur"
            >
              <p
                className="font-medium text-[12px] leading-[16px] text-white whitespace-nowrap"
                data-node-id="609:12301"
              >
                Pharmacy Super Admin
              </p>
            </div>
          </div>
          <div
            className="flex gap-[6px] items-center flex-wrap whitespace-nowrap text-[13px]"
            data-node-id="609:12302"
          >
            <div
              className="flex gap-[6px] items-baseline"
              data-node-id="609:12303"
            >
              <span
                className="font-bold text-[#bacfd7]"
                data-node-id="609:12304"
              >
                PulseID:
              </span>
              <span
                className="font-normal text-white"
                data-node-id="609:12305"
              >
                PID-8924-EGY
              </span>
            </div>
            <div
              className="flex gap-[6px] items-baseline"
              data-node-id="609:12306"
            >
              <span
                className="font-bold text-[#bacfd7] leading-none px-1"
                data-node-id="609:12307"
              >
                •
              </span>
              <span
                className="font-normal text-[#e0f2fe] text-[14px] leading-[20px]"
                data-node-id="609:12308"
              >
                Al-Shifa Clinical Pharmacy Network
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.25)] flex items-center px-[17px] py-[9px] rounded-full shrink-0 gap-[8px]"
        data-node-id="609:12309"
        data-name="Facility Verification Badge"
      >
        <div
          className="h-[13.92px] w-[13.13px] relative shrink-0"
          data-node-id="609:12310"
          data-name="Container"
        >
          <img
            alt="Verified shield"
            className="absolute inset-0 size-full block max-w-none"
            src="/assets/pharmacist/b446cd9d954d4c6c893e8178e7ae31681d0b19c4.svg"
          />
        </div>
        <p
          className="font-medium text-[14px] leading-[20px] text-white whitespace-nowrap"
          data-node-id="609:12313"
        >
          Active & Verified Facility
        </p>
      </div>
    </div>
  );
}
