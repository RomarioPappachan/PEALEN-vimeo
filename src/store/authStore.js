import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  login: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  checkAuth: () => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        set({ user: JSON.parse(user), token });
      } else {
        set({ user: null, token: null });
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      set({ user: null, token: null });
    }
  },
}));
