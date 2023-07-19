import { http } from '@/app/lib';

// type FetchOrderDocumentsResponse = {};

export const fetchOrderDocuments = async (order_id: number) => {
    return http(`orderDocuments/${order_id}`);
};
