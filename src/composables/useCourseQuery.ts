import { useQuery } from '@tanstack/vue-query';
import { MaybeRef, toValue } from 'vue';

import singleCourseQueryOpts from '~/routes/courses/queries/single.ts';

export default function useCourseQuery(idRef: MaybeRef<number>) {
  const id = toValue(idRef);

  return useQuery(singleCourseQueryOpts(id));
}
