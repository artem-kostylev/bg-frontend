import { http } from '@/app/lib';
import type { FetchOrderDetailResponse } from '@/booking/services';

type FetchOrdersPayload = {
    status: 'active' | 'past';
    page: number;
};

export type FetchOrdersResponse = {
    // TODO: возможно есть не все поля, что в FetchOrderDetailResponse
    orders: FetchOrderDetailResponse[];
    has_next: boolean;
    total: number;
};

export const fetchOrders = async (payload: FetchOrdersPayload) => {
    // TODO: Исправить это на бэке, привести к единому формату (пагинацию вынести из "meta")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, meta } = await http<any>('user/orders', {
        method: 'POST',
        body: payload,
    });

    return {
        orders: data,
        has_next: meta.pagination.current_page < meta.pagination.total_pages,
        total: meta.pagination.total,
    } as FetchOrdersResponse;
};
