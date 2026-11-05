import { AuthLanguage } from "../types/auth";

const rawTranslations = {
  en: {
    appName: "PulseID",
    tagline: "Connected Healthcare Identity",
    switchLanguage: "العربية",

    // Step indicators
    steps: {
      role: "Account Role",
      details: "Your Details",
      verify: "Verification",
    },

    // Screen 1: Role Selection
    roleSelection: {
      badge: "Step 1 of 3",
      title: "Select your account type",
      subtitle:
        "Choose how you will be using PulseID. Each role provides specialized healthcare tools and privacy safeguards.",
      roles: {
        patient: {
          title: "Patient",
          headline: "Personal Health & Medical Records",
          description:
            "Securely access your lifetime health records, digital prescriptions, and emergency medical profile.",
          highlights: [
            "Emergency Medical ID",
            "Prescription History",
            "Doctor Access Permissions",
          ],
        },
        doctor: {
          title: "Doctor",
          headline: "Clinical Practitioner Workspace",
          description:
            "Review verified patient histories with clinical consent, conduct consultations, and issue signed e-prescriptions.",
          highlights: [
            "Clinical History Review",
            "E-Prescription Issuance",
            "Verified Syndicate Profile",
          ],
        },
        pharmacist: {
          title: "Pharmacist",
          headline: "Dispensing & Rx Verification",
          description:
            "Instantly validate electronic prescriptions, prevent drug interactions, and maintain accurate dispensing logs.",
          highlights: [
            "Real-time Rx Validation",
            "Dispense Verification",
            "Drug Interaction Safety",
          ],
        },
      },
      continueBtn: "Continue with this role",
      selectPrompt: "Please choose a role to proceed",
      alreadyHaveAccount: "Already have an account?",
      loginLink: "Sign In",
    },

    // Screen 2: Login
    login: {
      badge: "Authentication",
      title: "Sign in to PulseID",
      subtitle: "Enter your registered mobile phone number to receive a secure login code.",
      selectedRoleLabel: "Role:",
      changeRole: "Change role",
      phoneLabel: "Mobile Phone Number",
      phonePlaceholder: "010 1234 5678",
      phoneHelper: "We'll send you a 6-digit one-time code via SMS.",
      submitBtn: "Send Verification Code",
      noAccountPrompt: "Don't have an account yet?",
      registerLink: "Create an account",
      backBtn: "Back to role selection",
    },

    // Screen 3: Registration
    register: {
      badge: "Account Setup",
      title: "Create your PulseID account",
      subtitle: "Fill in your details to set up your verified healthcare profile.",
      selectedRoleLabel: "Role:",
      changeRole: "Change role",
      commonFields: {
        fullName: "Full Legal Name",
        fullNamePlaceholder: "e.g., Dr. Sarah Mostafa or Ahmed Ali",
        fullNameHelper: "As it appears on your official identification document.",
        phone: "Mobile Phone Number",
      },
      patientFields: {
        dob: "Date of Birth",
        dobPlaceholder: "YYYY-MM-DD",
        gender: "Gender",
        genderSelectPrompt: "Select gender",
        genderMale: "Male",
        genderFemale: "Female",
        genderOther: "Prefer not to disclose",
        nationalId: "National ID / Passport (Optional)",
        nationalIdPlaceholder: "14-digit Egyptian National ID or Passport",
        emergencyContactName: "Emergency Contact Name (Optional)",
        emergencyContactNamePlaceholder: "Next of kin full name",
        emergencyContactPhone: "Emergency Contact Phone (Optional)",
        emergencyContactPhonePlaceholder: "010 xxxx xxxx",
      },
      doctorFields: {
        specialization: "Medical Specialization",
        specializationSelectPrompt: "Select primary specialization",
        licenseNumber: "Medical Syndicate / License Number",
        licenseNumberPlaceholder: "e.g., MED-123456",
        hospitalAffiliation: "Hospital / Clinic Affiliation (Optional)",
        hospitalAffiliationPlaceholder: "e.g., Cairo University Hospitals",
        yearsExperience: "Years of Practice (Optional)",
        yearsExperiencePlaceholder: "e.g., 8",
      },
      pharmacistFields: {
        licenseNumber: "Pharmacist License Number",
        licenseNumberPlaceholder: "e.g., PHARM-987654",
        pharmacyName: "Pharmacy Name / Establishment",
        pharmacyNamePlaceholder: "e.g., El Ezaby Pharmacy - Maadi Branch",
        pharmacyBranch: "Branch Address / City (Optional)",
        pharmacyBranchPlaceholder: "e.g., Road 9, Maadi, Cairo",
        syndicateId: "Syndicate Registration ID (Optional)",
        syndicateIdPlaceholder: "e.g., SYN-44321",
      },
      termsNotice:
        "By continuing, you agree to PulseID's Healthcare Privacy Policy and Terms of Clinical Data Handling.",
      submitBtn: "Continue to Verification",
      alreadyRegistered: "Already registered?",
      loginLink: "Sign in instead",
      backBtn: "Back",
    },

    // Screen 4: OTP Verification
    verify: {
      badge: "Security Verification",
      title: "Enter Verification Code",
      subtitle: "We sent a 6-digit one-time code to",
      editNumber: "Edit number",
      codeLabel: "Six-digit verification code",
      resendPrompt: "Didn't receive the SMS?",
      resendCountdown: "Resend available in",
      resendBtn: "Resend Code",
      resendSuccess: "A new simulated OTP has been generated.",
      submitBtn: "Verify & Complete",
      verifying: "Verifying code...",
      pasteHint: "Tip: You can paste the 6-digit code directly into the first box.",
      mockHint:
        "Local Simulation Mode: Enter any 6 digits (e.g. 123456) to succeed, or 000000 to test an invalid code error.",
      backBtn: "Back to previous step",
    },

    // Validation Errors
    errors: {
      required: "This field is required.",
      invalidPhone: "Please enter a valid mobile number for the selected country.",
      fullNameTooShort: "Please enter your full name (at least 3 characters).",
      invalidLicense: "Please enter a valid license or registration number.",
      invalidOtp: "Invalid verification code. Use 123456 to succeed or try again.",
      otpIncomplete: "Please enter all 6 digits of the verification code.",
    },

    // Simulation / Demo Info Modal
    simulation: {
      bannerTitle: "Phase 1 Frontend Simulation",
      bannerText:
        "No real SMS is transmitted. All authentication validations and state transitions are executed locally.",
      successTitle: "Authentication Verified!",
      successRolePrefix: "Account Type:",
      successPhonePrefix: "Registered Phone:",
      successNotice:
        "Verification complete. In future production phases, this step will establish an encrypted session and route to your authenticated portal.",
      actionRestart: "Test Another Account Type",
      actionLanding: "Return to Landing Page",
    },
  },

  ar: {
    appName: "PulseID",
    tagline: "الهوية الصحية الرقمية المتصلة",
    switchLanguage: "English",

    // Step indicators
    steps: {
      role: "نوع الحساب",
      details: "البيانات",
      verify: "رمز التحقق",
    },

    // Screen 1: Role Selection
    roleSelection: {
      badge: "الخطوة الأولى من ٣",
      title: "اختر نوع حسابك",
      subtitle:
        "حدد كيف ستستخدم PulseID. يوفر كل نوع حساب أدوات طبية متخصصة وضوابط حماية خصوصية صارمة.",
      roles: {
        patient: {
          title: "مريض",
          headline: "ملفك الصحي وسجلاتك الطبية",
          description:
            "الوصول الآمن إلى سجلك الصحي الشامل، وروشتاتك الرقمية، وملف الطوارئ الطبي الخاص بك.",
          highlights: [
            "هوية الطوارئ الطبية",
            "سجل الروشتات والعلاج",
            "صلاحيات وصول الأطباء",
          ],
        },
        doctor: {
          title: "طبيب",
          headline: "مساحة العمل الإكلينيكية للطبيب",
          description:
            "استعراض التاريخ المرضي الموثق بموافقة المريض، وإجراء الاستشارات، وإصدار الروشتات الرقمية المعتمدة.",
          highlights: [
            "فحص السجلات السريرية",
            "إصدار الروشتات الإلكترونية",
            "ملف موثق بالنقابة",
          ],
        },
        pharmacist: {
          title: "صيدلي",
          headline: "صرف الدواء والتحقق من الروشتات",
          description:
            "التحقق الفوري من صحة الروشتات الإلكترونية، ومنع التداخلات الدوائية الخطرة، وتوثيق سجلات الصرف.",
          highlights: [
            "التحقق اللحظي من الروشتة",
            "توثيق عمليات الصرف",
            "فحص التداخلات الدوائية",
          ],
        },
      },
      continueBtn: "المتابعة بهذا الحساب",
      selectPrompt: "يرجى اختيار نوع الحساب للمتابعة",
      alreadyHaveAccount: "هل لديك حساب بالفعل؟",
      loginLink: "تسجيل الدخول",
    },

    // Screen 2: Login
    login: {
      badge: "تسجيل الدخول",
      title: "الدخول إلى PulseID",
      subtitle: "أدخل رقم الهاتف المحمول المسجل لاستلام رمز التحقق الآمن.",
      selectedRoleLabel: "نوع الحساب:",
      changeRole: "تغيير",
      phoneLabel: "رقم الهاتف المحمول",
      phonePlaceholder: "010 1234 5678",
      phoneHelper: "سنرسل لك رمز تحقق مكوّن من 6 أرقام عبر رسالة نصية قصيرة.",
      submitBtn: "إرسال رمز التحقق",
      noAccountPrompt: "ليس لديك حساب بعد؟",
      registerLink: "إنشاء حساب جديد",
      backBtn: "العودة لاختيار نوع الحساب",
    },

    // Screen 3: Registration
    register: {
      badge: "إنشاء الحساب",
      title: "إنشاء حسابك في PulseID",
      subtitle: "أدخل بياناتك لإنشاء ملفك الصحي الرقمي الموثق.",
      selectedRoleLabel: "نوع الحساب:",
      changeRole: "تغيير",
      commonFields: {
        fullName: "الاسم القانوني بالكامل",
        fullNamePlaceholder: "مثال: د. سارة مصطفى أو أحمد علي",
        fullNameHelper: "كما هو مسجل في بطاقة الهوية الرسمية.",
        phone: "رقم الهاتف المحمول",
      },
      patientFields: {
        dob: "تاريخ الميلاد",
        dobPlaceholder: "YYYY-MM-DD",
        gender: "الجنس",
        genderSelectPrompt: "حدد الجنس",
        genderMale: "ذكر",
        genderFemale: "أنثى",
        genderOther: "أفضل عدم الإفصاح",
        nationalId: "الرقم القومي / جواز السفر (اختياري)",
        nationalIdPlaceholder: "الرقم القومي المكون من 14 رقماً",
        emergencyContactName: "اسم جهة اتصال الطوارئ (اختياري)",
        emergencyContactNamePlaceholder: "اسم قريب أو وصي",
        emergencyContactPhone: "هاتف جهة اتصال الطوارئ (اختياري)",
        emergencyContactPhonePlaceholder: "010 xxxx xxxx",
      },
      doctorFields: {
        specialization: "التخصص الطبي",
        specializationSelectPrompt: "اختر التخصص الطبي الأساسي",
        licenseNumber: "رقم قيد النقابة / ترخيص مزاولة المهنة",
        licenseNumberPlaceholder: "مثال: MED-123456",
        hospitalAffiliation: "المستشفى أو المركز الطبي التابع له (اختياري)",
        hospitalAffiliationPlaceholder: "مثال: مستشفيات جامعة القاهرة",
        yearsExperience: "سنوات الخبرة السريرية (اختياري)",
        yearsExperiencePlaceholder: "مثال: 8",
      },
      pharmacistFields: {
        licenseNumber: "رقم ترخيص مزاولة مهنة الصيدلة",
        licenseNumberPlaceholder: "مثال: PHARM-987654",
        pharmacyName: "اسم الصيدلية أو المنشأة",
        pharmacyNamePlaceholder: "مثال: صيدليات العزبي - فرع المعادي",
        pharmacyBranch: "عنوان الفرع / المدينة (اختياري)",
        pharmacyBranchPlaceholder: "مثال: شارع 9، المعادي، القاهرة",
        syndicateId: "رقم القيد النقابي (اختياري)",
        syndicateIdPlaceholder: "مثال: SYN-44321",
      },
      termsNotice:
        "بمتابعتك، فإنك توافق على سياسة خصوصية الرعاية الصحية وشروط التعامل مع البيانات الطبية في PulseID.",
      submitBtn: "المتابعة للتحقق من الرمز",
      alreadyRegistered: "مسجل بالفعل؟",
      loginLink: "تسجيل الدخول بدلاً من ذلك",
      backBtn: "رجوع",
    },

    // Screen 4: OTP Verification
    verify: {
      badge: "التحقق الأمني",
      title: "أدخل رمز التحقق",
      subtitle: "أرسلنا رمزاً مكوّناً من 6 أرقام إلى",
      editNumber: "تعديل الرقم",
      codeLabel: "رمز التحقق المكوّن من 6 أرقام",
      resendPrompt: "لم تصلك الرسالة؟",
      resendCountdown: "إعادة الإرسال متاحة خلال",
      resendBtn: "إعادة إرسال الرمز",
      resendSuccess: "تم توليد رمز تحقق تجريبي جديد بنجاح.",
      submitBtn: "التحقق والمتابعة",
      verifying: "جارٍ التحقق من الرمز...",
      pasteHint: "تلميح: يمكنك لصق الرمز المكوّن من 6 أرقام مباشرة في المربع الأول.",
      mockHint:
        "وضع المحاكاة التجريبي: أدخل أي 6 أرقام (مثل 123456) للنجاح، أو 000000 لتجربة رسالة الخطأ.",
      backBtn: "الرجوع للخطوة السابقة",
    },

    // Validation Errors
    errors: {
      required: "هذا الحقل مطلوب.",
      invalidPhone: "يرجى إدخال رقم هاتف محمول صحيح للدولة المختارة.",
      fullNameTooShort: "يرجى إدخال الاسم كاملاً (3 أحرف على الأقل).",
      invalidLicense: "يرجى إدخال رقم ترخيص أو قيد نقابي صحيح.",
      invalidOtp: "رمز التحقق غير صحيح. استخدم 123456 للنجاح أو حاول مجدداً.",
      otpIncomplete: "يرجى كتابة جميع الأرقام الستة لرمز التحقق.",
    },

    // Simulation / Demo Info Modal
    simulation: {
      bannerTitle: "محاكاة واجهة المرحلة الأولى",
      bannerText:
        "لا يتم إرسال رسائل نصية حقيقية. تتم جميع عمليات التحقق والانتقال محلياً داخل المتصفح.",
      successTitle: "تم التحقق من الحساب بنجاح!",
      successRolePrefix: "نوع الحساب:",
      successPhonePrefix: "رقم الهاتف المسجل:",
      successNotice:
        "اكتملت تجربة المحاكاة. في مرحلة الإنتاج القادمة، سيتم ربط هذه الخطوة بالخادم الآمن والانتقال إلى لوحة التحكم الخاصة بك.",
      actionRestart: "تجربة نوع حساب آخر",
      actionLanding: "العودة للصفحة الرئيسية",
    },
  },
};

type DeepString<T> = {
  readonly [K in keyof T]: T[K] extends readonly unknown[]
    ? readonly string[]
    : T[K] extends object
    ? DeepString<T[K]>
    : string;
};

export type AuthTranslations = DeepString<typeof rawTranslations.en>;

export const translations: Record<AuthLanguage, AuthTranslations> = rawTranslations;

export function useTranslation(lang: AuthLanguage): AuthTranslations {
  return translations[lang] || translations.en;
}

