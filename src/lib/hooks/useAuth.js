// lib/hooks/useAuth.js

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/api/services/auth';
import { useAuthStore } from '@/lib/store/auth-store';
import { useRouter } from 'next/navigation';

/**
 * Custom hook for authentication operations
 * Provides login, logout, register functions with loading states
 */
export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, logout: storeLogout } = useAuthStore();

  /**
   * Login mutation
   */
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      // Redirect to role-based dashboard
      const role = data.user.role?.toLowerCase();
      const dashboardMap = {
        'doctor': '/doctor',
        'patient': '/patient',
        'translator': '/translator',
        'organization': '/organization',
      };
      router.push(dashboardMap[role] || '/');
    },
    onError: (error) => {
      console.error('Login error:', error.message);
    },
  });

  /**
   * Register mutation
   */
  const registerMutation = useMutation({
    mutationFn: (userData) => authService.register(userData),
    onSuccess: (data) => {
      // Redirect to role-based dashboard
      const role = data.user.role?.toLowerCase();
      const dashboardMap = {
        'doctor': '/doctor',
        'patient': '/patient',
        'translator': '/translator',
        'organization': '/organization',
      };
      router.push(dashboardMap[role] || '/');
    },
  });

  /**
   * Logout mutation
   */
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all cached queries
      queryClient.clear();
      
      // Clear store
      storeLogout();
      
      // Redirect to login
      router.push('/login');
    },
  });

  /**
   * Get current user query
   */
  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated && authService.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    // User data
    user: currentUser || user,
    isAuthenticated,
    isLoading: userLoading || loginMutation.isPending || registerMutation.isPending,
    
    // Actions
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    
    // Errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    
    // Status
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
  };
};  