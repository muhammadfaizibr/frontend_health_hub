import { apiGet, apiPost, apiPatch } from '@/lib/api/utils/api-wrapper';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const getOrganizationProfile = async () => {
  return await apiGet(
    API_ENDPOINTS.ORGANIZATION.PROFILE,
    {},
    'Profile retrieved successfully'
  );
};

// lib/api/services/organization.js - Add this function
export const updateOrganizationProfile = async (profileData) => {
  const data = await apiPut(
    API_ENDPOINTS.ORGANIZATION.PROFILE,
    profileData,
    'Profile updated successfully'
  );
  return data;
};

export const getCreditPackages = async () => {
  return await apiGet(
    'organizations/credit-packages/',
    {},
    'Packages retrieved successfully'
  );
};

export const purchasePackage = async (packageId, paymentMethodId) => {
  return await apiPost(
    'payments/purchase-package/',
    { package_id: packageId, payment_method_id: paymentMethodId },
    'Purchase initiated'
  );
};

export const confirmPurchase = async (purchaseId) => {
  return await apiPatch(
    `payments/purchase-package/${purchaseId}/confirm/`,
    {},
    'Purchase confirmed'
  );
};

export const getCreditsLedger = async (filters = {}) => {
  return await apiGet(
    'organizations/credits-ledger/',
    { params: filters },
    'Ledger retrieved successfully'
  );
};

export const getOrganizationAppointments = async (filters = {}) => {
  return await apiGet(
    'payments/billings/organization_appointments/',
    { params: filters },
    'Appointments retrieved successfully'
  );
};