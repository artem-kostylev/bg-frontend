<script setup lang="ts">
import { Typography } from '@ui/components';
import type { OrderDetailGeneral } from '@/booking/types';
import { formatCurrency } from '@/app/lib';

type Props = {
    general: OrderDetailGeneral;
    status: 'fully_paid' | 'partially_paid' | 'not_paid';
};

defineProps<Props>();

const STATUSES = {
    not_paid: 'не оплачено',
    partially_paid: 'недоплачено',
    fully_paid: 'оплачено',
};
</script>

<template>
    <div>
        <div class="flex items-center flex-wrap">
            <Typography as="h1" variant="h1">Заказ №{{ general.order_number }}&#160;</Typography>
            <span class="text-2xl tracking-tight">({{ general.order_status }})</span>
        </div>
        <div class="mt-4 text-xl">
            Стоимость тура –
            <span class="font-bold">{{ formatCurrency(general.total_price, true) }}</span>
            (<span :class="[status === 'fully_paid' ? 'text-success-500' : 'text-danger-500']">
                {{ STATUSES[status] }}</span
            >)
        </div>
    </div>
</template>
