<script setup lang="ts">
import { useLazyAsyncData, useHead, definePageMeta } from "#imports";
import { fetchAccount } from "@/account/services";

definePageMeta({
    middleware: "auth",
});

const { data, pending } = useLazyAsyncData("account", () => fetchAccount());

useHead({
    title: "Персональная информация",
});
</script>

<template>
    <div>
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </div>
</template>
