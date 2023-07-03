<script setup lang="ts">
import { definePageMeta, useLazyAsyncData } from '#imports';
import { Page } from '@/app/components';
import { useName } from '@/app/composables';
import { fetchSections } from '@/pages/services';
import { SectionList } from '@/pages/components';
import { Spin } from '@ui/components';

definePageMeta({ filters: true });

const name = useName<'index' | 'tours' | 'hotels'>();

const { data, pending } = useLazyAsyncData('index-page', () => fetchSections(name.value));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <SectionList class="grid gap-8" v-else-if="data" :sections="data.sections" />
    </Page>
</template>
