<script setup lang="ts">
import type { SegmentMovement } from '@/booking/types';
import { formatDate } from '@/app/lib';
import { Typography } from '@ui/components';

type Props = {
    segment: SegmentMovement;
};

defineProps<Props>();
</script>

<template>
    <div class="flex space-x-4 mt-5">
        <div class="flex space-x-4">
            <div class="flex flex-col justify-between items-center relative">
                <div class="absolute w-0 h-full border-l border-secondary-200 border-dashed"></div>
                <div class="rounded-full bg-secondary-400 w-1.5 h-1.5 z-10" />
                <div class="rounded-full bg-secondary-400 w-1.5 h-1.5 z-10" />
            </div>
        </div>
        <div class="flex flex-col space-y-5">
            <div>
                <div class="flex items-center space-x-2.5">
                    <Typography variant="h5">
                        {{ segment.time_departure.slice(0, -3) }}
                    </Typography>
                    <Typography variant="description">
                        {{ formatDate(segment.date_departure, 'DD MMMM') }}
                    </Typography>
                </div>
                <div>
                    {{ segment.transport_hub_departure.name }} –
                    {{ segment.transport_hub_departure.code }}
                </div>
            </div>
            <div>
                <div class="flex items-center space-x-2.5">
                    <Typography variant="h5">{{ segment.time_arrival.slice(0, -3) }}</Typography>
                    <Typography variant="description">
                        {{ formatDate(segment.date_arrival, 'DD MMMM') }}
                    </Typography>
                </div>
                <div>
                    {{ segment.transport_hub_arrival.name }} –
                    {{ segment.transport_hub_arrival.code }}
                </div>
            </div>
        </div>
    </div>
</template>
