import { defineStore } from "pinia";
import type { User } from "../models/interfaces";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },
    socialLogin(provider: string) {
      console.log(`Social login with ${provider}`);
      // Here you can add actual social login logic
    },
    setAuth(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
