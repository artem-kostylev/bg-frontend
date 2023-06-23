import { http } from '@/app/lib';

export type getOrdersForSupportResponse = {
    data: {
        order_id: number;
        order_number: number;
        created_at: string;
        label: string;
    }[];
};

export type getSupportListResponse = {
    data: {
        id: number;
        created_at: string;
        order_id: number;
        order_number: number;
        status: number;
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: {
                next: string;
            };
        };
    };
};

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

export type getAppealResponse = {
    data: {
        support_id: number;
        order_id: number;
        order_number: number;
        status: number;
        type: string;
        messages: {
            id: number;
            sender: string;
            text: string;
            type: number;
            created_at: string;
        }[];
    };
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: {
                next: string;
            };
        };
    };
};

export const getOrdersForSupport = async (text: string) => {
    const response = await http<getOrdersForSupportResponse>(`user/support/orders?search=${text}`);
    return response.data;
};

export const getSupportList = async (page: number) => {
    return await http<getSupportListResponse>(`user/support/list?page=${page}`);
};

export const addAppeal = async (body: addAppealPayload) => {
    const response = await http<addAppealResponse>('user/support/post', { body, method: 'post' });
    return response.data;
};

export const getAppeal = async (appeal_id: string, page: number) => {
    return await http<getAppealResponse>(`user/support/chat/${appeal_id}?page=${page}`);
};
