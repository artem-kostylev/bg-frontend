<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { TourList, TourFilters } from '@/tours/components';
import { fetchTours } from '@/tours/services';
import { Spin, Typography } from '@ui/components';
import type { FiltersRaw } from '@/app/types';
import { formatFilters } from '@/app/lib';
import { useQuery, useName, useInfinity } from '@/app/composables';
import { Empty, Page } from '@/app/components';

definePageMeta({ filters: true });

const name = useName<string>();
const query = useQuery<FiltersRaw>();

const page = ref(1);
const sort = ref('tour.price:asc');

const { data, pending, error } = useLazyAsyncData(
    'tours',
    () => fetchTours(query.value, name.value, page.value, sort.value),
    { watch: [sort] }
);

const { targetRef, loadingMore } = useInfinity(async () => {
    const response = await fetchTours(query.value, name.value, ++page.value, sort.value);
    data.value!.has_next = response.has_next;
    data.value!.tours.push(...response.tours);
});

const filters = computed(() => formatFilters(data.value!.filters));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="md:mb-2.5">{{ data.meta.title }}</Typography>
            <TourFilters v-model="sort" class="mb-8" />
            <template v-if="data.tours.length">
                <TourList :tours="data.tours" :name="name" :filters="filters" />
                <template v-if="data.has_next">
                    <Spin v-if="loadingMore" color="primary" class="my-12" />
                    <div v-else ref="targetRef"></div>
                </template>
            </template>
            <Empty
                v-else
                title="Ничего не нашлось"
                description="Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры"
            />
        </template>
    </Page>
</template>
