<script setup lang="ts">
import { useLazyAsyncData, useHead, definePageMeta } from "#imports";
import { fetchDocuments } from "@/account/services";

definePageMeta({
    middleware: "auth",
});

const { data, pending } = useLazyAsyncData("account-documents", () => fetchDocuments());

useHead({
    title: "Документы туристов",
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </div>
</template>
