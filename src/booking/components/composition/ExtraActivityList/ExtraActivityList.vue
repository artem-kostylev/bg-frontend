<script setup lang="ts">
import { ExtraActivityCard } from '@/booking/components';
import type { ExtraActivity } from '@/booking/types';
import { Grid } from '@ui/components';

type Props = {
    extraActivities: ExtraActivity[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="3" gap="5">
        <ExtraActivityCard
            v-for="(extraActivity, index) in extraActivities"
            :key="index"
            :extra-activity="extraActivity"
        />
    </Grid>
</template>
