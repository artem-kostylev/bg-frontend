<script setup lang="ts">
import { resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { FiltersRaw } from '@/app/types';
import { LocationList } from '@/app/components';
import { formatCurrency, formatDistance } from '@/app/lib';
import { useQuery, useParams } from '@/app/composables';
import { Button, Card, Typography, Image, Stars, Divider, IconFilled } from '@ui/components';
import { UmbrellaIcon, AirplaneIcon, ForkAndKnifeIcon } from '@ui/icons';
import { formatFood } from '@/tours/lib';
import { TourIncluded, HotelBadges } from '@/tours/components';
import type { Tour } from '@/tours/types';

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

const NuxtLink = resolveComponent('NuxtLink');

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
    <Card cover-class="h-[14rem] bg-secondary-100" body-class="flex flex-col justify-end">
        <template #cover>
            <Image
                v-if="tour.hotel.images[0]"
                :src="tour.hotel.images[0].url"
                :alt="tour.hotel.name"
                class="w-full h-full object-cover"
            />
        </template>
        <template #header>
            <div class="flex items-center -mx-2.5 mb-2">
                <div class="px-2.5 w-1/2">
                    <Stars v-if="tour.hotel.stars" :stars="tour.hotel.stars" class="flex-1" />
                </div>
                <div class="px-2.5 w-1/2">
                    <HotelBadges
                        v-if="tour.hotel.rating !== void 0 && tour.hotel.reviews !== void 0"
                        :rating="tour.hotel.rating.toString()"
                        :reviews="tour.hotel.reviews"
                    />
                </div>
            </div>
            <NuxtLink :to="getTo(tour.hotel.id)" :target="target">
                <Typography
                    variant="h3"
                    as="h2"
                    class="mb-1 hover:text-primary-500 duration-200 transition-colors"
                >
                    {{ tour.hotel.name }}
                </Typography>
            </NuxtLink>
            <LocationList target="_blank" :location="tour.hotel.location" />
        </template>
        <div class="mb-4" v-if="tour.hotel.food">
            <div class="flex flex-wrap -mx-2.5 -mb-2.5">
                <div v-if="tour.hotel.airport_remoteness" class="px-2.5 mb-2.5">
                    <IconFilled
                        :icon="AirplaneIcon"
                        :label="`${formatDistance(tour.hotel.airport_remoteness)}`"
                    />
                </div>
                <div v-if="tour.hotel.beach_remoteness" class="px-2.5 mb-2.5">
                    <IconFilled
                        :icon="UmbrellaIcon"
                        :label="`${formatDistance(tour.hotel.beach_remoteness)}`"
                    />
                </div>
                <div v-if="tour.hotel.food" class="px-2.5 mb-2.5">
                    <IconFilled :icon="ForkAndKnifeIcon" :label="formatFood(tour.hotel.food)" />
                </div>
            </div>
        </div>
        <Divider dashed class="mb-4" />
        <TourIncluded v-bind="tour" class="mb-4" />
        <Button :as="NuxtLink" :to="getTo(tour.hotel.id)" variant="primary" :target="target" block>
            от {{ formatCurrency(tour.price) }}
        </Button>
    </Card>
</template>
