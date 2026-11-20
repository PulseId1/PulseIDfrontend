export { PatientNavbar } from "./components/patient-navbar";
export { PatientHero } from "./components/patient-hero";
export { QuickActions } from "./components/quick-actions";
export { HealthRewardBanner } from "./components/health-reward-banner";
export { RecentMedicalActivity } from "./components/recent-medical-activity";
export { PatientFooter } from "./components/patient-footer";
export { MobilePatientHeader } from "./components/mobile-patient-header";
export { MobileBottomNav } from "./components/mobile-bottom-nav";
export { PatientProfileBanner } from "./components/patient-profile-banner";
export {
  PatientInfoCard,
  PatientAvatar,
  BloodGroupBadge,
  VerifiedStatusBadge,
} from "./components/patient-info-card";
export { PatientHealthInfoModal } from "./components/patient-health-info-modal";
export { UploadPrescriptionModal } from "./components/upload-prescription-modal";
export { AIAssistantModal } from "./components/ai-assistant-modal";
export { DICOMViewerModal } from "./components/dicom-viewer-modal";

export type {
  PatientIdentity,
  PatientInfoCardProps,
  PatientInfoCardVariant,
} from "./types/patient-card-types";

export {
  mapProfileToPatientIdentity,
  calculateAgeText,
  getInitials,
  resolveBloodTypeLabel,
  BLOOD_TYPE_LABELS,
} from "./utils/patient-mappers";

export * from "./components/records";
export * from "./components/profile";
export * from "./hooks/use-medical-records";
export * from "./hooks/use-patient-profile";

