<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';
import { Card, Grid, Divider, Typography, Button } from '@ui/components';
import { TourCard } from '@/tours/components';
import { AlternativeRoomCard } from '@/account/components';
import type { AlternativeHotel } from '@/account/types';
import { formatCurrency } from '@/app/lib';

type Props = {
    accommodation: AlternativeHotel;
};

defineProps<Props>();

const to: RouteLocationNamedRaw = {
    name: '#',
    params: {},
    query: {},
};
</script>

<template>
    <Card body-class="p-5 flex flex-wrap md:flex-nowrap gap-5">
        <div class="w-full md:w-1/3">
            <TourCard
                :hotel="accommodation"
                :to="to"
                target="_blank"
                :btn="false"
                :shadow="false"
                class="h-full"
            />
        </div>
        <div class="w-full md:w-2/3">
            <Grid gap="5">
                <div
                    v-for="(accommodationRoom, index) in accommodation.rooms"
                    :key="accommodationRoom.id"
                >
                    <AlternativeRoomCard
                        :accommodation-room="accommodationRoom"
                        :number="index + 1"
                    />
                    <Divider v-if="index !== accommodation.rooms.length - 1" dashed class="mt-5" />
                </div>
                <div>
                    <Typography variant="h4" class="mb-2">Цена тура с этим отелем:</Typography
                    ><Button variant="primary" class="w-full sm:w-max">{{
                        formatCurrency(accommodation.total_price)
                    }}</Button>
                </div>
            </Grid>
        </div>
    </Card>
</template>
