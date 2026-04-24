import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://taski-backend-swyf.onrender.com/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ error: data.message, isLoading: false });
            return false;
          }
          set({ user: data.data, token: data.data.token, isLoading: false });
          return true;
        } catch {
          set({ error: "Network error. Check your connection.", isLoading: false });
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            set({ error: data.message, isLoading: false });
            return false;
          }
          set({ user: data.data, token: data.data.token, isLoading: false });
          return true;
        } catch {
          set({ error: "Network error. Check your connection.", isLoading: false });
          return false;
        }
      },

      logout: () => set({ user: null, token: null, error: null }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, token: state.token }), // only persist user + token, not loading/error states
    }
  )
);