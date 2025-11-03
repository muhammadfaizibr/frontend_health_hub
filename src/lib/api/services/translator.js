// lib/api/services/translator.js
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

// Profile
export const getTranslatorProfile = async () => {
  const data = await apiGet(
    API_ENDPOINTS.TRANSLATOR.PROFILES,
    {},
    'Profile retrieved successfully'
  );
  return data;
};

export const updateTranslatorProfile = async (profileId, profileData) => {
  const data = await apiPut(
    API_ENDPOINTS.TRANSLATOR.PROFILE(profileId),
    profileData,
    'Profile updated successfully'
  );
  return data;
};

// Appointments
export const getTranslatorAppointments = async (translatorId, filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.PATIENT.APPOINTMENTS,
    { params: { translator: translatorId, ...filters } },
    'Appointments retrieved successfully'
  );
  return data;
};

// Languages
export const getTranslatorLanguages = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.TRANSLATOR.LANGUAGES,
    { params: filters },
    'Languages retrieved successfully'
  );
  return data;
};

export const createTranslatorLanguage = async (languageData) => {
  const data = await apiPost(
    API_ENDPOINTS.TRANSLATOR.LANGUAGES,
    languageData,
    'Language added successfully'
  );
  return data;
};

export const updateTranslatorLanguage = async (languageId, languageData) => {
  const data = await apiPut(
    API_ENDPOINTS.TRANSLATOR.LANGUAGE(languageId),
    languageData,
    'Language updated successfully'
  );
  return data;
};

export const deleteTranslatorLanguage = async (languageId) => {
  const data = await apiDelete(
    API_ENDPOINTS.TRANSLATOR.LANGUAGE(languageId),
    'Language deleted successfully'
  );
  return data;
};

// Availability Slots
export const getTranslatorAvailability = async () => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.MY_AVAILABILITY,
    {},
    'Availability retrieved successfully'
  );
  return data;
};

export const createTranslatorAvailabilitySlot = async (slotData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOTS,
    slotData,
    'Availability slot created successfully'
  );
  return data;
};

export const updateTranslatorAvailabilitySlot = async (slotId, slotData) => {
  const data = await apiPut(
    `${API_ENDPOINTS.BASE.AVAILABILITY_SLOTS}${slotId}/`,
    slotData,
    'Availability slot updated successfully'
  );
  return data;
};

export const deleteTranslatorAvailabilitySlot = async (slotId) => {
  const data = await apiDelete(
    `${API_ENDPOINTS.BASE.AVAILABILITY_SLOTS}${slotId}/`,
    'Availability slot deleted successfully'
  );
  return data;
};

// Service Fees
export const getTranslatorFees = async () => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.MY_FEES,
    {},
    'Fees retrieved successfully'
  );
  return data;
};

export const createTranslatorServiceFee = async (feeData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.SERVICE_FEES,
    feeData,
    'Service fee created successfully'
  );
  return data;
};

export const updateTranslatorServiceFee = async (feeId, feeData) => {
  const data = await apiPut(
    `${API_ENDPOINTS.BASE.SERVICE_FEES}${feeId}/`,
    feeData,
    'Service fee updated successfully'
  );
  return data;
};

export const deleteTranslatorServiceFee = async (feeId) => {
  const data = await apiDelete(
    `${API_ENDPOINTS.BASE.SERVICE_FEES}${feeId}/`,
    'Service fee deleted successfully'
  );
  return data;
};

export const translatorService = {
  getTranslatorProfile,
  updateTranslatorProfile,
  getTranslatorAppointments,
  getTranslatorLanguages,
  createTranslatorLanguage,
  updateTranslatorLanguage,
  deleteTranslatorLanguage,
  getTranslatorAvailability,
  createTranslatorAvailabilitySlot,
  updateTranslatorAvailabilitySlot,
  deleteTranslatorAvailabilitySlot,
  getTranslatorFees,
  createTranslatorServiceFee,
  updateTranslatorServiceFee,
  deleteTranslatorServiceFee,
};

export default translatorService;