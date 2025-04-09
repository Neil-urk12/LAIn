<template>
  <section class="recommended">
    <h2>Recommended for You</h2>
    <p>Based on your interests and progress</p>
    <ul>
      <li>
        <div class="thumb"></div>
        <div class="info">
          <strong>Computer Vision with TensorFlow</strong>
          <div class="meta">8 weeks • Intermediate</div>
        </div>
      </li>
      <li>
        <div class="thumb"></div>
        <div class="info">
          <strong>Natural Language Processing</strong>
          <div class="meta">6 weeks • Advanced</div>
        </div>
      </li>
    </ul>
    <button class="view-all-btn">View All Recommendations</button>
  </section>
</template>

<script setup lang="ts">
defineOptions({ name: 'RecommendedCourses' })
</script>

<style scoped>
.recommended {
  margin: 30px 0;
}

.recommended h2 {
  margin-bottom: 5px;
}

.recommended p {
  margin-bottom: 20px;
  color: #555;
}

.recommended ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.recommended li {
  display: flex;
  gap: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.thumb {
  width: 50px;
  height: 50px;
  background: #eee;
  border-radius: 6px;
}

.info {
  flex: 1;
}

.meta {
  font-size: 12px;
  color: #555;
  margin-top: 4px;
}

.view-all-btn {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.view-all-btn:hover {
  background: #f9f9f9;
}
</style>
