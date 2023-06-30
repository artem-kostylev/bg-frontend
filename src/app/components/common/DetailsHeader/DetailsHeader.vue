<script setup lang="ts">
import type { Location, Image } from '@/app/types';
import { LocationList, ImageGrid } from '@/app/components';
import { Typography, Stars, Gallery } from '@ui/components';
import { HotelBadges } from '@/tours/components';

type Entity = {
    stars?: number;
    name: string;
    location?: Location[];
    images: Image[];
    rating?: string;
    reviews?: number;
};

type Props = {
    entity: Entity;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div class="flex items-center mb-2">
            <Stars v-if="entity.stars" :stars="entity.stars" class="flex-1" />
            <HotelBadges
                v-if="entity.rating !== void 0 && entity.reviews !== void 0"
                :rating="entity.rating"
                :reviews="entity.reviews"
            />
        </div>
        <Typography variant="h1" as="h1">{{ entity.name }}</Typography>
        <LocationList v-if="entity.location?.length" :location="entity.location" class="mt-1.5" />
        <Gallery v-if="entity.images.length" :images="entity.images">
            <template #trigger="{ open }">
                <ImageGrid
                    :images="entity.images"
                    :alt="entity.name"
                    class="cursor-pointer mt-6"
                    @click="open"
            /></template>
        </Gallery>
    </div>
</template>
