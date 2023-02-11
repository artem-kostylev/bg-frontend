<script setup lang="ts">
import { useLazyAsyncData } from "#imports";
import { useParams } from "@/app/composables";
import { fetchPage } from "@/page/services";
import { Page } from "@/app/components";

const params = useParams<{ slug: string }>();

const { data, pending } = useLazyAsyncData("page", () => fetchPage(params.value.slug));

/**
 * Для того что бы донастроить стили есть инструкция в документации к плагину tailwindcss/typography
 * https://tailwindcss.com/docs/typography-plugin
 */
</script>

<template>
    <Page :meta="data?.meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data" class="prose max-w-none">
            <h1>{{ data.data.title }}</h1>
            <div v-html="data.data.context" />
        </div>
    </Page>
</template>
