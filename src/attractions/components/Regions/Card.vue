<script setup lang="ts">
import { Image } from '@ui/components';
import type { LocationQueryRaw } from 'vue-router';

type Region = {
    id: number;
    title: string;
    image: { url: string };
};

type Props = {
    region: Region;
};

defineProps<Props>();
</script>

<template>
    <div class="w-full">
        <div class="relative">
            <NuxtLink
                :to="{ name: 'locations-id', params: { id: region.id }, query: $route.query as LocationQueryRaw }"
                class="w-full"
            >
                <Image
                    :src="region.image.url"
                    class="object-cover object-center rounded-xl w-full h-64 lg:h-45"
                />
            </NuxtLink>
        </div>
        <NuxtLink
            :to="{ name: 'locations-id', params: { id: region.id }, query: $route.query as LocationQueryRaw }"
        >
            <h3 class="mt-2">{{ region.title }}</h3>
        </NuxtLink>
    </div>
</template>
