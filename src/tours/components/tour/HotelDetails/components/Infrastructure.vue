<script setup lang="ts">
import type { HotelInfrastructure } from '@/tours/types';

type Props = {
    infrastructure?: HotelInfrastructure;
};

defineProps<Props>();
</script>

<template>
    <div>{{ infrastructure }}</div>
</template>
