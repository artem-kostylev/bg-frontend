<script setup lang="ts">
import { definePageMeta } from '#imports';
import { Page } from '@/app/components';

definePageMeta({
    middleware: 'auth',
});

const meta = {
    title: 'Мои поездки',
    description: 'Описание страницы Мои поездки',
};
</script>

<template>
    <Page :meta="meta"> </Page>
</template>
