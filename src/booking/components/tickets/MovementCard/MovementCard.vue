<script setup lang="ts">
import { computed, onBeforeUnmount } from "vue";
import type { RouteLocationNamedRaw } from "vue-router";
import { useLazyAsyncData, useName, clearNuxtData, resolveComponent } from "#imports";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import { Button, Modal } from "@ui/components";
import { fetchMovement } from "@/booking/services";
import type { Movement } from "@/booking/types";
import { FareList, MovementBox } from "@/booking/components";
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
    {
        server: false,
        immediate: false,
    }
);

const open = () => !data.value && execute();

const formattedPrice = computed(() => {
    return name.value === "booking-tickets"
        ? `+ ${formatCurrency(props.movement.price - (props.price ?? 0))}`
        : `${formatCurrency(props.movement.price)}`;
});

const NuxtLink = resolveComponent("NuxtLink");

const to = computed(() => {
    const route: RouteLocationNamedRaw = {};
    route.query = query.value;

    if (props.movement.is_route_last) {
        route.name = "booking-composition";
        route.query.tours_hash = props.movement.flight_hash;
    }

    return route;
});

onBeforeUnmount(() => clearNuxtData(`movement-${props.movement.flight_hash}`));
</script>

<template>
    <MovementBox :movement="movement">
        <template #footer>
            <Button :as="NuxtLink" :to="to" v-if="movement.is_regular === 'virtual'">
                + 0 ₽
            </Button>
            <Modal v-else :loading="pending" @open="open" size="lg" title="Выбор тарифа">
                <template #trigger="{ vbind }">
                    <Button v-bind="vbind" block variant="primary">
                        {{ formattedPrice }}
                    </Button>
                </template>
                <FareList
                    v-if="data"
                    :fares="data.fares"
                    :is-route-last="data.is_route_last"
                    :price="price"
                />
            </Modal>
        </template>
    </MovementBox>
</template>
