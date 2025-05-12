<script setup lang="ts">
import { computed, defineAsyncComponent, defineProps } from 'vue';
const CourseCard = defineAsyncComponent(() => import('../Global/CourseCard.vue'));

defineOptions({ name: 'ContinueLearning' });

interface EnrolledCourseDisplay {
  id: string;
  title: string;
  difficulty: string;
  progress: number;
  lastAccessedDate: string;
  thumbnail: string | undefined;
}

const props = defineProps<{
  enrolledCourses: EnrolledCourseDisplay[];
}>();

const filteredEnrolledCourses = computed(() => {
  return props.enrolledCourses.filter(course =>
    course.id && course.title && course.difficulty
  );
});
</script>

<template>
  <section class="continue-learning">
    <h2>Continue Learning</h2>
    <div class="courses-grid">
      <CourseCard
        v-for="course in filteredEnrolledCourses"
        :key="course.id"
        :id="course.id"
        :title="course.title"
        :difficulty="course.difficulty"
        :progress="course.progress"
        :lastAccessedDate="course.lastAccessedDate"
        :thumbnail="course.thumbnail"
      />
    </div>
  </section>
</template>

<style scoped>
.continue-learning {
  margin: 30px 0;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 15px;
}
</style>
