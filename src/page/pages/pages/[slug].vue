<script setup lang="ts">
import { useLazyAsyncData, useRoute, computed, useHead } from "#imports";
import { fetchPage } from "@/page/services";

const route = useRoute();

const slug = computed(() => route.params.slug as string);

const { data, pending } = useLazyAsyncData("page", () => fetchPage(slug.value));

useHead({
    title: data.value?.meta.title,
    meta: [
        {
            name: "description",
            content: data.value?.meta.description,
        },
    ],
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </div>
</template>
