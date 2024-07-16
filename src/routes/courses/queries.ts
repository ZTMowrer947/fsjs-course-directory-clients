import type { CourseDetail, CoursePreview } from '~/entities/course.ts';

export async function fetchCourseList(): Promise<CoursePreview[]> {
  const res = await fetch('http://localhost:5000/api/courses');

  return res.json();
}

export async function fetchSingleCourse(id: CourseDetail['id']): Promise<CourseDetail | null> {
  const url = `http://localhost:5000/api/courses/${encodeURIComponent(id)}`;

  const res = await fetch(url);

  if (res.status === 404) {
    return null;
  } else {
    return res.json();
  }
}
