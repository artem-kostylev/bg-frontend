<script setup lang="ts">
import { Filters } from "@/app/components";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <main class="flex-1 flex flex-col">
        <Filters v-if="route.meta.filters" />
        <slot />
    </main>
</template>
