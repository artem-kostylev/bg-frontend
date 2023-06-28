import { http } from '@/app/lib';
import type { NewDocument } from '@/account/types';

export const editUserDoc = async (docId: number, form: NewDocument) => {
    await http(`tourists_documents/${docId}`, { body: form, method: 'put' });
};
