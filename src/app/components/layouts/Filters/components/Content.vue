<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from 'vue';
import { BeginDatePicker, FromPicker, ToPicker, DurationPicker, RoomPicker } from './elements';
import { SearchIcon } from '@ui/icons';
import { Button, Spin } from '@ui/components';
import { useLazyAsyncData } from '#imports';
import { fetchMainFilters, fetchMainFiltersFrom, fetchMainFiltersTo } from '@/app/services';
import { useQuery } from '@/app/composables';
import type { Filters, FiltersRaw } from '@/app/types';
import { useRouter } from 'vue-router';
import type { LocationQueryRaw } from 'vue-router';
import { useName } from '@/app/composables';
import { formatDates, formatFilters, parseFilters, pluralize } from '@/app/lib';
import { useDebounceFn } from '@vueuse/core';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';

const query = useQuery<FiltersRaw>();
const router = useRouter();
const name = useName<string>();
const search = ref('');
const showMainFilters = ref(false);

const { data, pending, refresh } = useLazyAsyncData(
    'main-filters',
    () => fetchMainFilters(query.value),
    {
        server: false,
        default: () => ({} as Filters),
    }
);

const { data: optionsFrom, pending: pendingFrom } = useLazyAsyncData(
    'main-filters-from',
    () => fetchMainFiltersFrom(),
    { server: false }
);

const {
    data: optionsTo,
    pending: pendingTo,
    refresh: refreshTo,
} = useLazyAsyncData('main-filters-to', () => fetchMainFiltersTo(search.value), { server: false });

const searchDebounce = useDebounceFn(() => {
    refreshTo();
}, 500);

const showSimplified = computed(() => {
    return !['index', 'hotels', 'avia'].includes(name.value) && !showMainFilters.value;
});

watch(search, (value, prevValue) => {
    if (value.length >= 3 || prevValue.length >= 3) {
        searchDebounce();
    }
});

const mainFilters = computed(() => {
    const { tour_from, tour_to, tour_begin_date, tour_tourists, tour_duration } = parseFilters(
        query.value
    );

    const payload: Filters = {};
    tour_from && (payload.tour_from = tour_from);
    tour_to && (payload.tour_to = tour_to);
    tour_begin_date && (payload.tour_begin_date = tour_begin_date);
    tour_tourists && (payload.tour_tourists = tour_tourists);
    tour_duration && (payload.tour_duration = tour_duration);

    return payload;
});

const onSearch = () => {
    const correctName =
        name.value === 'index'
            ? 'tours-search'
            : name.value.endsWith('-search')
            ? name.value
            : `${name.value}-search`;

    const payload = formatFilters(data.value);

    if (payload.tour_begin_date && !payload.tour_begin_date?.[1]) {
        payload.tour_begin_date.length = payload.tour_begin_date?.length - 1;
    }

    router.push({ name: correctName, query: formatFilters(data.value) as LocationQueryRaw });
};

watch(mainFilters, value => {
    if (Object.keys(value).length) {
        const main = cloneDeep(data.value);
        delete main.tour_to?.title;

        !isEqual(value, main) && refresh();
    }
});

const from = computed(() => {
    return optionsFrom.value?.find(item => item.id === data.value.tour_from)?.name;
});

const dates = computed(() => {
    if (!data.value.tour_begin_date) return;

    const separator = name.value.startsWith('avia') ? ' - ' : ' по ';

    return formatDates(data.value.tour_begin_date, separator, 'DD.MM');
});

const duration = computed(() => {
    if (!data.value.tour_duration) return;

    const [first, last] = data.value.tour_duration;
    if (!last || first === last) return pluralize(first, ['ночь', 'ночи', 'ночей']);
    return `${first} - ${pluralize(last, ['ночь', 'ночи', 'ночей'])}`;
});

const tourists = computed(() => {
    let hasChild = false;

    const count = data.value.tour_tourists?.reduce((a, b) => {
        b.adults && (a += b.adults.length);

        if (b.children?.length) {
            a += b.children.length;
            hasChild = true;
        }

        return a;
    }, 0);

    if (!count) return '';

    return `${pluralize(
        count,
        hasChild ? ['турист', 'туриста', 'туристов'] : ['взрослый', 'взрослых', 'взрослых']
    )}`;
});

const scroll = () => {
    window.scrollY > 600 && (showMainFilters.value = false);
};

watch(showMainFilters, (value: boolean) => {
    value
        ? document.addEventListener('scroll', scroll)
        : document.removeEventListener('scroll', scroll);
});

onBeforeUnmount(() => {
    document.removeEventListener('scroll', scroll);
});
</script>

<template>
    <div>
        <div
            :class="[
                'flex flex-wrap items-stretch -mx-1 -mb-2',
                showSimplified ? 'hidden md:flex' : 'flex',
            ]"
        >
            <div v-if="!name.startsWith('hotels')" class="w-full md:w-1/2 lg:w-1/6 px-1 mb-2">
                <FromPicker
                    v-model="data.tour_from"
                    label-key="name"
                    value-key="id"
                    :loading="pendingFrom"
                    :options="optionsFrom"
                />
            </div>
            <div class="w-full md:flex-1 px-1 mb-2">
                <ToPicker
                    v-model="data.tour_to"
                    v-model:search="search"
                    label-key="title"
                    value-key="id"
                    description-key="location"
                    :options="optionsTo"
                    :loading="!optionsTo?.length && pendingTo"
                    :loading-search="!!optionsTo?.length && pendingTo"
                />
            </div>
            <template v-if="name.startsWith('avia')">
                <div class="w-1/2 lg:w-1/6 px-1 mb-2">
                    <BeginDatePicker v-model="(data.tour_begin_date ?? [])[0]" title="Туда" />
                </div>
                <div class="w-1/2 lg:w-1/6 px-1 mb-2">
                    <BeginDatePicker
                        v-model="(data.tour_begin_date ?? [])[1]"
                        title="Обратно"
                        clearable
                    />
                </div>
            </template>
            <template v-else>
                <div class="w-1/2 lg:w-1/6 px-1 mb-2">
                    <BeginDatePicker v-model="data.tour_begin_date" range title="Когда" />
                </div>
                <div class="w-1/2 lg:w-1/6 px-1 mb-2">
                    <DurationPicker v-model="data.tour_duration" />
                </div>
            </template>
            <div class="w-full lg:w-1/6 px-1 mb-2">
                <RoomPicker v-model="data.tour_tourists" />
            </div>
            <div class="flex w-full lg:w-auto px-1 mb-2">
                <Button variant="primary" block @click="onSearch">
                    <div class="flex items-center m-1.5 space-x-2.5">
                        <SearchIcon width="1.15em" height="1.15em" />
                        <span class="lg:hidden">Найти</span>
                    </div>
                </Button>
            </div>
        </div>
        <div
            @click="showMainFilters = true"
            :class="[
                showSimplified ? 'flex md:hidden' : 'hidden',
                'items-center justify-between px-2.5 py-1 cursor-pointer',
            ]"
        >
            <div v-if="pending" class="flex items-center justify-center flex-1 py-3">
                <Spin width="1.3em" height="1.3em" class="text-primary-500" />
            </div>
            <div v-else-if="data" class="flex items-center justify-between flex-1">
                <div>
                    <div v-if="name.startsWith('hotels')">{{ data.tour_to?.title }}</div>
                    <div v-else>{{ from }} - {{ data.tour_to?.title }}</div>
                    <div v-if="name.startsWith('avia')" class="text-sm text-secondary-500">
                        {{ dates }}, {{ tourists }}
                    </div>
                    <div v-else class="text-sm text-secondary-500">
                        с {{ dates }}, на {{ duration }}, {{ tourists }}
                    </div>
                </div>
                <SearchIcon width="1.3em" height="1.3em" class="text-primary-500" />
            </div>
        </div>
    </div>
</template>
