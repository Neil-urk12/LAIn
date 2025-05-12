<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { pb } from '../pocketbase/pocketbase';
import { useAuthStore } from '../stores/auth';
// Import necessary interfaces (Enrollments, Courses, User)
import type { Enrollments, Courses, User } from '../models/interfaces';
import CertificateCard from '../components/CertificatesView/CertificateCard.vue';
import AboutSection from '../components/CertificatesView/AboutCertificatesSection.vue';
import FaqSection from '../components/CertificatesView/FaqSection.vue';

// Define the structure for displayed completed courses (representing earned certificates)
interface CompletedCourseDisplay {
  enrollmentId: string;
  courseId: string;
  title: string; // From expanded course
  completionDate: string; // From enrollment updatedAt (approximation)
  credentialId: string; // Generated placeholder
  imageUrl?: string; // From expanded course
  // Add other relevant course details if needed for the card
}

// Define expanded enrollment type from PocketBase
interface EnrollmentWithCourse extends Enrollments {
  expand?: {
    courseId: Courses;
    userId?: User; // Optional: might be useful if needed
  };
}

const authStore = useAuthStore();
const isLoading = ref(true);
const error = ref<string | null>(null);

// Rename to reflect that it shows completed courses
const completedCourses = ref<CompletedCourseDisplay[]>([]);

// Remove activeTab and inProgressCertificates if view only shows completed
// const activeTab = ref('earned');
// const inProgressCertificates = ref([]);

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

    // Fetch completed enrollments for the current user, expand course
    const records = await pb.collection<EnrollmentWithCourse>('enrollments').getFullList({
      filter: `userId = "${userId}" && isCompleted = true`,
      expand: 'courseId',
      sort: '-updatedAt', // Sort by most recently completed
    });

    // Transform fetched data into the display format
    completedCourses.value = records.map(enrollment => {
      const course = enrollment.expand?.courseId;
      const completionTimestamp = new Date(enrollment.updatedAt).getTime(); // Use updatedAt for timestamp

      // Basic check for expanded data
      if (!course) {
        console.warn(`Missing expanded course data for enrollment ${enrollment.id}`);
        return {
          enrollmentId: enrollment.id,
          courseId: enrollment.courseId,
          title: 'Course Data Missing',
          completionDate: enrollment.updatedAt, // Fallback
          // Generate placeholder credential ID
          credentialId: `${userId}-${enrollment.courseId}-${completionTimestamp}`,
          imageUrl: undefined,
        };
      }

      return {
        enrollmentId: enrollment.id,
        courseId: course.id,
        title: course.title,
        completionDate: enrollment.updatedAt, // Use enrollment update time as completion date
        // Generate placeholder credential ID
        credentialId: `${userId}-${course.id}-${completionTimestamp}`,
        imageUrl: course.imageUrl || undefined,
      };
    });

  } catch (err: unknown) {
    console.error("Error fetching completed enrollments:", err);
    if (err instanceof Error) {
      error.value = `Failed to load completed courses: ${err.message}. Please try again later.`;
    } else {
      error.value = "An unknown error occurred while loading completed courses.";
    }
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <div class="certificates-view container">
    <header class="certificates-header">
      <h1>Your Certificates</h1>
      <p>View certificates for your completed courses</p>
      <!-- Search bar might need rethinking - search courses? -->
      <div class="search-bar">
        <input type="text" placeholder="Search Completed Courses..." />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="search-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </header>

    <!-- Remove Tabs if only showing completed -->
    <!-- <div class="tabs">
      <button :class="{ active: activeTab === 'earned' }" @click="activeTab = 'earned'">Earned Certificates</button>
      <button :class="{ active: activeTab === 'inProgress' }" @click="activeTab = 'inProgress'">In Progress</button>
    </div> -->

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <p>Loading completed courses...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <!-- Completed Courses Section -->
    <section v-else class="certificates-list">
      <!-- Rename class if desired, e.g., completed-courses-list -->
      <div v-if="completedCourses.length" class="certificate-grid">
        <!-- Ensure CertificateCard props match CompletedCourseDisplay -->
        <CertificateCard
          v-for="course in completedCourses"
          :key="course.enrollmentId"
          :title="course.title"
          :completion-date="course.completionDate" 
          :credential-id="course.credentialId"
          :image-url="course.imageUrl"
          :course-id="course.courseId" 
        />
      </div>
      <p v-else>You haven't completed any courses yet.</p>
    </section>

    <!-- Remove In Progress Section -->
    <!-- <section v-if="activeTab === 'inProgress'" class="in-progress-list">
       <p v-if="!inProgressCertificates.length">No certificates currently in progress.</p>
    </section> -->

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
/* Styles remain largely the same, minor text changes if needed */

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


/* Remove Tab Styles */
/* .tabs { ... } */

.certificates-list {
  margin-bottom: calc(var(--spacing-unit) * 8);
}

.certificate-grid {
    display: grid;
    /* Ensure auto-fit works as expected with a defined minimum and flexible max */
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); 
    gap: calc(var(--spacing-unit) * 4);
    width: 100%; /* Ensure grid container takes full available width */
    justify-content: center; /* Center grid items if there's leftover space on the last row */
}

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

/* Loading/Error States */
.loading-state, .error-state {
  text-align: center;
  padding: calc(var(--spacing-unit) * 4) 0;
  color: var(--text-light);
}

.error-state {
  color: var(--danger-color); /* Assuming you have a danger color variable */
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

/* Remove dark mode tab styles */

html.dark .certificates-list p {
    color: var(--text-light);
}

</style>
