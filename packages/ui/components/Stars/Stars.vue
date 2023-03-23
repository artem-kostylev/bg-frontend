<script setup lang="ts">
import { StarIcon } from "@ui/icons";

type Props = {
    stars: number;
};

defineProps<Props>();
</script>

<template>
    <div class="flex">
        <StarIcon v-for="num in stars" :key="num" class="text-yellow-400" />
    </div>
</template>
