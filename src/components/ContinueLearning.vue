<template>
  <section class="continue-learning">
    <h2>Continue Learning</h2>
    <div class="courses-grid">
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  </section>
</template>

<script setup lang="ts">
import CourseCard from './CourseCard.vue'

defineOptions({ name: 'ContinueLearning' })
</script>

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
