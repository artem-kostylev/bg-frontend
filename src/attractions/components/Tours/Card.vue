<script setup lang="ts">
import { Image } from '@ui/components';
import { formatFilters } from '@/app/lib';
import type { LocationQueryRaw } from 'vue-router';

type Tour = {
    id: number;
    preset_name: '';
    preset_filters: Record<string, any>;
    image: { url: string };
    best_price: string;
};

type Props = {
    tour: Tour;
};

defineProps<Props>();
</script>

<template>
    <div class="w-full">
        <div class="relative">
            <NuxtLink
                :to="{ name: 'tours', query: formatFilters(tour.preset_filters) as LocationQueryRaw }"
                class="w-full"
            >
                <Image
                    v-if="tour.image"
                    :src="tour.image.url"
                    class="object-cover object-center rounded-xl w-full h-64"
                />
                <Image v-else class="object-cover object-center rounded-xl w-full h-64" />
            </NuxtLink>
        </div>
        <NuxtLink
            :to="{ name: 'tours', query: formatFilters(tour.preset_filters) as LocationQueryRaw }"
        >
            <h3 class="mt-2">{{ tour.preset_name }}</h3>
        </NuxtLink>
    </div>
</template>
