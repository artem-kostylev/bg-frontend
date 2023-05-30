<script setup lang="ts">
import type { Fare } from '@/booking/types';
import { Grid } from '@ui/components';
import { FareCard } from '@/booking/components';

type Props = {
    fares: Fare[];
    price: number | null;
    isRouteLast: boolean;
};

defineProps<Props>();
</script>

<template>
    <Grid cols="2" gap="5">
        <FareCard
            v-for="fare in fares"
            :key="fare.fare_id"
            :fare="fare"
            :price="price"
            :is-route-last="isRouteLast"
        />
    </Grid>
</template>
