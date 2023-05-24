<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useQuery } from '@/app/composables';
import { Button } from '@ui/components';
import type { Movement } from '@/booking/types';
import { FareModal, MovementBox } from '@/booking/components';
import type { FetchMovementQuery } from '@/booking/services';

type Props = {
    movement: Movement;
    price: number | null;
};

const props = defineProps<Props>();

const query = useQuery<FetchMovementQuery>();

const NuxtLink = resolveComponent('NuxtLink');

const to = computed(() => {
    const route: RouteLocationNamedRaw = {};
    route.query = { ...query.value };

    if (props.movement.is_route_last) {
        route.name = 'booking-composition';
        route.query.tours_hash = props.movement.flight_hash;
        // TODO: Fix this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        route.query.ids = [[props.movement.tour_id]] as any;
    } else {
        route.name = 'booking-tickets';
        route.query.ids = [props.movement.route_id];
    }

    return route;
});
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
