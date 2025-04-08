<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "../stores/auth";
import ThemeToggleButton from "@/components/ThemeToggleButton.vue";

const showRegister = ref(false);
const auth = useAuthStore();
import { onMounted } from "vue";

const isLoading = ref(true);
const savedTheme: Ref<string> = ref("light");

const registerFullName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const registerRepeatPassword = ref("");
const registerUsername = ref("");

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

// Email format validation with allowed domains
function validateEmail(email: string): boolean {
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
    "yopmail.com"
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
    "business.com"
  ];

  return allowedDomains.includes(domain);
}

// Password complexity validation
function validatePasswordComplexity(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function validateLoginForm(): boolean {
  let valid = true;
  loginErrors.value.email = "";
  loginErrors.value.password = "";

  if (!auth.loginForm.email) {
    loginErrors.value.email = "Email is required.";
    valid = false;
  } else if (!validateEmail(auth.loginForm.email)) {
    loginErrors.value.email = "Email must be from an allowed provider (e.g., Gmail, Outlook, Yahoo, etc.).";
    valid = false;
  }

  if (!auth.loginForm.password) {
    loginErrors.value.password = "Password is required.";
    valid = false;
  }

  return valid;
}

function validateRegisterForm(): boolean {
  let valid = true;
  registerErrors.value.fullName = "";
  registerErrors.value.username = "";
  registerErrors.value.email = "";
  registerErrors.value.password = "";
  registerErrors.value.repeatPassword = "";

  if (!registerFullName.value) {
    registerErrors.value.fullName = "Full name is required.";
    valid = false;
  }

  if (!registerUsername.value) {
    registerErrors.value.username = "Username is required.";
    valid = false;
  }

  if (!registerEmail.value) {
    registerErrors.value.email = "Email is required.";
    valid = false;
  } else if (!validateEmail(registerEmail.value)) {
    registerErrors.value.email = "Email must be from an allowed provider (e.g., Gmail, Outlook, Yahoo, etc.).";
    valid = false;
  }

  if (!registerPassword.value) {
    registerErrors.value.password = "Password is required.";
    valid = false;
  } else if (!validatePasswordComplexity(registerPassword.value)) {
    registerErrors.value.password =
      "Password must be at least 8 characters, include uppercase, number, and special character.";
    valid = false;
  }

  if (!registerRepeatPassword.value) {
    registerErrors.value.repeatPassword = "Please confirm your password.";
    valid = false;
  } else if (registerPassword.value !== registerRepeatPassword.value) {
    registerErrors.value.repeatPassword = "Passwords do not match.";
    valid = false;
  }

  return valid;
}

import { computed } from "vue";

const passwordStrength = computed(() => {
  const password = registerPassword.value;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return "Weak";
  if (score === 2) return "Moderate";
  if (score >= 3) return "Strong";
  return "";
});

function handleLogin() {
  if (validateLoginForm()) {
    auth.handleLogin();
  }
}

function handleRegister() {
  if (validateRegisterForm()) {
    auth.handleRegister();
  }
}

onMounted(() => {
  isLoading.value = false;
  savedTheme.value = localStorage.getItem("theme") || "light";
  console.log(savedTheme.value);
});
</script>

<template>
  <div v-cloak :class="{ dark: savedTheme === 'dark' }">
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
                v-model="auth.loginForm.email"
                placeholder=" "
                required
                style="color: black"
                :class="{ 'error': loginErrors.email }"
              />
              <label for="login-email">Email</label>
              <i v-if="loginErrors.email" class="fas fa-exclamation-circle error-icon" :title="loginErrors.email"></i>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="login-password"
                v-model="auth.loginForm.password"
                placeholder=" "
                required
                :class="{ 'error': loginErrors.password }"
              />
              <label for="login-password">Password</label>
              <i v-if="loginErrors.password" class="fas fa-exclamation-circle error-icon" :title="loginErrors.password"></i>
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

          <form
            class="form register-form"
            @submit.prevent="handleRegister"
          >
            <h2 class="form-title register-form-title">Create Account</h2>

            <div class="input-group">
              <input
                type="text"
                id="register-name"
                v-model="registerFullName"
                placeholder=" "
                :class="{ 'error': registerErrors.fullName }"
              />
              <label for="register-name">Full Name</label>
              <i v-if="registerErrors.fullName" class="fas fa-exclamation-circle error-icon" :title="registerErrors.fullName"></i>
            </div>

            <div class="input-group">
              <input
                type="text"
                id="register-username"
                v-model="registerUsername"
                placeholder=" "
                :class="{ 'error': registerErrors.username }"
              />
              <label for="register-username">Username</label>
              <i v-if="registerErrors.username" class="fas fa-exclamation-circle error-icon" :title="registerErrors.username"></i>
            </div>

            <div class="input-group">
              <input
                type="email"
                id="register-email"
                v-model="registerEmail"
                placeholder=" "
                :class="{ 'error': registerErrors.email }"
              />
              <label for="register-email">Email</label>
              <i v-if="registerErrors.email" class="fas fa-exclamation-circle error-icon" :title="registerErrors.email"></i>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="register-password"
                v-model="registerPassword"
                placeholder=" "
                :class="{ 'error': registerErrors.password }"
              />
              <label for="register-password">Password</label>
              <i v-if="registerErrors.password" class="fas fa-exclamation-circle error-icon" :title="registerErrors.password"></i>
              <div
                v-show="registerPassword"
                class="password-strength-meter"
              >
                <p>Password Strength: <span :style="{ background: passwordStrength === 'Weak' ? '#8b0000' : passwordStrength === 'Moderate' ? 'orange' : 'green' }">{{ passwordStrength }}</span></p>
              </div>
            </div>

            <div class="input-group">
              <input
                type="password"
                id="register-confirm"
                v-model="registerRepeatPassword"
                placeholder=" "
                :class="{ 'error': registerErrors.repeatPassword }"
              />
              <label for="register-confirm">Confirm Password</label>
              <i v-if="registerErrors.repeatPassword" class="fas fa-exclamation-circle error-icon" :title="registerErrors.repeatPassword"></i>
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
  padding-right: 40px; /* Make room for the error icon */
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
</style>
