import { http } from '@/app/lib';

type FetchOrderRefundPayload = {
    orderId: number;
    amount: number;
};

export const fetchOrderRefund = async (payload: FetchOrderRefundPayload) => {
    return http('order/refund', {
        method: 'POST',
        body: payload,
    });
};
