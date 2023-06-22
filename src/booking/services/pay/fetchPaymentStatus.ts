import { http } from '@/app/lib';
import type { Transaction } from '@/booking/types';

export type FetchPaymentStatusResponse = {
    status: 'fully_paid' | 'partially_paid' | 'not_paid';
    need_pay: number;
    total: number;
    items: Transaction[];
    minimalPaymentIsWrong: boolean;
};

export const fetchPaymentStatus = async (order_id: number) => {
    return http<FetchPaymentStatusResponse>('order/payment_status', {
        method: 'POST',
        body: { order_id },
    });
};
