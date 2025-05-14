<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { PlusIcon, SearchIcon, Loader, Edit, Trash2, Eye } from 'lucide-vue-next';
import type { CourseWithInstructor } from '@/stores/admin';
import { useAdminStore } from '@/stores/admin';
import { useRouter } from 'vue-router';
const DeleteCourseModal = defineAsyncComponent(() => import('./Modals/DeleteCourseModal.vue'));
const CreateCourseModal = defineAsyncComponent(() => import('./Modals/CreateCourseModal.vue'));
const EditCourseModal = defineAsyncComponent(() => import('./Modals/EditCourseModal.vue'));

// Define props
const props = defineProps<{
  courses: CourseWithInstructor[];
  loading: boolean;
}>();

const router = useRouter();
const adminStore = useAdminStore();
const searchTerm = ref('');
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const showCreateModal = ref(false);
const selectedCourse = ref<CourseWithInstructor | null>(null);

const filteredCourses = computed(() => {
  if (!searchTerm.value) {
    return props.courses;
  }
  const lowerSearchTerm = searchTerm.value.toLowerCase();
  return props.courses.filter(course =>
    course.title.toLowerCase().includes(lowerSearchTerm) ||
    course.courseCode.toLowerCase().includes(lowerSearchTerm) ||
    course.level.toLowerCase().includes(lowerSearchTerm) ||
    (course.instructorName && course.instructorName.toLowerCase().includes(lowerSearchTerm))
  );
});

const getLevelTagClass = (level: string): string => {
  switch (level.toLowerCase()) {
    case 'beginner': return 'tag-green';
    case 'intermediate': return 'tag-blue';
    case 'advanced': return 'tag-purple';
    default: return 'tag-gray';
  }
};

const getStatusTagClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'published': return 'tag-green';
    case 'draft': return 'tag-gray';
    case 'archived': return 'tag-red';
    default: return 'tag-gray';
  }
};

const formatPrice = (price: string): string => {
  if (price === 'Free') return 'Free';
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return price;
  return `$${numPrice.toFixed(2)}`;
};

const handleCreateClick = () => {
  showCreateModal.value = true;
};

const handleEditClick = (course: CourseWithInstructor) => {
  selectedCourse.value = course;
  showEditModal.value = true;
};

const handleDeleteClick = (course: CourseWithInstructor) => {
  selectedCourse.value = course;
  showDeleteModal.value = true;
};

const handleViewClick = (courseId: string) => {
  router.push({ name: 'course', params: { id: courseId } });
};

const closeModals = () => {
  showDeleteModal.value = false;
  showEditModal.value = false;
  showCreateModal.value = false;
  selectedCourse.value = null;
};
</script>

<template>
  <div class="course-management-container section-padding">
    <div class="header">
      <div>
        <h1>Course Management</h1>
        <p>Manage courses, content, and enrollments</p>
      </div>
      <button class="btn btn-primary add-course-btn" @click="handleCreateClick">
        <PlusIcon :size="16" /> Add Course
      </button>
    </div>

    <div class="controls">
      <div class="search-bar">
        <SearchIcon :size="16" class="search-icon" />
        <input type="text" v-model="searchTerm" placeholder="Search courses..." />
      </div>
      <button class="btn btn-secondary">Filter</button>
    </div>

    <div class="course-table-wrapper">
      <div v-if="loading" class="loading-container">
        <Loader :size="32" class="loading-spinner" />
        <p>Loading courses...</p>
      </div>

      <table v-else class="course-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Code</th>
            <th>Instructor</th>
            <th>Level</th>
            <th>Status</th>
            <th>Price</th>
            <th>Enrollments</th>
            <th>Created</th>
            <th></th> <!-- Actions column -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.id">
            <td>{{ course.title }}</td>
            <td>{{ course.courseCode }}</td>
            <td>{{ course.instructorName }}</td>
            <td>
              <span :class="['tag', getLevelTagClass(course.level)]">{{ course.level }}</span>
            </td>
            <td>
              <span :class="['tag', getStatusTagClass(course.status)]">
                {{ course.status }}
              </span>
            </td>
            <td>{{ formatPrice(course.price) }}</td>
            <td>{{ course.enrollmentsCount }}</td>
            <td>{{ new Date(course.createdAt).toLocaleDateString() }}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn" @click="handleViewClick(course.id)" title="View Course">
                  <Eye :size="16" />
                </button>
                <button class="action-btn" @click="handleEditClick(course)" title="Edit Course">
                  <Edit :size="16" />
                </button>
                <button class="action-btn" @click="handleDeleteClick(course)" title="Delete Course">
                  <Trash2 :size="16" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredCourses.length === 0">
             <td colspan="9" class="text-center no-results">No courses found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals -->
    <DeleteCourseModal
      :course="selectedCourse"
      :show="showDeleteModal"
      @close="closeModals"
      @deleted="adminStore.fetchCourses()"
    />

    <CreateCourseModal
      :show="showCreateModal"
      @close="closeModals"
      @created="adminStore.fetchCourses()"
    />

    <EditCourseModal
      :course="selectedCourse"
      :show="showEditModal"
      @close="closeModals"
      @updated="adminStore.fetchCourses()"
    />
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

.course-management-container {
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

.add-course-btn {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing-unit) * 1);
}

.controls {
  display: flex;
  gap: calc(var(--spacing-unit) * 2);
  margin-bottom: calc(var(--spacing-unit) * 3);
  flex-wrap: wrap;
}

.search-bar {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: calc(var(--spacing-unit) * 1.5);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.search-bar input {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 5);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 8) 0;
  color: var(--text-light);
}

.loading-spinner {
  animation: spin 1s linear infinite;
  margin-bottom: calc(var(--spacing-unit) * 2);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.course-table {
  width: 100%;
  border-collapse: collapse; /* Remove space between borders */
  margin-top: calc(var(--spacing-unit) * 2);
  font-size: 0.9rem;
  white-space: nowrap; /* Prevent text wrapping in cells */
}

.course-table th,
.course-table td {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle; /* Align cell content vertically */
}

.course-table th {
  font-weight: 500;
  color: var(--text-light);
  background-color: var(--bg-light); /* Subtle header background */
  text-transform: capitalize; /* Match mockup */
}

/* Remove bottom border from the last row */
.course-table tbody tr:last-child td {
  border-bottom: none;
}

.tag {
  display: inline-block;
  padding: calc(var(--spacing-unit) * 0.5) calc(var(--spacing-unit) * 1);
  border-radius: 9999px; /* Pill shape */
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  min-width: 80px;
}

.action-buttons {
  display: flex;
  gap: calc(var(--spacing-unit) * 1);
}

.action-btn {
  background: none;
  border: none;
  padding: calc(var(--spacing-unit) * 0.5);
  cursor: pointer;
  color: var(--text-light);
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.action-btn:hover {
  background-color: var(--bg-light);
  color: var(--primary-color);
}

.no-results {
  color: var(--text-light);
  padding: calc(var(--spacing-unit) * 4) 0;
}

/* Button Styles */
.btn-primary,
.btn-secondary {
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-color-dark);
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

/* Dark mode styles */
html.dark .course-management-container {
  background-color: #1f2937;
}

html.dark .search-bar input {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .course-table th {
  background-color: #111827;
  color: #9ca3af;
}

html.dark .course-table td {
  border-bottom-color: #374151;
  color: #f3f4f6;
}

html.dark .btn-secondary {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .btn-secondary:hover {
  background-color: #4b5563;
}

html.dark .action-btn:hover {
  background-color: #374151;
}

@media (max-width: 768px) {
  .course-table {
    white-space: normal;
  }

  .course-table th,
  .course-table td {
    padding: calc(var(--spacing-unit) * 1);
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
