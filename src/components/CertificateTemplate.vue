<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  studentName: string;
  courseTitle: string;
  completionDate: string; // Should be a formatted date string
  credentialId: string;
}

defineProps<Props>();
</script>

<template>
  <div class="certificate-template">
    <div class="certificate-border">
      <div class="certificate-content">
        <h1 class="certificate-heading">Certificate of Completion</h1>
        <p class="presented-to">This certificate is presented to</p>
        <h2 class="student-name">{{ studentName }}</h2>
        <p class="completion-text">for successfully completing the course</p>
        <h3 class="course-title">{{ courseTitle }}</h3>
        <div class="footer-info">
          <div class="date-info">
            <p class="label">Date Issued</p>
            <p class="value">{{ completionDate }}</p>
          </div>
          <div class="credential-info">
            <p class="label">Credential ID</p>
            <p class="value">{{ credentialId }}</p>
          </div>
        </div>
        <!-- Optional: Add logo or signature placeholders -->
         <div class="signature-placeholder">[ Instructor Signature Placeholder ]</div>
         <div class="logo-placeholder">[ LAIn Logo Placeholder ]</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Basic styling - customize as needed */
.certificate-template {
  font-family: serif; /* Classic certificate font */
  color: #333;
  background-color: #ffffff;
  padding: 2rem;
  width: 800px; /* Adjust as needed */
  max-width: 100%;
  border: 1px solid #ccc; /* Optional outer border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1rem auto; /* Center in preview */
}

.certificate-border {
  border: 5px double #a88f5a; /* Ornate border */
  padding: 1.5rem;
  text-align: center;
}

.certificate-content {
  /* Content styles */
}

.certificate-heading {
  font-size: 2rem;
  color: #a88f5a;
  margin-bottom: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}

.presented-to,
.completion-text {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.student-name {
  font-size: 2.2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #555;
}

.course-title {
  font-size: 1.6rem;
  font-style: italic;
  margin: 1rem 0 2rem 0;
  color: #777;
}

.footer-info {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.footer-info .label {
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.footer-info .value {
  font-family: monospace; /* For ID */
}

.date-info,
.credential-info {
  text-align: left;
}

.signature-placeholder,
.logo-placeholder {
  margin-top: 2rem;
  font-size: 0.8rem;
  color: #aaa;
}
</style> 