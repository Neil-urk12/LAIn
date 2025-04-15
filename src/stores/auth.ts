import { defineStore } from "pinia";
import type { User } from "../models/interfaces";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    authenticated: false,
  }),
  actions: {
    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
      this.authenticated = true;
    },
    logout() {
      this.user = null;
      this.token = null;
      this.authenticated = false;
    },
    socialLogin(provider: string) {
      console.log(`Social login with ${provider}`);
    },
    setAuth(isAuthenticated: boolean) {
      this.authenticated = isAuthenticated;
    },
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
  },
});
