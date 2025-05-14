<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useEnrollmentStore } from '@/stores/enrollment';
defineOptions({ name: 'StatsCards' })

const enrollmentStore = useEnrollmentStore();
const auth = useAuthStore();
const learningStreak = computed(() => auth.user?.learningStreak ?? 0);
const courses = computed(() => enrollmentStore.enrollmentsCount);
const completedCourses = computed(() => enrollmentStore.completedCoursesCount);

onMounted( async () => {
  await enrollmentStore.fetchEnrolledCourses();
})
</script>

<template>
  <div class="stats-cards">
    <div class="card">
      <div class="label">Courses in Progress</div>
      <div class="bottom-row">
        <div class="number">{{ courses }}</div>
        <span class="badge active">Active</span>
      </div>
    </div>
    <div class="card">
      <div class="label">Completed Courses</div>
      <div class="bottom-row">
        <div class="number">{{ completedCourses }}</div>
      </div>
    </div>
    <div class="card">
      <div class="label">Learning Streak</div>
      <div class="bottom-row">
        <div class="number"><span style="margin-right:4px">🔥</span>{{ learningStreak }}</div>
        <span class="subtext">day<span v-if="learningStreak !== 1">s</span></span>
      </div>
    </div>
    <div class="card">
      <div class="label">Certificates Earned</div>
      <div class="bottom-row">
        <div class="number">0</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-cards {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 150px;
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
}

.number {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.label {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 10px;
}

.badge.active {
  background: var(--primary-color);
  color: var(--bg-white);
}
.subtext {
  font-size: 12px;
  color: var(--text-light);
  margin-left: 6px;
}
.bottom-row {
  display: flex;
  align-items: center;
  margin-top: auto;
}
</style>
