<script setup lang="ts">
import type { Insurance } from '@/booking/types';
import { Grid } from '@ui/components';
import { InsuranceCard } from '@/booking/components';

type Props = {
    insurances: Insurance[];
};

defineProps<Props>();
</script>

<template>
    <Grid gap="5">
        <InsuranceCard v-for="insurance in insurances" :key="insurance.id" :insurance="insurance" />
    </Grid>
</template>
