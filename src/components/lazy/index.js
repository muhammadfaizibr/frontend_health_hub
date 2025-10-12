import { lazy } from 'react';

// Lazy load dashboard components
export const DashboardPage = lazy(() => import('@/app/(dashboard)/page'));
export const PatientDashboardPage = lazy(() => import('@/app/(dashboard)/patient/page'));
export const OrganizationDashboardPage = lazy(() => import('@/app/(dashboard)/organization/page'));
export const TranslatorDashboardPage = lazy(() => import('@/app/(dashboard)/translator/page'));

// Lazy load form components
export const LoginPage = lazy(() => import('@/app/login/page'));
export const RegisterPage = lazy(() => import('@/app/register/page'));

// Lazy load complex dashboard sections
export const AnalyticsPage = lazy(() => import('@/app/(dashboard)/organization/analytics/page'));
export const AppointmentsPage = lazy(() => import('@/app/(dashboard)/organization/appointments/page'));
export const CreditsPage = lazy(() => import('@/app/(dashboard)/organization/credits/page'));
export const PatientsPage = lazy(() => import('@/app/(dashboard)/organization/patients/page'));
export const StaffPage = lazy(() => import('@/app/(dashboard)/organization/staff/page'));

// Lazy load patient sections
export const PatientAppointmentsPage = lazy(() => import('@/app/(dashboard)/patient/appointments/page'));
export const FindDoctorPage = lazy(() => import('@/app/(dashboard)/patient/find-doctor/page'));
export const MedicalRecordsPage = lazy(() => import('@/app/(dashboard)/patient/medical-records/page'));
export const PrescriptionsPage = lazy(() => import('@/app/(dashboard)/patient/prescriptions/page'));
export const HealthTrackingPage = lazy(() => import('@/app/(dashboard)/patient/health-tracking/page'));
export const EmergencyPage = lazy(() => import('@/app/(dashboard)/patient/emergency/page'));

// Lazy load translator sections
export const TranslatorAssignmentsPage = lazy(() => import('@/app/(dashboard)/translator/assignments/page'));
export const TranslatorSchedulePage = lazy(() => import('@/app/(dashboard)/translator/schedule/page'));
export const TranslatorPatientsPage = lazy(() => import('@/app/(dashboard)/translator/patients/page'));
export const TranslatorDocumentsPage = lazy(() => import('@/app/(dashboard)/translator/medical-documents/page'));
export const TranslatorLanguagesPage = lazy(() => import('@/app/(dashboard)/translator/languages/page'));
export const TranslatorCertificationsPage = lazy(() => import('@/app/(dashboard)/translator/certifications/page'));
