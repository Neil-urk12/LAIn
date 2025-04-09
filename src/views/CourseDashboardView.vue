<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Dummy data - replace with actual data fetching based on route param
const course = ref({
  id: 1,
  title: 'AI Fundamentals: Getting Started',
  level: 'Beginner',
  description: 'A beginner-friendly introduction to artificial intelligence concepts and applications.',
  duration: 10, // hours
  lessons: 24,
  lastUpdated: 'September 2023',
  rating: 4.6,
  reviews: 3250,
  instructor: {
    name: 'Dr. Toma Sigma',
    // avatarUrl: 'path/to/avatar.jpg' // Add avatar if available
  },
  price: 'Free Access',
  about: 'This free course provides a comprehensive introduction to artificial intelligence for absolute beginners. You\'ll learn the basic concepts, terminology, and applications of AI without requiring any prior technical knowledge. Through engaging lectures and simple examples, you\'ll gain a solid foundation in AI that will prepare you for more advanced courses in the field.',
  whatYoullLearn: [
    'Understand what artificial intelligence is and how it works',
    'Recognize different types of AI applications in everyday life',
    'Learn the basic terminology used in AI and machine learning',
    'Explore the ethical considerations of AI implementation',
    'Discover career paths and opportunities in the AI field',
    'Prepare for more advanced AI and machine learning courses'
  ],
  requirements: [
    'No prior knowledge of AI or programming required',
    'Basic computer literacy',
    'Curiosity and willingness to learn'
  ],
  whoIsThisFor: [
    'Complete beginners interested in understanding AI',
    'Business professionals wanting to understand AI applications',
    'Students considering a career in AI or data science',
    'Anyone curious about how AI is changing our world'
  ],
  includes: [
    '8 hours on-demand video',
    '10 articles',
    '15 downloadable resources',
    'Access to community forum',
    'Certificate of completion'
  ],
  relatedCourses: [
      { id: 3, title: 'Introduction to Artificial Intelligence', level: 'Beginner', rating: 4.8, duration: 28, lessons: 36, price: 49.99, imageUrl: 'https://via.placeholder.com/300x150/EEE/DDD?text=AI+Intro+Rel' },
      { id: 4, title: 'Machine Learning with Python', level: 'Beginner', rating: 4.7, duration: 18, lessons: 24, price: 'Free', imageUrl: 'https://via.placeholder.com/300x150/EEE/DDD?text=ML+Python+Rel' },
      { id: 5, title: 'AI Ethics and Governance', level: 'Intermediate', rating: 4.5, duration: 18, lessons: 24, price: 79.99, imageUrl: 'https://via.placeholder.com/300x150/EEE/DDD?text=AI+Ethics+Rel' },
  ],
  headerImageUrl: 'https://via.placeholder.com/1200x300/DDD/CCC?text=Course+Header+Background'
});

const activeTab = ref('Overview');
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const courseId = route.params.id;
  console.log('Fetching data for course ID:', courseId);
  // TODO: Fetch actual course data using courseId
  // For now, using dummy data
});

const formatReviews = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
};

const enrollCourse = () => {
  if (course.value.price === 'Free Access') {
    const confirmed = confirm(`Enroll in this free course: "${course.value.title}"?`);
    if (confirmed) {
      console.log(`Enrolled in FREE course ID: ${course.value.id} - ${course.value.title}`);
      // TODO: Add actual enrollment logic here (e.g., API call, update user state)

      // Redirect to the main dashboard after confirming enrollment
      router.push('/dashboard');
      alert(`Successfully enrolled in "${course.value.title}"! Redirecting to dashboard.`);
    } else {
      console.log(`Enrollment cancelled for course ID: ${course.value.id}`);
    }
  } else {
    // Placeholder for paid course enrollment logic
    console.log(`Attempting to enroll in PAID course ID: ${course.value.id}`);
    // This is where you might redirect to a checkout page or trigger a payment modal
    // router.push({ name: 'CheckoutPage', params: { courseId: course.value.id } });
    alert(`Enrollment process for "${course.value.title}" (Paid Course) needs to be implemented.`);
  }
};
</script>

<template>
  <div class="course-dashboard">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <router-link to="/dashboard">Dashboard</router-link> >
      <router-link to="/courses">Courses</router-link> >
      <span>{{ course.title }}</span>
    </nav>

    <!-- Header Section -->
    <header class="course-header-banner" :style="{ backgroundImage: `url(${course.headerImageUrl})` }">
      <div class="header-content">
        <span class="badge">{{ course.level }}</span>
        <h1>{{ course.title }}</h1>
        <p class="description">{{ course.description }}</p>
        <div class="meta">
          <span>🕒 {{ course.duration }} hours</span>
          <span>📚 {{ course.lessons }} lessons</span>
          <span>📅 Last updated: {{ course.lastUpdated }}</span>
          <span>⭐ {{ course.rating }} ({{ formatReviews(course.reviews) }} reviews)</span>
        </div>
        <div class="instructor-info">
          <!-- <img :src="course.instructor.avatarUrl" alt="Instructor Avatar" class="instructor-avatar" /> -->
          <span class="placeholder-avatar"></span>
          <span>Instructor: <strong>{{ course.instructor.name }}</strong></span>
        </div>
         <button class="enroll-button header-enroll-btn" @click="enrollCourse">Enroll Now - {{ course.price }}</button>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="main-content-area">
      <!-- Left Column: Course Details -->
      <div class="course-details-column">
        <!-- Tabs -->
        <div class="tabs">
          <button :class="{ active: activeTab === 'Overview' }" @click="activeTab = 'Overview'">Overview</button>
          <button :class="{ active: activeTab === 'Curriculum' }" @click="activeTab = 'Curriculum'">Curriculum</button>
          <button :class="{ active: activeTab === 'Instructor' }" @click="activeTab = 'Instructor'">Instructor</button>
          <button :class="{ active: activeTab === 'Reviews' }" @click="activeTab = 'Reviews'">Reviews</button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <div v-if="activeTab === 'Overview'">
            <section>
              <h2>About This Course</h2>
              <p>{{ course.about }}</p>
            </section>
            <section>
              <h2>What You'll Learn</h2>
              <ul class="checklist">
                <li v-for="(item, index) in course.whatYoullLearn" :key="'learn-' + index">✓ {{ item }}</li>
              </ul>
            </section>
             <section>
              <h2>Requirements</h2>
              <ul>
                <li v-for="(item, index) in course.requirements" :key="'req-' + index">{{ item }}</li>
              </ul>
            </section>
            <section>
              <h2>Who This Course Is For</h2>
              <ul>
                <li v-for="(item, index) in course.whoIsThisFor" :key="'who-' + index">{{ item }}</li>
              </ul>
            </section>
          </div>
          <div v-if="activeTab === 'Curriculum'">
            <!-- Curriculum content goes here -->
            <p>Curriculum details coming soon...</p>
          </div>
          <div v-if="activeTab === 'Instructor'">
            <!-- Instructor content goes here -->
             <p>Instructor details coming soon...</p>
          </div>
          <div v-if="activeTab === 'Reviews'">
            <!-- Reviews content goes here -->
             <p>Reviews coming soon...</p>
          </div>
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <aside class="sidebar-column">
        <div class="sidebar-widget">
          <h3>Course Includes</h3>
          <ul>
            <li v-for="(item, index) in course.includes" :key="'inc-' + index">📄 {{ item }}</li>
          </ul>
          <button class="enroll-button" @click="enrollCourse">Enroll Now - {{ course.price }}</button>
        </div>
        <div class="sidebar-widget">
          <h3>Share This Course</h3>
          <div class="share-buttons">
            <button>🔗</button>
            <button>🐦</button>
            <button>👤</button>
          </div>
        </div>
      </aside>
    </div>

     <!-- Related Courses Section -->
    <section class="related-courses">
        <h2>Related Courses</h2>
        <div class="courses-grid">
             <!-- Using a simplified card structure for related courses -->
            <div class="related-course-card" v-for="related in course.relatedCourses" :key="related.id">
                <div class="related-course-image" :style="{ backgroundImage: `url(${related.imageUrl})` }"></div>
                <div class="related-course-content">
                    <span class="badge small">{{ related.level }}</span>
                     <span class="rating small">⭐ {{ related.rating }}</span>
                    <h3>{{ related.title }}</h3>
                    <div class="meta small">
                        <span>🕒 {{ related.duration }} hrs</span>
                        <span>📚 {{ related.lessons }} lessons</span>
                    </div>
                    <div class="price-view">
                        <span class="price">{{ typeof related.price === 'number' ? `$${related.price.toFixed(2)}` : related.price }}</span>
                        <a href="#" @click.prevent="$router.push({ name: 'CourseDetail', params: { id: related.id } })">View Course</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Ready to Start Section -->
    <section class="ready-to-start">
        <h2>Ready to start learning?</h2>
        <p>This course is completely free. Enroll now to gain access!</p>
        <button class="enroll-button" @click="enrollCourse">Enroll Now - {{ course.price }}</button>
    </section>

  </div>
</template>

<style scoped>
.course-dashboard {
  padding: 20px 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumbs */
.breadcrumbs {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 20px;
}
.breadcrumbs a {
  color: var(--primary-color);
  text-decoration: none;
}
.breadcrumbs a:hover {
  text-decoration: underline;
}
.breadcrumbs span {
  color: var(--text-dark);
}

/* Header Banner */
.course-header-banner {
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 10px;
  color: var(--bg-white);
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
}
.course-header-banner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.header-content {
    position: relative;
    z-index: 2;
}

.header-content .badge {
  background: var(--primary-color);
  color: var(--bg-white);
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  display: inline-block;
  margin-bottom: 10px;
}

.header-content h1 {
  font-size: 32px;
  margin: 0 0 10px 0;
  color: var(--bg-white);
}

.header-content .description {
  font-size: 16px;
  max-width: 70%;
  margin-bottom: 15px;
  color: #eee;
}

.header-content .meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  margin-bottom: 15px;
  color: #ddd;
}
.header-content .meta span {
    display: flex;
    align-items: center;
    gap: 5px;
}

.instructor-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #eee;
  margin-bottom: 20px;
}

.placeholder-avatar {
    width: 30px;
    height: 30px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}

.instructor-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.enroll-button {
  background-color: var(--primary-color);
  color: var(--bg-white);
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.enroll-button:hover {
  background-color: darken(var(--primary-color), 10%);
}

/* Main Content Layout */
.main-content-area {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.course-details-column {
  flex: 3;
}

.sidebar-column {
  flex: 1;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 5px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}
.tabs button {
  padding: 10px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--text-light);
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
}
.tabs button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  font-weight: bold;
}

/* Tab Content */
.tab-content section {
  margin-bottom: 30px;
}
.tab-content h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--text-dark);
}
.tab-content p, .tab-content ul {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-medium);
}
.tab-content ul {
  padding-left: 20px;
  margin-top: 10px;
}
.tab-content ul li {
    margin-bottom: 8px;
}
.checklist li {
    list-style: none;
    padding-left: 0;
}

/* Sidebar */
.sidebar-widget {
  background: var(--bg-light);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
}
.sidebar-widget h3 {
  font-size: 18px;
  margin: 0 0 15px 0;
  color: var(--text-dark);
}
.sidebar-widget ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}
.sidebar-widget ul li {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  gap: 8px;
}
.sidebar-widget .enroll-button {
  width: 100%;
  text-align: center;
}

.share-buttons {
    display: flex;
    gap: 10px;
}
.share-buttons button {
    background: var(--bg-white);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: var(--text-dark);
}
.share-buttons button:hover {
    background-color: var(--border-color);
}

/* Related Courses */
.related-courses {
    margin-bottom: 40px;
}
.related-courses h2 {
    font-size: 20px;
    margin-bottom: 20px;
    color: var(--text-dark);
}
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 20px;
}

.related-course-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.related-course-image {
  height: 120px;
  background-color: var(--border-color);
  background-size: cover;
  background-position: center;
}
.related-course-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}
.related-course-content h3 {
  font-size: 15px;
  margin: 0;
  flex-grow: 1;
}
.related-course-content .badge.small {
    padding: 2px 6px;
    font-size: 11px;
    margin-right: 5px;
    display: inline-block;
}
.related-course-content .rating.small {
    font-size: 12px;
    color: var(--text-light);
}
.related-course-content .meta.small {
    font-size: 12px;
    color: var(--text-light);
    display: flex;
    gap: 10px;
    margin-top: 5px;
}
.price-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}
.price-view .price {
    font-weight: bold;
    color: var(--primary-color);
    font-size: 14px;
}
.price-view a {
    font-size: 13px;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}
.price-view a:hover {
    text-decoration: underline;
}


/* Ready to Start Section */
.ready-to-start {
    background: var(--bg-light);
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid var(--border-color);
}
.ready-to-start h2 {
    font-size: 22px;
    margin: 0 0 10px 0;
    color: var(--text-dark);
}
.ready-to-start p {
    color: var(--text-medium);
    margin-bottom: 20px;
    font-size: 16px;
}

/* Responsive Adjustments (Optional) */
@media (max-width: 992px) {
    .main-content-area {
        flex-direction: column;
    }
    .sidebar-column {
        position: static;
        flex: auto;
        width: 100%;
    }
    .header-content .description {
        max-width: 90%;
    }
}

@media (max-width: 768px) {
    .course-header-banner {
        padding: 30px 20px;
    }
    .header-content h1 {
        font-size: 28px;
    }
    .header-content .meta {
        flex-wrap: wrap;
        gap: 10px;
    }
    .tabs button {
        padding: 8px 15px;
        font-size: 14px;
    }
    .courses-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (max-width: 576px) {
    .course-dashboard {
        padding: 15px;
    }
    .header-content h1 {
        font-size: 24px;
    }
     .header-content .description {
        font-size: 14px;
    }
    .header-content .meta {
        font-size: 12px;
    }
    .enroll-button {
        padding: 10px 20px;
        font-size: 14px;
    }
    .tabs {
        gap: 0;
        justify-content: space-around;
    }
     .tabs button {
        padding: 8px 10px;
        font-size: 13px;
    }
    .tab-content h2 {
        font-size: 18px;
    }
     .tab-content p, .tab-content ul {
        font-size: 14px;
    }
    .sidebar-widget {
        padding: 15px;
    }
    .related-courses h2, .ready-to-start h2 {
        font-size: 18px;
    }
}

</style>
