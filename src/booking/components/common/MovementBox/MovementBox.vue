<script setup lang="ts">
import type { Movement } from "@/booking/types";
import { Avatar, Card, Typography } from "@ui/components";
import { formatMinutes, formatDate } from "@/app/lib";

const STATUSES = { regular: "Регулярный", charter: "Чартерный", virtual: "Виртуальный" };

type Props = {
    movement: Movement;
};

defineProps<Props>();
</script>

<template>
    <Card>
        <template #header>
            <div v-if="movement.transport_company.length === 1" class="flex items-center space-x-3">
                <Avatar
                    width="52px"
                    height="52px"
                    :src="movement.transport_company[0].key"
                    :initials="movement.transport_company[0].name"
                    shape="rounded"
                    class="border-2 border-white"
                />
                <Typography variant="h3" as="h2">
                    {{ movement.transport_company[0].name }}
                </Typography>
            </div>
            <div v-else class="flex items-center -space-x-2">
                <div
                    v-for="(company, index) in movement.transport_company.slice(0, 3)"
                    :key="index"
                >
                    <Avatar
                        width="52px"
                        height="52px"
                        :src="company.key"
                        :initials="company.name"
                        shape="rounded"
                        class="border-2 border-white"
                    />
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
        <div class="space-y-3">
            <ul class="list-disc list-inside marker:text-slate-400">
                <li>{{ STATUSES[movement.is_regular] }}</li>
                <li>{{ movement.fare.name }}</li>
            </ul>
            <div class="flex items-center justify-between">
                <div>
                    <Typography variant="h3">{{ movement.time_departure.slice(0, -3) }}</Typography>
                    <Typography variant="secondary">
                        {{ formatDate(movement.date_departure, "day:numeric|month:long") }}
                    </Typography>
                </div>
                <Typography variant="description">
                    {{ formatMinutes(movement.duration) }} в пути
                </Typography>
                <div>
                    <Typography variant="h3">{{ movement.time_arrival.slice(0, -3) }}</Typography>
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
