<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from "#imports";
import { fetchDocuments } from "@/account/services";
import { Page } from "@/app/components";

definePageMeta({
    middleware: "auth",
});

const { data, pending } = useLazyAsyncData("account-documents", () => fetchDocuments());

const meta = {
    title: "Документы туристов",
    description: "Описание страницы",
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </Page>
</template>
