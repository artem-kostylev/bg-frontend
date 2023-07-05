<script setup lang="ts">
import { IconFilled, Typography } from '@ui/components';
import { ArmchairAndLampIcon, ForkAndKnifeIcon, UsersIcon } from '@ui/icons';
import { RoomDetailsModal } from '@/tours/components';
import type { AlternativeRoom } from '@/account/types';

type Props = {
    accommodationRoom: AlternativeRoom;
    number: number;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div class="flex items-start justify-between space-x-5 mb-1">
            <Typography variant="h4">Номер № {{ number }}</Typography>
            <RoomDetailsModal :id="accommodationRoom.id" />
        </div>
        <div class="flex flex-col mt-2.5 space-y-2.5">
            <IconFilled :icon="ArmchairAndLampIcon" :label="accommodationRoom.name" />
            <IconFilled :icon="ForkAndKnifeIcon" :label="accommodationRoom.board" />
            <IconFilled :icon="UsersIcon" :label="accommodationRoom.tourists.join(', ')" />
        </div>
    </div>
</template>
