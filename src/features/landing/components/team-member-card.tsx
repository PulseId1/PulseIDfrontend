import React from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/icons";
import type { TeamMember } from "../types/team-member";

interface TeamMemberCardProps {
  readonly member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const hasSocials =
    Boolean(member.socials?.linkedin) ||
    Boolean(member.socials?.github) ||
    Boolean(member.socials?.portfolio);

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[#1C344D] bg-[#102238]/70 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-[#2589FF]/50 hover:bg-[#102238] hover:shadow-[0_8px_30px_rgba(7,17,31,0.6)]">
      {/* Top subtle hover accent */}
      <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#2589FF]/30 to-transparent group-hover:via-[#35D6E8]/70 transition-all duration-300" />

      <div>
        {/* Profile Avatar / Neutral Initials Placeholder */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-[#1C344D] bg-[#07111F] flex items-center justify-center shrink-0 group-hover:border-[#35D6E8]/40 transition-colors">
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={`${member.name} portrait`}
                width={72}
                height={72}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#102238] to-[#07111F] text-[#35D6E8] font-mono font-bold text-lg sm:text-xl tracking-wider select-none"
                aria-label={`${member.name} initials`}
              >
                {member.initials}
              </div>
            )}
          </div>

          {member.isPlaceholder && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#0B192B] border border-[#1C344D] text-[#9BAFC3]/80">
              Founding Role
            </span>
          )}
        </div>

        {/* Member Details */}
        <div className="space-y-1 mb-3">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F4F8FC] group-hover:text-[#35D6E8] transition-colors">
            {member.name}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-[#2589FF]">
            {member.role}
          </p>
        </div>

        {/* Optional Biography */}
        {member.bio && (
          <p className="text-xs sm:text-sm text-[#9BAFC3] leading-relaxed mb-6">
            {member.bio}
          </p>
        )}
      </div>

      {/* Social and Profile Links (Rendered only when valid URLs are present) */}
      <footer className="pt-4 border-t border-[#1C344D]/60 flex items-center justify-between">
        {hasSocials ? (
          <div className="flex items-center gap-2">
            {member.socials?.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className="p-2 rounded-lg text-[#9BAFC3] hover:text-[#35D6E8] hover:bg-[#0B192B] border border-transparent hover:border-[#1C344D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
              >
                <LinkedInIcon size={16} aria-hidden="true" />
              </a>
            )}
            {member.socials?.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s GitHub profile`}
                className="p-2 rounded-lg text-[#9BAFC3] hover:text-[#35D6E8] hover:bg-[#0B192B] border border-transparent hover:border-[#1C344D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
              >
                <GitHubIcon size={16} aria-hidden="true" />
              </a>
            )}
            {member.socials?.portfolio && (
              <a
                href={member.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s personal portfolio`}
                className="p-2 rounded-lg text-[#9BAFC3] hover:text-[#35D6E8] hover:bg-[#0B192B] border border-transparent hover:border-[#1C344D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35D6E8]"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        ) : (
          <span className="text-[11px] text-[#9BAFC3]/60 italic">
            Profile announcement pending
          </span>
        )}
      </footer>
    </article>
  );
}
