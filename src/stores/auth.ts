import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
}

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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loginForm: {
      email: '',
      password: ''
    } as LoginForm,
    registerForm: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    } as RegisterForm,
  }),
  actions: {
    login(user: User, token: string) {
      this.user = user
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
    },
    handleLogin() {
      console.log('Login submitted:', this.loginForm)
      // Here you can add actual login API call logic
    },
    handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      console.log('Register submitted:', this.registerForm)
      // Here you can add actual registration API call logic
    },
    socialLogin(provider: string) {
      console.log(`Social login with ${provider}`)
      // Here you can add actual social login logic
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  }
})
