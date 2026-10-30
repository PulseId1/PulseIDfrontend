/**
 * PulseID Core Type Definitions
 *
 * Domain contracts and shared interface definitions.
 */

import type { USER_ROLES } from "@/lib/constants";

export type UserRole = (typeof USER_ROLES)[number];

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface SiteMetadata {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly launchDate: string;
}
