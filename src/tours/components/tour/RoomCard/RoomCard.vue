<script setup lang="ts">
import type { Room } from "@/tours/types";
import { formatCurrency } from "@/app/lib";
import { useRoomsStore } from "@/tours/stores";
import { Button, Card, Typography, Image } from "@ui/components";
import { formatBeds } from "@/tours/lib";

type Props = {
    room: Room;
    isLastGroup: boolean;
};

defineProps<Props>();

const { selectDates } = useRoomsStore();
</script>

<template>
    <Card cover-class="h-[14rem] bg-slate-100">
        <template #cover>
            <Image
                v-if="room.images[0]"
                :src="room.images[0].url"
                :alt="room.name"
                class="w-full h-full object-cover"
            />
        </template>
        <template #header>
            <div>
                <Typography variant="h3" as="h3" class="mb-1">{{ room.name }}</Typography>
                <Typography variant="description">
                    {{ formatBeds(room.beds) }}, {{ room.size }} м²
                </Typography>
            </div>
        </template>
        <div
            v-for="food in room.food"
            :key="food.id"
            class="border-t border-slate-200 border-dashed py-1.5 last:pb-0 flex items-center justify-between"
        >
            <Typography>{{ food.name }}</Typography>
            <Button variant="primary" size="xs" @click="selectDates(food.dates, isLastGroup)">
                от {{ formatCurrency(food.price) }}
            </Button>
        </div>
    </Card>
</template>
