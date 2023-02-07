import { toRef, type Ref } from "vue";
import { useRoute, type LocationQuery } from "vue-router";

export const useQuery = <T = LocationQuery>() => {
    const route = useRoute();
    return toRef(route, "query") as Ref<T>;
};
