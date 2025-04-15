import { defineStore } from "pinia";
import type { User } from "../models/interfaces";
import { pb } from "../pocketbase/pocketbase";
import type { OTPResponse } from "pocketbase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    authenticated: false,
    result: null as OTPResponse | null,
    loginOtp: null as OTPResponse | null,
  }),
  actions: {
    async requestEmailOTP(email : string, type: string) {
      if (type === "register")
        this.result = await pb.collection('users').requestOTP(email);
      else if (type === "login")
        this.loginOtp = await pb.collection('users').requestOTP(email);
      return true
    },
    async verifyEmailOTP(otp: string, type: string) {
      if (type === "register") {
        if (!this.result || !this.result.otpId) {
          throw new Error("OTP ID is missing. Please request an OTP first.");
        }
        const authData = await pb.collection('users').authWithOTP(this.result.otpId, otp);

        const user: User = {
          id: authData.record.id,
          email: authData.record.email,
          name: authData.record.name,
          username: authData.record.username,
          role: authData.record.role,
          createdAt: authData.record.created,
          updatedAt: authData.record.updated,
          token: authData.token,
        }
        this.setUser(user, authData.token);
        return true
      } else if (type === "login") {
        if (!this.loginOtp || !this.loginOtp.otpId) {
          throw new Error("OTP ID is missing. Please request an OTP first.");
        }
        const authData = await pb.collection('users').authWithOTP(this.loginOtp.otpId, otp);

        const user: User = {
          id: authData.record.id,
          email: authData.record.email,
          name: authData.record.name,
          username: authData.record.username,
          role: authData.record.role,
          createdAt: authData.record.created,
          updatedAt: authData.record.updated,
          token: authData.token,
        }
        this.setUser(user, authData.token);
        return true
      }
      return false
    },
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
    // MFA/OTP login flow
    async loginWithMFA(email: string, password: string) {
      try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        const user: User = {
          id: authData.record.id,
          email: authData.record.email,
          name: authData.record.name,
          username: authData.record.username,
          role: authData.record.role,
          createdAt: authData.record.created,
          updatedAt: authData.record.updated,
          token: authData.token,
        };


        // this.setUser(user, authData.token);
        return { mfaRequired: false, user };
      } catch (error: any) {
        const mfaId = error?.response?.mfaId;
        if (mfaId) {
          // Request OTP if MFA required
          const result = await pb.collection('users').requestOTP(email);
          return { mfaRequired: true, mfaId, otpId: result.otpId };
        }
        throw error;
      }
    },

    async requestOTP(email: string) {
      return await pb.collection('users').requestOTP(email);
    },

    async verifyOTP(otpId: string, code: string, mfaId: string) {
      const authData = await pb.collection('users').authWithOTP(otpId, code, { mfaId });
      const user: User = {
        id: authData.record.id,
        email: authData.record.email,
        name: authData.record.name,
        username: authData.record.username,
        role: authData.record.role,
        createdAt: authData.record.created,
        updatedAt: authData.record.updated,
        token: authData.token,
      };
      this.setUser(user, authData.token);
      return user;
    },

    getDefaultLoginErrors() {
      return { email: "", password: "" };
    },
    getDefaultRegisterErrors() {
      return {
        fullName: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
      };
    },

    validateRegisterForm({ fullName, username, email, password, repeatPassword }: { fullName: string; username: string; email: string; password: string; repeatPassword: string }) {
      let valid = true;
      const errors = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
      };

      if (!fullName) {
        errors.fullName = "Full name is required.";
        valid = false;
      }
      if (!username) {
        errors.username = "Username is required.";
        valid = false;
      }
      if (!email) {
        errors.email = "Email is required.";
        valid = false;
      } else if (!this.validateEmail(email)) {
        errors.email = "Email must be from an allowed provider (e.g., Gmail, Outlook, Yahoo, etc.).";
        valid = false;
      }
      if (!password) {
        errors.password = "Password is required.";
        valid = false;
      } else if (!this.validatePasswordComplexity(password)) {
        errors.password = "Password must be at least 8 characters, include uppercase, number, and special character.";
        valid = false;
      }
      if (!repeatPassword) {
        errors.repeatPassword = "Please confirm your password.";
        valid = false;
      } else if (password !== repeatPassword) {
        errors.repeatPassword = "Passwords do not match.";
        valid = false;
      }
      return { valid, errors };
    },

    validateEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
        return false;
      }
      const domain = email.split("@")[1].toLowerCase();
      const disposableDomains = [
        "mailinator.com",
        "tempmail.com",
        "10minutemail.com",
        "guerrillamail.com",
        "yopmail.com",
      ];
      if (disposableDomains.includes(domain)) {
        return false;
      }
      const allowedDomains = [
        "gmail.com",
        "googlemail.com",
        "outlook.com",
        "hotmail.com",
        "msn.com",
        "yahoo.com",
        "yahoo.co.uk",
        "yahoo.fr",
        "protonmail.com",
        "icloud.com",
        "mac.com",
        "company.com",
        "business.com",
      ];
      return allowedDomains.includes(domain);
    },

    validatePasswordComplexity(password: string): boolean {
      return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      );
    },

    passwordStrength(password: string): string {
      let score = 0;
      if (password.length >= 8) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
      if (score <= 1) return "Weak";
      if (score === 2) return "Moderate";
      if (score >= 3) return "Strong";
      return "";
    },

    validateLoginForm({ email, password }: { email: string; password: string }) {
      let valid = true;
      const errors = this.getDefaultLoginErrors();
      if (!email) {
        errors.email = "Email is required.";
        valid = false;
      } else if (!this.validateEmail(email)) {
        errors.email = "Email must be from an allowed provider (e.g., Gmail, Outlook, Yahoo, etc.).";
        valid = false;
      }
      if (!password) {
        errors.password = "Password is required.";
        valid = false;
      }
      return { valid, errors };
    },

    async register({ email, password, name, username, role = 'student' }: { email: string; password: string; name: string; username: string; role?: string }) {
      try {
        await pb.collection('users').create({
          email,
          password,
          passwordConfirm: password,
          name,
          username,
          role,
        });
        // return data;
      } catch (error: any) {
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getName: (state) => state.user?.name,
    getUser: (state) => state.user,
    getEmail: (state) => state.user?.email,
  },
});
