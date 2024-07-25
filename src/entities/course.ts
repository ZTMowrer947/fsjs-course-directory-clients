import type { User } from './user.ts';

export interface CourseDetail {
  id: number;
  userId: number;
  user: Pick<User, 'firstName' | 'lastName'>;
  title: string;
  description: string;
  estimatedTime: string | null;
  materialsNeeded: string | null;
}

export type CoursePreview = Pick<CourseDetail, 'id' | 'title'>;

export type CourseUpsertModel = Pick<CourseDetail, 'title' | 'description' | 'estimatedTime' | 'materialsNeeded'>;
