import { toRef, type Ref } from "vue";
import { useRoute, type RouteParams } from "vue-router";

export const useParams = <T = RouteParams>() => {
    const route = useRoute();
    return toRef(route, "params") as Ref<T>;
};
