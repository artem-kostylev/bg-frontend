<script setup lang="ts">
import { useLazyAsyncData, definePageMeta } from '#imports';
import { fetchAccount } from '@/account/services';
import { Page } from '@/app/components';

definePageMeta({
    middleware: 'auth',
});

const { data, pending } = useLazyAsyncData('account', () => fetchAccount());

const meta = {
    title: 'Персональная информация',
    description: 'Описание страницы',
};
</script>

<template>
    <Page :meta="meta">
        <div v-if="pending">loading...</div>
        <div v-else-if="data">{{ data }}</div>
    </Page>
</template>
