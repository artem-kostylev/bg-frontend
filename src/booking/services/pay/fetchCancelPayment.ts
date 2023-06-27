import { http } from '@/app/lib';

export const fetchCancelPayment = async (order_id: number) => {
    return http('order/payment_cancel', {
        method: 'POST',
        body: { order_id },
    });
};
