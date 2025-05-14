<script setup lang="ts">
import { reactive } from 'vue';
import { useAdminStore } from '@/stores/admin';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'created'): void;
}>();

const adminStore = useAdminStore();

// Form state for create
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

const submitCreateForm = async () => {
  try {
    // Process string lists to ensure they're not empty
    const whatYoullLearnArray = courseForm.whatYoullLearn.split('\n').filter(item => item.trim() !== '');
    const requirementsArray = courseForm.requirements.split('\n').filter(item => item.trim() !== '');
    const whoIsForArray = courseForm.whoIsFor.split('\n').filter(item => item.trim() !== '');
    const includesArray = courseForm.includes.split('\n').filter(item => item.trim() !== '');
    
    // Ensure there's content and send as strings (not arrays) to match the API expectation
    const formData = {
      ...courseForm,
      whatYoullLearn: whatYoullLearnArray.length > 0 ? whatYoullLearnArray.join('\n') : 'Not specified',
      requirements: requirementsArray.length > 0 ? requirementsArray.join('\n') : 'No prerequisites',
      whoIsFor: whoIsForArray.length > 0 ? whoIsForArray.join('\n') : 'All learners',
      includes: includesArray.length > 0 ? includesArray.join('\n') : 'Course content',
      rating: 0,
      reviews: 0,
      imageUrl: `https://via.placeholder.com/300x150?text=${courseForm.courseCode}`
    };

    await adminStore.createCourse(formData);
    emit('created');
    emit('close');
    
    // Reset form
    Object.assign(courseForm, {
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
  } catch (error) {
    console.error('Error creating course:', error);
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal modal-large">
      <h2>Create New Course</h2>
      <form @submit.prevent="submitCreateForm" class="course-form">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Course Title</label>
            <input type="text" id="title" v-model="courseForm.title" required />
          </div>
          <div class="form-group">
            <label for="courseCode">Course Code</label>
            <input type="text" id="courseCode" v-model="courseForm.courseCode" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="level">Level</label>
            <select id="level" v-model="courseForm.level">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="courseForm.status">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Price</label>
            <input type="text" id="price" v-model="courseForm.price" placeholder="e.g. 49.99 or Free" required />
          </div>
          <div class="form-group">
            <label for="hoursDuration">Duration (hours)</label>
            <input type="number" id="hoursDuration" v-model="courseForm.hoursDuration" min="0" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="instructorId">Instructor</label>
            <select id="instructorId" v-model="courseForm.instructorId" required>
              <option value="" disabled>Select an instructor</option>
              <option v-for="instructor in adminStore.instructors" :key="instructor.id" :value="instructor.id">
                {{ instructor.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="lessonsAmount">Number of Lessons</label>
            <input type="number" id="lessonsAmount" v-model="courseForm.lessonsAmount" min="0" required />
          </div>
        </div>

        <div class="form-group">
          <label for="description">Short Description</label>
          <input type="text" id="description" v-model="courseForm.description" required />
        </div>

        <div class="form-group">
          <label for="aboutCourse">About This Course</label>
          <textarea id="aboutCourse" v-model="courseForm.aboutCourse" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label for="whatYoullLearn">What You'll Learn (one item per line)</label>
          <textarea id="whatYoullLearn" v-model="courseForm.whatYoullLearn" rows="4" placeholder="Enter at least one learning outcome (e.g., Build a full-stack web application)" required></textarea>
        </div>

        <div class="form-group">
          <label for="requirements">Requirements (one item per line)</label>
          <textarea id="requirements" v-model="courseForm.requirements" rows="4" placeholder="Enter at least one requirement (e.g., Basic JavaScript knowledge)" required></textarea>
        </div>

        <div class="form-group">
          <label for="whoIsFor">Who Is This Course For (one item per line)</label>
          <textarea id="whoIsFor" v-model="courseForm.whoIsFor" rows="4" placeholder="Enter at least one target audience (e.g., Web developers looking to expand their skills)" required></textarea>
        </div>

        <div class="form-group">
          <label for="includes">Course Includes (one item per line)</label>
          <textarea id="includes" v-model="courseForm.includes" rows="4" placeholder="Enter at least one course item (e.g., 10 hours of on-demand video)" required></textarea>
        </div>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Create Course</button>
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
