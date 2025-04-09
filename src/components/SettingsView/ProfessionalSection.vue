<template>
  <section class="settings-section">
    <div class="section-header">
      <h2>Professional Information</h2>
      <p>Add your work and social profiles</p>
    </div>

    <div class="profile-fields">
      <div class="form-row">
        <div class="form-field">
          <label for="jobTitle">Job title</label>
          <input id="jobTitle" type="text" v-model="formData.jobTitle" class="input-field" />
        </div>
        <div class="form-field">
          <label for="company">Company/Organization</label>
          <input id="company" type="text" v-model="formData.company" class="input-field" />
        </div>
      </div>
      <div class="form-field">
        <label for="website">Website</label>
        <input id="website" type="url" v-model="formData.website" placeholder="https://example.com" class="input-field" />
      </div>
      <div class="form-field">
        <label for="linkedin">LinkedIn</label>
        <input id="linkedin" type="url" v-model="formData.linkedin" placeholder="https://linkedin.com/in/username" class="input-field" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface ProfessionalData {
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
}

const props = defineProps<{
  initialData: ProfessionalData
}>();

const formData = reactive<ProfessionalData>({
  jobTitle: props.initialData.jobTitle,
  company: props.initialData.company,
  website: props.initialData.website,
  linkedin: props.initialData.linkedin
});
</script>

<style scoped>
.settings-section {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-dark);
  letter-spacing: -0.025em;
}

.section-header p {
  font-size: 0.9375rem;
  color: var(--text-light);
  line-height: 1.5;
}

.profile-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.form-field {
  flex: 1;
  min-width: 240px;
}

label {
  display: block;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-family: var(--font-family-sans);
  font-size: 0.875rem;
  color: var(--text-dark);
  background-color: var(--bg-white);
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input-field::placeholder {
  color: var(--text-light);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .settings-section {
    padding: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.25rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1rem;
  }

  .form-field {
    min-width: 100%;
  }
}
</style>
