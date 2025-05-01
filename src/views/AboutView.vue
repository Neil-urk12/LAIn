<script setup lang="ts">
import TheHeader from '../components/HomeView/TheHeader.vue';
import TheFooter from '../components/HomeView/TheFooter.vue';
import { Twitter, Linkedin, Mail, Github, BookOpen, Code2, Globe } from 'lucide-vue-next';
</script>

<template>
  <div class="about-page">
    <TheHeader />
    <main>
      <!-- 1. Hero Section -->
    <section class="hero-section section-padding text-center">
      <div class="container">
        <h1>About LAIn</h1>
        <p class="subtitle">
          Empowering the next generation of AI innovators through accessible,
          high-quality education
        </p>
      </div>
    </section>

    <!-- 2. Our Mission Section -->
    <section class="mission-section section-padding">
      <div class="container mission-content-wrapper">
        <div class="mission-text">
          <h2>Our Mission</h2>
          <p>
            At LAIn, we believe that artificial intelligence education should be
            accessible to everyone. Our mission is to democratize AI learning by
            providing high-quality, comprehensive courses that cater to learners
            at all levels—from beginners to experts.
          </p>
          <p>
            We're committed to breaking down the barriers to AI education,
            making complex concepts understandable, and empowering individuals
            to harness the power of AI in their careers and projects.
          </p>
        </div>
        <div class="mission-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
               alt="Team collaboration"
               loading="lazy" />
        </div>
      </div>
    </section>

    <!-- 3. What We Offer Section -->
    <section class="offer-section section-padding bg-light text-center">
      <div class="container">
        <h2>What We Offer</h2>
        <p class="subtitle">
          A comprehensive learning platform designed to take you from AI novice
          to expert
        </p>
        <div class="offer-cards-container">
          <div class="offer-card">
            <div class="offer-icon"><BookOpen :size="24" /></div>
            <h3>Structured Curriculum</h3>
            <p>
              Carefully designed learning paths that guide you through AI
              concepts in a logical, progressive manner.
            </p>
          </div>
          <div class="offer-card">
            <div class="offer-icon"><Code2 :size="24" /></div>
            <h3>Hands-on Projects</h3>
            <p>
              Apply your knowledge with practical projects that reinforce
              learning and build your portfolio.
            </p>
          </div>
          <div class="offer-card">
            <div class="offer-icon"><Globe :size="24" /></div>
            <h3>Global Community</h3>
            <p>
              Connect with fellow learners and AI enthusiasts from around the
              world to share ideas and collaborate.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Meet Our Team Section -->
    <section class="team-section section-padding text-center">
      <div class="container">
        <h2>Meet Our Team</h2>
        <p class="subtitle">
          The passionate educators and technologists behind LAIn
        </p>
        <div class="team-cards-container">
          <!-- Team Member 1 -->
          <div class="team-member-card">
            <div class="team-avatar">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                   alt="Dr. Sarah Johnson"
                   loading="lazy" />
            </div>
            <h3>Neil Vallecer</h3>
            <p class="member-title title-green">Founder & Lead Developer</p>
            <p class="description">
              Tralalero Tralala
            </p>
            <div class="social-links">
              <a href="#" aria-label="Twitter"><Twitter :size="18" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin :size="18" /></a>
              <a href="#" aria-label="Email"><Mail :size="18" /></a>
            </div>
          </div>
          <!-- Team Member 2 -->
          <div class="team-member-card">
            <div class="team-avatar">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                   alt="Dr. Michael Chen"
                   loading="lazy" />
            </div>
            <h3>Reise</h3>
            <p class="member-title title-blue">Frontend Developer and Web Designer</p>
            <p class="description">
              Bombardino Crocodilo
            </p>
            <div class="social-links">
              <a href="#" aria-label="Twitter"><Twitter :size="18" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin :size="18" /></a>
              <a href="#" aria-label="GitHub"><Github :size="18" /></a>
            </div>
          </div>
          <!-- Team Member 3 -->
          <div class="team-member-card">
            <div class="team-avatar">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                   alt="Emily Rodriguez"
                   loading="lazy" />
            </div>
            <h3>Neik</h3>
            <p class="member-title title-purple">Tripi Tropi</p>
            <p class="description">
              u i i a a
            </p>
            <div class="social-links">
              <a href="#" aria-label="Twitter"><Twitter :size="18" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin :size="18" /></a>
              <a href="#" aria-label="Email"><Mail :size="18" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Our Technology Stack Section -->
    <section class="tech-stack-section section-padding bg-light">
      <div class="container">
        <h2 class="text-center">Our Technology Stack</h2>
        <p class="subtitle text-center">
          Built with modern technologies to provide a seamless learning
          experience
        </p>
        <div class="tech-stack-content-wrapper">
          <div>
            <h3>Frontend Technologies</h3>
            <div class="tech-tags">
              <span class="tag">Vue</span>
              <span class="tag">Pinia</span>
              <span class="tag">TypeScript</span>
              <span class="tag">Lucide Icons</span>
              <span class="tag">Bun</span>
            </div>
            <p>
              Our frontend uses Vue 3 with Composition API for reactive components,
              Pinia for state management, and TypeScript for type safety. We use
              Lucide for icons and Bun for fast JavaScript runtime performance.
            </p>
          </div>
          <div>
            <h3>Backend & Infrastructure</h3>
            <div class="tech-tags">
              <span class="tag">Go</span>
              <span class="tag">Convex</span>
              <span class="tag">Rust</span>
              <span class="tag">TypeScript</span>
              <span class="tag">Vercel</span>
              <span class="tag">PostgreSQL</span>
            </div>
            <p>
              Our backend uses Go for high-performance services, Convex for
              realtime data, and Rust for performance-critical components.
              We deploy on Vercel with PostgreSQL for data storage and use
              TypeScript for our serverless functions.
            </p>
          </div>
        </div>
        <div class="opensource-section text-center">
          <h3>Open Source Acknowledgments</h3>
          <p>
            LAIn is built on the shoulders of giants. We're grateful to the open
            source community for their incredible work that makes our platform
            possible.
          </p>
          <a href="#" class="icon-link github-link">
            <Github :size="16" /> View our GitHub repository
          </a>
        </div>
      </div>
    </section>

    <!-- 6. Our Values Section -->
    <section class="values-section section-padding">
      <div class="container values-content-wrapper">
        <div class="values-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
               alt="Team collaboration"
               loading="lazy" />
        </div>
        <div class="values-text">
          <h2>Our Values</h2>
          <ul class="values-list">
            <li>
              <h3>Accessibility</h3>
              <p>
                We believe AI education should be accessible to everyone,
                regardless of background or prior experience.
              </p>
            </li>
            <li>
              <h3>Excellence</h3>
              <p>
                We're committed to providing the highest quality educational
                content and learning experience.
              </p>
            </li>
            <li>
              <h3>Community</h3>
              <p>
                We foster a supportive, collaborative community where learners
                can grow together.
              </p>
            </li>
            <li>
              <h3>Innovation</h3>
              <p>
                We continuously evolve our platform and curriculum to reflect
                the latest advances in AI.
              </p>
            </li>
          </ul>
        </div>
       </div> <!-- This closes values-content-wrapper -->
    </section>
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
/* General Section Styling */
.section-padding {
  padding-top: calc(var(--spacing-unit) * 8);
  padding-bottom: calc(var(--spacing-unit) * 8);
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: calc(var(--spacing-unit) * 15);
    padding-bottom: calc(var(--spacing-unit) * 15);
  }
}

.bg-light {
  background-color: var(--bg-light);
}

.subtitle {
  font-size: 1.125rem; /* ~18px */
  color: var(--text-light);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: calc(var(--spacing-unit) * 1);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

h2 {
  margin-bottom: calc(var(--spacing-unit) * 3);
}

h3 {
  margin-bottom: calc(var(--spacing-unit) * 1.5);
  font-size: 1.25rem; /* ~20px */
}

p {
  margin-bottom: calc(var(--spacing-unit) * 2);
}

/* Layout Styles */
.mission-content-wrapper,
.values-content-wrapper,
.tech-stack-content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 6);
  align-items: center;
}

.offer-cards-container,
.team-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 4);
  margin-top: calc(var(--spacing-unit) * 6);
  justify-content: center; /* Center cards if they don't fill the row */
}

@media (min-width: 768px) {
  .mission-content-wrapper > *,
  .values-content-wrapper > *,
  .tech-stack-content-wrapper > * {
    flex: 1; /* Make columns equal width */
    min-width: 300px; /* Prevent columns from becoming too narrow */
  }

  /* Default order (image left, text right) is handled by flexbox */

  .offer-cards-container,
  .team-cards-container {
    gap: calc(var(--spacing-unit) * 6);
  }

  .offer-card,
  .team-member-card {
     /* Adjust width for 3 columns, considering gap */
     flex-basis: calc(33.333% - calc(var(--spacing-unit) * 4));
     max-width: calc(33.333% - calc(var(--spacing-unit) * 4));
  }
}

@media (min-width: 1024px) {
    .mission-content-wrapper,
    .values-content-wrapper,
    .tech-stack-content-wrapper {
        gap: calc(var(--spacing-unit) * 12);
    }
     .offer-card,
     .team-member-card {
        flex-basis: calc(33.333% - calc(var(--spacing-unit) * 8)); /* Adjust for larger gap */
        max-width: calc(33.333% - calc(var(--spacing-unit) * 8));
     }
}
/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--hero-gradient-start), var(--hero-gradient-end));
  color: var(--text-dark); /* Ensure text is readable on gradient */
}

html.dark .hero-section {
   color: var(--text-dark); /* Adjust if needed for dark mode gradient */
}

.hero-section h1 {
  font-size: 3rem; /* ~48px */
  margin-bottom: var(--spacing-unit);
}

@media (min-width: 768px) {
  .hero-section h1 {
    font-size: 4rem; /* ~64px */
  }
}

/* Mission & Values Section Specifics */
.mission-image,
.values-image {
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.mission-image img,
.values-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
    .mission-content-wrapper .placeholder-image,
    .values-content-wrapper .placeholder-image {
        width: auto; /* Allow flexbox to control width */
    }
}

html.dark .mission-content-wrapper .placeholder-image,
html.dark .values-content-wrapper .placeholder-image {
  background-color: var(--border-color);
}

.values-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.values-list li {
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.values-list h3 {
  color: var(--text-dark);
  font-size: 1.125rem; /* ~18px */
}

/* Offer Section */
.offer-card {
  background-color: var(--bg-white);
  padding: calc(var(--spacing-unit) * 4);
  border-radius: 12px; /* More rounded corners like mockup */
  border: 1px solid var(--border-color);
  text-align: left;
  transition: border-color 0.2s ease, box-shadow 0.2s ease; /* Added transition for border and glow */
}

.offer-card:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.4); /* Green glow effect */
}

html.dark .offer-card {
    background-color: var(--bg-light);
    border-color: #444; /* Darker border for dark mode */
}

html.dark .offer-card:hover {
    border-color: var(--primary-color); /* Keep hover border color */
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.5); /* Adjust glow alpha if needed */
}


.offer-icon {
  display: inline-flex; /* Keep inline-flex */
  padding: calc(var(--spacing-unit) * 1.5); /* Slightly more padding */
  background-color: #e6f7f1; /* Light green background */
  color: var(--primary-color); /* Icon color */
  border-radius: 8px; /* Rounded corners for icon bg */
  margin-bottom: calc(var(--spacing-unit) * 3); /* More space below icon */
  align-items: center;
  justify-content: center;
}

html.dark .offer-icon {
    background-color: rgba(16, 185, 129, 0.1); /* Darker transparent green */
    color: #34d399; /* Lighter green icon */
}

.offer-card h3 {
    font-weight: 600; /* Bolder heading */
    color: var(--text-dark);
    margin-bottom: var(--spacing-unit); /* Less space below heading */
}

.offer-card p {
    color: var(--text-light); /* Ensure paragraph text color */
    font-size: 0.9rem;
    line-height: 1.6;
}

.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto calc(var(--spacing-unit) * 2) auto;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 3px solid var(--primary-color);
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member-card h3 { /* Name */
  font-size: 1.25rem; /* ~20px - Slightly larger */
  font-weight: 600; /* Bolder */
  color: var(--text-dark);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.team-member-card .member-title { /* Title */
  font-size: 0.9rem; /* ~14.4px */
  font-weight: 500;
  margin-bottom: calc(var(--spacing-unit) * 2); /* More space before description */
}

/* Title colors based on original tags */
.title-green { color: #065f46; } /* Dark green from tag-green */
.title-blue { color: #1e40af; } /* Dark blue from tag-blue */
.title-purple { color: #5b21b6; } /* Dark purple from tag-purple */

html.dark .title-green { color: #34d399; } /* Lighter green for dark mode */
html.dark .title-blue { color: #60a5fa; } /* Lighter blue for dark mode */
html.dark .title-purple { color: #a78bfa; } /* Lighter purple for dark mode */

.team-member-card .description {
  font-size: 0.9rem; /* ~14.4px */
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.social-links {
  margin-top: calc(var(--spacing-unit) * 2); /* Add space above links */
  display: flex;
  justify-content: center;
  gap: calc(var(--spacing-unit) * 2);
}

.social-links a {
  color: var(--text-light);
  transition: color 0.2s ease;
  display: inline-flex; /* Helps align icon */
}

.social-links a:hover {
  color: var(--primary-color);
}

/* Tech Stack Section */
.tech-stack-content-wrapper h3 {
    font-size: 1.125rem; /* ~18px */
    font-weight: 600; /* Bolder */
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.tech-tags {
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.tech-tags .tag {
  display: inline-block; /* Ensure tags flow correctly */
  margin-right: calc(var(--spacing-unit) * 1);
  margin-bottom: calc(var(--spacing-unit) * 1);
  background-color: var(--bg-light); /* Very light grey */
  color: var(--text-light); /* Medium grey text */
  font-weight: 500;
  font-size: 0.8rem; /* Smaller text */
  padding: calc(var(--spacing-unit) * 0.5) calc(var(--spacing-unit) * 1.25); /* Adjust padding */
  border-radius: 4px; /* Slight rounding, not pill */
  border: 1px solid var(--border-color); /* Subtle border */
}

html.dark .tech-tags .tag {
    background-color: #2a2a2a; /* Darker grey for dark mode */
    color: #a0a0a0; /* Lighter grey text */
    border-color: #444;
}

.opensource-section {
    margin-top: calc(var(--spacing-unit) * 8);
}

.opensource-section h3 {
    font-size: 1.125rem; /* Slightly smaller than column titles */
    font-weight: 600;
    margin-bottom: var(--spacing-unit);
}

.opensource-section p {
    color: var(--text-light);
    max-width: 600px; /* Limit width like subtitle */
    margin-left: auto;
    margin-right: auto;
}

.opensource-section .github-link {
    color: var(--primary-color); /* Green color */
    font-weight: 500;
    display: inline-flex; /* Align icon and text */
    align-items: center;
    gap: calc(var(--spacing-unit) * 0.75);
    margin-top: calc(var(--spacing-unit) * 2);
    transition: color 0.2s ease;
}

.opensource-section .github-link:hover {
    color: var(--primary-color-dark);
}

html.dark .opensource-section .github-link {
    color: #34d399; /* Lighter green for dark mode */
}

html.dark .opensource-section .github-link:hover {
    color: #a7f3d0;
}


/* Placeholder text styles */
.placeholder-image span {
    color: var(--text-light);
    font-size: 0.9rem;
}

html.dark .placeholder-image span {
    color: var(--text-light);
}

</style>
