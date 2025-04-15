// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createConvexVue } from "@convex-vue/core";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const convexVue = createConvexVue({
  convexUrl: import.meta.env.VITE_CONVEX_URL,
});

app.use(createPinia())
app.use(router)
app.use(convexVue)

app.mount('#app')
