// lib/hooks/useBilling.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWalletLedger,
  getPayoutRequests,
  createPayoutRequest,
  getWalletSummary,
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
} from '@/lib/api/services/billing';

const STALE_TIME = 2 * 60 * 1000;

export const useWalletLedger = (filters = {}) => {
  return useQuery({
    queryKey: ['walletLedger', filters],
    queryFn: () => getWalletLedger(filters),
    staleTime: STALE_TIME,
  });
};

export const usePayoutRequests = (filters = {}) => {
  return useQuery({
    queryKey: ['payoutRequests', filters],
    queryFn: () => getPayoutRequests(filters),
    staleTime: STALE_TIME,
  });
};

export const useWalletSummary = () => {
  return useQuery({
    queryKey: ['walletSummary'],
    queryFn: getWalletSummary,
    staleTime: STALE_TIME,
  });
};

export const useCreatePayoutRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPayoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walletLedger'] });
      queryClient.invalidateQueries({ queryKey: ['payoutRequests'] });
      queryClient.invalidateQueries({ queryKey: ['walletSummary'] });
    },
  });
};

export const usePaymentMethods = (filters = {}) => {
  return useQuery({
    queryKey: ['paymentMethods', filters],
    queryFn: () => getPaymentMethods(filters),
    staleTime: STALE_TIME,
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paymentMethods'] });
    },
  });
};