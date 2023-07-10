<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { FiltersRaw } from '@/app/types';
import { useQuery, useParams } from '@/app/composables';
import type { Tour } from '@/tours/types';
import { TourCard } from '@/tours/components';

const params = useParams<{ id: string }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();

type Props = {
    tour: Tour & { qty_hotels?: number };
    filters: FiltersRaw;
    variant: string;
    target?: '_blank';
};

const props = withDefaults(defineProps<Props>(), {
    target: undefined,
});

const getTo = (id: number) => {
    const isPackage = props.variant === 'tours-multi-id' || props.variant === 'tours-activity-id';

    const name = props.variant.replace('-search', '-id');

    const to: RouteLocationNamedRaw = {
        name,
        params: {},
        query: {},
    };

    Object.assign(to.query!, props.filters);

    if (isPackage) {
        to.params!.id = params.value.id;
        to.query!.tour_type = 'package';
        to.query!.hotel_ids = [...(query.value.hotel_ids || ''), id];
        to.query!.accommodations_unikey = query.value.accommodations_unikey as never;
    } else {
        to.params!.id = id;

        if (props.variant === 'hotels-search') {
            to.query!.tour_type = 'hotel';
        }

        if (props.variant === 'tours-activity-search') {
            props.tour.qty_hotels === 0 && (to.query!.qty_hotels = 0);
        }
    }

    return to;
};

const included = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hotel, price, qty_hotels, ...rest } = props.tour;
    return rest;
});
</script>

<template>
    <TourCard
        :hotel="tour.hotel"
        :to="getTo(tour.hotel.id)"
        :tour-price="tour.price"
        :target="target"
        :btn="true"
        :included="included"
    />
</template>
