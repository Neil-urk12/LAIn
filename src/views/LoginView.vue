<script setup lang="ts">
import { ref } from 'vue'

interface LoginForm {
  email: string
  password: string
}

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const showRegister = ref(false)
const loginForm = ref<LoginForm>({
  email: '',
  password: ''
})

const registerForm = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = () => {
  console.log('Login submitted:', loginForm.value)
  // Add your login logic here
}

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  console.log('Register submitted:', registerForm.value)
  // Add your registration logic here
}

const socialLogin = (provider: string) => {
  console.log(`Social login with ${provider}`)
  // Add social login logic here
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container" :class="{ active: showRegister }">
      <div class="form-container">
        <form class="form login-form" @submit.prevent="handleLogin">
          <h2 class="form-title">Welcome Back</h2>

          <div class="input-group">
            <input
              type="email"
              id="login-email"
              v-model="loginForm.email"
              placeholder=" "
              required
            >
            <label for="login-email">Email</label>
          </div>

          <div class="input-group">
            <input
              type="password"
              id="login-password"
              v-model="loginForm.password"
              placeholder=" "
              required
            >
            <label for="login-password">Password</label>
          </div>

          <button type="submit" class="btn">Sign In</button>

          <div class="toggle-form">
            Don't have an account?
            <button type="button" class="toggle-btn" @click="showRegister = true">
              Sign Up
            </button>
          </div>

          <div class="divider">
            <span>OR</span>
          </div>

          <div class="social-login">
            <div class="social-icon" @click="socialLogin('google')">
              <i class="fab fa-google"></i>
            </div>
            <div class="social-icon" @click="socialLogin('facebook')">
              <i class="fab fa-facebook-f"></i>
            </div>
            <div class="social-icon" @click="socialLogin('twitter')">
              <i class="fab fa-twitter"></i>
            </div>
          </div>
        </form>

        <form class="form register-form" @submit.prevent="handleRegister">
          <h2 class="form-title">Create Account</h2>

          <div class="input-group">
            <input
              type="text"
              id="register-name"
              v-model="registerForm.name"
              placeholder=" "
              required
            >
            <label for="register-name">Full Name</label>
          </div>

          <div class="input-group">
            <input
              type="email"
              id="register-email"
              v-model="registerForm.email"
              placeholder=" "
              required
            >
            <label for="register-email">Email</label>
          </div>

          <div class="input-group">
            <input
              type="password"
              id="register-password"
              v-model="registerForm.password"
              placeholder=" "
              required
            >
            <label for="register-password">Password</label>
          </div>

          <div class="input-group">
            <input
              type="password"
              id="register-confirm"
              v-model="registerForm.confirmPassword"
              placeholder=" "
              required
            >
            <label for="register-confirm">Confirm Password</label>
          </div>

          <button type="submit" class="btn">Sign Up</button>

          <div class="toggle-form">
            Already have an account?
            <button type="button" class="toggle-btn" @click="showRegister = false">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.auth-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.auth-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  width: 400px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
}

.auth-container::before {
  content: '';
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
  margin-bottom: 30px;
  text-align: center;
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.input-group input {
  width: 100%;
  padding: 15px 1px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input:focus {
  background: rgba(255, 255, 255, 0.3);
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input-group label {
  position: absolute;
  top: 15px;
  left: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: -20px;
  left: 12px;
  font-size: 15px;

  color: black;
  padding: 0 5px;
  border-radius: 10px;
}

.btn {
  background: #fff;
  color: #667eea;
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
  color: #fff;
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
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.divider span {
  padding: 0 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
