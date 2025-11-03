// lib/hooks/useBase.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAvailabilitySlots,
  getMyAvailability,
  createAvailabilitySlot,
  updateAvailabilitySlot,
  deleteAvailabilitySlot,
  getServiceFees,
  getMyFees,
  createServiceFee,
  updateServiceFee,
  deleteServiceFee,
} from '@/lib/api/services/base';

const STALE_TIME = 5 * 60 * 1000;
const RETRY_COUNT = 1;

// Helper function to create query hooks
const createQueryHook = (queryKey, queryFn) => (filters = {}, enabled = true) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => queryFn(filters),
    enabled,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { [queryKey]: data, isLoading, error, refetch };
};

// Helper function to create mutation hooks
const createMutationHook = (mutationFn, invalidateKeys) => () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      invalidateKeys.forEach(key => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
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

// Query Hooks
export const useLanguages = createQueryHook('languages', getLanguages);
export const useEducation = createQueryHook('education', getEducation);
export const useExperience = createQueryHook('experience', getExperience);
export const useCertifications = createQueryHook('certifications', getCertifications);
export const useAvailabilitySlots = createQueryHook('availabilitySlots', getAvailabilitySlots);
export const useServiceFees = createQueryHook('serviceFees', getServiceFees);

// Custom Query Hooks
export const useMyAvailability = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myAvailability'],
    queryFn: getMyAvailability,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { availability: data, isLoading, error, refetch };
};

export const useMyFees = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myFees'],
    queryFn: getMyFees,
    staleTime: STALE_TIME,
    retry: RETRY_COUNT,
  });

  return { fees: data, isLoading, error, refetch };
};

// Create Mutation Hooks
export const useCreateLanguage = createMutationHook(createLanguage, ['languages']);
export const useCreateEducation = createMutationHook(createEducation, ['education']);
export const useCreateExperience = createMutationHook(createExperience, ['experience']);
export const useCreateCertification = createMutationHook(createCertification, ['certifications']);
export const useCreateAvailabilitySlot = createMutationHook(createAvailabilitySlot, ['availabilitySlots', 'myAvailability']);
export const useCreateServiceFee = createMutationHook(createServiceFee, ['serviceFees', 'myFees']);

// Update Language Hook
export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ languageId, languageData }) => updateLanguage(languageId, languageData),
    onSuccess: (data, { languageId }) => {
      queryClient.invalidateQueries({ queryKey: ['languages'] });
      queryClient.invalidateQueries({ queryKey: ['language', languageId] });
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

// Update Education Hook
export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ educationId, educationData }) => updateEducation(educationId, educationData),
    onSuccess: (data, { educationId }) => {
      queryClient.invalidateQueries({ queryKey: ['education'] });
      queryClient.invalidateQueries({ queryKey: ['education', educationId] });
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

// Update Experience Hook
export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ experienceId, experienceData }) => updateExperience(experienceId, experienceData),
    onSuccess: (data, { experienceId }) => {
      queryClient.invalidateQueries({ queryKey: ['experience'] });
      queryClient.invalidateQueries({ queryKey: ['experience', experienceId] });
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

// Update Certification Hook
export const useUpdateCertification = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ certificationId, certificationData }) => 
      updateCertification(certificationId, certificationData),
    onSuccess: (data, { certificationId }) => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      queryClient.invalidateQueries({ queryKey: ['certification', certificationId] });
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

// Update Availability Slot Hook
export const useUpdateAvailabilitySlot = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ slotId, slotData }) => updateAvailabilitySlot(slotId, slotData),
    onSuccess: (data, { slotId }) => {
      queryClient.invalidateQueries({ queryKey: ['availabilitySlots'] });
      queryClient.invalidateQueries({ queryKey: ['myAvailability'] });
      queryClient.invalidateQueries({ queryKey: ['availabilitySlot', slotId] });
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

// Update Service Fee Hook
export const useUpdateServiceFee = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ feeId, feeData }) => updateServiceFee(feeId, feeData),
    onSuccess: (data, { feeId }) => {
      queryClient.invalidateQueries({ queryKey: ['serviceFees'] });
      queryClient.invalidateQueries({ queryKey: ['myFees'] });
      queryClient.invalidateQueries({ queryKey: ['serviceFee', feeId] });
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

// Delete Mutation Hooks
export const useDeleteLanguage = createMutationHook(deleteLanguage, ['languages']);
export const useDeleteEducation = createMutationHook(deleteEducation, ['education']);
export const useDeleteExperience = createMutationHook(deleteExperience, ['experience']);
export const useDeleteCertification = createMutationHook(deleteCertification, ['certifications']);
export const useDeleteAvailabilitySlot = createMutationHook(deleteAvailabilitySlot, ['availabilitySlots', 'myAvailability']);
export const useDeleteServiceFee = createMutationHook(deleteServiceFee, ['serviceFees', 'myFees']);