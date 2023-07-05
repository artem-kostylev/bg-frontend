<script setup lang="ts">
import { Filters } from '@/app/components';
import { useRoute } from 'vue-router';
import { Navigation } from '@/app/components';

const route = useRoute();
</script>

<template>
    <main class="flex-1 flex flex-col">
        <Filters v-if="route.meta.filters" />
        <Navigation v-if="route.meta.navigation" />
        <slot />
    </main>
</template>
