<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Tour, Filters } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image, Stars } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";

type Props = {
    tour: Tour;
    filters: Filters;
};

defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");
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
            <Typography variant="h3" as="h3" class="mb-1">{{ tour.hotel.name }}</Typography>
            <LocationList :location="tour.hotel.location" />
        </template>
        <template #footer>
            <Button
                :as="NuxtLink"
                :to="{
                    name: 'tours-id',
                    params: { id: tour.hotel.id },
                    query: formatMainFilters(filters),
                }"
                variant="primary"
                target="_blank"
                block
            >
                от {{ formatCurrency(tour.price) }}
            </Button>
        </template>
    </Card>
</template>
