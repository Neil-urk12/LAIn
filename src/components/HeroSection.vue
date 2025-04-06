<template>
  <section class="hero-section section-padding">
    <div class="container hero-container">
      <div class="hero-content">
        <span class="tag tag-green">The Future of AI Learning</span>
        <h1>Master AI with <span class="highlight">LAIn</span></h1>
        <p>
          Comprehensive AI courses designed for everyone from beginners to
          experts. Learn at your own pace and build the future.
        </p>
        <div class="hero-actions">
          <a href="#" class="btn btn-primary icon-link">
            Explore Courses <ArrowRight :size="18" />
          </a>
          <a href="#" class="btn btn-secondary">View Demo</a>
        </div>
        <div class="hero-stats">
          <span><Users :size="16" /> 10K+ Students</span>
          <span><BookOpen :size="16" /> 50+ Courses</span>
          <span><Globe :size="16" /> Global Community</span>
        </div>
      </div>
      <div class="hero-image">
        <div class="placeholder-image">
          <ImageIcon class="placeholder-icon" :size="64" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Users, BookOpen, Globe, Image as ImageIcon } from 'lucide-vue-next';
</script>

<style scoped>
.hero-section {
  background-color: var(--bg-light); /* Light background for hero */
  padding-top: calc(var(--spacing-unit) * 8); /* Adjust padding */
  padding-bottom: calc(var(--spacing-unit) * 8);
}

.hero-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: calc(var(--spacing-unit) * 6);
  align-items: center;
}

.hero-content h1 {
  font-size: 3rem; /* ~48px */
  margin-bottom: calc(var(--spacing-unit) * 3);
  font-weight: 700;
}

.hero-content h1 .highlight {
    color: var(--primary-color);
}

.hero-content p {
  font-size: 1.125rem; /* 18px */
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 4);
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: calc(var(--spacing-unit) * 2);
  margin-bottom: calc(var(--spacing-unit) * 5);
}

.hero-stats {
  display: flex;
  gap: calc(var(--spacing-unit) * 4);
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;
}

.hero-stats span {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive adjustments for hero */
@media (max-width: 992px) {
    .hero-content h1 {
        font-size: 2.5rem;
    }
    .hero-content p {
        font-size: 1rem;
    }
}

@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr; /* Stack columns */
    text-align: center;
  }
  .hero-content p {
    margin-left: auto;
    margin-right: auto;
  }
  .hero-actions {
    justify-content: center;
    flex-wrap: wrap; /* Allow buttons to wrap */
  }
  .hero-stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: calc(var(--spacing-unit) * 2);
  }
  .hero-image {
    grid-row: 1; /* Move image to top on mobile */
    margin-bottom: calc(var(--spacing-unit) * 4);
  }
}
</style>
