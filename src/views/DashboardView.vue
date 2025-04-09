<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const StatsCards = defineAsyncComponent(() => import('../components/DashboardView/StatsCards.vue'))
const ContinueLearning = defineAsyncComponent(() => import('../components/DashboardView/ContinueLearning.vue'))
const LearningPath = defineAsyncComponent(() => import('../components/DashboardView/LearningPath.vue'))
const Recommended = defineAsyncComponent(() => import('../components/DashboardView/Recommended.vue'))
</script>

<template>
  <main style="padding: 10px;">
    <section class="header">
      <h1>Welcome back, Cez!</h1>
      <p>Here's what's happening with your learning journey today.</p>
    </section>

    <StatsCards />

    <ContinueLearning />

    <LearningPath />

    <Recommended />

    <section class="bottom-section">
      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="tabs">
          <button class="active">All</button>
          <button>Courses</button>
          <button>Achievements</button>
        </div>
        <ul class="activity-list">
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>Completed lesson 5 in Introduction to Artificial Intelligence</p>
              <span class="time">Today, 10:30 AM</span>
            </div>
          </li>
          <li>
            <span class="icon">🏆</span>
            <div class="activity-details">
              <p>Earned 'Fast Learner' badge for completing 3 lessons in a day</p>
              <span class="time">Yesterday, 3:45 PM</span>
            </div>
          </li>
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>Started new course: Deep Learning Specialization</p>
              <span class="time">2 days ago</span>
            </div>
          </li>
          <li>
            <span class="icon">🏆</span>
            <div class="activity-details">
              <p>Reached a 10-day learning streak</p>
              <span class="time">3 days ago</span>
            </div>
          </li>
          <li>
            <span class="icon">📘</span>
            <div class="activity-details">
              <p>Submitted project: Image Classification with Neural Networks</p>
              <span class="time">1 week ago</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="account-settings">
        <h3>Account Settings</h3>
        <div class="avatar"></div>
        <div class="name">John Doe</div>
        <div class="role">AI Enthusiast</div>
        <button>Edit Profile</button>
        <button>Account Settings</button>
        <button>Subscription</button>
        <button>Back to Home</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.header h1 {
  margin: 0;
  font-size: 24px;
}

.header p {
  margin: 5px 0 20px;
  color: #555;
}
.bottom-section {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.recent-activity {
  flex: 2;
  background: var(--color-background-soft);
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.recent-activity h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 6px 12px;
  border: none;
  background: var(--color-background-mute);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tabs button.active {
  background: var(--color-background-soft);
  font-weight: bold;
}

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-list li {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.activity-list li:last-child {
  border-bottom: none;
}

.icon {
  font-size: 20px;
  flex-shrink: 0;
}

.activity-details p {
  margin: 0;
  font-size: 14px;
}

.activity-details .time {
  font-size: 12px;
  color: #555;
}

.account-settings {
  flex: 1;
  background: var(--color-background-soft);
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 220px;
}

.account-settings h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.account-settings .avatar {
  width: 60px;
  height: 60px;
  background: #eee;
  border-radius: 50%;
}

.account-settings .name {
  font-weight: bold;
}

.account-settings .role {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

@media (max-width: 767px) {
  main {
    padding: 15px;
  }

  .header h1 {
    font-size: 20px;
  }

  .bottom-section {
    flex-direction: column;
    gap: 15px;
  }

  .recent-activity,
  .account-settings {
    flex: none;
    min-width: auto;
    width: 100%;
  }

  .account-settings {
    align-items: flex-start;
  }

  .account-settings button {
     max-width: 250px;
  }
}

.account-settings button {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: var(--color-background-soft);
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.account-settings button:hover {
  background: var(--color-background-mute);
}
</style>
