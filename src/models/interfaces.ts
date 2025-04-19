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
  company?: string
  position?: string;
  bio?: string;
  profilePicture?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  token?: string;
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
  lessonsAmount: number;
  whatYoullLearn: string[];
  requirements: string[];
  whoIsFor: string[];
  includes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollments {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lessons {
  id: string;
  title: string;
  content: string;
  courseId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificates {
  id: string;
  userId: string;
  courseId: string;
  issueDate: string;
  credentialId: string;
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
