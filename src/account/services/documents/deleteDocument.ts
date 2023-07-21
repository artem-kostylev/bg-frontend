import { http } from '@/app/lib';

export const deleteUserDoc = async (docId: number) => {
    await http(`tourists_documents/${docId}`, { method: 'DELETE' });
};
