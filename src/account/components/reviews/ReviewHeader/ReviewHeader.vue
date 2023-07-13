<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '@ui/components';
import { LocationList } from '@/app/components';
import type { HotelInfo } from '@/tours/types';
import { formatDate, pluralize } from '@/app/lib';

type Props = {
    hotel: HotelInfo;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.hotel.duration, ['ночь', 'ночи', 'ночей']));

const dates = computed(() => {
    return `${formatDate(props.hotel.date_from, 'DD.MM')} - ${formatDate(
        props.hotel.date_to,
        'DD.MM.YYYY'
    )}`;
});
</script>

<template>
    <div>
        <Typography variant="h3" as="h2" class="mb-1">
            {{ hotel.name }}
        </Typography>
        <div class="mt-2">
            <LocationList v-if="hotel.location" target="_blank" :location="hotel.location" />
            <div class="flex space-x-2 items-center">
                <div>{{ dates }} ({{ duration }})</div>
            </div>
        </div>
    </div>
</template>
