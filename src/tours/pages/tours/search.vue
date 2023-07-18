<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { TourList, TourFilters, TourMapContainer } from '@/tours/components';
import { fetchTours } from '@/tours/services';
import { Spin, Typography, Button } from '@ui/components';
import type { FiltersRaw } from '@/app/types';
import { formatFilters } from '@/app/lib';
import { useQuery, useName, useInfinity } from '@/app/composables';
import { Empty, Page } from '@/app/components';
import { MapIcon } from '@ui/icons';
import { useToursProvide } from '@/tours/composables';

definePageMeta({ filters: true, navigation: true });

const name = useName<string>();
const query = useQuery<FiltersRaw>();

const page = ref(1);
const sort = ref('tour.price:asc');
const view = ref(1);
const openAdvanced = ref(false);

const { data, pending, error, refresh } = useLazyAsyncData(
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

watch(query, () => refresh());

const changeView = () => {
    view.value !== 3 ? view.value++ : (view.value = 1);
};

useToursProvide({ changeView, view, openAdvanced });
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <div v-else-if="data" class="flex flex-wrap -mx-2.5 relative">
            <div
                v-show="view !== 3"
                :class="[
                    'px-2.5',
                    view === 1 && 'w-full',
                    view === 2 && 'hidden lg:block lg:w-1/3',
                ]"
            >
                <div class="flex items-center justify-between mb-5">
                    <Typography variant="h1" as="h1" class="truncate">
                        {{ data.meta.title }}
                    </Typography>
                    <Button v-if="view === 1" :start-icon="MapIcon" @click="changeView">
                        На карте
                    </Button>
                </div>
                <TourFilters v-show="view === 1" v-model="sort" class="mb-5" />
                <template v-if="data.tours.length">
                    <TourList :tours="data.tours" :name="name" :filters="filters" :view="view" />
                    <template v-if="data.has_next">
                        <Spin v-if="loadingMore" color="primary" class="my-12 flex-1" />
                        <div v-else ref="targetRef"></div>
                    </template>
                </template>
                <Empty
                    v-else
                    title="По вашему запросу ничего не нашлось"
                    description="Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры"
                />
            </div>
            <div
                v-if="view !== 1"
                :class="[
                    'px-2.5 relative',
                    view === 2 && 'w-full lg:w-2/3',
                    view === 3 && 'w-full',
                ]"
            >
                <TourMapContainer
                    :tours="data.tours"
                    :name="name"
                    :filters="filters"
                    class="w-full h-full max-h-screen rounded-xl overflow-hidden sticky top-0"
                />
            </div>
        </div>
    </Page>
</template>
