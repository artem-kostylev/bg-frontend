<script setup lang="ts">
import type { Hotel } from "@/hotels/types";
import { Typography } from "@ui/components";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();
</script>

<template>
    <Typography variant="h1" as="h1">{{ hotel.name }}</Typography>
</template>
