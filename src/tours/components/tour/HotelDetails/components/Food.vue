<script setup lang="ts">
import type { HotelFood } from '@/tours/types';

type Props = {
    food?: HotelFood;
};

defineProps<Props>();
</script>

<template>
    <div>{{ food }}</div>
</template>
