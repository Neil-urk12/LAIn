<template>
  <div class="course-card">
    <div class="thumbnail"></div>
    <div class="info">
      <div class="top-row">
        <span class="badge beginner">Beginner</span>
        <span class="date">Yesterday</span>
      </div>
      <h3>Introduction to Artificial Intelligence</h3>
      <div class="progress-row">
        <div class="progress-bar">
          <div class="progress-fill" style="width: 75%;"></div>
        </div>
        <span class="percent">75%</span>
      </div>
      <button>Continue Learning</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'CourseCard' })
</script>

<style scoped>
.course-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.thumbnail {
  background: #eee;
  height: 150px;
  display: flex;
  align-items: center;
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
  color: #555;
}

.badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.badge.beginner {
  background: #d1fae5;
  color: #059669;
}

.badge.intermediate {
  background: #bfdbfe;
  color: #2563eb;
}

.badge.advanced {
  background: #f3e8ff;
  color: #7c3aed;
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
  background: #ddd;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  background: #000;
  height: 100%;
}

.percent {
  font-size: 12px;
}

button {
  background: #059669;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #047857;
}
</style>
