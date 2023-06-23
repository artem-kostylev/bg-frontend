import { http } from '@/app/lib';

type FetchOverheadResponse = {
    money_returned: number;
    actual_cost?: number;
};

export const fetchOverhead = async (order_id: number) => {
    return http<FetchOverheadResponse>(`order/get-overhead?orderId=${order_id}`);
};
