import { http } from '@/app/lib';

export type CreateOrderPayload = {
    order_id?: number;
    groups: {
        tour_id: string;
        tourists: {
            document_id: number;
            service_visa_id?: number;
            service_insurance_id: number;
        };
    }[];
    tickets?: {
        id: number;
        ticket: {
            price_type: string;
            qty: number;
        };
    }[];
    transfers?: {};
};

export type CreateOrderResponse = {
    order_id: number;
    price: number;
    status: 'created' | 'newprice' | 'exist' | 'errorBGO';
};

export const createOrder = async (body: CreateOrderPayload) => {
    return await http<CreateOrderResponse>(
        'tour/order/create' + (body.order_id ? '?confirm=1' : ''),
        {
            body,
            method: 'post',
            version: 2,
        }
    );
};
