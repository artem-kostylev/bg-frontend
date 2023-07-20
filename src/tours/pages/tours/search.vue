<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLazyAsyncData, definePageMeta } from '#imports';
import { TourList, TourFilters } from '@/tours/components';
import { fetchTours } from '@/tours/services';
import { Spin, Typography, Alert } from '@ui/components';
import type { FiltersRaw } from '@/app/types';
import { pluralize } from '@/app/lib';
import { useQuery, useName, useInfinity } from '@/app/composables';
import { Empty, Page } from '@/app/components';

definePageMeta({ filters: true, navigation: true });

const name = useName<string>();
const query = useQuery<FiltersRaw>();

const page = ref(1);
const sort = ref('tour.price:asc');

const { data, pending, error, refresh } = useLazyAsyncData(
    'tours',
    () => fetchTours(query.value, name.value, page.value, sort.value),
    { watch: [sort] }
);

const { targetRef, loadingMore } = useInfinity(async () => {
    const response = await fetchTours(query.value, name.value, ++page.value, sort.value);
    data.value!.has_next = response.has_next;

    data.value!.alternatives?.length
        ? data.value!.alternatives.push(...response.tours)
        : data.value!.tours.push(...response.tours);
});

watch(query, () => name.value === 'tours-search' && refresh());

const alertTitle = computed(() => {
    return data.value?.tours.length
        ? `По вашему запросу было найдено ${pluralize(data.value.tours.length, [
              'тур',
              'тура',
              'туров',
          ])}`
        : 'По вашему запросу туры не найдены';
});
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <template v-else-if="data">
            <Typography variant="h1" as="h1" class="md:mb-2.5">{{ data.meta.title }}</Typography>
            <TourFilters v-model="sort" class="mb-8" />
            <div class="space-y-5">
                <template v-if="data.tours.length">
                    <TourList :tours="data.tours" :name="name" :filters="data.filters" />
                    <template v-if="data.has_next">
                        <Spin v-if="loadingMore" color="primary" class="my-12 flex-1" />
                        <div v-else ref="targetRef"></div>
                    </template>
                </template>
                <template v-if="data.alternatives?.length">
                    <Alert
                        variant="warning"
                        :title="alertTitle"
                        text="Измените поисковый запрос или рассмотрите похожие варианты:"
                    />
                    <TourList
                        :tours="data.alternatives"
                        :name="name"
                        :filters="data.filter_alternatives"
                    />
                </template>
                <Empty
                    v-if="!data.tours.length && !data.alternatives?.length"
                    title="По вашему запросу ничего не нашлось"
                    description="Попробуйте скорректировать поиск, изменив регион, даты заезда и выезда, количество гостей или фильтры"
                />
            </div>
        </template>
    </Page>
</template>
