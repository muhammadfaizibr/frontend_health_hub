// lib/api/services/billing.js
import { apiGet, apiPost, apiDelete } from '@/lib/api/utils/api-wrapper';

export const getWalletLedger = async (filters = {}) => {
  return await apiGet(
    'payments/wallet-ledger/',
    { params: filters },
    'Ledger retrieved successfully'
  );
};

export const getPayoutRequests = async (filters = {}) => {
  return await apiGet(
    'payments/payout-requests/',
    { params: filters },
    'Payout requests retrieved successfully'
  );
};

export const createPayoutRequest = async (data) => {
  return await apiPost(
    'payments/payout-requests/',
    data,
    'Payout request created successfully'
  );
};

export const getWalletSummary = async () => {
  return await apiGet(
    'payments/wallet-ledger/summary/',
    {},
    'Wallet summary retrieved successfully'
  );
};

export const getPaymentMethods = async (filters = {}) => {
  return await apiGet(
    'payments/payment-methods/',
    { params: filters },
    'Payment methods retrieved successfully'
  );
};

export const createPaymentMethod = async (data) => {
  return await apiPost(
    'payments/payment-methods/',
    data,
    'Payment method added successfully'
  );
};

export const deletePaymentMethod = async (methodId) => {
  return await apiDelete(
    `payments/payment-methods/${methodId}/`,
    'Payment method deleted successfully'
  );
};