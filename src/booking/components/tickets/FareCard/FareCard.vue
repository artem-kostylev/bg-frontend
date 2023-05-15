<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import type { RouteLocationNamedRaw, LocationQuery } from "vue-router";
import type { Fare } from "@/booking/types";
import { Card, Typography, Button, Divider } from "@ui/components";
import { RubleIcon, CheckIcon } from "@ui/icons";
import { useQuery, useName } from "@/app/composables";
import type { FiltersRaw } from "@/app/types";
import { formatCurrency } from "@/app/lib";

const name = useName();
const query = useQuery<FiltersRaw & { ids: string[] }>();

type Props = {
    fare: Fare;
    price: number | null;
    isRouteLast: boolean;
    variant?: "simple";
};

const props = defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (fare: Fare) => {
    const to = {} as RouteLocationNamedRaw;

    to.query = { ...query.value } as LocationQuery;

    if (props.isRouteLast) {
        to.name = "booking-composition";

        to.query.ids = fare.tour_id;
        to.query.tours_hash = fare.tours_hash;
    } else {
        to.name = "booking-tickets";
        to.query.ids = [...(query.value.ids ?? ""), fare.route_id];
    }

    return to;
};

const price = computed(() => {
    return name.value === "booking-tickets"
        ? `+ ${formatCurrency(props.fare.price - (props.price ?? 0))}`
        : `от ${formatCurrency(props.fare.price - (props.price ?? 0))}`;
});
</script>

<template>
    <Card
        :class="variant === 'simple' && 'shadow-none'"
        :body-class="variant === 'simple' && 'px-0 pt-0'"
        :footer-class="variant === 'simple' && 'px-0 pb-0'"
    >
        <template v-if="variant !== 'simple'" #header>
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
                {{ price }}
            </Button>
        </template>
    </Card>
</template>
