<script setup lang="ts">
import type { Accommodation } from '@/booking/types';
import { Grid } from '@ui/components';
import { AccommodationCard } from '@/booking/components';

type Props = {
    accommodations: Accommodation[];
};

defineProps<Props>();
</script>

<template>
    <Grid gap="5">
        <AccommodationCard
            v-for="accommodation in accommodations"
            :key="accommodation.id"
            :accommodation="accommodation"
        />
    </Grid>
</template>
