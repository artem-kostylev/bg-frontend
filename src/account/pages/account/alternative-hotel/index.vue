<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLazyAsyncData, useHead, definePageMeta } from '#imports';
import { fetchAlternativeHotels } from '@/account/services';
import { Empty, Page } from '@/app/components';
import { Spin, Grid, Typography, IconFilled } from '@ui/components';
import { CalendarIcon } from '@ui/icons';
import { useQuery, useInfinity } from '@/app/composables';
import { formatDate, pluralize } from '@/app/lib';
import { AlternativeHotelList } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const query = useQuery<{
    order_id: number;
    hotel_index: number;
    order_accommodation_id: string[];
}>();

const page = ref(1);

const { data, pending } = useLazyAsyncData('alternative-hotels', () =>
    fetchAlternativeHotels({
        order_id: query.value.order_id,
        order_accommodation_id: query.value.order_accommodation_id,
        page: page.value,
    })
);

const { targetRef, loadingMore } = useInfinity(async () => {
    const response = await fetchAlternativeHotels({
        order_id: query.value.order_id,
        order_accommodation_id: query.value.order_accommodation_id,
        page: ++page.value,
    });
    data.value!.has_next = response.has_next;
    data.value!.accommodations.push(...response.accommodations);
});

useHead({
    title: () => `Выбор другого варианта проживания для отеля №${query.value.hotel_index + 1}`,
});

const meta = {
    description: 'Выбор другого варианта проживания',
};

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
    <Page :meta="meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <Grid v-else-if="data" gap="5">
            <Typography variant="h1" as="h1"
                >Выбор другого варианта проживания для отеля №{{
                    query.hotel_index + 1
                }}</Typography
            >
            <IconFilled :icon="CalendarIcon" :label="dates" class="mb-2.5" />
            <template v-if="data.accommodations.length">
                <AlternativeHotelList :accommodations="data.accommodations" />
                <template v-if="data.has_next">
                    <Spin v-if="loadingMore" color="primary" class="my-12 flex-1" />
                    <div v-else ref="targetRef"></div>
                </template>
            </template>
            <Empty v-else title="Других вариантов проживания для отеля не нашлось" />
        </Grid>
    </Page>
</template>
