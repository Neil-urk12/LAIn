<script setup lang="ts">
import { onMounted, ref, computed, defineAsyncComponent } from 'vue';
const CourseCard = defineAsyncComponent(() => import('../Global/CourseCard.vue'));
import { useEnrollmentStore } from '@/stores/enrollment';
import { pb } from '../../pocketbase/pocketbase';

defineOptions({ name: 'ContinueLearning' });

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
const isLoading = ref(true);

const filteredEnrolledCourses = computed(() => {
  return enrolledCourses.value.filter(course =>
    course.id && course.title && course.difficulty
  );
});

onMounted(async () => {
  await enrollmentStore.fetchEnrolledCourses();
  enrolledCourses.value = enrollmentStore.enrollments.map(enrollment => ({
    id: enrollment.expand?.courseId.id ?? '',
    title: enrollment.expand?.courseId.title ?? '',
    difficulty: enrollment.expand?.courseId.level ?? '',
    progress: enrollment.progress,
    lastAccessedDate: enrollment.updatedAt,
    thumbnail: `${pb.baseUrl}/api/files/courses/${enrollment.expand?.courseId.id}/${enrollment.expand?.courseId.courseImage}`,
  }));
  console.log('Enrolled Courses:', enrolledCourses.value);
  isLoading.value = false;
});
</script>

<template>
  <section class="continue-learning">
    <h2>Continue Learning</h2>
    <div class="courses-grid" v-if="!isLoading">
      <CourseCard
        v-for="course in filteredEnrolledCourses"
        :key="course.id"
        :title="course.title"
        :difficulty="course.difficulty"
        :progress="course.progress"
        :lastAccessedDate="course.lastAccessedDate"
        :thumbnail="course.thumbnail"
      />
    </div>
    <div v-else>
      Loading enrolled courses...
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
