import type { CourseDetail, CourseUpsertModel } from '~/entities/course.ts';

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
