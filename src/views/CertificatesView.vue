<script setup lang="ts">
import { ref } from 'vue';
import CertificateCard from '../components/CertificatesView/CertificateCard.vue';
import AboutSection from '../components/CertificatesView/AboutCertificatesSection.vue';
import FaqSection from '../components/CertificatesView/FaqSection.vue';
const activeTab = ref('earned');

// Mock data for certificates (replace with actual data fetching later)
const earnedCertificates = ref([
  {
    id: 1,
    title: 'AI Fundamentals',
    specialization: 'AI Fundamentals: Getting Started',
    issuedDate: 'October 15, 2023',
    credentialId: 'LAIn-AI-FUND-2023-001',
    tags: ['Artificial Intelligence', 'Machine Learning Basics', 'Neural Networks'],
    imageUrl: undefined, // Optional : Kapoy na
  },
  {
    id: 2,
    title: 'Machine Learning with Python',
    specialization: 'Machine Learning with Python',
    issuedDate: 'December 3, 2023',
    credentialId: 'LAIn-ML-PY-2023-042',
    tags: ['Python', 'Machine Learning', 'Data Analysis', 'Scikit-learn', 'Pandas'],
    imageUrl: undefined,
  },
  {
    id: 3,
    title: 'Deep Learning Specialization',
    specialization: 'Deep Learning Specialization',
    issuedDate: 'February 20, 2024',
    credentialId: 'LAIn-DL-SPEC-2024-018',
    tags: ['Deep Learning', 'Neural Networks', 'TensorFlow', 'CNNs', 'RNNs'],
    imageUrl: undefined,
  },
]);

const inProgressCertificates = ref([
  // Example: Add in-progress items for the 'In Progress' tab
  // { id: 4, title: 'Natural Language Processing', progress: 50, expectedCompletion: 'June 2024' },
]);

</script>

<template>
  <div class="certificates-view container">
    <header class="certificates-header">
      <h1>Certificates</h1>
      <p>View and manage your earned certificates</p>
      <div class="search-bar">
        <input type="text" placeholder="Search Certificates..." />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </header>

    <div class="tabs">
      <button :class="{ active: activeTab === 'earned' }" @click="activeTab = 'earned'">Earned Certificates</button>
      <button :class="{ active: activeTab === 'inProgress' }" @click="activeTab = 'inProgress'">In Progress</button>
    </div>

    <section v-if="activeTab === 'earned'" class="certificates-list">
      <div class="certificate-grid">
        <CertificateCard
          v-for="certificate in earnedCertificates"
          :key="certificate.id"
          :title="certificate.title"
          :specialization="certificate.specialization"
          :issued-date="certificate.issuedDate"
          :credential-id="certificate.credentialId"
          :tags="certificate.tags"
          :image-url="certificate.imageUrl"
        />
        <p v-if="!earnedCertificates.length">You haven't earned any certificates yet.</p>
      </div>
    </section>

    <section v-if="activeTab === 'inProgress'" class="in-progress-list">
       <!-- Placeholder or component for in-progress items -->
       <p v-if="!inProgressCertificates.length">No certificates currently in progress.</p>
       <!-- Add logic to display in-progress items if needed -->
    </section>

    <section class="about-section-container">
      <h2>About LAIn Certificates</h2>
      <AboutSection />
    </section>

    <section class="faq-section-container">
      <h2>Frequently Asked Questions</h2>
      <FaqSection />
    </section>
  </div>
</template>

<style scoped>
.certificates-view {
  padding-top: calc(var(--spacing-unit) * 6);
  padding-bottom: calc(var(--spacing-unit) * 10);
}

.certificates-header {
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.certificates-header h1 {
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.certificates-header p {
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.search-bar {
  position: relative;
  margin-bottom: calc(var(--spacing-unit) * 4);
  max-width: 600px;
}

.search-bar input {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 5) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2); /* Adjust padding for icon */
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  background-color: var(--bg-white);
  color: var(--text-dark);
}

.search-bar input::placeholder {
  color: var(--text-light);
}

.search-icon {
  position: absolute;
  right: calc(var(--spacing-unit) * 2);
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-light);
}


.tabs {
  display: flex;
  gap: calc(var(--spacing-unit) * 1);
  margin-bottom: calc(var(--spacing-unit) * 4);
  border-bottom: 1px solid var(--border-color);
}

.tabs button {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border: none;
  background-color: transparent;
  color: var(--text-light);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

.tabs button:hover:not(.active) {
  color: var(--text-dark);
}

.certificates-list, .in-progress-list {
  margin-bottom: calc(var(--spacing-unit) * 8);
}

.certificate-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: calc(var(--spacing-unit) * 4);
}

.in-progress-list p,
.certificates-list p {
    color: var(--text-light);
    text-align: center;
    padding: calc(var(--spacing-unit) * 4) 0;
}

/* Renamed classes for the containers */
.about-section-container, .faq-section-container {
  background-color: var(--bg-light);
  padding: calc(var(--spacing-unit) * 6);
  border-radius: 8px;
  margin-bottom: calc(var(--spacing-unit) * 6);
}

.about-section-container h2, .faq-section-container h2 {
  margin-bottom: calc(var(--spacing-unit) * 4);
  text-align: left;
}

/* Dark mode adjustments */
html.dark .about-section-container,
html.dark .faq-section-container {
  background-color: var(--section-background);
}

html.dark .search-bar input {
    background-color: var(--bg-light);
    border-color: var(--border-color);
    color: var(--text-dark);
}

html.dark .search-bar input::placeholder {
    color: var(--text-light);
}

html.dark .tabs button {
    color: var(--text-light);
}

html.dark .tabs button.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}
html.dark .tabs button:hover:not(.active) {
    color: var(--text-dark);
}

html.dark .in-progress-list p,
html.dark .certificates-list p {
    color: var(--text-light);
}

</style>
