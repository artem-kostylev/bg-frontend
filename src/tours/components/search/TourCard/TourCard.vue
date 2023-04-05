<script setup lang="ts">
import { resolveComponent, useParams } from "#imports";
import type { FiltersRaw } from "@/app/types";
import type { Tour } from "@/tours/types";
import { Button, Card, Typography, Image, Stars } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";
import { useQuery } from "@/app/composables";
import type { RouteLocationNamedRaw } from "vue-router";

const params = useParams<{ id: string }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();

type Props = {
    tour: Tour;
    filters: FiltersRaw;
    variant: string;
    target?: "_blank";
};

const props = withDefaults(defineProps<Props>(), {
    target: undefined,
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (id: number) => {
    const isPackage = props.variant === "tours-multi-id" || props.variant === "tours-activity-id";

    const name = props.variant.replace("-search", "-id");

    const to: RouteLocationNamedRaw = {
        name,
        params: {},
        query: {},
    };

    Object.assign(to.query!, props.filters);

    if (isPackage) {
        to.params!.id = params.value.id;
        to.query!.tour_type = "package";
        to.query!.hotel_ids = [...(query.value.hotel_ids || ""), id];
        to.query!.accommodations_unikey = query.value.accommodations_unikey as never;
    } else {
        to.params!.id = id;

        if (props.variant === "hotels-search") {
            to.query!.tour_type = "hotel";
        }
    }

    return to;
};
</script>

<template>
    <Card cover-class="h-[14rem] bg-slate-100">
        <template #cover>
            <Image
                v-if="tour.hotel.images[0]"
                :src="tour.hotel.images[0].url"
                :alt="tour.hotel.name"
                class="w-full h-full object-cover"
            />
        </template>
        <template #header>
            <Stars v-if="tour.hotel.stars" :stars="tour.hotel.stars" class="mb-1" />
            <NuxtLink :to="getTo(tour.hotel.id)" :target="target">
                <Typography variant="h3" as="h3" class="mb-1">{{ tour.hotel.name }}</Typography>
            </NuxtLink>
            <LocationList :location="tour.hotel.location" />
        </template>
        <template #footer>
            <Button
                :as="NuxtLink"
                :to="getTo(tour.hotel.id)"
                variant="primary"
                :target="target"
                block
            >
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
