<script setup lang="ts">
import { Grid } from '@ui/components';
import type { AlternativeHotel } from '@/account/types';
import { AlternativeHotelCard } from '@/account/components';

type Props = {
    accommodations: AlternativeHotel[];
};

defineProps<Props>();
</script>

<template>
    <Grid gap="5">
        <AlternativeHotelCard
            v-for="accommodation in accommodations"
            :key="accommodation.id"
            :accommodation="accommodation"
        />
    </Grid>
</template>
