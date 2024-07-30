import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default function useCourseId() {
  const route = useRoute();
  return computed(() => Number.parseInt(route.params.id.toString(), 10));
}
