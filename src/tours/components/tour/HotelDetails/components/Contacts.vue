<script setup lang="ts">
import type { HotelContacts } from '@/tours/types';

type Props = {
    contacts?: HotelContacts[];
};

defineProps<Props>();
</script>

<template>
    <div>{{ contacts }}</div>
</template>
