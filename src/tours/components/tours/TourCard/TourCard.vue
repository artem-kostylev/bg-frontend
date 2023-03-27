<script setup lang="ts">
import { resolveComponent, useRoute } from "#imports";
import type { Tour, Filters } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image, Stars } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";

const route = useRoute();

type Props = {
    tour: Tour;
    filters: Filters;
    variant?: "standart" | "multi" | "excursion" | "hotel";
};

const props = withDefaults(defineProps<Props>(), {
    variant: "standart",
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (id: number) => {
    const query = formatMainFilters(props.filters);

    if (props.variant === "standart") {
        return { name: "tours-id", params: { id }, query };
    }

    if (props.variant === "multi") {
        return {
            name: "tours-multi-id",
            params: { id: route.params.id },
            query: { ...query, hotel_id: id, tour_type: "package" },
        };
    }

    if (props.variant === "excursion") {
        return {
            name: "tours-excursion-id",
            params: { id: route.params.id },
            query: { ...query, hotel_id: id, tour_type: "package" },
        };
    }
};
</script>

<template>
    <Card>
        <template #cover>
            <Image
                v-if="tour.hotel.images[0]"
                :src="tour.hotel.images[0].url"
                :alt="tour.hotel.name"
                class="w-full h-[14rem] object-cover"
            />
        </template>
        <template #header>
            <Stars :stars="tour.hotel.stars" class="mb-1" />
            <NuxtLink :to="getTo(tour.hotel.id)" target="_blank">
                <Typography variant="h3" as="h3" class="mb-1">{{ tour.hotel.name }}</Typography>
            </NuxtLink>
            <LocationList :location="tour.hotel.location" />
        </template>
        <template #footer>
            <Button
                :as="NuxtLink"
                :to="getTo(tour.hotel.id)"
                variant="primary"
                :target="props.variant === 'standart' ? '_blank' : ''"
                block
            >
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
