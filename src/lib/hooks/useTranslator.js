// lib/hooks/useTranslator.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
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
} from '@/lib/api/services/translator';

const STALE_TIME = 2 * 60 * 1000;
const RETRY_COUNT = 1;

// Profile Hooks
export const useTranslatorProfile = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translatorProfile'],
    queryFn: getTranslatorProfile,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { profile: data, isLoading, error, refetch };
};

export const useUpdateTranslatorProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ profileId, profileData }) => updateTranslatorProfile(profileId, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorProfile'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Appointments Hooks
export const useTranslatorAppointments = (translatorId, filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translator-appointments', translatorId, filters],
    queryFn: () => getTranslatorAppointments(translatorId, filters),
    enabled: !!translatorId,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { 
    appointments: data, 
    isLoading, 
    error, 
    refetch 
  };
};

// Languages Hooks
export const useTranslatorLanguages = (filters = {}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translatorLanguages', filters],
    queryFn: () => getTranslatorLanguages(filters),
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { languages: data, isLoading, error, refetch };
};

export const useCreateTranslatorLanguage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTranslatorLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorLanguages'] });
      queryClient.invalidateQueries({ queryKey: ['translatorProfile'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateTranslatorLanguage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ languageId, languageData }) => updateTranslatorLanguage(languageId, languageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorLanguages'] });
      queryClient.invalidateQueries({ queryKey: ['translatorProfile'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteTranslatorLanguage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTranslatorLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorLanguages'] });
      queryClient.invalidateQueries({ queryKey: ['translatorProfile'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Availability Slots Hooks
export const useTranslatorAvailability = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translatorAvailability'],
    queryFn: getTranslatorAvailability,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { availability: data, isLoading, error, refetch };
};

export const useCreateTranslatorAvailabilitySlot = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTranslatorAvailabilitySlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorAvailability'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateTranslatorAvailabilitySlot = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ slotId, slotData }) => updateTranslatorAvailabilitySlot(slotId, slotData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorAvailability'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteTranslatorAvailabilitySlot = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTranslatorAvailabilitySlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorAvailability'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

// Service Fees Hooks
export const useTranslatorFees = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['translatorFees'],
    queryFn: getTranslatorFees,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { fees: data, isLoading, error, refetch };
};

export const useCreateTranslatorServiceFee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTranslatorServiceFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorFees'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useUpdateTranslatorServiceFee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ feeId, feeData }) => updateTranslatorServiceFee(feeId, feeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorFees'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteTranslatorServiceFee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTranslatorServiceFee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['translatorFees'] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};