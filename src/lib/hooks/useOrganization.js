import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getOrganizationProfile,
  getCreditPackages,
  purchasePackage,
  confirmPurchase,
  getCreditsLedger,
  getOrganizationAppointments,
  updateOrganizationProfile
} from '@/lib/api/services/organization';

const STALE_TIME = 2 * 60 * 1000;

export const useOrganizationProfile = () => {
  return useQuery({
    queryKey: ['organizationProfile'],
    queryFn: getOrganizationProfile,
    staleTime: STALE_TIME,
  });
};



export const useUpdateOrganizationProfile = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateOrganizationProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizationProfile'] });
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

export const useCreditPackages = () => {
  return useQuery({
    queryKey: ['creditPackages'],
    queryFn: getCreditPackages,
    staleTime: 30 * 60 * 1000,
  });
};

export const usePurchasePackage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ packageId, paymentMethodId }) => purchasePackage(packageId, paymentMethodId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizationProfile'] });
    },
  });
};

export const useConfirmPurchase = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: confirmPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizationProfile'] });
      queryClient.invalidateQueries({ queryKey: ['creditsLedger'] });
    },
  });
};

export const useCreditsLedger = (filters = {}) => {
  return useQuery({
    queryKey: ['creditsLedger', filters],
    queryFn: () => getCreditsLedger(filters),
    staleTime: STALE_TIME,
  });
};

export const useOrganizationAppointments = (filters = {}) => {
  return useQuery({
    queryKey: ['organizationAppointments', filters],
    queryFn: () => getOrganizationAppointments(filters),
    staleTime: STALE_TIME,
  });
};