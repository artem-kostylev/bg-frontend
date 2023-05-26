<script setup lang="ts">
import type { AccommodationRoom } from '@/booking/types';
import { Grid } from '@ui/components';
import { AccommodationRoomCard } from '@/booking/components';

type Props = {
    accommodationRooms: AccommodationRoom[];
};

defineProps<Props>();
</script>

<template>
    <Grid cols="2" gap="5">
        <AccommodationRoomCard
            v-for="(accommodationRoom, index) in accommodationRooms"
            :key="accommodationRoom.id"
            :accommodation-room="accommodationRoom"
            :number="index + 1"
        />
    </Grid>
</template>
