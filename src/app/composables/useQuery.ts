import { toRef } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import type { LocationQuery } from 'vue-router';

export const useQuery = <T = LocationQuery>() => {
    const route = useRoute();
    return toRef(route, 'query') as Ref<T>;
};
