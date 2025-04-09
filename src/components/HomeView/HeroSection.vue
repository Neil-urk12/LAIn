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
          <span><Users :size="16" /> 2 Students</span>
          <span><BookOpen :size="16" /> 50+ Courses</span>
          <span><Globe :size="16" /> Global Community (Hopefully)</span>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/AI-Engineering-2048x1154-1.jpg" alt="AI Engineering" class="hero-img" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Users, BookOpen, Globe } from 'lucide-vue-next';
</script>

<style scoped>
.hero-section {
  background: linear-gradient(to bottom, var(--hero-gradient-start), var(--hero-gradient-end));
  padding-top: calc(var(--spacing-unit) * 28);
  padding-bottom: calc(var(--spacing-unit) * 28);
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing-unit) * 10);
  align-items: center;
}

.hero-content h1 {
  font-size: 4rem; /* ~64px */
  margin-bottom: calc(var(--spacing-unit) * 5);
  font-weight: 700;
}

.hero-content h1 .highlight {
    color: var(--primary-color);
}

.hero-content p {
  font-size: 1.375rem; /* 22px */
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 4); /* less space before buttons */
  max-width: 650px;
}

.hero-actions {
  display: flex;
  gap: calc(var(--spacing-unit) * 2);
  margin-bottom: calc(var(--spacing-unit) * 3); /* less space before stats */
}

.hero-stats {
  display: flex;
  gap: calc(var(--spacing-unit) * 4);
  color: var(--primary-color); /* green text */
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
  max-width: 100%;
}

.hero-img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  object-fit: cover;
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

@media (max-width: 768px) {
  .hero-section {
    padding-top: calc(var(--spacing-unit) * 4);
    padding-bottom: calc(var(--spacing-unit) * 4);
  }
}
</style>
