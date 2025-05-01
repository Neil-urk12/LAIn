<script setup lang="ts">
import { ref, computed } from 'vue';
import { PlusIcon, SearchIcon, MoreVerticalIcon } from 'lucide-vue-next';

// Define user interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  enrolledCourses: number;
  created: string;
}

const searchTerm = ref('');

const users = ref<User[]>([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', enrolledCourses: 3, created: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', status: 'Active', enrolledCourses: 0, created: '2023-02-20' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Admin', status: 'Active', enrolledCourses: 1, created: '2023-03-10' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Student', status: 'Inactive', enrolledCourses: 2, created: '2023-04-05' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Student', status: 'Active', enrolledCourses: 5, created: '2023-05-12' },
]);

const filteredUsers = computed(() => {
  if (!searchTerm.value) {
    return users.value;
  }
  const lowerSearchTerm = searchTerm.value.toLowerCase();
  return users.value.filter(user =>
    user.name.toLowerCase().includes(lowerSearchTerm) ||
    user.email.toLowerCase().includes(lowerSearchTerm) ||
    user.role.toLowerCase().includes(lowerSearchTerm)
  );
});

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
  <div class="user-management-container section-padding">
    <div class="header">
      <div>
        <h1>User Management</h1>
        <p>Manage user accounts, permissions, and course enrollments</p>
      </div>
      <button class="btn btn-primary add-user-btn">
        <PlusIcon :size="16" /> Add User
      </button>
    </div>

    <div class="controls">
      <div class="search-bar">
        <SearchIcon :size="16" class="search-icon" />
        <input type="text" v-model="searchTerm" placeholder="Search users..." />
      </div>
      <button class="btn btn-secondary">Filter</button>
    </div>

    <div class="user-table-wrapper">
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Enrolled Courses</th>
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
              <span :class="['tag', getStatusTagClass(user.status)]">{{ user.status }}</span>
            </td>
            <td>{{ user.enrolledCourses }}</td>
            <td>{{ user.created }}</td>
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

.user-management-container {
  width: 100%;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* Mimic card appearance */
  padding: calc(var(--spacing-unit) * 4); /* Override section-padding if needed */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
  margin-bottom: calc(var(--spacing-unit) * 4);
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: calc(var(--spacing-unit) * 2);
}

.header h1 {
  margin-bottom: calc(var(--spacing-unit) * 1);
}

.header p {
  margin-bottom: 0;
  color: var(--text-light);
}

.add-user-btn {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
  white-space: nowrap; /* Prevent button text wrapping */
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: calc(var(--spacing-unit) * 3);
  flex-wrap: wrap;
  gap: calc(var(--spacing-unit) * 2);
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1; /* Allow search bar to take available space */
  max-width: 400px; /* Optional: Limit max width */
}

.search-icon {
  position: absolute;
  left: calc(var(--spacing-unit) * 1.5);
  color: var(--text-light);
  pointer-events: none; /* Make icon non-interactive */
}

.search-bar input {
  padding: calc(var(--spacing-unit) * 1.25) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1.25) calc(var(--spacing-unit) * 4.5); /* Left padding for icon */
  border: 1px solid var(--border-color);
  border-radius: 6px;
  width: 100%;
  font-size: 0.9rem;
  background-color: var(--bg-white);
  color: var(--text-dark);
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2); /* Optional focus ring */
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

/* Responsive adjustments if needed */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch; /* Make items full width */
  }
  .add-user-btn {
      width: 100%;
      justify-content: center;
  }
  .controls {
      flex-direction: column;
      align-items: stretch;
  }
  .search-bar {
      max-width: none;
  }
}

</style>
