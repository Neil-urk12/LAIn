<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { pb } from '../pocketbase/pocketbase'; // Import pb
import { useAuthStore } from '../stores/auth'; // Import auth store
import type { Certificates, CertificateTemplates, Courses } from '../models/interfaces'; // Import interfaces
import CertificateCard from '../components/CertificatesView/CertificateCard.vue';
import AboutSection from '../components/CertificatesView/AboutCertificatesSection.vue';
import FaqSection from '../components/CertificatesView/FaqSection.vue';

// Define the structure for displayed certificates
interface EarnedCertificateDisplay {
  id: string;
  title: string; // From expanded template
  specialization: string; // From expanded template or course
  issuedDate?: string; // From certificate
  credentialId: string; // From certificate
  tags: string[]; // From expanded template
  imageUrl?: string; // From expanded template (certificateImage) or course (imageUrl)
}

// Define expanded certificate type from PocketBase
interface CertificateWithExpand extends Certificates {
  expand?: {
    templateId: CertificateTemplates;
    courseId: Courses;
    // Assuming userId is not needed here as we filter by it
  };
}


const activeTab = ref('earned');
const authStore = useAuthStore(); // Initialize auth store
const isLoading = ref(true); // Loading state
const error = ref<string | null>(null); // Error state

// Use the new interface for earned certificates
const earnedCertificates = ref<EarnedCertificateDisplay[]>([]);

// Mock data for certificates (replace with actual data fetching later)
// Removed mock data

const inProgressCertificates = ref([
  // Example: Add in-progress items for the 'In Progress' tab
  // { id: 4, title: 'Natural Language Processing', progress: 50, expectedCompletion: 'June 2024' },
]);


// Fetch data on component mount
onMounted(async () => {
  if (!authStore.user?.id) {
    error.value = "User not logged in.";
    isLoading.value = false;
    return;
  }

  try {
    isLoading.value = true;
    error.value = null;
    const userId = authStore.user.id;

    // Fetch published certificates for the current user, expand template and course
    const records = await pb.collection<CertificateWithExpand>('certificates').getFullList({
      filter: `userId = "${userId}" && status = "published"`,
      expand: 'templateId,courseId',
      sort: '-issuedDate', // Sort by most recently issued
    });

    // Transform fetched data into the display format
    earnedCertificates.value = records.map(cert => {
      const template = cert.expand?.templateId;
      const course = cert.expand?.courseId;

      // Basic check for expanded data
      if (!template || !course) {
        console.warn(`Missing expanded data for certificate ${cert.id}`);
        // Return a partial object or skip, depending on requirements
        // For now, let's create a partial object
        return {
          id: cert.id,
          title: 'Course Data Missing', // Placeholder
          specialization: 'Data Missing', // Placeholder
          issuedDate: cert.issuedDate,
          credentialId: cert.credentialId,
          tags: [],
          imageUrl: undefined,
        };
      }

      return {
        id: cert.id,
        title: course.title, // Use course title
        specialization: template.specialization || course.title, // Use template specialization or fallback to course title
        issuedDate: cert.issuedDate,
        credentialId: cert.credentialId,
        tags: template.tags || [], // Use template tags
        imageUrl: course.imageUrl || undefined, // Use course image
      };
    });

  } catch (err: unknown) {
    console.error("Error fetching certificates:", err);
    if (err instanceof Error) {
      error.value = `Failed to load certificates: ${err.message}. Please try again later.`;
    } else {
      error.value = "An unknown error occurred while loading certificates.";
    }
  } finally {
    isLoading.value = false;
  }
});

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

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <p>Loading certificates...</p>
      <!-- Optional: Add a spinner component -->
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <!-- Earned Certificates Section -->
    <section v-else-if="activeTab === 'earned'" class="certificates-list">
      <div v-if="earnedCertificates.length" class="certificate-grid">
        <CertificateCard
          v-for="certificate in earnedCertificates"
          :key="certificate.id"
          :title="certificate.title"
          :specialization="certificate.specialization"
          :issued-date="certificate.issuedDate ?? 'Date not available'"
          :credential-id="certificate.credentialId"
          :tags="certificate.tags"
          :image-url="certificate.imageUrl"
        />
      </div>
      <p v-else>You haven't earned any certificates yet.</p>
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

.loading-state, .error-state {
  text-align: center;
  padding: calc(var(--spacing-unit) * 4) 0;
  color: var(--text-light);
}

.error-state {
  color: var(--danger-color); /* Assuming you have a danger color variable */
}

</style>
