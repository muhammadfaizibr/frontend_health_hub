// lib/api/endpoints.js

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: 'base/auth/login/',
    REGISTER: 'base/auth/register/',
    LOGOUT: '/auth/logout/',
    REFRESH: 'base/auth/refresh/',
    ME: '/auth/me/',
  },
  
  // Doctor
  DOCTOR: {
    PROFILE: '/doctor/profile/',
    PATIENTS: '/doctor/patients/',
    APPOINTMENTS: '/doctor/appointments/',
  },
  
  // Patient
  PATIENT: {
    PROFILE: '/patient/profile/',
    APPOINTMENTS: '/patient/appointments/',
    DOCTORS: '/patient/doctors/',
  },
  
  // Translator
  TRANSLATOR: {
    PROFILE: '/translator/profile/',
    ASSIGNMENTS: '/translator/assignments/',
  },
  
  // Organization
  ORGANIZATION: {
    PROFILE: '/organization/profile/',
    MEMBERS: '/organization/members/',
  },
};