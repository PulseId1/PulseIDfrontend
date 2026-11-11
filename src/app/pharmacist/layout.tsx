import React from "react";
import { RoleGuard } from "@/components/auth/role-guard";

export const metadata = {
  title: "PulseID Pharmacist Portal — Prescription Dispensation & Safety",
  description: "Licensed pharmacist workspace for digital prescription verification, drug-drug interaction screening, and dispensation tracking.",
};

export default function PharmacistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["pharmacist"]}>{children}</RoleGuard>;
}
