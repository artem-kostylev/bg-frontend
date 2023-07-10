<script setup lang="ts">
import { computed } from 'vue';
import { useLazyAsyncData } from '#imports';
import { Grid, Typography, IconFilled, Spin, Button } from '@ui/components';
import { RoomCard } from '@/tours/components';
import { CalendarIcon } from '@ui/icons';
import { formatDate, pluralize, formatCurrency } from '@/app/lib';
import { useQuery } from '@/app/composables';
import { fetchAlternativeHotel } from '@/account/services';

const query = useQuery<{
    order_id: number;
    order_accommodation_id: string[];
    tour_id: number[];
}>();

const { data, pending } = useLazyAsyncData('alternative-hotel', () =>
    fetchAlternativeHotel({
        order_id: query.value.order_id,
        order_accommodation_id: query.value.order_accommodation_id,
        tour_id: query.value.tour_id,
    })
);

const dates = computed(() => {
    if (!data.value) return;

    const duration = pluralize(data.value.duration, ['ночь', 'ночи', 'ночей']);

    return `${formatDate(data.value.date_start, 'DD.MM')} - ${formatDate(
        data.value.date_finish,
        'DD.MM.YYYY'
    )} (${duration})`;
});
</script>

<template>
    <Grid gap="5">
        <Typography variant="h2" as="h2">Номера</Typography>
        <IconFilled :icon="CalendarIcon" :label="dates" class="mb-2.5" />
        <Spin class="flex-1" v-if="pending" color="primary" />
        <Grid gap="5" v-if="data?.accommodations[0] && data.accommodations[0].rooms.length">
            <Grid cols="3" gap="5">
                <RoomCard
                    v-for="room in data.accommodations[0].rooms"
                    :key="room.id"
                    :room="room"
                    footer
                />
            </Grid>
            <div class="mt-2.5">
                <Typography variant="h4" class="mb-2"
                    >Цена тура с этим отелем:
                    <span class="font-bold">{{
                        formatCurrency(data.accommodations[0].total_price)
                    }}</span>
                </Typography>
                <div class="flex gap-2.5">
                    <Button variant="primary" class="w-1/2 sm:w-max"> Выбрать этот отель </Button>
                    <Button variant="secondary" class="w-1/2 sm:w-max">
                        Выбрать другой отель
                    </Button>
                </div>
            </div>
        </Grid>
    </Grid>
</template>
