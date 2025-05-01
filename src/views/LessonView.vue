<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { pb } from "../pocketbase/pocketbase";
import type { Lessons, Courses } from "../models/interfaces";
import { useEnrollmentStore } from "../stores/enrollment";

const route = useRoute();
const router = useRouter();
const enrollmentStore = useEnrollmentStore();

const courseId = route.params.courseId as string;
const lessonId = route.params.lessonId as string;

const isLoading = ref(true);
const lesson = ref<Lessons | null>(null);
const allLessons = ref<Lessons[]>([]);
const course = ref<Courses | null>(null);

// Computed properties for navigation
const currentLessonIndex = computed(() => {
  if (!lesson.value || !allLessons.value.length) return -1;
  return allLessons.value.findIndex(l => l.id === lesson.value!.id);
});

const previousLesson = computed(() => {
  if (currentLessonIndex.value <= 0) return null;
  return allLessons.value[currentLessonIndex.value - 1];
});

const nextLesson = computed(() => {
  if (currentLessonIndex.value === -1 || currentLessonIndex.value >= allLessons.value.length - 1) return null;
  return allLessons.value[currentLessonIndex.value + 1];
});

// Load data
onMounted(async () => {
  try {
    // Fetch all lessons for this course
    allLessons.value = await pb.collection<Lessons>("lessons").getFullList({
      filter: `courseId="${courseId}"`,
      sort: "order"
    });
    
    // Fetch current lesson
    lesson.value = await pb.collection<Lessons>("lessons").getOne(lessonId);
    
    // Fetch course data
    course.value = await pb.collection<Courses>("courses").getOne(courseId);
    console.log(lesson.value)
    // Update enrollment progress if needed
    await updateProgress();
  } catch (error) {
    console.error("Error loading lesson:", error);
    router.replace({ name: "course-dashboard", params: { id: courseId } });
  } finally {
    isLoading.value = false;
  }
});

// Navigation functions
const goToNextLesson = () => {
  if (!nextLesson.value) return;
  router.push({
    name: "lesson",
    params: { courseId, lessonId: nextLesson.value.id }
  });
};

const goToPreviousLesson = () => {
  if (!previousLesson.value) return;
  router.push({
    name: "lesson",
    params: { courseId, lessonId: previousLesson.value.id }
  });
};

const goToCourse = () => {
  router.push({
    name: "course-dashboard",
    params: { id: courseId }
  });
};

// Mark lesson as completed and update progress
const markAsCompleted = async () => {
  if (!enrollmentStore.currentEnrollment) return;
  
  // Update progress in enrollment
  const currentProgress = enrollmentStore.currentEnrollment.progress || 0;
  const newProgress = Math.max(currentProgress, currentLessonIndex.value + 1);
  
  try {
    await pb.collection("enrollments").update(enrollmentStore.currentEnrollment.id, {
      progress: newProgress
    });
    
    // Refresh enrollment data
    await enrollmentStore.fetchByCourse(courseId);
    
    // Navigate to next lesson if available
    if (nextLesson.value) {
      goToNextLesson();
    }
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};

// Update progress if current lesson is beyond current progress
const updateProgress = async () => {
  if (!enrollmentStore.currentEnrollment) return;
  
  const currentProgress = enrollmentStore.currentEnrollment.progress || 0;
  if (currentLessonIndex.value + 1 > currentProgress) {
    try {
      await pb.collection("enrollments").update(enrollmentStore.currentEnrollment.id, {
        progress: currentLessonIndex.value + 1
      });
      
      // Refresh enrollment data
      await enrollmentStore.fetchByCourse(courseId);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }
};
</script>

<template>
  <div class="lesson-view">
    <div v-if="isLoading" class="loading">
      <p>Loading lesson...</p>
    </div>
    
    <template v-else>
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumbs">
        <router-link to="/dashboard">Dashboard</router-link> >
        <router-link to="/courses">Courses</router-link> >
        <router-link :to="{ name: 'course-dashboard', params: { id: courseId } }">{{ course?.title }}</router-link> >
        <span>{{ lesson?.title }}</span>
      </nav>
      
      <!-- Lesson Content -->
      <div class="lesson-container">
        <div class="lesson-header">
          <h1>{{ lesson?.title }}</h1>
          <div class="lesson-meta">
            <span>Lesson {{ currentLessonIndex + 1 }} of {{ allLessons.length }}</span>
          </div>
        </div>
        
        <div class="lesson-content">
          <!-- This would ideally use a rich text renderer or markdown parser -->
          <!-- Render rich content from Pocketbase -->
          <div v-html="lesson?.richContent"></div>
        </div>
        
        <!-- Lesson Navigation -->
        <div class="lesson-navigation">
          <button 
            class="nav-button previous" 
            :disabled="!previousLesson" 
            @click="goToPreviousLesson"
          >
            ← Previous Lesson
          </button>
          
          <button class="nav-button course" @click="goToCourse">
            Back to Course
          </button>
          
          <button 
            v-if="nextLesson" 
            class="nav-button next" 
            @click="markAsCompleted"
          >
            Complete & Continue →
          </button>
          
          <button 
            v-else 
            class="nav-button complete" 
            @click="markAsCompleted"
          >
            Complete Lesson
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.lesson-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

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

.lesson-container {
  background: var(--bg-white);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 30px;
}

.lesson-header {
  margin-bottom: 30px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.lesson-header h1 {
  margin: 0 0 10px 0;
  font-size: 28px;
}

.lesson-meta {
  color: var(--text-light);
  font-size: 14px;
}

.lesson-content {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.nav-button {
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-button.previous {
  background: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.nav-button.course {
  background: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.nav-button.next, .nav-button.complete {
  background: var(--primary-color);
  color: white;
  border: none;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>
