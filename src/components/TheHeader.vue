<script setup lang="ts">
import { ref } from 'vue';
import ThemeToggleButton from './ThemeToggleButton.vue';
import { RouterLink } from 'vue-router';
import { Menu, BookOpen } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const isMobileMenuOpen = ref(false);

const router = useRouter();
const auth = useAuthStore();

const handleGetStarted = () => {
 if (auth.isAuthenticated) {
   router.push('/dashboard');
 } else {
   router.push('/login');
 }
}
const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value;
</script>

<template>
  <header class="app-header">
    <div class="container header-container">
      <RouterLink to="/" class="logo">
        <BookOpen :size="26" color="var(--primary-color)" style="margin-right: 6px; vertical-align: middle;" />
        LAIn
      </RouterLink>
      <nav class="main-nav">
        <ul>
          <li><RouterLink to="/courses">Courses</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/pricing">Pricing</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
        </ul>
      </nav>
      <div class="header-actions">
        <ThemeToggleButton />
        <a href="#" class="btn btn-secondary btn-signin">Sign In</a>
        <a href="#" class="btn btn-primary" @click.prevent="handleGetStarted">Get Started</a>
      </div>
      <button class="mobile-nav-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
         <Menu :size="24" />
      </button>
    </div>
     <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }">
        <ul>
          <li><RouterLink to="/courses">Courses</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
          <li><RouterLink to="/pricing">Pricing</RouterLink></li>
          <li><RouterLink to="/blog">Blog</RouterLink></li>
          <li><RouterLink to="/signin" class="btn btn-secondary">Sign In</RouterLink></li>
          <li><RouterLink to="/get-started" class="btn btn-primary">Get Started</RouterLink></li>
        </ul>
      </nav>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--bg-white);
  border-bottom: 1px solid var(--border-color);
  padding: calc(var(--spacing-unit) * 2) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: var(--text-dark);
  text-decoration: none;
}

.main-nav ul {
  list-style: none;
  display: flex;
  gap: calc(var(--spacing-unit) * 4);
}

.main-nav a {
  color: #000000; /* black text */
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem; /* ~14px */
}

.main-nav a:hover {
  color: var(--text-dark);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2);
}

.btn-signin {
    padding: calc(var(--spacing-unit) * 1.25) calc(var(--spacing-unit) * 2.5); /* Slightly smaller */
}

.mobile-nav-toggle {
    display: none; /* Hidden by default */
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-unit);
    color: var(--text-dark);
}

.mobile-nav {
    display: none; /* Hidden by default */
    background-color: var(--bg-white);
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.mobile-nav.is-open {
    display: block;
}

.mobile-nav ul {
    list-style: none;
    padding: var(--spacing-unit) 0;
}

 .mobile-nav li {
    text-align: center;
 }

.mobile-nav a {
    display: block;
    padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
    color: #000000; /* black text */
    font-weight: 500;
    text-decoration: none;
}
 .mobile-nav a.btn {
    margin: var(--spacing-unit) auto;
    max-width: 200px;
 }

/* Responsive adjustments for header */
@media (max-width: 768px) {
  .main-nav,
  .header-actions .btn-signin,
  .header-actions .btn-primary {
    display: none; /* Hide desktop nav and buttons */
  }
  .mobile-nav-toggle {
    display: block; /* Show hamburger */
  }
}
.theme-toggle-btn {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.theme-toggle-btn:hover {
  background: #f3f4f6;
  border-color: #999;
}
</style>
