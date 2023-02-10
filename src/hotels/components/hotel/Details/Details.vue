<script setup lang="ts">
import type { Hotel } from "@/hotels/types";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();
</script>

<template>
    <div>{{ hotel.name }}</div>
</template>
