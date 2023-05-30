<script setup lang="ts">
import { Grid } from '@ui/components';
import { PeriodCard } from '@/tours/components';
import type { Period } from '@/tours/types';

type Props = {
    periods: Period[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="4" gap="5">
        <PeriodCard v-for="(period, index) in periods" :key="index" :period="period" />
    </Grid>
</template>
