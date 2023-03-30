<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Tour, Filters } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image, Stars } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";
import { useParams, useQuery } from "@/app/composables";

const params = useParams<{ id: string; type: "multi" | "activity" }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();

type Props = {
    tour: Tour;
    filters: Filters;
    type?: "standart" | "multi" | "activity" | "hotel";
};

const props = withDefaults(defineProps<Props>(), {
    type: "standart",
});

const NuxtLink = resolveComponent("NuxtLink");

// TODO: fix this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTo = (id: number): any => {
    const filters = formatMainFilters(props.filters);

    if (props.type === "standart") {
        return { name: "tours-id", params: { id }, query: filters };
    }

    if (props.type === "activity" || props.type === "multi") {
        const hotel_ids = Array.isArray(query.value.hotel_ids)
            ? [...query.value.hotel_ids, id]
            : [id];

        return {
            name: `tours-type-id`,
            params: { id: params.value.id, type: params.value.type },
            query: {
                ...filters,
                hotel_ids,
                tour_type: "package",
                accommodations_unikey: query.value.accommodations_unikey,
            },
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
            <NuxtLink :to="getTo(tour.hotel.id)" :target="type === 'standart' ? '_blank' : ''">
                <Typography variant="h3" as="h3" class="mb-1">{{ tour.hotel.name }}</Typography>
            </NuxtLink>
            <LocationList :location="tour.hotel.location" />
        </template>
        <template #footer>
            <Button
                :as="NuxtLink"
                :to="getTo(tour.hotel.id)"
                variant="primary"
                :target="type === 'standart' ? '_blank' : ''"
                block
            >
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
