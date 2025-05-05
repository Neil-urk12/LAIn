<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon, SearchIcon } from 'lucide-vue-next';
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

const handleAddUserClick = () => {
  showAddUserModal.value = true;
};

const handleUserCreated = () => {
  // Refresh the users list
  adminStore.fetchUsers();
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
      <button class="btn btn-secondary">Filter</button>
    </div>

    <!-- User Table Component -->
    <UserTable
      :users="users"
      :loading="loading"
      :searchTerm="searchTerm"
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
