<script setup lang="ts">
import { ref, computed } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useQuery } from '@/app/composables';
import { useMessage } from '@ui/composables';
import { Card, Grid, Divider, Typography, Button } from '@ui/components';
import { TourCard } from '@/tours/components';
import { AlternativeRoomCard } from '@/account/components';
import type { AlternativeHotel } from '@/account/types';
import { formatCurrency } from '@/app/lib';
import { FetchError } from 'ofetch';
import { fetchChangeAcommodation } from '@/account/services';

type Props = {
    accommodation: AlternativeHotel;
};

const props = defineProps<Props>();

const query = useQuery<{
    order_id: number;
    hotel_index: number;
    order_accommodation_id: string[];
}>();

const to = computed(() => {
    const route: RouteLocationNamedRaw = {
        name: 'account-alternative-hotel-id',
        params: { id: props.accommodation.id },
    };

    route.query = { ...query.value };
    route.query.tour_id = props.accommodation.rooms.map(room => room.tour_id);
    return route;
});

const message = useMessage();
const pending = ref(false);

const changeAcommodation = async () => {
    try {
        pending.value = true;
        await fetchChangeAcommodation({
            order_id: query.value.order_id,
            groups: props.accommodation.rooms.map(room => {
                const { tour_id, group_id } = room;
                return { tour_id, group_id };
            }),
        });
    } catch (error) {
        if (error instanceof FetchError) {
            message.danger(error.data.message);
        }
    } finally {
        pending.value = false;
    }
};
</script>

<template>
    <Card body-class="p-5 flex flex-wrap md:flex-nowrap gap-5">
        <div class="w-full md:w-1/3">
            <TourCard :hotel="accommodation" :to="to" :btn="false" :shadow="false" class="h-full" />
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
                    ><Button
                        variant="primary"
                        class="w-full sm:w-max"
                        @click="changeAcommodation"
                        >{{ formatCurrency(accommodation.total_price) }}</Button
                    >
                </div>
            </Grid>
        </div>
    </Card>
</template>
