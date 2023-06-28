import { http } from '@/app/lib';
import type { DocType } from '@/account/types';

export type getDocumentsTypesResponse = {
    data: DocType[];
};

export const getDocumentsTypes = async () => {
    const response = await http<getDocumentsTypesResponse>('documents_types');
    return response.data;
};
