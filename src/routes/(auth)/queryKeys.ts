import type { QueryKey } from '@tanstack/vue-query';

const base = ['user'] as const;

// Helper type for 'satisfies' (function with any sort of arguments returning a key)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type QueryKeyFn = (...args: any[]) => QueryKey;

export const userKeys = {
  user: base,
} satisfies Record<string, QueryKey | QueryKeyFn>;
