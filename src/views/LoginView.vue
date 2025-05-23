<script setup lang="ts">
// Vue imports
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";

// External imports
import { pb } from "../pocketbase/pocketbase"

// Local imports
import { useAuthStore } from "../stores/auth";
import ThemeToggleButton from "@/components/Global/ThemeToggleButton.vue";
import type { TempUser } from "@/models/interfaces";

// Component state
const showRegister = ref(false);
const auth = useAuthStore();
const router = useRouter()

const isLoading = ref(true);
const savedTheme: Ref<string> = ref("light");

const registerFullName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const registerRepeatPassword = ref("");
const registerUsername = ref("");

const loginEmail = ref("");
const loginPassword = ref("");

// Validation error states
const loginErrors = ref<{ email: string; password: string }>({
  email: "",
  password: "",
});

const registerErrors = ref<{
  fullName: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}>({
  fullName: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const passwordStrength = computed(() => auth.passwordStrength(registerPassword.value));

// MFA/OTP state for login
const otpId = ref("");
const mfaId = ref<string | null>(null);
const tempUser = ref<TempUser | null>(null);

async function handleLogin() {
  const { valid, errors } = auth.validateLoginForm({
    email: loginEmail.value,
    password: loginPassword.value
  });
  loginErrors.value = errors;

  if (valid) {
    try {
      // First step of MFA: email/password authentication
      const result = await auth.loginWithMFA(loginEmail.value, loginPassword.value);

      if (result.mfaRequired) {
        // Store data for OTP verification
        otpId.value = result.otpId;
        otpEmail.value = result.email;
        mfaId.value = result.mfaId;
        tempUser.value = result.tempUser as TempUser;

        // Show OTP modal for second factor
        otpValue.value = "";
        otpError.value = "";
        otpLoading.value = false;
        showOtpModal.value = true;
        return;
      }

      // This should not happen with our current implementation
      // but keeping it as a fallback
      loginEmail.value = '';
      loginPassword.value = '';
      loginErrors.value = { email: '', password: '' };
      router.push('/dashboard');
    } catch (error: unknown) {
      let errorMessage = 'Login failed. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('Invalid email or password')) {
          errorMessage = 'Invalid email or password.';
        }
      }
      loginErrors.value = {
        email: errorMessage,
        password: errorMessage
      };
    }
  }
}

async function handleRegister() {
  try {
    const { valid, errors } = auth.validateRegisterForm({
      fullName: registerFullName.value,
      username: registerUsername.value,
      email: registerEmail.value,
      password: registerPassword.value,
      repeatPassword: registerRepeatPassword.value
    });
    registerErrors.value = errors;
    if (!valid) return;
    await auth.register({
      email: registerEmail.value,
      password: registerPassword.value,
      passwordConfirm: registerRepeatPassword.value,
      name: registerFullName.value,
      username: registerUsername.value,
      role: 'student',
    });

    // Request email verification
    await pb.collection("users").requestVerification(registerEmail.value);

    // Store email for display in success message
    otpEmail.value = registerEmail.value;

    // Show success modal instead of OTP modal
    showSuccessModal.value = true;

    // Reset form fields
    registerFullName.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    registerRepeatPassword.value = "";
    registerUsername.value = "";
    registerErrors.value = auth.getDefaultRegisterErrors();

  } catch (error: unknown) {

    alert(error instanceof Error ? error.message : 'Registration failed');
  }
}

const showSuccessModal = ref(false);

// OTP modal state and logic for login
const showOtpModal = ref(false);
const otpValue = ref("");
const otpError = ref("");
const otpLoading = ref(false);
const otpEmail = ref(""); // Used for both login OTP and registration success
// For tracking OTP resend timeout
const otpResendTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const canResendOtp = ref(true);

async function verifyOtp() {
  otpLoading.value = true;
  otpError.value = "";
  try {
    // Verify OTP for login
    if (!tempUser.value) {
      throw new Error("User data is missing. Please try logging in again.");
    }

    await auth.verifyOTP(otpId.value, otpValue.value, tempUser.value, mfaId.value);

    showOtpModal.value = false;
    // Clear OTP/MFA state
    otpId.value = "";
    otpValue.value = "";
    otpError.value = "";
    mfaId.value = null;
    tempUser.value = null;

    // Clear login form
    loginEmail.value = '';
    loginPassword.value = '';
    loginErrors.value = { email: '', password: '' };

    router.push('/dashboard');
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message.includes('Invalid token')) {
        otpError.value = "Invalid OTP code. Please check and try again.";
      } else if (err.message.includes('Missing required')) {
        otpError.value = "Missing required information. Please try logging in again.";
      } else {
        otpError.value = err.message;
      }
    } else {
      otpError.value = "Invalid OTP. Please try again.";
    }
  } finally {
    otpLoading.value = false;
  }
}

async function resendOtp() {
  canResendOtp.value = false;
  otpError.value = "";
  try {
    // Request a new OTP
    await pb.collection('users').requestOTP(otpEmail.value);
  } catch (err: unknown) {
    otpError.value = err instanceof Error ? err.message : "Failed to resend OTP.";
  }

  otpResendTimeout.value = setTimeout(() => {
    canResendOtp.value = true;
  }, 30000);
}

onMounted(() => {
  isLoading.value = false;
  savedTheme.value = localStorage.getItem("theme") || "light";
});
</script>

<template>
  <div v-cloak :class="{ dark: savedTheme === 'dark' }">
    <!-- OTP Verification Modal (for login only) -->
    <div v-if="showOtpModal" class="otp-modal-overlay">
      <div class="otp-modal">
        <h3>Two-Factor Authentication</h3>
        <p>We sent a one-time password (OTP) to <b>{{ otpEmail }}</b>. Please enter it below to complete login.</p>
        <input v-model="otpValue" maxlength="9" placeholder="Enter OTP" class="otp-input" :disabled="otpLoading" />
        <button @click="verifyOtp" :disabled="otpLoading || otpValue.length < 4" class="btn btn-primary">Verify</button>
        <div v-if="otpError" class="otp-error">{{ otpError }}</div>
        <button @click="resendOtp" :disabled="!canResendOtp || otpLoading" class="btn btn-secondary resend-btn">
          Resend OTP
        </button>
        <div v-if="!canResendOtp" class="otp-info">You can resend OTP in a few seconds...</div>
      </div>
    </div>

    <!-- Registration Success Modal -->
    <div v-if="showSuccessModal" class="otp-modal-overlay">
      <div class="otp-modal success-modal">
        <h3>Registration Successful!</h3>
        <p>Email verification has been sent to <b>{{ otpEmail }}</b>. Please check your inbox and verify your email to complete the registration process.</p>
        <button @click="showSuccessModal = false; showRegister = false;" class="btn btn-primary">OK</button>
      </div>
    </div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="loader"></div>
    </div>
    <div v-else class="auth-page">
      <div class="auth-container" :class="{ active: showRegister }">
        <div class="form-container">
          <form class="form login-form" @submit.prevent="handleLogin">
            <div
              class="theme-toggle-container"
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <h2 class="form-title">Welcome Back</h2>
              <ThemeToggleButton />
            </div>

            <div class="input-group">
              <input
                type="email"
                id="login-email"
                v-model="loginEmail"
                placeholder=" "
                required
                style="color: black"
                :class="{ error: loginErrors.email }"
              />
              <label for="login-email">Email</label>
              <i
                v-if="loginErrors.email"
                class="fas fa-exclamation-circle error-icon"
                :title="loginErrors.email"
              ></i>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="login-password"
                v-model="loginPassword"
                placeholder=" "
                required
                :class="{ error: loginErrors.password }"
              />
              <label for="login-password">Password</label>
              <i
                v-if="loginErrors.password"
                class="fas fa-exclamation-circle error-icon"
                :title="loginErrors.password"
              ></i>
            </div>

            <button type="submit" class="btn">Sign In</button>

            <div class="toggle-form">
              Don't have an account?
              <button
                type="button"
                class="toggle-btn"
                @click="showRegister = true"
              >
                Sign Up
              </button>
            </div>

            <div class="divider">
              <span>OR</span>
            </div>

            <div class="social-login">
              <div class="social-icon" @click="auth.socialLogin('google')">
                <i class="fab fa-google"></i>
              </div>
              <div class="social-icon" @click="auth.socialLogin('facebook')">
                <i class="fab fa-facebook-f"></i>
              </div>
              <div class="social-icon" @click="auth.socialLogin('twitter')">
                <i class="fab fa-twitter"></i>
              </div>
            </div>
          </form>

          <form class="form register-form" @submit.prevent="handleRegister">
            <h2 class="form-title register-form-title">Create Account</h2>

            <div class="input-group">
              <input
                type="text"
                id="register-name"
                v-model="registerFullName"
                placeholder=" "
                :class="{ error: registerErrors.fullName }"
              />
              <label for="register-name">Full Name</label>
              <i
                v-if="registerErrors.fullName"
                class="fas fa-exclamation-circle error-icon"
                :title="registerErrors.fullName"
              ></i>
            </div>

            <div class="input-group">
              <input
                type="text"
                id="register-username"
                v-model="registerUsername"
                placeholder=" "
                :class="{ error: registerErrors.username }"
              />
              <label for="register-username">Username</label>
              <i
                v-if="registerErrors.username"
                class="fas fa-exclamation-circle error-icon"
                :title="registerErrors.username"
              ></i>
            </div>

            <div class="input-group">
              <input
                type="email"
                id="register-email"
                v-model="registerEmail"
                placeholder=" "
                :class="{ error: registerErrors.email }"
              />
              <label for="register-email">Email</label>
              <i
                v-if="registerErrors.email"
                class="fas fa-exclamation-circle error-icon"
                :title="registerErrors.email"
              ></i>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="register-password"
                v-model="registerPassword"
                placeholder=" "
                :class="{ error: registerErrors.password }"
              />
              <label for="register-password">Password</label>
              <i
                v-if="registerErrors.password"
                class="fas fa-exclamation-circle error-icon"
                :title="registerErrors.password"
              ></i>
              <div v-show="registerPassword" class="password-strength-meter">
                <p>
                  Password Strength:
                  <span
                    :style="{
                      background:
                        passwordStrength === 'Weak'
                          ? '#8b0000'
                          : passwordStrength === 'Moderate'
                            ? 'orange'
                            : 'green',
                    }"
                    >{{ passwordStrength }}</span
                  >
                </p>
              </div>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="register-confirm"
                v-model="registerRepeatPassword"
                placeholder=" "
                :class="{ error: registerErrors.repeatPassword }"
              />
              <label for="register-confirm">Confirm Password</label>
              <i
                v-if="registerErrors.repeatPassword"
                class="fas fa-exclamation-circle error-icon"
                :title="registerErrors.repeatPassword"
              ></i>
            </div>

            <button type="submit" class="btn">Sign Up</button>

            <div class="toggle-form">
              Already have an account?
              <button
                type="button"
                class="toggle-btn"
                @click="showRegister = false"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.otp-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}
.otp-modal {
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.otp-modal h3 {
  margin-bottom: 0.5rem;
}
.otp-modal p {
  margin-bottom: 1.5rem;
}
.otp-input {
  font-size: 1.5rem;
  letter-spacing: 0.3rem;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 240px;
  text-align: center;
}
.otp-error {
  color: #d32f2f;
  margin-bottom: 1rem;
}
.otp-info {
  color: #888;
  margin-top: 0.5rem;
  font-size: 0.95em;
}
.resend-btn {
  margin-top: 0.5rem;
}

.success-modal {
  text-align: center;
}

.success-modal h3 {
  color: #059669;
  margin-bottom: 1rem;
}

.success-modal p {
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.auth-page {
  background-color: var(--bg-white);
  background-image: url("data:image/svg+xml;utf8,<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g fill='none' stroke='%23e5e7eb' stroke-width='1'><path d='M0 0 L100 0 L100 100 L0 100 Z'/><path d='M0 0 L100 100'/><path d='M100 0 L0 100'/></g></svg>");
  background-repeat: repeat;
  background-size: 150px 150px;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-dark);
}

.auth-container {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-color-dark) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 515px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.auth-container.active {
  height: 670px;
}

.auth-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  transform: rotate(30deg);
  pointer-events: none;
}

.form-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0px;
  text-align: center;
}

.register-form-title {
  margin-bottom: 20px;
}

/* Login form input styles */
.login-form .input-group {
  position: relative;
  margin-bottom: 25px;
}

.login-form .input-group input.error {
  border: 2px solid #ff4d4f;
  padding-right: 40px;
}

.login-form .input-group input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 50px;
  color: var(--text-dark);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.login-form .input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
}

.login-form .input-group input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.login-form .input-group label {
  position: absolute;
  top: 14px;
  left: 20px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.login-form .input-group input:focus + label,
.login-form .input-group input:not(:placeholder-shown) + label {
  top: -24px;
  left: 5px;
  font-size: 15px;
  color: black;
  padding: 0 5px;
  border-radius: 10px;
}

/* Register form input styles */
.register-form .input-group {
  position: relative;
  margin-bottom: 25px;
}

.input-group input.error {
  border: 2px solid #ff4d4f;
  padding-right: 40px;
}

.error-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff4d4f;
  font-size: 18px;
  cursor: help;
}

.register-form .input-group input {
  width: 100%;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 15px 20px;
  background: var(--bg-white);
  border: none;
  border-radius: 50px;
  color: var(--text-dark);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.register-form .input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
}

.register-form .input-group input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.register-form .input-group label {
  position: absolute;
  top: 14px;
  left: 20px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.register-form .input-group input:focus + label,
.register-form .input-group input:not(:placeholder-shown) + label {
  top: -24px;
  left: 5px;
  font-size: 15px;
  color: black;
  padding: 0 5px;
  border-radius: 10px;
}

.btn {
  background: var(--bg-white);
  color: var(--primary-color);
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
}

.toggle-form {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--bg-white);
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

.register-form {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  opacity: 0;
  pointer-events: none;
  transform: translateX(50px);
}

.login-form {
  opacity: 1;
  pointer-events: all;
  transform: translateX(0);
}

.auth-container.active .login-form {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50px);
}

.error-message {
  color: red;
  font-size: 0.85em;
  margin-top: 5px;
}

.auth-container.active .register-form {
  opacity: 1;
  pointer-events: all;
  transform: translateX(0);
}

.social-login {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

.social-icon i {
  font-size: 18px;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.divider span {
  padding: 0 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
[v-cloak] {
  display: none;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Dark mode overrides for login form inputs */
.dark .login-form .input-group input {
  color: black;
}

/* Register form input overrides */
.register-form .input-group input {
  background: white;
  color: black;
}
.password-strength-meter {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
}

.password-strength-meter p {
  margin: 0 0 0 1rem;
  font-weight: 800;
  color: rgb(0, 0, 0);
}

.password-strength-meter span {
  padding: 2px 10px;
  border-radius: 5px;
  color: white;
}

@media (max-width: 600px) {
  .auth-page {
    padding: 20px;
  }

  .auth-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    height: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .auth-container.active {
    height: 520px;
  }

  .form-title {
    font-size: 24px;
  }

  .login-form .input-group input,
  .register-form .input-group input {
    padding: 12px 18px;
    font-size: 15px;
  }

  .login-form .input-group label,
  .register-form .input-group label {
    top: 12px;
    font-size: 15px;
  }

  .login-form .input-group input:focus + label,
  .login-form .input-group input:not(:placeholder-shown) + label,
  .register-form .input-group input:focus + label,
  .register-form .input-group input:not(:placeholder-shown) + label {
    top: -20px;
    font-size: 13px;
  }

  .btn {
    padding: 12px;
    font-size: 15px;
  }

  .social-login {
    margin-top: 20px;
  }

  .social-icon {
    width: 35px;
    height: 35px;
    margin: 0 8px;
  }

  .social-icon i {
    font-size: 16px;
  }

  .divider {
    margin: 15px 0;
  }

  .toggle-form {
    font-size: 13px;
    margin-top: 15px;
  }

  .theme-toggle-container {
    margin-bottom: 15px !important;
  }

  .password-strength-meter p {
    margin: 0 0 0 0.5rem;
    font-size: 13px;
  }

  .password-strength-meter span {
    padding: 1px 8px;
  }

  .error-icon {
    right: 12px;
    font-size: 16px;
  }
  /* Reduce margins for register form on mobile */
  .register-form .input-group {
    margin-bottom: 18px;
  }

  .register-form .btn {
    margin-top: 5px;
  }

  .register-form-title {
    margin-bottom: 15px;
  }

  .input-group input.error {
    padding-right: 35px;
  }
}

@media screen and (max-width: 480px) {
  .otp-modal {
    padding: 1.5rem;
  }
  .otp-input {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
  }
  .otp-modal .btn {
    width: 100%;
    padding: 0.8rem;
    font-size: 1rem;
  }
  .otp-modal .resend-btn {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
