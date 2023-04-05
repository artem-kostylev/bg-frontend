<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Movement, Fare } from "@/booking/types";
import type { FiltersRaw } from "@/app/types";
import { Card, Button, Typography } from "@ui/components";
import { useQuery } from "@/app/composables";
import { formatCurrency } from "@/app/lib";

const query = useQuery<FiltersRaw & { ids: string[] }>();

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (fare: Fare) => {
    // TODO: fix this
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const to = { query: { ...query.value } } as any;

    if (props.movement.is_route_last) {
        to.name = "booking-composition";

        to.query.ids = fare.tour_id;
        to.query.tours_hash = fare.tours_hash;
    } else {
        to.name = "booking-tickets";
        to.query.ids = [...(query.value.ids ?? ""), fare.route_id];
    }

    return to;
};
</script>

<template>
    <div class="grid lg:grid-cols-2 gap-5">
        <Card v-for="fare in movement.fares" :key="fare.fare_id">
            <Typography variant="h3" class="mb-4">
                {{ fare.fare_name }}
            </Typography>
            <Button variant="primary" :as="NuxtLink" :to="getTo(fare)" block>
                + {{ formatCurrency(0) }}
            </Button>
        </Card>
    </div>
</template>
