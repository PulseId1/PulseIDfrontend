/**
 * PulseID Backend DTOs & Domain Types
 * Source of Truth: Clincs Plus API V1 OpenAPI Specification
 * Base URL: https://pulseid-api-566271518532.europe-west1.run.app/swagger/v1/swagger.json
 */

// ============================================================================
// 1. BACKEND DTOs (Strictly aligned with OpenAPI schemas)
// ============================================================================

/**
 * LoginParamterDTO (Note: backend schema has typo 'LoginParamterDTO')
 */
export interface LoginParameterDTO {
  userName: string;
  password: string;
}

/**
 * BloodTypeDTO - Blood type reference item
 */
export interface BloodTypeDTO {
  id: number;
  nameAr?: string | null;
  nameEn?: string | null;
}

/**
 * StatesDTO - State/Governorate reference item
 */
export interface StatesDTO {
  id: number;
  nameAr?: string | null;
  nameEn?: string | null;
}

/**
 * CitysDTO - City reference item
 */
export interface CitysDTO {
  id: number;
  nameAr?: string | null;
  nameEn?: string | null;
  stateId?: number;
}

/**
 * AllergyMenuDTO - Minimal backend schema
 * Notice: Backend only stores id, name, patientId, date.
 */
export interface AllergyMenuDTO {
  id?: number;
  name?: string | null;
  patientId?: string | null;
  date?: string | null;
}

/**
 * ChronicDiseasesDTO - Minimal backend schema
 * Notice: Backend only stores id, name, patientId, date.
 */
export interface ChronicDiseasesDTO {
  id?: number;
  name?: string | null;
  patientId?: string | null;
  date?: string | null;
}

/**
 * CurrentMedicationsDTO - Minimal backend schema
 * Notice: Backend only stores id, patientId, name, date.
 */
export interface CurrentMedicationsDTO {
  id?: number;
  patientId?: string | null;
  name?: string | null;
  date?: string | null;
}

/**
 * PastMedicalHistoryDTO - Minimal backend schema
 * Notice: Backend uses 'userId' rather than 'patientId'.
 */
export interface PastMedicalHistoryDTO {
  id?: number;
  name?: string | null;
  userId?: string | null;
  date?: string | null;
}

/**
 * PreviousSurgicalProceduresDTO - Minimal backend schema
 * Notice: Backend only stores id, name, patientId, date.
 */
export interface PreviousSurgicalProceduresDTO {
  id?: number;
  name?: string | null;
  patientId?: string | null;
  date?: string | null;
}

/**
 * UserAddUpdateDTO - Main user / patient entity schema
 * Role typeId: 1 = Patient, 2 = Doctor, 3 = Pharmacist
 */
export interface UserAddUpdateDTO {
  id?: string | null;
  nameAr?: string | null;
  nameEn?: string | null;
  birthDate?: string | null;
  genderTypeId?: number | null;
  typeId?: number;
  email?: string | null;
  nationalId?: string | null;
  address?: string | null;
  phone?: string | null;
  bloodTypeId?: number | null;
  userName?: string | null;
  password?: string | null;
  allergyMenu?: AllergyMenuDTO[] | null;
  chronicDiseases?: ChronicDiseasesDTO[] | null;
  currentMedications?: CurrentMedicationsDTO[] | null;
  pastMedicalHistory?: PastMedicalHistoryDTO[] | null;
  previousSurgicalProcedures?: PreviousSurgicalProceduresDTO[] | null;
}

/**
 * UserAddUpdateDoctorDTO - Doctor / Pharmacist specific entity schema
 */
export interface UserAddUpdateDoctorDTO {
  id: string;
  nameAr: string;
  nameEn: string;
  birthDate?: string | null;
  genderTypeId?: number | null;
  typeId: number;
  email?: string | null;
  phone?: string | null;
  nationalId?: string | null;
  address?: string | null;
  bloodTypeId?: number | null;
  userName?: string | null;
  password?: string | null;
  stateId?: number | null;
  cityId?: number | null;
  license?: string | null;
  medicalLicense?: string | null;
  professionalID?: string | null;
  medicalLicenseName?: string | null;
  professionalIDName?: string | null;
}

// ============================================================================
// 2. PAGINATION & FILTER SCHEMAS
// ============================================================================

export interface SortModel {
  colId?: string;
  sort?: "asc" | "desc" | string;
  pairAsSqlExpression?: string;
}

export interface BaseFilterParam<TFilter = Record<string, unknown>> {
  pageNumber?: number;
  pageSize?: number;
  filter?: TFilter;
  orderByValue?: SortModel[];
}

export interface PatientIdFilter {
  patientId?: string;
}

export type AllergyMenuFilterBaseParam = BaseFilterParam<PatientIdFilter>;
export type ChronicDiseasesFilterBaseParam = BaseFilterParam<PatientIdFilter>;
export type CurrentMedicationsFilterBaseParam = BaseFilterParam<PatientIdFilter>;
export type PastMedicalHistoryDTOFilterBaseParam = BaseFilterParam<PatientIdFilter>;
export type PreviousSurgicalProceduresFilterBaseParam = BaseFilterParam<PatientIdFilter>;
export type UsersFilterBaseParam = BaseFilterParam<Record<string, unknown>>;

export interface PaginatedResult<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalCountNew?: number;
  result: T[];
}

export interface BackendEnvelope<T> {
  code?: number;
  data?: T;
  error?: string | null;
  errors?: Record<string, string[]> | null;
  message?: string | null;
}

// ============================================================================
// 3. FRONTEND PRESENTATION MODELS (UI-ONLY — NOT SUPPORTED BY BACKEND API V1)
// These models represent Figma visual requirements that are not persisted
// by the current backend schema. They are maintained separately to avoid
// polluting backend requests with unsupported fields.
// ============================================================================

export interface EmergencyContactDTO {
  id?: string;
  fullName: string;
  phone: string;
  relationship: string;
}

export interface AccessRequestPermission {
  category: string;
  details: string;
  recordsCount: number;
  items?: string[];
}

export interface AccessRequestItem {
  id: string;
  requestId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalClinic: string;
  avatarUrl: string;
  status: "pending" | "approved" | "rejected" | "revoked";
  requestedDate: string;
  accessExpires?: string;
  reasonForAccess: string;
  permissions: AccessRequestPermission[];
  viewOnly: boolean;
  expiresText: string;
  isBackendSupported?: false;
}

export interface MedicalRecordMetric {
  label: string;
  value: string;
  note?: string;
  isAbnormal?: boolean;
}

export interface MedicalRecordItem {
  id: string;
  category: "history" | "labs" | "radiology" | "diagnoses" | "reports";
  title: string;
  subtitle?: string;
  date: string;
  facility: string;
  doctor?: string;
  statusBadge: {
    label: string;
    variant: "normal" | "active" | "resolved" | "monitored" | "final" | "discharged";
  };
  metrics?: MedicalRecordMetric[];
  findings?: string;
  description?: string;
  downloadUrl?: string;
  dicomViewerUrl?: string;
  pdfAvailable?: boolean;
  isBackendSupported?: false;
}

/**
 * Rich Presentation Models extending minimal backend DTOs for Figma UI cards
 */
export interface UIAllergyItem extends AllergyMenuDTO {
  severity?: "Mild" | "Moderate" | "Severe" | "Life-threatening";
  reactionType?: string;
  precautions?: string;
  emergencyWarning?: string;
}

export interface UIChronicDiseaseItem extends ChronicDiseasesDTO {
  status?: string;
  latestReading?: string;
  connectedDevice?: string;
  assignedTherapy?: string;
  triggers?: string[];
  emergencyProtocol?: string;
  notes?: string;
}

export interface UICurrentMedicationItem extends CurrentMedicationsDTO {
  dosage?: string;
  frequency?: string;
  instructions?: string;
  assignedBy?: string;
  status?: string;
}

export interface UIPastMedicalHistoryItem extends PastMedicalHistoryDTO {
  conditionDescription?: string;
  treatment?: string;
  recoveryStatus?: string;
}

export interface UIPreviousSurgicalProcedureItem extends PreviousSurgicalProceduresDTO {
  hospital?: string;
  surgeon?: string;
  reason?: string;
  recoveryStatus?: string;
  followUpNotes?: string;
}

/**
 * UIPatientProfile includes presentation-only fields like emergencyContacts
 * and rich clinical items. It extends UserAddUpdateDTO.
 */
export interface UIPatientProfile
  extends Omit<
    UserAddUpdateDTO,
    | "allergyMenu"
    | "chronicDiseases"
    | "currentMedications"
    | "pastMedicalHistory"
    | "previousSurgicalProcedures"
  > {
  allergyMenu?: UIAllergyItem[] | null;
  chronicDiseases?: UIChronicDiseaseItem[] | null;
  currentMedications?: UICurrentMedicationItem[] | null;
  pastMedicalHistory?: UIPastMedicalHistoryItem[] | null;
  previousSurgicalProcedures?: UIPreviousSurgicalProcedureItem[] | null;
  emergencyContacts?: EmergencyContactDTO[] | null;
}
