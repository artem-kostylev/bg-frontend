import { http } from '@/app/lib';

export type FetchWishesPayload = {
    order_accommodation_id: number;
    wishes: string[];
};

export const fetchWishes = async (payload: FetchWishesPayload) => {
    const response = await http('order/acc_wishes', {
        method: 'POST',
        body: payload,
    });

    return response;
};
