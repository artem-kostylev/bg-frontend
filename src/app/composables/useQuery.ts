import type { Ref } from "vue";
import type { LocationQuery } from "vue-router";
import { useRoute, toRef } from "#imports";

export const useQuery = <T = LocationQuery>() => {
    const route = useRoute();
    return toRef(route, "query") as Ref<T>;
};
