<template>
  <section class="courses-section section-padding">
    <div class="container">
      <div class="section-header text-center">
        <span class="tag tag-green">Popular Courses</span>
        <h2>Start Your AI Journey Today</h2>
        <p>
          Explore our most popular courses and start building your AI
          expertise.
        </p>
      </div>
      <div class="courses-grid">
        <!-- Course Card 1 -->
        <div class="course-card">
          <div class="course-image placeholder-image">
             <ImageIcon class="placeholder-icon" :size="48" />
          </div>
          <div class="course-content">
            <div class="course-meta">
              <span class="tag tag-green">Beginner</span>
              <span class="course-price">$49.99</span>
            </div>
            <h3>Introduction to Artificial Intelligence</h3>
            <p>
              Learn the fundamentals of AI and machine learning algorithms.
            </p>
            <div class="course-footer">
              <span><BookOpen :size="16" /> 24 lessons</span>
              <a href="#" class="icon-link">
                Learn more <ArrowRight :size="16" />
              </a>
            </div>
          </div>
        </div>
        <!-- Course Card 2 -->
        <div class="course-card">
          <div class="course-image placeholder-image">
             <ImageIcon class="placeholder-icon" :size="48" />
          </div>
          <div class="course-content">
            <div class="course-meta">
              <span class="tag tag-blue">Intermediate</span>
              <span class="course-price">$79.99</span>
            </div>
            <h3>Deep Learning Specialization</h3>
            <p>
              Master neural networks and deep learning techniques.
            </p>
            <div class="course-footer">
              <span><BookOpen :size="16" /> 36 lessons</span>
              <a href="#" class="icon-link">
                Learn more <ArrowRight :size="16" />
              </a>
            </div>
          </div>
        </div>
        <!-- Course Card 3 -->
        <div class="course-card">
          <div class="course-image placeholder-image">
             <ImageIcon class="placeholder-icon" :size="48" />
          </div>
          <div class="course-content">
            <div class="course-meta">
              <span class="tag tag-purple">Advanced</span>
              <span class="course-price">$99.99</span>
            </div>
            <h3>Natural Language Processing</h3>
            <p>
              Build AI systems that understand and generate human language.
            </p>
            <div class="course-footer">
              <span><BookOpen :size="16" /> 42 lessons</span>
              <a href="#" class="icon-link">
                Learn more <ArrowRight :size="16" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="view-all-courses text-center">
        <a href="#" class="btn btn-primary">View All Courses</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpen, ArrowRight, Image as ImageIcon } from 'lucide-vue-next';
</script>

<style scoped>
.courses-section {
  background-color: var(--bg-light); /* Light background */
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

.courses-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--spacing-unit) * 4);
  margin-bottom: calc(var(--spacing-unit) * 6);
}

.course-card {
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden; /* Clip the image corners */
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.course-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-5px);
}

.course-image {
  width: 100%;
  aspect-ratio: 16 / 9; /* Common aspect ratio for course images */
  background-color: var(--border-color); /* Placeholder background */
  border-bottom: 1px solid var(--border-color);
  border-radius: 0; /* Override placeholder radius */
}

.course-content {
  padding: calc(var(--spacing-unit) * 3);
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Make content area fill space */
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing-unit) * 1.5);
}

.course-price {
  font-weight: 600;
  font-size: 1.125rem; /* 18px */
  color: var(--text-dark);
}

.course-content h3 {
  font-size: 1.25rem; /* 20px */
  margin-bottom: var(--spacing-unit);
  font-weight: 600;
  line-height: 1.4;
}

.course-content p {
  font-size: 0.9rem; /* 14px */
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 3);
  flex-grow: 1; /* Push footer down */
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem; /* ~13px */
  color: var(--text-light);
  border-top: 1px solid var(--border-color);
  padding-top: calc(var(--spacing-unit) * 2);
  margin-top: auto; /* Stick to bottom */
}

.course-footer span {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 0.5);
}

.view-all-courses {
  margin-top: calc(var(--spacing-unit) * 4);
}

/* Responsive adjustments for courses */
@media (max-width: 992px) {
  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .courses-grid {
    grid-template-columns: 1fr;
  }
   .section-header p {
    font-size: 1rem;
  }
}
</style>
