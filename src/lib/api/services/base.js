import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

// Languages
export const getLanguages = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.LANGUAGES,
    { params: filters },
    'Languages retrieved successfully'
  );
  return data;
};

export const getLanguage = async (languageId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.LANGUAGE(languageId),
    {},
    'Language retrieved successfully'
  );
  return data;
};

export const createLanguage = async (languageData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.LANGUAGES,
    languageData,
    'Language created successfully'
  );
  return data;
};

export const updateLanguage = async (languageId, languageData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.LANGUAGE(languageId),
    languageData,
    'Language updated successfully'
  );
  return data;
};

export const deleteLanguage = async (languageId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.LANGUAGE(languageId),
    'Language deleted successfully'
  );
  return data;
};

// Education
export const getEducation = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.EDUCATION,
    { params: filters },
    'Education records retrieved successfully'
  );
  return data;
};

export const getEducationRecord = async (educationId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.EDUCATION_RECORD(educationId),
    {},
    'Education record retrieved successfully'
  );
  return data;
};

export const createEducation = async (educationData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.EDUCATION,
    educationData,
    'Education record created successfully'
  );
  return data;
};

export const updateEducation = async (educationId, educationData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.EDUCATION_RECORD(educationId),
    educationData,
    'Education record updated successfully'
  );
  return data;
};

export const deleteEducation = async (educationId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.EDUCATION_RECORD(educationId),
    'Education record deleted successfully'
  );
  return data;
};

// Experience
export const getExperience = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.EXPERIENCE,
    { params: filters },
    'Experience records retrieved successfully'
  );
  return data;
};

export const getExperienceRecord = async (experienceId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.EXPERIENCE_RECORD(experienceId),
    {},
    'Experience record retrieved successfully'
  );
  return data;
};

export const createExperience = async (experienceData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.EXPERIENCE,
    experienceData,
    'Experience record created successfully'
  );
  return data;
};

export const updateExperience = async (experienceId, experienceData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.EXPERIENCE_RECORD(experienceId),
    experienceData,
    'Experience record updated successfully'
  );
  return data;
};

export const deleteExperience = async (experienceId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.EXPERIENCE_RECORD(experienceId),
    'Experience record deleted successfully'
  );
  return data;
};

// Certifications
export const getCertifications = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.CERTIFICATIONS,
    { params: filters },
    'Certifications retrieved successfully'
  );
  return data;
};

export const getCertification = async (certificationId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.CERTIFICATION(certificationId),
    {},
    'Certification retrieved successfully'
  );
  return data;
};

export const createCertification = async (certificationData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.CERTIFICATIONS,
    certificationData,
    'Certification created successfully'
  );
  return data;
};

export const updateCertification = async (certificationId, certificationData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.CERTIFICATION(certificationId),
    certificationData,
    'Certification updated successfully'
  );
  return data;
};

export const deleteCertification = async (certificationId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.CERTIFICATION(certificationId),
    'Certification deleted successfully'
  );
  return data;
};

// Availability Slots
export const getAvailabilitySlots = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOTS,
    { params: filters },
    'Availability slots retrieved successfully'
  );
  return data;
};

export const getMyAvailability = async () => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.MY_AVAILABILITY,
    {},
    'My availability retrieved successfully'
  );
  return data;
};

export const getAvailabilitySlot = async (slotId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOT(slotId),
    {},
    'Availability slot retrieved successfully'
  );
  return data;
};

export const createAvailabilitySlot = async (slotData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOTS,
    slotData,
    'Availability slot created successfully'
  );
  return data;
};

export const updateAvailabilitySlot = async (slotId, slotData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOT(slotId),
    slotData,
    'Availability slot updated successfully'
  );
  return data;
};

export const deleteAvailabilitySlot = async (slotId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.AVAILABILITY_SLOT(slotId),
    'Availability slot deleted successfully'
  );
  return data;
};

// Service Fees
export const getServiceFees = async (filters = {}) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.SERVICE_FEES,
    { params: filters },
    'Service fees retrieved successfully'
  );
  return data;
};

export const getMyFees = async () => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.MY_FEES,
    {},
    'My fees retrieved successfully'
  );
  return data;
};

export const getServiceFee = async (feeId) => {
  const data = await apiGet(
    API_ENDPOINTS.BASE.SERVICE_FEE(feeId),
    {},
    'Service fee retrieved successfully'
  );
  return data;
};

export const createServiceFee = async (feeData) => {
  const data = await apiPost(
    API_ENDPOINTS.BASE.SERVICE_FEES,
    feeData,
    'Service fee created successfully'
  );
  return data;
};

export const updateServiceFee = async (feeId, feeData) => {
  const data = await apiPut(
    API_ENDPOINTS.BASE.SERVICE_FEE(feeId),
    feeData,
    'Service fee updated successfully'
  );
  return data;
};

export const deleteServiceFee = async (feeId) => {
  const data = await apiDelete(
    API_ENDPOINTS.BASE.SERVICE_FEE(feeId),
    'Service fee deleted successfully'
  );
  return data;
};



export const baseService = {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getEducation,
  getEducationRecord,
  createEducation,
  updateEducation,
  deleteEducation,
  getExperience,
  getExperienceRecord,
  createExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  getAvailabilitySlots,
  getMyAvailability,
  getAvailabilitySlot,
  createAvailabilitySlot,
  updateAvailabilitySlot,
  deleteAvailabilitySlot,
  getServiceFees,
  getMyFees,
  getServiceFee,
  createServiceFee,
  updateServiceFee,
  deleteServiceFee,
};

export default baseService;