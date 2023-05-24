import { toRef } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import type { RouteParams } from "vue-router";

export const useParams = <T = RouteParams>() => {
    const route = useRoute();
    return toRef(route, "params") as Ref<T>;
};
