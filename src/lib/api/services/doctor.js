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

export const getDoctorReviews = async (profileId) => {
  const data = await apiGet(
    API_ENDPOINTS.DOCTOR.REVIEWS(profileId),
    {},
    'Reviews retrieved successfully'
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
};

export default doctorService;