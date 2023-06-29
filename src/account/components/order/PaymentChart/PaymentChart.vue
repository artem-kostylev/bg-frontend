<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { formatCurrency } from '@/app/lib';
import type { OrderPaymentChart } from '@/account/types';

type Props = OrderPaymentChart;

defineProps<Props>();

const paidAmountWidth = ref(0);
const minPriceAmountWidth = ref(0);

const paidAmountEl = ref<HTMLElement>();
const minPriceAmountEl = ref<HTMLElement>();

onMounted(async () => {
    paidAmountWidth.value = paidAmountEl.value?.offsetWidth ?? 0;
    minPriceAmountWidth.value = minPriceAmountEl.value?.offsetWidth ?? 0;
});
</script>

<template>
    <div class="flex relative w-full h-[27px] rounded-[10px]">
        <div
            :class="[
                'absolute h-[25px] rounded-l-lg rounded-r-lg',
                amounts.paid && amounts.paid.amount >= amounts.minPrice.amount
                    ? 'bg-warning-600'
                    : 'bg-white border border-solid border-secondary-300',
            ]"
            :style="{ width: amounts.totalPrice.percent + '%' }"
        ></div>
        <div
            v-if="amounts.paid"
            class="absolute h-[25px] rounded-l-lg bg-[#B5DFB4] z-10"
            :style="{ width: (amounts.paid.percent || 1) + '%' }"
        ></div>
        <div
            v-if="amounts.paid"
            class="absolute h-0 w-0 top-[25px] border-x-5 border-l-transparent border-r-transparent border-b-10 border-b-success-600"
            :style="{ left: `calc(${amounts.paid.percent || 1}% - 5px)` }"
        ></div>
        <div
            v-if="amounts.paid"
            ref="paidAmountEl"
            class="absolute top-10 text-md text-success-600"
            :style="{
                left: `calc(${amounts.paid.percent || 1}% - ${
                    amounts.paid.percent < 5 ? 5 : 0.5 * paidAmountWidth
                }px)`,
            }"
        >
            {{ formatCurrency(amounts.paid.amount, true) }}
        </div>
        <div
            class="absolute h-[25px] rounded-l-lg bg-warning-600 z-0"
            :class="paymentOptionsLength === 1 && 'rounded-r-lg'"
            :style="{ width: amounts.minPrice.percent + '%' }"
        ></div>
        <div
            v-if="amounts.paid && amounts.paid.amount < amounts.minPrice.amount"
            class="absolute transform rotate-180 h-0 w-0 top-[-10px] border-x-5 border-l-transparent border-r-transparent border-b-10 border-b-danger-500"
            :style="{ left: `calc(${amounts.minPrice.percent}% - 5px)` }"
        ></div>
        <div
            v-if="amounts.paid && amounts.paid.amount < amounts.minPrice.amount"
            ref="minPriceAmountEl"
            class="absolute -top-[35px] text-md text-danger-500"
            :style="[
                amounts.minPrice.percent < 95
                    ? `left: calc(${amounts.minPrice.percent}% - ${0.5 * minPriceAmountWidth}px)`
                    : 'right: 0',
            ]"
        >
            {{ formatCurrency(amounts.minPrice.amount, true) }}
        </div>
        <div
            v-if="paymentOptionsLength > 1"
            :class="[
                'absolute -top-[35px] text-md right-0',
                amounts.paid && amounts.paid.amount >= amounts.minPrice.amount
                    ? 'text-danger-500'
                    : 'text-secondary-500',
            ]"
        >
            {{ formatCurrency(amounts.totalPrice.amount, true) }}
        </div>
    </div>
</template>
