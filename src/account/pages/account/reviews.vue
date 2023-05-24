<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchDocuments } from '@/account/services';
import { Page } from '@/app/components';
import { Spin } from '@ui/components';

definePageMeta({
    middleware: 'auth',
});

const { data, pending } = useLazyAsyncData('account-reviews', () => fetchDocuments());

const meta = {
    title: 'Мои отзывы',
    description: 'Описание страницы',
};
</script>

<template>
    <Page :meta="meta">
        <Spin v-if="pending" />
        <div v-else-if="data">{{ data }}</div>
    </Page>
</template>
