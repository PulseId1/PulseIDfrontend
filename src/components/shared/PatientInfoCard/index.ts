export {
  PatientInfoCard,
  PatientAvatar,
  BloodGroupBadge,
  VerifiedStatusBadge,
} from "@/features/patient/components/patient-info-card";

export type {
  PatientIdentity,
  PatientInfoCardProps,
  PatientInfoCardVariant,
} from "@/features/patient/types/patient-card-types";

export {
  mapProfileToPatientIdentity,
  calculateAgeText,
  getInitials,
} from "@/features/patient/utils/patient-mappers";
