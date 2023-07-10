<script setup lang="ts">
import { ImageLike, Carousel, CarouselItem, Image } from '@ui/components';
import type { RouteLocationNamedRaw } from 'vue-router';
import type { Image as TImage } from '@/app/types';

type Props = {
    images?: TImage[];
    url?: RouteLocationNamedRaw;
};

defineProps<Props>();
</script>

<template>
    <div>
        <div v-if="images?.length" class="relative">
            <Carousel class="flex md:rounded-t-lg w-full h-56 bg-secondary-100">
                <CarouselItem v-for="(image, i) in images" :key="i" class="w-full">
                    <NuxtLink :to="url" target="_blank" class="w-full">
                        <Image :src="image.url" class="object-cover w-full h-full" />
                    </NuxtLink>
                </CarouselItem>
            </Carousel>
            <div class="absolute top-4 right-4">
                <ImageLike />
            </div>
        </div>
        <div v-else class="relative">
            <div class="flex md:rounded-t-lg w-full h-56 bg-slate-100">
                <div class="w-full">
                    <NuxtLink :to="url" target="_blank" class="w-full">
                        <Image class="object-cover w-full h-full" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
