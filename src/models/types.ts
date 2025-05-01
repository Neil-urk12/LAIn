import type { Courses, Instructor } from "./interfaces";

export type CourseWithExpand = Courses & { expand?: { instructorId: Instructor } };