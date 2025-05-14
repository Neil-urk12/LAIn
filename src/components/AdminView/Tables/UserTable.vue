<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue';
import { MoreVerticalIcon, Loader, Edit, Trash2, KeyIcon, UserCheck, UserX } from 'lucide-vue-next';
import type { User } from '@/models/interfaces';
import { useAdminStore } from '@/stores/admin';
const EditUserModal = defineAsyncComponent(() => import("../Modals/EditUserModal.vue"))
const DeleteUserModal = defineAsyncComponent(() => import("../Modals/DeleteUserModal.vue"))
const ResetPasswordModal = defineAsyncComponent(() => import("../Modals/ResetPasswordModal.vue"))

// Define props
const props = defineProps<{
  users: User[]
  loading: boolean
  searchTerm: string
  roleFilter?: string
  statusFilter?: string
}>();

// Computed property for filtered users
const filteredUsers = computed(() => {
  let result = props.users;

  // Apply search filter
  if (props.searchTerm) {
    const lowerSearchTerm = props.searchTerm.toLowerCase();
    result = result.filter(user =>
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.role.toLowerCase().includes(lowerSearchTerm)
    );
  }

  // Apply role filter
  if (props.roleFilter) {
    result = result.filter(user =>
      user.role.toLowerCase() === props.roleFilter?.toLowerCase()
    );
  }

  if (props.statusFilter) {
    const isActive = props.statusFilter.toLowerCase() === 'active';
    result = result.filter(user => {
      return user.isActive === isActive;
    });
  }

  return result;
})

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

// User actions
const adminStore = useAdminStore();
const selectedUser = ref<User | null>(null);
const showActionsDropdown = ref<string | null>(null);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showResetPasswordModal = ref(false);

const toggleActionsDropdown = (userId: string) => {
  if (showActionsDropdown.value === userId) {
    showActionsDropdown.value = null;
    selectedUser.value = null;
  } else {
    showActionsDropdown.value = userId;
    // Find the user and set it as selected
    selectedUser.value = props.users.find(user => user.id === userId) || null;

    // Position the dropdown after the DOM has updated
    setTimeout(() => {
      positionDropdown(userId);
    }, 0);
  }
};

// Function to position the dropdown correctly
const positionDropdown = (userId: string) => {
  const actionBtn = document.querySelector(`[data-user-id="${userId}"]`) as HTMLElement;
  const dropdown = document.querySelector('.actions-dropdown') as HTMLElement;

  if (!actionBtn || !dropdown) return;

  // Get the button's position
  const btnRect = actionBtn.getBoundingClientRect();
  const tableWrapper = document.querySelector('.user-table-wrapper') as HTMLElement;
  const wrapperRect = tableWrapper.getBoundingClientRect();

  // Position the dropdown next to the button
  dropdown.style.position = 'absolute';
  dropdown.style.top = `${btnRect.top - wrapperRect.top}px`;
  dropdown.style.left = `${btnRect.right - wrapperRect.left + 10}px`; // 10px offset from button
  dropdown.style.transform = 'none';

  // Check if dropdown would go off the bottom of the screen
  const dropdownRect = dropdown.getBoundingClientRect();
  if (dropdownRect.bottom > window.innerHeight) {
    dropdown.style.top = 'auto';
    dropdown.style.bottom = '10px';
  }

  // Check if dropdown would go off the right of the screen
  if (dropdownRect.right > window.innerWidth) {
    dropdown.style.left = 'auto';
    dropdown.style.right = '10px';
  }
};

const closeAllDropdowns = () => {
  showActionsDropdown.value = null;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.actions-container') && showActionsDropdown.value !== null) {
    closeAllDropdowns();
  }
};

// Add and remove event listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleEditClick = (user: User) => {
  selectedUser.value = user;
  showEditModal.value = true;
  closeAllDropdowns();
};

const handleDeleteClick = (user: User) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
  closeAllDropdowns();
};

const handleResetPasswordClick = (user: User) => {
  selectedUser.value = user;
  showResetPasswordModal.value = true;
  closeAllDropdowns();
};

const handleToggleStatusClick = async (user: User) => {
  if (!user || !user.id) {
    console.error('Invalid user or missing ID');
    closeAllDropdowns();
    return;
  }

  try {
    console.log('User object:', user);
    console.log('User ID:', user.id);
    console.log('Toggling isActive from', user.isActive, 'to', !user.isActive);
    
    // Determine which field to update
    const updateData: Partial<User> = {
      // Required fields for PocketBase
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      emailVisibility: user.emailVisibility,
      // Update isActive field
      isActive: !user.isActive
    };
    
    try {
      // Try to update via API with required fields
      await adminStore.updateUser(user.id, updateData);
    } catch (apiError) {
      console.error('API update failed:', apiError);
      
      // Workaround: Update the user in the local state if API call fails
      const userIndex = adminStore.users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        console.log('Updating user in local state instead');
        // Create a new user object with updated status
        const updatedUser = { 
          ...adminStore.users[userIndex],
          isActive: !user.isActive
        };
        
        // Replace the user in the array
        adminStore.users.splice(userIndex, 1, updatedUser);
      }
    }
    
    // Refresh the user list to reflect changes
    await adminStore.fetchUsers();
  } catch (error) {
    console.error('Error in toggle status handler:', error);
  } finally {
    closeAllDropdowns();
  }
};

const handleUserSuccessfullyDeleted = () => {
  // User is already removed from store's state by the deleteUser action
  showDeleteModal.value = false; // Ensure modal is closed
  selectedUser.value = null; // Clear selection
  // Optional: Add a success notification here if desired
  console.log('User deleted successfully.');
};
</script>

<template>
  <div class="user-table-wrapper">
    <div v-if="loading" class="loading-container">
      <Loader :size="32" class="loading-spinner" />
      <p>Loading users...</p>
    </div>

    <table v-else class="user-table">
      <colgroup>
        <col style="width: 18%"> <!-- Name -->
        <col style="width: 22%"> <!-- Email -->
        <col style="width: 12%"> <!-- Role -->
        <col style="width: 12%"> <!-- Status -->
        <col style="width: 15%"> <!-- Learning Progress -->
        <col style="width: 15%"> <!-- Created -->
        <col style="width: 6%"> <!-- Actions -->
      </colgroup>
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
            <span :class="['tag', getStatusTagClass(user.isActive ? 'active' : 'inactive')]">
              {{ user.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>
            <!-- Display user's learning progress instead of enrolledCourses -->
            <span class="learning-streak">{{ user.learningStreak }} day streak</span>
          </td>
          <td>{{ new Date(user.created).toLocaleDateString() }}</td>
          <td class="actions-cell">
            <div class="actions-container">
              <button
                class="action-btn"
                @click="toggleActionsDropdown(user.id)"
                :data-user-id="user.id"
                title="Actions"
              >
                <MoreVerticalIcon :size="16" />
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
           <td :colspan="7" class="text-center no-results">No users found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Backdrop for mobile -->
    <div v-if="showActionsDropdown" class="dropdown-backdrop" @click="closeAllDropdowns"></div>

    <!-- Floating actions dropdown - positioned absolutely -->
    <div v-if="showActionsDropdown && selectedUser" class="actions-dropdown">
      <div class="dropdown-header">
        <span>Actions</span>
        <button class="close-dropdown" @click="closeAllDropdowns">×</button>
      </div>
      <button class="dropdown-item" @click="handleEditClick(selectedUser)">
        <Edit :size="16" />
        <span>Edit User</span>
      </button>
      <button class="dropdown-item" @click="handleResetPasswordClick(selectedUser)">
        <KeyIcon :size="16" />
        <span>Reset Password</span>
      </button>
      <button class="dropdown-item" @click="handleToggleStatusClick(selectedUser)">
        <component :is="selectedUser.isActive ? UserX : UserCheck" :size="16" />
        <span>{{ selectedUser.isActive ? 'Deactivate User' : 'Activate User' }}</span>
      </button>
      <button class="dropdown-item danger" @click="handleDeleteClick(selectedUser)">
        <Trash2 :size="16" />
        <span>Delete User</span>
      </button>
    </div>
  </div>

  <!-- Modals -->
  <EditUserModal
    :user="selectedUser"
    :show="showEditModal"
    @close="showEditModal = false"
    @updated="adminStore.fetchUsers()"
  />

  <DeleteUserModal
    :user="selectedUser"
    :show="showDeleteModal"
    @close="showDeleteModal = false"
    @deleted="handleUserSuccessfullyDeleted"
  />

  <ResetPasswordModal
    :user="selectedUser"
    :show="showResetPasswordModal"
    @close="showResetPasswordModal = false"
    @reset="adminStore.fetchUsers()"
  />
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
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Important for Firefox */
}

.user-table {
  width: 100%;
  border-collapse: collapse; /* Remove space between borders */
  margin-top: calc(var(--spacing-unit) * 2);
  font-size: 0.9rem;
  white-space: nowrap; /* Prevent text wrapping in cells */
  table-layout: fixed; /* Helps with column width distribution */
}

.user-table th,
.user-table td {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle; /* Align cell content vertically */
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative; /* Create stacking context for each cell */
}

/* Ensure rows have proper stacking context */
.user-table tr {
  position: relative;
}

/* Ensure email cells handle overflow properly */
.user-table td:nth-child(2) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.actions-cell {
  position: relative;
  width: 100%;
  min-width: 40px; /* Ensure minimum width for the actions cell */
  z-index: 10; /* Ensure actions cell has higher z-index than other cells */
}

.actions-container {
  position: relative;
  display: flex;
  justify-content: center; /* Center the action button */
}

.action-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: calc(var(--spacing-unit) * 0.75);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  min-width: 32px;
  min-height: 32px;
}

.action-btn:hover, .action-btn:focus {
  background-color: var(--bg-light);
  color: var(--text-dark);
  outline: none;
}

@media (max-width: 768px) {
  .action-btn {
    padding: calc(var(--spacing-unit) * 1);
    min-width: 40px;
    min-height: 40px;
  }
}

.dropdown-backdrop {
  display: none; /* Hidden by default, shown on mobile */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fade-in 0.2s ease-out;
}

.actions-dropdown {
  position: fixed; /* Will be set to absolute by JS */
  width: 180px;
  background-color: var(--bg-white);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000; /* Much higher z-index to ensure it's above all other elements */
  overflow: hidden;
  transform-origin: top left;
  animation: dropdown-fade 0.2s ease-out;
}

.dropdown-header {
  display: flex; /* Always visible for better UX */
  padding: calc(var(--spacing-unit) * 1.5);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  justify-content: space-between;
  align-items: center;
}

.close-dropdown {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  color: var(--text-light);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* No longer needed - positioning is handled by JavaScript */

/* Animation for dropdown */
@keyframes dropdown-fade {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1.5);
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  color: var(--text-dark);
  transition: background-color 0.2s;
  font-size: 0.875rem;
  min-height: 44px; /* Ensure touch-friendly height */
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: var(--bg-light);
  outline: none;
}

.dropdown-item.danger {
  color: #ef4444;
}

.dropdown-item.danger:hover, .dropdown-item.danger:focus {
  background-color: #fee2e2;
}

.dropdown-item svg {
  margin-right: calc(var(--spacing-unit) * 1);
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.dropdown-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Dark mode styles for dropdown */
html.dark .actions-dropdown {
  background-color: #1f2937;
  border-color: #374151;
}

html.dark .dropdown-header {
  border-color: #374151;
  color: #f3f4f6;
}

html.dark .close-dropdown {
  color: #9ca3af;
}

html.dark .close-dropdown:hover {
  color: #f3f4f6;
}

html.dark .dropdown-item {
  color: #f3f4f6;
}

html.dark .dropdown-item:hover,
html.dark .dropdown-item:focus {
  background-color: #374151;
}

html.dark .dropdown-item.danger:hover,
html.dark .dropdown-item.danger:focus {
  background-color: rgba(239, 68, 68, 0.2);
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
  flex: 1;
  min-height: 200px; /* Ensure minimum height even when no data */
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

/* Responsive styles for smaller screens */
@media (max-width: 1024px) {
  .user-table th:nth-child(5), /* Learning Progress */
  .user-table td:nth-child(5) {
    display: none;
  }

  /* Adjust column widths for smaller screens */
  .user-table colgroup col:nth-child(1) { width: 20%; } /* Name */
  .user-table colgroup col:nth-child(2) { width: 30%; } /* Email */
  .user-table colgroup col:nth-child(3) { width: 15%; } /* Role */
  .user-table colgroup col:nth-child(4) { width: 15%; } /* Status */
  .user-table colgroup col:nth-child(6) { width: 15%; } /* Created */
  .user-table colgroup col:nth-child(7) { width: 5%; } /* Actions */
}

@media (max-width: 768px) {
  .user-table th:nth-child(6), /* Created */
  .user-table td:nth-child(6) {
    display: none;
  }

  /* Adjust column widths for mobile screens */
  .user-table colgroup col:nth-child(1) { width: 30%; } /* Name */
  .user-table colgroup col:nth-child(2) { width: 40%; } /* Email */
  .user-table colgroup col:nth-child(3) { width: 15%; } /* Role */
  .user-table colgroup col:nth-child(4) { width: 15%; } /* Status */

  /* Show backdrop on mobile */
  .dropdown-backdrop {
    display: block;
  }

  /* Header is now always visible */

  /* Improve dropdown positioning on mobile */
  .actions-dropdown {
    position: fixed !important; /* Override any inline styles */
    top: auto !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100%;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1050;
    transform-origin: bottom center;
    animation: slide-up 0.3s ease-out;
    max-height: 80vh; /* Prevent dropdown from taking full height */
    overflow-y: auto; /* Allow scrolling if many actions */
    transform: none !important;
  }

  /* Mobile dropdown animation */

  .dropdown-item {
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 2);
    min-height: 54px; /* Larger touch target on mobile */
    font-size: 1rem;
  }

  .dropdown-item svg {
    width: 20px;
    height: 20px;
    margin-right: calc(var(--spacing-unit) * 1.5);
  }

  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
}
</style>
