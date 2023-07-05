<script setup lang="ts">
import { resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { LocationList } from '@/app/components';
import { formatCurrency, formatDistance } from '@/app/lib';
import { Button, Card, Typography, Image, Stars, Divider, IconFilled } from '@ui/components';
import { UmbrellaIcon, AirplaneIcon, ForkAndKnifeIcon } from '@ui/icons';
import { formatFood } from '@/tours/lib';
import { TourIncluded, HotelBadges } from '@/tours/components';
import type { ShortHotel, Tour } from '@/tours/types';
import type { AlternativeHotel } from '@/account/types';

type Props = {
    hotel: ShortHotel | AlternativeHotel;
    tour?: Tour & { qty_hotels?: number };
    to: RouteLocationNamedRaw;
    included: boolean;
    btn: boolean;
    target?: '_blank';
    shadow: boolean;
};

withDefaults(defineProps<Props>(), {
    tour: undefined,
    included: true,
    btn: true,
    target: undefined,
    shadow: true,
});

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
    <Card
        cover-class="h-[14rem] bg-secondary-100"
        body-class="flex flex-col justify-end"
        :class="!shadow && '!shadow-none border border-secondary-200'"
    >
        <template #cover>
            <Image
                v-if="hotel.images[0]"
                :src="hotel.images[0].url"
                :alt="hotel.name"
                class="w-full h-full object-cover"
            />
        </template>
        <template #header>
            <div class="flex items-center -mx-2.5 mb-2">
                <div class="px-2.5 w-1/2">
                    <Stars v-if="hotel.stars" :stars="hotel.stars" class="flex-1" />
                </div>
                <div class="px-2.5 w-1/2">
                    <HotelBadges
                        v-if="hotel.rating !== void 0 && hotel.reviews !== void 0"
                        :rating="hotel.rating.toString()"
                        :reviews="hotel.reviews"
                    />
                </div>
            </div>
            <NuxtLink :to="to" :target="target">
                <Typography
                    variant="h3"
                    as="h2"
                    class="mb-1 hover:text-primary-500 duration-200 transition-colors"
                >
                    {{ hotel.name }}
                </Typography>
            </NuxtLink>
            <LocationList target="_blank" :location="hotel.location" />
        </template>
        <div class="mb-4" v-if="hotel.food">
            <div class="flex flex-wrap -mx-2.5 -mb-2.5">
                <div v-if="hotel.airport_remoteness" class="px-2.5 mb-2.5">
                    <IconFilled
                        :icon="AirplaneIcon"
                        :label="`${formatDistance(hotel.airport_remoteness)}`"
                    />
                </div>
                <div v-if="hotel.beach_remoteness" class="px-2.5 mb-2.5">
                    <IconFilled
                        :icon="UmbrellaIcon"
                        :label="`${formatDistance(hotel.beach_remoteness)}`"
                    />
                </div>
                <div v-if="hotel.food" class="px-2.5 mb-2.5">
                    <IconFilled :icon="ForkAndKnifeIcon" :label="formatFood(hotel.food)" />
                </div>
            </div>
        </div>
        <Divider v-if="included || btn" dashed class="mb-4" />
        <TourIncluded v-if="tour && included" v-bind="tour" class="mb-4" />
        <Button v-if="tour && btn" :as="NuxtLink" :to="to" variant="primary" :target="target" block>
            от {{ formatCurrency(tour.price) }}
        </Button>
    </Card>
</template>
