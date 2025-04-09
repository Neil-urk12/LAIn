<template>
  <section class="cta-section">
    <div class="container text-center">
      <h2>Ready to Start Your AI Journey?</h2>
      <p>
        Join thousands of students already learning AI with LAIn. Get started
        today with a free trial.
      </p>
      <a href="#" class="btn btn-primary btn-lg">Start Free Trial <ArrowRight :size="20" /></a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
</script>

<style scoped>
.cta-section {
  background-color: var(--primary-color);
  color: var(--bg-white);
  padding: calc(var(--spacing-unit) * 8) 0;
}

.cta-section h2 {
  color: var(--bg-white);
  font-size: 2.25rem; /* ~36px */
  margin-bottom: var(--spacing-unit);
}

.cta-section p {
  color: rgba(255, 255, 255, 0.9); /* Slightly transparent white */
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: calc(var(--spacing-unit) * 4);
  font-size: 1.1rem;
}

.cta-section .btn-primary {
    background-color: var(--bg-white);
    color: var(--primary-color);
    border-color: var(--bg-white);
    display: inline-flex; /* Align icon */
    align-items: center;
    gap: var(--spacing-unit);
}

.cta-section .btn-primary:hover {
    background-color: #f3f4f6; /* Slightly off-white hover */
    border-color: #f3f4f6;
    color: var(--primary-color-dark);
}

/* Responsive adjustments for CTA */
 @media (max-width: 768px) {
    .cta-section h2 {
        font-size: 1.75rem;
    }
    .cta-section p {
        font-size: 1rem;
    }
 }
</style>
