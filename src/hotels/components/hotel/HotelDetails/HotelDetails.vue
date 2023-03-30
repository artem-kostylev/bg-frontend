<script setup lang="ts">
import type { Hotel } from "@/hotels/types";
import { Stars, Typography } from "@ui/components";
import { ImageGrid } from "@/app/components";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();
</script>

<template>
    <div>
        <Stars :stars="hotel.stars" class="mb-2" />
        <Typography variant="h1" as="h1">{{ hotel.name }}</Typography>
        <ImageGrid :images="hotel.images" :alt="hotel.name" />
    </div>
</template>
