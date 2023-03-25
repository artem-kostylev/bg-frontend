<script setup lang="ts">
import { resolveComponent } from "#imports";
import type { Filters, TourPackage } from "@/tours/types";
import { formatMainFilters } from "@/tours/lib";
import { Button, Card, Typography, Image } from "@ui/components";
import { LocationList } from "@/app/components";
import { formatCurrency } from "@/app/lib";

type Props = {
    tour: TourPackage;
    filters: Filters;
};

defineProps<Props>();

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
    <Card>
        <template #cover>
            <Image
                :src="tour.images[0].url"
                :alt="tour.name"
                class="w-full h-[14rem] object-cover"
            />
        </template>
        <template #header>
            <NuxtLink
                :to="{
                    name: 'tours-id',
                    params: { id: tour.id },
                    query: formatMainFilters(filters),
                }"
                target="_blank"
            >
                <Typography variant="h3" as="h3" class="mb-1">{{ tour.name }}</Typography>
            </NuxtLink>
            <LocationList :location="tour.location" />
        </template>
        <template #footer>
            <Button
                :as="NuxtLink"
                :to="{
                    name: 'tours-multi-id',
                    params: { id: tour.id },
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
