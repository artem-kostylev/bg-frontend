import { http } from '@/app/lib';
import type { Transfer, AdditionalTransfer } from '@/booking/types';

export type FetchTransferPayload = Transfer;

export type FetchTransferResponse = {
    allowed: AdditionalTransfer[];
    from: string;
    to: string;
};

export const fetchTransfer = async (payload: FetchTransferPayload) => {
    return await http<FetchTransferResponse>('tour/transfer', {
        method: 'POST',
        body: { id: payload.id, date: payload.date },
    });
};
