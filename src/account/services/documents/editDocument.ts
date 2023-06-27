import { http } from '@/app/lib';

export const editUserDoc = async (docId: number, form: Record<string, any>) => {
    await http(`tourists_documents/${docId}`, { body: form, method: 'put' });
};
