<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';
import type { Image as ImageType } from '@/app/types';
import { Image } from '@ui/components';

type Props = {
    type?: 'regions' | 'attractions' | 'activities';
    to: RouteLocationNamedRaw;
    title: string;
    image?: ImageType;
};

defineProps<Props>();
</script>

<template>
    <div class="w-full">
        <div class="relative">
            <NuxtLink :to="to" class="w-full">
                <Image
                    :src="image ? image.url : undefined"
                    :class="[
                        'object-cover object-center rounded-xl w-full h-64',
                        (type === 'regions' || type === 'attractions') && 'lg:h-44',
                    ]"
                />
            </NuxtLink>
        </div>
        <NuxtLink :to="to">
            <h3 class="text-lg hover:text-primary-500 mt-2.5">{{ title }}</h3>
        </NuxtLink>
    </div>
</template>
