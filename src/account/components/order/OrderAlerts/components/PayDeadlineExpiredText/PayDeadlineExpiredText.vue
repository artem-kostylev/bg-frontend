<script setup lang="ts">
import { formatCurrency } from '@/app/lib';

type Props = {
    mustPayedToFullCost: { amount: number; percent: number };
    orderNumber: number;
};

defineProps<Props>();

// TODO: Добавить NuxtLink на условия договора
</script>

<template>
    <div class="text-black">
        <span>В связи с тем, что сегодня истек срок оплаты остатка </span>
        <span
            >{{ formatCurrency(mustPayedToFullCost.amount, true) }} ({{
                mustPayedToFullCost.percent
            }}% от общей суммы тура)</span
        >
        <span>, а указанная сумма не была оплачена в срок, в соответствии с</span>
        <span class="text-primary-500 hover:text-primary-400 cursor-pointer">
            условиями Договора</span
        >
        <span>, Заказ №{{ orderNumber }} будет аннулирован и проведен возврат средств.</span>
    </div>
</template>
