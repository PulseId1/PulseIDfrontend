/**
 * PulseID Team Member Type Contracts
 */

export interface TeamMemberSocials {
  readonly linkedin?: string;
  readonly github?: string;
  readonly portfolio?: string;
}

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio?: string;
  readonly photoUrl?: string;
  readonly initials: string;
  readonly socials?: TeamMemberSocials;
  readonly isPlaceholder?: boolean;
}
