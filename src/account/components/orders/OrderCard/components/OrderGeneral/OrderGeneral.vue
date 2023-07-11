<script setup lang="ts">
import { computed } from 'vue';
import { CalendarIcon, UsersIcon } from '@ui/icons';
import type { OrderDetailGeneral } from '@/booking/types';
import { formatCurrency } from '@/app/lib';
import { formatDate, pluralize } from '@/app/lib';

type Props = {
    general: OrderDetailGeneral;
};

const props = defineProps<Props>();

const duration = computed(() => pluralize(props.general.duration, ['ночь', 'ночи', 'ночей']));

const dates = computed(() => {
    return `${formatDate(props.general.date_start, 'DD.MM')} - ${formatDate(
        props.general.date_finish,
        'DD.MM.YYYY'
    )}`;
});
</script>

<template>
    <NuxtLink
        :to="{
            name: 'account-orders-id',
            params: { id: general.order_id },
            query: $route.query,
        }"
        ><div class="font-bold">
            Заказ № {{ general.order_number }} ({{ general.order_status }})
        </div></NuxtLink
    >
    <div>
        Стоимость тура –
        <span class="font-bold">{{ formatCurrency(general.total_price, true) }}</span>
    </div>
    <div class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <CalendarIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>{{ dates }} ({{ duration }})</div>
    </div>
    <div class="flex space-x-2 items-center">
        <div class="rounded-md bg-secondary-200 p-1">
            <UsersIcon width="1.2em" height="1.2em" class="shrink-0" />
        </div>
        <div>
            {{ pluralize(general.qty_tourists, ['турист', 'туриста', 'туристов']) }}
        </div>
    </div>
</template>
