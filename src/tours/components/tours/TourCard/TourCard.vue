<script setup lang="ts">
import type { Tour } from "@/tours/types";
import { Card, CardBody } from "@ui/components";

type Props = {
    tour: Tour;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <CardBody>
            <NuxtLink :to="{ name: 'tours-id', params: { id: tour.hotel.id } }">
                {{ tour.hotel.name }}
            </NuxtLink>
        </CardBody>
    </Card>
</template>
