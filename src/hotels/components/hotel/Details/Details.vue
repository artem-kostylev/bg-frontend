<script setup lang="ts">
import { Hotel } from "@/hotels/types";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();
</script>

<template>
    <div>{{ hotel }}</div>
</template>
