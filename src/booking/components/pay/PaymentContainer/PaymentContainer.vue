<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from '#imports';
import { useIntervalFn, watchOnce } from '@vueuse/core';
import {
    fetchPaymentStatus,
    fetchCancelPayment,
    type FetchPaymentStatusResponse,
    type FetchOrderDetailResponse,
} from '@/booking/services';
import type { PayQuery, Transaction } from '@/booking/types';
import { Modal, Typography, Image } from '@ui/components';
import { Payment } from '@/booking/components';
// import { useMessage } from '@ui/composables';

type Props = {
    query: PayQuery;
    order: FetchOrderDetailResponse;
    paymentStatus: FetchPaymentStatusResponse;
    ticket: number | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'refresh-payment-status'): void;
    (e: 'update-payment-status', value: FetchPaymentStatusResponse): void;
    (e: 'update-ticket', value: number): void;
}>();

const showQrCode = ref(false);

const router = useRouter();
// const message = useMessage();

type PaymentStatusError = {
    errors: { order_id?: string[] };
    message: string;
};

// QR code payment processing
const { pause, resume } = useIntervalFn(
    async () => {
        try {
            pause();

            const response = await fetchPaymentStatus(props.query.order_id);
            emit('update-payment-status', response);

            const data = response.items.find((t: Transaction) => t.ticket === props.ticket);

            if (data?.status === 'ok') {
                router.push({
                    name: 'account-orders-id',
                    params: { id: props.query.order_id },
                    query: { status: 'success' },
                });

                showQrCode.value = false;

                return;
            }

            if (data?.status === 'failed') {
                showQrCode.value = false;
            }

            resume();
        } catch (e) {
            const err = e as PaymentStatusError;
            console.log(err.message);
            // message.danger(err.message);
            showQrCode.value = false;
        }
    },
    3000,
    { immediate: false }
);

watch(showQrCode, value => (value ? resume() : pause()));

const STATUSES_TO_PAY: string[] = [
    'Подбор тура',
    'Рассматривается оператором',
    'Принята на бронирование',
    'Лист ожидания',
    'Подтверждено',
];

// TODO: Перенести на бэк как order_can_been_paid
const paymentIsAvailable = computed(() => {
    return (
        props.order &&
        STATUSES_TO_PAY.includes(props.order.general.order_status) &&
        props.paymentStatus.status !== 'fully_paid'
    );
});

// cancel created and unpaid transactions
watchOnce(
    () => props.paymentStatus,
    async value => {
        if (!value) return;

        const hasItemWithStatusCreated = value.items.some(
            (item: Transaction) => item.status === 'created'
        );

        if (hasItemWithStatusCreated) {
            try {
                await fetchCancelPayment(props.query.order_id);
                emit('refresh-payment-status');
            } catch (e) {
                const err = e as PaymentStatusError;
                console.log(err.message);
                // message.danger(err.message);
            }
        }

        // redirect if the order can't be paid
        if (!paymentIsAvailable.value) {
            router.push({
                name: 'account-orders-id',
                params: { id: props.query.order_id },
                query: { status: 'success' },
            });
        }
    },
    { immediate: true }
);

const qrcode = ref('');

const updateQrData = (newData: { qr: string; ticket: number; showQrCode: boolean }) => {
    qrcode.value = newData.qr;
    showQrCode.value = newData.showQrCode;
    emit('update-ticket', newData.ticket);
};
</script>

<template>
    <div>
        <Payment
            :order="order"
            :paid-amount="paymentStatus.total || 0"
            :query="query"
            :btn-disabled="paymentStatus.need_pay === 0"
            @update-qr-data="updateQrData"
        />
        <Modal v-model="showQrCode" title="Оплата по QR-коду" size="sm">
            <div class="flex flex-col items-center justify-center">
                <Image :src="`data:image/png;base64,${qrcode}`" />
                <Typography>Отсканируйте камерой телефона QR-код и перейдите по ссылке.</Typography>
            </div>
        </Modal>
    </div>
</template>
