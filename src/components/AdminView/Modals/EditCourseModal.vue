<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useAdminStore } from '@/stores/admin';
import type { CourseWithInstructor } from '@/stores/admin';

const props = defineProps<{
  course: CourseWithInstructor | null;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'updated'): void;
}>();

const adminStore = useAdminStore();

// Form state for edit
const courseForm = reactive({
  title: '',
  courseCode: '',
  description: '',
  aboutCourse: '',
  level: 'Beginner',
  hoursDuration: 0,
  price: '',
  status: 'draft',
  instructorId: '',
  whatYoullLearn: '',
  requirements: '',
  whoIsFor: '',
  includes: '',
  lessonsAmount: 0
});

// Watch for changes in the selected course and update the form
watch(() => props.course, (newCourse) => {
  if (newCourse) {
    // Populate form with course data
    Object.assign(courseForm, {
      title: newCourse.title,
      courseCode: newCourse.courseCode,
      description: newCourse.description,
      aboutCourse: newCourse.aboutCourse,
      level: newCourse.level,
      hoursDuration: newCourse.hoursDuration,
      price: newCourse.price,
      status: newCourse.status,
      instructorId: newCourse.instructorId,
      whatYoullLearn: Array.isArray(newCourse.whatYoullLearn) ? newCourse.whatYoullLearn.join('\n') : newCourse.whatYoullLearn,
      requirements: Array.isArray(newCourse.requirements) ? newCourse.requirements.join('\n') : newCourse.requirements,
      whoIsFor: Array.isArray(newCourse.whoIsFor) ? newCourse.whoIsFor.join('\n') : newCourse.whoIsFor,
      includes: Array.isArray(newCourse.includes) ? newCourse.includes.join('\n') : newCourse.includes,
      lessonsAmount: newCourse.lessonsAmount
    });
  }
}, { immediate: true });

const submitEditForm = async () => {
  if (!props.course) return;

  try {
    // Convert string lists to arrays
    const formData = {
      ...courseForm,
      whatYoullLearn: courseForm.whatYoullLearn.split('\n').filter(item => item.trim() !== ''),
      requirements: courseForm.requirements.split('\n').filter(item => item.trim() !== ''),
      whoIsFor: courseForm.whoIsFor.split('\n').filter(item => item.trim() !== ''),
      includes: courseForm.includes.split('\n').filter(item => item.trim() !== '')
    };

    await adminStore.updateCourse(props.course.id, formData);
    emit('updated');
    emit('close');
  } catch (error) {
    console.error('Error updating course:', error);
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal modal-large">
      <h2>Edit Course</h2>
      <form @submit.prevent="submitEditForm" class="course-form">
        <div class="form-row">
          <div class="form-group">
            <label for="edit-title">Course Title</label>
            <input type="text" id="edit-title" v-model="courseForm.title" required />
          </div>
          <div class="form-group">
            <label for="edit-courseCode">Course Code</label>
            <input type="text" id="edit-courseCode" v-model="courseForm.courseCode" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="edit-level">Level</label>
            <select id="edit-level" v-model="courseForm.level">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-status">Status</label>
            <select id="edit-status" v-model="courseForm.status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="edit-price">Price</label>
            <input type="text" id="edit-price" v-model="courseForm.price" placeholder="e.g. 49.99 or Free" required />
          </div>
          <div class="form-group">
            <label for="edit-hoursDuration">Duration (hours)</label>
            <input type="number" id="edit-hoursDuration" v-model="courseForm.hoursDuration" min="0" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="edit-instructorId">Instructor</label>
            <select id="edit-instructorId" v-model="courseForm.instructorId" required>
              <option value="" disabled>Select an instructor</option>
              <option v-for="instructor in adminStore.instructors" :key="instructor.id" :value="instructor.id">
                {{ instructor.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-lessonsAmount">Number of Lessons</label>
            <input type="number" id="edit-lessonsAmount" v-model="courseForm.lessonsAmount" min="0" required />
          </div>
        </div>

        <div class="form-group">
          <label for="edit-description">Short Description</label>
          <input type="text" id="edit-description" v-model="courseForm.description" required />
        </div>

        <div class="form-group">
          <label for="edit-aboutCourse">About This Course</label>
          <textarea id="edit-aboutCourse" v-model="courseForm.aboutCourse" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="edit-whatYoullLearn">What You'll Learn (one item per line)</label>
          <textarea id="edit-whatYoullLearn" v-model="courseForm.whatYoullLearn" rows="4" placeholder="Enter each item on a new line"></textarea>
        </div>

        <div class="form-group">
          <label for="edit-requirements">Requirements (one item per line)</label>
          <textarea id="edit-requirements" v-model="courseForm.requirements" rows="4" placeholder="Enter each item on a new line"></textarea>
        </div>

        <div class="form-group">
          <label for="edit-whoIsFor">Who Is This Course For (one item per line)</label>
          <textarea id="edit-whoIsFor" v-model="courseForm.whoIsFor" rows="4" placeholder="Enter each item on a new line"></textarea>
        </div>

        <div class="form-group">
          <label for="edit-includes">Course Includes (one item per line)</label>
          <textarea id="edit-includes" v-model="courseForm.includes" rows="4" placeholder="Enter each item on a new line"></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Update Course</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: var(--bg-white);
  border-radius: 8px;
  padding: calc(var(--spacing-unit) * 4);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.modal-large {
  max-width: 800px;
}

.modal h2 {
  margin-bottom: calc(var(--spacing-unit) * 3);
  font-size: 1.25rem;
  font-weight: 600;
}

.course-form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 3);
}

.form-row {
  display: flex;
  gap: calc(var(--spacing-unit) * 3);
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: calc(var(--spacing-unit) * 1);
  color: var(--text-dark);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: var(--bg-white);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 2);
}

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
}

.btn-secondary:hover {
  background-color: var(--border-color);
}

/* Dark mode styles */
html.dark .modal {
  background-color: #1f2937;
}

html.dark .modal h2 {
  color: #f9fafb;
}

html.dark .form-group label {
  color: #f3f4f6;
}

html.dark .form-group input,
html.dark .form-group select,
html.dark .form-group textarea {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .btn-secondary {
  background-color: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

html.dark .btn-secondary:hover {
  background-color: #4b5563;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
