import { http } from '@/app/lib';
import type { DocType } from '@/account/types';

export const getDocumentsTypes = async () => {
    const response = await http('documents_types');
    return response.data as DocType[];
};
