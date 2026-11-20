import React from "react";

export function PersonalContactInfoCards() {
  return (
    <div
      className="flex flex-col lg:flex-row gap-[24px] items-start w-full"
      data-node-id="609:12314"
      data-name="Personal and contact information"
    >
      {/* Left Card: Personal Information */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] flex flex-col gap-[24px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] w-full lg:w-[744px] shrink-0"
        data-node-id="609:12315"
        data-name="Personal Information"
      >
        <div
          className="border-b border-[rgba(191,199,211,0.3)] flex items-center justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="609:12316"
          data-name="Card heading"
        >
          <div
            className="flex gap-[12px] items-center relative shrink-0"
            data-node-id="609:12317"
            data-name="Section identity"
          >
            <div
              className="bg-[#f1f3ff] flex items-center justify-center rounded-[8px] shrink-0 size-[36px]"
              data-node-id="609:12318"
              data-name="Section symbol"
            >
              <div
                className="relative shrink-0 size-[19px]"
                data-node-id="609:12319"
                data-name="user-round"
              >
                <img
                  alt=""
                  className="absolute inset-0 size-full block max-w-none"
                  src="/assets/pharmacist/60e2b7a4605023a5c79e7f9f77eee918a6091644.svg"
                />
              </div>
            </div>
            <p
              className="font-bold leading-[26px] text-[20px] text-[#01091e] whitespace-nowrap"
              data-node-id="609:12321"
            >
              Personal Information
            </p>
          </div>
          <button
            type="button"
            className="bg-white border border-[#d0deff] flex gap-[8px] items-center px-[16px] py-[9px] rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
            data-node-id="609:12322"
            data-name="Action"
          >
            <div
              className="relative shrink-0 size-[14px]"
              data-node-id="609:12323"
              data-name="pencil"
            >
              <img
                alt=""
                className="absolute inset-0 size-full block max-w-none"
                src="/assets/pharmacist/a9be4a17a3466ccd3e9d51df7b2e09eaa451ad1a.svg"
              />
            </div>
            <span
              className="font-bold leading-[18px] text-[13px] text-[#01091e] whitespace-nowrap"
              data-node-id="609:12325"
            >
              Edit
            </span>
          </button>
        </div>

        {/* Row 1: Full Name & Date of Birth */}
        <div
          className="flex flex-col sm:flex-row gap-[32px] items-start w-full"
          data-node-id="609:12326"
          data-name="Personal details"
        >
          <div
            className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
            data-node-id="609:12327"
            data-name="Information field"
          >
            <p
              className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
              data-node-id="609:12328"
            >
              Full Name
            </p>
            <p
              className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
              data-node-id="609:12329"
            >
              Dr. Ahmed Hassan
            </p>
          </div>
          <div
            className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
            data-node-id="609:12330"
            data-name="Information field"
          >
            <p
              className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
              data-node-id="609:12331"
            >
              Date of Birth
            </p>
            <p
              className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
              data-node-id="609:12332"
            >
              15 March 1992
            </p>
          </div>
        </div>

        {/* Row 2: Gender & National ID */}
        <div
          className="flex flex-col sm:flex-row gap-[32px] items-start w-full"
          data-node-id="609:12333"
          data-name="Identity details"
        >
          <div
            className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
            data-node-id="609:12334"
            data-name="Information field"
          >
            <p
              className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
              data-node-id="609:12335"
            >
              Gender
            </p>
            <p
              className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
              data-node-id="609:12336"
            >
              Male
            </p>
          </div>
          <div
            className="flex flex-1 flex-col gap-[8px] items-start min-w-px w-full"
            data-node-id="609:12337"
            data-name="Information field"
          >
            <p
              className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
              data-node-id="609:12338"
            >
              National ID
            </p>
            <p
              className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
              data-node-id="609:12339"
            >
              29203150101234
            </p>
          </div>
        </div>

        {/* Row 3: Address */}
        <div
          className="flex flex-col gap-[8px] items-start w-full"
          data-node-id="609:12340"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12341"
          >
            Address
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12342"
          >
            24 El Nozha Street, Heliopolis, Cairo, Egypt
          </p>
        </div>
      </div>

      {/* Right Card: Contact Information */}
      <div
        className="bg-white border border-[rgba(191,199,211,0.7)] flex flex-1 flex-col gap-[24px] items-start min-w-px overflow-hidden p-[24px] relative rounded-[8px] self-stretch shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] w-full"
        data-node-id="609:12343"
        data-name="Contact Information"
      >
        <div
          className="border-b border-[rgba(191,199,211,0.3)] flex items-center justify-between pb-[16px] relative shrink-0 w-full"
          data-node-id="609:12344"
          data-name="Card heading"
        >
          <div
            className="flex gap-[12px] items-center relative shrink-0"
            data-node-id="609:12345"
            data-name="Section identity"
          >
            <div
              className="bg-[#f1f3ff] flex items-center justify-center rounded-[8px] shrink-0 size-[36px]"
              data-node-id="609:12346"
              data-name="Section symbol"
            >
              <div
                className="relative shrink-0 size-[19px]"
                data-node-id="609:12347"
                data-name="phone"
              >
                <img
                  alt=""
                  className="absolute inset-0 size-full block max-w-none"
                  src="/assets/pharmacist/b38ddb670113dc7477d21188ba53154a0051e50e.svg"
                />
              </div>
            </div>
            <p
              className="font-bold leading-[26px] text-[20px] text-[#01091e] whitespace-nowrap"
              data-node-id="609:12349"
            >
              Contact Information
            </p>
          </div>
          <button
            type="button"
            className="bg-white border border-[#d0deff] flex gap-[8px] items-center px-[16px] py-[9px] rounded-[8px] shrink-0 hover:bg-slate-50 transition-colors cursor-pointer"
            data-node-id="609:12350"
            data-name="Action"
          >
            <div
              className="relative shrink-0 size-[14px]"
              data-node-id="609:12351"
              data-name="pencil"
            >
              <img
                alt=""
                className="absolute inset-0 size-full block max-w-none"
                src="/assets/pharmacist/a9be4a17a3466ccd3e9d51df7b2e09eaa451ad1a.svg"
              />
            </div>
            <span
              className="font-bold leading-[18px] text-[13px] text-[#01091e] whitespace-nowrap"
              data-node-id="609:12353"
            >
              Edit
            </span>
          </button>
        </div>

        {/* Phone Number */}
        <div
          className="flex flex-col gap-[8px] items-start w-full"
          data-node-id="609:12354"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12355"
          >
            Phone Number
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12356"
          >
            +20 100 123 4567
          </p>
        </div>

        {/* Email Address */}
        <div
          className="flex flex-col gap-[8px] items-start w-full"
          data-node-id="609:12357"
          data-name="Information field"
        >
          <p
            className="font-normal leading-[18px] text-[13px] text-[#41474f] w-full"
            data-node-id="609:12358"
          >
            Professional Email Address
          </p>
          <p
            className="font-semibold leading-[21px] text-[15px] text-[#01091e] w-full"
            data-node-id="609:12359"
          >
            Ahmed.mostafa@gmail.com
          </p>
        </div>

        {/* Privacy Note */}
        <div
          className="border-t border-[rgba(191,199,211,0.3)] flex gap-[8px] items-center pt-[16px] w-full mt-auto"
          data-node-id="609:12360"
          data-name="Privacy note"
        >
          <div
            className="h-[16px] w-[14px] relative shrink-0"
            data-node-id="609:12361"
            data-name="lock-keyhole"
          >
            <img
              alt=""
              className="absolute inset-0 size-full block max-w-none"
              src="/assets/pharmacist/53e51add055a0888799d0b8bab9ba24017251510.svg"
            />
          </div>
          <p
            className="flex-1 font-normal leading-[18px] text-[12px] text-[#41474f]"
            data-node-id="609:12363"
          >
            Your contact details are kept private and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
