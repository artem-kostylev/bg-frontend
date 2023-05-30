<script setup lang="ts">
import { Image } from '@ui/components';
import type { RouteLocationRaw } from 'vue-router';
import type { Image as TImage } from '@/app/types';
import { resolveComponent } from 'vue';

type Props = {
    to?: RouteLocationRaw;
    image: TImage;
    alt?: string;
};

defineProps<Props>();

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
    <component
        :is="to ? NuxtLink : 'div'"
        :to="to"
        class="w-full relative rounded-xl overflow-hidden bg-secondary-100"
    >
        <div class="relative h-56">
            <Image :src="image.url" :alt="alt" class="w-full h-full object-cover" />
        </div>
        <div
            class="inset-0 absolute bg-gradient-to-b from-transparent via-transparent to-secondary-900/90"
        ></div>
        <div class="absolute bottom-0 px-5 py-4">
            <slot />
        </div>
    </component>
</template>
