<script setup lang="ts">
import { useNuxtData } from '#imports';
import { Grid, Spin, Alert } from '@ui/components';
import { SearchIcon } from '@ui/icons';
import type { FetchOrdersResponse } from '@/account/services';
import { useInfinity } from '@/app/composables';
import { fetchOrders } from '@/account/services';
import { OrderCard } from '@/account/components';

type Props = {
    currentTab: 'active' | 'past';
    page: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'increment-page'): void;
}>();

const { data } = useNuxtData<FetchOrdersResponse>('orders');

const { targetRef, loadingMore } = useInfinity(async () => {
    emit('increment-page');
    const response = await fetchOrders({ status: props.currentTab, page: props.page });
    data.value!.has_next = response.has_next;
    data.value!.orders.push(...response.orders);
});

// TODO: Добавить блок "рекомендуемые туры"
</script>

<template>
    <div>
        <div v-if="data?.orders.length">
            <Grid cols="2" gap="5">
                <OrderCard
                    v-for="order in data.orders"
                    :key="order.general.order_id"
                    :order="order"
                    :current-tab="currentTab"
                />
            </Grid>
            <template v-if="data.has_next">
                <Spin v-if="loadingMore" color="primary" class="my-12" />
                <div v-else ref="targetRef"></div>
            </template>
        </div>
        <div v-else>
            <Alert
                variant="info"
                :title="`У вас пока нет ${
                    currentTab === 'active' ? 'активных' : 'завершенных'
                } поездок`"
                text="Выберите место для первого путешествия с нами"
                :start-icon="SearchIcon"
            />
        </div>
    </div>
</template>
