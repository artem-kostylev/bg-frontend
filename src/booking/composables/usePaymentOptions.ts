import { computed, type ComputedRef } from 'vue';
import type { FetchOrderDetailResponse } from '@/booking/services';
import type {
    OrderPaymentOption,
    PrepaymentDetail,
    PaymentProcedureOptions,
} from '@/booking/types';

export function usePaymentOptions({
    order,
    includedPaid,
}: {
    order: ComputedRef<FetchOrderDetailResponse>;
    includedPaid?: boolean;
}) {
    const paymentOptionsAsc = computed(() => {
        return Object.entries(order.value.general.payment_options)
            .map(([key, value]: [string, OrderPaymentOption]) => ({ key, ...value }))
            .sort((a, b) => a.percent - b.percent);
    });

    const minPayment = computed(() => {
        return paymentOptionsAsc.value[0];
    });

    const paymentOptions = computed(() => {
        // if order is not paid, return only sorted paymentOptions
        if (order.value.payment_detail.prepaymentStatus.money === 'notPayed') {
            return paymentOptionsAsc.value.map(item => ({
                ...item,
                label: 'от стоимости тура',
                important: item.percent < 100 ? true : false,
                status: 'not_paid',
            })) as PaymentProcedureOptions;
        }

        const {
            prepaymentStatus: { defermentInDaysDeadline, money },
            ...rest
        } = order.value.payment_detail;

        // convert payment_detail to a format for displaying in cards
        const paymentDetail: PaymentProcedureOptions = Object.entries(rest).map(
            ([option, { amount, percent }]: [string, { amount: number; percent: number }]) => ({
                option: option as keyof PrepaymentDetail,
                paymentAmount: amount,
                percent,
                key: option.includes('ToFullCost') ? 'full' : minPayment.value.key,
                label:
                    defermentInDaysDeadline === 'before' && option.includes('ToMinimal')
                        ? 'от суммы минимальной предоплаты'
                        : 'от стоимости тура',
                important:
                    percent < 100 &&
                    defermentInDaysDeadline === 'before' &&
                    (option === 'mustPayedToMinimal' ||
                        (option === 'mustPayedToFullCost' && money === 'moreOrEqualThanMinimal')),
                status: option.includes('must') ? 'not_paid' : 'paid',
            })
        );

        const hasPayedToMinimal = paymentDetail.some(item => item.option === 'payedToMinimal');

        const result = paymentDetail
            .filter(item => {
                // remove unnecessary items from the paymentOptions
                return (defermentInDaysDeadline === 'after' &&
                    item.option?.includes('ToMinimal')) ||
                    (!includedPaid && item.status === 'paid') ||
                    (defermentInDaysDeadline === 'before' &&
                        hasPayedToMinimal &&
                        item.option === 'payedToFullCost')
                    ? false
                    : true;
            })
            .sort((a, b) =>
                // sorting: at the beginning with the status paid and ToMinimal
                a.status === 'paid' && b.status !== 'paid'
                    ? -1
                    : a.status !== 'paid' && b.status === 'paid'
                    ? 1
                    : a.option?.includes('ToMinimal') && !b.option?.includes('ToMinimal')
                    ? -1
                    : !a.option?.includes('ToMinimal') && b.option?.includes('ToMinimal')
                    ? 1
                    : 0
            );

        return result;
    });

    return {
        paymentOptionsAsc,
        minPayment,
        paymentOptions,
    };
}
