<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title: string;
  specialization: string;
  issuedDate: string;
  credentialId: string;
  tags: string[];
  imageUrl?: string; // Optional kung kaya pa
}

const props = defineProps<Props>();
console.log(props)
</script>

<template>
  <div class="certificate-card">
    <div class="certificate-image-placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="placeholder-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    </div>
    <div class="certificate-content">
      <div class="certificate-header">
        <span class="tag tag-green">Certificate</span>
        <span class="issued-date">Issued: {{ issuedDate }}</span>
      </div>
      <h3 class="certificate-title">{{ title }}</h3>
      <p class="certificate-specialization">{{ specialization }}</p>
      <div class="credential-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="credential-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
        <span>Credential ID: {{ credentialId }}</span>
      </div>
      <div class="tags-container">
        <span v-for="tag in tags.slice(0, 3)" :key="tag" class="skill-tag">{{ tag }}</span>
        <span v-if="tags.length > 3" class="skill-tag more-tag">+{{ tags.length - 3 }} more</span>
      </div>
    </div>
    <div class="certificate-actions">
      <button class="btn btn-secondary btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="action-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download
      </button>
      <button class="btn btn-secondary btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="action-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 5.314 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>
        Share
      </button>
      <button class="btn btn-secondary btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="action-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.458-4.458a1.012 1.012 0 0 1 1.414 0l4.458 4.458a1.012 1.012 0 0 1 0 .639l-4.458 4.458a1.012 1.012 0 0 1-1.414 0l-4.458-4.458Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.036 12.322a1.012 1.012 0 0 1 0-.639l4.458-4.458a1.012 1.012 0 0 1 1.414 0l4.458 4.458a1.012 1.012 0 0 1 0 .639l-4.458 4.458a1.012 1.012 0 0 1-1.414 0l-4.458-4.458Z" />
        </svg>
        View
      </button>
    </div>
  </div>
</template>

<style scoped>
.certificate-card {
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease;
}

.certificate-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.certificate-image-placeholder {
  background-color: var(--bg-light);
  height: 180px; /* Adjust height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  color: var(--text-light);
}

.certificate-content {
  padding: calc(var(--spacing-unit) * 3);
  flex-grow: 1; /* Allow content to fill space */
}

.certificate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing-unit) * 1.5);
}

.issued-date {
  font-size: 0.8rem;
  color: var(--text-light);
}

.certificate-title {
  font-size: 1.25rem; /* ~20px */
  font-weight: 600;
  margin-bottom: calc(var(--spacing-unit) * 0.5);
  color: var(--text-dark);
}

.certificate-specialization {
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.credential-info {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
  font-size: 0.85rem;
  color: var(--text-light);
  margin-bottom: calc(var(--spacing-unit) * 2.5);
}

.credential-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0; /* Prevent icon shrinking */
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 1);
  margin-bottom: calc(var(--spacing-unit) * 1); /* Add some space before actions */
}

.skill-tag {
  background-color: var(--bg-light);
  color: var(--text-light);
  padding: calc(var(--spacing-unit) * 0.5) calc(var(--spacing-unit) * 1.5);
  border-radius: 4px;
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  border: 1px solid var(--border-color);
}

.more-tag {
  background-color: transparent;
  border: none;
  color: var(--text-light);
}

.certificate-actions {
  display: flex;
  justify-content: space-between; /* Distribute buttons evenly */
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-light); /* Slightly different background for actions */
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 2); /* Smaller padding for icon buttons */
  font-size: 0.85rem;
}

.action-icon {
  width: 16px;
  height: 16px;
}

/* Dark Mode Adjustments */
html.dark .certificate-card {
  background-color: var(--section-background); /* Darker card background */
  border-color: var(--border-color);
}

html.dark .certificate-card:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}

html.dark .certificate-image-placeholder {
  background-color: var(--bg-light);
  border-bottom-color: var(--border-color);
}

html.dark .placeholder-icon {
  color: var(--text-light);
}

html.dark .issued-date,
html.dark .certificate-specialization,
html.dark .credential-info {
  color: var(--text-light);
}

html.dark .certificate-title {
  color: var(--text-dark);
}

html.dark .skill-tag {
  background-color: var(--bg-light);
  color: var(--text-light);
  border-color: var(--border-color);
}

html.dark .more-tag {
  color: var(--text-light);
}

html.dark .certificate-actions {
  background-color: var(--bg-light); /* Slightly darker action area */
  border-top-color: var(--border-color);
}

html.dark .btn-secondary {
    background-color: var(--bg-light); /* Match action area */
    color: var(--text-dark);
    border-color: var(--border-color);
}

html.dark .btn-secondary:hover {
    background-color: #333; /* Slightly darker hover */
    border-color: #555;
}

</style>
