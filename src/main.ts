// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize auth state before mounting the app
const authStore = useAuthStore(pinia)

// Initialize auth and then mount the app
authStore.initAuth().finally(() => {
    app.mount('#app')
})
