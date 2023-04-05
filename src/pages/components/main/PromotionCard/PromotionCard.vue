<script setup lang="ts">
import type { SectionChild } from "@/pages/types";
import { Image } from "@ui/components";

type Props = {
    child: SectionChild;
};

defineProps<Props>();
</script>

<template>
    <div class="max-h-56 relative rounded-2xl overflow-hidden">
        <Image :src="child.images[0].url" :alt="child.name" class="w-full h-full object-cover" />
    </div>
</template>
