<script setup lang="ts">
import type { SegmentTransfer } from "@/booking/types";
import { formatMinutes } from "@/app/lib";

type Props = {
    segment: SegmentTransfer;
};

defineProps<Props>();
</script>

<template>
    <div class="bg-white rounded-xl mx-2.5 px-5 py-3.5">
        <div class="flex items-center justify-between space-x-5">
            <div class="font-semibold">
                {{ segment.time_departure.slice(0, -3) }} - {{ segment.time_arrival.slice(0, -3) }}
            </div>
            <div class="text-slate-500 text-sm">{{ formatMinutes(segment.duration) }}</div>
        </div>
        <div>{{ segment.transport_hub_transfer.name }}. {{ segment.transfer_type }}</div>
    </div>
</template>
