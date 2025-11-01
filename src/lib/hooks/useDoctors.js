import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
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
} from '@/lib/api/services/doctor';

const STALE_TIME = {
  SHORT: 1 * 60 * 1000,
  MEDIUM: 2 * 60 * 1000,
  LONG: 5 * 60 * 1000,
  EXTRA_LONG: 30 * 60 * 1000,
};

const RETRY_COUNT = 1;

export const useProfiles = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profiles', filters],
    queryFn: () => getProfiles(filters),
    staleTime: STALE_TIME.MEDIUM,
    retry: RETRY_COUNT,
  });

  return { profiles: data, isLoading, error, refetch };
};

export const useDoctorSearch = (searchParams = {}, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['doctorSearch', searchParams],
    queryFn: () => searchDoctors(searchParams),
    enabled,
    staleTime: STALE_TIME.SHORT,
    retry: RETRY_COUNT,
    placeholderData: { results: [] },
  });

  return {
    doctors: data?.results || [],
    count: data?.count || 0,
    next: data?.next || null,
    previous: data?.previous || null,
    isLoading,
    error,
    refetch,
  };
};

export const useCategories = (searchTerm = '') => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories', searchTerm],
    queryFn: () => getCategories(searchTerm),
    staleTime: STALE_TIME.EXTRA_LONG,
    retry: RETRY_COUNT,
    placeholderData: { categories: [] },
  });

  return {
    categories: data?.categories || [],
    isLoading,
    error,
    refetch,
  };
};

export const useMyProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: STALE_TIME.LONG,
    retry: RETRY_COUNT,
  });

  return { profile: data, isLoading, error, refetch };
};

export const useProfile = (profileId, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => getProfile(profileId),
    enabled: enabled && !!profileId,
    staleTime: STALE_TIME.LONG,
    retry: RETRY_COUNT,
  });

  return { profile: data, isLoading, error, refetch };
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });

  return {
    createProfile: mutation.mutate,
    createProfileAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ profileId, profileData }) => updateProfile(profileId, profileData),
    onSuccess: (data, { profileId }) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['doctorSearch'] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data, profileId) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] });
      queryClient.invalidateQueries({ queryKey: ['doctorSearch'] });
    },
  });

  return {
    deleteProfile: mutation.mutate,
    deleteProfileAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDoctorReviews = (profileId, appointmentId = null, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['doctorReviews', profileId, appointmentId],
    queryFn: () => getDoctorReviews(profileId, appointmentId),
    enabled: enabled && !!profileId,
    staleTime: STALE_TIME.MEDIUM,
    retry: RETRY_COUNT,
    placeholderData: { results: [] },
  });

  return { 
    reviews: data?.results || [], 
    isLoading, 
    error, 
    refetch 
  };
};

// NEW: Get appointment review
export const useAppointmentReview = (appointmentId, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['appointmentReview', appointmentId],
    queryFn: () => getAppointmentReview(appointmentId),
    enabled: enabled && !!appointmentId,
    staleTime: STALE_TIME.MEDIUM,
    retry: RETRY_COUNT,
  });

  return { 
    review: data?.results?.[0] || null, 
    hasReview: !!data?.results?.[0],
    isLoading, 
    error, 
    refetch 
  };
};

// Create doctor review hook
export const useCreateDoctorReview = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createDoctorReview,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['doctorReviews'] });
      queryClient.invalidateQueries({ queryKey: ['appointmentReview', variables.appointment_id] });
      queryClient.invalidateQueries({ queryKey: ['profile', variables.doctor_id] });
      queryClient.invalidateQueries({ queryKey: ['appointment', variables.appointment_id] });
    },
  });

  return {
    createReview: mutation.mutate,
    createReviewAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};