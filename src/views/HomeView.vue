<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const TheHeader = defineAsyncComponent(() => import('../components/TheHeader.vue'));
const HeroSection = defineAsyncComponent(() => import('../components/HeroSection.vue'));
const FeaturesSection = defineAsyncComponent(() => import('../components/FeatureSection.vue'));
const CoursesSection = defineAsyncComponent(() => import('../components/CoursesSection.vue'));
const TestimonialsSection = defineAsyncComponent(() => import('../components/TestimonialsSection.vue'));
const CtaSection = defineAsyncComponent(() => import('../components/CtaSection.vue'));
const TheFooter = defineAsyncComponent(() => import('../components/TheFooter.vue'));
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
@import '../assets/main.css';
</style>
