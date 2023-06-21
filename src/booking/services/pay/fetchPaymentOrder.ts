import { http } from '@/app/lib';

export type FetchPaymentOrderPayload = {
    order_id: number;
    amount: number;
    type: 'url' | 'qr';
};

export type FetchPaymentOrderResponse = {
    ticket: number;
    url: string;
    qr: string;
};

export const fetchPaymentOrder = async (payload: FetchPaymentOrderPayload) => {
    return await http<FetchPaymentOrderResponse>('order/payment_order', {
        method: 'POST',
        body: payload,
    });
};
