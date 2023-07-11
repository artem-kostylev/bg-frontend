<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { RouteLocationNamedRaw } from 'vue-router';
import { useNuxtData } from '#imports';
import { BuildingsIcon, CalendarIcon, BuildingWithArrowsIcon, HeadsetIcon } from '@ui/icons';
import type { Accommodation } from '@/booking/types';
import { IconFilled, Typography, Button } from '@ui/components';
import { LocationList } from '@/app/components';
import { formatDate, pluralize } from '@/app/lib';
import { AccommodationRoomList } from '@/booking/components';
import { Support } from '@/account/components';
import type { FetchOrderDetailResponse } from '@/booking/services';

type Props = {
    accommodation: Accommodation;
    accommodationIndex: number;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.accommodation.duration, ['ночь', 'ночи', 'ночей']));

const dates = computed(() => {
    return `с ${formatDate(props.accommodation.date_start, 'D')} по ${formatDate(
        props.accommodation.date_finish,
        'D MMM'
    )}
    на ${duration.value}`;
});

const { data: order } = useNuxtData<FetchOrderDetailResponse>('order-detail');

const accommodationError = computed(() => {
    return props.accommodation.rooms.some(room => room.status?.key_name === 'NOT_CONFIRMED');
});

const NuxtLink = resolveComponent('NuxtLink');

const to = computed(() => {
    const route: RouteLocationNamedRaw = {
        name: 'account-alternative-hotel',
    };
    route.query = {
        hotel_index: props.accommodationIndex,
        order_accommodation_id: props.accommodation.rooms.map(room => room.order_accommodation_id),
    };
    order.value && (route.query.order_id = order.value.general.order_id);
    return route;
});
</script>

<template>
    <div class="flex">
        <div v-if="order && accommodationError" class="w-2 rounded-r bg-danger-600 mr-4"></div>
        <div class="w-full space-y-5">
            <div v-if="order && accommodationError" class="flex items-center gap-4">
                <div class="text-danger-600 text-xl">Бронь этого отеля не подтверждена</div>
                <Button
                    :as="NuxtLink"
                    :to="to"
                    variant="primary"
                    :start-icon="BuildingWithArrowsIcon"
                    icon-class="w-6 h-6"
                    >Выбрать другой отель</Button
                >
                <Support
                    :support-id="order.general.support_id"
                    :order-number="order.general.order_number"
                    label="Помощь оператора"
                    :icon="HeadsetIcon"
                />
            </div>
            <div class="flex flex-col space-y-2.5">
                <div class="flex items-start space-x-2">
                    <IconFilled :icon="BuildingsIcon" class="-mt-0.5" />
                    <div>
                        <Typography variant="h4">{{ accommodation.name }}</Typography>
                        <LocationList :location="accommodation.location" target="_blank" />
                    </div>
                </div>
                <IconFilled :icon="CalendarIcon" :label="dates" />
            </div>
            <AccommodationRoomList :accommodation-rooms="accommodation.rooms" />
        </div>
    </div>
</template>
