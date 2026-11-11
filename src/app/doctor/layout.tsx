import React from "react";
import { RoleGuard } from "@/components/auth/role-guard";

export const metadata = {
  title: "PulseID Doctor Portal — Clinical Consultations & Patient Care",
  description: "Authorized medical clinician dashboard for patient record lookups, electronic prescriptions, and clinical consultations.",
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRoles={["doctor"]}>{children}</RoleGuard>;
}
