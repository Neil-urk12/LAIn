export interface User {
  id: string;
  email: string;
  name: string;
  username: string
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  token: string;
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
