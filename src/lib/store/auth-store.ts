import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: async (credentials) => {
        try {
          // TODO: API 호출 로직으로 대체
          const mockUser = {
            id: "1",
            name: "Test User",
            email: credentials.username,
          };
          const mockToken = "mock-jwt-token";

          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
          });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
