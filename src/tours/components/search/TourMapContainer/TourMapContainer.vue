<script setup lang="ts">
import type { Tour } from '@/tours/types';
import { formatCurrency } from '@/app/lib';
import { Map, MarkerWithPopover } from '@map';
import { ControlButtons } from './components';
import { TourMapCard } from '@/tours/components';
import type { FiltersRaw } from '@/app/types';
import { useParams, useQuery } from '@/app/composables';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useRouter } from 'vue-router';

const params = useParams<{ id: string }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();
const router = useRouter();

type ShortTour = Tour & { qty_hotels?: number };

type Props = {
    tours: ShortTour[];
    filters: FiltersRaw;
    name: string;
    target?: '_blank';
};

const props = defineProps<Props>();

const onSubmit = (tour: ShortTour) => {
    const isPackage = props.name === 'tours-multi-id' || props.name === 'tours-activity-id';

    const name = props.name.replace('-search', '-id');

    const to: RouteLocationNamedRaw = {
        name,
        params: {},
        query: {},
    };

    Object.assign(to.query!, props.filters);

    if (isPackage) {
        to.params!.id = params.value.id;
        to.query!.tour_type = 'package';
        to.query!.hotel_ids = [...(query.value.hotel_ids || ''), tour.hotel.id];
        to.query!.accommodations_unikey = query.value.accommodations_unikey as never;
    } else {
        to.params!.id = tour.hotel.id;

        if (props.name === 'hotels-search') {
            to.query!.tour_type = 'hotel';
        }

        if (props.name === 'tours-activity-search') {
            tour.qty_hotels === 0 && (to.query!.qty_hotels = 0);
        }
    }

    router.push(to);
};
</script>

<template>
    <Map :center="tours[0].hotel.coordinates" :zoom="10">
        <ControlButtons />
        <template v-for="tour in tours" :key="tour.hotel.id">
            <MarkerWithPopover v-if="tour.hotel.coordinates" :coordinates="tour.hotel.coordinates">
                <template #trigger="{ vbind }">
                    <button
                        v-bind="vbind"
                        target="__blank"
                        class="bg-primary-500 hover:bg-primary-600 text-white text-sm whitespace-nowrap px-2 py-1.5 rounded-full transition-colors duration-200 cursor-pointer"
                    >
                        {{ formatCurrency(tour.price) }}
                    </button>
                </template>
                <TourMapCard
                    :variant="name"
                    :target="target"
                    :filters="filters"
                    :tour="tour"
                    @submit="onSubmit(tour)"
                />
            </MarkerWithPopover>
        </template>
    </Map>
</template>
