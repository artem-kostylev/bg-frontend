<script setup lang="ts">
import type { ReviewCreator } from '@/tours/types';
import { formatDate } from '@/app/lib';
import { Avatar, Typography } from '@ui/components';
import { RatingBadge } from '@/app/components';

type Props = {
    average_rating: string;
    user: ReviewCreator;
    created_at: string;
};

defineProps<Props>();
</script>

<template>
    <div class="flex md:flex-col items-center md:items-start space-x-3 md:space-x-0 md:space-y-2.5">
        <div class="flex space-x-2.5 flex-1">
            <Avatar :initials="`${user.name}${user.surname}`" width="48px" height="48px" />
            <div>
                <Typography variant="h5">{{ user.name }}</Typography>
                <Typography variant="description">
                    {{ formatDate(created_at, 'D MMM YYYY') }}
                </Typography>
            </div>
        </div>
        <RatingBadge :rating="average_rating" />
    </div>
</template>
