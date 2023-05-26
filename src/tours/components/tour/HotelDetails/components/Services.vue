<script setup lang="ts">
import type { HotelServices } from '@/tours/types';

type Props = {
    services?: HotelServices;
};

defineProps<Props>();
</script>

<template>
    <div>{{ services }}</div>
</template>
