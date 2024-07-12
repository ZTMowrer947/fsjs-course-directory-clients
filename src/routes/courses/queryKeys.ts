import type { QueryKey } from '@tanstack/vue-query';

import type { CourseDetail } from '~/entities/course.ts';

// Helper type for 'satisfies' (function with any sort of arguments returning a key)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryKeyFn = (...args: any[]) => QueryKey;

const baseKey = ['courses'] as const;
const courseKeys = {
  all: baseKey,
  byId: (id: CourseDetail['id']) => [baseKey, id] as const,
} satisfies Record<string, QueryKey | QueryKeyFn>;

export default courseKeys;
