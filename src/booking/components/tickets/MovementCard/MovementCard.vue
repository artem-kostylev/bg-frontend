<script setup lang="ts">
import { computed, onBeforeUnmount, resolveComponent } from "vue";
import type { RouteLocationNamedRaw } from "vue-router";
import { useLazyAsyncData, useName, clearNuxtData } from "#imports";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import { Button } from "@ui/components";
import { fetchMovement } from "@/booking/services";
import type { Movement } from "@/booking/types";
import { FareModal, MovementBox } from "@/booking/components";
import type { FetchMovementQuery } from "@/booking/services";

type Props = {
    movement: Movement;
    price: number | null;
};

const props = defineProps<Props>();

const name = useName<"booking-tickets" | "avia-search">();
const query = useQuery<FetchMovementQuery>();

const getMovement = () => {
    return fetchMovement(
        {
            ...query.value,
            flight_hash: props.movement.flight_hash,
        },
        name.value
    );
};

const { data, pending, execute } = useLazyAsyncData(
    `movement-${props.movement.flight_hash}`,
    getMovement,
    { immediate: false }
);

const open = () => !data.value && execute();

const formattedPrice = computed(() => {
    return name.value === "booking-tickets"
        ? `+ ${formatCurrency(props.movement.price - (props.price ?? 0))}`
        : `от ${formatCurrency(props.movement.price)}`;
});

const NuxtLink = resolveComponent("NuxtLink");

const to = computed(() => {
    const route: RouteLocationNamedRaw = {};
    route.query = { ...query.value };

    if (props.movement.is_route_last) {
        route.name = "booking-composition";
        route.query.tours_hash = props.movement.flight_hash;
        // TODO: Fix this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        route.query.ids = [[props.movement.tour_id]] as any;
    } else {
        route.name = "booking-tickets";
        route.query.ids = [props.movement.route_id];
    }

    return route;
});

onBeforeUnmount(() => clearNuxtData(`movement-${props.movement.flight_hash}`));
</script>

<template>
    <MovementBox :movement="movement">
        <template #footer>
            <Button
                variant="primary"
                :as="NuxtLink"
                :to="to"
                v-if="movement.is_regular === 'virtual'"
            >
                + 0 ₽
            </Button>
            <FareModal v-else :price="price" :movement="movement" />
        </template>
    </MovementBox>
</template>
