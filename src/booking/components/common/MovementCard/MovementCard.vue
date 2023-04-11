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
            <div
                v-for="(company, index) in movement.transport_company"
                :key="index"
                class="flex items-center space-x-4"
            >
                <Avatar
                    width="50px"
                    height="50px"
                    :src="company.key"
                    :initials="company.name"
                    shape="rounded"
                />
                <Typography variant="h3" as="h2">{{ company.name }}</Typography>
            </div>
        </template>
        <div class="space-y-3">
            <ul class="list-disc list-inside marker:text-slate-400">
                <li>{{ STATUSES[movement.is_regular] }}</li>
                <li>{{ movement.fare.name }}</li>
            </ul>
            <div class="flex items-center justify-between">
                <div>
                    <Typography variant="h3">{{ movement.time_departure }}</Typography>
                    <Typography variant="secondary">
                        {{ formatDate(movement.date_departure, "day:numeric|month:long") }}
                    </Typography>
                </div>
                <Typography variant="description">
                    {{ formatMinutes(movement.duration) }} в пути
                </Typography>
                <div>
                    <Typography variant="h3">{{ movement.time_arrival }}</Typography>
                    <Typography variant="secondary">
                        {{ formatDate(movement.date_arrival, "day:numeric|month:long") }}
                    </Typography>
                </div>
            </div>
        </div>
        <template #footer>
            <slot name="footer" />
        </template>
    </Card>
</template>
