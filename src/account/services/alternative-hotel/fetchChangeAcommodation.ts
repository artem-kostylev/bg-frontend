import { http } from '@/app/lib';

export type FetchChangeAcommodationPayload = {
    order_id: number;
    groups: {
        tour_id: number;
        group_id: number;
    }[];
};

export const fetchChangeAcommodation = async (payload: FetchChangeAcommodationPayload) => {
    await http('order/change_accommodation', {
        method: 'POST',
        body: payload,
    });
};
