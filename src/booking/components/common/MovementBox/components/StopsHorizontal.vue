<script setup lang="ts">
import { computed } from "vue";
import type { Movement, Stop } from "@/booking/types";
import { formatMinutes, formatDate } from "@/app/lib";
import { Tooltip, Divider, Typography } from "@ui/components";

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const getStopTooltip = (stop: Stop) => {
    return `${stop.transport_hub.name} - пересадка ${formatMinutes(stop.duration)}`;
};

const isVirtual = computed(() => {
    return props.movement.is_regular === "virtual";
});
</script>

<template>
    <div class="space-y-2.5">
        <div class="space-y-2.5">
            <div class="flex items-center justify-between">
                <Tooltip :text="movement.transport_hub_departure.name">
                    <template #trigger="{ vbind }">
                        <span v-bind="vbind">{{ movement.transport_hub_departure.code }}</span>
                    </template>
                </Tooltip>
                <div v-for="stop in movement.stops" :key="stop.transport_hub.id">
                    <Tooltip :text="getStopTooltip(stop)">
                        <template #trigger="{ vbind }">
                            <span v-bind="vbind">{{ stop.transport_hub.code }}</span>
                        </template>
                    </Tooltip>
                </div>
                <Tooltip :text="movement.transport_hub_arrival.name">
                    <template #trigger="{ vbind }">
                        <span v-bind="vbind">{{ movement.transport_hub_arrival.code }}</span>
                    </template>
                </Tooltip>
            </div>
            <div class="flex items-center justify-between relative">
                <Divider dashed class="absolute" />
                <div class="rounded-full bg-slate-400 w-1.5 h-1.5 z-10" />
                <div
                    v-for="i in movement.stops.length"
                    :key="i"
                    class="rounded-full bg-slate-400 w-1.5 h-1.5 z-10"
                />
                <div class="rounded-full bg-slate-400 w-1.5 h-1.5 z-10" />
            </div>
        </div>
        <div v-if="isVirtual" class="flex justify-center">
            <Typography variant="h3">
                {{ formatDate(movement.date_departure, "day:numeric|month:long") }}
            </Typography>
        </div>
        <div v-else class="flex items-center justify-between">
            <div>
                <Typography variant="h3">
                    {{ movement.time_departure?.slice(0, -3) }}
                </Typography>
                <Typography variant="secondary">
                    {{ formatDate(movement.date_departure, "day:numeric|month:long") }}
                </Typography>
            </div>
            <Typography variant="description">
                {{ formatMinutes(movement.duration) }} в пути
            </Typography>
            <div class="text-right">
                <Typography variant="h3">{{ movement.time_arrival?.slice(0, -3) }}</Typography>
                <Typography variant="secondary">
                    {{ formatDate(movement.date_arrival, "day:numeric|month:long") }}
                </Typography>
            </div>
        </div>
    </div>
</template>
