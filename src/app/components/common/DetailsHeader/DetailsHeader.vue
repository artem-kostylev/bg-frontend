<script setup lang="ts">
import type { Location, Image } from '@/app/types';
import { LocationList, ImageGrid, RatingBadges } from '@/app/components';
import { Typography, Stars } from '@ui/components';

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
        <div class="flex items-start mb-2">
            <Stars v-if="entity.stars" :stars="entity.stars" class="flex-1" />
            <RatingBadges
                v-if="entity.rating !== undefined && entity.reviews !== undefined"
                :rating="entity.rating"
                :reviews="entity.reviews"
            />
        </div>
        <Typography variant="h1" as="h1">{{ entity.name }}</Typography>
        <LocationList v-if="entity.location?.length" :location="entity.location" class="mt-1.5" />
        <ImageGrid
            v-if="entity.images.length"
            :images="entity.images"
            :alt="entity.name"
            class="mt-6"
        />
    </div>
</template>
