<script setup lang="ts">
</script>

<template>
  <main style="padding: 30px;">
    <h1>Courses</h1>
    <p>Browse and discover AI courses to enhance your skills</p>

    <div class="filters">
      <input type="text" placeholder="Search courses..." class="search-input" />
      <select>
        <option>All Categories</option>
      </select>
      <select>
        <option>All Prices</option>
      </select>
      <select>
        <option>All Levels</option>
      </select>
      <button class="filter-btn">🔍</button>
    </div>

    <div class="tabs">
      <button class="active">All Courses</button>
      <button>My Courses</button>
      <button>In Progress</button>
      <button>Completed</button>
      <button>Saved</button>
    </div>

    <div class="courses-grid">
      <div class="course-card" v-for="n in 6" :key="n">
        <div class="course-image"></div>
        <div class="course-content">
          <div class="course-header">
            <span class="badge">Beginner</span>
            <span class="rating">⭐ 4.8</span>
          </div>
          <h3>Course Title</h3>
          <p>Short description of the course content goes here.</p>
          <div class="course-footer">
            <span>10 hours • 24 lessons</span>
          </div>
          <div class="course-actions">
            <span class="price">Free</span>
            <a href="#">Enroll Now</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Main content styling */

h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.filters select,
.filter-btn {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  color: var(--text-dark);
  border-radius: 6px;
  background: var(--bg-white);
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 8px 16px;
  border: none;
  background: var(--bg-light);
  color: var(--text-dark);
  border-radius: 20px;
  cursor: pointer;
}

.tabs button.active {
  background: var(--primary-color);
  color: var(--bg-white);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.course-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.course-image {
  background: var(--border-color);
  height: 150px;
}

.course-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: var(--primary-color);
  color: var(--bg-white);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.rating {
  font-size: 14px;
}

.course-content h3 {
  margin: 0;
  font-size: 16px;
}

.course-content p {
  font-size: 14px;
  color: var(--text-light);
  flex-grow: 1;
}

.course-footer {
  font-size: 12px;
  color: var(--text-light);
}

.course-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
}

.price {
  font-weight: bold;
  color: var(--primary-color);
}

</style>
