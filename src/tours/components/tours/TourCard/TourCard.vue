<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Tour, Filters } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image, Stars } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";
import { useRoute } from "#imports";

const route = useRoute();

type Props = {
    tour: Tour;
    filters: Filters;
    type?: "standart" | "multi" | "excursion" | "hotel";
};

const props = withDefaults(defineProps<Props>(), {
    type: "standart",
});

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (hotelId: number) => {
    const query = formatMainFilters(props.filters);

    if (props.type === "standart") {
        return { name: "tours-id", params: { id: hotelId }, query };
    }

    if (props.type === "multi") {
        return {
            name: "tours-multi-id",
            params: { id: route.params.id },
            query: { ...query, hotel_id: hotelId },
        };
    }
};
</script>

<template>
    <Card>
        <template #cover>
            <Image
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
                :target="props.type === 'standart' ? '_blank' : ''"
                block
            >
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
