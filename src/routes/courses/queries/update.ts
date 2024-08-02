import type { CoursePreview, CourseUpsertModel } from '~/entities/course.ts';
import type { ICredentialManager } from '~/lib/credential.ts';

export async function updateCourse(
  id: CoursePreview['id'],
  updateData: CourseUpsertModel,
  credentialManager: ICredentialManager,
): Promise<void> {
  const encoded = credentialManager.encode(credentialManager.get()!);

  const res = await fetch(`http://localhost:5000/api/courses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  // TODO: Handle error scenerios more properly
  if (!res.ok) {
    throw new Error('Error updating course');
  }
}
