<script setup lang="ts">
import { Card, Typography } from '@ui/components';
import type { Insurance } from '@/booking/types';
import { formatCurrency } from '~/lib';

type Props = {
    insurance: Insurance;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <Typography variant="h3" as="h3" class="mb-2">{{ insurance.name }}</Typography>
        <Typography class="leading-4">
            Страховая сумма:
            {{ formatCurrency(insurance.description.sum, insurance.description.currency) }}
        </Typography>
    </Card>
</template>
