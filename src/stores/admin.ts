import { defineStore } from 'pinia';
import { pb } from '../pocketbase/pocketbase';
import type { User, Courses, Enrollments, Instructor } from '../models/interfaces';
import type { Component } from 'vue';
import { Users, BookOpen, BarChart2, DollarSign } from 'lucide-vue-next';

interface Stat {
  title: string;
  value: number;
  change: string;
  icon: Component;
}

interface Activity {
  id: string;
  initials: string;
  userName: string;
  action: string;
  subject: string | null;
  timestamp: string;
  avatarColor: string;
}

interface QuickAction {
  label: string;
}

export interface CourseWithInstructor extends Courses {
  instructorName?: string;
  enrollmentsCount?: number;
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    stats: [] as Stat[],
    recentActivity: [] as Activity[],
    quickActions: [
      { label: 'Create New Course' },
      { label: 'Add New User' },
      { label: 'View Analytics' },
      { label: 'System Settings' },
    ] as QuickAction[],
    users: [] as User[],
    courses: [] as CourseWithInstructor[],
    instructors: [] as Instructor[],
    loading: {
      stats: false,
      activity: false,
      users: false,
      courses: false,
      instructors: false
    },
    error: null as string | null,
  }),

  actions: {
    async fetchStats() {
      this.loading.stats = true;
      this.error = null;

      try {
        // Fetch total users count
        const usersCount = await pb.collection('users').getList(1, 1, {
          filter: 'role != "admin"'
        });

        // Fetch total courses count
        const coursesCount = await pb.collection('courses').getList(1, 1);

        // Fetch active enrollments count
        const enrollmentsCount = await pb.collection('enrollments').getList(1, 1, {
          filter: 'status = "enrolled"'
        });

        // Calculate revenue (this is a placeholder - actual implementation would depend on your data model)
        // For example, you might need to sum up all course prices from enrollments
        let revenue = 0;
        const enrollments = await pb.collection<Enrollments>('enrollments').getFullList({
          expand: 'courseId'
        });

        enrollments.forEach(enrollment => {
          if (enrollment.expand?.courseId) {
            const course = enrollment.expand.courseId as unknown as Courses;
            revenue += parseFloat(course.price) || 0;
          }
        });

        // Update stats with real data
        this.stats = [
          { title: 'Total Users', value: usersCount.totalItems, change: '+12.5%', icon: Users },
          { title: 'Total Courses', value: coursesCount.totalItems, change: '+4.2%', icon: BookOpen },
          { title: 'Active Enrollments', value: enrollmentsCount.totalItems, change: '+18.7%', icon: BarChart2 },
          { title: 'Revenue', value: Math.round(revenue), change: '+8.3%', icon: DollarSign },
        ];
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching admin stats:', err);
      } finally {
        this.loading.stats = false;
      }
    },

    async fetchRecentActivity() {
      this.loading.activity = true;
      this.error = null;

      try {
        // Fetch recent enrollments
        const enrollments = await pb.collection<Enrollments>('enrollments').getList(1, 10, {
          sort: '-created',
          expand: 'userId,courseId'
        });

        // Transform enrollments into activity items
        const activities: Activity[] = [];

        enrollments.items.forEach((enrollment, index) => {
          if (enrollment.expand?.userId && enrollment.expand?.courseId) {
            const user = enrollment.expand.userId as unknown as User;
            const course = enrollment.expand.courseId as unknown as Courses;

            // Generate initials from user name
            const nameParts = user.name.split(' ');
            const initials = nameParts.length > 1
              ? `${nameParts[0][0]}${nameParts[1][0]}`
              : user.name.substring(0, 2);

            // Generate a color based on the index
            const colors = ['#86efac', '#93c5fd', '#fca5a5', '#c4b5fd', '#fdba74'];
            const avatarColor = colors[index % colors.length];

            // Format timestamp
            const timestamp = this.formatTimestamp(enrollment.createdAt);

            activities.push({
              id: enrollment.id,
              initials: initials.toUpperCase(),
              userName: user.name,
              action: 'enrolled in',
              subject: course.title,
              timestamp,
              avatarColor
            });
          }
        });

        // Add some account creation activities
        const recentUsers = await pb.collection<User>('users').getList(1, 5, {
          sort: '-created'
        });

        recentUsers.items.forEach((user, index) => {
          // Generate initials from user name
          const nameParts = user.name.split(' ');
          const initials = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`
            : user.name.substring(0, 2);

          // Generate a color based on the index
          const colors = ['#86efac', '#93c5fd', '#fca5a5', '#c4b5fd', '#fdba74'];
          const avatarColor = colors[(index + 3) % colors.length];

          // Format timestamp
          const timestamp = this.formatTimestamp(user.created);

          activities.push({
            id: user.id,
            initials: initials.toUpperCase(),
            userName: user.name,
            action: 'created account',
            subject: null,
            timestamp,
            avatarColor
          });
        });

        // Sort activities by timestamp (most recent first)
        activities.sort((a, b) => {
          return this.getTimestampValue(b.timestamp) - this.getTimestampValue(a.timestamp);
        });

        // Take only the 5 most recent activities
        this.recentActivity = activities.slice(0, 5);
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching recent activity:', err);
      } finally {
        this.loading.activity = false;
      }
    },

    async fetchUsers() {
      this.loading.users = true;
      this.error = null;

      try {
        const users = await pb.collection<User>('users').getFullList({
          sort: '-created'
        });

        // Fetch all enrollments
        const allEnrollments = await pb.collection('enrollments').getFullList();

        // Calculate enrollment counts for each user
        const enrollmentCounts: Record<string, number> = {};
        allEnrollments.forEach(enrollment => {
          enrollmentCounts[enrollment.userId] = (enrollmentCounts[enrollment.userId] || 0) + 1;
        });

        // Transform user records into the format needed by UserManagement component
        this.users = users.map(user => ({
          ...user,
          enrolledCourses: enrollmentCounts[user.id] || 0,
          status: user.verified ? 'Active' : 'Inactive',
          created: user.created.split('T')[0] // Format date as YYYY-MM-DD
        }));
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching users:', err);
      } finally {
        this.loading.users = false;
      }
    },

    // Helper function to format timestamps
    formatTimestamp(isoString: string): string {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return 'just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `about ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

      return date.toLocaleDateString();
    },

    // Helper function to convert timestamp strings to numeric values for sorting
    getTimestampValue(timestamp: string): number {
      if (timestamp === 'just now') return Date.now();

      const minutesMatch = timestamp.match(/(\d+) minute/);
      if (minutesMatch) return Date.now() - parseInt(minutesMatch[1]) * 60000;

      const hoursMatch = timestamp.match(/(\d+) hour/);
      if (hoursMatch) return Date.now() - parseInt(hoursMatch[1]) * 3600000;

      const daysMatch = timestamp.match(/(\d+) day/);
      if (daysMatch) return Date.now() - parseInt(daysMatch[1]) * 86400000;

      return 0;
    },

    // Course Management Actions
    async fetchCourses() {
      this.loading.courses = true;
      this.error = null;

      try {
        // Fetch all courses
        const coursesData = await pb.collection<Courses>('courses').getFullList({
          sort: '-created'
        });

        // Fetch all instructors to get their names
        await this.fetchInstructors();

        // Fetch all enrollments to count per course
        const allEnrollments = await pb.collection('enrollments').getFullList();

        // Calculate enrollment counts for each course
        const enrollmentCounts: Record<string, number> = {};
        allEnrollments.forEach(enrollment => {
          enrollmentCounts[enrollment.courseId] = (enrollmentCounts[enrollment.courseId] || 0) + 1;
        });

        // Transform course records with additional data
        this.courses = coursesData.map(course => {
          const instructor = this.instructors.find(i => i.id === course.instructorId);
          return {
            ...course,
            instructorName: instructor?.name || 'Unknown',
            enrollmentsCount: enrollmentCounts[course.id] || 0
          };
        });
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching courses:', err);
      } finally {
        this.loading.courses = false;
      }
    },

    async fetchInstructors() {
      this.loading.instructors = true;
      this.error = null;

      try {
        const instructorsData = await pb.collection<Instructor>('instructors').getFullList({
          sort: 'name'
        });
        this.instructors = instructorsData;
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching instructors:', err);
      } finally {
        this.loading.instructors = false;
      }
    },

    async createCourse(courseData: Partial<Courses>) {
      this.loading.courses = true;
      this.error = null;

      try {
        const newCourse = await pb.collection('courses').create(courseData);
        await this.fetchCourses(); // Refresh the courses list
        return newCourse;
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error creating course:', err);
        throw err;
      } finally {
        this.loading.courses = false;
      }
    },

    async updateCourse(id: string, courseData: Partial<Courses>) {
      this.loading.courses = true;
      this.error = null;

      try {
        const updatedCourse = await pb.collection('courses').update(id, courseData);
        await this.fetchCourses(); // Refresh the courses list
        return updatedCourse;
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error updating course:', err);
        throw err;
      } finally {
        this.loading.courses = false;
      }
    },

    async deleteCourse(id: string) {
      this.loading.courses = true;
      this.error = null;

      try {
        await pb.collection('courses').delete(id);
        // Remove the course from the local state
        this.courses = this.courses.filter(course => course.id !== id);
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error deleting course:', err);
        throw err;
      } finally {
        this.loading.courses = false;
      }
    }
  }
});
