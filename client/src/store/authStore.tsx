import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProfile, loginUser, registerUser } from "../api/authApi";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      initAuth: async () => {
        const token = get().token;
        if (!token) return;

        set({ isLoading: true });
        try {
          const profile = await getProfile();
          set({ user: profile, isAuthenticated: true, isLoading: false });
        } catch (error) {
          get().logout();
          set({ isLoading: false });
        }
      },
      login: async (email, password) => {
        set({loading: true})
        try {
          const token  = await loginUser({ email, password });
          set({ token, isAuthenticated: true });

          const profile = await getProfile();
          set({ user: profile, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      register: async (data) => {
        set({loading: true})
        try {
          const token = await registerUser(data);
          set({ token, isAuthenticated: true });
          const profile = await getProfile();
          set({ user: profile, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    },
  ),
);
