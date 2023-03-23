<script setup lang="ts">
import type { Tour, Filters } from "@/tours/types";
import { Card } from "@ui/components";
import { formatMainFilters } from "@/tours/lib";

type Props = {
    tour: Tour;
    filters: Filters;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <NuxtLink
            :to="{
                name: 'tours-id',
                params: { id: tour.hotel.id },
                query: formatMainFilters(filters),
            }"
            target="_blank"
        >
            {{ tour.hotel.name }}
        </NuxtLink>
    </Card>
</template>
