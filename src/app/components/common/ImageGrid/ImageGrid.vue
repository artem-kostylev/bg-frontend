<script setup lang="ts">
import type { Image as IImage } from '@/app/types';
import { Image } from '@ui/components';

type Props = {
    images: IImage[];
    alt: string;
};

defineProps<Props>();
</script>

<template>
    <div
        class="grid md:grid-rows-2 md:!grid-cols-4 gap-2 rounded-xl overflow-x-scroll md:overflow-hidden snap-x snap-mandatory scrollbar-hidden relative h-80 md:h-[28rem]"
        :style="`grid-template-columns: repeat(${images.length}, 100%);`"
    >
        <div
            v-for="(image, index) in images"
            :key="index"
            :class="[
                'bg-secondary-100 snap-center shrink-0',
                index === 0 && 'md:row-span-2 md:col-span-2',
                images.length === 1 && index === 0 && 'md:row-span-4 md:col-span-4',
                images.length === 2 && index === 1 && 'md:row-span-2 md:col-span-2',
                images.length === 3 && (index === 1 || index === 2) && 'md:row-span-2',
                images.length === 4 && index === 3 && 'md:col-span-2',
                images.length > 4 && index > 4 && 'md:hidden',
            ]"
        >
            <Image
                :src="image.url"
                :alt="`${alt} - ${index + 1}`"
                class="w-full h-full object-cover"
            />
        </div>
    </div>
</template>
