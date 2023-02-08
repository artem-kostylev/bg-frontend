<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { fetchPage } from "@/page/services";
import { Page } from "@/app/components";

const params = useParams<{ slug: string }>();

const { data, pending } = useLazyAsyncData("page", () => fetchPage(params.value.slug));
</script>

<template>
    <Page :meta="data?.meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </Page>
</template>
