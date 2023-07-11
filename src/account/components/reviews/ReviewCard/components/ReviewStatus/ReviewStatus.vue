<script setup lang="ts">
import { CrossInCircleIcon, CheckIcon, ClockIcon } from '@ui/icons';
import type { ReviewStatus } from '@/tours/types';
import { StatusBadge } from '@/app/components';

type Props = {
    status: ReviewStatus;
};

defineProps<Props>();

const STATUSES = {
    NEW: {
        icon: ClockIcon,
        background: 'bg-secondary-500',
    },
    ACCEPTED: {
        icon: CheckIcon,
        background: 'bg-success-600',
    },
    REJECTED: {
        icon: CrossInCircleIcon,
        background: 'bg-warning-600',
    },
};
</script>

<template>
    <StatusBadge
        :label="status.description"
        :icon="STATUSES[status.key_name].icon"
        :classes="STATUSES[status.key_name].background"
    />
</template>
