<script setup lang="ts">
import { defineAsyncComponent, ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useEnrollmentStore } from '@/stores/enrollment';
import { pb } from '../pocketbase/pocketbase';

const StatsCards = defineAsyncComponent(() => import("../components/DashboardView/StatsCards.vue"));
const ContinueLearning = defineAsyncComponent(() => import("../components/DashboardView/ContinueLearning.vue"));
const LearningPath = defineAsyncComponent(() => import("../components/DashboardView/LearningPath.vue"));
const Recommended = defineAsyncComponent(() => import("../components/DashboardView/Recommended.vue"));

const auth = useAuthStore();
const router = useRouter();
const userName = computed(() => auth.user?.name || "");
const userRole = computed(() => auth.user?.role || "");

const enrollmentStore = useEnrollmentStore();
interface EnrolledCourseDisplay {
  id: string;
  title: string;
  difficulty: string;
  progress: number;
  lastAccessedDate: string;
  thumbnail: string | undefined;
}
const enrolledCourses = ref<EnrolledCourseDisplay[]>([]);
const isEnrolledCoursesLoading = ref(true);

// ADD watch for changes in the store's enrolled courses
watch(() => enrollmentStore.enrolledCourses, (newEnrollments) => {
  if (!newEnrollments) {
      enrolledCourses.value = []; // Handle null/undefined case if possible
      return;
  }
  try {
    // Perform the mapping directly using the watched value
    enrolledCourses.value = newEnrollments.map(enrollment => {
      const totalLessons = enrollment.expand?.courseId?.lessonsAmount ?? 0;
      const completedLessons = enrollment.progress ?? 0;
      const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: enrollment.expand?.courseId.id ?? '',
        title: enrollment.expand?.courseId.title ?? '',
        difficulty: enrollment.expand?.courseId.level ?? '',
        progress: percentage, // Use calculated percentage
        lastAccessedDate: enrollment.updatedAt, // Consider formatting this date
        thumbnail: enrollment.expand?.courseId.courseImage ? `${pb.baseURL}/api/files/courses/${enrollment.expand?.courseId.id}/${enrollment.expand?.courseId.courseImage}` : undefined,
      };
    });
    console.log('Watch: Mapped enrolled courses locally:', enrolledCourses.value);
  } catch (error) {
    console.error("Watch: Failed to map enrolled courses:", error);
    enrolledCourses.value = []; // Reset local state on mapping error
  }
}, { deep: true }); // Use deep watch for safety, though maybe not strictly needed if store replaces array ref

interface Activity { icon: string; description: string; time: string; }
const activityList = ref<Activity[]>([]);
function fetchRecentActivity(): Activity[] {
  // TODO: replace with real data fetch
  return [];
}
onMounted(async () => {
  isEnrolledCoursesLoading.value = true; // Start loading
  activityList.value = fetchRecentActivity();

  try {
    await auth.initAuth();
    // Fetch data; the watch will handle mapping when enrollmentStore.enrolledCourses updates
    await enrollmentStore.fetchEnrolledCourses();
  } catch (error) {
    console.error("onMounted: Failed during initial data fetch:", error);
    // If fetch fails, the watch might not trigger or might receive empty/stale data.
    // Ensure local state is clear if fetch fails.
    enrolledCourses.value = []; // Clear local state on fetch error
  } finally {
    // Loading finishes after the fetch attempt (success or failure)
    isEnrolledCoursesLoading.value = false;
  }
});
</script>

<template>
  <main>
    <section class="header">
      <h1>Welcome back, {{ userName }}!</h1>
      <p>Here's what's happening with your learning journey today.</p>
    </section>

    <StatsCards />

    <!-- Render Skeleton or Component based on loading state -->
    <section v-if="isEnrolledCoursesLoading" class="continue-learning-skeleton">
      <h2>Continue Learning</h2>
      <div class="courses-grid-skeleton">
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div> 
      </div>
    </section>
    <ContinueLearning v-else :enrolledCourses="enrolledCourses" /> 

    <LearningPath />

    <Recommended />

    <section class="bottom-section">
      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="tabs">
          <button class="active">All</button>
          <button>Courses</button>
          <button>Achievements</button>
        </div>
        <ul class="activity-list">
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>
                Completed lesson 5 in Introduction to Artificial Intelligence
              </p>
              <span class="time">Today, 10:30 AM</span>
            </div>
          </li>
          <li>
            <span class="icon">🏆</span>
            <div class="activity-details">
              <p>
                Earned 'Fast Learner' badge for completing 3 lessons in a day
              </p>
              <span class="time">Yesterday, 3:45 PM</span>
            </div>
          </li>
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>Started new course: Deep Learning Specialization</p>
              <span class="time">2 days ago</span>
            </div>
          </li>
          <li>
            <span class="icon">🏆</span>
            <div class="activity-details">
              <p>Reached a 10-day learning streak</p>
              <span class="time">3 days ago</span>
            </div>
          </li>
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>
                Submitted project: Image Classification with Neural Networks
              </p>
              <span class="time">1 week ago</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="account-settings">
        <h3>Account Settings</h3>
        <div class="avatar"></div>
        <div class="name">{{ userName }}</div>
        <div class="role">{{ userRole }}</div>
        <button @click="router.push('/profile')">Edit Profile</button>
        <button @click="router.push('/settings')">Account Settings</button>
        <button @click="router.push('/subscription')">Subscription</button>
        <button @click="router.push('/')">Back to Home</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 3rem;
}
.header h1 {
  margin: 0;
  font-size: 24px;
}

.header p {
  margin: 5px 0 20px;
  color: var(--text-light);
}
.bottom-section {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.recent-activity {
  flex: 2;
  background: var(--color-background-soft);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.recent-activity h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 6px 12px;
  border: none;
  background: var(--color-background-mute);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-dark);
}

.tabs button.active {
  background: var(--color-background-soft);
  font-weight: bold;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
}

.activity-list li:last-child {
  border-bottom: none;
}

.icon {
  font-size: 20px;
  flex-shrink: 0;
}

.activity-details p {
  margin: 0;
  font-size: 14px;
}

.activity-details .time {
  font-size: 12px;
  color: var(--text-light);
}

.account-settings {
  flex: 1;
  background: var(--color-background-soft);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 220px;
}

.account-settings h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.account-settings .avatar {
  width: 60px;
  height: 60px;
  background: var(--border-color);
  border-radius: 50%;
}

.account-settings .name {
  font-weight: bold;
}

.account-settings .role {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  main {
    padding: 45px 10px;
  }

  .header h1 {
    font-size: 20px;
  }

  .bottom-section {
    flex-direction: column;
    gap: 15px;
  }

  .recent-activity,
  .account-settings {
    flex: none;
    min-width: auto;
    width: 100%;
  }

  .account-settings {
    align-items: flex-start;
  }

  .account-settings button {
    max-width: 250px;
  }
}

.account-settings button {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--color-background-soft);
  color: var(--text-dark);
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.account-settings button:hover {
  background: var(--color-background-mute);
}

/* Skeleton Styles */
.continue-learning-skeleton {
  margin: 30px 0;
}

.courses-grid-skeleton {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.skeleton-card {
  background: var(--color-background-mute); /* Use a muted background for skeleton */
  border-radius: 10px;
  height: 380px; /* Approximate height of CourseCard */
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
</style>
