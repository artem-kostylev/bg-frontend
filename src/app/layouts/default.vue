<script setup lang="ts">
import { Filters } from '@/app/components';
import { useRoute } from 'vue-router';
import { Navigation } from '@/app/components';

const route = useRoute();
</script>

<template>
    <main class="flex-1 flex flex-col">
        <Navigation v-if="route.meta.navigation" class="mt-5" />
        <Filters v-if="route.meta.filters" />
        <slot />
    </main>
</template>
