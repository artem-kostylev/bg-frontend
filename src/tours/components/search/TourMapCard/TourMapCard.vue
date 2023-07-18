<script setup lang="ts">
import { Image, Stars, Typography } from '@ui/components';
import type { Tour } from '@/tours/types';
import { HotelBadges } from '@/tours/components';
import { useParams, useQuery } from '@/app/composables';
import type { FiltersRaw } from '@/app/types';
import type { RouteLocationNamedRaw } from 'vue-router';

const params = useParams<{ id: string }>();
const query = useQuery<{ accommodations_unikey?: string[][]; hotel_ids?: number[] }>();

type Props = {
    tour: Tour & { qty_hotels?: number };
    filters: FiltersRaw;
    variant: string;
    target?: '_blank';
};

const props = defineProps<Props>();

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
</script>

<template>
    <NuxtLink
        :to="getTo(tour.hotel.id)"
        :target="target"
        class="w-full relative rounded-xl overflow-hidden bg-secondary-100"
    >
        <div class="relative w-[300px] h-44">
            <Image :src="tour.hotel.images[0].url" class="w-full h-full object-cover" />
        </div>
        <div
            class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-secondary-900/90"
        ></div>
        <div class="absolute top-0 right-0 px-5 py-4 z-40">
            <HotelBadges
                v-if="tour.hotel.rating !== void 0 && tour.hotel.reviews !== void 0"
                :rating="tour.hotel.rating.toString()"
                :reviews="tour.hotel.reviews"
            />
        </div>
        <div class="absolute bottom-0 px-5 py-4">
            <Stars v-if="tour.hotel.stars" :stars="tour.hotel.stars" class="mb-1.5" />
            <Typography variant="h4" class="text-white">{{ tour.hotel.name }}</Typography>
        </div>
    </NuxtLink>
</template>
