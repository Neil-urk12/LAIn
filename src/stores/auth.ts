import { defineStore } from "pinia";
import type { User, TempUser, Session } from "../models/interfaces";
import { pb } from "../pocketbase/pocketbase";
import type { OTPResponse } from "pocketbase";
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    authenticated: false,
    result: null as OTPResponse | null,
    loginOtp: null as OTPResponse | null,
    sessionId: null as string | null,
  }),
  actions: {
    encryptData(data: string): string {
      if (data === 'Unknown') return data;

      try {
        const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
        return encrypted;
      } catch (error) {
        console.error('Encryption failed:', error);
        return data;
      }
    },
    decryptData(encryptedData: string): string {
      if (encryptedData === 'Unknown') return encryptedData;

      try {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        return decrypted.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        console.error('Decryption failed:', error);
        return encryptedData;
      }
    },
    async getSessionWithDecryptedIp(sessionId: string): Promise<Session | null> {
      try {
        const record = await pb.collection('sessions').getOne(sessionId);
        if (record) {
          const session: Session = {
            id: record.id,
            userId: record.userId,
            deviceInfo: record.deviceInfo,
            ipAddress: record.ipAddress ? this.decryptData(record.ipAddress) : 'Unknown',
            lastActive: record.lastActive,
            token: record.token,
            isActive: record.isActive,
            created: record.created,
            updated: record.updated
          };
          return session;
        }
        return null;
      } catch (error) {
        console.error('Failed to get session:', error);
        return null;
      }
    },

    async initAuth(retries = 3, delay = 1000) {
      // Check if PocketBase has an active session
      if (pb.authStore.isValid) {
        try {
          const token = pb.authStore.token;

          const authData = await pb.collection('users').authRefresh({
            requestKey: null,
            timeout: 10000
          });

          if (authData && authData.record) {
            const user: User = {
              id: authData.record.id,
              email: authData.record.email,
              name: authData.record.name,
              username: authData.record.username,
              role: authData.record.role,
              emailVisibility: authData.record.emailVisibility,
              verified: authData.record.verified,
              linkedIn: authData.record.linkedIn,
              website: authData.record.website,
              company: authData.record.company,
              position: authData.record.position,
              bio: authData.record.bio,
              profilePicture: authData.record.profilePicture,
              createdAt: authData.record.created,
              updatedAt: authData.record.updated,
              token: token,
              learningStreak: authData.record.learningStreak ?? 0,
              lastLoginDate: authData.record.lastLoginDate
            };
            this.setUser(user, token);
            return true;
          }
        } catch (error) {
          console.error('Error initializing auth state:', error);
          if (retries > 0) {
            setTimeout(() => this.initAuth(retries - 1, delay * 2), delay);
          } else {
            this.logout();
          }
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
        emailVisibility: authData.record.emailVisibility,
        verified: authData.record.verified,
        createdAt: authData.record.created,
        updatedAt: authData.record.updated,
        token: authData.token,
        learningStreak: authData.record.learningStreak ?? 1,
        lastLoginDate: authData.record.lastLoginDate
      }
      this.setUser(user, authData.token);
      return true
    },
    // Function to get device information for session tracking
    getDeviceInfo() {
      if (typeof navigator === 'undefined') return 'Unknown device';

      const ua = navigator.userAgent;
      let browserName = "Unknown";
      let osName = "Unknown";

      // Detect browser
      if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
      } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browserName = "Opera";
      } else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) {
        browserName = "Edge";
      } else if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
      } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
      }

      // Detect OS
      if (ua.indexOf("Windows") > -1) {
        osName = "Windows";
      } else if (ua.indexOf("Mac") > -1) {
        osName = "MacOS";
      } else if (ua.indexOf("Linux") > -1) {
        osName = "Linux";
      } else if (ua.indexOf("Android") > -1) {
        osName = "Android";
      } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) {
        osName = "iOS";
      }

      return `${browserName} on ${osName}`;
    },

    // Function to get the client's IP address and encrypt it
    async getIpAddress() {
      try {
        // Using a public IP API service to get the client's IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;

        // Encrypt the IP address before returning it
        return this.encryptData(ipAddress);
      } catch (error) {
        console.error('Failed to retrieve IP address:', error);
        return 'Unknown';
      }
    },

    // Create a session record for the current user
    async createSessionRecord() {
      if (!this.user || !this.user.id || !this.token) return;

      try {
        const deviceInfo = this.getDeviceInfo()
        const encryptedIp = await this.getIpAddress()

        const existingSessions = await pb.collection('sessions').getList(1, 1, {
          filter: `userId = "${this.user.id}" && deviceInfo = "${deviceInfo}"`,
        });

        if (existingSessions.items.length > 0) {
          this.sessionId = existingSessions.items[0].id;
          await pb.collection('sessions').update(existingSessions.items[0].id, {
            lastActive: new Date().toISOString(),
            isActive: true
          });
          return
        }

        const record = await pb.collection('sessions').create({
          userId: this.user.id,
          deviceInfo: this.getDeviceInfo(),
          ipAddress: encryptedIp,
          lastActive: new Date().toISOString(),
          token: this.token,
          isActive: true
        });
        this.sessionId = record.id;
      } catch (error) {
        console.error('Failed to create/update session record:', error);
        // Log more detailed error information
        if (error instanceof Error)
          console.error('Error details:', error.message);
      }

    },
    async setUser(user: User, token: string) {
      user.learningStreak = user.learningStreak ?? 0;
      user.lastLoginDate = user.lastLoginDate ?? new Date().toISOString();
      this.user = user;
      this.token = token;
      this.authenticated = true;

      await this.updateLearningStreak();
      await this.createSessionRecord();
    },
    // Get all sessions for the current user with decrypted IP addresses
    async getUserSessions(): Promise<Session[]> {
      if (!this.user || !this.user.id) return [];

      try {
        const records = await pb.collection('sessions').getList(1, 100, {
          filter: `userId = "${this.user.id}"`
        });

        // Convert records to Session objects with decrypted IP addresses
        return records.items.map(record => ({
          id: record.id,
          userId: record.userId,
          deviceInfo: record.deviceInfo,
          ipAddress: record.ipAddress ? this.decryptData(record.ipAddress) : 'Unknown',
          lastActive: record.lastActive,
          token: record.token,
          isActive: record.isActive,
          created: record.created,
          updated: record.updated
        }));
      } catch (error) {
        console.error('Failed to get user sessions:', error);
        return [];
      }
    },

    async logout() {
      // Mark the current session as inactive before clearing auth
      if (this.user && this.user.id && this.token) {
        try {
          const existingSession = await pb.collection('sessions').getList(1, 1, {
            filter: `userId = "${this.user.id}" && token = "${this.token}"`
          });

          if (existingSession.items.length > 0) {
            await pb.collection('sessions').update(existingSession.items[0].id, {
              isActive: false  // Using boolean value
            });
          }
        } catch (error) {
          console.error('Failed to update session on logout:', error);
        }
      }

      // Clear auth state
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
          role: record?.role || "",
          learningStreak: record?.learningStreak ?? 1
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
          emailVisibility: authData.record.emailVisibility,
          verified: authData.record.verified,
          createdAt: authData.record.created,
          updatedAt: authData.record.updated,
          token: authData.token,
          learningStreak: authData.record.learningStreak ?? 1,
          lastLoginDate: authData.record.lastLoginDate
        };

        // Set the user in the store (this will also create a session record)
        await this.setUser(user, authData.token);
        return user;
      } catch (error) {
          console.error(error)
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
        const now = new Date().toISOString();
        const data = {
          password,
          passwordConfirm,
          name,
          username,
          email,
          emailVisibility: true,
          verified: false,
          role,
          learningStreak: 0,
          lastLoginDate: now
        };

        await pb.collection('users').create(data);

      } catch (error: unknown) {
        throw error;
      }
    },
    async updateLearningStreak() {
      if (!this.user) return;
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = this.user.lastLoginDate?.split('T')[0];
      let newStreak: number;
      // First login ever
      if (this.user.learningStreak === 0) {
        newStreak = 1;
      } else if (lastLogin === today) {
        return;
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        newStreak = lastLogin === yesterday ? this.user.learningStreak + 1 : 1;
      }
      try {
        const updated = await pb.collection('users').update(this.user.id, {
          learningStreak: newStreak,
          lastLoginDate: new Date().toISOString()
        });
        this.user.learningStreak = updated.learningStreak;
        this.user.lastLoginDate = updated.lastLoginDate;
      } catch (e) {
        console.error('Failed to update learning streak:', e);
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
