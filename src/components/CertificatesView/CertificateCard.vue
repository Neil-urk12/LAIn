<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  title: string;
  completionDate: string;
  credentialId: string;
  imageUrl?: string;
  courseId: string;
}

const props = defineProps<Props>();
const router = useRouter();

function viewCourseDashboard() {
  router.push({ name: 'course-dashboard', params: { id: props.courseId } });
}

const formattedCompletionDate = new Date(props.completionDate).toLocaleDateString();
</script>

<template>
  <div class="certificate-card">
    <div class="thumbnail" :style="{ backgroundImage: imageUrl ? 'url(' + imageUrl + ')' : 'none' }">
      <svg v-if="!imageUrl" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="placeholder-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    </div>
    <div class="info">
      <div class="top-row">
        <span class="badge certificate-earned">Certificate Earned</span>
        <span class="date">Completed: {{ formattedCompletionDate }}</span>
      </div>
      <h3>{{ title }}</h3>
      <div class="credential-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="credential-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
        <span>ID: {{ credentialId }}</span>
      </div>
      <button @click="viewCourseDashboard">View Course</button>
    </div>
  </div>
</template>

<style scoped>
.certificate-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
}

.certificate-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.thumbnail {
  background-color: var(--bg-light);
  border-bottom: 1px solid var(--border-color);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}

.placeholder-icon {
  width: 50px;
  height: 50px;
  color: var(--text-light);
}

.info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-light);
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.badge.certificate-earned {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.date {
  /* Style for date if needed */
}

h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-dark);
}

.credential-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 4px;
}

.credential-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

button {
  background: var(--primary-color);
  color: var(--bg-white);
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: auto;
  transition: background-color 0.2s ease;
}

button:hover {
  background: var(--primary-color-dark);
}

html.dark .certificate-card {
  background-color: var(--section-background);
  border-color: var(--border-color);
}

html.dark .certificate-card:hover {
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}

html.dark .thumbnail {
  background-color: var(--bg-light);
  border-bottom-color: var(--border-color);
}

html.dark .placeholder-icon {
  color: var(--text-light);
}

html.dark .info {
  /* Dark mode info styles if needed */
}

html.dark .top-row,
html.dark .date,
html.dark .credential-info {
  color: var(--text-light);
}

html.dark h3 {
  color: var(--text-dark);
}

html.dark .badge.certificate-earned {
  background: #14532d;
  color: #a7f3d0;
  border-color: #166534;
}

html.dark button {
  background: var(--primary-color);
  color: white;
}

html.dark button:hover {
  background: var(--primary-color-dark);
}

</style>
