<script setup lang="ts">
import { ref, watch } from 'vue';
import { BeginDatePicker, FromPicker, ToPicker, DurationPicker, RoomPicker } from './elements';
import { SearchIcon } from '@ui/icons';
import { Button } from '@ui/components';
import { useLazyAsyncData } from '#imports';
import { fetchMainFilters, fetchMainFiltersFrom, fetchMainFiltersTo } from '@/app/services';
import { useQuery } from '@/app/composables';
import type { Filters, FiltersRaw } from '@/app/types';
import { useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { useName } from '@/app/composables';
import { formatFilters } from '@/app/lib';
import { useDebounceFn } from '@vueuse/core';

const query = useQuery<FiltersRaw>();
const router = useRouter();
const name = useName<string>();
const search = ref('');

const { data } = useLazyAsyncData('main-filters', () => fetchMainFilters(query.value), {
    server: false,
    default: () => ({} as Filters),
});

const { data: from, pending: pendingFrom } = useLazyAsyncData(
    'main-filters-from',
    () => fetchMainFiltersFrom(),
    { server: false }
);

const {
    data: to,
    pending: pendingTo,
    refresh: refreshTo,
} = useLazyAsyncData('main-filters-to', () => fetchMainFiltersTo(search.value), { server: false });

const searchDebounce = useDebounceFn(() => {
    refreshTo();
}, 500);

watch(search, (value, prevValue) => {
    if (value.length >= 3 || prevValue.length >= 3) {
        searchDebounce();
    }
});

const onSearch = () => {
    const correctName = name.value === 'index' ? 'tours-search' : `${name.value}-search`;

    router.push({ name: correctName, query: formatFilters(data.value) as LocationQueryRaw });
};
</script>

<template>
    <div class="flex flex-wrap items-stretch -mx-1 -mb-2">
        <div class="w-full md:w-1/2 lg:w-1/6 px-1 mb-2">
            <FromPicker
                v-model="data.tour_from"
                label-key="name"
                value-key="id"
                :loading="pendingFrom"
                :options="from"
            />
        </div>
        <div class="w-full md:flex-1 px-1 mb-2">
            <ToPicker
                v-model="data.tour_to"
                v-model:search="search"
                label-key="title"
                value-key="id"
                description-key="location"
                :options="to"
                :loading="!to?.length && pendingTo"
                :loading-search="!!to?.length && pendingTo"
            />
        </div>
        <div class="w-1/2 lg:w-1/6 px-1 mb-2">
            <BeginDatePicker v-model="data.tour_begin_date" />
        </div>
        <div class="w-1/2 lg:w-1/6 px-1 mb-2">
            <DurationPicker v-model="data.tour_duration" />
        </div>
        <div class="w-full lg:w-1/6 px-1 mb-2">
            <RoomPicker v-model="data.tour_tourists" />
        </div>
        <div class="flex w-full lg:w-auto px-1 mb-2">
            <Button variant="primary" block @click="onSearch">
                <SearchIcon width="1.2em" height="1.2em" class="m-1.5" />
            </Button>
        </div>
    </div>
</template>
