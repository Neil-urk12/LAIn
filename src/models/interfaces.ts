export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  password?: string;
  role: string;
  emailVisibility: boolean;
  linkedIn?: string;
  website?: string;
  company?: string;
  position?: string;
  bio?: string;
  profilePicture?: string;
  verified: boolean;
  created: string;
  updated: string;
  token?: string;
  isActive: boolean
  learningStreak: number;
  lastLoginDate?: string;
}

export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  jobTitle: string;
  company: string;
  website: string;
  linkedin: string;
}

export interface TempUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  record: User;
}

export interface Courses {
  id: string;
  instructorId: string;
  title: string;
  courseCode: string;
  description: string;
  aboutCourse: string;
  level: string;
  hoursDuration: number;
  rating: number;
  price: string;
  status: string;
  reviews: number;
  imageUrl: string;
  lessonsAmount: number;
  courseImage?: string;
  whatYoullLearn: string[] | string;
  requirements: string[] | string;
  whoIsFor: string[] | string;
  includes: string[] | string;
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  rating: number;
  courses: number;
  bio: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollments {
  id: string;
  userId: string;
  courseId: string;
  isCompleted: boolean
  status: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  expand?: {
    userId?: User;
    courseId: Courses;
  };
}

export interface Lessons {
  id: string;
  title: string;
  content: string;
  richContent: string;
  courseId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificates {
  id: string;
  userId?: string;
  courseId: string;
  templateId: string
  issuedDate?: string;
  credentialId: string;
  status: 'published' | 'draft' | 'revoked';
  expirationDate?: string;
  verificationUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateTemplates {
  id: string
  title: string
  specialization: string
  courseCode: string
  instructorId: string
  tags: string[]
  requirements: string[]
  verified: boolean
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  deviceInfo: string;
  ipAddress: string;
  lastActive: string;
  token: string;
  isActive: boolean;
  created?: string;
  updated?: string;
}

export interface Reviews {
  id: string;
  courseId: string;
  userId: string;
  instructorId: string;
  starsRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
/*

courseId: FACAI100
userId:
instructorId;

*/
