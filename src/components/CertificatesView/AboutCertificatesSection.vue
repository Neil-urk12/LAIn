<template>
  <div class="about-lain-certificates">
    <div class="about-content">
      <h3>What are LAIn Certificates?</h3>
      <p>
        LAIn certificates are digital credentials that verify your completion of courses
        and mastery of specific skills. Each certificate includes details about the course
        content, skills acquired, and your achievement.
      </p>
      <p>
        Our certificates are recognized by leading technology companies and can be
        shared on your resume, LinkedIn profile, or professional portfolio to showcase
        your expertise in AI and related fields.
      </p>
    </div>
    <div class="how-to-earn">
      <h3>How to Earn Certificates</h3>
      <ol class="steps-list">
        <li>
          <strong>Enroll in a course</strong>
          <p>Browse our catalog and enroll in a course</p>
        </li>
        <li>
          <strong>Complete all course requirements</strong>
          <p>Watch all lessons, complete quizzes, and submit required projects</p>
        </li>
        <li>
          <strong>Receive your certificate</strong>
          <p>Once you've completed all requirements, your certificate will be issued automatically</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about-lain-certificates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive columns */
  gap: calc(var(--spacing-unit) * 6);
  align-items: start; /* Align items to the top */
}

.about-content h3,
.how-to-earn h3 {
  font-size: 1.25rem; /* ~20px */
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.about-content p,
.steps-list p {
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 2);
  line-height: 1.6;
}

.about-content p:last-child {
  margin-bottom: 0;
}

.steps-list {
  list-style: none;
  padding-left: 0;
  counter-reset: step-counter;
}

.steps-list li {
  position: relative;
  padding-left: calc(var(--spacing-unit) * 5); /* Space for the number */
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.steps-list li::before {
  counter-increment: step-counter;
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: calc(var(--spacing-unit) * 3);
  height: calc(var(--spacing-unit) * 3);
  background-color: var(--primary-color);
  color: var(--bg-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1; /* Ensure number is centered vertically */
}

.steps-list strong {
  display: block;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.steps-list p {
  margin-bottom: 0; /* Remove default bottom margin for p inside li */
  font-size: 0.9rem;
}

/* Dark Mode Adjustments */
html.dark .about-content h3,
html.dark .how-to-earn h3,
html.dark .steps-list strong {
  color: var(--text-dark);
}

html.dark .about-content p,
html.dark .steps-list p {
  color: var(--text-light);
}

html.dark .steps-list li::before {
  background-color: var(--primary-color-dark); /* Slightly darker primary for contrast */
  color: var(--text-dark); /* Ensure text is readable */
}

</style>
