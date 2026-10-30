/**
 * PulseID Team Member Type Contracts
 */

export type TeamCategory =
  | "leadership"
  | "technology"
  | "pharmaceutical"
  | "clinical-research"
  | "marketing";

export type TeamFilterCategory = "all" | TeamCategory;

export interface TeamCategoryInfo {
  readonly id: TeamFilterCategory;
  readonly label: string;
  readonly index: string; // e.g., "01", "02", "03", "04", "05", "06"
}

export interface TeamMemberSocials {
  readonly linkedin?: string;
  readonly github?: string;
  readonly portfolio?: string;
}

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly category: TeamCategory;
  readonly secondaryCategory?: TeamCategory;
  readonly initials: string;
  readonly badgeId: string;
  readonly photoUrl?: string;
  readonly bio?: string;
  readonly socials?: TeamMemberSocials;
}
