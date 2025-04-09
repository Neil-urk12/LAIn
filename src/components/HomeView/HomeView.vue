<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const TheHeader = defineAsyncComponent(() => import('./TheHeader.vue'));
const HeroSection = defineAsyncComponent(() => import('./HeroSection.vue'));
const FeaturesSection = defineAsyncComponent(() => import('./FeatureSection.vue'));
const CoursesSection = defineAsyncComponent(() => import('./CoursesSection.vue'));
const TestimonialsSection = defineAsyncComponent(() => import('./TestimonialsSection.vue'));
const CtaSection = defineAsyncComponent(() => import('./CtaSection.vue'));
const TheFooter = defineAsyncComponent(() => import('./TheFooter.vue'));
</script>

<template>
  <TheHeader />
  <main>
    <HeroSection />
    <FeaturesSection class="section" />
    <CoursesSection class="section" />
    <TestimonialsSection class="section" />
    <CtaSection class="section" />
  </main>
  <TheFooter />
</template>

<style>
@import '../../assets/main.css';
</style>

<style>
.section {
  background-color: var(--section-background);
}
</style>
