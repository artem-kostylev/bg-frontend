<script setup lang="ts">
import { Grid } from '@ui/components';
import type { IncludedActivity } from '@/booking/types';
import { ActivityVariantCard } from '@/booking/components';

type Props = {
    includedActivities: IncludedActivity[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="4" gap="5">
        <ActivityVariantCard
            v-for="(includedActivity, index) in includedActivities"
            :key="index"
            :included-activity="includedActivity"
        />
    </Grid>
</template>
