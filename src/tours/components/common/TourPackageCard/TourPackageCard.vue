<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Filters, TourPackage } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";
import type { RouteLocationNamedRaw } from "vue-router";

type Props = {
    tour: TourPackage;
    filters: Filters;
    type: "multi" | "excursion";
};

const props = defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");

const getTo = (id: number) => {
    const query = formatMainFilters(props.filters);
    const payload = { params: { id }, query } as RouteLocationNamedRaw;

    payload.name =
        props.type === "multi"
            ? "tours-multi-id"
            : props.type === "excursion"
            ? "tours-excursion-id"
            : undefined;

    return payload;
};
</script>

<template>
    <Card>
        <template #cover>
            <Image
                v-if="tour.images[0]"
                :src="tour.images[0].url"
                :alt="tour.name"
                class="w-full h-[14rem] object-cover"
            />
        </template>
        <template #header>
            <NuxtLink :to="getTo(tour.id)" target="_blank">
                <Typography variant="h3" as="h3" class="mb-1">{{ tour.name }}</Typography>
            </NuxtLink>
            <LocationList :location="tour.location" />
        </template>
        <template #footer>
            <Button :as="NuxtLink" :to="getTo(tour.id)" variant="primary" target="_blank" block>
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
