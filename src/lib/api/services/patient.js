import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const getProfile = async () => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.PROFILE,
    {},
    'Profile retrieved successfully'
  );
  return data;
};

export const updatePatientProfile = async (profileData) => {
  const data = await apiPut(
    API_ENDPOINTS.PATIENT.PROFILE,
    profileData,
    'Profile updated successfully'
  );
  return data;
};

export const createAppointment = async (appointmentData) => {
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

export const getAppointments = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.APPOINTMENTS,
    { params: filters },
    'Appointments retrieved successfully'
  );
  return data;
};

export const getAppointment = async (appointmentId) => {
  const data = await apiGet(
    `${API_ENDPOINTS.PATIENT.APPOINTMENTS}${appointmentId}/`,
    {},
    'Appointment retrieved successfully'
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

export const joinAppointment = async (appointmentId, participantType) => {
  console.log(appointmentId, 'appointmentId')
  const data = await apiPost(
    `${API_ENDPOINTS.PATIENT.APPOINTMENTS}${appointmentId}/join/`,
    { participant_type: participantType },
    'Joined appointment successfully'
  );
  return data;
};

export const cancelAppointment = async (appointmentId, reason) => {
  const data = await apiPost(
    `${API_ENDPOINTS.PATIENT.APPOINTMENTS}${appointmentId}/cancel/`,
    { cancellation_reason: reason },
    'Appointment cancelled successfully'
  );
  return data;
};

export const confirmAppointment = async (appointmentId) => {
  const data = await apiPost(
    `${API_ENDPOINTS.PATIENT.APPOINTMENTS}${appointmentId}/confirm/`,
    {},
    'Appointment confirmed successfully'
  );
  return data;
};



export const getCase = async (caseId) => {
  const data = await apiGet(
    `${API_ENDPOINTS.PATIENT.CASES}${caseId}/`,
    {},
    'Case retrieved successfully'
  );
  return data;
};

export const createCase = async (caseData) => {
  const data = await apiPost(
    API_ENDPOINTS.PATIENT.CASES,
    caseData,
    'Case created successfully'
  );
  return data;
};

export const updateCase = async (caseId, caseData) => {
  const data = await apiPut(
    `${API_ENDPOINTS.PATIENT.CASES}${caseId}/`,
    caseData,
    'Case updated successfully'
  );
  return data;
};

export const deleteCase = async (caseId) => {
  const data = await apiDelete(
    `${API_ENDPOINTS.PATIENT.CASES}${caseId}/`,
    'Case deleted successfully'
  );
  return data;
};

export const getPrescriptions = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.PRESCRIPTIONS,
    { params: filters },
    'Prescriptions retrieved successfully'
  );
  return data;
};

export const getReports = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.REPORTS,
    { params: filters },
    'Reports retrieved successfully'
  );
  return data;
};

export const createReport = async (reportData) => {
  const data = await apiPost(
    API_ENDPOINTS.PATIENT.REPORTS,
    reportData,
    'Report created successfully'
  );
  return data;
};

export const createReview = async (reviewData) => {
  const data = await apiPost(
    API_ENDPOINTS.DOCTOR.REVIEWS,
    reviewData,
    'Review submitted successfully'
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

export const uploadFile = async (fileData) => {
  const data = await apiPost(
    API_ENDPOINTS.FILES.UPLOAD,
    fileData,
    'File uploaded successfully'
  );
  return data;
};

export const patientService = {
  getProfile,
  getAppointments,
  getAppointment,
  bookAppointment,
  cancelAppointment,
  createAppointment,
  getCases,
  getCase,
  createCase,
  updateCase,
  deleteCase,
  getPrescriptions,
  getReports,
  createReport,
  createReview,
  getMedications,
  getDoctors,
  uploadFile,
};

export default patientService;