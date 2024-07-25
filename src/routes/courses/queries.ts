import type { CourseDetail, CoursePreview, CourseUpsertModel } from '~/entities/course.ts';

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

export async function createCourse(encodedCredentials: string, courseData: CourseUpsertModel): Promise<CourseDetail> {
  const res = await fetch('http://localhost:5000/api/courses', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });

  if (res.ok) {
    return res.json();
  } else if (res.status === 400) {
    // TODO: Handle more properly
    throw new Error('Validation error');
  } else {
    throw new Error('Unexpected error while creating user');
  }
}
