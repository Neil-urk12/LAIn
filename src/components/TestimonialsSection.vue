<template>
  <section class="testimonials-section section-padding">
    <div class="container">
      <div class="section-header text-center">
        <span class="tag tag-green">Student Success Stories</span>
        <h2>What Our Students Say</h2>
        <p>
          Hear from our community of learners who have transformed their
          careers with LAIn.
        </p>
      </div>
      <div class="testimonials-grid">
        <!-- Testimonial Card 1 -->
        <div class="testimonial-card">
          <div class="testimonial-header">
            <div class="avatar placeholder-image">
                <User :size="24" />
            </div>
            <div class="author-info">
              <span class="author-name">Sarah Johnson</span>
              <span class="author-title">Data Scientist at TechCorp</span>
            </div>
          </div>
          <p class="quote">
            "LAIn's courses helped me transition from a data analyst to a data
            scientist role. The practical projects were invaluable for
            building my portfolio."
          </p>
          <div class="rating">
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
          </div>
        </div>
        <!-- Testimonial Card 2 -->
        <div class="testimonial-card">
          <div class="testimonial-header">
             <div class="avatar placeholder-image">
                <User :size="24" />
            </div>
            <div class="author-info">
              <span class="author-name">Michael Chen</span>
              <span class="author-title">AI Engineer</span>
            </div>
          </div>
          <p class="quote">
            "The deep learning specialization was exactly what I needed to
            level up my skills. The instructors explain complex concepts in an
            accessible way."
          </p>
          <div class="rating">
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
          </div>
        </div>
        <!-- Testimonial Card 3 -->
        <div class="testimonial-card">
          <div class="testimonial-header">
             <div class="avatar placeholder-image">
                <User :size="24" />
            </div>
            <div class="author-info">
              <span class="author-name">Jessica Patel</span>
              <span class="author-title">Student</span>
            </div>
          </div>
          <p class="quote">
            "As a computer science student, LAIn has been the perfect
            supplement to my university education. I'm now confident in my AI
            skills."
          </p>
          <div class="rating">
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
            <Star :size="16" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star, User } from 'lucide-vue-next';
</script>

<style scoped>
.testimonials-section {
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc(var(--spacing-unit) * 4);
}

.testimonial-card {
  background-color: var(--bg-light); /* Slightly different background */
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 4);
  display: flex;
  flex-direction: column;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2);
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--border-color); /* Placeholder */
  flex-shrink: 0; /* Prevent shrinking */
  aspect-ratio: 1 / 1;
  border: none; /* Override placeholder */
}

.avatar .placeholder-icon {
    width: 24px;
    height: 24px;
}

.author-info {
  line-height: 1.4;
}

.author-name {
  display: block;
  font-weight: 600;
  color: var(--text-dark);
}

.author-title {
  display: block;
  font-size: 0.85rem;
  color: var(--text-light);
}

.quote {
  font-style: normal; /* Assuming quote marks are part of text */
  color: var(--text-dark);
  margin-bottom: calc(var(--spacing-unit) * 3);
  flex-grow: 1; /* Push rating down */
  font-size: 0.95rem;
  line-height: 1.6;
}

.rating {
  color: #f59e0b; /* Amber/Yellow for stars */
  margin-top: auto; /* Stick to bottom */
}

.rating svg {
  display: inline-block; /* Align stars horizontally */
  margin-right: calc(var(--spacing-unit) * 0.25);
}

/* Responsive adjustments for testimonials */
@media (max-width: 992px) {
  .testimonials-grid {
    grid-template-columns: 1fr; /* Stack on tablets and mobile */
  }
}
 @media (max-width: 768px) {
   .section-header p {
    font-size: 1rem;
  }
}
</style>
