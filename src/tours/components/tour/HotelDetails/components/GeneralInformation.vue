<script setup lang="ts">
import type { HotelGeneral } from '@/tours/types';

type Props = {
    general?: HotelGeneral;
};

defineProps<Props>();
</script>

<template>
    <div>{{ general }}</div>
</template>
