import React from "react";
import { TEAM_MEMBERS } from "../data/team-members";
import { TeamMemberCard } from "./team-member-card";

export function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102238] border border-[#1C344D] text-[#35D6E8] text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#35D6E8]" />
          Leadership &amp; Engineering
        </div>

        <h2
          id="team-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F4F8FC] mb-4"
        >
          The people behind PulseID
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#9BAFC3] max-w-2xl mx-auto">
          Meet the team working to bring PulseID to life.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Advisory footnote */}
      <p className="mt-10 text-center text-xs text-[#9BAFC3]/70 max-w-xl mx-auto">
        Individual profile dossiers and executive leadership appointments will be publicly confirmed prior to the November 20, 2026 launch milestone.
      </p>
    </section>
  );
}
