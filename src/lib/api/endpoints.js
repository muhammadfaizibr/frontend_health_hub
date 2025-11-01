export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "base/auth/login/",
    REGISTER: "base/auth/register/",
    FORGET_PASSWORD: "base/auth/forget-password/",
    RESET_PASSWORD: "base/auth/reset-password/",
    CHANGE_PASSWORD: "base/auth/change-password/",
    LOGOUT: "base/auth/logout/",
    REFRESH: "base/auth/refresh/",
    PROFILE: "base/users/",
  },

  DOCTOR: {
    PROFILES: 'doctors/profiles/',
    PROFILE: (id) => `doctors/profiles/${id}/`,
    MY_PROFILE: 'doctors/profiles/my_profile/',
    SEARCH: 'doctors/profiles/search_doctors/',
    CATEGORIES: 'doctors/profiles/categories/',
    PRESCRIPTIONS: 'doctors/prescriptions/',
    REVIEWS: 'doctors/reviews/', // ✅ Changed from function to string
    PATIENTS: 'doctors/patients/',
    APPOINTMENTS: 'doctors/appointments/',
  },

  PATIENT: {
    PROFILE: 'patients/profile/',
    APPOINTMENTS: 'patients/appointments/',
    APPOINTMENT: (id) => `patients/appointments/${id}/`,
    BOOK_APPOINTMENT: 'patients/appointments/book/',
    CANCEL_APPOINTMENT: (id) => `patients/appointments/${id}/cancel/`,
    CASES: 'patients/cases/',
    CASE: (id) => `patients/cases/${id}/`,
    MEDICATIONS: 'patients/medications/',
    DOCTORS: 'patients/doctors/',
    REPORTS: 'patients/reports/',
    REPORT: (id) => `patients/reports/${id}/`,
  },

  BASE: {
    LANGUAGES: "base/languages/",
    LANGUAGE: (id) => `base/languages/${id}/`,
    EDUCATION: "base/education/",
    EDUCATION_RECORD: (id) => `base/education/${id}/`,
    EXPERIENCE: "base/experience/",
    EXPERIENCE_RECORD: (id) => `base/experience/${id}/`,
    CERTIFICATIONS: "base/certifications/",
    CERTIFICATION: (id) => `base/certifications/${id}/`,
    AVAILABILITY_SLOTS: "base/availability-slots/",
    AVAILABILITY_SLOT: (id) => `base/availability-slots/${id}/`,
    MY_AVAILABILITY: "base/availability-slots/my_availability/",
    SERVICE_FEES: "base/service-fees/",
    SERVICE_FEE: (id) => `base/service-fees/${id}/`,
    MY_FEES: "base/service-fees/my_fees/",
  },

  TRANSLATOR: {
    PROFILE: "translators/profile/",
    ASSIGNMENTS: "translators/assignments/",
  },

  ORGANIZATION: {
    PROFILE: "organizations/profile/",
    MEMBERS: "organizations/members/",
  },

  FILES: {
    LIST: "files/files/",
    UPLOAD: "files/files/",
    DOWNLOAD: (id) => `/files/files/download/${id}/`,
  },
};