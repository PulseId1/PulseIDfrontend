"use client";

import React, { useState } from "react";

export function AccountSettingsCard() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className="bg-white border border-[rgba(191,199,211,0.7)] flex flex-col gap-[24px] items-start overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] w-full"
      data-node-id="609:12490"
      data-name="Account Settings"
    >
      {/* Card heading */}
      <div
        className="border-b border-[rgba(191,199,211,0.3)] pb-[16px] flex items-center justify-between w-full"
        data-node-id="609:12491"
        data-name="Card heading"
      >
        <div
          className="flex gap-[12px] items-center relative shrink-0"
          data-node-id="609:12492"
          data-name="Section identity"
        >
          <div
            className="bg-[#f1f3ff] flex items-center justify-center rounded-[8px] shrink-0 size-[36px]"
            data-node-id="609:12493"
            data-name="Section symbol"
          >
            <div
              className="relative shrink-0 size-[19px]"
              data-node-id="609:12494"
              data-name="settings"
            >
              <img
                alt=""
                className="absolute inset-0 size-full block max-w-none"
                src="/assets/pharmacist/c1a2831ea8d17b21c1fe8558c31d1d7ec6e7abd1.svg"
              />
            </div>
          </div>
          <p
            className="font-bold leading-[26px] text-[20px] text-[#01091e] whitespace-nowrap"
            data-node-id="609:12496"
          >
            Account Settings
          </p>
        </div>
      </div>

      {/* Danger zone */}
      <div
        className="bg-[#fef2f2] border border-[#fecaca] flex flex-col gap-[16px] items-start p-[20px] rounded-[12px] w-full"
        data-node-id="609:12497"
        data-name="Danger zone"
      >
        <div
          className="flex gap-[12px] items-center w-full"
          data-node-id="609:12498"
          data-name="Danger header"
        >
          <div
            className="bg-[#fee2e2] flex items-center justify-center rounded-[12px] shrink-0 size-[40px]"
            data-node-id="609:12499"
            data-name="Alert icon"
          >
            <div
              className="relative shrink-0 size-[20px]"
              data-node-id="609:12500"
              data-name="alert-triangle"
            >
              <img
                alt=""
                className="absolute inset-0 size-full block max-w-none"
                src="/assets/pharmacist/e00f98616eb2a922c9681c27abc63c34401b6892.svg"
              />
            </div>
          </div>
          <div
            className="flex flex-1 flex-col gap-[4px] items-start min-w-px"
            data-node-id="609:12502"
            data-name="Danger copy"
          >
            <p
              className="font-bold leading-[22px] text-[16px] text-[#991b1b] w-full"
              data-node-id="609:12503"
            >
              Delete Account
            </p>
            <p
              className="font-normal leading-[20px] text-[14px] text-[#b91c1c] w-full"
              data-node-id="609:12504"
            >
              Deleting your account is permanent and will remove your profile,
              verification history, and access to PulseID.
            </p>
          </div>
        </div>

        {showConfirm ? (
          <div className="flex items-center gap-3 bg-red-100/60 p-3 rounded-lg border border-red-200 w-full justify-between flex-wrap">
            <span className="text-xs font-semibold text-red-900">
              Are you sure? This action cannot be undone.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Account deletion request submitted.");
                  setShowConfirm(false);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-700 rounded hover:bg-red-800 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="bg-[#dc2626] hover:bg-[#b91c1c] transition-colors flex items-center justify-center px-[20px] py-[10px] rounded-[8px] shrink-0 cursor-pointer text-white font-bold text-[14px] leading-[20px]"
            data-node-id="609:12505"
            data-name="Delete button"
          >
            <span data-node-id="609:12506">Delete Account</span>
          </button>
        )}
      </div>
    </div>
  );
}
