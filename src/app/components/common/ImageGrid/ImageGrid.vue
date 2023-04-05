<script setup lang="ts">
import type { Image as IImage } from "@/app/types";
import { Image } from "@ui/components";

type Props = {
    images: IImage[];
    alt: string;
};

defineProps<Props>();
</script>

<template>
    <div class="grid md:grid-rows-2 grid-cols-4 gap-2 max-h-[430px] rounded-xl overflow-hidden">
        <Image
            v-for="(image, index) in images"
            :key="index"
            :src="image.url"
            :alt="`${alt} - ${index + 1}`"
            width="626"
            height="470"
            :class="[
                'w-full h-full object-cover',
                index === 0 && 'row-span-2 col-span-2',
                images.length === 1 && index === 0 && 'row-span-4 col-span-4',
                images.length === 2 && index === 1 && 'row-span-2 col-span-2',
                images.length === 3 && (index === 1 || index === 2) && 'row-span-2',
                images.length === 4 && index === 3 && 'col-span-2',
                images.length > 4 && index > 4 && 'md:hidden',
            ]"
        />
    </div>
</template>
