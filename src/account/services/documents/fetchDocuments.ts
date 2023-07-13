import { http } from '@/app/lib';
import type { Document } from '@/account/types';

export type FetchDocumentsResponse = {
    data: Document[];
};

export const fetchDocuments = async () => {
    const { data } = await http<FetchDocumentsResponse>('tourists_documents/list');
    return data;
};
