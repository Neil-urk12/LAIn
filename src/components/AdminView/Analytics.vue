<template>
  <main class="main-content">
    <!-- Header -->
    <header class="main-header">
      <div class="search-bar">
        <Search class="search-icon" />
        <input type="text" placeholder="Search analytics..." />
      </div>
      <div class="header-actions">
        <button class="icon-button" @click="refreshData">
          <RefreshCw class="header-icon" />
        </button>
        <button class="icon-button" @click="exportData">
          <Download class="header-icon" />
        </button>
      </div>
    </header>

    <!-- Analytics Content -->
    <div class="dashboard-body">
      <h1 class="dashboard-title">Analytics Dashboard</h1>
      <p class="dashboard-subtitle">Insights and metrics to track platform performance.</p>

      <!-- Time Period Filter -->
      <div class="filter-controls">
        <div class="date-range">
          <label>Time Period:</label>
          <select v-model="timePeriod" @change="updateCharts">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>

      <!-- Summary Metrics -->
      <div v-if="loading" class="loading-container">
        <Loader :size="32" class="loading-spinner" />
        <p>Loading analytics data...</p>
      </div>

      <div v-else class="stats-grid">
        <div class="stat-card" v-for="stat in summaryStats" :key="stat.title">
          <div class="stat-info">
            <p class="stat-title">{{ stat.title }}</p>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-change" :class="{ 'negative': stat.isNegative }">
              <component :is="stat.isNegative ? ArrowDown : ArrowUp" class="change-icon" />
              <span>{{ stat.change }}</span>
            </p>
          </div>
          <div class="stat-icon-wrapper">
            <component :is="stat.icon" class="stat-icon" />
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <!-- Enrollment Trends -->
        <div class="chart-card">
          <h2 class="card-title">Enrollment Trends</h2>
          <div class="chart-container" ref="enrollmentChart">
            <div v-if="loading" class="chart-loading">
              <Loader :size="24" class="loading-spinner" />
            </div>
            <div v-else class="chart-placeholder">
              <BarChart class="chart-icon" />
              <p>Enrollment data visualization will appear here</p>
            </div>
          </div>
        </div>

        <!-- User Activity -->
        <div class="chart-card">
          <h2 class="card-title">User Activity</h2>
          <div class="chart-container" ref="userActivityChart">
            <div v-if="loading" class="chart-loading">
              <Loader :size="24" class="loading-spinner" />
            </div>
            <div v-else class="chart-placeholder">
              <LineChart class="chart-icon" />
              <p>User activity data visualization will appear here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Courses and User Demographics -->
      <div class="data-tables-section">
        <!-- Top Courses -->
        <div class="data-table-card">
          <h2 class="card-title">Top Courses</h2>
          <div class="table-container">
            <table class="analytics-table">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Enrollments</th>
                  <th>Completion Rate</th>
                  <th>Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="course in topCourses" :key="course.id">
                  <td>{{ course.title }}</td>
                  <td>{{ course.enrollments }}</td>
                  <td>{{ course.completionRate }}%</td>
                  <td class="growth-cell" :class="{ 'negative': course.isNegative }">
                    <span class="growth-indicator">
                      <component :is="course.isNegative ? ArrowDown : ArrowUp" :size="16" />
                      {{ course.growth }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- User Engagement -->
        <div class="data-table-card">
          <h2 class="card-title">User Engagement</h2>
          <div class="table-container">
            <table class="analytics-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="metric in engagementMetrics" :key="metric.name">
                  <td>{{ metric.name }}</td>
                  <td>{{ metric.value }}</td>
                  <td class="growth-cell" :class="{ 'negative': metric.isNegative }">
                    <span class="growth-indicator">
                      <component :is="metric.isNegative ? ArrowDown : ArrowUp" :size="16" />
                      {{ metric.change }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineComponent, watch } from 'vue';
import {
  Search,
  RefreshCw,
  Download,
  BarChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Loader
} from 'lucide-vue-next';
import { useAdminStore } from '@/stores/admin';
import { useEnrollmentStore } from '@/stores/enrollment';

// Define component name
defineComponent({
  name: 'AnalyticsDashboard'
});

// Use stores with type assertion to avoid linter errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adminStore = useAdminStore() as any;
// We'll use enrollmentStore in future implementations
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const enrollmentStore = useEnrollmentStore() as any;

const loading = ref(true);
const timePeriod = ref('30days');
const enrollmentChart = ref(null);
const userActivityChart = ref(null);

// Use data from the admin store
const summaryStats = computed(() => adminStore.analytics.summaryStats);
const topCourses = computed(() => adminStore.analytics.topCourses);
const engagementMetrics = computed(() => adminStore.analytics.engagementMetrics);
const enrollmentTrends = computed(() => adminStore.analytics.enrollmentTrends);
const userActivity = computed(() => adminStore.analytics.userActivity);

// Methods
const fetchAnalyticsData = async () => {
  loading.value = true;
  try {
    // Use the store's fetchAnalytics method to get real data
    await adminStore.fetchAnalytics(timePeriod.value);
    
    // After data is loaded, you'd update the charts
    initCharts();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
  } finally {
    loading.value = false;
  }
};

const refreshData = () => {
  fetchAnalyticsData();
};

const exportData = () => {
  alert('Data export functionality would be implemented here');
  // In a real implementation, this would generate a CSV/Excel file with the analytics data
};

const updateCharts = () => {
  fetchAnalyticsData();
};

const initCharts = () => {
  // In a real implementation, this would initialize charts using a library
  // like Chart.js, ApexCharts, or D3.js with real data
  console.log('Charts initialized with data:');
  console.log('Enrollment Trends:', enrollmentTrends.value);
  console.log('User Activity:', userActivity.value);
};

// Watch for changes in store loading state
watch(() => adminStore.loading.analytics, (newValue) => {
  loading.value = newValue;
});

onMounted(() => {
  fetchAnalyticsData();
});
</script>

<style scoped>
/* Main Content Area */
.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Header */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
  background-color: var(--bg-white, #ffffff);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: calc(var(--spacing-unit) * 1.5);
  width: 20px;
  height: 20px;
  color: var(--text-light, #6b7280);
}

.search-bar input {
  padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 5);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  min-width: 300px;
  font-size: 0.875rem;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary-color, #10b981);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 2);
}

.icon-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-light, #6b7280);
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.icon-button:hover {
  color: var(--text-dark, #1f2937);
  background-color: var(--bg-light, #f9fafb);
}

.header-icon {
  width: 20px;
  height: 20px;
}

/* Dashboard Body */
.dashboard-body {
  padding: calc(var(--spacing-unit) * 4);
  flex-grow: 1;
  overflow-y: auto;
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.dashboard-subtitle {
  font-size: 1rem;
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

/* Filter Controls */
.filter-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.date-range {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
}

.date-range label {
  font-size: 0.875rem;
  color: var(--text-dark, #1f2937);
  font-weight: 500;
}

.date-range select {
  padding: calc(var(--spacing-unit) * 0.75) calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--bg-white, #ffffff);
  color: var(--text-dark, #1f2937);
}

.date-range select:focus {
  outline: none;
  border-color: var(--primary-color, #10b981);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.stat-card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-title {
  font-size: 0.875rem;
  color: var(--text-light, #6b7280);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 1);
  line-height: 1.2;
}

.stat-change {
  font-size: 0.875rem;
  color: #10b981;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.stat-change.negative {
  color: #ef4444;
}

.change-icon {
  width: 16px;
  height: 16px;
  margin-right: calc(var(--spacing-unit) * 0.5);
}

.stat-icon-wrapper {
  background-color: #e6f9f2;
  border-radius: 50%;
  padding: calc(var(--spacing-unit) * 1.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color-dark, #059669);
}

/* Charts Section */
.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 4);
}

.chart-card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: calc(var(--spacing-unit) * 2);
}

.chart-container {
  height: 300px;
  position: relative;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-light, #f9fafb);
  border-radius: 6px;
  color: var(--text-light, #6b7280);
}

.chart-icon {
  width: 48px;
  height: 48px;
  opacity: 0.5;
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.chart-loading {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Data Tables Section */
.data-tables-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
}

.data-table-card {
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 3);
}

.table-container {
  overflow-x: auto;
}

.analytics-table {
  width: 100%;
  border-collapse: collapse;
}

.analytics-table th {
  padding: calc(var(--spacing-unit) * 1.5);
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light, #6b7280);
  border-bottom: 2px solid var(--border-color, #e5e7eb);
}

.analytics-table td {
  padding: calc(var(--spacing-unit) * 1.5);
  font-size: 0.875rem;
  color: var(--text-dark, #1f2937);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
}

.growth-cell {
  color: #10b981;
}

.growth-cell.negative {
  color: #ef4444;
}

.growth-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Loading Container */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 6) 0;
  margin-bottom: calc(var(--spacing-unit) * 4);
  background-color: var(--bg-white, #ffffff);
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  color: var(--text-light);
}

.loading-spinner {
  animation: spin 1.5s linear infinite;
  margin-bottom: calc(var(--spacing-unit) * 2);
  color: var(--primary-color);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Dark mode styles */
html.dark .main-header,
html.dark .stat-card,
html.dark .chart-card,
html.dark .data-table-card {
  background-color: #1f2937;
  border-color: #374151;
}

html.dark .main-header {
  border-bottom-color: #374151;
}

html.dark .search-bar input,
html.dark .date-range select {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .search-bar input::placeholder {
  color: #9ca3af;
}

html.dark .search-icon,
html.dark .icon-button {
  color: #9ca3af;
}

html.dark .icon-button:hover {
  color: #f9fafb;
  background-color: #374151;
}

html.dark .dashboard-title,
html.dark .stat-value,
html.dark .card-title {
  color: #f9fafb;
}

html.dark .dashboard-subtitle,
html.dark .stat-title,
html.dark .date-range label {
  color: #9ca3af;
}

html.dark .stat-icon-wrapper {
  background-color: #064e3b;
}

html.dark .stat-icon {
  color: #a7f3d0;
}

html.dark .chart-placeholder {
  background-color: #374151;
  color: #9ca3af;
}

html.dark .analytics-table th {
  color: #9ca3af;
  border-bottom-color: #4b5563;
}

html.dark .analytics-table td {
  color: #f3f4f6;
  border-bottom-color: #374151;
}

html.dark .loading-container {
  background-color: #1f2937;
  border-color: #374151;
  color: #9ca3af;
}

html.dark .loading-spinner {
  color: #34d399;
}
</style>
