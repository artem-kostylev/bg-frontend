import { http } from '@/app/lib';
import type { NewDocument, Document } from '@/account/types';

export const addDocument = async (form: NewDocument | Document) => {
    await http('tourists_documents', { body: form, method: 'post' });
};
