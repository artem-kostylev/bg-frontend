import type { Ref } from "vue";
import type { RouteParams } from "vue-router";
import { useRoute, toRef } from "#imports";

export const useParams = <T = RouteParams>() => {
    const route = useRoute();
    return toRef(route, "params") as Ref<T>;
};
