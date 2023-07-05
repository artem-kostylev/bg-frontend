<script setup lang="ts">
import { CrossInCircleIcon, CheckIcon, ClockIcon } from '@ui/icons';
import type { ReviewStatus } from '@/tours/types';

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
    <div class="absolute top-0 right-0">
        <div
            :class="[
                'text-white px-2.5 py-1.5 text-sm rounded-bl-xl space-x-2 flex items-center',
                STATUSES[status.key_name].background,
            ]"
        >
            <component :is="STATUSES[status.key_name].icon" width="1.2em" height="1.2em" />
            <div>{{ status.description }}</div>
        </div>
    </div>
</template>
