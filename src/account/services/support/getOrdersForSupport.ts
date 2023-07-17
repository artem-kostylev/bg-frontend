import { http } from '~/lib';

export type getOrdersForSupportResponse = {
    data: {
        order_id: number;
        order_number: number;
        created_at: string;
        label: string;
    }[];
};

export const getOrdersForSupport = async (text: string) => {
    const response = await http<getOrdersForSupportResponse>(`user/support/orders?search=${text}`);
    return response.data;
};
