import { defineStore } from "pinia";
import type { User, TempUser } from "../models/interfaces";
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
    async initAuth() {
      // Check if PocketBase has an active session
      if (pb.authStore.isValid) {
        try {
          const token = pb.authStore.token;

          // Get the current user data by refreshing the auth
          const authData = await pb.collection('users').authRefresh();

          if (authData && authData.record) {
            const user: User = {
              id: authData.record.id,
              email: authData.record.email,
              name: authData.record.name,
              username: authData.record.username,
              role: authData.record.role,
              createdAt: authData.record.created,
              updatedAt: authData.record.updated,
              token: token,
            };
            this.setUser(user, token);
            return true;
          }
        } catch (error) {
          console.error('Error initializing auth state:', error);
          // Clear invalid auth state
          pb.authStore.clear();
        }
      }
      return false;
    },
    async requestEmailOTP(email: string, type: string) {
      if (type === "register")
        this.result = await pb.collection('users').requestOTP(email);
      else if (type === "login")
        this.loginOtp = await pb.collection('users').requestOTP(email);
      return true
    },
    async verifyEmailOTP(otp: string, type: string) {
      if (type !== "login") return false

      if (!this.loginOtp || !this.loginOtp.otpId) {
        throw new Error("OTP ID is missing. Please request an OTP first.");
      }

      const authData = await pb.collection('users').authWithOTP(this.loginOtp.otpId, otp);

      // Update verified status
      await pb.collection('users').update(authData.record.id, {
        verified: true
      });

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
    },
    setUser(user: User, token: string) {
      this.user = user;
      this.token = token;
      this.authenticated = true;
    },
    logout() {
      pb.authStore.clear();
      this.user = null;
      this.token = null;
      this.authenticated = false;
    },
    socialLogin(provider: string) {
      console.log(provider);
      // Social login functionality will be implemented later
    },
    setAuth(isAuthenticated: boolean) {
      this.authenticated = isAuthenticated;
    },
    async loginWithMFA(email: string, password: string) {
      try {
        pb.authStore.clear();
        // Try to authenticate with email and password
        await pb.collection('users').authWithPassword(email.trim(), password.trim());

        const record = pb.authStore.record;
        const userData = {
          id: record?.id || "",
          email: record?.email || "",
          name: record?.name || "",
          username: record?.username || "",
          role: record?.role || ""
        };
        pb.authStore.clear();

        // Request OTP for the second factor
        const result = await pb.collection('users').requestOTP(email);

        // Return that MFA is required with the OTP ID
        return {
          mfaRequired: true,
          otpId: result.otpId,
          email: email,
          mfaId: null, // No mfaId in this case since we're forcing MFA
          // Store user info for later use after OTP verification
          tempUser: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            username: userData.username,
            role: userData.role,
          }
        };
      } catch (error: unknown) {
        const err = error as { response?: { mfaId?: string } };
        const mfaId = err.response?.mfaId;
        if (mfaId) {
          // Request OTP for the second factor
          const result = await pb.collection('users').requestOTP(email);

          return {
            mfaRequired: true,
            otpId: result.otpId,
            email: email,
            mfaId: mfaId,
            tempUser: {
              id: "", // Will be filled after OTP verification
              email: email,
              name: "",
              username: "",
              role: "",
            }
          };
        }

        // If it's not an MFA error, rethrow
        throw error;
      }
    },
    async requestOTP(email: string) {
      return await pb.collection('users').requestOTP(email);
    },
    async verifyOTP(otpId: string, code: string, _tempUser: TempUser, mfaId: string | null = null) {
      try {
        // Verify the OTP with or without mfaId
        let authData;

        try {
          if (mfaId) {
            // If we have an mfaId, use it in the auth call
            authData = await pb.collection('users').authWithOTP(otpId, code, { mfaId });
          } else {
            // Otherwise just use the OTP
            authData = await pb.collection('users').authWithOTP(otpId, code);
          }
        } catch (authError) {
          // Try a direct login as a fallback
          try {
            // Get the email from tempUser
            const email = _tempUser.email;
            // Try to authenticate with the OTP as password
            authData = await pb.collection('users').authWithPassword(email, code);

          } catch (_directAuthError) {
            console.error("Direct login failed:", _directAuthError);
            throw authError
          }
        }

        // Create the user object with the data from the authentication
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

        // Set the user in the store
        this.setUser(user, authData.token);
        return user;
      } catch (error) {

        throw error;
      }
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
    async register({ email, password, passwordConfirm, name, username, role = 'student' }: { email: string; password: string; passwordConfirm: string; name: string; username: string; role?: string }) {
      try {
        pb.authStore.clear();
        const data = {
          "password": password,
          "passwordConfirm": passwordConfirm,
          "name": name,
          "username": username,
          "email": email,
          "emailVisibility": true,
          "verified": false,
          "role": role
        };

        await pb.collection('users').create(data);

      } catch (error: unknown) {
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
