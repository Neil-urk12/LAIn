<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useEnrollmentStore } from "../stores/enrollment";
import { pb } from "../pocketbase/pocketbase";
import type { Courses, Lessons, Instructor, Enrollments } from "../models/interfaces";
import type { CourseWithExpand } from "../models/types";

const route = useRoute();
const router = useRouter();
const courseId = route.params.id as string;
const enrollmentStore = useEnrollmentStore();
const isLoading = ref(true);
const course = ref<(Courses & { instructor: Instructor }) | null>(null);
const lessons = ref<Lessons[]>([]);
const nextSteps = ref([
  {
    icon: '▶️',
    title: 'Start the first lesson',
    desc: 'Begin your learning journey with the introductory lesson.',
    button: { text: 'Start Learning', style: 'primary' }
  },
  {
    icon: '👥',
    title: 'Join the community',
    desc: 'Connect with fellow students to enhance your learning experience.',
    button: { text: 'View Community', style: 'secondary' }
  },
  {
    icon: '📄',
    title: 'Download course materials',
    desc: 'Access supplementary resources to support your learning.',
    button: { text: 'View Resources', style: 'secondary' }
  }
]);
const courseDuration = computed(() =>
  course.value ? `${course.value.hoursDuration} hours` : "",
);

const courseStudentsCount = ref(0);
const courseLessonsCount = ref(0);
const certificate = ref('Included');

onMounted(async () => {
  try {
    const data = (await pb
      .collection<Courses>("courses")
      .getOne(courseId, { expand: "instructorId" })) as CourseWithExpand;
    course.value = {
      ...data,
      instructor: data.expand!.instructorId,
    } as Courses & { instructor: Instructor };
    await enrollmentStore.fetchByCourse(courseId);
    lessons.value = await pb
      .collection<Lessons>("lessons")
      .getFullList({ filter: `courseId="${courseId}"`, sort: "order" });
    courseLessonsCount.value = lessons.value.length;
    const enrollments = await pb
      .collection<Enrollments>("enrollments")
      .getFullList({ filter: `courseId="${courseId}"` });

    courseStudentsCount.value = enrollments.length;
  } catch (err) {
    console.error(err);
    router.replace({ name: "not-found", state: window.history.state });
  } finally {
    isLoading.value = false;
  }
});

const progressPercent = computed(() => {
  const prog = enrollmentStore.currentEnrollment?.progress ?? 0;
  return courseLessonsCount.value
    ? Math.round((prog / courseLessonsCount.value) * 100)
    : 0;
});

const goToLesson = (lessonId: string) => {
  router.push({
    name: "lesson",
    params: { courseId: courseId, lessonId: lessonId }
  });
};

const startFirstLesson = () => {
  if (lessons.value.length > 0) {
    goToLesson(lessons.value[0].id);
  }
};

const continueLesson = () => {
  const progress = enrollmentStore.currentEnrollment?.progress || 0;
  if (progress < lessons.value.length) {
    // Go to the next uncompleted lesson
    goToLesson(lessons.value[progress].id);
  } else if (lessons.value.length > 0) {
    // If all lessons are completed, go to the first lesson
    goToLesson(lessons.value[0].id);
  }
};

const isLessonCompleted = (index: number) => {
  const progress = enrollmentStore.currentEnrollment?.progress || 0;
  return index < progress;
};
</script>

<template>
  <template v-if="!isLoading">
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">Course Content</span>
          <span class="sidebar-meta"
            >{{ courseDuration }} • {{ courseLessonsCount }} lessons</span
          >
          <div class="sidebar-progress">
            <span
              >{{ enrollmentStore.currentEnrollment?.progress ?? 0 }} of
              {{ courseLessonsCount }} completed</span
            >
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="`width: ${progressPercent}%`"
              ></div>
            </div>
          </div>
        </div>
        <div class="sidebar-modules">
          <div
            v-for="(lesson, lIdx) in lessons"
            :key="lIdx"
            class="sidebar-module"
          >
            <div class="module-title">{{ lesson.title }}</div>
            <ul class="module-lessons">
              <li
                :key="lIdx"
                class="lesson-item"
                @click="goToLesson(lesson.id)"
              >
                <input type="checkbox" :checked="isLessonCompleted(lIdx)" disabled />
                <span class="lesson-title">{{ lesson.title }}</span>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Breadcrumb Navigation -->
        <nav class="breadcrumbs">
          <router-link to="/dashboard">Dashboard</router-link> >
          <router-link to="/courses">Courses</router-link> >
          <span>{{ course?.title }}</span>
        </nav>
        
        <!-- Welcome Banner -->
        <div class="welcome-banner">
          <div>
            <span class="banner-title"
              >Welcome to
              <span class="highlight">{{ course?.title }}</span></span
            >
            <p class="banner-desc">
              You've just enrolled in this course. Start your learning journey
              by exploring the modules and lessons.
            </p>
          </div>
          <button class="start-btn" @click="startFirstLesson">Start First Lesson</button>
        </div>

        <!-- Course Dashboard Card -->
        <section class="dashboard-card">
          <div class="dashboard-header">
            <span v-if="course?.level === 'Beginner'" class="badge">Beginner</span>
            <h1 class="course-title">{{ course!.title }}</h1>
          </div>
          <p class="course-desc">{{ course?.description }}</p>
          <div class="dashboard-info">
            <div class="info-block">
              <div class="info-label">Duration</div>
              <div class="info-value">{{ courseDuration }}</div>
            </div>
            <div class="info-block">
              <div class="info-label">Lessons</div>
              <div class="info-value">{{ courseLessonsCount }}</div>
            </div>
            <div class="info-block">
              <div class="info-label">Students</div>
              <div class="info-value">
                {{ courseStudentsCount }}
              </div>
            </div>
            <div class="info-block">
              <div class="info-label">Certificate</div>
              <div class="info-value">{{ certificate }}</div>
            </div>
          </div>
          <div class="dashboard-progress">
            <div class="progress-label">Your Progress</div>
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="`width: ${progressPercent}%`"
              ></div>
            </div>
            <span class="progress-percent">{{ progressPercent }}%</span>
          </div>
          <div class="dashboard-footer">
            <span class="instructor-label">Instructor</span>
            <span class="instructor-name">{{ course?.instructor.name }}</span>
            <span class="course-rating">★ {{ course?.rating }}</span>
            <button class="continue-btn" @click="continueLesson">Continue Learning</button>
          </div>
        </section>

        <!-- Modules List (Expanded) -->
        <div class="modules-list-expanded">
          <div
            v-for="(lesson, lIdx) in lessons"
            :key="lIdx"
            class="module-block-expanded"
          >
            <div class="module-block-header-expanded">
              <div>
                <span class="module-block-title">{{ lesson.title }}</span>
              </div>
              <span class="module-block-progress"
                >0 / 1 completed</span
              > <!-- Assuming each fetched lesson is a single item -->
            </div>
            <ul class="module-block-lessons-expanded">
              <li
                :key="lIdx"
                class="module-block-lesson-expanded"
                @click="goToLesson(lesson.id)"
              >
                <div class="lesson-icon">
                  <span>▶️</span> <!-- Assuming all fetched items are lessons -->
                </div>
                <div class="lesson-content">
                  <div class="lesson-title-row">
                    <span class="lesson-title">{{ lesson.title }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Next Steps Section -->
        <section class="next-steps">
          <div class="next-steps-title">Next Steps</div>
          <div class="next-steps-list">
            <div
              v-for="(step, idx) in nextSteps"
              :key="idx"
              class="next-step-item"
            >
              <div class="step-icon">{{ step.icon }}</div>
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-desc">{{ step.desc }}</div>
                <button 
                  :class="['step-btn', step.button.style]"
                  @click="step.button.text === 'Start Learning' ? startFirstLesson() : null"
                >
                  {{ step.button.text }}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  <template v-else>
    <div>Loading course...</div>
  </template>
</template>

<style scoped>
.breadcrumbs {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 20px;
}

.breadcrumbs a {
  color: var(--primary-color);
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background: var(--bg-light);
}

.sidebar {
  width: 320px;
  position: sticky;
  top: 0;
  height: 100vh;
  background: var(--bg-white);
  border-right: 1px solid var(--border-color);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
}
.sidebar-header {
  margin-bottom: 2.5rem;
}
.sidebar-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-dark);
}
.sidebar-meta {
  color: var(--text-light);
  font-size: 0.95rem;
  margin-top: 0.2rem;
  display: block;
}
.sidebar-progress {
  margin-top: 1rem;
}
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-light);
  border-radius: 4px;
  margin-top: 0.3rem;
  overflow: hidden;
}
.progress-bar-inner {
  height: 100%;
  background: var(--primary-color);
  width: 0%;
  transition: width 0.4s;
}
.sidebar-modules {
  flex: 1;
  overflow-y: auto;
}
.sidebar-module {
  margin-bottom: 1.8rem;
}
.module-title {
  font-weight: 600;
  margin-bottom: 0.7rem;
  color: var(--text-dark);
}
.module-lessons {
  list-style: none;
}
.lesson-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
  font-size: 0.98rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.lesson-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.lesson-title {
  flex: 1;
}
.lesson-meta {
  color: var(--text-light);
  font-size: 0.92rem;
}

.main-content {
  flex: 1;
  padding: 2.5rem 2.5rem 2.5rem 2rem;
}
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    var(--hero-gradient-start),
    var(--hero-gradient-end)
  );
  padding: 1.5rem 2rem;
  border-radius: 10px;
  margin-bottom: 2.2rem;
  border: 1px solid var(--border-color);
}
.banner-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color-dark);
}
.highlight {
  color: var(--primary-color);
}
.banner-desc {
  color: var(--text-light);
  margin-top: 0.3rem;
  font-size: 1rem;
}
.start-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.75rem 1.6rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.start-btn:hover {
  background: var(--primary-color-dark);
}

.dashboard-card {
  background: var(--bg-white);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(31, 41, 55, 0.07);
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  margin-bottom: 2.2rem;
  border: 1px solid var(--border-color);
}
.dashboard-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.badge {
  background: var(--primary-color);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  padding: 0.25rem 0.8rem;
}
.course-title {
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--text-dark);
}
.course-desc {
  color: var(--text-light);
  margin-bottom: 1.2rem;
}
.dashboard-info {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 1.1rem;
}
.info-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.info-label {
  color: var(--text-light);
  font-size: 0.95rem;
}
.info-value {
  font-weight: 600;
  color: var(--text-dark);
}
.dashboard-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.1rem;
}
.progress-label {
  color: var(--text-light);
  font-size: 0.97rem;
}
.progress-percent {
  color: var(--text-light);
  font-size: 0.97rem;
}
.dashboard-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.7rem;
}
.instructor-label {
  color: var(--text-light);
  font-size: 0.95rem;
}
.instructor-name {
  font-weight: 600;
  color: var(--text-dark);
}
.course-rating {
  margin-left: 0.4rem;
  color: #f59e42;
  font-weight: 600;
}
.continue-btn {
  margin-left: auto;
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.continue-btn:hover {
  background: var(--primary-color-dark);
}

.modules-tabs {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}
.tab {
  background: transparent;
  border: none;
  font-size: 1.07rem;
  font-weight: 600;
  color: var(--text-light);
  padding: 0.5rem 1.2rem;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}
.tab.active,
.tab:hover {
  background: var(--bg-white);
  color: var(--primary-color-dark);
}

.modules-list-expanded {
  margin-bottom: 2.5rem;
}
.module-block-expanded {
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  margin-bottom: 1.6rem;
  padding: 1.5rem 2rem;
}
.module-block-header-expanded {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.module-block-title {
  font-weight: 600;
  font-size: 1.12rem;
  color: var(--text-dark);
}
.module-block-meta {
  color: var(--text-light);
  font-size: 0.97rem;
  margin-left: 0.7rem;
}
.module-block-progress {
  color: var(--text-light);
  font-size: 0.97rem;
}
.module-block-lessons-expanded {
  list-style: none;
}
.module-block-lesson-expanded {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.7rem;
  padding: 0.7rem 0 0.7rem 0;
  border-radius: 6px;
  transition: background 0.15s;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.module-block-lesson-expanded:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.lesson-icon {
  font-size: 1.1rem;
  margin-top: 2px;
  width: 1.7em;
  text-align: center;
}
.lesson-content {
  flex: 1;
}
.lesson-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.lesson-title {
  font-weight: 500;
  color: var(--text-dark);
}
.lesson-duration {
  color: var(--text-light);
  font-size: 0.95rem;
}
.lesson-desc {
  color: var(--text-light);
  font-size: 0.97rem;
  margin-top: 0.1rem;
}

.next-steps {
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  padding: 2rem 2.5rem;
  margin-bottom: 2.2rem;
}
.next-steps-title {
  font-weight: 600;
  font-size: 1.15rem;
  margin-bottom: 1.3rem;
  color: var(--text-dark);
}
.next-steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
}
.next-step-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
}
.step-icon {
  font-size: 1.55rem;
  margin-top: 2px;
}
.step-content {
  flex: 1;
}
.step-title {
  font-weight: 500;
  color: var(--text-dark);
  font-size: 1.04rem;
}
.step-desc {
  color: var(--text-light);
  font-size: 0.98rem;
  margin: 0.18rem 0 0.7rem 0;
}
.step-btn {
  padding: 0.5rem 1.3rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}
.step-btn.primary {
  background: var(--primary-color);
  color: #fff;
}
.step-btn.primary:hover {
  background: var(--primary-color-dark);
}
.step-btn.secondary {
  background: var(--bg-light);
  color: var(--primary-color-dark);
  border: 1px solid var(--primary-color);
}
.step-btn.secondary:hover {
  background: var(--primary-color);
  color: #fff;
}
@media (max-width: 1024px) {
  .dashboard-container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding: 1.3rem 1rem;
  }
  .main-content {
    padding: 1.5rem 1rem;
  }
  .module-block-expanded,
  .next-steps {
    padding: 1rem;
  }
}
@media (max-width: 768px) {
  .dashboard-card,
  .welcome-banner,
  .module-block {
    padding: 1rem;
  }
  .dashboard-info {
    flex-direction: column;
    gap: 1rem;
  }
  .modules-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
