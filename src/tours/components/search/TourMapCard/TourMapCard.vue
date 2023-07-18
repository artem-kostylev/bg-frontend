<script setup lang="ts">
import { Image, Stars, Typography } from '@ui/components';
import type { Tour } from '@/tours/types';
import { HotelBadges } from '@/tours/components';

type Props = {
    tour: Tour;
};

defineProps<Props>();
const emit = defineEmits<{ (e: 'submit'): void }>();

const onSubmit = () => {
    emit('submit');
};
</script>

<template>
    <div
        @click="onSubmit"
        class="w-full relative rounded-xl overflow-hidden bg-secondary-100 cursor-pointer"
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
    </div>
</template>
