<script setup lang="ts">
import { computed } from "vue";
import { TourTypeChoose } from "@/tours/components";
import { useName } from "@/app/composables";

const name = useName<string>();

const canChooseTourType = computed(() => {
    return ["tours-search", "tours-activity-search", "tours-multi-search"].includes(name.value);
});
</script>

<template>
    <TourTypeChoose v-if="canChooseTourType" />
</template>
