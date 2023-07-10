<script setup lang="ts">
import { definePageMeta, useLazyAsyncData, useName, watch } from '#imports';
import { useQuery } from '@/app/composables';
import { Page, Empty } from '@/app/components';
import { MovementList } from '@/booking/components';
import type { FetchMovementsQuery } from '@/booking/services';
import { fetchMovements } from '@/booking/services';
import { Spin, Typography } from '@ui/components';

definePageMeta({ navigation: true });

const name = useName<'booking-tickets' | 'avia-search'>();
const query = useQuery<FetchMovementsQuery>();

const { data, pending, execute } = useLazyAsyncData('booking-tickets', () => {
    return fetchMovements(query.value, name.value);
});

watch(query, value => {
    if (!value.route_ids) {
        execute();
        return;
    }

    value.route_ids.length < data.value!.general.qty_movements && execute();
});
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <div v-else-if="data" class="relative">
            <Typography variant="h1" as="h1" class="mb-5">{{ data.direction }}</Typography>
            <MovementList
                v-if="data.movements.length"
                :movements="data.movements"
                :price="data.price"
            />
            <Empty
                v-else
                title="Список перемещений пуст"
                description="Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры"
            />
        </div>
    </Page>
</template>
