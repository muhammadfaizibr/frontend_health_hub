import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const getProfiles = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.PROFILES,
    { params: filters },
    'Doctor profiles retrieved successfully'
  );
  return data;
};

export const searchDoctors = async (searchParams = {}) => {
  const params = {
    ...(searchParams.searchTerm && { search: searchParams.searchTerm }),
    ...(searchParams.searchType && { search_type: searchParams.searchType }),
    ...(searchParams.category && { category: searchParams.category }),
    ...(searchParams.location && { location: searchParams.location }),
    ...(searchParams.minExperience && { min_experience: searchParams.minExperience }),
    ...(searchParams.maxExperience && { max_experience: searchParams.maxExperience }),
    ...(searchParams.ordering && { ordering: searchParams.ordering }),
  };
  
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.SEARCH,
    { params },
    'Doctors found successfully'
  );
  return data;
};

export const getCategories = async (searchTerm = '') => {
  const params = searchTerm ? { search: searchTerm } : {};
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.CATEGORIES,
    { params },
    'Categories retrieved successfully'
  );
  return data;
};

export const getMyProfile = async () => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.MY_PROFILE,
    {},
    'Profile retrieved successfully'
  );
  return data;
};

export const getProfile = async (profileId) => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.PROFILE(profileId),
    {},
    'Doctor profile retrieved successfully'
  );
  return data;
};

export const createProfile = async (profileData) => {
  const data = await apiPost(
    API_ENDPOINTS.DOCTOR.PROFILES,
    profileData,
    'Profile created successfully'
  );
  return data;
};

export const updateProfile = async (profileId, profileData) => {
  const data = await apiPut(
    API_ENDPOINTS.DOCTOR.PROFILE(profileId),
    profileData,
    'Profile updated successfully'
  );
  return data;
};

export const deleteProfile = async (profileId) => {
  const data = await apiDelete(
    API_ENDPOINTS.DOCTOR.PROFILE(profileId),
    'Profile deleted successfully'
  );
  return data;
};

export const getDoctorReviews = async (doctorId, appointmentId = null) => {
  const params = { doctor: doctorId };
  if (appointmentId) {
    params.appointment = appointmentId;
  }
  
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.REVIEWS,
    { params },
    'Reviews retrieved successfully'
  );
  return data;
};

export const getAppointmentReview = async (appointmentId) => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.REVIEWS, 
    { params: { appointment: appointmentId } },
    'Review retrieved successfully'
  );
  return data;
};

// Already included in document 9
export const getDoctorCases = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.CASES,
    { params: filters },
    'Cases retrieved successfully'
  );
  return data;
};

export const getDoctorCase = async (caseId) => {
  const data = await apiGet(
    `${API_ENDPOINTS.PATIENT.CASES}${caseId}/`,
    {},
    'Case retrieved successfully'
  );
  return data;
};

export const getDoctorAppointments = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.APPOINTMENTS,
    { params: filters },
    'Appointments retrieved successfully'
  );
  return data;
};

export const getDoctorAppointment = async (appointmentId) => {
  const data = await apiGet(
    `${API_ENDPOINTS.PATIENT.APPOINTMENTS}${appointmentId}/`,
    {},
    'Appointment retrieved successfully'
  );
  return data;
};

export const addPrescriptionItems = async (prescriptionId, items) => {
  const data = await apiPost(
    `${API_ENDPOINTS.DOCTOR.PRESCRIPTIONS}${prescriptionId}/add_items/`,
    { items },
    'Prescription items added successfully'
  );
  return data;
};

// Create doctor review
export const createDoctorReview = async (reviewData) => {
  const { doctor_id, appointment_id, rating, comment } = reviewData;
  const data = await apiPost(
    `doctors/reviews/?doctor=${doctor_id}`,
    { appointment_id, rating, comment },
    'Review submitted successfully'
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

export const createPrescription = async (prescriptionData) => {
  const data = await apiPost(
    API_ENDPOINTS.DOCTOR.PRESCRIPTIONS,
    prescriptionData,
    'Prescription created successfully'
  );
  return data;
};




export const doctorService = {
  getProfiles,
  searchDoctors,
  getCategories,
  getMyProfile,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getDoctorReviews,
  getAppointmentReview,
  createDoctorReview,
  getPrescriptions,
  createPrescription,
  getDoctorCases,
  getDoctorCase,
  getDoctorAppointments,
  getDoctorAppointment,
  addPrescriptionItems,
};

export default doctorService;