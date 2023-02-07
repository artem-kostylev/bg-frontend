<script setup lang="ts">
import { useLazyAsyncData, useHead } from "#imports";
import { useParams } from "@/app/composables";
import { fetchPage } from "@/page/services";

const params = useParams<{ slug: string }>();

const { data, pending } = useLazyAsyncData("page", () => fetchPage(params.value.slug));

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
