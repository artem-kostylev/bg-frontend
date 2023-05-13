<script setup lang="ts">
import { computed, onBeforeUnmount } from "vue";
import { useLazyAsyncData, useName, clearNuxtData } from "#imports";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import { Button, Modal } from "@ui/components";
import { fetchMovement } from "@/booking/services";
import type { Movement } from "@/booking/types";
import { FareCard, FareList } from "@/booking/components";
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

const isMulti = computed(() => (data.value?.fares.length ?? 0) > 1);

onBeforeUnmount(() => clearNuxtData(`movement-${props.movement.flight_hash}`));
</script>

<template>
    <Modal
        :loading="pending"
        @open="open"
        :size="isMulti ? 'lg' : 'sm'"
        :title="isMulti ? 'Тарифы' : data?.fares[0].fare_name"
    >
        <template #trigger="{ vbind }">
            <Button v-bind="vbind" block variant="primary">
                {{ formattedPrice }}
            </Button>
        </template>
        <template v-if="data">
            <FareList
                v-if="isMulti"
                :fares="data.fares"
                :is-route-last="data.is_route_last"
                :price="price"
            />
            <FareCard
                v-else
                :fare="data.fares[0]"
                :is-route-last="data.is_route_last"
                :price="price"
                variant="simple"
            />
        </template>
    </Modal>
</template>
