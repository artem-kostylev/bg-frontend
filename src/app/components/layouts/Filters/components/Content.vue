<script setup lang="ts">
import { ref } from 'vue';
import { BeginDatePicker, FromPicker, ToPicker, DurationPicker, RoomPicker } from './elements';
import { SearchIcon } from '@ui/icons';
import { Button } from '@ui/components';
import { useLazyAsyncData } from '#imports';
import { fetchMainFilters } from '@/app/services';
import { useQuery } from '@/app/composables';
import type { Filters, FiltersRaw } from '@/app/types';

const query = useQuery<FiltersRaw>();

const { data } = useLazyAsyncData('main-filters', () => fetchMainFilters(query.value), {
    server: false,
    default: () => ({} as Filters),
});

const search = ref('');
</script>

<template>
    <div class="flex space-x-2.5 items-stretch">
        <div class="grid grid-cols-5 gap-2.5 flex-1">
            <FromPicker
                v-model="data.tour_from"
                label-key="name"
                value-key="id"
                :options="[
                    { label: 'Москва', value: '1' },
                    { label: 'Санкт-Петербург', value: '2' },
                ]"
            />
            <ToPicker
                v-model="data.tour_to"
                v-model:search="search"
                label-key="title"
                value-key="id"
                description-key="location"
                :options="[
                    { label: 'Москва', value: '1' },
                    { label: 'Санкт-Петербург', value: '2' },
                ]"
            />
            <BeginDatePicker v-model="data.tour_begin_date" />
            <DurationPicker v-model="data.tour_duration" />
            <RoomPicker v-model="data.tour_tourists" />
        </div>
        <Button variant="primary">
            <SearchIcon width="1.2em" height="1.2em" class="mx-1.5" />
        </Button>
    </div>
</template>
