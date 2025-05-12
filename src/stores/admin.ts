import { defineStore } from 'pinia';
import { pb } from '../pocketbase/pocketbase';
import type { User, Courses, Enrollments, Instructor } from '../models/interfaces';
import type { Component } from 'vue';
import { Users, BookOpen, BarChart2, DollarSign, Clock, Award, TrendingUp } from 'lucide-vue-next';

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
    analytics: {
      enrollmentTrends: [] as { date: string, count: number }[],
      topCourses: [] as { id: string, title: string, enrollments: number, completionRate: number, growth: number, isNegative: boolean }[],
      userActivity: [] as { date: string, count: number }[],
      engagementMetrics: [] as { name: string, value: string, change: number, isNegative: boolean }[],
      summaryStats: [] as { title: string, value: string | number, change: string, isNegative: boolean, icon: Component }[]
    },
    loading: {
      stats: false,
      activity: false,
      users: false,
      courses: false,
      instructors: false,
      analytics: false
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
          sort: '-createdAt',
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
        console.log('Fetched users:', users);

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

    async updateUser(id: string, userData: Partial<User>) {
      this.loading.users = true;
      this.error = null;
      console.log('Updating user with ID:', id);
      console.log('Update data:', userData);

      try {
        // Ensure required fields are present
        if (!userData.name || !userData.username || !userData.role) {
          console.warn('Required fields missing, fetching user first');
          const existingUser = await pb.collection('users').getOne(id);
          userData = {
            ...userData,
            name: userData.name || existingUser.name,
            username: userData.username || existingUser.username,
            role: userData.role || existingUser.role
          };
        }

        console.log('PocketBase collection:', pb.collection('users'));
        console.log('Final update data:', userData);
        console.log('Request URL will be:', `${pb.baseUrl}/api/collections/users/records/${id}`);

        const updatedUser = await pb.collection('users').update(id, userData);
        console.log('User updated successfully:', updatedUser);
        await this.fetchUsers();
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error updating user:', err);
        // Log more details about the error
        if (err && typeof err === 'object' && 'status' in err) {
          console.error('Status code:', (err as { status: unknown }).status);
          if ('data' in err) {
            console.error('Response data:', (err as { data: unknown }).data);
          }
          // Add more specific error handling
          if ((err as { status: unknown }).status === 404) {
            console.error('404 Not Found - Check that the user ID exists and the collection name is correct');
          }
        }
        throw err;
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
          sort: '-createdAt'
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
        const completeCourseData = {
          ...courseData,
          instructorId: courseData.instructorId || this.instructors[0].id
        };

        const newCourse = await pb.collection('courses').create(completeCourseData);
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
    },

    // User Management Actions
    async createUser(userData: Partial<User>) {
      this.loading.users = true;
      this.error = null;
      console.log('Creating user with data:', userData);
      try {
        const newUser = await pb.collection('users').create({
          ...userData,
          passwordConfirm: userData.password
        });
        await this.fetchUsers(); // Refresh the users list
        return newUser;
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error creating user:', err);
        throw err;
      } finally {
        this.loading.users = false;
      }
    },

    async deleteUser(id: string) {
      this.loading.users = true;
      this.error = null;

      try {
        await pb.collection('users').delete(id);
        // Remove the user from the local state
        this.users = this.users.filter(user => user.id !== id);
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error deleting user:', err);
        throw err;
      } finally {
        this.loading.users = false;
      }
    },

    async resetUserPassword(id: string, newPassword: string) {
      this.loading.users = true;
      this.error = null;

      try {
        await pb.collection('users').update(id, {
          password: newPassword,
          passwordConfirm: newPassword
        });
        return true;
      } catch (err) {
        this.error = (err as Error).message;
        console.error('Error resetting user password:', err);
        throw err;
      } finally {
        this.loading.users = false;
      }
    },

    async fetchAnalytics(period: string = '30days') {
      this.loading.analytics = true;
      this.error = null;

      try {
        // Calculate date range based on period parameter
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
          case '7days':
            startDate.setDate(startDate.getDate() - 7);
            break;
          case '30days':
            startDate.setDate(startDate.getDate() - 30);
            break;
          case '90days':
            startDate.setDate(startDate.getDate() - 90);
            break;
          case 'year':
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
          case 'all':
            startDate.setFullYear(2000); // Far enough back to include all data
            break;
          default:
            startDate.setDate(startDate.getDate() - 30); // Default to 30 days
        }

        // Format dates for filter
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];

        // Fetch enrollments for trends
        const enrollments = await pb.collection('enrollments').getList(1, 1000, {
          filter: `created >= "${startDateStr}" && created <= "${endDateStr}"`,
          sort: 'created'
        });

        // Process enrollments to get trends data by day
        const enrollmentsByDay = this.processEnrollmentTrends(enrollments.items);
        this.analytics.enrollmentTrends = enrollmentsByDay;

        // Fetch user signups for activity trends
        const users = await pb.collection('users').getList(1, 1000, {
          filter: `created >= "${startDateStr}" && created <= "${endDateStr}"`,
          sort: 'created'
        });

        // Process user data to get activity by day
        const userActivityByDay = this.processUserActivity(users.items);
        this.analytics.userActivity = userActivityByDay;

        // Fetch courses for top courses data
        const courses = await pb.collection('courses').getFullList();

        // Get counts of enrollments for each course
        const coursesWithEnrollments = await this.getCoursesWithEnrollments(courses, startDateStr, endDateStr);
        this.analytics.topCourses = coursesWithEnrollments.slice(0, 5); // Top 5 courses

        // Generate engagement metrics
        await this.generateEngagementMetrics(startDateStr, endDateStr);

        // Generate summary stats
        this.generateSummaryStats(enrollments.items, users.items);
      }
      catch (err) {
        this.error = (err as Error).message;
        console.error('Error fetching analytics data:', err);
      }
      finally {
        this.loading.analytics = false;
      }
    },

    processEnrollmentTrends(enrollments: any[]): { date: string, count: number }[] {
      // Group enrollments by date
      const enrollmentsByDate: Record<string, number> = {};

      enrollments.forEach(enrollment => {
        const date = enrollment.created.split('T')[0];
        enrollmentsByDate[date] = (enrollmentsByDate[date] || 0) + 1;
      });

      // Convert to array and sort by date
      const result = Object.keys(enrollmentsByDate).map(date => ({
        date,
        count: enrollmentsByDate[date]
      })).sort((a, b) => a.date.localeCompare(b.date));

      return result;
    },

    processUserActivity(users: any[]): { date: string, count: number }[] {
      // Group users by signup date
      const usersByDate: Record<string, number> = {};

      users.forEach(user => {
        const date = user.created.split('T')[0];
        usersByDate[date] = (usersByDate[date] || 0) + 1;
      });

      // Convert to array and sort by date
      const result = Object.keys(usersByDate).map(date => ({
        date,
        count: usersByDate[date]
      })).sort((a, b) => a.date.localeCompare(b.date));

      return result;
    },

    async getCoursesWithEnrollments(courses: any[], startDate: string, endDate: string) {
      // For each course, get enrollment count and completion rate
      const coursesWithData = [];

      // Get previous period to calculate growth
      const prevStartDate = new Date(startDate);
      const prevEndDate = new Date(endDate);
      const periodDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
      prevStartDate.setDate(prevStartDate.getDate() - periodDays);
      prevEndDate.setDate(prevEndDate.getDate() - periodDays);

      const prevStartStr = prevStartDate.toISOString().split('T')[0];
      const prevEndStr = prevEndDate.toISOString().split('T')[0];

      for (const course of courses) {
        // Get current period enrollments
        const enrollments = await pb.collection('enrollments').getList(1, 1, {
          filter: `courseId = "${course.id}" && created >= "${startDate}" && created <= "${endDate}"`,
          sort: 'created'
        });

        // Get previous period enrollments
        const prevEnrollments = await pb.collection('enrollments').getList(1, 1, {
          filter: `courseId = "${course.id}" && created >= "${prevStartStr}" && created <= "${prevEndStr}"`,
          sort: 'created'
        });

        // Get completed enrollments count
        const completedEnrollments = await pb.collection('enrollments').getList(1, 1, {
          filter: `courseId = "${course.id}" && isCompleted = true && created >= "${startDate}" && created <= "${endDate}"`,
          sort: 'created'
        });

        // Calculate completion rate
        const completionRate = enrollments.totalItems > 0
          ? Math.round((completedEnrollments.totalItems / enrollments.totalItems) * 100)
          : 0;

        // Calculate growth
        const growth = prevEnrollments.totalItems > 0
          ? Math.round(((enrollments.totalItems - prevEnrollments.totalItems) / prevEnrollments.totalItems) * 100)
          : (enrollments.totalItems > 0 ? 100 : 0);

        coursesWithData.push({
          id: course.id,
          title: course.title,
          enrollments: enrollments.totalItems,
          completionRate,
          growth,
          isNegative: growth < 0
        });
      }

      // Sort by enrollments (descending)
      return coursesWithData.sort((a, b) => b.enrollments - a.enrollments);
    },


    async generateEngagementMetrics(startDate: string, endDate: string) {
      // This would require additional data collection in a real app
      // Here we'll use some placeholders based on available data

      // Get total users
      const users = await pb.collection('users').getList(1, 1, {
        filter: `created <= "${endDate}"`
      });

      // Get total enrollments
      const enrollments = await pb.collection('enrollments').getList(1, 1, {
        filter: `created <= "${endDate}"`
      });

      // Get active users (users with recent activity, approximated by login date)
      // In a real app, you would have more precise activity tracking
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 7); // Consider active if logged in last 7 days
      const recentDateStr = recentDate.toISOString().split('T')[0];

      const activeUsers = await pb.collection('users').getList(1, 1, {
        filter: `lastLoginDate >= "${recentDateStr}"`
      });

      // Calculate average courses per user
      const coursesPerUser = users.totalItems > 0 ?
        (enrollments.totalItems / users.totalItems).toFixed(1) : '0';

      // Calculate daily active users as a percentage of total users
      const dailyActiveUsers = activeUsers.totalItems;

      // For metrics like average session duration, we'd need detailed analytics tracking
      // Here we'll use placeholder values

      this.analytics.engagementMetrics = [
        { name: 'Average Session Duration', value: '12 mins', change: 8, isNegative: false },
        { name: 'Courses Per User', value: coursesPerUser, change: 5, isNegative: false },
        { name: 'Daily Active Users', value: dailyActiveUsers.toString(), change: 12, isNegative: false },
        { name: 'Learning Streak Avg.', value: '3.5 days', change: 2, isNegative: false },
        { name: 'Content Completion Rate', value: '65%', change: 7, isNegative: false }
      ];
    },

    generateSummaryStats(enrollments: Record<string, any>[], users: Record<string, any>[]) {
      // Calculate total enrollments
      const totalEnrollments = enrollments.length;

      // Calculate total user growth
      const totalUsers = users.length;

      // For completion rate and time, we would need more detailed data
      // Using placeholders for now
      const completionRate = '68%';
      const completionTime = '14 days';

      // Placeholders for change percentages
      const enrollmentChange = '12.5%';
      const completionTimeChange = '4.2%';
      const completionRateChange = '8.7%';
      const userGrowthChange = '18.3%';

      this.analytics.summaryStats = [
        {
          title: 'Total Enrollments',
          value: totalEnrollments.toLocaleString(),
          change: enrollmentChange,
          isNegative: false,
          icon: Users
        },
        {
          title: 'Avg. Completion Time',
          value: completionTime,
          change: completionTimeChange,
          isNegative: true,
          icon: Clock
        },
        {
          title: 'Completion Rate',
          value: completionRate,
          change: completionRateChange,
          isNegative: false,
          icon: Award
        },
        {
          title: 'User Growth',
          value: `${totalUsers}`,
          change: userGrowthChange,
          isNegative: false,
          icon: TrendingUp
        }
      ];
    }
  }
});
