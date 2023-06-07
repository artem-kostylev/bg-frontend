<script setup lang="ts">
import { computed } from 'vue';
import type { SegmentMovement } from '@/booking/types';
import { Typography } from '@ui/components';
import { formatMinutes } from '@/app/lib';
import Title from './Title.vue';
import StopsVertical from './StopsVertical.vue';

type Props = {
    segment: SegmentMovement;
};

const props = defineProps<Props>();

const isVirtual = computed(() => {
    return props.segment.is_regular === 'virtual';
});
</script>

<template>
    <div class="p-5">
        <div class="flex justify-between">
            <Title :transport-company="[segment.transport_company]" :is-virtual="isVirtual" />
            <div class="text-right">
                <Typography variant="h5">Рейс {{ segment.flight_number }}</Typography>
                <Typography variant="description">
                    {{ formatMinutes(segment.duration) }} в пути
                </Typography>
            </div>
        </div>
        <StopsVertical :segment="segment" />
    </div>
</template>
