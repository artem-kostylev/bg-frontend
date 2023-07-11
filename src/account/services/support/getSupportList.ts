import { http } from '@/app/lib';

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

export const getSupportList = async (page: number) => {
    return await http<getSupportListResponse>(`user/support/list?page=${page}`);
};
