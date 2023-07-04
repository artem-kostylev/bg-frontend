<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { useNuxtData } from '#imports';
import { Card, IconFilled, Typography, Button } from '@ui/components';
import type { AccommodationRoom } from '@/booking/types';
import { ArmchairAndLampIcon, ForkAndKnifeIcon, UsersIcon, CheckListIcon } from '@ui/icons';
import { RoomDetailsModal } from '@/tours/components';
import { type FetchPaymentStatusResponse } from '@/booking/services';

type Props = {
    accommodationRoom: AccommodationRoom;
    number: number;
};

defineProps<Props>();

const show = ref(false);

const AccommodationRoomWishes = defineAsyncComponent(
    () => import('../AccommodationRoomWishes/AccommodationRoomWishes.vue')
);

const { data: paymentStatus } = useNuxtData<FetchPaymentStatusResponse>('booking-pay-status');
</script>

<template>
    <Card
        body-class="relative"
        :class="[accommodationRoom.status === 2 && 'border border-danger-500']"
    >
        <template #header>
            <div class="flex items-start justify-between space-x-5 mb-1">
                <Typography variant="h4">Номер № {{ number }}</Typography>
                <RoomDetailsModal :id="accommodationRoom.id" />
            </div>
        </template>
        <div class="flex flex-col space-y-2.5">
            <IconFilled :icon="ArmchairAndLampIcon" :label="accommodationRoom.name" />
            <IconFilled :icon="ForkAndKnifeIcon" :label="accommodationRoom.board" />
            <IconFilled :icon="UsersIcon" :label="accommodationRoom.tourists.join(', ')" />
        </div>
        <div v-if="paymentStatus?.status === 'not_paid'" class="flex justify-end mt-2.5">
            <Button :start-icon="CheckListIcon" variant="secondary" @click="show = true">
                Дополнительные пожелания
            </Button>
            <AccommodationRoomWishes v-model="show" :accommodation-room="accommodationRoom" />
        </div>
    </Card>
</template>
