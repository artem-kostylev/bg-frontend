<script setup lang="ts">
import type { Room } from '@/tours/types';
import { formatCurrency } from '@/app/lib';
import { useRoomsStore } from '@/tours/stores';
import { Button, Card, Typography, Image, Divider, IconFilled } from '@ui/components';
import { ForkAndKnifeIcon, UsersIcon } from '@ui/icons';
import { formatBeds, formatView } from '@/tours/lib';
import { RoomFacilityList, RoomDetailsModal } from '@/tours/components';

type Props = {
    room: Room;
    isLastGroup?: boolean;
    footer?: boolean;
};

defineProps<Props>();

const { selectDates } = useRoomsStore();
</script>

<template>
    <Card cover-class="h-[14rem] bg-secondary-100" body-class="flex flex-col justify-end">
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
                    <RoomDetailsModal :id="room.id" />
                </div>
                <Typography variant="description">
                    {{ formatBeds(room.beds) }}, вид на {{ formatView(room.views) }},
                    {{ room.size }} м²
                </Typography>
            </div>
        </template>
        <div class="mb-4">
            <RoomFacilityList :facilities="room.facilities" />
        </div>
        <div
            v-for="food in room.food"
            :key="food.id"
            class="border-t border-secondary-200 border-dashed py-1.5 last:pb-0 flex items-center justify-between"
        >
            <Typography>{{ food.name }}</Typography>
            <Button
                v-if="isLastGroup !== undefined"
                variant="primary"
                size="xs"
                @click="selectDates(food.dates, isLastGroup)"
            >
                от {{ formatCurrency(food.price) }}
            </Button>
        </div>
        <div v-if="footer" class="space-y-4">
            <Divider dashed />
            <IconFilled
                v-if="room.board"
                :icon="ForkAndKnifeIcon"
                :label="room.board"
                variant="secondary"
            />
            <IconFilled
                v-if="room.tourists"
                :icon="UsersIcon"
                :label="room.tourists.join(', ')"
                variant="secondary"
            />
        </div>
    </Card>
</template>
