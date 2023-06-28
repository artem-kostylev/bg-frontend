<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import { Card, Grid, Button } from '@ui/components';
import { SmallArrowIcon } from '@ui/icons';
import type { FetchOrderDetailResponse } from '@/booking/services';
import type { Movement, Transfer } from '@/booking/types';
import { OrderGeneral, OrderItem, OrderAccommodations } from './components';
import { OrderActions } from '@/account/components';
import { AirplaneIcon as PlaneIcon, BusIcon, ShieldIcon, PyramidIcon } from '@ui/icons';

type Props = {
    order: FetchOrderDetailResponse;
    currentTab: 'active' | 'past';
};

const props = defineProps<Props>();

const NuxtLink = resolveComponent('NuxtLink');

const movementsLabel = computed(() => {
    if (!props.order.movements?.length) return '';

    return props.order.movements[0].is_regular === 'virtual'
        ? 'Рейс не конкретизирован'
        : props.order.movements.map((item: Movement) => item.direction).join(', ');
});

const transfersLabel = computed(() => {
    if (!props.order.transfers?.length) return '';

    return `Трансфер: ${props.order.transfers.map((item: Transfer) => item.route).join(', ')}`;
});
</script>

<template>
    <Card>
        <Grid gap="4">
            <OrderGeneral :general="order.general" />
            <OrderAccommodations
                :general="order.general"
                :accommodations="order.accommodations"
                :current-tab="currentTab"
            />
            <OrderItem v-if="order.movements?.length" :icon="PlaneIcon" :label="movementsLabel" />
            <OrderItem v-if="order.transfers?.length" :icon="BusIcon" :label="transfersLabel" />
            <OrderItem v-if="order.insurances?.length" :icon="ShieldIcon" label="Страховка" />
            <OrderItem v-if="order.activities?.length" :icon="PyramidIcon" label="Экскурсия" />
            <div>
                <Button
                    :as="NuxtLink"
                    :to="{
                        name: 'account-orders-id',
                        params: { id: order.general.order_id },
                        query: $route.query,
                    }"
                    variant="ghost"
                    :end-icon="SmallArrowIcon"
                    icon-class="w-3 transform -rotate-90"
                >
                    Подробнее
                </Button>
            </div>
            <OrderActions :general="order.general" />
        </Grid>
    </Card>
</template>
