import { http } from '@/app/lib';

export const fetchOrderDocuments = async (order_id: number) => {
    const response = await http(`orderDocuments/${order_id}`, {
        responseType: 'blob',
    });

    if (response) {
        return URL.createObjectURL(response);
    }
};
