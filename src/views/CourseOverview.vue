<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pb } from '../pocketbase/pocketbase';
import type { Courses, Instructor } from '../models/interfaces';
import mockCourseData from '../mockdata/courses.json';
import type { CourseWithExpand } from '../models/types';

const course = ref<(Courses & { instructor: Instructor }) | null>(null);
const isLoading = ref(true);

const activeTab = ref('Overview');
const router = useRouter();
const route = useRoute()

const reviewsData = mockCourseData.reviewsData;
const relatedCoursesData = mockCourseData.relatedCourses;

onMounted(async () => {
  try {
    const data = await pb.collection<Courses>('courses').getOne(
      route.params.id as string,
      { expand: 'instructorId' }
    ) as CourseWithExpand;
    course.value = {
      id: data.id,
      instructorId: data.instructorId,
      title: data.title,
      courseCode: data.courseCode,
      description: data.description,
      aboutCourse: data.aboutCourse,
      level: data.level,
      hoursDuration: data.hoursDuration,
      rating: data.rating,
      price: data.price,
      status: data.status,
      reviews: data.reviews,
      imageUrl: data.imageUrl,
      lessonsAmount: data.lessonsAmount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      instructor: data.expand!.instructorId,
      whatYoullLearn: typeof data.whatYoullLearn === "string" ? JSON.parse(data.whatYoullLearn) : data.whatYoullLearn,
      requirements: typeof data.requirements === "string" ? JSON.parse(data.requirements) : data.requirements,
      whoIsFor: typeof data.whoIsFor === "string" ? JSON.parse(data.whoIsFor) : data.whoIsFor,
      includes: typeof data.includes === "string" ? JSON.parse(data.includes) : data.includes
    } as Courses & { instructor: Instructor };
  } catch (err) {
    console.error(err)
    router.replace({ name: 'not-found', state: window.history.state });
    return;
  } finally {
    isLoading.value = false;
  }
});

const formatReviews = (num: number) => {
    if (num >= 1000) 
        return (num / 1000).toFixed(1) + 'k';
    return num;
};

const enrollCourse = () => {
  if (course.value?.price === 'Free') 
    router.push({ name: 'Enrollment', params: { id: course.value?.id } });
  else {
    // TODO: Implement paid course enrollment
    console.log(`Attempting to enroll in PAID course ID: ${course.value?.id}`);
    alert(`Enrollment process for "${course.value?.title}" (Paid Course) needs to be implemented.`);
  }
};
</script>

<template>
  <div class="course-dashboard">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <router-link to="/dashboard">Dashboard</router-link> >
      <router-link to="/courses">Courses</router-link> >
      <span>{{ course?.title }}</span>
    </nav>

    <!-- Header Section -->
    <header class="course-header-banner" :style="{ backgroundImage: `url(${course?.imageUrl})` }">
      <div class="header-content">
        <span class="badge">{{ course?.level }}</span>
        <h1>{{ course?.title }}</h1>
        <p class="description">{{ course?.description }}</p>
        <div class="meta">
          <span>🕒 {{ course?.hoursDuration }} hours</span>
          <span>📚 {{ course?.lessonsAmount }} lessons</span>
          <span>📅 Last updated: {{ course?.updatedAt }}</span>
          <span>⭐ {{ course?.rating }} ({{ formatReviews(course?.reviews || 0) }} reviews)</span>
        </div>
        <div class="instructor-info">
          <!-- <img :src="course.instructor.avatarUrl" alt="Instructor Avatar" class="instructor-avatar" /> -->
          <span class="placeholder-avatar"></span>
          <span>Instructor: <strong>{{ course?.instructor.name }}</strong></span>
        </div>
         <button class="enroll-button header-enroll-btn" @click="enrollCourse">Enroll Now - {{ course?.price }}</button>
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
              <p>{{ course?.aboutCourse }}</p>
            </section>
            <section>
              <h2>What You'll Learn</h2>
              <ul class="checklist">
                <li v-for="(item, index) in course?.whatYoullLearn" :key="'learn-' + index">✓ {{ item }}</li>
              </ul>
            </section>
             <section>
              <h2>Requirements</h2>
              <ul>
                <li v-for="(item, index) in course?.requirements" :key="'req-' + index">{{ item }}</li>
              </ul>
            </section>
            <section>
              <h2>Who This Course Is For</h2>
              <ul>
                <li v-for="(item, index) in course?.whoIsFor" :key="'who-' + index">{{ item }}</li>
              </ul>
            </section>
          </div>
          <div v-if="activeTab === 'Curriculum'" class="curriculum-section">
            <h2>Course Curriculum</h2>
            <p class="curriculum-summary">4 modules • {{ course?.lessonsAmount }} lessons • {{ course?.hoursDuration }} hours total</p>
            <div class="module-list">
              <div class="module-item">
                <div class="module-header">
                  <div class="module-info">
                    <h3>Module 1: Introduction to AI</h3>
                    <span>5 lessons • 2 hours</span>
                  </div>
                  <button class="expand-button">⌄</button>
                </div>
                <!-- Module content (lessons) would go here -->
              </div>
              <div class="module-item">
                <div class="module-header">
                  <div class="module-info">
                    <h3>Module 2: AI Concepts and Terminology</h3>
                    <span>5 lessons • 3 hours</span>
                  </div>
                  <button class="expand-button">⌄</button>
                </div>
              </div>
              <div class="module-item">
                <div class="module-header">
                  <div class="module-info">
                    <h3>Module 3: AI Applications</h3>
                    <span>5 lessons • 3 hours</span>
                  </div>
                  <button class="expand-button">⌄</button>
                </div>
              </div>
              <div class="module-item">
                <div class="module-header">
                  <div class="module-info">
                    <h3>Module 4: The Future of AI</h3>
                    <span>4 lessons • 2 hours</span>
                  </div>
                  <button class="expand-button">⌄</button>
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'Instructor'" class="instructor-section">
            <h2>About the Instructor</h2>
            <div class="instructor-layout">
              <div class="instructor-profile">
                <div class="instructor-avatar-large placeholder-avatar"></div>
                <h3>{{ course?.instructor.name }}</h3>
                <p class="instructor-title">{{ course?.instructor.title }}</p>
                <div class="instructor-stats">
                  <span>⭐ {{ course?.instructor.rating }} Instructor Rating</span>
                  <!-- <span>👥 {{ formatReviews(course?.instructor.students) }} Students</span> -->
                  <span>📚 {{ course?.instructor.courses }} Courses</span>
                </div>
              </div>
              <div class="instructor-bio">
                <p>{{ course?.instructor.bio }}</p>
              </div>
            </div>
          </div>
           <div v-if="activeTab === 'Reviews'" class="reviews-section">
            <h2>Student Reviews</h2>
            <div class="reviews-summary">
              <div class="average-rating">
                <span class="rating-value">{{ reviewsData.averageRating.toFixed(1) }}</span>
                <div class="stars">
                  <span v-for="n in 5" :key="'avg-star-' + n" :class="{ 'filled': n <= Math.round(reviewsData.averageRating) }">⭐</span>
                </div>
                <span class="total-reviews">({{ formatReviews(reviewsData.totalReviews) }} reviews)</span>
              </div>
              <div class="rating-distribution">
                <div v-for="dist in reviewsData.distribution" :key="'dist-' + dist.stars" class="distribution-bar">
                  <span class="star-label">{{ dist.stars }} stars</span>
                  <div class="bar-container">
                    <div class="bar" :style="{ width: dist.percentage + '%' }"></div>
                  </div>
                  <span class="percentage">{{ dist.percentage }}%</span>
                </div>
              </div>
            </div>
            <div class="review-list">
              <div v-for="comment in reviewsData.comments" :key="comment.id" class="review-item">
                 <div class="review-author">
                    <span class="placeholder-avatar small-avatar"></span>
                    <div class="author-info">
                        <strong>{{ comment.name }}</strong>
                         <div class="stars small-stars">
                            <span v-for="n in 5" :key="'comment-star-' + comment.id + '-' + n" :class="{ 'filled': n <= comment.rating }">⭐</span>
                        </div>
                    </div>
                    <span class="review-date">{{ comment.date }}</span>
                 </div>
                 <p class="review-text">{{ comment.text }}</p>
              </div>
            </div> 
            <!-- <button class="load-more-button">Load More Reviews</button> -->
          </div>
        </div>
      </div>

      <!-- Right Column: Sidebar -->
      <aside class="sidebar-column">
        <div class="sidebar-widget">
          <h3>Course Includes</h3>
          <ul>
            <li v-for="(item, index) in course?.includes" :key="'inc-' + index">📄 {{ item }}</li>
          </ul>
          <button class="enroll-button" @click="enrollCourse">Enroll Now - {{ course?.price }}</button>
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
              <div class="related-course-card" v-for="related in relatedCoursesData" :key="related.id">
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
          <button class="enroll-button" @click="enrollCourse">Enroll Now - {{ course?.price }}</button>
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

/* Curriculum Section Styles */
.curriculum-section {
  margin-bottom: 30px; /* Consistent with other sections */
}

.curriculum-section h2 {
  font-size: 20px;
  margin-bottom: 8px; /* Reduced margin */
  color: var(--text-dark);
}

.curriculum-summary {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 20px;
}

.module-list {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden; /* Ensures border radius applies to children */
}

.module-item {
  border-bottom: 1px solid var(--border-color);
}
.module-item:last-child {
  border-bottom: none;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer; /* Indicate it's clickable/expandable */
  background-color: var(--bg-white); /* Ensure background */
}
.module-header:hover {
    background-color: var(--bg-light);
}

.module-info h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-dark);
}

.module-info span {
  font-size: 13px;
  color: var(--text-light);
}

.expand-button {
  background: none;
  border: none;
  font-size: 24px; /* Adjust size as needed */
  color: var(--text-light);
  cursor: pointer;
  padding: 0 5px;
  transition: transform 0.2s ease;
}
/* Add rotation for expanded state if needed later */
/* .module-item.expanded .expand-button { transform: rotate(180deg); } */

/* Instructor Section Styles */
.instructor-section {
  margin-bottom: 30px;
}
.instructor-section h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-dark);
}
.instructor-layout {
  display: flex;
  gap: 30px;
}
.instructor-profile {
  flex: 1;
  text-align: center;
}
.instructor-avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin: 0 auto 15px auto;
  display: block;
}
.instructor-profile h3 {
  font-size: 18px;
  margin: 0 0 5px 0;
  color: var(--text-dark);
}
.instructor-title {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 15px;
}
.instructor-stats {
  font-size: 13px;
  color: var(--text-medium);
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  text-align: left;
  width: fit-content;
  margin: 0 auto;
}
.instructor-stats span {
    display: flex;
    align-items: center;
    gap: 6px;
}
.instructor-bio {
  flex: 2.5;
}
.instructor-bio p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-medium);
  margin: 0;
}

/* Reviews Section Styles */
.reviews-section {
  margin-bottom: 30px;
}
.reviews-section h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-dark);
}
.reviews-summary {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}
.average-rating {
  flex: 1;
  text-align: center;
  border-right: 1px solid var(--border-color);
  padding-right: 30px;
}
.rating-value {
  font-size: 48px;
  font-weight: bold;
  color: var(--text-dark);
  display: block;
  margin-bottom: 5px;
}
.stars {
  color: #facc15;
  margin-bottom: 5px;
  font-size: 18px;
}
.stars span {
    color: var(--border-color);
}
.stars span.filled {
    color: #facc15;
}
.total-reviews {
  font-size: 14px;
  color: var(--text-light);
}
.rating-distribution {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
}
.distribution-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.star-label {
  font-size: 13px;
  color: var(--text-light);
  width: 60px;
  text-align: right;
}
.bar-container {
  flex-grow: 1;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}
.bar {
  height: 100%;
  background-color: #facc15;
  border-radius: 4px;
}
.percentage {
  font-size: 13px;
  color: var(--text-light);
  width: 35px;
  text-align: right;
}

.review-list {
  margin-bottom: 20px;
}
.review-item {
  border-bottom: 1px solid var(--border-color);
  padding: 20px 0;
}
.review-item:last-child {
  border-bottom: none;
}
.review-author {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    position: relative;
}
.placeholder-avatar.small-avatar {
    width: 40px;
    height: 40px;
}
.author-info {
    flex-grow: 1;
}
.author-info strong {
    font-size: 15px;
    color: var(--text-dark);
    display: block;
    margin-bottom: 3px;
}
.stars.small-stars {
    font-size: 14px;
}
.review-date {
    font-size: 13px;
    color: var(--text-light);
    position: absolute;
    top: 0;
    right: 0;
}
.review-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-medium);
  margin: 0;
}

.load-more-button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  border: 1px solid var(--border-color);
  background-color: var(--bg-white);
  color: var(--primary-color);
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.load-more-button:hover {
  background-color: var(--bg-light);
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
    .module-header {
        padding: 12px 15px;
    }
    .module-info h3 {
        font-size: 15px;
    }
    .instructor-layout {
        flex-direction: column;
        gap: 20px;
    }
    .instructor-profile {
        text-align: left;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .instructor-avatar-large {
        width: 80px;
        height: 80px;
        margin: 0;
    }
    .instructor-profile h3 {
        font-size: 16px;
        margin-bottom: 2px;
    }
    .instructor-title {
        margin-bottom: 8px;
    }
    .instructor-stats {
        margin: 0;
        gap: 5px;
        font-size: 12px;
    }
    .reviews-summary {
        flex-direction: column;
        gap: 20px;
        padding: 15px;
    }
    .average-rating {
        border-right: none;
        padding-right: 0;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 20px;
    }
    .rating-value {
        font-size: 40px;
    }
    .review-author {
        gap: 8px;
    }
    .placeholder-avatar.small-avatar {
        width: 35px;
        height: 35px;
    }
    .review-date {
        position: static;
        margin-top: 4px;
        font-size: 12px;
    }
    .author-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
    .tab-content h2, .curriculum-section h2, .instructor-section h2, .reviews-section h2 {
        font-size: 18px;
    }
    .tab-content p, .tab-content ul, .curriculum-summary, .module-info span, .instructor-bio p, .review-text {
        font-size: 14px;
    }
    .sidebar-widget {
        padding: 15px;
    }
    .related-courses h2, .ready-to-start h2 {
        font-size: 18px;
    }
    .module-header {
        padding: 10px 12px;
    }
    .module-info h3 {
        font-size: 14px;
    }
    .expand-button {
        font-size: 20px;
    }
    .instructor-avatar-large {
        width: 60px;
        height: 60px;
    }
    .instructor-profile h3 {
        font-size: 15px;
    }
    .instructor-title {
        font-size: 13px;
    }
    .instructor-stats {
        font-size: 11px;
    }
    .rating-value {
        font-size: 36px;
    }
    .stars {
        font-size: 16px;
    }
    .total-reviews {
        font-size: 13px;
    }
    .star-label, .percentage {
        font-size: 12px;
    }
    .star-label { width: 50px; }
    .percentage { width: 30px; }
    .author-info strong { font-size: 14px; }
    .stars.small-stars { font-size: 12px; }
    .review-date { font-size: 11px; }
}
</style>
