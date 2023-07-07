import { http } from '@/app/lib';

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

export const getAppeal = async (appeal_id: string, page: number) => {
    return await http<getAppealResponse>(`user/support/chat/${appeal_id}?page=${page}`);
};
