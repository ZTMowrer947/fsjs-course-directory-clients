import type { CoursePreview } from '~/entities/course.ts';

export async function fetchCourseList(): Promise<CoursePreview[]> {
  const res = await fetch('http://localhost:5000/api/courses');

  return res.json();
}
