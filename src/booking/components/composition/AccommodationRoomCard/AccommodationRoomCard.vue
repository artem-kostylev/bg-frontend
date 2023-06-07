<script setup lang="ts">
import { Card, IconFilled, Typography } from '@ui/components';
import type { AccommodationRoom } from '@/booking/types';
import { ArmchairAndLampIcon, ForkAndKnifeIcon, UsersIcon } from '@ui/icons';
import { RoomDetailsModal } from '@/tours/components';

type Props = {
    accommodationRoom: AccommodationRoom;
    number: number;
};

defineProps<Props>();
</script>

<template>
    <Card body-class="relative">
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
    </Card>
</template>
