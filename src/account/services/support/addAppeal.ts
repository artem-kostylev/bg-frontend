import { http } from '@/app/lib';

export type addAppealPayload = {
    order_id: number;
    text: string;
    support_id?: number;
    type?: number;
};

export type addAppealResponse = {
    data: {
        id: number;
        order_id: number;
        text: string;
        support_id: number;
    };
};

export const addAppeal = async (body: addAppealPayload) => {
    const response = await http<addAppealResponse>('user/support/post', { body, method: 'post' });
    return response.data;
};
