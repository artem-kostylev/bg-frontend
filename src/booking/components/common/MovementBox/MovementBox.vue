<script setup lang="ts">
import { computed } from "vue";
import type { Movement, Stop } from "@/booking/types";
import { Avatar, Card, Typography, Divider, Tooltip } from "@ui/components";
import { formatMinutes, formatDate } from "@/app/lib";
import { AirplaneIcon } from "@ui/icons";

const STATUSES = { regular: "Регулярный", charter: "Чартерный", virtual: "Виртуальный" };

type Props = {
    movement: Movement;
};

const props = defineProps<Props>();

const virtual = computed(() => {
    return props.movement.is_regular === "virtual";
});

const getStopTooltip = (stop: Stop) => {
    return `${stop.transport_hub.name} - пересадка ${formatMinutes(stop.duration)}`;
};
</script>

<template>
    <Card>
        <template #header>
            <div v-if="virtual" class="flex items-center space-x-3">
                <div
                    class="inline-flex items-center justify-center rounded-xl border border-slate-300"
                    style="width: 48px; height: 48px"
                >
                    <AirplaneIcon />
                </div>
                <Typography variant="h3" as="h2">Рейс не конкретизирован</Typography>
            </div>
            <div
                v-else-if="movement.transport_company.length === 1"
                class="flex items-center space-x-3"
            >
                <Avatar
                    width="52px"
                    height="52px"
                    :src="movement.transport_company[0].key"
                    :initials="movement.transport_company[0].name"
                    class="border-2 border-white"
                />
                <Typography variant="h3" as="h2">
                    {{ movement.transport_company[0].name }}
                </Typography>
            </div>
            <div v-else class="flex items-center -space-x-4">
                <div
                    v-for="(company, index) in movement.transport_company.slice(0, 3)"
                    :key="index"
                >
                    <Tooltip :text="company.name">
                        <template #trigger="{ vbind }">
                            <Avatar
                                v-bind="vbind"
                                width="52px"
                                height="52px"
                                :src="company.key"
                                :initials="company.name"
                                class="border-2 border-white"
                            />
                        </template>
                    </Tooltip>
                </div>
                <div
                    v-if="movement.transport_company.length > 3"
                    class="inline-flex items-center justify-center bg-slate-100 rounded-xl border-2 border-white"
                    style="width: 52px; height: 52px"
                >
                    <div class="text-slate-500 font-medium">+ 1</div>
                </div>
            </div>
            <div
                v-if="movement.priority_status"
                class="absolute right-0 top-0 text-sm bg-orange-100 text-orange-800 rounded-xl rounded-tl-none rounded-br-none py-1 px-2"
            >
                Рекомендуем
            </div>
        </template>
        <div class="space-y-5">
            <p v-if="virtual">Время вылета, рейс и аэропорт появятся за 1-5 дней до вылета</p>
            <ul v-else class="list-disc list-inside marker:text-slate-400">
                <li>{{ STATUSES[movement.is_regular] }}</li>
                <li>{{ movement.fare.name }}</li>
            </ul>
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
            <div v-if="virtual" class="flex justify-center">
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
        <template v-if="$slots.footer" #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>
