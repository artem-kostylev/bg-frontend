<script setup lang="ts">
import { useLazyAsyncData } from '#imports';
import { useParams } from '@/app/composables';
import { fetchPage } from '@/pages/services';
import { Page } from '@/app/components';
import { Spin } from '@ui/components';

const params = useParams<{ slug: string }>();

const { data, pending } = useLazyAsyncData('page', () => fetchPage(params.value.slug));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin v-if="pending" color="primary" />
        <div v-else-if="data" class="prose max-w-none">
            <h1>{{ data.data.title }}</h1>
            <div v-html="data.data.context" />
        </div>
    </Page>
</template>
