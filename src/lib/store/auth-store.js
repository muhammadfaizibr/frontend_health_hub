// lib/store/auth-store.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setAuthenticated: (status) => {
        set({ isAuthenticated: status });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      getUser: () => get().user,
    }),
    {
      name: 'auth-storage',
    }
  )
);