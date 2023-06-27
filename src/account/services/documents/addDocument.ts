import { http } from '@/app/lib';
import type { NewDocument } from '@/account/types';

export const addDocument = async (form: NewDocument) => {
    await http('tourists_documents', { body: form, method: 'post' });
};
