import { http } from '@/app/lib';
import type { Transfer } from '@/booking/types';

export type FetchTransferPayload = Transfer;

export type FetchTransferResponse = {
    allowed: Transfer[];
    from: string;
    to: string;
};

export const fetchTransfer = async (payload: FetchTransferPayload) => {
    return await http<FetchTransferResponse>('tour/transfer', {
        method: 'POST',
        body: { id: payload.id, date: payload.date },
    });
};
