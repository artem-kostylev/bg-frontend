<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Movement, Fare } from "@/booking/types";
import type { FiltersRaw } from "@/app/types";
import { Card, Button, Typography, Divider } from "@ui/components";
import { RubleIcon, CheckIcon } from "@ui/icons";
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
            <template #header>
                <Typography variant="h3">
                    {{ fare.fare_name }}
                </Typography>
            </template>
            <div class="space-y-2.5">
                <div class="space-y-2.5">
                    <div class="flex items-center">
                        <div class="bg-orange-100 text-orange-800 rounded-full p-1">
                            <RubleIcon width="0.8em" height="0.8em" />
                        </div>
                        <span class="ml-2.5">Возврат билета – {{ fare.ticket_refund.label }}</span>
                    </div>
                    <div class="flex items-center">
                        <div class="bg-orange-100 text-orange-800 rounded-full p-1">
                            <RubleIcon width="0.8em" height="0.8em" />
                        </div>
                        <span class="ml-2.5">Обмен билета – {{ fare.ticket_exchange.label }}</span>
                    </div>
                </div>
                <Divider dashed />
                <div class="space-y-2.5">
                    <div class="flex items-center">
                        <div class="bg-green-500/20 text-green-800 rounded-full p-1">
                            <CheckIcon width="0.8em" height="0.8em" />
                        </div>
                        <span class="ml-2.5">Багаж – {{ fare.baggage.label }}</span>
                    </div>
                    <div class="flex items-center">
                        <div class="bg-green-500/20 text-green-800 rounded-full p-1">
                            <CheckIcon width="0.8em" height="0.8em" />
                        </div>
                        <span class="ml-2.5">Ручная кладь – {{ fare.carryon.label }}</span>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button variant="primary" :as="NuxtLink" :to="getTo(fare)" block>
                    + {{ formatCurrency(0) }}
                </Button>
            </template>
        </Card>
    </div>
</template>
