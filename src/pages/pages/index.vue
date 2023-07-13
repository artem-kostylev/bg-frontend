<script setup lang="ts">
import { definePageMeta, useLazyAsyncData } from '#imports';
import { Page, Empty } from '@/app/components';
import { useName } from '@/app/composables';
import { fetchSections } from '@/pages/services';
import { SectionList } from '@/pages/components';
import { Spin } from '@ui/components';

definePageMeta({ filters: true });

const name = useName<'index' | 'tours' | 'hotels'>();

const { data, pending, error } = useLazyAsyncData('index-page', () => fetchSections(name.value));
</script>

<template>
    <Page :meta="data?.meta">
        <Spin class="flex-1" v-if="pending" color="primary" />
        <Empty
            v-else-if="error"
            title="Что-то пошло не так"
            description="Ошибка получения данных, попробуйте повторить запрос позже"
        />
        <SectionList class="grid gap-8" v-else-if="data" :sections="data.sections" />
    </Page>
</template>
