<script setup lang="ts">
import SideBar from '../components/SideBar.vue'
import StatsCards from '../components/StatsCards.vue'
import ContinueLearning from '../components/ContinueLearning.vue'
import LearningPath from '../components/LearningPath.vue'
import Recommended from '../components/Recommended.vue'
</script>

<template>
  <div class="dashboard-container">
    <SideBar />

    <main class="main-content">
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
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
}

.main-content {
  margin-left: 220px;
  padding: 30px;
  flex: 1;
  background: #f9fafb;
  min-height: 100vh;
  box-sizing: border-box;
}

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
  background: #fff;
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
  background: #f3f4f6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tabs button.active {
  background: #e5e7eb;
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
  background: #fff;
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

.account-settings button {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.account-settings button:hover {
  background: #f9f9f9;
}
</style>
