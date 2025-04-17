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
  title: string;
  description: string;
  price: string;
  instructorId: string;
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
