<script setup lang="ts">
import type { SectionChild } from '@/pages/types';
import { Image } from '@ui/components';

type Props = {
    child: SectionChild;
};

defineProps<Props>();
</script>

<template>
    <div class="h-56 relative rounded-xl overflow-hidden bg-secondary-100">
        <Image :src="child.images[0].url" :alt="child.name" class="w-full h-full object-cover" />
    </div>
</template>
