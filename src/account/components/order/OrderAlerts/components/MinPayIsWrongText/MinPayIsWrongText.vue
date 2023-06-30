<script setup lang="ts">
import { formatCurrency } from '@/app/lib';
import { useGoToPay } from '@/account/composables';

type Props = {
    minPayment: {
        percent: number;
        paymentAmount: number;
        paymentDefermentInDays: number;
        key: string;
    };
    mustPayedToMinimal: { amount: number; percent: number };
    orderId: number;
};

const props = defineProps<Props>();

const { pay } = useGoToPay({
    orderId: props.orderId,
});

// TODO: Добавить NuxtLink на условия договора
</script>

<template>
    <div class="text-black">
        <span>В соответствии с</span>
        <span class="text-primary-500 hover:text-primary-400 cursor-pointer">
            условиями Договора</span
        >
        <span
            >, минимальный размер предоплаты для принятия заказа в работу составляет
            {{ formatCurrency(minPayment.paymentAmount, true) }} ({{ minPayment.percent }}% от общей
            суммы тура).</span
        >
        <div>
            Для принятия и подтверждения заказа
            <span
                class="text-primary-500 hover:text-primary-400 cursor-pointer"
                @click="pay(minPayment.key)"
                >проведите доплату {{ formatCurrency(mustPayedToMinimal.amount, true) }}</span
            >
            до минимальной суммы предоплаты.
        </div>
    </div>
</template>
