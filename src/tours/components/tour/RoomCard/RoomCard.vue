<script setup lang="ts">
import type { Component } from "vue";
import type { Room } from "@/tours/types";
import { formatCurrency } from "@/app/lib";
import { useRoomsStore } from "@/tours/stores";
import { Button, Card, Typography, Image, IconFilled } from "@ui/components";
import { formatBeds, formatView } from "@/tours/lib";
import {
    AirConditioningIcon,
    BalconyIcon,
    FreeWifiIcon,
    TerraceIcon,
    KitchenIcon,
} from "@ui/icons";
import DetailsModal from "./components/DetailsModal.vue";

const icons: Record<string, Component> = {
    air_conditioning: AirConditioningIcon,
    balcony: BalconyIcon,
    free_wifi: FreeWifiIcon,
    terrace: TerraceIcon,
    kitchen: KitchenIcon,
};

type Props = {
    room: Room;
    isLastGroup: boolean;
};

defineProps<Props>();

const { selectDates } = useRoomsStore();
</script>

<template>
    <Card cover-class="h-[14rem] bg-slate-100" body-class="flex flex-col justify-end">
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
                <div class="flex items-start justify-between space-x-5 mb-1">
                    <Typography variant="h3" as="h3">{{ room.name }}</Typography>
                    <DetailsModal :id="room.id" />
                </div>
                <Typography variant="description">
                    {{ formatBeds(room.beds) }}, вид на {{ formatView(room.views) }},
                    {{ room.size }} м²
                </Typography>
            </div>
        </template>
        <div class="mb-4">
            <div class="flex flex-wrap -mx-2.5 -mb-2.5">
                <div v-for="facility in room.facilities" :key="facility.key" class="px-2.5 mb-2.5">
                    <IconFilled :icon="icons[facility.key]" :label="facility.label" />
                </div>
            </div>
        </div>
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
