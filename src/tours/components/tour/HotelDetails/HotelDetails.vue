<script setup lang="ts">
import type { Hotel } from "@/tours/types";
import { DetailsHeader } from "@/app/components";

type Props = {
    hotel: Hotel;
};

defineProps<Props>();
</script>

<template>
    <DetailsHeader :entity="hotel" />
</template>
