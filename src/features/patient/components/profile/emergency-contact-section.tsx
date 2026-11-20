"use client";

import React from "react";
import Image from "next/image";
import { EmergencyContactDTO } from "@/lib/api/patient-types";

interface EmergencyContactSectionProps {
  readonly emergencyContacts?: EmergencyContactDTO[] | null;
  readonly onAddContact: () => void;
  readonly onEditContact: (contact: EmergencyContactDTO) => void;
  readonly onDeleteContact: (id?: string) => void;
}

export function EmergencyContactSection({
  emergencyContacts,
  onAddContact,
  onEditContact,
  onDeleteContact,
}: EmergencyContactSectionProps) {
  const contacts =
    emergencyContacts && emergencyContacts.length > 0
      ? emergencyContacts
      : [
          {
            id: "ec-default",
            fullName: "Mahmoud Hassan",
            phone: "+20 122 345 6789",
            relationship: "Father",
          },
        ];

  return (
    <div
      className="bg-white border border-[#bfc7d3]/70 rounded-[8px] p-[24px] shadow-[0px_1px_3px_0px_rgba(2,48,125,0.04),0px_4px_12px_0px_rgba(2,48,125,0.03)] flex flex-col gap-[24px] w-full"
      data-node-id="299:6649"
      data-name="Emergency Contact"
    >
      {/* Card Heading matching Figma Node 299:6650 */}
      <div
        className="border-b border-[#bfc7d3]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-[20px] w-full"
        data-node-id="299:6650"
        data-name="Card heading"
      >
        <div className="flex flex-col gap-[8px] items-start" data-node-id="299:6651">
          <div className="flex items-center gap-[12px]" data-node-id="299:6652">
            <div
              className="bg-[#f1f3ff] rounded-[8px] size-[36px] flex items-center justify-center shrink-0"
              data-node-id="299:6653"
            >
              <Image
                src="/assets/contact-round.svg"
                alt=""
                width={19}
                height={19}
                unoptimized
                className="size-[19px]"
                data-node-id="299:6654"
              />
            </div>
            <h2
              className="font-bold text-[20px] text-[#01091e] font-heading whitespace-nowrap"
              data-node-id="299:6656"
            >
              Emergency Contact
            </h2>
          </div>
          <p
            className="text-[14px] text-[#41474f] font-normal leading-[20px] font-sans"
            data-node-id="299:6657"
          >
            Add someone we can contact on your behalf in case of an emergency.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddContact}
          className="bg-[#078bde] hover:bg-[#0677be] border border-[#078bde] rounded-[8px] px-[16px] py-[9px] flex items-center gap-[8px] text-[13px] font-bold text-white transition-colors shadow-sm self-start sm:self-auto cursor-pointer shrink-0 font-sans"
          data-node-id="299:6658"
          data-name="Action"
        >
          <Image
            src="/assets/plus-white.svg"
            alt=""
            width={14}
            height={14}
            unoptimized
            className="size-[14px]"
            data-node-id="299:6659"
          />
          <span data-node-id="299:6661">Add Emergency Contact</span>
        </button>
      </div>

      {/* Saved Emergency Contact Row matching Figma Node 299:6662 */}
      <div className="flex flex-col gap-4 w-full">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-[#f1f3ff] border border-[#d0deff] rounded-[8px] p-[20px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-[32px] w-full"
            data-node-id="299:6662"
            data-name="Saved emergency contact"
          >
            {/* 3 Information fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-[32px] flex-1 w-full">
              <div className="flex flex-col gap-[8px]" data-node-id="299:6663">
                <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6664">
                  Contact Full Name
                </span>
                <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6665">
                  {contact.fullName}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]" data-node-id="299:6666">
                <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6667">
                  Phone Number
                </span>
                <p className="text-[15px] font-semibold text-[#01091e] font-mono" data-node-id="299:6668">
                  {contact.phone}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]" data-node-id="299:6669">
                <span className="text-[13px] text-[#41474f] font-normal" data-node-id="299:6670">
                  Relationship
                </span>
                <p className="text-[15px] font-semibold text-[#01091e]" data-node-id="299:6671">
                  {contact.relationship}
                </p>
              </div>
            </div>

            {/* Contact Actions matching Figma 299:6672 */}
            <div
              className="flex items-center gap-[8px] shrink-0 self-end sm:self-center"
              data-node-id="299:6672"
              data-name="Contact actions"
            >
              <button
                type="button"
                onClick={() => onEditContact(contact)}
                className="bg-white border border-[#d0deff] rounded-[8px] px-[16px] py-[9px] flex items-center gap-[8px] text-[13px] font-bold text-[#01091e] hover:bg-slate-50 transition-colors cursor-pointer"
                data-node-id="299:6673"
                data-name="Action"
              >
                <Image
                  src="/assets/pencil.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="size-[14px]"
                  data-node-id="299:6674"
                />
                <span data-node-id="299:6676">Edit</span>
              </button>

              <button
                type="button"
                onClick={() => onDeleteContact(contact.id)}
                className="bg-white border border-[#eacaca] rounded-[8px] px-[16px] py-[9px] flex items-center gap-[8px] text-[13px] font-bold text-[#c94040] hover:bg-red-50 transition-colors cursor-pointer"
                data-node-id="299:6677"
                data-name="Action"
              >
                <Image
                  src="/assets/trash-2.svg"
                  alt=""
                  width={14}
                  height={14}
                  unoptimized
                  className="size-[14px]"
                  data-node-id="299:6678"
                />
                <span data-node-id="299:6680">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footnote matching Figma Node 299:6681 */}
      <p
        className="text-[12px] text-[#41474f] font-normal leading-[18px] font-sans"
        data-node-id="299:6681"
      >
        Relationship options when adding a contact: Father · Mother · Brother · Sister · Spouse · Other
      </p>
    </div>
  );
}
