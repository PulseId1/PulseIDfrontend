import type { TeamMember } from "../types/team-member";

/**
 * PulseID Team Data
 *
 * NOTE: In strict adherence to project constraints, real individual identities,
 * biographies, and social links are NOT fabricated.
 *
 * The records below serve as clearly identified role placeholders pending
 * the official public roster announcement ahead of the November 2026 launch.
 * When real team details are provided, update this data file without
 * modifying component implementations.
 */
export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    id: "founding-engineer",
    name: "Founding Engineer",
    role: "Core Architecture & Web Platform",
    bio: "Leading frontend engineering, component architecture, and high-performance secure client systems for the PulseID platform.",
    initials: "FE",
    isPlaceholder: true,
    socials: {
      // Social links left empty until officially supplied
    },
  },
  {
    id: "clinical-lead",
    name: "Clinical Informatics Lead",
    role: "Healthcare Workflow & Compliance",
    bio: "Guiding clinical system requirements, medical role interoperability, and workflow safety across patient and provider interfaces.",
    initials: "CI",
    isPlaceholder: true,
    socials: {},
  },
  {
    id: "product-operations",
    name: "Product & Operations Lead",
    role: "Product Strategy & Ecosystem",
    bio: "Directing product roadmap execution, stakeholder coordination, and the public launch rollout targeting November 2026.",
    initials: "PO",
    isPlaceholder: true,
    socials: {},
  },
] as const;
