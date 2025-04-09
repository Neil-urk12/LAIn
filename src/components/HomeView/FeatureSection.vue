<template>
  <section class="features-section section-padding">
    <div class="container">
      <div class="section-header text-center">
         <span class="tag tag-green">Why Choose LAIn</span>
        <h2>Learn AI the Right Way</h2>
        <p>
          Our platform combines theory with practical applications to ensure
          you gain real-world AI skills.
        </p>
      </div>
      <div class="features-grid">
        <!-- Feature Card 1 -->
        <div class="feature-card">
          <div class="feature-icon icon-book">
            <BookOpen :size="24" />
          </div>
          <h3>Comprehensive Curriculum</h3>
          <p>
            From AI fundamentals to advanced deep learning, our courses cover
            the entire spectrum of AI knowledge.
          </p>
        </div>
        <!-- Feature Card 2 -->
        <div class="feature-card">
          <div class="feature-icon icon-code">
            <Code :size="24" />
          </div>
          <h3>Hands-on Projects</h3>
          <p>
            Build real-world AI applications with guided projects that
            reinforce your learning.
          </p>
        </div>
        <!-- Feature Card 3 -->
        <div class="feature-card">
          <div class="feature-icon icon-users">
            <Users :size="24" />
          </div>
          <h3>Expert Instructors</h3>
          <p>
            Learn from industry professionals and academics with years of
            experience in AI.
          </p>
        </div>
        <!-- Feature Card 4 -->
        <div class="feature-card">
          <div class="feature-icon icon-community">
            <MessageSquare :size="24" />
          </div>
          <h3>Community Support</h3>
          <p>
            Join a global community of AI enthusiasts and get help whenever
            you need it.
          </p>
        </div>
        <!-- Feature Card 5 -->
        <div class="feature-card">
          <div class="feature-icon icon-globe">
            <Globe :size="24" />
          </div>
          <h3>Flexible Learning</h3>
          <p>
            Study at your own pace with on-demand video lectures and
            interactive exercises.
          </p>
        </div>
        <!-- Feature Card 6 -->
        <div class="feature-card">
          <div class="feature-icon icon-trend">
            <TrendingUp :size="24" />
          </div>
          <h3>Career Advancement</h3>
          <p>
            Earn certificates recognized by top employers and advance your
            career in AI.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpen, Code, Users, MessageSquare, Globe, TrendingUp } from 'lucide-vue-next';
</script>

<style scoped>
.features-section {
  background-color: var(--bg-white);
}

.section-header {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: calc(var(--spacing-unit) * 6);
}

.section-header h2 {
    margin-top: var(--spacing-unit);
    margin-bottom: var(--spacing-unit);
}

.section-header p {
    font-size: 1.1rem;
    color: var(--text-light);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--spacing-unit) * 4);
}

.feature-card {
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 4);
  text-align: left;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.feature-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
}

.feature-icon {
  display: inline-flex;
  padding: var(--spacing-unit);
  border-radius: 6px;
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: var(--primary-color);
  background-color: #d1fae5; /* Light green background for icon */
}

/* Optional: Different colors per icon if needed */
/* .icon-code { background-color: #dbeafe; color: #1e40af; } */
/* ... add more specific icon styles if desired */

.feature-card h3 {
  font-size: 1.125rem; /* 18px */
  margin-bottom: var(--spacing-unit);
  font-weight: 600;
}

.feature-card p {
  font-size: 0.9rem; /* 14px */
  color: var(--text-light);
  line-height: 1.5;
  margin-bottom: 0;
}

/* Responsive adjustments for features */
@media (max-width: 992px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on tablets */
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }
   .section-header p {
    font-size: 1rem;
  }
}
</style>
