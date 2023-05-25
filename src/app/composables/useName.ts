import { toRef, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteRecordName } from 'vue-router';

export const useName = <T = RouteRecordName>() => {
    const route = useRoute();
    return toRef(route, 'name') as Ref<T>;
};
