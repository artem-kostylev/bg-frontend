<script setup lang="ts">
import type { Location, Image } from '@/app/types';
import { LocationList, ImageGrid } from '@/app/components';
import { Typography, Stars } from '@ui/components';

type Entity = {
    stars?: number;
    name: string;
    location?: Location[];
    images: Image[];
};

type Props = {
    entity: Entity;
};

defineProps<Props>();
</script>

<template>
    <div>
        <Stars v-if="entity.stars" :stars="entity.stars" class="mb-2" />
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
