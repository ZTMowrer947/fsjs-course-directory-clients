import { useQuery } from '@tanstack/vue-query';
import { MaybeRef, toValue } from 'vue';

import { fetchSingleCourse } from '~/routes/courses/queries.ts';
import courseKeys from '~/routes/courses/queryKeys.ts';

export default function useCourseQuery(idRef: MaybeRef<number>) {
  const id = toValue(idRef);

  return useQuery({
    queryKey: courseKeys.byId(id),
    queryFn: ({ queryKey }) => fetchSingleCourse(queryKey[1]),
  });
}
