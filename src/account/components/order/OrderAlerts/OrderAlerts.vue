<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from '#imports';
import type { FetchOrderDetailResponse } from '@/booking/services';
import { Alert } from '@ui/components';
import { HourglassIcon } from '@ui/icons';
import { PercentIcon } from './components';
import { formatCurrency } from '@/app/lib';
import { usePaymentOptions } from '@/booking/composables';
import { useAuthStore } from '@/auth/stores';

type Props = {
    order: FetchOrderDetailResponse;
    status?: 'success' | 'fail';
};

const props = defineProps<Props>();

const order = computed(() => {
    return props.order;
});

const paymentDetail = computed(() => {
    return order.value.payment_detail;
});

const errorType = computed(() => {
    const { prepaymentStatus } = paymentDetail.value;

    return prepaymentStatus.defermentInDaysDeadline === 'after'
        ? 'PayDeadlineExpired'
        : prepaymentStatus.money === 'lessThanMinimal'
        ? 'MinPayIsWrong'
        : undefined;
});

const { user } = useAuthStore();

const successMessage = computed(() => {
    return `Договор и информация по туру направлена на вашу почту — ${user?.email}. Со всей информацией по предстоящему туру можно ознакомиться в разделе Мои поездки в Личном кабинете.`;
});

const alertTitle = computed(() => {
    const { mustPayedToFullCost, payedToFullCost } = paymentDetail.value;
    const { value: error } = errorType;

    return error === 'PayDeadlineExpired' && mustPayedToFullCost
        ? `Истек срок оплаты оставшихся ${mustPayedToFullCost.percent}%`
        : error === 'MinPayIsWrong' && payedToFullCost
        ? `Вы оплатили ${formatCurrency(payedToFullCost.amount, true)} (${
              payedToFullCost.percent
          }% от общей суммы тура)`
        : '';
});

const startIcon = computed(() => {
    if (errorType.value === 'PayDeadlineExpired') {
        return HourglassIcon;
    } else {
        return PercentIcon;
    }
});

const { minPayment } = usePaymentOptions({
    order,
});

const router = useRouter();

const pay = (optionKey: string) => {
    router.push({
        name: 'booking-pay',
        query: { order_id: order.value.general.order_id, selected_option: optionKey },
    });
};

// TODO: Добавить NuxtLink на условия договора
</script>

<template>
    <Alert
        v-if="status === 'success'"
        variant="success"
        title="Оплата прошла успешно"
        :text="successMessage"
    />
    <Alert
        v-if="errorType"
        variant="error"
        :start-icon="startIcon"
        :icon-props="{ percent: minPayment.percent }"
    >
        <template #title>
            <span class="font-bold text-black">{{ alertTitle }}</span>
        </template>
        <template #text>
            <div class="text-black">
                <div v-if="errorType === 'PayDeadlineExpired' && paymentDetail.mustPayedToFullCost">
                    <span>В связи с тем, что сегодня истек срок оплаты остатка </span>
                    <span
                        >{{ formatCurrency(paymentDetail.mustPayedToFullCost.amount, true) }} ({{
                            paymentDetail.mustPayedToFullCost.percent
                        }}% от общей суммы тура)</span
                    >
                    <span>, а указанная сумма не была оплачена в срок, в соответствии с</span>
                    <span class="text-primary-500 hover:text-primary-400 cursor-pointer">
                        условиями Договора</span
                    >
                    <span
                        >, Заказ №{{ order.general.order_number }} будет аннулирован и проведен
                        возврат средств.</span
                    >
                </div>
                <div v-else-if="paymentDetail.mustPayedToMinimal">
                    <span>В соответствии с</span>
                    <span class="text-primary-500 hover:text-primary-400 cursor-pointer">
                        условиями Договора</span
                    >
                    <span
                        >, минимальный размер предоплаты для принятия заказа в работу составляет
                        {{ formatCurrency(minPayment.paymentAmount, true) }} ({{
                            minPayment.percent
                        }}% от общей суммы тура).</span
                    >
                    <div>
                        Для принятия и подтверждения заказа
                        <span
                            class="text-primary-500 hover:text-primary-400 cursor-pointer"
                            @click="pay(minPayment.key)"
                            >проведите доплату
                            {{
                                formatCurrency(paymentDetail.mustPayedToMinimal.amount, true)
                            }}</span
                        >
                        до минимальной суммы предоплаты.
                    </div>
                </div>
            </div>
        </template>
    </Alert>
</template>
