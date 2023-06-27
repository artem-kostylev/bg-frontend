import { http } from '@/app/lib';
import type { QuestionnaryForm } from '@/booking/types';

export type CreateOrderPayload = {
    client: {
        label: string;
        tour_id: string;
        form: Partial<QuestionnaryForm>;
    };
    groups: {
        tour_id: string;
        tourists: Partial<QuestionnaryForm>[];
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
    createOrderDTO: null;
    order_id: number;
    price: number;
    status: string;
};

// TODO
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (body: CreateOrderPayload) => {
    return await http<CreateOrderResponse>('tour/create_order', {
        body,
        method: 'post',
    });
};
