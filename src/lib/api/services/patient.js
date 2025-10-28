import { apiGet, apiPost } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const getProfile = async () => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.PROFILE,
    {},
    'Profile retrieved successfully'
  );
  return data;
};

export const getAppointments = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.APPOINTMENTS,
    { params: filters },
    'Appointments retrieved successfully'
  );
  return data;
};

export const bookAppointment = async (appointmentData) => {
  const data = await apiPost(
    API_ENDPOINTS.PATIENT.BOOK_APPOINTMENT,
    appointmentData,
    'Appointment booked successfully'
  );
  return data;
};

export const createAppointment = async (appointmentData) => {
  // Deprecated: Use bookAppointment instead
  return bookAppointment(appointmentData);
};

export const getCases = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.CASES,
    { params: filters },
    'Cases retrieved successfully'
  );
  return data;
};

export const getMedications = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.MEDICATIONS,
    { params: filters },
    'Medications retrieved successfully'
  );
  return data;
};

export const getDoctors = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.DOCTORS,
    { params: filters },
    'Doctors retrieved successfully'
  );
  return data;
};

export const patientService = {
  getProfile,
  getAppointments,
  bookAppointment,
  createAppointment, // Keep for backward compatibility
  getCases,
  getMedications,
  getDoctors,
};

export default patientService;