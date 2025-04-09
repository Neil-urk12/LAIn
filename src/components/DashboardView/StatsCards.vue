<template>
  <div class="stats-cards">
    <div class="card">
      <div class="label">Courses in Progress</div>
      <div class="bottom-row">
        <div class="number">3</div>
        <span class="badge active">Active</span>
      </div>
    </div>
    <div class="card">
      <div class="label">Completed Courses</div>
      <div class="bottom-row">
        <div class="number">7</div>
      </div>
    </div>
    <div class="card">
      <div class="label">Learning Streak</div>
      <div class="bottom-row">
        <div class="number">12</div>
        <span class="subtext">days</span>
      </div>
    </div>
    <div class="card">
      <div class="label">Certificates Earned</div>
      <div class="bottom-row">
        <div class="number">4</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'StatsCards' })
</script>

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
