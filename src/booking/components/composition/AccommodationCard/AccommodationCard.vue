<script setup lang="ts">
import { computed } from 'vue';
import { BuildingsIcon, CalendarIcon } from '@ui/icons';
import type { Accommodation } from '@/booking/types';
import { IconFilled, Typography } from '@ui/components';
import { LocationList } from '@/app/components';
import { formatDates, pluralize } from '@/app/lib';
import { AccommodationRoomList } from '@/booking/components';

type Props = {
    accommodation: Accommodation;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.accommodation.duration, ['ночь', 'ночи', 'ночей']));

const dates = computed(() => {
    return `с ${formatDates(
        [props.accommodation.date_start, props.accommodation.date_finish],
        ' по ',
        'D MMM'
    )} 
    на ${duration.value}`;
});
</script>

<template>
    <div class="space-y-5">
        <div class="flex flex-col space-y-2.5">
            <div class="flex items-start space-x-2">
                <IconFilled :icon="BuildingsIcon" class="-mt-0.5" />
                <div>
                    <Typography variant="h4">{{ accommodation.name }}</Typography>
                    <LocationList :location="accommodation.location" target="_blank" />
                </div>
            </div>
            <IconFilled :icon="CalendarIcon" :label="dates" />
        </div>
        <AccommodationRoomList :accommodation-rooms="accommodation.rooms" />
    </div>
</template>
