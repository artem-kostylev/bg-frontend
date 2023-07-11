<script setup lang="ts">
import type { Accommodation } from '@/booking/types';
import { Grid, Divider } from '@ui/components';
import { AccommodationCard } from '@/booking/components';

type Props = {
    accommodations: Accommodation[];
};

defineProps<Props>();
</script>

<template>
    <Grid gap="5">
        <div v-for="(accommodation, index) in accommodations" :key="accommodation.id">
            <AccommodationCard :accommodation="accommodation" :accommodation-index="index" />
            <Divider v-if="index !== accommodations.length - 1" dashed class="mt-5" />
        </div>
    </Grid>
</template>
