<script setup lang="ts">
import { ref, watch } from 'vue';
import { definePageMeta, useLazyAsyncData } from '#imports';
import { Page } from '@/app/components';
import { Grid, Tabs, Spin, Typography } from '@ui/components';
import { fetchOrders } from '@/account/services';
import { OrdersContainer } from '@/account/components';

definePageMeta({
    middleware: 'auth',
});

const meta = {
    title: 'Мои поездки',
    description: 'Описание страницы Мои поездки',
};

const currentTab = ref<'active' | 'past'>('active');

const tabs = [
    {
        label: 'Активные',
        value: 'active',
    },
    {
        label: 'Прошедшие',
        value: 'past',
    },
];

const page = ref(1);

watch(currentTab, () => {
    pending.value = false;
    page.value = 1;
});

const { pending } = useLazyAsyncData(
    'orders',
    () => fetchOrders({ status: currentTab.value, page: page.value }),
    {
        server: false,
        watch: [currentTab],
    }
);
</script>

<template>
    <Page :meta="meta">
        <Grid gap="5">
            <Typography variant="h1" as="h1">Мои поездки</Typography>
            <Tabs v-model="currentTab" :tabs="tabs" />
            <Spin v-if="pending" color="primary" class="mt-5" />
            <OrdersContainer
                v-else
                :current-tab="currentTab"
                :page="page"
                @increment-page="++page"
            />
        </Grid>
    </Page>
</template>
