<script setup lang="ts">
import type { Courses, Instructor, Enrollments } from '@/models/interfaces';
import type { CourseWithExpand } from '@/models/types';
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pb } from '../pocketbase/pocketbase';
import { useEnrollmentStore } from '@/stores/enrollment';

const router = useRouter();
const route = useRoute()
const enrollmentStore = useEnrollmentStore();

const course = ref<(Courses & { instructor: Instructor }) | null>(null);
const studentsEnrolled = ref<number>(0);
const formattedLastUpdated = computed(() => course.value
  ? new Date(course.value.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  : '');

onMounted(async () => {
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
    } as Courses & { instructor: Instructor }
  await enrollmentStore.fetchByCourse(route.params.id as string);
  studentsEnrolled.value = enrollmentStore.enrollments.length;
});

const formatReviews = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
};

const completeEnrollment = async () => {
  // Enroll current user via store
  try {
    await enrollmentStore.enroll(course.value!.id);
    console.log(`Enrolled in course ID: ${course.value?.id}`);
  } catch (error) {
    alert(`Enrollment failed: ${(error as Error).message}`);
    return;
  }
  alert(`Successfully enrolled in "${course.value?.title}"! Redirecting to dashboard.`);
  router.push('/dashboard');
};

const returnToCourseDetails = () => {
    router.push({ name: 'course', params: { id: course.value?.id } });
}

</script>

<template>
  <div class="enrollment-view" v-if="course">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs">
      <router-link to="/dashboard">Dashboard</router-link> >
      <router-link to="/courses">Courses</router-link> >
      <router-link :to="{ name: 'course', params: { id: course?.id } }">{{ course?.title }}</router-link> >
      <span>Enroll</span>
    </nav>

    <h1 class="page-title">Complete Your Enrollment</h1>
    <p class="page-subtitle">You're just one step away from accessing this course</p>

    <div class="enrollment-layout">
      <!-- Left Column: Enrollment Details -->
      <div class="enrollment-details">
        <h2>Enrollment Details</h2>
        <p class="details-subtitle">This course is free. Complete your enrollment to get immediate access.</p>

        <div class="highlight-box free-course-box">
          <span class="icon">✅</span>
          <div>
            <strong>Free Course</strong>
            <p>No payment required. Enroll now for full access.</p>
          </div>
        </div>

        <h3>What you'll get:</h3>
        <ul class="checklist">
          <li v-for="(item, index) in course?.includes || []" :key="'include-' + index">
            <span class="icon">✔️</span> {{ item }}
          </li>
        </ul>

        <div class="highlight-box guarantee-box">
           <span class="icon">🛡️</span>
           <div>
             <strong>30-Day Satisfaction Guarantee</strong>
             <p>If you're not satisfied with the course, you can unenroll within 30 days.</p>
           </div>
        </div>

        <button class="enroll-button main-enroll-btn" @click="completeEnrollment">
          Enroll Now - Free Access
        </button>
        <p class="terms-notice">
          By enrolling, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>

      <!-- Right Column: Course Summary Card -->
      <aside class="course-summary-card">
        <div class="course-image" :style="{ backgroundImage: `url(${course?.imageUrl})` }"></div>
        <div class="course-content">
          <span class="badge">{{ course?.level }}</span>
          <h3>{{ course?.title }}</h3>
          <div class="meta">
            <span>🕒 {{ course?.hoursDuration }} hours</span>
            <span>•</span>
            <span>📚 {{ course?.lessonsAmount }} lessons</span>
          </div>
          <div class="meta rating-meta">
             <span>⭐ {{ course?.rating }} ({{ formatReviews(course?.reviews || 0) }} reviews)</span>
          </div>
           <div class="meta students-meta">
             <span>👥 {{ formatReviews(studentsEnrolled) }} students enrolled</span>
          </div>
          <div class="meta updated-meta">
             <span>📅 Last updated: {{ formattedLastUpdated }}</span>
          </div>
          <div class="instructor-info">
            <span>Instructor</span>
            <div class="instructor-details">
              <span class="placeholder-avatar small-avatar"></span>
              <strong>{{ course?.instructor?.name }}</strong>
            </div>
          </div>
          <div class="price-info">
            <span class="price-tag">{{ course?.price }}</span>
            <span class="price-subtext">Full access to all content</span>
          </div>
        </div>
         <button class="return-link" @click="returnToCourseDetails">
            Return to course details
        </button>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.enrollment-view {
  max-width: 1100px;
  margin: 30px auto;
  padding: 0 20px;
}

/* Breadcrumbs */
.breadcrumbs {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 25px;
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

.page-title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  color: var(--text-dark);
}

.page-subtitle {
  font-size: 16px;
  text-align: center;
  color: var(--text-light);
  margin-bottom: 40px;
}

.enrollment-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.enrollment-details {
  flex: 2;
  background-color: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 30px;
}

.enrollment-details h2 {
  font-size: 22px;
  margin: 0 0 8px 0;
  color: var(--text-dark);
}

.details-subtitle {
  font-size: 15px;
  color: var(--text-light);
  margin-bottom: 25px;
}

.highlight-box {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 25px;
}

.highlight-box .icon {
  font-size: 24px;
  margin-top: 2px;
}

.highlight-box strong {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-dark);
}

.highlight-box p {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-medium);
  margin: 0;
}

.free-course-box {
  background-color: #e6f9f2;
  border: 1px solid #a7f3d0;
}
.free-course-box .icon { color: var(--primary-color); }
.free-course-box strong { color: #047857; }
.free-course-box p { color: #065f46; }

.guarantee-box {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
}
.guarantee-box .icon { color: #3b82f6; }
.guarantee-box strong { color: #1d4ed8; }
.guarantee-box p { color: #1e40af; }

.enrollment-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: var(--text-dark);
}

.checklist {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.checklist li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: var(--text-medium);
  margin-bottom: 12px;
}

.checklist .icon {
  color: var(--primary-color);
  font-size: 18px;
}

.enroll-button.main-enroll-btn {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  background-color: var(--primary-color);
  color: var(--bg-white);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 15px;
}
.enroll-button.main-enroll-btn:hover {
  background-color: var(--primary-color-dark);
}

.terms-notice {
  font-size: 12px;
  color: var(--text-light);
  text-align: center;
  line-height: 1.4;
}
.terms-notice a {
  color: var(--primary-color);
  text-decoration: underline;
}

/* Course Summary Card */
.course-summary-card {
  flex: 1;
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.course-image {
  height: 150px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Add placeholder icon style if needed */
.course-image::before {
    content: '🖼️';
    font-size: 40px;
    color: #a0a0a0;
}


.course-content {
  padding: 20px;
}

.course-content .badge {
  display: inline-block;
  background: #d1fae5;
  color: #065f46;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
}

.course-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: var(--text-dark);
  line-height: 1.3;
}

.course-content .meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 8px;
}
.course-content .meta span {
    display: flex;
    align-items: center;
    gap: 4px;
}
.course-content .meta.rating-meta span { color: var(--text-medium); }
.course-content .meta.students-meta span { color: var(--text-medium); }
.course-content .meta.updated-meta span { color: var(--text-medium); }


.instructor-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}
.instructor-info > span {
    display: block;
    font-size: 13px;
    color: var(--text-light);
    margin-bottom: 8px;
}
.instructor-details {
    display: flex;
    align-items: center;
    gap: 8px;
}
.placeholder-avatar.small-avatar {
    width: 30px;
    height: 30px;
    background-color: #ccc;
}
.instructor-details strong {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-dark);
}

.price-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}
.price-tag {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 4px;
}
.price-subtext {
  display: block;
  font-size: 13px;
  color: var(--text-light);
}

.return-link {
    display: block;
    width: 100%;
    text-align: center;
    padding: 12px 20px;
    background: none;
    border: none;
    border-top: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--primary-color);
    cursor: pointer;
    font-weight: 500;
}
.return-link:hover {
    background-color: var(--bg-light);
}

/* Responsive */
@media (max-width: 992px) {
  .enrollment-layout {
    flex-direction: column-reverse;
    gap: 30px;
  }
  .course-summary-card {
    position: static;
    width: 100%;
  }
  .enrollment-details {
      padding: 25px;
  }
}

@media (max-width: 576px) {
    .enrollment-view {
        padding: 0 15px;
        margin: 20px auto;
    }
    .page-title { font-size: 24px; }
    .page-subtitle { font-size: 15px; margin-bottom: 30px;}
    .enrollment-details { padding: 20px; }
    .enrollment-details h2 { font-size: 20px; }
    .details-subtitle { font-size: 14px; }
    .highlight-box { padding: 12px; gap: 12px; }
    .highlight-box .icon { font-size: 20px; }
    .highlight-box strong { font-size: 15px; }
    .highlight-box p { font-size: 13px; }
    .enrollment-details h3 { font-size: 17px; }
    .checklist li { font-size: 14px; gap: 8px; margin-bottom: 10px; }
    .checklist .icon { font-size: 16px; }
    .enroll-button.main-enroll-btn { padding: 12px; font-size: 15px; }
    .terms-notice { font-size: 11px; }

    .course-content { padding: 15px; }
    .course-content h3 { font-size: 17px; }
    .course-content .meta { font-size: 12px; }
    .price-tag { font-size: 22px; }
    .price-subtext { font-size: 12px; }
    .return-link { font-size: 13px; padding: 10px 15px; }
}

</style>
