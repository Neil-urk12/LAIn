<script setup lang="ts">
import { ref, reactive } from 'vue';
import { PlusIcon, SearchIcon, FilterIcon, XIcon } from 'lucide-vue-next';
import type { User } from '@/models/interfaces';
import UserTable from './Tables/UserTable.vue';
import AddUserModal from './Modals/AddUserModal.vue';
import { useAdminStore } from '@/stores/admin';

// Define props
defineProps<{
  users: User[];
  loading: boolean;
}>();

const adminStore = useAdminStore();
const searchTerm = ref('');
const showAddUserModal = ref(false);
const showFilterDropdown = ref(false);

// Filter state
const filters = reactive({
  role: '',
  status: ''
});

const handleAddUserClick = () => {
  showAddUserModal.value = true;
};

const handleUserCreated = () => {
  // Refresh the users list
  adminStore.fetchUsers();
};

const toggleFilterDropdown = () => {
  showFilterDropdown.value = !showFilterDropdown.value;
};

const clearFilters = () => {
  filters.role = '';
  filters.status = '';
};
</script>

<template>
  <div class="user-management-container section-padding">
    <div class="header">
      <div>
        <h1>User Management</h1>
        <p>Manage user accounts, permissions, and course enrollments</p>
      </div>
      <button class="btn btn-primary add-user-btn" @click="handleAddUserClick">
        <PlusIcon :size="16" /> Add User
      </button>
    </div>

    <div class="controls">
      <div class="search-bar">
        <SearchIcon :size="16" class="search-icon" />
        <input type="text" v-model="searchTerm" placeholder="Search users..." />
      </div>
      <div class="filter-container">
        <button class="btn btn-secondary" @click="toggleFilterDropdown">
          <FilterIcon :size="16" class="filter-icon" />
          Filter
        </button>

        <!-- Filter dropdown -->
        <div v-if="showFilterDropdown" class="filter-dropdown">
          <div class="filter-header">
            <h3>Filter Users</h3>
            <button class="close-btn" @click="toggleFilterDropdown">
              <XIcon :size="16" />
            </button>
          </div>

          <div class="filter-body">
            <div class="filter-group">
              <label for="role-filter">Role</label>
              <select id="role-filter" v-model="filters.role">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div class="filter-group">
              <label for="status-filter">Status</label>
              <select id="status-filter" v-model="filters.status">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="filter-footer">
            <button class="btn-text" @click="clearFilters">Clear Filters</button>
            <button class="btn-primary" @click="toggleFilterDropdown">Apply</button>
          </div>
        </div>
      </div>
    </div>

    <!-- User Table Component -->
    <UserTable
      :users="users"
      :loading="loading"
      :searchTerm="searchTerm"
      :roleFilter="filters.role"
      :statusFilter="filters.status"
    />

    <!-- Add User Modal -->
    <AddUserModal
      :show="showAddUserModal"
      @close="showAddUserModal = false"
      @created="handleUserCreated"
    />
  </div>
</template>

<style scoped>
.user-management-container {
  width: 100%;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* Mimic card appearance */
  padding: calc(var(--spacing-unit) * 4); /* Override section-padding if needed */
  height: 100%;
  display: flex;
  flex-direction: column;
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

/* Filter styles */
.filter-container {
  position: relative;
}

.filter-icon {
  margin-right: 6px;
}

.filter-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background-color: var(--bg-white);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.filter-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.close-btn:hover {
  background-color: var(--bg-light);
  color: var(--text-dark);
}

.filter-body {
  padding: 16px;
}

.filter-group {
  margin-bottom: 16px;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-medium);
}

.filter-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-white);
  color: var(--text-dark);
  font-size: 0.9rem;
}

.filter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.btn-text {
  background: none;
  border: none;
  color: var(--text-medium);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0;
}

.btn-text:hover {
  color: var(--text-dark);
  text-decoration: underline;
}

/* Dark mode styles for filter */
html.dark .filter-dropdown {
  background-color: #1f2937;
  border-color: #374151;
}

html.dark .filter-header {
  border-color: #374151;
}

html.dark .filter-group select {
  background-color: #111827;
  border-color: #374151;
  color: #f9fafb;
}

html.dark .close-btn:hover {
  background-color: #374151;
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
  .filter-dropdown {
    width: 100%;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    max-height: 80vh;
    overflow-y: auto;
  }
}
</style>
