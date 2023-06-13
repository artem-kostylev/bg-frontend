<script setup lang="ts">
import { ActivityCard } from '@/booking/components';
import type { AllActivity } from '@/booking/types';
import { Grid } from '@ui/components';

type Props = {
    activities: AllActivity[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="3" gap="5">
        <ActivityCard v-for="activity in activities" :key="activity.id" :activity="activity" />
    </Grid>
</template>
