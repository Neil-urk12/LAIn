<script setup lang="ts">
import { computed, ref } from 'vue';
import { MoreVerticalIcon, Loader } from 'lucide-vue-next';
import type { User } from '@/models/interfaces';

// Define props
const props = defineProps<{
  users: User[];
  loading: boolean;
  searchTerm: string;
}>();

// Computed property for filtered users
const filteredUsers = computed(() => {
  if (!props.searchTerm) {
    return props.users;
  }
  const lowerSearchTerm = props.searchTerm.toLowerCase();
  return props.users.filter(user =>
    user.name.toLowerCase().includes(lowerSearchTerm) ||
    user.email.toLowerCase().includes(lowerSearchTerm) ||
    user.role.toLowerCase().includes(lowerSearchTerm)
  );
});

// Helper functions for styling
const getRoleTagClass = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'admin': return 'tag-purple';
    case 'instructor': return 'tag-blue';
    case 'student': return 'tag-gray'; // Assuming a default/gray tag style might be needed
    default: return 'tag-gray';
  }
};

const getStatusTagClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active': return 'tag-green';
    case 'inactive': return 'tag-red'; // Need to define tag-red
    default: return 'tag-gray';
  }
};
</script>

<template>
  <div class="user-table-wrapper">
    <div v-if="loading" class="loading-container">
      <Loader :size="32" class="loading-spinner" />
      <p>Loading users...</p>
    </div>

    <table v-else class="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Learning Progress</th>
          <th>Created</th>
          <th></th> <!-- Actions column -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['tag', getRoleTagClass(user.role)]">{{ user.role }}</span>
          </td>
          <td>
            <span :class="['tag', getStatusTagClass(user.verified ? 'active' : 'inactive')]">
              {{ user.verified ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>
            <!-- Display user's learning progress instead of enrolledCourses -->
            <span class="learning-streak">{{ user.learningStreak }} day streak</span>
          </td>
          <td>{{ new Date(user.created).toLocaleDateString() }}</td>
          <td>
            <button class="action-btn">
              <MoreVerticalIcon :size="16" />
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
           <td colspan="7" class="text-center no-results">No users found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Add tag-red and tag-gray if not in global css */
.tag-red {
  background-color: #fee2e2; /* Light red */
  color: #991b1b; /* Dark red */
}
.tag-gray {
 background-color: #f3f4f6; /* Light gray */
 color: #4b5563; /* Medium-dark gray */
}

.tag-purple {
  background-color: #ede9fe; /* Light purple */
  color: #5b21b6; /* Dark purple */
}

.tag-blue {
  background-color: #dbeafe; /* Light blue */
  color: #1e40af; /* Dark blue */
}

.tag-green {
  background-color: #d1fae5; /* Light green */
  color: #065f46; /* Dark green */
}

.user-table-wrapper {
  overflow-x: auto; /* Enable horizontal scrolling on small screens */
}

.user-table {
  width: 100%;
  border-collapse: collapse; /* Remove space between borders */
  margin-top: calc(var(--spacing-unit) * 2);
  font-size: 0.9rem;
  white-space: nowrap; /* Prevent text wrapping in cells */
}

.user-table th,
.user-table td {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle; /* Align cell content vertically */
}

.user-table th {
  font-weight: 500;
  color: var(--text-light);
  background-color: var(--bg-light); /* Subtle header background */
  text-transform: capitalize; /* Match mockup */
}

/* Remove bottom border from the last row */
.user-table tbody tr:last-child td {
  border-bottom: none;
}

.user-table td .tag {
  margin-bottom: 0; /* Override global tag margin if needed */
  font-size: 0.7rem; /* Slightly smaller tag */
  padding: calc(var(--spacing-unit) * 0.4) calc(var(--spacing-unit) * 1);
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: calc(var(--spacing-unit) * 0.5);
  border-radius: 4px;
}

.action-btn:hover {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.no-results {
  color: var(--text-light);
  padding: calc(var(--spacing-unit) * 4) 0;
}

/* Loading spinner */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 6) 0;
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

/* Learning streak styling */
.learning-streak {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--text-dark);
}

.learning-streak::before {
  content: '🔥'; /* Fire emoji to represent streak */
  margin-right: 4px;
}

/* Dark mode styles */
html.dark .user-table th {
  background-color: #111827;
  color: #9ca3af;
}

html.dark .user-table td {
  border-bottom-color: #374151;
  color: #f3f4f6;
}

html.dark .action-btn:hover {
  background-color: #374151;
  color: #f9fafb;
}
</style>
