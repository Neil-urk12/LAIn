import { defineStore } from 'pinia';
import { pb } from '../pocketbase/pocketbase';
import type { Enrollments } from '../models/interfaces';
import { useAuthStore } from './auth';

export const useEnrollmentStore = defineStore('enrollment', {
  state: () => ({
    enrollments: [] as Enrollments[],
    completedCourses: [] as Enrollments[],
    currentEnrollment: null as Enrollments | null,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    isEnrolled: (state) => (courseId: string) => {
      return state.enrollments.some(e => e.courseId === courseId);
    },
    completedCoursesCount: (state) => {
      return state.completedCourses.length;
    },
    isLoading: (state) => {
      return state.loading;
    },
    enrollmentsCount: (state) => {
      return state.enrollments.length;
    }
  },
  actions: {
    async fetchByCourse(courseId: string) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) throw new Error('User not authenticated');
        const filterStr = `courseId="${courseId}" && userId="${authStore.user.id}"`;
        const list = await pb.collection<Enrollments>('enrollments').getFullList({ filter: filterStr });
        this.enrollments = list;
        // Set currentEnrollment if exists
        this.currentEnrollment = list.length > 0 ? list[0] : null;
        const completed = list.filter(e => e.isCompleted);
        this.completedCourses = completed;
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },
    async fetchEnrolledCourses() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) throw new Error('User not authenticated');
        const filterStr = `userId="${authStore.getUser?.id}" && status="enrolled"`;
        const list = await pb.collection<Enrollments>('enrollments').getFullList({
          filter: filterStr,
          expand: 'courseId',
        });
        this.enrollments = list;
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },
    async enroll(courseId: string) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        if (!authStore.user) throw new Error('User not authenticated');
        const record = await pb.collection<Enrollments>('enrollments').create({
          userId: authStore.user.id,
          courseId,
          isCompleted: false,
          status: 'enrolled',
          progress: 0,
        });
        this.currentEnrollment = record;
        this.enrollments.push(record);
        return record;
      } catch (err) {
        this.error = (err as Error).message;
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
