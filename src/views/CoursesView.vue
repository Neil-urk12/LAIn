<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Courses, Enrollments } from "../models/interfaces";
import { pb } from "../pocketbase/pocketbase";

const isLoading = ref(true);
const showEnrollModal = ref(false);
const selectedCourse = ref<Courses | null>(null);

/*
interface Course {
  id: number;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  duration: number; // hours
  lessons: number;
  price: string | number;
  imageUrl?: string; // Optional image URL
}

const courses = ref<Course[]>([
  {
    id: 1,
    title: "Introduction to AI",
    description: "Learn the fundamentals of Artificial Intelligence.",
    level: "Beginner",
    rating: 4.5,
    duration: 8,
    lessons: 15,
    price: "Free",
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=AI+Intro",
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    description: "Explore core concepts of Machine Learning algorithms.",
    level: "Beginner",
    rating: 4.8,
    duration: 12,
    lessons: 24,
    price: 49.99,
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=ML+Basics",
  },
    {
    id: 3,
    title: "Deep Learning Specialization",
    description: "Dive deep into neural networks and deep learning.",
    level: "Intermediate",
    rating: 4.7,
    duration: 20,
    lessons: 30,
    price: 99.99,
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=Deep+Learning",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    description: "Understand how computers process human language.",
    level: "Intermediate",
    rating: 4.6,
    duration: 15,
    lessons: 28,
    price: 79.99,
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=NLP",
  },
  {
    id: 5,
    title: "Computer Vision Fundamentals",
    description: 'Learn how machines "see" and interpret images.',
    level: "Advanced",
    rating: 4.9,
    duration: 18,
    lessons: 35,
    price: 129.99,
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=Comp+Vision",
  },
  {
    id: 6,
    title: "Reinforcement Learning Explained",
    description: "Master the concepts of agents learning through rewards.",
    level: "Advanced",
    rating: 4.8,
    duration: 22,
    lessons: 40,
    price: 149.99,
    imageUrl: "https://via.placeholder.com/300x150/EEE/DDD?text=RL+Explained",
  },
]);
]);
*/
const enrolledCourseIds = ref<string[]>([]);
const courses = ref<Courses[]>([]);

onMounted(async () => {
  try {
    const data = await pb.collection("courses").getFullList<Courses>();
    courses.value = data;
    // Fetch user enrollments and record course IDs
    if (pb.authStore.isValid) {
      try {
        const enrollmentData = await pb
          .collection("enrollments")
          .getFullList<Enrollments>({ filter: `userId=\"${pb.authStore.record?.id}\"` });
        enrolledCourseIds.value = enrollmentData.map((e) => e.courseId);
      } catch (err) {
        console.error("Error fetching enrollments:", err);
      }
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
  } finally {
    isLoading.value = false;
  }
});

const router = useRouter();

const goToCourseDashboard = (courseId: string) => {
  if (!courseId) return;
  if (!courses.value.find(course => course.id === courseId)) return;
  
  router.push({ name: "course", params: { id: courseId } });
};

const handleEnrollClick = (event: Event, course: Courses) => {
  if (enrolledCourseIds.value.includes(course.id)) return;
  event.stopPropagation(); 
  if (course.price === "Free") {
    selectedCourse.value = course;
    showEnrollModal.value = true;
  } else {
    // TODO: Implement payment processing
    console.log("Redirecting to payment page for:", course.title);
  }
};

const confirmEnrollment = () => {
  if (selectedCourse.value) {
    showEnrollModal.value = false;
    goToCourseDashboard(selectedCourse.value.id);
  }
};

const closeModal = () => {
  showEnrollModal.value = false;
  selectedCourse.value = null;
};
</script>

<template>
  <main>
    <h1>Courses</h1>
    <p>Browse and discover AI courses to enhance your skills</p>

    <div class="filters">
      <input type="text" placeholder="Search courses..." class="search-input" />
      <select>
        <option>All Categories</option>
      </select>
      <select>
        <option>All Prices</option>
      </select>
      <select>
        <option>All Levels</option>
      </select>
      <button class="filter-btn">🔍</button>
    </div>

    <div class="tabs">
      <button class="active">All Courses</button>
      <button>My Courses</button>
      <button>In Progress</button>
      <button>Completed</button>
      <button>Saved</button>
    </div>

    <div class="courses-grid">
      <template v-if="isLoading">
        <div class="course-card skeleton" v-for="n in 6" :key="'skeleton-' + n">
          <div class="course-image"></div>
          <div class="course-content">
            <div class="course-header">
              <span class="badge"></span>
              <span class="rating"></span>
            </div>
            <h3></h3>
            <p></p>
            <div class="course-footer"></div>
            <div class="course-actions">
              <span class="price"></span>
              <a></a>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- Loop through the actual courses data -->
        <div
          class="course-card"
          v-for="course in courses"
          :key="course.id"
          @click="goToCourseDashboard(course.id)"
        >
          <div
            class="course-image"
            :style="{ backgroundImage: `url(https://via.placeholder.com/300x150?text=${course.courseCode})` }"
          ></div>
          <div class="course-content">
            <div class="course-header">
              <span class="badge">{{ course.level }}</span>
              <span class="rating">⭐ {{ course.rating }}</span>
            </div>
            <h3>{{ course.title }}</h3>
            <p>{{ course.description }}</p>
            <div class="course-footer">
              <span>
                {{ course.hoursDuration }} hours •
                {{ course.lessonsAmount }} lessons
              </span>
            </div>
            <div class="course-actions">
              <span class="price">{{ course.price }}</span>
              <template v-if="!enrolledCourseIds.includes(course.id)">
                <a href="#" @click="(e) => handleEnrollClick(e, course)">Enroll Now</a>
              </template>
              <template v-else>
                <span class="enrolled">Enrolled</span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Enrollment Confirmation Modal -->
    <div v-if="showEnrollModal" class="modal-overlay">
      <div class="modal">
        <h2>Enroll in Course</h2>
        <p v-if="selectedCourse">
          Would you like to enroll in "{{ selectedCourse.title }}"?
        </p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="closeModal">Cancel</button>
          <button class="btn-primary" @click="confirmEnrollment">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Main content styling */
main {
  padding: 40px 16px;
}

h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

p {
  color: var(--text-light);
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.filters select,
.filter-btn {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  color: var(--text-dark);
  border-radius: 6px;
  background: var(--bg-white);
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 8px 16px;
  border: none;
  background: var(--bg-light);
  color: var(--text-dark);
  border-radius: 20px;
  cursor: pointer;
}

.tabs button.active {
  background: var(--primary-color);
  color: var(--bg-white);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.course-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer; /* Add cursor pointer to indicate clickability */
}

.course-image {
  background-color: var(--border-color); /* Fallback color */
  background-size: cover;
  background-position: center;
  height: 150px;
}

.course-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: var(--primary-color);
  color: var(--bg-white);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.rating {
  font-size: 14px;
}

.course-content h3 {
  margin: 0;
  font-size: 16px;
}

.course-content p {
  font-size: 14px;
  color: var(--text-light);
  flex-grow: 1;
}

.course-footer {
  font-size: 12px;
  color: var(--text-light);
}

.course-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
}

.price {
  font-weight: bold;
  color: var(--primary-color);
}

.enrolled {
  font-weight: bold;
  color: var(--text-medium);
}

.skeleton .course-image,
.skeleton .badge,
.skeleton .rating,
.skeleton h3,
.skeleton p,
.skeleton .course-footer,
.skeleton .price,
.skeleton .course-actions a {
  background: var(--bg-light);
}

/* Hover effects */
.course-card {
  transition: border-color 0.3s ease;
  cursor: pointer;
  border: 1px solid var(--border-color);
}
.course-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.filters input:hover,
.filters select:hover,
.filter-btn:hover {
  border-color: var(--primary-color);
}

.tabs button:hover {
  background: var(--primary-color);
  color: var(--bg-white);
}

.skeleton .course-image,
.skeleton .badge,
.skeleton .rating,
.skeleton h3,
.skeleton p,
.skeleton .course-footer,
.skeleton .price,
.skeleton .course-actions a {
  background-color: #ddd;
  border-radius: 4px;
  min-height: 16px;
  color: transparent;
}

.skeleton .course-image {
  height: 150px;
}

.skeleton .badge,
.skeleton .rating {
  width: 50px;
  height: 20px;
}

.skeleton h3 {
  height: 20px;
  width: 80%;
}

.skeleton p {
  height: 40px;
  width: 100%;
}

.skeleton .course-footer {
  height: 16px;
  width: 60%;
}

.skeleton .price {
  height: 20px;
  width: 40px;
}

.skeleton .course-actions a {
  height: 20px;
  width: 60px;
}

/* Modal Styles */
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
  background: var(--bg-white);
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin: 0 0 16px 0;
  font-size: 20px;
  color: var(--text-dark);
}

.modal p {
  margin: 0 0 24px 0;
  color: var(--text-medium);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-primary,
.btn-secondary {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: var(--bg-white);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: var(--bg-light);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--border-color);
}
</style>
