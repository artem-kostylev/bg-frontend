<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Movement, Fare } from "@/booking/types";
import { Card, Button } from "@ui/components";
import { useRoute } from "vue-router";

const route = useRoute();

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (fare: Fare) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const to = { query: { ...route.query } } as any;

    if (props.movement.is_route_last) {
        to.name = "booking-composition";

        to.query.ids = fare.tour_id;
        to.query.tours_hash = fare.tours_hash;
    } else {
        to.name = "booking-tickets";
        to.query.ids = [...(route.query.ids ?? ""), fare.route_id];
    }

    return to;
};
</script>

<template>
    <div class="grid grid-cols-2 gap-5">
        <Card v-for="fare in movement.fares" :key="fare.fare_id">
            <Button :as="NuxtLink" :to="getTo(fare)"> + 0 Р </Button>
        </Card>
    </div>
</template>
