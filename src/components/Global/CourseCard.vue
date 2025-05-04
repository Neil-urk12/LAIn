<script setup lang="ts">
import { defineProps } from 'vue';

defineOptions({ name: 'CourseCard' });

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  lastAccessedDate: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <div class="course-card">
    <div class="thumbnail" :style="{ backgroundImage: thumbnail ? 'url(' + thumbnail + ')' : 'none' }"></div>
    <div class="info">
      <div class="top-row">
        <span :class="['badge', props.difficulty.toLowerCase()]">{{ props.difficulty }}</span>
        <span class="date">{{ props.lastAccessedDate }}</span>
      </div>
      <h3>{{ props.title }}</h3>
      <div class="progress-row">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: props.progress + '%' }"></div>
        </div>
        <span class="percent">{{ props.progress }}%</span>
      </div>
      <button>Continue Learning</button>
    </div>
  </div>
</template>

<style scoped>
.course-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.thumbnail {
  background: var(--border-color);
  height: 250px;
  display: flex;
  align-items: center;
  background-size: cover;
  justify-content: center;
}

.info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-light);
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.badge.beginner {
  background: var(--primary-color);
  color: var(--bg-white);
}

.badge.intermediate {
  background: var(--primary-color-dark);
  color: var(--bg-white);
}

.badge.advanced {
  background: var(--primary-color-dark);
  color: var(--bg-white);
}

h3 {
  font-size: 16px;
  margin: 0;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  background: var(--border-color);
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  background: var(--primary-color);
  height: 100%;
}

.percent {
  font-size: 12px;
}

button {
  background: var(--primary-color);
  color: var(--bg-white);
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: var(--primary-color-dark);
}
</style>
